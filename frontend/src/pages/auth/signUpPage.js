export default function SignUp() {
  return `
    <section class="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div class="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 class="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form id="signUpForm" class="space-y-4">
          <div>
            <label for="username" class="block mb-1 font-medium">Username</label>
            <input type="text" id="username" name="username" required
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label for="email" class="block mb-1 font-medium">Email</label>
            <input type="email" id="email" name="email" required
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div class="relative">
            <label for="password" class="block mb-1 font-medium">Password</label>
            <input type="password" id="password" name="password" required
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <button type="button" id="toggle-password" class="absolute right-3 top-9 text-gray-600">
              <i data-feather="eye"></i>
            </button>
          </div>
          <div class="relative">
            <label for="confirmPassword" class="block mb-1 font-medium">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <button type="button" id="toggle-confirm-password" class="absolute right-3 top-9 text-gray-600">
              <i data-feather="eye"></i>
            </button>
          </div>
          <button type="submit" 
            class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Sign Up
          </button>
        </form>
        <p class="text-center text-sm mt-4">Sudah punya akun? 
          <a href="#login" class="text-blue-600 hover:underline">Login</a>
        </p>
      </div>
    </section>
  `;
}
