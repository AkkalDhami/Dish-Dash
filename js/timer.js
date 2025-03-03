
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