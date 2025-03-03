import { showToastNotify } from "../assets/utility/showToast.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const contactEmail = document.getElementById("contactEmail");
    const username = document.getElementById("contactUserName");
    const message = document.getElementById("message");
    const submitButton = document.getElementById("contactbutton");

    const contactUserNameError = document.getElementById("contactUserNameError");
    const contactEmailError = document.getElementById("contactEmailError");
    const messageError = document.getElementById("messageError");

    // Original button text
    const originalButtonHtml = submitButton.innerHTML;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        let isValid = true;

        // Clear previous errors and remove error classes
        [contactUserNameError, contactEmailError, messageError].forEach(error => {
            error.innerHTML = "";
            error.classList.remove("hidden");
        });
        [username, contactEmail, message].forEach(input => {
            input.classList.remove("borderError", "shake");
        });

        // Username validation - allow spaces in names
        const usernameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;

        if (username.value.trim() === "") {
            showInputError(username, contactUserNameError, "Please enter your name");
            isValid = false;
        } else if (!usernameRegex.test(username.value.trim())) {
            showInputError(username, contactUserNameError, "Please enter a valid name (letters only)");
            isValid = false; 
        } else {
            contactUserNameError.classList.add("hidden");
        }


        // Email validation
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (contactEmail.value.trim() === "") {
            showInputError(contactEmail, contactEmailError, "Please enter an email");
            isValid = false;
        } else if (!emailPattern.test(contactEmail.value.trim())) {
            showInputError(contactEmail, contactEmailError, "Please enter a valid email");
            isValid = false;
        } else {
            contactEmailError.classList.add("hidden");
        }

        // Message validation - minimum 10 characters
        if (message.value.trim() === "") {
            showInputError(message, messageError, "Please enter a message");
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showInputError(message, messageError, "Message must be at least 10 characters long");
            isValid = false;
        } else {
            messageError.classList.add("hidden");
        }

        if (!isValid) {
            showToastNotify("Please fill in all the required fields correctly.", "error");
            return;
        }

        // Show loading state
        setLoadingState(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            showToastNotify(
                "Your message has been sent successfully. We will get back to you soon.",
                "success"
            );
            clearInput();
            setLoadingState(false);
        } catch (error) {
            showToastNotify("Failed to send message. Please try again.", "error");
        }
    });

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
                Sending Message...
               </div>`
            : originalButtonHtml;
    }

    function clearInput() {
        contactEmail.value = "";
        username.value = "";
        message.value = "";

        // Clear error states immediately
        [username, contactEmail, message].forEach(input => {
            input.classList.remove("borderError", "shake");
        });
        [contactUserNameError, contactEmailError, messageError].forEach(error => {
            error.innerHTML = "";
        });
    }

    // Keep the animation end listener for shake effect only
    [username, contactEmail, message].forEach(input => {
        input.addEventListener("animationend", () => {
            input.classList.remove("shake");
        });
    });
});