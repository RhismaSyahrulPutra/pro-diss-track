const NotFoundError = require('../../exceptions/NotFoundError');

class TestimonialsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postTestimonialHandler = this.postTestimonialHandler.bind(this);
    this.getAllTestimonialsHandler = this.getAllTestimonialsHandler.bind(this);
    this.getTestimonialByAccountHandler =
      this.getTestimonialByAccountHandler.bind(this);
    this.putTestimonialByAccountHandler =
      this.putTestimonialByAccountHandler.bind(this);
    this.deleteTestimonialByAccountHandler =
      this.deleteTestimonialByAccountHandler.bind(this);
  }

  async postTestimonialHandler(request, h) {
    // Validasi payload khusus POST (username, testimonial_text, rating)
    this._validator.validateTestimonialPostPayload(request.payload);

    const { testimonial_text, username, rating } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    if (!username) {
      return h
        .response({
          status: 'fail',
          message: 'Username tidak ditemukan di payload',
        })
        .code(400);
    }

    const testimonialId = await this._service.addTestimonial({
      account_id: credentialId,
      username,
      testimonial_text,
      rating,
    });

    const response = h.response({
      status: 'success',
      message: 'Testimonial berhasil dibuat',
      data: { testimonialId },
    });
    response.code(201);
    return response;
  }

  async getAllTestimonialsHandler() {
    const testimonials = await this._service.getAllTestimonials();

    return {
      status: 'success',
      data: { testimonials },
    };
  }

  async getTestimonialByAccountHandler(request) {
    const { id: credentialId } = request.auth.credentials;

    const testimonial =
      await this._service.getTestimonialByAccountId(credentialId);

    if (!testimonial) {
      throw new NotFoundError('Testimonial tidak ditemukan');
    }

    return {
      status: 'success',
      data: { testimonial },
    };
  }

  async putTestimonialByAccountHandler(request) {
    this._validator.validateTestimonialPutPayload(request.payload);

    const { testimonial_text, rating } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    const testimonial =
      await this._service.getTestimonialByAccountId(credentialId);

    await this._service.verifyTestimonialOwner(
      testimonial.testimonial_id,
      credentialId
    );

    await this._service.updateTestimonialByAccountId(credentialId, {
      testimonial_text,
      rating,
    });

    return {
      status: 'success',
      message: 'Testimonial berhasil diperbarui',
    };
  }

  async deleteTestimonialByAccountHandler(request) {
    const { id: credentialId } = request.auth.credentials;

    const testimonial =
      await this._service.getTestimonialByAccountId(credentialId);

    await this._service.verifyTestimonialOwner(
      testimonial.testimonial_id,
      credentialId
    );
    await this._service.deleteTestimonialByAccountId(credentialId);

    return {
      status: 'success',
      message: 'Testimonial berhasil dihapus',
    };
  }
}

module.exports = TestimonialsHandler;
