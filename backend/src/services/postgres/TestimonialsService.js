const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class TestimonialsService {
  constructor() {
    this._pool = new Pool();
  }

  async addTestimonial({ account_id, testimonial_text }) {
    const testimonial_id = `testimonial-${nanoid(16)}`;

    const query = {
      text: `INSERT INTO testimonials (testimonial_id, account_id, testimonial_text)
             VALUES ($1, $2, $3)
             RETURNING testimonial_id`,
      values: [testimonial_id, account_id, testimonial_text],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0]?.testimonial_id) {
      throw new InvariantError('Testimonial gagal ditambahkan');
    }

    return result.rows[0].testimonial_id;
  }

  async getAllTestimonials() {
    const query = {
      text: `SELECT testimonial_id, account_id, testimonial_text
             FROM testimonials`,
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async getTestimonialByAccountId(account_id) {
    const query = {
      text: `SELECT testimonial_id, account_id, testimonial_text
             FROM testimonials
             WHERE account_id = $1`,
      values: [account_id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Testimonial tidak ditemukan');
    }

    return result.rows[0];
  }

  async updateTestimonialByAccountId(account_id, { testimonial_text }) {
    const checkQuery = {
      text: 'SELECT testimonial_id FROM testimonials WHERE account_id = $1',
      values: [account_id],
    };
    const checkResult = await this._pool.query(checkQuery);

    if (!checkResult.rows.length) {
      throw new NotFoundError('Testimonial tidak ditemukan');
    }

    const query = {
      text: `UPDATE testimonials
             SET testimonial_text = $1
             WHERE account_id = $2`,
      values: [testimonial_text, account_id],
    };

    await this._pool.query(query);
  }

  async deleteTestimonialByAccountId(account_id) {
    const query = {
      text: 'DELETE FROM testimonials WHERE account_id = $1 RETURNING testimonial_id',
      values: [account_id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Testimonial gagal dihapus. Id tidak ditemukan');
    }
  }

  // Opsi 1: Verify berdasarkan testimonial_id dan user_id (kalau sudah punya testimonial_id)
  async verifyTestimonialOwner(testimonial_id, user_id) {
    const query = {
      text: 'SELECT account_id FROM testimonials WHERE testimonial_id = $1',
      values: [testimonial_id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Testimonial tidak ditemukan');
    }

    const testimonial = result.rows[0];

    if (testimonial.account_id !== user_id) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }

  async verifyTestimonialAccess(account_id) {
    const query = {
      text: 'SELECT account_id FROM testimonials WHERE account_id = $1',
      values: [account_id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Testimonial tidak ditemukan');
    }
  }
}

module.exports = TestimonialsService;
