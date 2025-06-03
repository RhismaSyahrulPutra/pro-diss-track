import CourseCard from '../../components/mainPage/CourseCard.js';
import axios from 'axios';
import { BASE_URL } from '../../config/config.js';
import notyf from '../../utils/notyf.js';
import 'aos/dist/aos.css';

export default async function Course() {
  const accountId = localStorage.getItem('accountId');
  const accessToken = localStorage.getItem('accessToken');

  const user = {
    name: 'Pengguna',
    role: 'Siswa',
    photo: '/assets/images/profile.jpg',
  };

  let greeting = 'Selamat datang!'; // Default

  if (!accountId || !accessToken) {
    notyf.error('Tidak dapat memuat akun. Silakan login ulang.');
  } else {
    try {
      const res = await axios.get(`${BASE_URL}/accounts/${accountId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const account = res?.data?.data?.account;
      if (account?.username) {
        user.name = account.username;
        localStorage.setItem('username', account.username);
      } else {
        notyf.error('Username tidak ditemukan di data akun.');
      }
    } catch (err) {
      notyf.error('Gagal memuat data akun.');
    }
  }

  let courses = [];

  try {
    const courseRes = await axios.get(`${BASE_URL}/courses`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    courses = courseRes?.data?.data?.courses || [];
  } catch (err) {
    notyf.error('Gagal memuat data kursus.');
  }

  const cardsHTML = courses
    .map(
      (course) => `
        <div class="course-card cursor-pointer" data-id="${course.course_id}">
          ${CourseCard({
            title: course.course_title,
            description: course.course_desc,
            imageUrl:
              course.course_photo || '/assets/images/course_placeholder.jpg',
          })}
        </div>
      `,
    )
    .join('');

  setTimeout(() => {
    document.querySelectorAll('.course-card').forEach((card) => {
      card.addEventListener('click', () => {
        const courseId = card.getAttribute('data-id');
        console.log('Navigasi ke lesson dengan id:', courseId);
        window.location.hash = `#lesson?id=${courseId}`;
      });
    });
  }, 0);

  return `
    <section class="py-24 min-h-screen px-4 overflow-x-hidden bg-gray-50">
      <div class="max-w-screen-xl mx-auto">
        <!-- Header -->
        <div 
          class="flex items-center gap-6 bg-white/70 border border-blue-200 border-b-4 border-b-blue-500 backdrop-blur-md p-6 rounded-xl shadow mb-10"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <img src="${user.photo}" alt="Profile" class="w-20 h-20 rounded-full object-cover border-2 border-blue-400 shadow-md" />
          <div>
            <p class="text-sm text-gray-600 mb-1">${greeting}</p>
            <h2 class="text-2xl font-bold text-gray-800 tracking-tight">${user.name}</h2>
            <span class="inline-block mt-1 text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">${user.role}</span>
          </div>
        </div>

        <!-- Course Cards -->
        <div 
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="200"
        >
          ${cardsHTML}
        </div>
      </div>
    </section>
  `;
}
