document.addEventListener('DOMContentLoaded', function() {
    setupModal();
    setupSecretImageAndConfetti();
    setupEventListeners();
    setupCloseableImageModal();
    setupPermanentImageModal();
    setupSubmitHandlers();
    setupGrassHoverEffect();
    
    const popupImageModal = document.getElementById('popupImageModal');
    const popupImageCloseBtn = document.querySelector('#popupImageModal .close');
    const smallImage = document.getElementById('smallImage');
    const numberseggModal = document.getElementById('numberseggModal');
    const additionalImage = document.getElementById('additionalImage');

    if (popupImageCloseBtn) {
        popupImageCloseBtn.addEventListener('click', () => popupImageModal.style.display = 'none');
    }

    if (smallImage && numberseggModal) {
        setupNumberseggModal(smallImage, numberseggModal);
    }

    if (additionalImage) {
        additionalImage.addEventListener('click', () => popupImageModal.style.display = 'block');
    }

   const openUrgentMessageBtn = document.getElementById('openModalButton');
    if (openUrgentMessageBtn) {
        openUrgentMessageBtn.addEventListener('click', () => {
            const urgentMessageModal = document.getElementById('urgentMessageModal');
            urgentMessageModal.style.display = 'block';

            document.getElementById('typewriterHeader').innerHTML = '';
            document.getElementById('typewriterBody').innerHTML = '';

            // Start typewriter effect for header and body
            setupTypewriter('typewriterHeader', "🚨🐰 URGENT MESSAGE from the Easter Bunny 🐰🚨");
            setupTypewriter('typewriterBody', "Attention all Easter Egg Hunters: This is an emergency notice from the Easter Bunny. The two keys to a precious treasure Easter Egg have gone missing! 🚨🗝️ Without these keys, we risk losing access to the most magical Easter treasure! We need your help to find the keys! 🕵️‍♀️🔍 Please search high and low, under every bush and behind every flower. Time is of the essence, as Easter draws near and the magic of the holiday depends on retrieving these keys. If you discover any clues or have any leads, please dispatch a message to me immediately. Together, we can save Easter and ensure a joyous celebration for all! Hop to it, my friends! The fate of Easter rests in your hands! With urgency and hope, The Easter Bunny 🐰");
        });
    }

    // Add closeModal functionality to the urgent message modal
    const closeUrgentMessageBtn = document.querySelector('#urgentMessageModal .close');
    if (closeUrgentMessageBtn) {
        closeUrgentMessageBtn.addEventListener('click', () => {
            urgentMessageModal.style.display = 'none';
        });
    }

    const closeBtns = document.querySelectorAll('.close');

  // Function to close modals
    closeBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        btn.closest('.modal').style.display = 'none';
      });
    });

  // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
      if (event.target.className.includes('modal')) {
        event.target.style.display = 'none';
      }
    });

    // Close the modal when clicking outside of it
    window.addEventListener('click', function(event) {
      if (event.target == eggImagesModal) {
        eggImagesModal.style.display = 'none';
      }
    });
});

function setupTypewriter(elementId, text) {
    const element = document.getElementById(elementId);
    let cursorPosition = 0;
    let typeSpeed = 70; // Adjust typing speed as needed

    function type() {
        if (cursorPosition < text.length) {
            element.innerHTML += text.charAt(cursorPosition);
            cursorPosition++;
            setTimeout(type, typeSpeed);
        }
    }

    if (element) {
        type(); // Start typing effect
    }
}

const permanentImage = document.getElementById('permanentImage');
    if (permanentImage) {
        permanentImage.addEventListener('click', openCircularModal);
    }

    // Close the circular modal when the close button is clicked
    const closeCircularModalBtn = document.getElementById('circularModal').querySelector('.close');
    if (closeCircularModalBtn) {
        closeCircularModalBtn.addEventListener('click', closeCircularModal);
    }

    // Close the circular modal when clicking outside of it
    const circularModalBackground = document.getElementById('circularModalBackground');
    window.addEventListener('click', function(event) {
        if (event.target === circularModalBackground) {
            closeCircularModal();
        }
    });

    // Your existing setup functions continue here...
});

function openCircularModal() {
    const circularModalBackground = document.getElementById('circularModalBackground');
    circularModalBackground.style.visibility = 'visible';
    circularModalBackground.style.opacity = '1';
    document.getElementById('circularModal').style.display = 'flex';
}

function closeCircularModal() {
    const circularModalBackground = document.getElementById('circularModalBackground');
    circularModalBackground.style.visibility = 'hidden';
    circularModalBackground.style.opacity = '0';
    document.getElementById('circularModal').style.display = 'none';
}

function setupNumberseggModal(triggerElement, modalElement) {
    const closeBtn = modalElement.querySelector('.close');
    triggerElement.addEventListener('click', () => modalElement.style.display = 'block');
    closeBtn.addEventListener('click', () => modalElement.style.display = 'none');
    window.addEventListener('click', (event) => {
        if (event.target === modalElement) {
            modalElement.style.display = 'none';
        }
    });
}

