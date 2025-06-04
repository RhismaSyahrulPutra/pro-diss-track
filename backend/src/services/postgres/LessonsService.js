const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class LessonsService {
  constructor() {
    this._pool = new Pool();
  }

  async _verifyCourseExists(course_id) {
    const query = {
      text: 'SELECT course_id FROM courses WHERE course_id = $1',
      values: [course_id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError(`Course dengan id ${course_id} tidak ditemukan`);
    }
  }

  async addLesson({
    lesson_photo,
    lesson_title,
    lesson_desc,
    lesson_content,
    course_id,
  }) {
    await this._verifyCourseExists(course_id);

    const lesson_id = `lesson-${nanoid(16)}`;

    const query = {
      text: `INSERT INTO lessons (lesson_id, lesson_photo, lesson_title, lesson_desc, lesson_content, course_id)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING lesson_id`,
      values: [
        lesson_id,
        lesson_photo,
        lesson_title,
        lesson_desc,
        lesson_content,
        course_id,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0]?.lesson_id) {
      throw new InvariantError('Lesson gagal ditambahkan');
    }

    return result.rows[0].lesson_id;
  }

  async getLessonById(lesson_id) {
    const query = {
      text: `SELECT lesson_id, lesson_photo, lesson_title, lesson_desc, lesson_content, course_id
             FROM lessons
             WHERE lesson_id = $1`,
      values: [lesson_id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lesson tidak ditemukan');
    }

    return result.rows[0];
  }

  async getAllLessons() {
    const query = {
      text: `SELECT lesson_id, lesson_photo, lesson_title, lesson_desc, lesson_content, course_id
             FROM lessons`,
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async getLessonsByCourseId(course_id) {
    const query = {
      text: `SELECT lesson_id, lesson_photo, lesson_title, lesson_desc, lesson_content, course_id
             FROM lessons
             WHERE course_id = $1`,
      values: [course_id],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async updateLessonById(
    lesson_id,
    { lesson_photo, lesson_title, lesson_desc, lesson_content, course_id }
  ) {
    const checkQuery = {
      text: 'SELECT lesson_id FROM lessons WHERE lesson_id = $1',
      values: [lesson_id],
    };
    const checkResult = await this._pool.query(checkQuery);

    if (!checkResult.rows.length) {
      throw new NotFoundError('Lesson tidak ditemukan');
    }

    // Cek course_id valid
    await this._verifyCourseExists(course_id);

    const query = {
      text: `UPDATE lessons
             SET lesson_photo = $1,
                 lesson_title = $2,
                 lesson_desc = $3,
                 lesson_content = $4,
                 course_id = $5
             WHERE lesson_id = $6`,
      values: [
        lesson_photo,
        lesson_title,
        lesson_desc,
        lesson_content,
        course_id,
        lesson_id,
      ],
    };

    await this._pool.query(query);
  }

  async deleteLessonById(lesson_id) {
    const query = {
      text: 'DELETE FROM lessons WHERE lesson_id = $1 RETURNING lesson_id',
      values: [lesson_id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lesson gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = LessonsService;
