export default function successToast(message) {
  const toastContainer = document.createElement("div");
  toastContainer.classList.add("toastBox", "success");
  document.querySelector(".toastNotify").classList.remove('-top-1/2');
  document.querySelector(".toastNotify").classList.add('top-[6.3rem]');
  toastContainer.innerHTML = `
    <div class="flex items-center  space-x-2">
      <i class="ri-checkbox-circle-fill checkIcon  text-[22px]"></i>
      <div class="ms-3 text-[16px] text-gray-700 font-normal">
       ${message}
      </div>
    </div>
    <button
      type="button"
      class="ml-4 fixed right-3 top-1/2  bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
      aria-label="Close"
    >
      <span class="sr-only">Close</span>
      <svg
        class="w-3 h-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
    </button>
    <div
      class="toastLine after:absolute after:left-0 after:bottom-0 after:w-[0%] after:h-[4px] after:bg-[#30e522]"
    ></div>
  </div>
    `;
  document.querySelector(".toastNotify").appendChild(toastContainer);

  setTimeout(() => {
    document.querySelector(".toastNotify").classList.remove('top-[6.3rem]');
    document.querySelector(".toastNotify").classList.add('-top-1/2');
  }, 3000);
}
