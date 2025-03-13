import { showToastNotify } from '../assets/utility/showToast.js';

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const loginEmail = document.getElementById("login-Email");
    const loginPassword = document.getElementById("login-Password");
    const submitButton = document.getElementById("login-button");
    const emailError = document.getElementById("emailError");
    const passwdError = document.getElementById("passwdError");

    // Original button text
    const originalButtonHtml = submitButton.innerHTML;

    function showInputError(input, errorElement, message) {
        input.classList.add("borderError", "shake");
        errorElement.innerHTML = `
            <div class="flex items-center gap-1 text-red-500">
                <i class="ri-error-warning-line text-[18px]"></i>
                <span>${message}</span>
            </div>
        `;

        // Remove borderError class after 1 second
        setTimeout(() => {
            input.classList.remove("borderError");
        }, 1000);
    }

    function setLoadingState(isLoading) {
        submitButton.disabled = isLoading;
        submitButton.innerHTML = isLoading
            ? `<div class="flex items-center gap-2">
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
               </div>`
            : originalButtonHtml;
    }

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

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        let isValid = true;

        // Clear previous errors
        [emailError, passwdError].forEach(error => {
            error.innerHTML = "";
            error.classList.remove("hidden");
        });
        [loginEmail, loginPassword].forEach(input => {
            input.classList.remove("borderError", "shake");
        });

        // Email validation
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (loginEmail.value.trim() === "") {
            showInputError(loginEmail, emailError, "Please enter your email");
            isValid = false;
        } else if (!emailPattern.test(loginEmail.value.trim())) {
            showInputError(loginEmail, emailError, "Please enter a valid email");
            isValid = false;
        } else {
            emailError.classList.add("hidden");
        }

        // Password validation
        if (loginPassword.value.trim() === "") {
            showInputError(loginPassword, passwdError, "Please enter your password");
            isValid = false;
        } else {
            passwdError.classList.add("hidden");
        }

        if (!isValid) {
            showToastNotify("Please fix the errors in the form", "error");
            return;
        }

        setLoadingState(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            if (loginEmail.value === "admin@admin.com" && loginPassword.value === "admin123") {
                showToastNotify("Login successful", "success");
                loginForm.reset();
            } else {
                showToastNotify("Invalid email or password! Please try again", "error");
            }
        } catch (error) {
            showToastNotify("Login failed. Please try again.", "error");
        } finally {
            setLoadingState(false);
        }
    });

    // Animation end handlers
    [loginEmail, loginPassword].forEach(input => {
        input.addEventListener("animationend", () => {
            input.classList.remove("shake");
        });
    });


});
