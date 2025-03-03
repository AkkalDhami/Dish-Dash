class CountdownTimer {
  constructor(targetElement, initialMinutes = 90) {
    this.targetElement = document.getElementById(targetElement);
    this.initialMinutes = initialMinutes;
    this.timeLeft = initialMinutes * 60; // Convert to seconds
    this.interval = null;
  }

  start() {
    if (!this.targetElement) {
      console.warn('Countdown target element not found');
      return;
    }

    this.interval = setInterval(() => {
      try {
        this.updateDisplay();
        this.timeLeft--;

        if (this.timeLeft < 0) {
          this.reset();
        }
      } catch (error) {
        console.error('Error updating countdown:', error);
        this.stop();
      }
    }, 1000);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  reset() {
    this.timeLeft = this.initialMinutes * 60;
    this.updateDisplay();
  }

  updateDisplay() {
    if (!this.targetElement) return;

    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;

    this.targetElement.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}

// Initialize countdown only if element exists
document.addEventListener('DOMContentLoaded', () => {
  const countdownElement = document.getElementById('deliveryCountdown');
  if (countdownElement) {
    const countdown = new CountdownTimer('deliveryCountdown', 30);
    countdown.start();
  }
  function initializeCountdown() {
    // Set the date we're counting down to (24 hours from now)
    const countDownDate = new Date().getTime() + (24 * 60 * 60 * 1000);
    const totalTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    const x = setInterval(function () {
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



      if (distance < 3600000) { // 1 hour in milliseconds
        document.querySelectorAll('.countdown-item').forEach(item => {
          item.classList.add('time-low');
        });
      }

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
}); 