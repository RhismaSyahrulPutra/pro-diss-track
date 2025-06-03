import { TestimonialPresenter } from '../../presenter/TestimonialPresenter';

export default function Testimonial() {
  setTimeout(() => {
    TestimonialPresenter.init();
  }, 0);

  return `
    <section class="section-testimonial py-24 min-h-screen overflow-x-hidden">
      <div class="text-center mt-2 mb-8" data-aos="fade-up" data-aos-delay="50">
        <h2 class="text-4xl font-bold text-gray-800 tracking-wide">WHAT OUR USERS SAY</h2>
      </div>

      <div id="average-rating" class="mb-10">
        <p class="text-center text-gray-500">Memuat rata-rata rating...</p>
      </div>

      <div
        id="testimonial-list"
        class="w-full max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 box-border"
      >
        <p class="col-span-full text-center text-gray-500">Memuat testimonial...</p>
      </div>
    </section>
  `;
}