function setupModal() {
    const modalBtns = document.querySelectorAll('[data-modal-target]');
    const closeBtns = document.querySelectorAll('.modal .close');

    modalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = document.querySelector(btn.dataset.modalTarget);
            modal.style.display = 'block';
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').style.display = 'none';
        });
    });
    
    window.addEventListener('click', event => {
        if (event.target.classList.contains('pmodal')) {
            event.target.style.display = 'none';
        }
    });
}

function setupCloseableImageModal() {
    const popupImageModal = document.getElementById('popupImageModal');
    if (popupImageModal) {
        const closeBtn = popupImageModal.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            popupImageModal.style.display = 'none';
        });
        
        // Optional: Close when clicking outside the modal
        window.addEventListener('click', (event) => {
            if (event.target === popupImageModal) {
                popupImageModal.style.display = 'none';
            }
        });
    }
}
    
function setupPermanentImageModal() {
    const permanentImage = document.getElementById('permanentImage');
    const circularModalBackground = document.getElementById('circularModalBackground');

    // Listen for clicks on the permanent image to open the modal
    if (permanentImage) {
        permanentImage.addEventListener('click', openCircularModal);
    }

    // Listen for clicks outside the circular modal to close it
    window.addEventListener('click', function(event) {
        if (event.target === circularModalBackground) {
            closeCircularModal(); // Use the close function to ensure consistent behavior
        }
    });
}

function setupSubmitHandlers() {
    const submitPasscodeButton = document.getElementById('submitPasscode');
    const pageType = document.body.getAttribute('data-page-type'); // Add a custom data attribute to your body tag to identify the page

    submitPasscodeButton.addEventListener('click', function() {
        const passcodeInputValue = document.getElementById('passcodeInput').value.trim();
        let correctPasscode;

        switch (pageType) {
            case 'mysterytrail':
                correctPasscode = 'easterbunny';
                break;
            case 'easterbunny':
                correctPasscode = 'eggspert';
                break;
            case 'eggspert':
                correctPasscode = '297577';
                break;
            default:
                correctPasscode = ''; // Handle undefined pages or set a default passcode
        }

        if (passcodeInputValue.toLowerCase() === correctPasscode) {
            alert("Congratulations! That is right! Now use it to advance the page.");
        } else {
            alert("That is not right. Please try again!");
            document.getElementById('passcodeInput').value = '';
        }
    });
}

function setupSecretImageAndConfetti() {
    const secretImage = document.getElementById('secretImage');
    const eggRevealModal = document.getElementById('eggRevealModal');
    const eggRevealModalContent = eggRevealModal.querySelector('.eggrmodal-content');

    if (secretImage && eggRevealModal) {
        secretImage.addEventListener('mouseenter', function() {
            // Trigger confetti effect
            confetti({
                particleCount: 500,
                spread: 200,
                origin: { y: 0.6 }
            });
            // Set a timeout to display the egg reveal modal after 2 seconds
            setTimeout(() => {
            eggRevealModal.style.display = 'block'; // Change to 'flex' to make it visible
            eggRevealModalContent.style.display = 'flex';
            }, 2000);
        });

        // Close modal logic
        const closeModal = eggRevealModal.querySelector('.close');
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                eggRevealModal.style.display = 'none'; // Hide the modal when close button is clicked
            });
        }
    } else {
        console.log('One of the elements (secretImage, eggRevealModal) is not found.');
    }
}


function setupEventListeners() {
    const revealEggBtn = document.getElementById('revealEggBtn');
    const submitAnswerButton = document.getElementById('submitAnswer');
    const submitBtn = document.getElementById('submitBtn');
    const eggImagesModal = document.getElementById('eggImagesModal');

    if (revealEggBtn && eggImagesModal) {
        revealEggBtn.addEventListener('click', function() {
            // Hide the eggRevealModal first if it's visible
            const eggRevealModal = document.getElementById('eggRevealModal');
            if (eggRevealModal) {
                eggRevealModal.style.display = 'none';
            }

            // Show the eggImagesModal
            eggImagesModal.style.display = 'block';
        });
    } else {
        console.error('One of the elements (revealEggBtn, eggImagesModal) is not found.');
    }
    
    if (submitBtn) {
        submitBtn.addEventListener('click', checkWord);
    } else {
        console.log('Submit button not found.');
    }
}

function setupGrassHoverEffect() {
    const grassImages = document.querySelectorAll('.grass-img');

    grassImages.forEach((grass, index) => {
        grass.addEventListener('mouseover', function() {
            // Ensure a key is only added once per grass image
            if (!grass.hasAttribute('data-key-found')) {
                const keyImg = document.createElement('img');
                keyImg.src = 'https://i.imgur.com/9a87llh.png'; // Your key image URL
                keyImg.classList.add('key-img');
                keyImg.style.position = 'absolute';
                keyImg.style.height = '75px'; // Set the key image height
                // Random position that does not overlap the grass images or other keys
                keyImg.style.left = `${Math.random() * (window.innerWidth - 75)}px`;
                keyImg.style.top = `${Math.random() * (window.innerHeight - 75)}px`;

                document.body.appendChild(keyImg);

                // Mark the grass as having its key found
                grass.setAttribute('data-key-found', 'true');
            }
        });
    });
}
