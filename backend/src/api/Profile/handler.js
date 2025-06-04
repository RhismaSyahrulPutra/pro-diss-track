const ClientError = require('../../exceptions/ClientError');
const NotFoundError = require('../../exceptions/NotFoundError');

class ProfilesHandler {
  constructor(service, validator, storageService) {
    this._service = service;
    this._validator = validator;
    this._storageService = storageService;

    this.postProfileHandler = this.postProfileHandler.bind(this);
    this.getProfileByAccountHandler =
      this.getProfileByAccountHandler.bind(this);
    this.putProfileByAccountHandler =
      this.putProfileByAccountHandler.bind(this);
    this.deleteProfileByAccountHandler =
      this.deleteProfileByAccountHandler.bind(this);
    this.postUploadPhotoHandler = this.postUploadPhotoHandler.bind(this);
    this.getProfilePhotoHandler = this.getProfilePhotoHandler.bind(this);
    this.deleteProfilePhotoHandler = this.deleteProfilePhotoHandler.bind(this);
  }

  _handleErrorResponse(error, h) {
    if (error instanceof ClientError) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(error.statusCode);
      return response;
    }

    const response = h.response({
      status: 'error',
      message: 'Sorry, we encountered a server error.',
    });
    response.code(500);
    console.error(error);
    return response;
  }

  async postProfileHandler(request, h) {
    try {
      this._validator.validateProfilePayload(request.payload);

      const { job_title, age, about_me } = request.payload;
      const { id: credentialId } = request.auth.credentials;
      const { accountId } = request.params;

      if (credentialId !== accountId) {
        throw new ClientError(
          'Anda tidak berhak membuat profil untuk akun ini',
          403
        );
      }

      const existingProfile =
        await this._service.getProfileByAccountId(accountId);
      if (existingProfile) {
        throw new ClientError(
          'Profil sudah ada. Gunakan PUT untuk memperbarui.',
          400
        );
      }

      const profileId = await this._service.addProfile({
        profile_id: this._service.generateId(),
        account_id: accountId,
        job_title,
        age,
        about_me,
        profile_photo: null,
      });

      return h
        .response({
          status: 'success',
          message: 'Profil berhasil dibuat',
          data: { profileId },
        })
        .code(201);
    } catch (error) {
      return this._handleErrorResponse(error, h);
    }
  }

  async getProfileByAccountHandler(request, h) {
    try {
      const { id: credentialId } = request.auth.credentials;
      const { accountId } = request.params;

      if (credentialId !== accountId) {
        throw new ClientError('Anda tidak berhak mengakses profil ini', 403);
      }

      const profile = await this._service.getProfileByAccountId(accountId);

      if (!profile) {
        const response = h.response({
          status: 'fail',
          message: 'Profil tidak ditemukan.',
        });
        response.code(404);
        return response;
      }

      return {
        status: 'success',
        data: { profile },
      };
    } catch (error) {
      return this._handleErrorResponse(error, h);
    }
  }

  async putProfileByAccountHandler(request, h) {
    try {
      const { id: credentialId } = request.auth.credentials;
      const { accountId } = request.params;
      const { job_title, age, about_me } = request.payload;

      if (credentialId !== accountId) {
        throw new ClientError('Anda tidak berhak mengubah profil ini', 403);
      }

      this._validator.validateProfilePayload({ job_title, age, about_me });

      const profile = await this._service.getProfileByAccountId(accountId);
      if (!profile) {
        const response = h.response({
          status: 'fail',
          message:
            'Profil tidak ditemukan, silakan buat profil terlebih dahulu.',
        });
        response.code(404);
        return response;
      }

      await this._service.verifyProfileOwner(accountId, credentialId);

      await this._service.updateProfileByAccountId(accountId, {
        job_title,
        age,
        about_me,
      });

      return {
        status: 'success',
        message: 'Profil berhasil diperbarui',
      };
    } catch (error) {
      return this._handleErrorResponse(error, h);
    }
  }

  async deleteProfileByAccountHandler(request, h) {
    try {
      const { id: credentialId } = request.auth.credentials;
      const { accountId } = request.params;

      if (credentialId !== accountId) {
        throw new ClientError('Anda tidak berhak menghapus profil ini', 403);
      }

      await this._service.verifyProfileOwner(accountId, credentialId);
      await this._service.deleteProfileByAccountId(accountId);

      return {
        status: 'success',
        message: 'Profil berhasil dihapus',
      };
    } catch (error) {
      return this._handleErrorResponse(error, h);
    }
  }

  async postUploadPhotoHandler(request, h) {
    try {
      const { profile_photo } = request.payload;
      const { id: credentialId } = request.auth.credentials;
      const { accountId } = request.params;

      if (credentialId !== accountId) {
        throw new ClientError(
          'Anda tidak berhak mengunggah foto profil ini',
          403
        );
      }

      this._validator.validateProfilePhotoHeaders(profile_photo.hapi.headers);

      const filename = await this._storageService.writeFile(
        profile_photo,
        profile_photo.hapi
      );

      const host = process.env.HOST || 'localhost';
      const port = process.env.PORT || 5000;
      const fileLocation = `http://${host}:${port}/api/Profile/uploads/${filename}`;

      await this._service.updateProfilePhotoByAccountId(
        accountId,
        fileLocation
      );

      return h
        .response({
          status: 'success',
          message: 'Foto profil berhasil diunggah',
          data: { photoUrl: fileLocation },
        })
        .code(201);
    } catch (error) {
      return this._handleErrorResponse(error, h);
    }
  }

  async getProfilePhotoHandler(request, h) {
    try {
      const { id: credentialId } = request.auth.credentials;
      const { accountId } = request.params;

      if (credentialId !== accountId) {
        throw new ClientError(
          'Anda tidak berhak mengakses foto profil ini',
          403
        );
      }

      const profile = await this._service.getProfileByAccountId(accountId);
      if (!profile || !profile.profile_photo_url) {
        throw new NotFoundError('Foto profil tidak ditemukan');
      }

      console.log('profile_photo_url:', profile.profile_photo_url);

      const photoUrl = new URL(profile.profile_photo_url);
      const filename = photoUrl.pathname.split('/').pop();

      const filePath = this._storageService.getFilePath(filename);

      const fs = require('fs');
      if (!fs.existsSync(filePath)) {
        throw new NotFoundError('Foto profil tidak ditemukan');
      }

      return h.file(filePath);
    } catch (error) {
      return this._handleErrorResponse(error, h);
    }
  }

  async deleteProfilePhotoHandler(request, h) {
    try {
      const { id: credentialId } = request.auth.credentials;
      const { accountId } = request.params;

      if (credentialId !== accountId) {
        throw new ClientError(
          'Anda tidak berhak menghapus foto profil ini',
          403
        );
      }

      const profile = await this._service.getProfileByAccountId(accountId);
      if (!profile || !profile.profile_photo) {
        throw new NotFoundError('Tidak ada foto profil untuk dihapus');
      }

      const photoUrl = new URL(profile.profile_photo);
      const filename = photoUrl.pathname.split('/').pop();

      await this._storageService.deleteFile(filename);
      await this._service.updateProfilePhotoByAccountId(accountId, null);

      return {
        status: 'success',
        message: 'Foto profil berhasil dihapus',
      };
    } catch (error) {
      return this._handleErrorResponse(error, h);
    }
  }
}

module.exports = ProfilesHandler;
