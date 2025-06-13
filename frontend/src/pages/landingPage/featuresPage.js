import feather from 'feather-icons';

// Definisikan fungsi showTab di global scope agar bisa dipanggil onclick inline
window.showTab = function (tab) {
  const tabs = ['main', 'recommend'];
  tabs.forEach((t) => {
    const btn = document.getElementById('tab-' + t);
    const content = document.getElementById('content-' + t);
    if (t === tab) {
      btn.classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
      btn.classList.remove('text-gray-600');
      btn.setAttribute('aria-selected', 'true');
      content.removeAttribute('hidden');
    } else {
      btn.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
      btn.classList.add('text-gray-600');
      btn.setAttribute('aria-selected', 'false');
      content.setAttribute('hidden', '');
    }
  });
};

export default function Features() {
  setTimeout(() => {
    feather.replace();
  }, 100);

  return `
    <section 
      id="features"
      class="section-features py-20 sm:py-24 min-h-screen scroll-mt-20 overflow-x-hidden"
      data-aos="fade-up"
      data-aos-delay="30"
      data-aos-duration="1000"
    >
      <div class="container mx-auto px-4">
        <div class="text-center mt-2 mb-8" data-aos="fade-down" data-aos-delay="100" data-aos-duration="800">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 tracking-wide flex items-center justify-center gap-3">
            <i data-feather="settings" class="w-7 h-7 sm:w-8 sm:h-8 stroke-blue-600"></i>
            OUR FEATURES
          </h2>
        </div>
        
        <div class="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8 px-2 sm:px-4">
          <!-- Card Machine Learning -->
          <div 
            class="flex-1 bg-white/80 border border-black/20 backdrop-blur-md p-5 sm:p-6 md:p-8 rounded-lg shadow-md"
            data-aos="fade-right"
            data-aos-delay="200"
            data-aos-duration="800"
          >
            <h2 class="text-xl sm:text-2xl font-semibold mb-4 text-gray-900 flex items-center gap-2 mb-8">
              <i data-feather="cpu" class="w-5 h-5 sm:w-6 sm:h-6 stroke-blue-600"></i>
              Machine Learning
            </h2>

            <ul class="list-none space-y-3 text-gray-700">
              ${[
                'Utilize TensorFlow architecture for building machine learning models.',
                'Students are prohibited from using existing models from TensorFlow Hub and similar resources.',
                'Students are prohibited from using models directly from API services such as ChatGPT API, Gemini API, etc.',
                'Using AutoML for creating discriminative AI models is prohibited (Vertex AI is allowed only for Generative AI use cases).',
                'Create a simple code for inference process.',
              ]
                .map(
                  (text) => `
                <li class="flex items-center gap-2 select-none cursor-not-allowed">
                  <i data-feather="check-square" class="w-4 h-4 stroke-blue-600 shrink-0"></i>
                  <span class='text-sm'>${text}</span>
                </li>
              `,
                )
                .join('')}
            </ul>
          </div>

          <!-- Card Frontend & Backend with Tabs -->
          <div 
            class="flex-1 bg-white/80 border border-black/20 backdrop-blur-md p-5 sm:p-6 md:p-8 rounded-lg shadow-md"
            data-aos="fade-left"
            data-aos-delay="300"
            data-aos-duration="800"
          >
            <h2 class="text-xl sm:text-2xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
              <i data-feather="layers" class="w-5 h-5 sm:w-6 sm:h-6 stroke-blue-600"></i>
              Frontend & Backend
            </h2>

            <!-- Tabs -->
            <div class="mb-4 border-b border-gray-300">
              <nav class="flex space-x-4" aria-label="Tabs">
                <button
                  id="tab-main"
                  class="px-3 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600 focus:outline-none"
                  onclick="showTab('main')"
                  aria-selected="true"
                  role="tab"
                  type="button"
                >
                  Main Quest
                </button>
                <button
                  id="tab-recommend"
                  class="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 focus:outline-none"
                  onclick="showTab('recommend')"
                  aria-selected="false"
                  role="tab"
                  type="button"
                >
                  Recommendation Quest
                </button>
              </nav>
            </div>

            <!-- Tab Contents -->
            <div id="content-main" role="tabpanel" aria-labelledby="tab-main">
              <ul class="list-none space-y-3 text-gray-700">
                <li class="flex items-start gap-2 select-none cursor-not-allowed">
                  <i data-feather="check-square" class="w-4 h-4 stroke-blue-600 mt-1 shrink-0"></i>
                  <span class="text-sm">Build responsive web apps for all screens.</span>
                </li>
                <li class="flex items-start gap-2 select-none cursor-not-allowed">
                  <i data-feather="check-square" class="w-4 h-4 stroke-blue-600 mt-1 shrink-0"></i>
                  <span class="text-sm">Implement networking calls to project API.</span>
                </li>
                <li class="flex items-start gap-2 select-none cursor-not-allowed">
                  <i data-feather="check-square" class="w-4 h-4 stroke-blue-600 mt-1 shrink-0"></i>
                  <span class="text-sm">Use module bundler (webpack, Vite, etc.).</span>
                </li>
                <li class="flex items-start gap-2 select-none cursor-not-allowed">
                  <i data-feather="check-square" class="w-4 h-4 stroke-blue-600 mt-1 shrink-0"></i>
                  <span class="text-sm">Build RESTful API to support Front-End App.</span>
                </li>
                <li class="flex items-start gap-2 select-none cursor-not-allowed">
                  <i data-feather="check-square" class="w-4 h-4 stroke-blue-600 mt-1 shrink-0"></i>
                  <span class="text-sm">API can save data with or without a database.</span>
                </li>
                <li class="flex items-start gap-2 select-none cursor-not-allowed">
                  <i data-feather="check-square" class="w-4 h-4 stroke-blue-600 mt-1 shrink-0"></i>
                  <span class="text-sm">Create RESTful APIs with standard URL design.</span>
                </li>
                <li class="flex items-start gap-2 select-none cursor-not-allowed">
                  <i data-feather="check-square" class="w-4 h-4 stroke-blue-600 mt-1 shrink-0"></i>
                  <span class="text-sm">Integrate AI/ML as app’s main feature (backend/device).</span>
                </li>
                <li class="flex items-start gap-2 select-none cursor-not-allowed">
                  <i data-feather="check-square" class="w-4 h-4 stroke-blue-600 mt-1 shrink-0"></i>
                  <span class="text-sm">Ensure core features run without crashing.</span>
                </li>
                <li class="flex items-start gap-2 select-none cursor-not-allowed">
                  <i data-feather="check-square" class="w-4 h-4 stroke-blue-600 mt-1 shrink-0"></i>
                  <span class="text-sm">Web generators for front/back-end are prohibited.</span>
                </li>
                <li class="flex items-start gap-2 select-none cursor-not-allowed">
                  <i data-feather="check-square" class="w-4 h-4 stroke-blue-600 mt-1 shrink-0"></i>
                  <span class="text-sm">Deploy to server (GitHub Pages, Netlify, Vercel).</span>
                </li>
              </ul>
            </div>


            <div id="content-recommend" role="tabpanel" aria-labelledby="tab-recommend" hidden>
              <ul class="list-none space-y-3 text-gray-700">
                <li class="flex items-start gap-2 select-none cursor-not-allowed">
                  <i data-feather="check-square" class="w-4 h-4 stroke-blue-600 mt-1 shrink-0"></i>
                  <span class="text-sm">Use animation transitions and beautiful assets that suit the app’s purpose.</span>
                </li>
                <li class="flex items-start gap-2 select-none cursor-not-allowed">
                  <i data-feather="check-square" class="w-4 h-4 stroke-blue-600 mt-1 shrink-0"></i>
                  <span class="text-sm">Meet all mandatory characteristics to your web apps to become PWA.</span>
                </li>
                <li class="flex items-start gap-2 select-none cursor-not-allowed">
                  <i data-feather="check-square" class="w-4 h-4 stroke-blue-600 mt-1 shrink-0"></i>
                  <span class="text-sm">The RESTful API can save data to the database.</span>
                </li>
                <li class="flex items-start gap-2 select-none cursor-not-allowed">
                  <i data-feather="check-square" class="w-4 h-4 stroke-blue-600 mt-1 shrink-0"></i>
                  <span class="text-sm">The RESTful API was built with the Hapi Framework.</span>
                </li>
                <li class="flex items-start gap-2 select-none cursor-not-allowed">
                  <i data-feather="check-square" class="w-4 h-4 stroke-blue-600 mt-1 shrink-0"></i>
                  <span class="text-sm">Tools recommendation for boosting your web app development: Bootstrap/Tailwind CSS, Axios.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
