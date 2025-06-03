const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class TestimonialsService {
  constructor() {
    this._pool = new Pool();
  }

  async addTestimonial({ account_id, username, testimonial_text, rating }) {
    const testimonial_id = `testimonial-${nanoid(16)}`;

    const query = {
      text: `INSERT INTO testimonials (testimonial_id, account_id, username, testimonial_text, rating)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING testimonial_id`,
      values: [testimonial_id, account_id, username, testimonial_text, rating],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0]?.testimonial_id) {
      throw new InvariantError('Testimonial gagal ditambahkan');
    }

    return result.rows[0].testimonial_id;
  }

  async getAllTestimonials() {
    const query = {
      text: `SELECT testimonial_id, account_id, username, testimonial_text, rating
             FROM testimonials`,
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async getTestimonialByAccountId(account_id) {
    const query = {
      text: `SELECT testimonial_id, account_id, username, testimonial_text, rating
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

  async updateTestimonialByAccountId(account_id, { testimonial_text, rating }) {
    // Cek testimonial dulu
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
             SET testimonial_text = $1, rating = $2
             WHERE account_id = $3`,
      values: [testimonial_text, rating, account_id],
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
}

module.exports = TestimonialsService;
