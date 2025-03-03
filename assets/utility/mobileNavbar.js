const mobileBottomNav = document.querySelector(".mobileBottomNav");

mobileBottomNav.innerHTML += `
<div
        class="flex justify-between items-center px-6 py-3 border-t border-gray-200"
      >
        <a
          data-active="true"
          href="../../index.html"
          class="nav-link flex flex-col items-center text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span class="text-xs mt-1">Home</span>
        </a>

        <a
          id="searchBottomButton"
          href="#"
          class="nav-link flex flex-col items-center text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span class="text-xs mt-1">Search</span>
        </a>

        <a
          href="../../html/allFood.html"
          class="nav-link flex flex-col items-center text-gray-700"
        >
          <i class="ri-bowl-line sm:text-xl"></i>
          <span class="text-xs">Food</span>
        </a>

        <a
          href="../../html/wishlist.html"
          class="flex flex-col items-center text-gray-700 relative"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 sm:h-6 sm:w-6"
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
          <span class="text-xs mt-1"> Wishlist</span>
          <span
            class="wishlistItems absolute w-[25px] h-[25px] rounded-full text-white -top-2 -right-3 bg-[#3284e8] text-[12px] flex items-center justify-center"
            >0</span
          >
        </a>

        <a
          href="../../html/cartPage.html"
          class="flex flex-col items-center text-gray-700 relative"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 sm:h-6 sm:w-6"
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
          <span class="text-xs mt-1">Cart</span>
          <span
            class="cartItems absolute w-[25px] h-[25px] rounded-full text-white -top-2 -right-3 bg-[#3284e8] text-[12px] flex items-center justify-center"
            >0</span
          >
        </a>

        <a
          data-nav-link
          href="#"
          class="nav-link flex flex-col items-center text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span class="text-xs mt-1">Profile</span>
        </a>

        <a
          href="../../html/contactus.html"
          class="nav-link flex flex-col items-center text-gray-700"
        >
          <i class="ri-customer-service-2-line"></i>
          <span class="text-xs mt-1">Contact</span>
        </a>
      </div>
`