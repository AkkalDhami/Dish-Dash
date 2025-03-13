const footerSection = document.querySelector(".footerSection");
footerSection.innerHTML += `
 <section>
        <div class="container mx-auto px-4 relative mb-9">
          <!-- Main Footer Content -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <!-- Brand Section -->
            <div class="space-y-6">
              <div class="flex items-center cursor-pointer space-x-2" onClick="window.location.href = '/'">
                <i class="ri-restaurant-2-line text-4xl text-orange-500"></i>
                <div class="text-3xl font-bold text-[#3284e8]">DishDash</div>
              </div>
              <p class="text-gray-400 leading-relaxed">
                Delivering happiness to your doorstep. Experience the best food
                delivery service in town.
              </p>
              <div class="flex space-x-4">
                <a
                  href="#"
                  class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#3284e8] hover:text-white transition-all duration-300"
                >
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#3284e8] hover:text-white transition-all duration-300"
                >
                  <i class="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#3284e8] hover:text-white transition-all duration-300"
                >
                  <i class="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#3284e8] hover:text-white transition-all duration-300"
                >
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>

            <!-- Quick Links -->
            <div>
              <h3
                class="text-xl font-semibold text-white mb-6 flex items-center"
              >
                <i class="ri-links-line mr-2 text-[#3284e8]"></i>Quick Links
              </h3>
              <ul class="space-y-4">
                <li>
                  <a
                    href="/"
                    class="text-gray-400 hover:text-[#3284e8] transition-colors duration-300 flex items-center"
                  >
                    <i class="ri-arrow-right-s-line mr-2"></i>Home
                  </a>
                </li>
                <li>
                  <a
                    href="../../html/allFood.html"
                    class="text-gray-400 hover:text-[#3284e8] transition-colors duration-300 flex items-center"
                  >
                    <i class="ri-arrow-right-s-line mr-2"></i>Menu
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="text-gray-400 hover:text-[#3284e8] transition-colors duration-300 flex items-center"
                  >
                    <i class="ri-arrow-right-s-line mr-2"></i>About Us
                  </a>
                </li>
                <li>
                  <a
                    href="../../html/contactus.html"
                    class="text-gray-400 hover:text-[#3284e8] transition-colors duration-300 flex items-center"
                  >
                    <i class="ri-arrow-right-s-line mr-2"></i>Contact
                  </a>
                </li>
              </ul>
            </div>

            <!-- Contact Info -->
            <div>
              <h3
                class="text-xl font-semibold text-white mb-6 flex items-center"
              >
                <i class="ri-customer-service-2-line mr-2 text-[#3284e8]"></i
                >Contact Info
              </h3>
              <ul class="space-y-4">
                <li class="flex items-start space-x-3 group">
                  <i
                    class="ri-map-pin-line text-[#3284e8] mt-1 group-hover:text-[#ff6b38] transition-colors"
                  ></i>
                  <span
                    class="text-gray-400 group-hover:text-white transition-colors"
                    >123 Gharko Cheau, Kathmandu, Nepal</span
                  >
                </li>
                <li class="flex items-center space-x-3 group">
                  <i
                    class="ri-phone-line text-[#3284e8] group-hover:text-[#ff6b38] transition-colors"
                  ></i>
                  <span
                    class="text-gray-400 group-hover:text-white transition-colors"
                    >+977-9876543210</span
                  >
                </li>
                <li class="flex items-center space-x-3 group">
                  <i
                    class="ri-mail-line text-[#3284e8] group-hover:text-[#ff6b38] transition-colors"
                  ></i>
                  <span
                    class="text-gray-400 group-hover:text-white transition-colors"
                    >contact@dishdash.com</span
                  >
                </li>
                <li class="flex items-center space-x-3 group">
                  <i
                    class="ri-time-line text-[#3284e8] group-hover:text-[#ff6b38] transition-colors"
                  ></i>
                  <span
                    class="text-gray-400 group-hover:text-white transition-colors"
                    >Open: 09:00 AM - 09:00 PM</span
                  >
                </li>
              </ul>
            </div>

            <!-- Newsletter -->
            <div>
              <h3
                class="text-xl font-semibold text-white mb-6 flex items-center"
              >
                <i class="ri-mail-send-line mr-2 text-[#3284e8]"></i>Newsletter
              </h3>
              <p class="text-gray-400 mb-4">
                Subscribe to our newsletter for updates and exclusive offers!
              </p>
              <form class="space-y-3 newsletter-form">
                <div class="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    class="newsletter-input w-full px-4 py-3 bg-gray-800 text-white ring-2 ring-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3284e8] placeholder-gray-500 transition-all duration-300"
                  />
                </div>
                <button
                  type="submit"
                  class="newsletter-button w-full px-4 py-3 bg-[#3284e8] text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center gap-2 group"
                >
                  Subscribe
                  <i
                    class="ri-send-plane-line group-hover:translate-x-1 transition-transform"
                  ></i>
                </button>
              </form>
            </div>
          </div>

          <div
            class="mt-16 bg-gray-800 rounded-2xl p-8 relative overflow-hidden"
          >
            <div class="absolute inset-0 bg-pattern"></div>
            <div
              class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8"
            >
              <div class="text-center md:text-left">
                <h3 class="text-2xl font-bold text-[#ff6b38] mb-2">
                  Download Our Mobile App
                </h3>
                <p class="text-gray-200">
                  Get the best food delivery experience on your phone
                </p>
              </div>
              <div class="flex flex-wrap gap-4">
                <!-- App Store Button -->
                <a
                  href="#"
                  class="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition-colors"
                >
                  <i class="fab fa-apple text-2xl"></i>
                  <div class="text-left">
                    <div class="text-xs">Download on the</div>
                    <div class="text-sm font-semibold">App Store</div>
                  </div>
                </a>
                <!-- Play Store Button -->
                <a
                  href="#"
                  class="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition-colors"
                >
                  <i class="fab fa-google-play text-2xl"></i>
                  <div class="text-left">
                    <div class="text-xs">Get it on</div>
                    <div class="text-sm font-semibold">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <!-- Footer Bottom -->
          <div class="mt-12 pt-8 border-t border-gray-800">
            <div class="flex flex-col md:flex-row justify-between items-center">
              <div class="text-gray-400 mb-4 md:mb-0">
                © 2024
                <a href="/" class="text-[#3284e8] hover:text-[#ff6b38]">DishDash</a
                >. All rights reserved.
              </div>
              <div class="flex space-x-6">
                <a
                  href="#"
                  class="text-gray-400 hover:text-[#3284e8] transition-colors duration-300"
                  >Privacy Policy</a
                >
                <a
                  href="#"
                  class="text-gray-400 hover:text-[#3284e8] transition-colors duration-300"
                  >Terms of Service</a
                >
                <a
                  href="#"
                  class="text-gray-400 hover:text-[#3284e8] transition-colors duration-300"
                  >Cookie Policy</a
                >
              </div>
            </div>
          </div>
        </div>
      </section>
`