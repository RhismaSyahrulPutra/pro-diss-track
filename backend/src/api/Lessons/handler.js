const NotFoundError = require('../../exceptions/NotFoundError');

class LessonsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postLessonHandler = this.postLessonHandler.bind(this);
    this.getLessonByIdHandler = this.getLessonByIdHandler.bind(this);
    this.getAllLessonsHandler = this.getAllLessonsHandler.bind(this);
    this.getLessonsByCourseIdHandler =
      this.getLessonsByCourseIdHandler.bind(this);
    this.putLessonByIdHandler = this.putLessonByIdHandler.bind(this);
    this.deleteLessonByIdHandler = this.deleteLessonByIdHandler.bind(this);
  }

  async postLessonHandler(request, h) {
    this._validator.validateLessonPayload(request.payload);

    const {
      lesson_photo,
      lesson_title,
      lesson_desc,
      lesson_content,
      course_id,
    } = request.payload;

    const lessonId = await this._service.addLesson({
      lesson_photo: lesson_photo || null,
      lesson_title,
      lesson_desc,
      lesson_content,
      course_id,
    });

    const response = h.response({
      status: 'success',
      message: 'Lesson berhasil dibuat',
      data: { lessonId },
    });
    response.code(201);
    return response;
  }

  async getLessonByIdHandler(request) {
    const { id } = request.params;

    const lesson = await this._service.getLessonById(id);

    if (!lesson) {
      throw new NotFoundError('Lesson tidak ditemukan');
    }

    return {
      status: 'success',
      data: { lesson },
    };
  }

  async getAllLessonsHandler() {
    const lessons = await this._service.getAllLessons();

    return {
      status: 'success',
      data: { lessons },
    };
  }

  async getLessonsByCourseIdHandler(request) {
    const { courseId } = request.params;

    const lessons = await this._service.getLessonsByCourseId(courseId);

    return {
      status: 'success',
      data: { lessons },
    };
  }

  async putLessonByIdHandler(request) {
    this._validator.validateLessonPayload(request.payload);

    const { id } = request.params;
    const {
      lesson_photo,
      lesson_title,
      lesson_desc,
      lesson_content,
      course_id,
    } = request.payload;

    await this._service.updateLessonById(id, {
      lesson_photo: lesson_photo || null,
      lesson_title,
      lesson_desc,
      lesson_content,
      course_id,
    });

    return {
      status: 'success',
      message: 'Lesson berhasil diperbarui',
    };
  }

  async deleteLessonByIdHandler(request) {
    const { id } = request.params;

    await this._service.deleteLessonById(id);

    return {
      status: 'success',
      message: 'Lesson berhasil dihapus',
    };
  }
}

module.exports = LessonsHandler;
