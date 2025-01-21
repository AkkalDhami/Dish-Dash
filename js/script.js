// Get all navigation links
const navLinks = document.querySelectorAll("[data-nav-link]");
// const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
function setActiveLink(clickedLink) {
    navLinks.forEach((link) => {
        link.classList.remove("active");
    });

    clickedLink.classList.add("active");
}

navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        setActiveLink(link);

        localStorage.setItem("activeLink", link.textContent.trim());
    });
});

// mobileNavLinks.forEach((link) => {
//     link.addEventListener("click", (e) => {
//         e.preventDefault();
//         setActiveLink(link);

//         localStorage.setItem("activeLink", link.textContent.trim());
//     });
// });


document.addEventListener("DOMContentLoaded", () => {
    const savedActiveLink = localStorage.getItem("activeLink");
    if (savedActiveLink) {
        const link = Array.from(navLinks).find(
            (link) => link.textContent.trim() === savedActiveLink
        );
        if (link) {
            setActiveLink(link);
        }
    } else {
        setActiveLink(navLinks[0]);
    }
});

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


