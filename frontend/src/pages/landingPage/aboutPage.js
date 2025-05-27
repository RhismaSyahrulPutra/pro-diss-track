import 'aos/dist/aos.css';

export default function About() {
  return `
    <section class="section-about py-24 min-h-screen">
    <div class="text-center mt-2 mb-8" data-aos="fade-up" data-aos-delay="50">
        <h2 class="text-4xl font-bold text-gray-800 tracking-wide">ABOUT THIS APPS</h2>
      </div>
      <div class="max-w-screen mx-auto flex gap-8 flex-col md:flex-row">
        <!-- Card kiri -->
        <div 
          class="flex-1 bg-white p-8 rounded-lg shadow-md" 
          data-aos="fade-right" 
          data-aos-delay="100"
        >
          <h2 class="text-2xl font-semibold mb-4 text-gray-900">Latar Belakang</h2>
          <p class="text-sm text-justify text-gray-700 leading-relaxed">
            Di Indonesia, terdapat sekitar 2 juta penyandang disabilitas tuna rungu wicara, menurut data Kementerian Sosial Republik Indonesia. Mereka merupakan bagian signifikan dari masyarakat yang membutuhkan komunikasi inklusif. Namun, media pembelajaran bahasa isyarat untuk orang normal yang ingin belajar berkomunikasi dengan mereka masih sangat terbatas. Kurangnya akses terhadap platform edukatif yang mudah dipahami dan interaktif menyebabkan kesenjangan komunikasi dan menjadi hambatan dalam mendorong inklusi sosial antara masyarakat umum dan penyandang disabilitas rungu wicara.
          </p>
          <p class="text-sm text-justify text-gray-700 leading-relaxed mt-4">
           Pengembangan website ini bertujuan membuat platform efektif untuk orang normal belajar bahasa isyarat, dengan fitur interaktif yang mudah dipahami, serta mendukung kesadaran dan inklusi sosial bagi penyandang disabilitas rungu wicara.
          </p>
        </div>

        <!-- Card kanan -->
        <div 
          class="flex-1 bg-white p-8 rounded-lg shadow-md"
          data-aos="fade-left"
          data-aos-delay="100"
        >
          <h2 class="text-2xl font-semibold mb-4 text-gray-900">Tujuan Project</h2>
          <p class="text-sm text-justify text-gray-700 leading-relaxed">
            Proyek ini bertujuan mengembangkan platform pembelajaran bahasa isyarat berbasis web yang interaktif dan mudah diakses oleh masyarakat umum. Dengan menggunakan teknologi Machine Learning seperti SVM, KNN, dan Random Forest, platform ini memungkinkan pemahaman visual bahasa isyarat secara lebih efektif.
          </p>
          <p class="text-sm text-justify text-gray-700 leading-relaxed mt-4">
            Pengembangan mencakup pengumpulan data, pelatihan model ML, serta integrasi frontend dan backend menggunakan TensorFlow, OpenCV, Node.js, dan Tailwind CSS. Proyek ini juga fokus pada peningkatan akurasi model dan pengalaman pengguna agar komunikasi inklusif antara penyandang disabilitas rungu wicara dan masyarakat luas dapat terwujud.
          </p>
        </div>
      </div>
    </section>
  `;
}
