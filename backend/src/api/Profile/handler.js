const NotFoundError = require('../../exceptions/NotFoundError');

class ProfilesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postProfileHandler = this.postProfileHandler.bind(this);
    this.getProfileByAccountHandler =
      this.getProfileByAccountHandler.bind(this);
    this.putProfileByIdHandler = this.putProfileByIdHandler.bind(this);
    this.deleteProfileByIdHandler = this.deleteProfileByIdHandler.bind(this);
  }

  async postProfileHandler(request, h) {
    this._validator.validateProfilePayload(request.payload);

    const { job_title, age, profile_photo } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    const profileId = await this._service.addProfile({
      account_id: credentialId,
      job_title,
      age,
      profile_photo: profile_photo || null,
    });

    const response = h.response({
      status: 'success',
      message: 'Profil berhasil dibuat',
      data: { profileId },
    });
    response.code(201);
    return response;
  }

  async getProfileByAccountHandler(request) {
    const { id: credentialId } = request.auth.credentials;

    const profile = await this._service.getProfileByAccountId(credentialId);

    if (!profile) {
      throw new NotFoundError('Profil tidak ditemukan');
    }

    return {
      status: 'success',
      data: { profile },
    };
  }

  async putProfileByIdHandler(request) {
    this._validator.validateProfilePayload(request.payload);

    const { jobTitle, age, profilePhoto } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    // Verify profile owner by checking profileId (from DB) and userId (credentialId)
    // Asumsi profileId sama dengan credentialId (bisa sesuaikan jika perlu)
    await this._service.verifyProfileOwner(credentialId, credentialId);

    await this._service.updateProfileByAccountId(credentialId, {
      jobTitle,
      age,
      profilePhoto,
    });

    return {
      status: 'success',
      message: 'Profil berhasil diperbarui',
    };
  }

  async deleteProfileByIdHandler(request) {
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyProfileOwner(credentialId, credentialId);
    await this._service.deleteProfileByAccountId(credentialId);

    return {
      status: 'success',
      message: 'Profil berhasil dihapus',
    };
  }
}

module.exports = ProfilesHandler;
