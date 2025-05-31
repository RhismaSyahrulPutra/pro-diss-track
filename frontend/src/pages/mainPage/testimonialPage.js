export default function TestimonialForm() {
  return `
    <section
      class="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4 pt-5"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div
        class="max-w-md w-full bg-white p-8 rounded-xl shadow-md"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="200"
      >
        <h2 class="text-2xl font-bold mb-6 text-center text-blue-700">YOUR TESTIMONIAL</h2>
        <form id="testimonial-form" class="space-y-4">
          <div>
            <label class="block mb-1 font-medium" for="username">Username</label>
            <input
              type="text"
              id="username"
              required
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nama Anda"
            />
          </div>
          <div>
            <label class="block mb-1 font-medium" for="job">Pekerjaan</label>
            <input
              type="text"
              id="job"
              required
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Pekerjaan Anda"
            />
          </div>
          <div>
            <label class="block mb-1 font-medium" for="testimonial">Testimonial</label>
            <textarea
              id="testimonial"
              rows="4"
              required
              class="w-full px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Tulis testimonial Anda di sini..."
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Kirim
          </button>
        </form>
      </div>
    </section>
  `;
}
