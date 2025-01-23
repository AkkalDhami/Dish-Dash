import successToast from "../assets/utility/successToast.js";
import errorToast from "../assets/utility/errorToast.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const contactEmail = document.getElementById("contactEmail");
    const username = document.getElementById("contactUserName");
    const message = document.getElementById("message");

    const contactUserNameError = document.getElementById("contactUserNameError");
    const contactEmailError = document.getElementById("contactEmailError");
    const messageError = document.getElementById("messageError");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let isValid = true;

        contactUserNameError.innerHTML = "";
        contactEmailError.innerHTML = "";
        messageError.innerHTML = "";

        const usernameRegex = /^[a-zA-Z0-9]{3,}$/;

        if (username.value.trim() === "") {
            username.classList.add("borderError");
            contactUserNameError.innerHTML = `<i class="ri-error-warning-line text-[18px]"></i> Please enter a username`;
            isValid = false;
        } else if (!usernameRegex.test(username.value)) {
            username.classList.add("borderError");
            contactUserNameError.innerHTML = `<i class="ri-error-warning-line text-[18px]"></i> Please enter a valid username (at least 3 characters)`;
            isValid = false;
        } else {
            username.classList.remove("borderError");
            contactUserNameError.innerHTML = "";
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (contactEmail.value.trim() === "") {
            contactEmail.classList.add("borderError");
            contactEmailError.innerHTML = `<i class="ri-error-warning-line text-[18px]"></i> Please enter an email`;
            isValid = false;
        } else if (!emailPattern.test(contactEmail.value)) {
            contactEmail.classList.add("borderError");
            contactEmailError.innerHTML = `<i class="ri-error-warning-line text-[18px]"></i> Please enter a valid email`;
            isValid = false;
        } else {
            contactEmail.classList.remove("borderError");
            contactEmailError.innerHTML = "";
        }

        if (message.value.trim() === "") {
            message.classList.add("borderError");
            messageError.innerHTML = `<i class="ri-error-warning-line text-[18px]"></i> Please enter a message`;
            isValid = false;
        } else {
            message.classList.remove("borderError");
            messageError.innerHTML = "";
        }

        if (!isValid) {
            errorToast("Please fill in all the required fields.");
            return;
        }

        successToast(
            "Your message has been sent successfully. We will get back to you soon."
        );
        clearInput();
    });

    function clearInput() {
        contactEmail.value = "";
        username.value = "";
        message.value = "";
    }

    username.addEventListener("animationend", () => {
        username.classList.remove("borderError");
    });

    contactEmail.addEventListener("animationend", () => {
        contactEmail.classList.remove("borderError");
    });

    message.addEventListener("animationend", () => {
        message.classList.remove("borderError");
    });
});