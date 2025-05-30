import CourseCard from '../../components/mainPage/CourseCard.js';

export default function Course() {
  const user = {
    name: 'Rhisma Syahrul',
    role: 'Siswa',
    photo: '/assets/images/profile.jpg',
  };

  const courses = [
    {
      title: 'Materi A - D',
      description: 'Belajar materi bahasa isyarat untuk huruf: A, B, C, D',
      imageUrl: '/assets/images/course_placeholder.jpg',
    },
    {
      title: 'Materi E - H',
      description: 'Belajar materi bahasa isyarat untuk huruf: E, F, G, H',
      imageUrl: '/assets/images/course_placeholder.jpg',
    },
    {
      title: 'Materi I - L',
      description: 'Belajar materi bahasa isyarat untuk huruf: I, J, K, L',
      imageUrl: '/assets/images/course_placeholder.jpg',
    },
    {
      title: 'Materi M - P',
      description: 'Belajar materi bahasa isyarat untuk huruf: M, N, O, P',
      imageUrl: '/assets/images/course_placeholder.jpg',
    },
    {
      title: 'Materi Q - T',
      description: 'Belajar materi bahasa isyarat untuk huruf: Q, R, S, T',
      imageUrl: '/assets/images/course_placeholder.jpg',
    },
    {
      title: 'Materi U - Z',
      description:
        'Belajar materi bahasa isyarat untuk huruf: U, V, W, X, Y, Z',
      imageUrl: '/assets/images/course_placeholder.jpg',
    },
  ];

  return `
    <section class="py-24 min-h-screen px-4 overflow-x-hidden bg-gray-50">
      <div class="max-w-screen-xl mx-auto">
        <!-- Greeting Header -->
        <div class="flex items-center gap-6 bg-white/70 border border-blue-200 border-b-4 border-b-blue-500 backdrop-blur-md p-6 rounded-xl shadow mb-10">
          <img src="${user.photo}" alt="Profile" class="w-20 h-20 rounded-full object-cover border-2 border-blue-400 shadow-md" />
          <div>
            <p class="text-sm text-gray-600 mb-1">Selamat datang kembali,</p>
            <h2 class="text-2xl font-bold text-gray-800 tracking-tight">${user.name}</h2>
            <span class="inline-block mt-1 text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">${user.role}</span>
          </div>
        </div>

        <!-- Course Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          ${courses.map((course) => CourseCard(course)).join('')}
        </div>
      </div>
    </section>
  `;
}
