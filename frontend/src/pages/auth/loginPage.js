export default function Login() {
  return `
    <section class="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div class="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
        <form id="login-form" class="space-y-4">
          <div>
            <label class="block mb-1 font-medium" for="email">Email</label>
            <input type="email" id="email" required class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label class="block mb-1 font-medium" for="password">Password</label>
            <div class="relative">
              <input type="password" id="password" required class="w-full px-4 py-2 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <button type="button" id="toggle-password"
                class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none">
                <i data-feather="eye"></i>
              </button>
            </div>
          </div>
          <button type="submit" class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Login</button>
        </form>
        <p class="text-center text-sm mt-4">Belum punya akun? <a href="#signup" class="text-blue-600 hover:underline">Daftar</a></p>
      </div>
    </section>
  `;
}
