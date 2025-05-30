export default function CourseCard({ title, description, imageUrl }) {
  return `
    <div class="bg-white/80 backdrop-blur-md border border-white/30 shadow-md rounded-xl overflow-hidden transition transform hover:scale-105">
      <img src="${imageUrl}" alt="${title}" class="w-full h-40 object-cover">
      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">${title}</h3>
        <p class="text-sm text-gray-600">${description}</p>
      </div>
    </div>
  `;
}
