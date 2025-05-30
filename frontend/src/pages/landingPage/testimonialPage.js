export default function Testimonial() {
  return `
    <section class="section-testimonial py-24 min-h-screen overflow-x-hidden">
      <div class="text-center mt-2 mb-8" data-aos="fade-up" data-aos-delay="50">
        <h2 class="text-4xl font-bold text-gray-800 tracking-wide">WHAT OUR USERS SAY</h2>
      </div>
      
      <!-- Konten Testimonial 1-4 kolom responsif -->
      <div class="w-full max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 box-border">
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <p class="text-lg italic">"Platform ini sangat membantu saya!"</p>
          <p class="mt-4 font-semibold">– Alex</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <p class="text-lg italic">"UI/UX-nya simpel dan keren banget!"</p>
          <p class="mt-4 font-semibold">– Nia</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <p class="text-lg italic">"Pelayanan cepat dan responsif."</p>
          <p class="mt-4 font-semibold">– Budi</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <p class="text-lg italic">"Fitur lengkap dan mudah digunakan."</p>
          <p class="mt-4 font-semibold">– Sari</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <p class="text-lg italic">"Sangat membantu pekerjaan saya sehari-hari."</p>
          <p class="mt-4 font-semibold">– Rina</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <p class="text-lg italic">"Desainnya menarik dan modern."</p>
          <p class="mt-4 font-semibold">– Dedi</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <p class="text-lg italic">"Koneksi cepat dan stabil."</p>
          <p class="mt-4 font-semibold">– Intan</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <p class="text-lg italic">"Support team sangat membantu."</p>
          <p class="mt-4 font-semibold">– Rama</p>
        </div>
      </div>
    </section>
  `;
}
