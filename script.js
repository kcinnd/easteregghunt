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

    // Additional new feature: Randomly place new images on the Easter Bunny page
    const newImages = [
        'https://i.imgur.com/jKOtLuY.png',
        'https://i.imgur.com/oxvUvMC.png',
        'https://i.imgur.com/KWG3YHp.png'
    ];

    newImages.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.style.width = '20px'; // Set the new images width
        img.style.position = 'absolute';
        img.classList.add('random-img'); // Use this class for additional styling if needed
        document.body.appendChild(img);

        placeRandomly(img); // Function to place images randomly

        // Hover effect to add a key
        img.addEventListener('mouseenter', () => {
            const keyImage = document.createElement('img');
            keyImage.src = `path/to/randomKey${index + 1}.png`; // Adjust the path to your key images
            keyImage.style.position = 'absolute';
            keyImage.style.width = '150px'; // Set key image width
            document.body.appendChild(keyImage);

            placeRandomly(keyImage); // Reuse the function to place keys randomly
        });
    });

    // Function to place elements randomly without overlapping important elements
    function placeRandomly(element) {
        let overlap;
        do {
            element.style.left = `${Math.random() * (window.innerWidth - element.offsetWidth)}px`;
            element.style.top = `${Math.random() * (window.innerHeight - element.offsetHeight)}px`;
            overlap = checkOverlap(element);
        } while (overlap);
    }

    // Function to check for overlap with container and bottom images
    function checkOverlap(element) {
        const rect = element.getBoundingClientRect();
        const containerRect = document.querySelector('.container').getBoundingClientRect();
        const bottomImagesRect = document.querySelector('.image-border').getBoundingClientRect();
        
        // Check for overlap with the container
        if (!(rect.right < containerRect.left || rect.left > containerRect.right ||
              rect.bottom < containerRect.top || rect.top > containerRect.bottom)) {
            return true;
        }
        // Check for overlap with bottom images
        if (rect.bottom > bottomImagesRect.top) {
            return true;
        }
        // Check for proximity to page edges
        if (rect.left < 10 || rect.top < 10 ||
            window.innerWidth - rect.right < 10 || window.innerHeight - rect.bottom < 10) {
            return true;
        }
        return false;
    }

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
