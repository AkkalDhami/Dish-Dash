export function showToast(message, type) {
    const toastContainer = document.getElementById("toastContainer");

    if (!toastContainer) {
        console.error("Error: #toastContainer not found in DOM.");
        return;
    }

    const toast = document.createElement("div");
    toast.className = `toastLine flex items-center justify-between px-4 py-3 space-x-4 rounded shadow-lg text-gray-700 bg-white transform transition-all duration-300 ease-in-out translate-y-[-20px] relative overflow-hidden`;

    toast.innerHTML = `
        <div class="flex items-center gap-4">
            <i class="${type === "success"
            ? "ri-checkbox-circle-fill text-[#1cfa04]"
            : "ri-error-warning-fill text-[#ff0000]"
        } text-[22px]"></i>
            <span class="text-[16px] text-gray-800">${message}</span>
        </div>
        <button class="text-gray-500 text-[24px] hover:text-gray-800 duration-300">&times;</button>
        <div class="absolute bottom-0 left-0 w-full h-1 ${type === "success" ? "text-[#1cfa04]" : "bg-[#ff0000]"} "></div>
    `;

    // Close toast when button is clicked
    toast.querySelector("button").addEventListener("click", () => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-20px)";
        setTimeout(() => toast.remove(), 300);
    });

    toastContainer.appendChild(toast);

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
