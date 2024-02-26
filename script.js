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

    // New feature: Hover over bottom images to reveal keys
    document.querySelectorAll('.bottom-img').forEach((img, index) => {
        img.addEventListener('mouseenter', () => {
            const keyImage = document.createElement('img');
            keyImage.src = `path/to/keyImage${index + 1}.png`; // Adjust the path to your key images
            keyImage.style.position = 'absolute';
            keyImage.style.width = '150px'; // Set key image width
            document.body.appendChild(keyImage);

            placeKeyRandomly(keyImage);
        });
    });

    // Function to ensure keys do not overlap with the bottom images or the container
    function placeKeyRandomly(keyImage) {
        const containerRect = document.querySelector('.container').getBoundingClientRect();
        const bottomImagesRect = document.querySelector('.image-border').getBoundingClientRect();
        let overlap = true;
        
        while (overlap) {
            keyImage.style.top = `${Math.random() * (window.innerHeight - 150)}px`;
            keyImage.style.left = `${Math.random() * (window.innerWidth - 150)}px`;

            const keyRect = keyImage.getBoundingClientRect();
            
            // Check for overlap with the container and the bottom images
            const overlapWithContainer = !(keyRect.right < containerRect.left || keyRect.left > containerRect.right || keyRect.bottom < containerRect.top || keyRect.top > containerRect.bottom);
            const overlapWithBottomImages = keyRect.top < bottomImagesRect.bottom;

            overlap = overlapWithContainer || overlapWithBottomImages;
        }
    }
});

// Function to check the user's input against the correct answer on Page 3
function checkWord() {
    var userInput = document.getElementById('userInput').value;
    var feedback = document.getElementById('feedback');

    if (userInput.toLowerCase() === 'easterbunny') {
        feedback.textContent = 'Correct! You unraveled the clue.';
        // Optionally, redirect to the next page or reveal a hidden link
        // window.location.href = 'nextPuzzlePage.html';
    } else {
        feedback.textContent = 'Hmm, that does not seem right. Try pondering a bit more.';
    }
}

// Get the modal
var modal = document.getElementById("urgentMessageModal");

// Get the button that opens the modal
var btn = document.getElementById("openModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
