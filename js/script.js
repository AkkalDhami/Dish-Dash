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




