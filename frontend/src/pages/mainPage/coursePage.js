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

  let greeting = 'Selamat datang!';

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

        try {
          const profileRes = await axios.get(
            `${BASE_URL}/profiles/${accountId}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            },
          );

          const profile = profileRes?.data?.data?.profile;
          if (profile?.profile_photo_url) {
            user.photo = profile.profile_photo_url;
          }
        } catch {
          console.warn('Foto profil tidak tersedia. Menggunakan default.');
        }
      } else {
        notyf.error('Username tidak ditemukan di data akun.');
      }
    } catch {
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
  } catch {
    notyf.error('Gagal memuat data kursus.');
  }

  const cardsHTML = courses
    .map((course) => {
      const imageUrl = course.course_photo
        ? `${import.meta.env.BASE_URL}${course.course_photo.replace(/^\//, '')}`
        : `${import.meta.env.BASE_URL}assets/images/course_placeholder.jpg`;

      return `
      <div class="course-card cursor-pointer" data-id="${course.course_id}" data-aos="fade-up" data-aos-delay="100" data-aos-duration="600" data-aos-once="true">
        ${CourseCard({
          title: course.course_title,
          description: course.course_desc,
          imageUrl,
        })}
      </div>
    `;
    })
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
    <section class="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div class="max-w-screen-xl mx-auto">

        <!-- Header -->
        <div 
          class="flex flex-row items-center gap-6 bg-white/80 border border-blue-200 border-b-4 border-b-blue-500 backdrop-blur-md p-6 rounded-xl shadow mb-8"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-once="true"
        >
          <img src="${user.photo}" alt="Profile" class="w-20 h-20 sm:w-24 sm:h-24 aspect-square rounded-full object-cover border-2 border-blue-400 shadow-md" />
          <div class="text-left">
            <p class="text-sm text-gray-600 mb-1">${greeting}</p>
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">${user.name}</h2>
            <span class="inline-block mt-1 text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">${user.role}</span>
          </div>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-4 pb-2">
          Huruf Isyarat dalam Bisindo
        </h2>
        <!-- Course Cards Grid -->
        <div 
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="800"
          data-aos-once="true"
        >
          ${cardsHTML}
        </div>
      </div>
    </section>
  `;
}
