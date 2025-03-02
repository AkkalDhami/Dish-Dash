// Newsletter Form Handling
import { showToastNotify } from '../assets/utility/showToast.js';

const newsletterForm = document.querySelector('.newsletter-form');
const newsletterInput = document.querySelector('.newsletter-input');
const newsletterButton = document.querySelector('.newsletter-button');
const originalNewsletterBtn = newsletterButton.innerHTML;

function setNewsletterLoadingState(isLoading) {
    newsletterButton.disabled = isLoading;
    newsletterButton.innerHTML = isLoading
        ? `<div class="flex items-center gap-2">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Subscribing...
             </div>`
        : originalNewsletterBtn;
}

newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = newsletterInput.value.trim();
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Remove previous error state
    newsletterInput.classList.remove('ring-red-500', 'border-red-500');

    if (!email) {
        newsletterInput.classList.add('ring-red-500', 'border-red-500');
        showToastNotify('Please enter your email address', 'error');
        return;
    }

    if (!emailPattern.test(email)) {
        newsletterInput.classList.add('ring-red-500', 'border-red-500');
        showToastNotify('Please enter a valid email address', 'error');
        return;
    }

    setNewsletterLoadingState(true);

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        showToastNotify('Successfully subscribed to newsletter!', 'success');
        newsletterInput.value = '';

        // Add success state briefly
        newsletterInput.classList.add('ring-green-500', 'border-green-500');
        setTimeout(() => {
            newsletterInput.classList.remove('ring-green-500', 'border-green-500');
        }, 2000);

    } catch (error) {
        showToastNotify('Failed to subscribe. Please try again.', 'error');
    } finally {
        setNewsletterLoadingState(false);
    }
});

// Remove error state on input
newsletterInput.addEventListener('input', () => {
    newsletterInput.classList.remove('ring-red-500', 'border-red-500');
});