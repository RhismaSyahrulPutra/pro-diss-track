export const TestimonialView = {
  renderLoading(container) {
    container.innerHTML = `<p class="col-span-full text-center text-gray-500">Memuat testimonial...</p>`;
  },

  renderAverageRating(container, avgRating) {
    const fullStars = '★'.repeat(Math.floor(avgRating));
    const emptyStars = '☆'.repeat(5 - Math.floor(avgRating));
    const stars = `${fullStars}${emptyStars}`;

    container.innerHTML = `
      <div class="flex justify-center items-center gap-3 text-yellow-400 text-4xl font-semibold mb-8">
        <span>${stars}</span>
        <span class="text-gray-700 text-xl">(${avgRating.toFixed(1)})</span>
      </div>
    `;
  },

  renderTestimonials(container, testimonials) {
    if (!testimonials.length) {
      container.innerHTML = `<p class="text-center text-gray-500 w-full">Belum ada testimonial.</p>`;
      return;
    }

    container.innerHTML = testimonials
      .map(({ rating, username, testimonial_text }) => {
        const fullStars = '★'.repeat(Number(rating));
        const emptyStars = '☆'.repeat(5 - Number(rating));
        const stars = `${fullStars}${emptyStars}`;

        return `
        <div class="snap-start flex-shrink-0 w-[90%] sm:w-[48%] md:w-[30%] lg:w-[22%] xl:w-[22%] bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
          <div class="flex items-center gap-2 text-yellow-400 text-3xl mb-3">
            <span>${stars}</span>
            <span class="text-sm text-gray-600 font-medium">(${rating}.0)</span>
          </div>
          <p class="font-semibold text-lg mb-2">${username}</p>
          <p class="text-xs italic max-w-xs">${testimonial_text}</p>
        </div>
      `;
      })
      .join('');
  },
};
