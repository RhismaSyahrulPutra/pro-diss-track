const ClientError = require('../../exceptions/ClientError');

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
      const { job_title, age } = request.payload;
      const { id: credentialId } = request.auth.credentials;

      const profileId = await this._service.addProfile({
        account_id: credentialId,
        job_title,
        age,
        profile_photo: null,
      });

      const response = h.response({
        status: 'success',
        message: 'Profil berhasil dibuat',
        data: { profileId },
      });
      response.code(201);
      return response;
    } catch (error) {
      return this._handleErrorResponse(error, h);
    }
  }

  async getProfileByAccountHandler(request, h) {
    try {
      const { id: credentialId } = request.auth.credentials;

      const profile = await this._service.getProfileByAccountId(credentialId);
      if (!profile) {
        throw new ClientError('Profil tidak ditemukan', 404);
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
      this._validator.validateProfilePayload(request.payload);
      const { job_title, age } = request.payload;
      const { id: credentialId } = request.auth.credentials;

      await this._service.verifyProfileOwner(credentialId, credentialId);
      await this._service.updateProfileByAccountId(credentialId, {
        job_title,
        age,
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

      await this._service.verifyProfileOwner(credentialId, credentialId);
      await this._service.deleteProfileByAccountId(credentialId);

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

      this._validator.validateProfilePhotoHeaders(profile_photo.hapi.headers);

      const filename = await this._storageService.writeFile(
        profile_photo,
        profile_photo.hapi
      );

      const fileLocation = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 5000}/uploads/${filename}`;

      await this._service.updateProfilePhotoByAccountId(
        credentialId,
        fileLocation
      );

      const response = h.response({
        status: 'success',
        message: 'Foto profil berhasil diunggah',
        data: {
          photoUrl: fileLocation,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      return this._handleErrorResponse(error, h);
    }
  }
}

module.exports = ProfilesHandler;
