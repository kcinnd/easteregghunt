// Function to start the hunt from the landing page
function startHunt() {
    window.location.href = 'page1.html'; // Redirects to the first puzzle page
}

// Event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    // Handling the hidden message click event for Page 1
    var hiddenMessage = document.getElementById('hiddenMessage');
    if (hiddenMessage) {
        hiddenMessage.onclick = function() {
            window.location.href = 'mysteryTrail.html'; // Redirects to the next puzzle page upon click
        };
    }

    // Handling the hover event for the logo on Page 2
    if (window.location.href.includes('page2.html')) {
        var logo = document.querySelector('.logo');
        logo.addEventListener('mouseenter', function() {
            // Show the clue when the logo is hovered over
            // Consider replacing the alert with a less intrusive method in a real application
            alert(this.getAttribute('data-hover'));
        });
    }
});
