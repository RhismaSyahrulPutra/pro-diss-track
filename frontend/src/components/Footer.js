// components/Footer.js
export default function Footer() {
  return `
    <footer class="bg-gray-800 text-white py-8">
      <div class="container mx-auto px-6">
        <!-- Footer grid dengan dua kolom -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
          <!-- Bagian pertama (Company Name dan paragraf) di kiri -->
          <div class="md:col-span-4">
            <h3 class="text-xl font-semibold mb-4">COMPANY NAME</h3>
            <p class="text-sm leading-relaxed">Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>

          <!-- Bagian kedua (Products, Useful Links, dan Contact) di kanan -->
          <div class="md:col-span-8 md:ml-auto">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-24">
              <!-- Products Section -->
              <div>
                <h3 class="text-xl font-semibold mb-4">PRODUCTS</h3>
                <ul class="text-sm leading-relaxed">
                  <li><a href="#mdbootstrap" class="hover:text-gray-400">MDBootstrap</a></li>
                  <li><a href="#mdwordpress" class="hover:text-gray-400">MDWordPress</a></li>
                  <li><a href="#brandflow" class="hover:text-gray-400">BrandFlow</a></li>
                  <li><a href="#bootstrap-angular" class="hover:text-gray-400">Bootstrap Angular</a></li>
                </ul>
              </div>

              <!-- Useful Links Section -->
              <div>
                <h3 class="text-xl font-semibold mb-4">USEFUL LINKS</h3>
                <ul class="text-sm leading-relaxed">
                  <li><a href="#your-account" class="hover:text-gray-400">Your Account</a></li>
                  <li><a href="#become-affiliate" class="hover:text-gray-400">Become an Affiliate</a></li>
                  <li><a href="#shipping-rates" class="hover:text-gray-400">Shipping Rates</a></li>
                  <li><a href="#help" class="hover:text-gray-400">Help</a></li>
                </ul>
              </div>

              <!-- Contact Section -->
              <div>
                <h3 class="text-xl font-semibold mb-4">CONTACT</h3>
                <ul class="text-sm leading-relaxed">
                  <li><a href="https://maps.google.com/?q=New+York,+NY+10012,+US" target="_blank" class="hover:text-gray-400">New York, NY 10012, US</a></li>
                  <li><a href="mailto:info@example.com" class="hover:text-gray-400">info@example.com</a></li>
                  <li><a href="tel:+123456788" class="hover:text-gray-400">+01 234 567 88</a></li>
                  <li><a href="tel:+123456789" class="hover:text-gray-400">+01 234 567 89</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Copyright Section -->
        <div class="mt-8 text-center text-sm leading-relaxed">
          <p>&copy; 2025 PRO DISS TRACK. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  `;
}
