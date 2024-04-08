document.addEventListener('DOMContentLoaded', function() {

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    const confirmationMessage = document.getElementById('confirmationMessage');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        // Validate the form
        if (contactForm.checkValidity()) {
            // Form is valid, display confirmation message
            confirmationMessage.textContent = 'Deine Nachricht wurde gesendet!';
            contactForm.reset(); // Reset the form
        } else {
            // Form is invalid, display error message
            confirmationMessage.textContent = 'Please fill out all fields correctly.';
        }
    });
});