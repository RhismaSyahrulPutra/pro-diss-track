import feather from 'feather-icons';

export default function Features() {
  setTimeout(() => {
    feather.replace();
  }, 100);

  return `
    <section 
      class="section-features py-24 min-h-screen overflow-x-hidden"
      data-aos="fade-up"
      data-aos-delay="30"
      data-aos-duration="1000"
    >
      <div class="text-center mt-2 mb-8" data-aos="fade-down" data-aos-delay="100" data-aos-duration="800">
        <h2 class="text-4xl font-bold text-gray-800 tracking-wide flex items-center justify-center gap-3">
          <i data-feather="settings" class="w-8 h-8 stroke-blue-600"></i>
          OUR FEATURES
        </h2>
      </div>
      
      <div class="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row gap-8 px-4 box-border">
        <!-- Card Machine Learning -->
        <div 
          class="flex-1 bg-white/80 border border-black/20 backdrop-blur-md p-6 sm:p-8 rounded-lg shadow-md"
          data-aos="fade-right"
          data-aos-delay="200"
          data-aos-duration="800"
        >
          <h2 class="text-2xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
            <i data-feather="cpu" class="w-6 h-6 stroke-blue-600"></i>
            Machine Learning
          </h2>
          <p class="text-sm text-justify text-gray-700 leading-relaxed">
            Platform kami menggunakan teknologi Machine Learning seperti SVM, KNN, dan Random Forest untuk memungkinkan pemahaman bahasa isyarat secara visual yang lebih efektif dan interaktif.
          </p>
        </div>

        <!-- Card Frontend & Backend -->
        <div 
          class="flex-1 bg-white/80 border border-black/20 backdrop-blur-md p-6 sm:p-8 rounded-lg shadow-md"
          data-aos="fade-left"
          data-aos-delay="300"
          data-aos-duration="800"
        >
          <h2 class="text-2xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
            <i data-feather="layers" class="w-6 h-6 stroke-blue-600"></i>
            Frontend & Backend
          </h2>
          <p class="text-sm text-justify text-gray-700 leading-relaxed">
            Pengembangan aplikasi dilakukan dengan integrasi frontend dan backend menggunakan teknologi modern seperti TensorFlow, OpenCV, Node.js, dan Tailwind CSS untuk pengalaman pengguna yang optimal.
          </p>
        </div>
      </div>
    </section>
  `;
}
