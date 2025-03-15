const header = document.querySelector(".header");

header.innerHTML += `
 <nav class="container mx-auto px-6 py-4 flex items-center justify-between"
      >
        <div onclick="window.location.href='/'" class="cursor-pointer font-bold text-[#0d6efd] flex items-center space-x-2">
              <i class="ri-restaurant-2-line text-4xl text-orange-500"></i>
              <div class="text-3xl font-bold text-[#0d6efd]">DishDash</div>
        </div>
        <div class="hidden md:flex items-center space-x-8">
          <a
            href="/"
            class="nav-link text-gray-600 hover:text-[#3284e8] relative text-[18px]"
            data-active="true"
            >Home</a
          >
          <a
            href="../../html/allFood.html"
            class="nav-link text-gray-600 hover:text-[#3284e8] relative text-[18px]"
            >Foods</a
          >

          <a
            href="../../html/contactus.html"
            class="nav-link text-gray-600 hover:text-[#3284e8] relative text-[18px]"
            >Contact us</a
          >
        </div>
        <div class="hidden md:flex items-center space-x-4">
          <button
            id="searchButton"
            class="p-2 text-[22px] hover:text-[#3284e8]"
          >
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>

          <button
            class="nav-link p-2 relative hover:text-[#3284e8]"
            onclick="window.location.href='../../html/wishlist.html'"
          >
            <i class="ri-heart-line text-[26px]"></i>
            <span
              class="wishlistItems absolute w-[23px] h-[23px] rounded-full text-white top-0 -right-1 bg-[#3284e8] text-[12px] flex items-center justify-center"
              >0</span
            >
          </button>

          <button
            class="nav-link p-2 relative hover:text-[#3284e8]"
            onclick="window.location.href='../../html/cartPage.html'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span
              class="cartItems absolute w-[23px] h-[23px] rounded-full text-white top-0 -right-1 bg-[#3284e8] text-[12px] flex items-center justify-center"
              >0</span
            >
          </button>
          <div class="relative inline-block text-left">
            <div>
              <button
                class="inline-flex justify-center items-center gap-2 w-full rounded-full shadow-sm px-4 py-3 bg-[#0d6efd] text-[18px] text-white hover:bg-[#3284e8]"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
              >
                <i class="fa-solid fa-circle-user"></i>
                <span class="text-[16px]"> My Profile</span>
                <svg
                  class="ml-2 h-5 w-5 rotate"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  id="chevron-icon"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div
              class="dropdown-content origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabindex="-1"
            >
              <div class="py-1" role="none">
                <a
                  href="../../html/loginPage.html"
                  class="text-gray-700 text-[16px] flex items-center gap-2 px-4 py-3 hover:bg-[#f6f6f6]"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-0"
                >
                  <i class="fa-solid fa-arrow-right-to-bracket"></i>
                  <span>Login</span>
                </a>
                <a
                  href="../../html/signupPage.html"
                  class="text-gray-700 text-[16px] flex items-center gap-2 px-4 py-3 text-sm hover:bg-[#f6f6f6]"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-1"
                >
                  <i class="fa-solid fa-user-plus"></i>
                  <span>Signup</span>
                </a>
                <a
                  href="#"
                  class="text-gray-700 text-[16px] flex items-center gap-2 px-4 py-3 text-sm hover:bg-[#f6f6f6]"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-2"
                >
                  <i class="fa-solid fa-user"></i>
                  <span> My Profile</span>
                </a>
                <a
                  href="#"
                  class="text-gray-700 text-[16px] flex items-center gap-2 px-4 py-3 text-sm hover:bg-[#f6f6f6]"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-3"
                >
                  <i class="fa-solid fa-box-open"></i>
                  <span>My Orders</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
`