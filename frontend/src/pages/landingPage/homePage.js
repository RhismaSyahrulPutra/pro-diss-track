import 'aos/dist/aos.css';

export default function Home() {
  return `
    <section class="section-home py-20 sm:py-24 min-h-screen overflow-x-hidden max-w-full px-4 sm:px-8">
      <div 
        class="w-full max-w-screen-xl mx-auto bg-white/80 border border-black/20 backdrop-blur-md p-6 sm:p-8 rounded-lg shadow-md text-center flex flex-col items-center justify-center min-h-[82dvh] box-border"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <h1 class="text-4xl sm:text-6xl font-bold mb-4" data-aos="fade-up" data-aos-delay="200">
          PRO DISS TRACK
        </h1>
        <p class="text-base sm:text-lg mb-6" data-aos="fade-up" data-aos-delay="300">
          Explore more about us.
        </p>
        <div 
          class="flex flex-col sm:flex-row flex-wrap gap-6 sm:gap-14 justify-center w-full"
          data-aos="fade-up" 
          data-aos-delay="400"
        >
          <a 
            href="#about" 
            class="bg-blue-600 text-white px-6 py-4 rounded-md font-semibold text-sm transition hover:bg-blue-700 hover:shadow-lg whitespace-nowrap"
          >
            About This App
          </a>
          <a 
            href="#login" 
            class="bg-blue-200 border border-blue-600 text-blue-600 px-6 py-4 rounded-md font-semibold text-sm transition hover:bg-blue-300 hover:shadow-lg hover:border-2 hover:border-blue-700 whitespace-nowrap"
          >
            Sign In / Sign Up
          </a>
        </div>
      </div>
    </section>
  `;
}
