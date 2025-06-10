import 'aos/dist/aos.css';
import feather from 'feather-icons';

export default function About() {
  setTimeout(() => {
    feather.replace({ stroke: '#2563EB' });
  }, 100);

  return `
    <section
      id="about"
      class="section-about py-20 sm:py-24 scroll-mt-20 overflow-x-hidden"
      data-aos="fade-up"
      data-aos-delay="30"
      data-aos-duration="1000"
    >
      <div class="container mx-auto px-4">
        <div class="text-center mt-2 mb-10" data-aos="fade-down" data-aos-delay="100" data-aos-duration="800">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 tracking-wide flex items-center justify-center gap-3">
            <i data-feather="info" class="w-7 h-7 sm:w-8 sm:h-8 stroke-blue-600"></i>
            ABOUT THIS APPS
          </h2>
        </div>

        <div class="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8 px-2 sm:px-4">
          <!-- Card kiri -->
          <div
            class="flex-1 bg-white/80 border border-black/20 backdrop-blur-md p-5 sm:p-6 md:p-8 rounded-lg shadow-md"
            data-aos="fade-right"
            data-aos-delay="200"
            data-aos-duration="800"
          >
            <h2 class="text-xl sm:text-2xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
              <i data-feather="book-open" class="w-5 h-5 sm:w-6 sm:h-6 stroke-current text-blue-600"></i>
              Latar Belakang
            </h2>
            <p class="text-sm sm:text-sm text-justify text-gray-700 leading-relaxed">
              Di Indonesia, terdapat sekitar 2 juta penyandang disabilitas tuna rungu wicara, menurut data Kementerian Sosial Republik Indonesia. Mereka merupakan bagian signifikan dari masyarakat yang membutuhkan komunikasi inklusif. Namun, media pembelajaran bahasa isyarat untuk orang normal yang ingin belajar berkomunikasi dengan mereka masih sangat terbatas. Kurangnya akses terhadap platform edukatif yang mudah dipahami dan interaktif menyebabkan kesenjangan komunikasi dan menjadi hambatan dalam mendorong inklusi sosial antara masyarakat umum dan penyandang disabilitas rungu wicara.
            </p>
          </div>

          <!-- Card kanan -->
          <div
            class="flex-1 bg-white/80 border border-black/20 backdrop-blur-md p-5 sm:p-6 md:p-8 rounded-lg shadow-md"
            data-aos="fade-left"
            data-aos-delay="300"
            data-aos-duration="800"
          >
            <h2 class="text-xl sm:text-2xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
              <i data-feather="target" class="w-5 h-5 sm:w-6 sm:h-6 stroke-current text-blue-600"></i>
              Tujuan Project
            </h2>
            <ul class="list-none text-sm sm:text-base text-gray-700 leading-relaxed space-y-2">
              ${[
                'Mengembangkan platform pembelajaran bahasa isyarat berbasis web yang interaktif, mudah diakses, dan inklusif.',
                'Meningkatkan pemahaman visual bahasa isyarat dengan penerapan teknologi Machine Learning seperti CNN.',
                'Melakukan pengumpulan data bahasa isyarat dan pelatihan model machine learning yang akurat.',
                'Melakukan integrasi Frontend dan Backend dengan Machine Learning dengan Tensorflow.js.',
                'Mendukung komunikasi inklusif antara penyandang disabilitas rungu wicara dan masyarakat luas dengan teknologi ramah pengguna.',
              ]
                .map(
                  (item) => `
                <li class="flex items-start">
                  <span class="flex-shrink-0 w-2 h-2 mt-2 mr-3 rounded-full bg-blue-600"></span>
                  <span class='text-sm'>${item}</span>
                </li>
              `,
                )
                .join('')}
            </ul>
          </div>
        </div>
      </div>
    </section>
  `;
}
