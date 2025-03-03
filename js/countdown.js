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
  
}); 