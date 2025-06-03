const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class ProfilesService {
  constructor() {
    this._pool = new Pool();
  }

  async addProfile({ account_id, job_title, age, profile_photo }) {
    const profile_id = `profile-${nanoid(16)}`;

    const query = {
      text: `INSERT INTO profiles (profile_id, account_id, job_title, age, profile_photo)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING profile_id`,
      values: [profile_id, account_id, job_title, age, profile_photo],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0]?.profile_id) {
      throw new InvariantError('Profile gagal ditambahkan');
    }

    return result.rows[0].profile_id;
  }

  async getProfileByAccountId(account_id) {
    const query = {
      text: `SELECT profile_id, account_id, job_title, age, profile_photo
             FROM profiles
             WHERE account_id = $1`,
      values: [account_id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Profile tidak ditemukan');
    }

    const profile = result.rows[0];

    // Jika ada profile_photo, buat URL akses file
    const profilePhotoUrl = profile.profile_photo
      ? profile.profile_photo.startsWith('http')
        ? profile.profile_photo
        : `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 5000}/uploads/profile_photos/${profile.profile_photo}`
      : null;

    return {
      profile_id: profile.profile_id,
      account_id: profile.account_id,
      job_title: profile.job_title,
      age: profile.age,
      profile_photo_url: profilePhotoUrl,
    };
  }

  async updateProfileByAccountId(
    account_id,
    { job_title, age, profile_photo }
  ) {
    const checkQuery = {
      text: 'SELECT profile_id FROM profiles WHERE account_id = $1',
      values: [account_id],
    };
    const checkResult = await this._pool.query(checkQuery);

    if (!checkResult.rows.length) {
      throw new NotFoundError('Profile tidak ditemukan');
    }

    const query = {
      text: `UPDATE profiles
             SET job_title = $1,
                 age = $2,
                 profile_photo = $3
             WHERE account_id = $4`,
      values: [job_title, age, profile_photo, account_id],
    };

    await this._pool.query(query);
  }

  async updateProfilePhotoByAccountId(account_id, photoFilename) {
    const checkQuery = {
      text: 'SELECT profile_id FROM profiles WHERE account_id = $1',
      values: [account_id],
    };
    const checkResult = await this._pool.query(checkQuery);

    if (!checkResult.rows.length) {
      throw new NotFoundError('Profile tidak ditemukan');
    }

    const query = {
      text: `UPDATE profiles
             SET profile_photo = $1
             WHERE account_id = $2`,
      values: [photoFilename, account_id],
    };

    await this._pool.query(query);
  }

  async deleteProfileByAccountId(account_id) {
    const query = {
      text: 'DELETE FROM profiles WHERE account_id = $1 RETURNING profile_id',
      values: [account_id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Profile gagal dihapus. Id tidak ditemukan');
    }
  }

  async verifyProfileOwner(profile_id, user_id) {
    const query = {
      text: 'SELECT account_id FROM profiles WHERE profile_id = $1',
      values: [profile_id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Profile tidak ditemukan');
    }

    const profile = result.rows[0];

    if (profile.account_id !== user_id) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }

  async verifyProfileAccess(account_id) {
    const query = {
      text: 'SELECT account_id FROM profiles WHERE account_id = $1',
      values: [account_id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Profile tidak ditemukan');
    }
  }
}

module.exports = ProfilesService;
