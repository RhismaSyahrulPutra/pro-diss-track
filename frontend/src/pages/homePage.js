// pages/Home.js
export default function Home() {
  return `
    <section class="w-full min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 class="text-6xl font-bold mb-4">PRO DISS TRACK</h1>
      <p class="text-lg mb-6">Explore more about us.</p>
      <div class="flex gap-14">
        <a 
          href="#about" 
          class="bg-blue-600 text-white px-6 py-4 rounded-md font-semibold text-sm transition hover:bg-blue-700 hover:shadow-lg"
        >
          About This App
        </a>
        <a 
          href="#login" 
          class="bg-blue-200 border border-blue-600 text-blue-600 px-6 py-4 rounded-md font-semibold text-sm transition hover:bg-blue-300 hover:shadow-lg hover:border-2 hover:border-blue-700"
        >
          Sign In / Sign Up
        </a>
      </div>
    </section>
  `;
}
