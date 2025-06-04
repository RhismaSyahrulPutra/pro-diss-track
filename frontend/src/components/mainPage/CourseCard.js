export default function CourseCard({ title, description, imageUrl, id }) {
  return `
    <div 
      class="course-card bg-white/80 backdrop-blur-md border border-white/30 shadow-md rounded-xl overflow-hidden transition-transform hover:scale-95 cursor-pointer"
      data-id="${id}"
    >
      <img src="${imageUrl}" alt="${title}" class="w-full h-50 object-cover object-center" />

      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-800 mb-2 truncate" title="${title}">${title}</h3>
        <p class="text-sm text-gray-600 line-clamp-3">${description}</p>
      </div>
    </div>
  `;
}
