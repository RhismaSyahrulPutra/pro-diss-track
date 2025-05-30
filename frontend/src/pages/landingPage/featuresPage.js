export default function Features() {
  return `
    <section class="section-features py-24 min-h-screen overflow-x-hidden">
      <div class="text-center mt-2 mb-8" data-aos="fade-up" data-aos-delay="50">
        <h2 class="text-4xl font-bold text-gray-800 tracking-wide">OUR FEATURES</h2>
      </div>
      
      <div class="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row gap-8 px-4 box-border">
        <!-- Card Machine Learning -->
        <div 
          class="flex-1 bg-white/80 border border-black/20 backdrop-blur-md p-6 sm:p-8 rounded-lg shadow-md"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <h2 class="text-2xl font-semibold mb-4 text-gray-900">Machine Learning</h2>
          <p class="text-sm text-justify text-gray-700 leading-relaxed">
            Platform kami menggunakan teknologi Machine Learning seperti SVM, KNN, dan Random Forest untuk memungkinkan pemahaman bahasa isyarat secara visual yang lebih efektif dan interaktif.
          </p>
        </div>

        <!-- Card Frontend & Backend -->
        <div 
          class="flex-1 bg-white/80 border border-black/20 backdrop-blur-md p-6 sm:p-8 rounded-lg shadow-md"
          data-aos="fade-left"
          data-aos-delay="100"
        >
          <h2 class="text-2xl font-semibold mb-4 text-gray-900">Frontend & Backend</h2>
          <p class="text-sm text-justify text-gray-700 leading-relaxed">
            Pengembangan aplikasi dilakukan dengan integrasi frontend dan backend menggunakan teknologi modern seperti TensorFlow, OpenCV, Node.js, dan Tailwind CSS untuk pengalaman pengguna yang optimal.
          </p>
        </div>
      </div>
    </section>
  `;
}
