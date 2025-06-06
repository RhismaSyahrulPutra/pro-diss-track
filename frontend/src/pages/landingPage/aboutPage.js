import 'aos/dist/aos.css';
import feather from 'feather-icons';

export default function About() {
  setTimeout(() => {
    feather.replace({ stroke: '#2563EB' });
  }, 100);

  return `
    <section
      class="section-about py-24 overflow-x-hidden"
      data-aos="fade-up"
      data-aos-delay="30"
      data-aos-duration="1000"
    >
      <div class="text-center mt-2 mb-8" data-aos="fade-down" data-aos-delay="100" data-aos-duration="800">
        <h2 class="text-4xl font-bold text-gray-800 tracking-wide flex items-center justify-center gap-3">
          <i data-feather="info" class="w-8 h-8 stroke-blue-600"></i>
          ABOUT THIS APPS
        </h2>
      </div>

      <div class="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row gap-8 px-4 box-border">
        <!-- Card kiri -->
        <div
          class="flex-1 bg-white/80 border border-black/20 backdrop-blur-md p-6 sm:p-8 rounded-lg shadow-md"
          data-aos="fade-right"
          data-aos-delay="200"
          data-aos-duration="800"
        >
          <h2 class="text-2xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
            <i data-feather="book-open" class="w-6 h-6 stroke-current text-blue-600"></i>
            Latar Belakang
          </h2>
          <p class="text-sm text-justify text-gray-700 leading-relaxed">
            Di Indonesia, terdapat sekitar 2 juta penyandang disabilitas tuna rungu wicara, menurut data Kementerian Sosial Republik Indonesia. Mereka merupakan bagian signifikan dari masyarakat yang membutuhkan komunikasi inklusif. Namun, media pembelajaran bahasa isyarat untuk orang normal yang ingin belajar berkomunikasi dengan mereka masih sangat terbatas. Kurangnya akses terhadap platform edukatif yang mudah dipahami dan interaktif menyebabkan kesenjangan komunikasi dan menjadi hambatan dalam mendorong inklusi sosial antara masyarakat umum dan penyandang disabilitas rungu wicara.
          </p>
        </div>

        <!-- Card kanan -->
        <div
          class="flex-1 bg-white/80 border border-black/20 backdrop-blur-md p-6 sm:p-8 rounded-lg shadow-md"
          data-aos="fade-left"
          data-aos-delay="300"
          data-aos-duration="800"
        >
          <h2 class="text-2xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
            <i data-feather="target" class="w-6 h-6 stroke-current text-blue-600"></i>
            Tujuan Project
          </h2>
          <ul class="list-none text-sm text-gray-700 leading-relaxed space-y-2">
            <li class="flex items-start">
              <span class="flex-shrink-0 w-2 h-2 mt-2 mr-3 rounded-full bg-blue-600"></span>
              <span>Mengembangkan platform pembelajaran bahasa isyarat berbasis web yang interaktif, mudah diakses, dan inklusif.</span>
            </li>
            <li class="flex items-start">
              <span class="flex-shrink-0 w-2 h-2 mt-2 mr-3 rounded-full bg-blue-600"></span>
              <span>Meningkatkan pemahaman visual bahasa isyarat dengan penerapan teknologi Machine Learning seperti CNN.</span>
            </li>
            <li class="flex items-start">
              <span class="flex-shrink-0 w-2 h-2 mt-2 mr-3 rounded-full bg-blue-600"></span>
              <span>Melakukan pengumpulan data bahasa isyarat dan pelatihan model machine learning yang akurat.</span>
            </li>
            <li class="flex items-start">
              <span class="flex-shrink-0 w-2 h-2 mt-2 mr-3 rounded-full bg-blue-600"></span>
              <span>Melakukan integrasi Frontend dan Backend dengan Machine Learning dengan Tensorflow.js</span>
            </li>
            <li class="flex items-start">
              <span class="flex-shrink-0 w-2 h-2 mt-2 mr-3 rounded-full bg-blue-600"></span>
              <span>Mendukung komunikasi inklusif antara penyandang disabilitas rungu wicara dan masyarakat luas dengan teknologi ramah pengguna.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  `;
}
