import { TestimonialPresenter } from '../../presenter/TestimonialPresenter';
import feather from 'feather-icons';

export default function Testimonial() {
  setTimeout(() => {
    TestimonialPresenter.init();
    feather.replace();
  }, 0);

  return `
    <section 
      class="section-testimonial py-24 min-h-screen overflow-x-hidden"
      data-aos="fade-up"
      data-aos-delay="30"
      data-aos-duration="1000"
    >
      <div class="text-center mt-2 mb-8 flex items-center justify-center gap-3" data-aos="fade-down" data-aos-delay="100" data-aos-duration="800">
        <i data-feather="users" class="w-8 h-8 stroke-blue-600"></i>
        <h2 class="text-4xl font-bold text-gray-800 tracking-wide">WHAT OUR USERS SAY</h2>
      </div>

      <div id="average-rating" class="mb-10" data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
        <p class="text-center text-gray-500">Memuat rata-rata rating...</p>
      </div>

      <div
        id="testimonial-list"
        class="w-full max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 box-border"
        data-aos="fade-up"
        data-aos-delay="300"
        data-aos-duration="800"
      >
        <p class="col-span-full text-center text-gray-500">Memuat testimonial...</p>
      </div>
    </section>
  `;
}
