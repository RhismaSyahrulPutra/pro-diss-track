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
    this._validator.validateTestimonialPayload(request.payload);

    const { testimonial_text } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    const testimonialId = await this._service.addTestimonial({
      account_id: credentialId,
      testimonial_text,
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
    this._validator.validateTestimonialPayload(request.payload);

    const { testimonial_text } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    const testimonial =
      await this._service.getTestimonialByAccountId(credentialId);

    await this._service.verifyTestimonialOwner(
      testimonial.testimonial_id,
      credentialId
    );

    await this._service.updateTestimonialByAccountId(credentialId, {
      testimonial_text,
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
