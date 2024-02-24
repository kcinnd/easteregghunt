// Function to start the hunt from the landing page
function startHunt() {
    window.location.href = 'page1.html'; // Redirects to the first puzzle page
}

// Event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    // Handling the hidden message click event for Page 1
    var hiddenMessage = document.getElementById('hiddenMessage');
    if (hiddenMessage) { // Ensures the code runs only if the element exists
        hiddenMessage.onclick = function() {
            window.location.href = 'mysteryTrail.html'; // Redirects to the mysteryTrail page upon click
        };
    }

    // Check the scrambled word on Page 3
    var submitButton = document.querySelector('button');
    if (submitButton && window.location.href.includes('mysteryTrail.html')) { // Ensures the code runs only on Page 3
        submitButton.addEventListener('click', checkWord);
    }
});

// Function to check the user's input against the correct answer on Page 3
function checkWord() {
    var userInput = document.getElementById('userInput').value;
    var feedback = document.getElementById('feedback');

    if (userInput.toLowerCase() === 'easterbunny') {
        feedback.textContent = 'Correct! You've unraveled the clue.';
        // Optionally, redirect to the next page or reveal a hidden link
        // window.location.href = 'nextPuzzlePage.html';
    } else {
        feedback.textContent = 'Hmm, that doesn't seem right. Try pondering a bit more.';
    }
}
