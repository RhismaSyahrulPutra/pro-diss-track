import axios from 'axios';
import { BASE_URL } from '../../config/config.js';

export default async function Lesson(queryString = '') {
  const params = new URLSearchParams(queryString);
  const courseId = params.get('id');
  const lessonIndex = parseInt(params.get('lesson') || '0'); // default: lesson pertama

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

    const lessonPhoto =
      currentLesson.lesson_photo || '/assets/images/lesson-placeholder.jpg';
    const lessonTitle = currentLesson.lesson_title || 'Judul Pelajaran';
    const lessonDesc = currentLesson.lesson_desc || '';
    const lessonContent =
      currentLesson.lesson_content || '<p>Konten tidak tersedia.</p>';

    // Bangun link URL navigasi
    const baseLink = `#/lesson?id=${courseId}`;
    const prevLink = `${baseLink}&lesson=${index - 1}`;
    const nextLink = `${baseLink}&lesson=${index + 1}`;
    const backToCourseLink = `#course`;

    return `
      <section class="py-24 min-h-screen px-4 overflow-x-hidden bg-gray-50">
  <div class="flex gap-8 items-start">
    <!-- Kiri: Card Summary -->
    <div class="w-1/3">
      <div class="bg-white p-6 rounded-lg shadow max-w-md">
        <img src="${lessonPhoto}" alt="${lessonTitle}" class="w-full h-48 object-cover rounded-md mb-4" />
        <h2 class="text-2xl font-bold mb-2 text-blue-600">${lessonTitle}</h2>
        <p class="text-gray-600">${lessonDesc}</p>
      </div>
    </div>

    <!-- Kanan: Konten -->
    <div class="flex-1 bg-white p-6 rounded-lg shadow prose max-w-none overflow-auto max-h-[600px]">
      ${lessonContent}
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
  </div>
</section>
    `;
  } catch (error) {
    return `<section class="py-24 min-h-screen px-4 bg-gray-50">
      <h1>Gagal memuat data pelajaran.</h1>
      <p>${error.message}</p>
    </section>`;
  }
}
