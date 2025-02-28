import { showToastNotify } from '../assets/utility/showToast.js';

function togglePassword() {
    const passwordInput = document.getElementById("login-Password");
    const toggleIcon = document.getElementById("password-toggle-icon");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.classList.remove("fa-eye");
        toggleIcon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        toggleIcon.classList.remove("fa-eye-slash");
        toggleIcon.classList.add("fa-eye");
    }
}

document.querySelector("#password-toggle-icon").addEventListener("click", togglePassword);

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", validateForm);
function validateForm(event) {
    event.preventDefault();
    const email = document.getElementById("login-Email").value;
    const password = document.getElementById("login-Password").value;

    if (email === "admin@admin.com" && password === "admin123") {
        showToastNotify("Login successful", "success");
    } else {
        showToastNotify("Invalid email or password try again or sign up", "error");
    }
}
