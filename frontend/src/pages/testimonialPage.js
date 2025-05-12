// pages/testimonialPage.js
export default function Testimonial() {
  return `
    <section class="w-full min-h-screen text-center px-4 pt-28">
      <!-- Heading -->
      <h2 class="text-4xl font-bold mb-6">What Our Users Say</h2>
      <!-- Konten Testimonial -->
      <div class="max-w-4xl mx-auto space-y-6">
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <p class="text-lg italic">"Platform ini sangat membantu saya!"</p>
          <p class="mt-4 font-semibold">– Alex</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <p class="text-lg italic">"UI/UX-nya simpel dan keren banget!"</p>
          <p class="mt-4 font-semibold">– Nia</p>
        </div>
      </div>
    </section>
  `;
}
