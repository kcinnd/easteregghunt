document.addEventListener('DOMContentLoaded', function() {
    setupEggModal();
    setupModal();
    setupSecretImageAndConfetti();
    setupGrassAndKeysHoverEffect();
    setupEventListeners();
    setupStickers();
    setupColorSwatches();
    setupEggCustomization();
    setupTypewriterMessages();
    
    // Define canvas and context for drawing the egg
    const canvas = document.getElementById('eggCanvas');
    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Unable to get canvas context!');
        return;
    }

    // Function to draw an egg on the canvas
    function drawEgg(x, y, width, height, color) {
        ctx.beginPath(); // Start a new path
        ctx.ellipse(x, y, width / 2, height / 2, 0, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
    }

    // Initial drawing of the egg
    drawEgg(canvas.width / 2, canvas.height / 2, 100, 150, '#F9CEEE');

    // Setup event listeners for color swatches
    const colorSwatches = document.querySelectorAll('.color-swatch');
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            drawEgg(canvas.width / 2, canvas.height / 2, 100, 150, color);
        });
    });
});

function setupModal() {
    var btn = document.getElementById('openModal');
    var modal = document.getElementById('urgentMessageModal');
    var spans = document.getElementsByClassName("close");

    if (btn) {
        btn.onclick = function() {
            modal.style.display = "block";
        };
    }

    Array.from(spans).forEach(span => {
        span.onclick = function() {
            modal.style.display = "none";
        };
    });

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

function setupEggModal() {
    var eggModal = document.getElementById("eggModal");
    var closeButton = document.querySelector("#eggModal .close"); // Adjust selector as necessary

    // Ensure the modal and the close button exist
    if (eggModal && closeButton) {
        closeButton.onclick = function() {
            eggModal.style.display = "none";
        };
    }

    // Optional: Close the modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target === eggModal) {
            eggModal.style.display = "none";
        }
    };
}

function setupSecretImageAndConfetti() {
    const secretImage = document.getElementById('secretImage');
    const eggRevealModal = document.getElementById('eggRevealModal');
    const revealEggBtn = document.getElementById('revealEggBtn');

    if (secretImage && eggRevealModal) {
        secretImage.addEventListener('mouseenter', function() {
            confetti({
                particleCount: 500,
                spread: 200,
                origin: { y: 0.6 }
            });
            setTimeout(() => {
                eggRevealModal.style.display = 'block';
            }, 2000);
        });

        const closeModal = eggRevealModal.querySelector('.close');
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                eggRevealModal.style.display = 'none';
            });
        }

        if (revealEggBtn) {
            revealEggBtn.addEventListener('click', function() {
                eggRevealModal.style.display = 'none';
            });
        }
    } else {
        console.log('One of the elements (secretImage, eggRevealModal, revealEggBtn) is not found.');
    }
}

function setupTypewriterMessages() {
    const headerElement = document.getElementById('typewriterHeader');
    const bodyElement = document.getElementById('typewriterBody');

    if (headerElement) {
        const headerText = "🚨🐰 URGENT MESSAGE from the Easter Bunny 🐰🚨";
        setupTypewriter(headerElement, headerText, function() {
            if (bodyElement) {
                const bodyText = "Attention all Easter Egg Hunters: This is an emergency notice from the Easter Bunny. The key to a precious treasure Easter Egg has gone missing! 🚨🗝️ Without this key, we risk losing access to the most magical Easter treasure! We need your help to find the key! 🕵️‍♀️🔍 Please search high and low, under every bush and behind every flower. Time is of the essence, as Easter draws near and the magic of the holiday depends on retrieving this key. If you discover any clues or have any leads, please dispatch a message to me immediately. Together, we can save Easter and ensure a joyous celebration for all! Hop to it, my friends! The fate of Easter rests in our hands! With urgency and hope, The Easter Bunny 🐰";
                setupTypewriter(bodyElement, bodyText);
            }
        });
    }
}

function setupGrassAndKeysHoverEffect() {
    const grassContainer = document.querySelector('.easter-bunny-grass');
    if (!grassContainer) return;

    const grassImages = [
        'https://i.imgur.com/SGrsdhI.png',
        'https://i.imgur.com/YsEkPnH.png',
        'https://i.imgur.com/Ec8VQrS.png',
        'https://i.imgur.com/3NuudR3.png',
        'https://i.imgur.com/K0bd7nK.png',
        'https://i.imgur.com/kru4203.png',
        'https://i.imgur.com/P0ZhspR.png',
        'https://i.imgur.com/Z7XSw47.png',
        'https://i.imgur.com/JrlJYKS.png',
        'https://i.imgur.com/9UKYi7k.png'
    ];
    grassImages.forEach((src, index) => {
        const grassImg = document.createElement('img');
        grassImg.src = src;
        grassImg.className = 'grass-img';
        grassImg.id = `grass${index + 1}`;
        grassContainer.appendChild(grassImg);
    });
}

