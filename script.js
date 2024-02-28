document.addEventListener('DOMContentLoaded', function() {
    // Your existing setup functions
    setupModal();
    setupSecretImageAndConfetti();
    setupEggCustomization();
    setupGrassAndKeysHoverEffect();
    setupEventListeners();
    setupColorSwatches();
    setupStickers();

    const submitAnswerEasterBunny = document.getElementById('submitAnswerEasterBunny');
    if (submitAnswerEasterBunny) {
        submitAnswerEasterBunny.addEventListener('click', function() {
            checkWord('specialeasteregg', 'easterBunnyInput', 'easterBunnyFeedback');
        });
    }
    
    // For the Mystery Trail page
    const submitAnswerMysteryTrail = document.getElementById('submitAnswerMysteryTrail');
    if (submitAnswerMysteryTrail) {
        submitAnswerMysteryTrail.addEventListener('click', function() {
            checkWord('easterbunny', 'mysteryTrailInput', 'mysteryTrailFeedback');
        });
    }
    // Setup for the button to reveal the modal
    const revealBtn = document.getElementById('revealEggBtn');
    const eggModal = document.getElementById('eggModal');
    const closeButton = document.getElementsByClassName('close-button')[0];

    // Ensure the reveal button and the modal exist
    if (revealBtn && eggModal) {
        revealBtn.addEventListener('click', function() {
            // This will hide the modal when the button is clicked
            eggModal.style.display = 'block';
        });
    } else {
        console.log('Reveal button or modal not found.');
    }

    // Setup for the close button inside the modal
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            eggModal.style.display = 'none';
        });
    }

    // Close the modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target == eggModal) {
            eggModal.style.display = 'none';
        }
    });
});

function setupEggCustomization() {
    const eggElement = document.getElementById('decorativeEgg'); // Ensure this ID matches your HTML
    const colorSwatches = document.querySelectorAll('.color-swatch'); // Ensure this class matches your HTML
    const stickers = document.querySelectorAll('.sticker'); // Ensure this class matches your HTML

    // Setup color swatches
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            const color = this.getAttribute('data-color'); // Ensure your swatches have a 'data-color' attribute
            eggElement.style.backgroundColor = color;
        });
    });

    // Setup stickers
    stickers.forEach(sticker => {
        sticker.addEventListener('click', function() {
            const stickerImage = this.cloneNode(true);
            stickerImage.style.position = 'absolute';
            eggElement.appendChild(stickerImage);
            // Add more logic here if you want to allow moving the stickers around
        });
    });
}

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

document.addEventListener('DOMContentLoaded', function() {
    setupModal();
    setupEggModal(); // Make sure this function is called
    // Other setup functions...
});

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

const keyImages = [
    'https://i.imgur.com/tURKwGZ.png',
    'https://i.imgur.com/q6c11A9.png',
    'https://i.imgur.com/xgWycmI.png',
    'https://i.imgur.com/xtNwn5Q.png',
    'https://i.imgur.com/4OYvyjf.png',
    'https://i.imgur.com/xkm6yV7.png',
    'https://i.imgur.com/tEW10f7.png',
    'https://i.imgur.com/HcTyCd7.png',
    'https://i.imgur.com/61J8Ydt.png',
    'https://i.imgur.com/P6If7vu.png',
    'https://i.imgur.com/9a87llh.png?1',
    'https://i.imgur.com/Cx5sW4T.png?1',
    'https://i.imgur.com/Sppxziz.png',
    'https://i.imgur.com/yDVaMFM.png',
    'https://i.imgur.com/pbUBsZf.png',
    'https://i.imgur.com/ymXcQbo.png'
];

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

        const keyImg = document.createElement('img');
        keyImg.src = keyImages[index % keyImages.length]; // Loop through keyImages array
        keyImg.className = 'key-img';
        keyImg.id = `key${index + 1}`;
        keyImg.style.position = 'absolute';
        keyImg.style.display = 'none'; // Initially hidden
        document.body.appendChild(keyImg);

        grassImg.addEventListener('mouseenter', () => {
            keyImg.style.display = 'block'; // Show the key on hover
            placeKeyRandomly(keyImg, '.grass-img, .key-img, .logo, #container'); // Avoid overlapping
        });
    });
}

function setupColorSwatches() {
    const eggElement = document.getElementById('decorativeEgg'); // Get the egg element
    const colorSwatches = document.querySelectorAll('.color-swatch'); // Get all color swatches

    // Add a click event listener to each color swatch
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            const color = this.getAttribute('data-color'); // Get the color from the swatch's data-color attribute
            eggElement.style.backgroundColor = color; // Set the egg's background color to the selected color
        });
    });
}

// Call setupColorSwatches function when the page has loaded
document.addEventListener('DOMContentLoaded', setupColorSwatches);

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

function placeKeyRandomly(keyImg, avoidElementsClass) {
    let placed = false;
    const maxAttempts = 5000; // Increased number of attempts for more chances to find a spot
    let attempts = 0;

    while (!placed && attempts < maxAttempts) {
        // Random position considering 50px padding from the edges
        const x = Math.random() * (window.innerWidth - keyImg.offsetWidth - 100) + 50;
        const y = Math.random() * (window.innerHeight - keyImg.offsetHeight - 100) + 50;

        keyImg.style.left = `${x}px`;
        keyImg.style.top = `${y}px`;

        let overlapping = false;
        document.querySelectorAll(avoidElementsClass + ', .key-img').forEach(element => {
            if (element !== keyImg && checkOverlap(keyImg, element)) {
                overlapping = true;
            }
        });

        // Check if the key is within 50px of the edges
        if (x < 50 || y < 50 || (window.innerWidth - x) < 150 || (window.innerHeight - y) < 150) {
            overlapping = true;
        }

        if (!overlapping) {
            placed = true;
        }

        attempts++;
    }

    if (!placed) {
        console.error("Couldn't place key without overlapping after max attempts");
    }
}

function checkOverlap(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
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
        feedbackElement.textContent = 'Correct! You found the secret word.';
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

document.addEventListener('DOMContentLoaded', function() {
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
});
