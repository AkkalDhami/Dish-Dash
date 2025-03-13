import { showToastNotify } from '../assets/utility/showToast.js';

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signupForm");
    const signupEmail = document.getElementById("signupEmail");
    const username = document.getElementById("username");
    const signupPassword = document.getElementById("signupPassword");
    const signupPassword2 = document.getElementById("signupPassword2");
    const termsCheckbox = document.getElementById("termsCheckbox");
    const submitButton = document.getElementById("signup-button");

    const usernameError = document.getElementById("usernameError");
    const emailError = document.getElementById("emailError");
    const passwdError = document.getElementById("passwdError");
    const passwd2Error = document.getElementById("passwd2Error");

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
                Creating Account...
               </div>`
            : originalButtonHtml;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        let isValid = true;

        // Clear previous errors
        [usernameError, emailError, passwdError, passwd2Error].forEach(error => {
            error.innerHTML = "";
            error.classList.remove("hidden");
        });
        [username, signupEmail, signupPassword, signupPassword2].forEach(input => {
            input.classList.remove("borderError", "shake");
        });

        // Validate Username
        const usernameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
        if (username.value.trim() === "") {
            showInputError(username, usernameError, "Please enter your name");
            isValid = false;
        } else if (username.value.trim().length < 3) {
            showInputError(username, usernameError, "Name must be at least 3 characters long");
            isValid = false;
        } else if (!usernameRegex.test(username.value.trim())) {
            showInputError(username, usernameError, "Please enter a valid name");
            isValid = false;
        } else {
            usernameError.classList.add("hidden");
        }

        // Validate Email
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (signupEmail.value.trim() === "") {
            showInputError(signupEmail, emailError, "Please enter your email");
            isValid = false;
        } else if (!emailPattern.test(signupEmail.value.trim())) {
            showInputError(signupEmail, emailError, "Please enter a valid email");
            isValid = false;
        } else {
            emailError.classList.add("hidden");
        }

        // Validate Password
        const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,20}$/;
        if (!passwordRegex.test(signupPassword.value)) {
            showInputError(signupPassword, passwdError, "Password must include letters, numbers, and special characters");
            isValid = false;
        } else {
            passwdError.classList.add("hidden");
        }

        // Validate Confirm Password
        if (signupPassword.value !== signupPassword2.value) {
            showInputError(signupPassword2, passwd2Error, "Passwords do not match");
            isValid = false;
        } else {
            passwd2Error.classList.add("hidden");
        }

        // Validate Terms Checkbox
        if (!termsCheckbox.checked) {
            showToastNotify("Please agree to the terms and conditions", "error");
            isValid = false;
        }

        if (!isValid) {
            showToastNotify("Please fix the errors in the form", "error");
            return;
        }

        // Show loading state
        setLoadingState(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            showToastNotify("Account created successfully!", "success");
            clearInput();
            setLoadingState(false);
        } catch (error) {
            showToastNotify("Failed to create account. Please try again.", "error");
            setLoadingState(false);
        }
    });

    function clearInput() {
        signupEmail.value = "";
        signupPassword.value = "";
        signupPassword2.value = "";
        username.value = "";
        termsCheckbox.checked = false;
    }

    // Animation end handlers
    [username, signupEmail, signupPassword, signupPassword2].forEach(input => {
        input.addEventListener("animationend", () => {
            input.classList.remove("shake");
        });
    });

    // Password visibility toggle
    function togglePasswordVisibility(inputId, iconId) {
        const passwordInput = document.querySelector(`[data-input-id="${inputId}"]`);
        const toggleIcon = document.getElementById(iconId);

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

    document.getElementById("password-toggle-icon1").addEventListener("click", () => {
        togglePasswordVisibility(1, "password-toggle-icon1");
    });

    document.getElementById("password-toggle-icon2").addEventListener("click", () => {
        togglePasswordVisibility(2, "password-toggle-icon2");
    });
});
