export function showToast(message, type) {
    const toastContainer = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = `flex items-center justify-between px-4 py-3 space-x-4 rounded shadow-lg text-grey-700 bg-white transform transition-all duration-300 ease-in-out translate-y-[-20px] relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:toastAfterLine ${type === "success" ? "after:bg-[#1cfa04]" : "after:bg-[#ff0000]"
        }`;
    toast.innerHTML = `
          <div class="flex items-center gap-4">
            <i class="${type === "success"
            ? "ri-checkbox-circle-fill text-[#1cfa04]"
            : "ri-error-warning-fill text-[#ff0000]"
        } text-[22px]"></i>
            <span class='text-[16px]'>${message}</span>
          </div>
          <button class="text-gray-500 text-[24px] hover:text-gray-800 duration-300" onclick="this.parentElement.remove()">&times;</button>
          `;
    toastContainer.appendChild(toast);
    // Smooth appearance
    setTimeout(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
    }, 10);
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-20px)";
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}