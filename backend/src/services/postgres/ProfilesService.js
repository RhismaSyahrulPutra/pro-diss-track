const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class ProfilesService {
  constructor() {
    this._pool = new Pool();
  }

  async addProfile({
    account_id,
    job_title = null,
    age = null,
    about_me = null,
    profile_photo = null,
  }) {
    const profile_id = `profile-${nanoid(16)}`;

    const query = {
      text: `INSERT INTO profiles (profile_id, account_id, job_title, age, about_me, profile_photo)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING profile_id`,
      values: [profile_id, account_id, job_title, age, about_me, profile_photo],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0]?.profile_id) {
      throw new InvariantError('Profil gagal ditambahkan');
    }

    return result.rows[0].profile_id;
  }

  async getProfileByAccountId(account_id) {
    const query = {
      text: `SELECT profile_id, account_id, job_title, age, profile_photo, about_me
             FROM profiles WHERE account_id = $1`,
      values: [account_id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Profil tidak ditemukan');
    }

    const profile = result.rows[0];

    const profilePhotoUrl = profile.profile_photo
      ? profile.profile_photo.startsWith('http')
        ? profile.profile_photo
        : `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 5000}/Profile/uploads/${profile.profile_photo}`
      : null;

    // Raw photo filename: hanya nama file, ekstrak dari profile_photo jika perlu
    const rawPhotoFilename = profile.profile_photo
      ? profile.profile_photo.startsWith('http')
        ? new URL(profile.profile_photo).pathname.split('/').pop()
        : profile.profile_photo
      : null;

    return {
      profile_id: profile.profile_id,
      account_id: profile.account_id,
      job_title: profile.job_title,
      age: profile.age,
      about_me: profile.about_me,
      profile_photo_url: profilePhotoUrl,
      raw_photo_filename: rawPhotoFilename,
    };
  }

  async updateProfileByAccountId(account_id, { job_title, age, about_me }) {
    const checkQuery = {
      text: 'SELECT profile_id FROM profiles WHERE account_id = $1',
      values: [account_id],
    };
    const checkResult = await this._pool.query(checkQuery);

    if (!checkResult.rows.length) {
      throw new NotFoundError('Profil tidak ditemukan');
    }

    const query = {
      text: `UPDATE profiles
             SET job_title = $1,
                 age = $2,
                 about_me = $3
             WHERE account_id = $4`,
      values: [job_title, age, about_me, account_id],
    };

    await this._pool.query(query);
  }

  async updateProfilePhotoByAccountId(account_id, photoUrl) {
    const checkQuery = {
      text: 'SELECT profile_id FROM profiles WHERE account_id = $1',
      values: [account_id],
    };
    const checkResult = await this._pool.query(checkQuery);

    if (!checkResult.rows.length) {
      throw new NotFoundError('Profil tidak ditemukan');
    }

    const query = {
      text: `UPDATE profiles
             SET profile_photo = $1
             WHERE account_id = $2`,
      values: [photoUrl, account_id],
    };

    await this._pool.query(query);
  }

  async deleteProfilePhotoByAccountId(account_id) {
    const checkQuery = {
      text: 'SELECT profile_photo FROM profiles WHERE account_id = $1',
      values: [account_id],
    };

    const result = await this._pool.query(checkQuery);

    if (!result.rows.length) {
      throw new NotFoundError('Profil tidak ditemukan');
    }

    const profile = result.rows[0];

    if (!profile.profile_photo) {
      throw new NotFoundError('Tidak ada foto profil yang dapat dihapus');
    }

    const deleteQuery = {
      text: `UPDATE profiles SET profile_photo = NULL WHERE account_id = $1`,
      values: [account_id],
    };

    await this._pool.query(deleteQuery);

    return profile.profile_photo; // return path/filename untuk penghapusan fisik
  }

  async deleteProfileByAccountId(account_id) {
    const query = {
      text: 'DELETE FROM profiles WHERE account_id = $1 RETURNING profile_id',
      values: [account_id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Profil gagal dihapus. ID tidak ditemukan');
    }
  }

  async verifyProfileOwner(account_id, user_id) {
    const query = {
      text: 'SELECT account_id FROM profiles WHERE account_id = $1',
      values: [account_id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Profil tidak ditemukan');
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
      throw new NotFoundError('Profil tidak ditemukan');
    }
  }
}

module.exports = ProfilesService;
