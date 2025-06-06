import 'aos/dist/aos.css';

export default function Home() {
  return `
    <section class="section-home py-20 sm:py-24 min-h-screen overflow-x-hidden max-w-full px-4 sm:px-8 bg-gradient-to-b from-blue-50 to-white">
      <div 
        class="w-full max-w-screen-xl mx-auto bg-white/90 border border-black/10 backdrop-blur-md p-6 sm:p-12 rounded-xl shadow-lg text-center flex flex-col items-center justify-center min-h-[82dvh] box-border"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <h1 class="text-4xl sm:text-6xl font-extrabold mb-6 text-blue-600 tracking-tight" data-aos="fade-up" data-aos-delay="200">
          PRO DISS TRACK
        </h1>
        <p class="text-base sm:text-lg mb-10 max-w-xl text-gray-700" data-aos="fade-up" data-aos-delay="300">
          Explore more about us.
        </p>
        <div 
          class="flex flex-col sm:flex-row flex-wrap gap-5 sm:gap-10 justify-center w-full max-w-md"
          data-aos="fade-up" 
          data-aos-delay="400"
        >
          <a 
            href="#about" 
            class="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-base sm:text-sm transition duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg whitespace-nowrap"
          >
            About This App
          </a>
          <a 
            href="#login" 
            class="bg-blue-100 border border-blue-600 text-blue-700 px-8 py-4 rounded-lg font-semibold text-base sm:text-sm transition duration-300 ease-in-out hover:bg-blue-200 hover:shadow-lg hover:border-2 hover:border-blue-700 whitespace-nowrap"
          >
            Sign In / Sign Up
          </a>
        </div>
      </div>
    </section>
  `;
}
