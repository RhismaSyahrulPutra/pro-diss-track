import { TestimonialPresenter } from '../../presenter/TestimonialPresenter';
import feather from 'feather-icons';

export default function Testimonial() {
  setTimeout(() => {
    TestimonialPresenter.init();
    feather.replace();

    // Scroll handler untuk carousel
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    const container = document.getElementById('testimonial-list');

    if (prevBtn && nextBtn && container) {
      prevBtn.addEventListener('click', () => {
        container.scrollBy({
          left: -container.offsetWidth,
          behavior: 'smooth',
        });
      });

      nextBtn.addEventListener('click', () => {
        container.scrollBy({ left: container.offsetWidth, behavior: 'smooth' });
      });
    }
  }, 0);

  return `
    <section 
      id="testimonials"
      class="section-testimonial py-20 sm:py-24 min-h-screen scroll-mt-20 overflow-x-hidden"
      data-aos="fade-up"
      data-aos-delay="30"
      data-aos-duration="1000"
    >
      <div class="container mx-auto px-4">
        <div 
          class="text-center mt-2 mb-10 flex flex-col sm:flex-row items-center justify-center gap-3" 
          data-aos="fade-down" 
          data-aos-delay="100" 
          data-aos-duration="800"
        >
          <i data-feather="users" class="w-7 h-7 sm:w-8 sm:h-8 stroke-blue-600"></i>
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 tracking-wide text-center">
            WHAT OUR USERS SAY
          </h2>
        </div>

        <div 
          id="average-rating" 
          class="mb-10" 
          data-aos="fade-up" 
          data-aos-delay="200" 
          data-aos-duration="800"
        >
          <p class="text-center text-base text-gray-500">Memuat rata-rata rating...</p>
        </div>

        <!-- Tombol navigasi -->
        <div class="flex justify-end items-center gap-3 mb-4">
          <button id="testimonial-prev" class="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
            <i data-feather="chevron-left" class="w-5 h-5"></i>
          </button>
          <button id="testimonial-next" class="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
            <i data-feather="chevron-right" class="w-5 h-5"></i>
          </button>
        </div>

        <div
          id="testimonial-list"
          class="hide-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory px-2 sm:px-4 box-border scroll-smooth pb-4"
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-duration="800"
        >

          <p class="text-center text-sm text-gray-500 w-full">Memuat testimonial...</p>
        </div>
      </div>
    </section>
  `;
}
