
export function showToastNotify(message, type) {
    const toast = document.getElementById("toast");
    const messageEl = toast.querySelector(".toast-message");
    const iconEl = toast.querySelector(".toast-icon");
    const progressBar = toast.querySelector(".toast-progress-bar");

    // Reset animations
    toast.classList.remove("slide-in", "slide-out");
    progressBar.style.animation = "none";
    progressBar.offsetHeight; // Force reflow

    // Set message and icon
    messageEl.textContent = message;
    if (type === "success") {
        iconEl.innerHTML = '<i class="fas fa-check-circle "></i>';
        toast.className = "toast success";
    } else {
        iconEl.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
        toast.className = "toast error";
    }

    // Start animations
    progressBar.style.animation = "progress 3s linear forwards";
    toast.classList.add("show", "slide-in");

    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.add("slide-out");
        setTimeout(() => {
            toast.classList.remove("show", "slide-in", "slide-out");
        }, 300);
    }, 3000);
    document.querySelector(".toast-close").addEventListener("click", () => {
        const toast = document.getElementById("toast");
        toast.classList.add("slide-out");
        setTimeout(() => {
            toast.classList.remove("show", "slide-in", "slide-out");
        }, 300);
    });
}

