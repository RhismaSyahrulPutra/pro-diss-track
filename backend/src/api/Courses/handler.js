const NotFoundError = require('../../exceptions/NotFoundError');

class CoursesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postCourseHandler = this.postCourseHandler.bind(this);
    this.getCourseByIdHandler = this.getCourseByIdHandler.bind(this);
    this.getAllCoursesHandler = this.getAllCoursesHandler.bind(this);
    this.putCourseByIdHandler = this.putCourseByIdHandler.bind(this);
    this.deleteCourseByIdHandler = this.deleteCourseByIdHandler.bind(this);
  }

  async postCourseHandler(request, h) {
    this._validator.validateCoursePayload(request.payload);

    const { course_photo, course_title, course_desc } = request.payload;

    const courseId = await this._service.addCourse({
      course_photo: course_photo || null,
      course_title,
      course_desc,
    });

    const response = h.response({
      status: 'success',
      message: 'Course berhasil dibuat',
      data: { courseId },
    });
    response.code(201);
    return response;
  }

  async getCourseByIdHandler(request) {
    const { id } = request.params;

    const course = await this._service.getCourseById(id);

    if (!course) {
      throw new NotFoundError('Course tidak ditemukan');
    }

    return {
      status: 'success',
      data: { course },
    };
  }

  async getAllCoursesHandler() {
    const courses = await this._service.getAllCourses();

    return {
      status: 'success',
      data: { courses },
    };
  }

  async putCourseByIdHandler(request) {
    this._validator.validateCoursePayload(request.payload);

    const { id } = request.params;
    const { course_photo, course_title, course_desc } = request.payload;

    // Optional: verifikasi kepemilikan jika perlu

    await this._service.updateCourseById(id, {
      course_photo: course_photo || null,
      course_title,
      course_desc,
    });

    return {
      status: 'success',
      message: 'Course berhasil diperbarui',
    };
  }

  async deleteCourseByIdHandler(request) {
    const { id } = request.params;

    await this._service.deleteCourseById(id);

    return {
      status: 'success',
      message: 'Course berhasil dihapus',
    };
  }
}

module.exports = CoursesHandler;
