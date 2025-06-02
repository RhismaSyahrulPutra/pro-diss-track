const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class CoursesService {
  constructor() {
    this._pool = new Pool();
  }

  async addCourse({ course_photo = null, course_title, course_desc }) {
    const course_id = `course-${nanoid(16)}`;
    const query = {
      text: `INSERT INTO courses (course_id, course_photo, course_title, course_desc)
             VALUES ($1, $2, $3, $4)
             RETURNING course_id`,
      values: [course_id, course_photo, course_title, course_desc],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0]?.course_id) {
      throw new InvariantError('Course gagal ditambahkan');
    }
    return result.rows[0].course_id;
  }

  async getCourseById(course_id) {
    const query = {
      text: `SELECT course_id, course_photo, course_title, course_desc
             FROM courses
             WHERE course_id = $1`,
      values: [course_id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Course tidak ditemukan');
    }
    return result.rows[0];
  }

  async getAllCourses() {
    const query = {
      text: `SELECT course_id, course_photo, course_title, course_desc
             FROM courses`,
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async updateCourseById(
    course_id,
    { course_photo, course_title, course_desc }
  ) {
    const checkQuery = {
      text: 'SELECT course_id FROM courses WHERE course_id = $1',
      values: [course_id],
    };
    const checkResult = await this._pool.query(checkQuery);
    if (!checkResult.rows.length) {
      throw new NotFoundError('Course tidak ditemukan');
    }

    const fields = [];
    const values = [];
    let idx = 1;

    if (course_photo !== undefined) {
      fields.push(`course_photo = $${idx++}`);
      values.push(course_photo);
    }
    if (course_title !== undefined) {
      fields.push(`course_title = $${idx++}`);
      values.push(course_title);
    }
    if (course_desc !== undefined) {
      fields.push(`course_desc = $${idx++}`);
      values.push(course_desc);
    }

    if (fields.length === 0) {
      return;
    }

    const query = {
      text: `UPDATE courses SET ${fields.join(', ')} WHERE course_id = $${idx}`,
      values: [...values, course_id],
    };

    await this._pool.query(query);
  }

  async updateCoursePhotoById(course_id, course_photo) {
    const checkQuery = {
      text: 'SELECT course_id FROM courses WHERE course_id = $1',
      values: [course_id],
    };
    const checkResult = await this._pool.query(checkQuery);
    if (!checkResult.rows.length) {
      throw new NotFoundError('Course tidak ditemukan');
    }

    const query = {
      text: 'UPDATE courses SET course_photo = $1 WHERE course_id = $2',
      values: [course_photo, course_id],
    };
    await this._pool.query(query);
  }

  async deleteCourseById(course_id) {
    const query = {
      text: 'DELETE FROM courses WHERE course_id = $1 RETURNING course_id',
      values: [course_id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Course gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = CoursesService;
