function startHunt() {
    window.location.href = 'page1.html'; // Redirects to the first puzzle page
}

// Event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    setupModal(); // Modal functionality setup
    handlePageNavigation(); // Handling navigation based on hidden messages and submit button
    revealKeysOnHover(); // Hover over bottom images to reveal keys
    setupSpecialTrigger(); // Special Trigger Image functionality
    setupAdditionalImages(); // Additional new feature: Randomly place new images on the page
    var revealEggButton = document.getElementById('revealEggBtn');
    if (revealEggButton) {
        revealEggButton.addEventListener('click', function() {
            revealEgg(); // Call the function to reveal the egg
            // You may also want to close the modal here
            var modal = document.getElementById('urgentMessageModal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    }
});

// Modal functionality setup
function setupModal() {
    var modal = document.getElementById('urgentMessageModal');
    var btn = document.getElementById('openModal');
    var span = document.getElementsByClassName('close')[0];

    btn.onclick = function() {
        modal.style.display = 'block';
    };

    span.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// Handle navigation for hidden messages and check word functionality
function handlePageNavigation() {
    var hiddenMessage = document.getElementById('hiddenMessage');
    if (hiddenMessage) {
        hiddenMessage.onclick = function() {
            window.location.href = 'mysteryTrail.html';
        };
    }

    var submitButton = document.querySelector('button');
    if (submitButton && window.location.href.includes('mysteryTrail.html')) {
        submitButton.addEventListener('click', checkWord);
    }
}

// Function to check the user's input against the correct answer on Page 3
function checkWord() {
    var userInput = document.getElementById('userInput').value;
    var feedback = document.getElementById('feedback');

    if (userInput.toLowerCase() === 'easterbunny') {
        feedback.textContent = 'Correct! You unraveled the clue.';
    } else {
        feedback.textContent = 'Hmm, that does not seem right. Try pondering a bit more.';
    }
}

// Hover over bottom images to reveal keys
function revealKeysOnHover() {
    document.querySelectorAll('.bottom-img').forEach((img, index) => {
        img.addEventListener('mouseenter', () => {
            const keyImage = document.createElement('img');
            keyImage.src = `path/to/keyImage${index + 1}.png`; // Ensure the path is correct
            keyImage.style.position = 'absolute';
            keyImage.style.width = '150px';
            document.body.appendChild(keyImage);

            placeKeyRandomly(keyImage);
        });
    });
}

// Special Trigger Image functionality
function setupSpecialTrigger() {
    var specialTrigger = document.getElementById('specialTrigger');
    if (specialTrigger) {
        specialTrigger.addEventListener('mouseenter', function() {
            // Start confetti effect (use your confetti library's API)
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

            // Show popup message after a delay
            setTimeout(function() {
                document.getElementById('eggRevealModal').style.display = 'block';
            }, 3000); // Adjust timing as needed
        });
    }
}

function hideEggRevealModal() {
    document.getElementById('eggRevealModal').style.display = 'none';
}

// Additional new feature: Randomly place new images on the Easter Bunny page
function setupAdditionalImages() {
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
}

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

    // Check for overlap with the container and bottom images
    if (!(rect.right < containerRect.left || rect.left > containerRect.right ||
          rect.bottom < containerRect.top || rect.top > containerRect.bottom) ||
        rect.bottom > bottomImagesRect.top) {
        return true;
    }

    // Check for proximity to page edges
    if (rect.left < 10 || rect.top < 10 || window.innerWidth - rect.right < 10 || window.innerHeight - rect.bottom < 10) {
        return true;
    }

    return false;
}

function revealEgg() {
    var eggContainer = document.querySelector('.egg-container'); // Select the egg container
    if (eggContainer) {
        eggContainer.style.display = 'flex'; // Change the display to 'flex' to make it visible
        // If you want to directly show the egg image without a container, use the line below instead
        // document.getElementById('newEgg').style.display = 'block';
    }
}