function setupColorSwatches() {
    const colorSwatches = document.querySelectorAll('.color-swatch'); // Get all color swatches

    // Add a click event listener to each color swatch
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            const color = this.getAttribute('data-color'); // Get the color from the swatch's data-color attribute
            eggElement.style.backgroundColor = color; // Set the egg's background color to the selected color
        });
    });
}

function setupStickers() {
    const eggContainer = document.querySelector('.egg-container');
    document.querySelectorAll('.sticker').forEach(sticker => {
        sticker.addEventListener('click', function() {
            const stickerCopy = this.cloneNode();
            stickerCopy.style.position = 'absolute';
            stickerCopy.style.width = '50px'; // Adjust size as needed
            stickerCopy.style.left = '50%'; // Adjust position as needed
            stickerCopy.style.top = '50%'; // Adjust position as needed
            stickerCopy.style.transform = 'translate(-50%, -50%)'; // Center the sticker
            
            eggContainer.appendChild(stickerCopy);
            
            // Allow moving the sticker
            stickerCopy.addEventListener('mousedown', function(e) {
                let shiftX = e.clientX - stickerCopy.getBoundingClientRect().left;
                let shiftY = e.clientY - stickerCopy.getBoundingClientRect().top;

                function moveAt(pageX, pageY) {
                    stickerCopy.style.left = pageX - shiftX + 'px';
                    stickerCopy.style.top = pageY - shiftY + 'px';
                }

                function onMouseMove(event) {
                    moveAt(event.pageX, event.pageY);
                }

                document.addEventListener('mousemove', onMouseMove);

                stickerCopy.onmouseup = function() {
                    document.removeEventListener('mousemove', onMouseMove);
                    stickerCopy.onmouseup = null;
                };
            });

            stickerCopy.ondragstart = function() {
                return false;
            };
        });
    });
}
    
    
function setupAnswerSubmissions(button, correctAnswer, inputId, feedbackId) {
    if (button) {
        button.addEventListener('click', function() {
            const submitAnswerEasterBunny = document.getElementById('submitAnswerEasterBunny');
            const submitAnswerMysteryTrail = document.getElementById('submitAnswerMysteryTrail');
            setupAnswerSubmissions(submitAnswerEasterBunny, 'specialeasteregg', 'easterBunnyInput', 'easterBunnyFeedback');
            setupAnswerSubmissions(submitAnswerMysteryTrail, 'easterbunny', 'mysteryTrailInput', 'mysteryTrailFeedback');
            const userInput = document.getElementById(inputId).value.trim().toLowerCase();
            const feedbackElement = document.getElementById(feedbackId);
            if (userInput === correctAnswer.toLowerCase()) {
                feedbackElement.textContent = 'Nice job! You found the secret word.';
            } else {
                feedbackElement.textContent = 'That is not right; please try again.';
            }
        });
    }
}    
    
function setupEventListeners() {
    const revealEggBtn = document.getElementById('revealEggBtn');
    const startHuntBtn = document.getElementById('startHuntButton'); // Renamed variable
    const submitAnswerButton = document.getElementById('submitAnswer');
    const submitBtn = document.getElementById('submitBtn');

    var revealBtn = document.getElementById('revealBtnId'); // Replace 'revealBtnId' with the actual ID of your button
    if (revealBtn) {
        revealBtn.onclick = function() {
            // Your code here
        };
    } else {
        console.log('Reveal button not found.');
    }
    
    if (submitBtn) {
        submitBtn.addEventListener('click', checkWord);
    } else {
        console.log('Submit button not found.');
    }

    if (revealEggBtn) {
        revealEggBtn.addEventListener('click', showNewEgg);
    } else {
        console.log('revealEggBtn not found on this page.');
    }

    if (startHuntBtn) {
        startHuntBtn.addEventListener('click', startHunt); // Changed to 'startHunt'
    } else {
        console.log('startHuntButton not found on this page.');
    }
}
    
    // Additional or game-specific functions
function showNewEgg() {
    document.getElementById('newEgg').style.display = 'block';
    document.querySelector('.egg-container').style.display = 'flex';
    document.getElementById('eggRevealModal').style.display = 'none';
}

function startHunt() {
    window.location.href = 'page1.html';
}

function checkWord(correctAnswer, inputElementId, feedbackElementId) {
    const userInput = document.getElementById(inputElementId).value.trim().toLowerCase();
    const feedbackElement = document.getElementById(feedbackElementId);

    if (userInput === correctAnswer.toLowerCase()) {
        feedbackElement.textContent = 'Nice job! You found the secret word.';
        // Additional actions for correct answer, like redirecting to another page
    } else {
        feedbackElement.textContent = 'That is not right; please try again.';
        // Additional actions for incorrect answer
    }
}

function setupTypewriter(element, text, callback) {
    let cursorPosition = 0;
    let typeSpeed = 75; // Adjust typing speed as needed

    function type() {
        if (cursorPosition < text.length) {
            element.innerHTML += text.charAt(cursorPosition);
            cursorPosition++;
            setTimeout(type, typeSpeed);
        } else if (typeof callback === 'function') {
            callback(); // Call the callback function once typing is complete
        }
    }

    type(); // Start typing
}
