export default function Footer() {
  return `
    <footer class="bg-gray-900 text-white py-12">
      <div class="container mx-auto px-6 max-w-screen-xl">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-24">
          <!-- Bagian kiri -->
          <div class="md:col-span-4">
            <h3 class="text-2xl font-bold mb-6 tracking-wide uppercase">PRO DISS TRACK</h3>
            <p class="text-sm leading-relaxed text-justify text-gray-300">
              Aplikasi ini adalah platform pembelajaran bahasa isyarat berbasis web yang menggunakan Machine Learning untuk mengenali gerakan tangan. Tujuannya adalah mempermudah komunikasi antara penyandang disabilitas rungu wicara dan masyarakat luas melalui teknologi yang inklusif dan mudah diakses.
            </p>
          </div>

          <!-- Bagian kanan -->
          <div class="md:col-span-8">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <!-- Useful Links -->
              <div>
                <h4 class="text-xl font-semibold mb-5 tracking-wide border-b border-gray-700 pb-2">Useful Links</h4>
                <ul class="space-y-3 text-gray-400 text-sm">
                  <li><a href="#your-account" class="hover:text-white transition-colors duration-300">Your Account</a></li>
                  <li><a href="#become-affiliate" class="hover:text-white transition-colors duration-300">Become an Affiliate</a></li>
                  <li><a href="#shipping-rates" class="hover:text-white transition-colors duration-300">Shipping Rates</a></li>
                  <li><a href="#help" class="hover:text-white transition-colors duration-300">Help</a></li>
                </ul>
              </div>

              <!-- Anggota Kelompok -->
              <div>
                <h4 class="text-xl font-semibold mb-5 tracking-wide border-b border-gray-700 pb-2">Anggota Kelompok</h4>
                <ul class="space-y-3 text-gray-400 text-sm">
                  <li>
                    <a href="https://www.linkedin.com/in/robertinogladdennarendra" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors duration-300">
                      Robertino Gladden Narendra
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/dyna-akmila" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors duration-300">
                      Dyna Akmila
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/rasy" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors duration-300">
                      Muhammad Rasyid Nurrohim
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/rhisma-syahrul-putra" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors duration-300">
                      Rhisma Syahrul Putra
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/aditya-ohara" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors duration-300">
                      Aditya Ramadhan
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/mohamad-zaelani-wira-kusuma-4859b3262" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors duration-300">
                      Mohamad Zaelani Wira Kusuma
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Copyright -->
        <div class="mt-16 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm select-none">
          <p>&copy; 2025 PRO DISS TRACK. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  `;
}
