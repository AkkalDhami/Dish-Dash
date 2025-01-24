import { showToast } from '../assets/utility/showToast.js';

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signupForm");
    const signupEmail = document.getElementById("signupEmail");
    const username = document.getElementById("username");
    const signupPassword = document.getElementById("signupPassword");
    const signupPassword2 = document.getElementById("signupPassword2");
    const termsCheckbox = document.getElementById("termsCheckbox");

    const usernameError = document.getElementById("usernameError");
    const emailError = document.getElementById("emailError");
    const passwdError = document.getElementById("passwdError");
    const passwd2Error = document.getElementById("passwd2Error");

    usernameError.innerHTML = "";
    emailError.innerHTML = "";
    passwdError.innerHTML = "";
    passwd2Error.innerHTML = "";

    function clearInput() {
        signupEmail.value = "";
        signupPassword.value = "";
        signupPassword2.value = "";
        username.value = "";
        termsCheckbox.checked = false;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let valid = true;
        // Validate Username
        const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
        if (!usernameRegex.test(username.value.trim())) {
            usernameError.innerHTML = `<i class="ri-error-warning-line text-[18px]"></i> Username must be at least 3 characters long`;
            valid = false;
            username.classList.add("borderError");
        } else {
            usernameError.innerHTML = "";
            username.classList.remove("borderError");
        }

        // Validate Email
        if (signupEmail.value.trim() === "") {
            emailError.innerHTML = `<i class="ri-error-warning-line text-[18px]"></i> Please enter your email`;
            valid = false;
            signupEmail.classList.add("borderError");
        } else {
            emailError.innerHTML = "";
            signupEmail.classList.remove("borderError");
        }

        // Validate Password
        const passwordRegex =
            /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,20}$/;
        if (!passwordRegex.test(signupPassword.value.trim())) {
            passwdError.innerHTML = `<i class="ri-error-warning-line text-[18px]"></i> Password must be 6-25 characters long, include uppercase, lowercase, digit, and special character`;
            valid = false;
            signupPassword.classList.add("borderError");
            return;
        } else {
            passwdError.innerHTML = "";
            signupPassword.classList.remove("borderError");
        }

        // Validate Confirm Password
        if (
            signupPassword2.value.trim() === "" ||
            signupPassword.value !== signupPassword2.value
        ) {
            passwd2Error.innerHTML = `<i class="ri-error-warning-line text-[18px]"></i> Passwords do not match`;
            valid = false;
            signupPassword2.classList.add("borderError");
        } else {
            passwd2Error.innerHTML = "";
            signupPassword2.classList.remove("borderError");
        }

        // Validate Terms Checkbox
        if (!termsCheckbox.checked) {
            showToast("Please agree to the terms and conditions.", "error");
            valid = false;
        }

        if (valid) {
            showToast("Signup Successful!", "success");
            clearInput();

        }
    });



    username.addEventListener("animationend", () => {
        username.classList.remove("borderError");
    });

    signupEmail.addEventListener("animationend", () => {
        signupEmail.classList.remove("borderError");
    });

    signupPassword.addEventListener("animationend", () => {
        signupPassword.classList.remove("borderError");
    });
    signupPassword2.addEventListener("animationend", () => {
        signupPassword2.classList.remove("borderError");
    });

    function togglePasswordVisibility(inputId, iconId) {
        const passwordInput = document.querySelector(
            `[data-input-id="${inputId}"]`
        );
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

    // Event listeners for toggle icons
    document
        .getElementById("password-toggle-icon1")
        .addEventListener("click", () => {
            togglePasswordVisibility(1, "password-toggle-icon1");
        });

    document
        .getElementById("password-toggle-icon2")
        .addEventListener("click", () => {
            togglePasswordVisibility(2, "password-toggle-icon2");
        });
});
