
document.addEventListener("DOMContentLoaded", function () {
    var menuButton = document.getElementById("menu-button");
    var dropdownContent = document.querySelector(".dropdown-content");
    var chevronIcon = document.getElementById("chevron-icon");
    menuButton.addEventListener("mouseenter", function () {
        dropdownContent.style.display = "block";
        chevronIcon.classList.add("open");
        setTimeout(function () {
            dropdownContent.style.opacity = "1";
        }, 10);
    });
    menuButton.addEventListener("mouseleave", function () {
        setTimeout(function () {
            if (!dropdownContent.matches(":hover")) {
                dropdownContent.style.opacity = "0";
                chevronIcon.classList.remove("open");
                setTimeout(function () {
                    dropdownContent.style.display = "none";
                }, 300);
            }
        }, 300);
    });
    dropdownContent.addEventListener("mouseleave", function () {
        dropdownContent.style.opacity = "0";
        chevronIcon.classList.remove("open");
        setTimeout(function () {
            dropdownContent.style.display = "none";
        }, 300);
    });
    dropdownContent.addEventListener("mouseenter", function () {
        dropdownContent.style.display = "block";
        chevronIcon.classList.add("open");
        setTimeout(function () {
            dropdownContent.style.opacity = "1";
        }, 10);
    });
});

