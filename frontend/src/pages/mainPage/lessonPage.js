import axios from 'axios';
import { BASE_URL } from '../../config/config.js';
import 'aos/dist/aos.css';

export default async function Lesson(queryString = '') {
  const params = new URLSearchParams(queryString);
  const courseId = params.get('id');
  const lessonIndex = parseInt(params.get('lesson') || '0');

  const accountId = localStorage.getItem('accountId');
  const accessToken = localStorage.getItem('accessToken');

  if (!courseId) {
    return `<section class="py-24 min-h-screen px-4 bg-gray-50">
      <h1>ID kursus tidak ditemukan</h1>
    </section>`;
  }

  if (!accountId || !accessToken) {
    return `<section class="py-24 min-h-screen px-4 bg-gray-50">
      <h1>Anda harus login untuk mengakses halaman ini.</h1>
    </section>`;
  }

  try {
    const res = await axios.get(`${BASE_URL}/courses/${courseId}/lessons`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const lessons = res.data.data.lessons;

    if (!lessons || lessons.length === 0) {
      return `<section class="py-24 min-h-screen px-4 bg-gray-50">
        <h1>Tidak ada pelajaran ditemukan.</h1>
      </section>`;
    }

    const index = Math.min(Math.max(lessonIndex, 0), lessons.length - 1);
    const currentLesson = lessons[index];

    const lessonPhoto = currentLesson.lesson_photo
      ? `${import.meta.env.BASE_URL}${currentLesson.lesson_photo.replace(/^\//, '')}`
      : `${import.meta.env.BASE_URL}assets/images/lesson-placeholder.jpg`;
    const lessonTitle = currentLesson.lesson_title || 'Judul Pelajaran';
    const lessonDesc = currentLesson.lesson_desc || '';

    const baseLink = `#/lesson?id=${courseId}`;
    const prevLink = `${baseLink}&lesson=${index - 1}`;
    const nextLink = `${baseLink}&lesson=${index + 1}`;
    const backToCourseLink = `#course`;

    return `
      <section class="py-24 min-h-screen px-4 bg-gray-50" data-aos="fade-up">
        <div class="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow" data-aos="fade-up" data-aos-delay="100">
          
          <!-- Bagian gambar, judul, dan deskripsi di tengah -->
          <div class="text-center flex flex-col items-center">
            <img src="${lessonPhoto}" alt="${lessonTitle}" class="w-72 h-72 object-cover rounded-md mb-4" />
            <h2 class="text-3xl font-bold mb-2 text-blue-600">${lessonTitle}</h2>
            <p class="text-gray-600 mb-6 max-w-xl">${lessonDesc}</p>
          </div>

          <!-- Navigasi -->
          <div class="mt-6 flex justify-between">
            ${
              index > 0
                ? `<a href="${prevLink}" class="px-4 py-2 bg-gray-300 text-gray-700 rounded">⬅ Sebelumnya</a>`
                : `<span class="px-4 py-2 bg-gray-100 text-gray-400 rounded cursor-not-allowed">Sebelumnya</span>`
            }

            ${
              index < lessons.length - 1
                ? `<a href="${nextLink}" class="px-4 py-2 bg-blue-600 text-white rounded">Selanjutnya</a>`
                : `<a href="${backToCourseLink}" class="px-4 py-2 bg-green-600 text-white rounded">Kembali ke Kursus</a>`
            }
          </div>
        </div>

        <script>
          if (typeof AOS !== 'undefined') {
            AOS.init();
          }
        </script>
      </section>
    `;
  } catch (error) {
    return `<section class="py-24 min-h-screen px-4 bg-gray-50">
      <h1>Gagal memuat data pelajaran.</h1>
      <p>${error.message}</p>
    </section>`;
  }
}
