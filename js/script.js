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

function initializeCountdown() {
    // Set the date we're counting down to (24 hours from now)
    const countDownDate = new Date().getTime() + (24 * 60 * 60 * 1000);
    const totalTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    // Update the countdown every 1 second
    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        const timeElapsed = totalTime - distance;

        // Calculate days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result
        document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
        document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');

        // Update progress bar
        const progressBar = document.getElementById("timer-progress");
        const progressPercentage = (timeElapsed / totalTime) * 100;
        progressBar.style.width = (100 - progressPercentage) + '%';

        // Add pulsing effect when time is running low (less than 1 hour)
        if (distance < 3600000) { // 1 hour in milliseconds
            document.querySelectorAll('.countdown-item').forEach(item => {
                item.classList.add('time-low');
            });
        }

        // If the countdown is finished
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = `
                <div class="text-center p-4 bg-red-500/20 rounded-lg">
                    <i class="ri-time-line text-2xl mb-2"></i>
                    <div class="font-bold text-xl">OFFER EXPIRED</div>
                </div>
            `;
        }
    }, 1000);
}

// Initialize countdown when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCountdown);
