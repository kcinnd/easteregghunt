document.addEventListener('DOMContentLoaded', function() {
    setupModal();
    setupEggModal();
    setupSecretImageAndConfetti();
    setupEventListeners();
    setupCloseableImageModal();
    setupPermanentImageModal();
    setupSubmitHandlers();
    setupGrassHoverEffect();
});

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
    const passcodeModal = document.getElementById('passcodeModal');
    
    if (permanentImage && passcodeModal) {
        permanentImage.addEventListener('click', () => {
            passcodeModal.style.display = 'block';
        });

        // Close the passcode modal when clicking outside of it
        window.addEventListener('click', (event) => {
            if (event.target === passcodeModal) {
                passcodeModal.style.display = 'none';
            }
        });
    }
}

function setupSubmitHandlers() {
    const submitButtons = document.querySelectorAll('[data-submit-action]');
    submitButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.submitAction;
            const input = document.querySelector(btn.dataset.input);
            const feedback = document.querySelector(btn.dataset.feedback);

            switch (action) {
                case 'checkEasterBunny':
                    if (input.value.trim().toLowerCase() === 'eggspert') {
                        window.location.href = 'eggspert.html';
                    } else {
                        feedback.textContent = 'That is not right; please try again.';
                    }
                    break;
                case 'checkMysteryTrail':
                    if (input.value.trim().toLowerCase() === 'easterbunny') {
                        window.location.href = 'easterbunny.html';
                    } else {
                        feedback.textContent = 'That is not right; please try again.';
                    }
                    break;
                case 'checkEggspert':
                    if (input.value.trim() === '30636') {
                        alert('Correct passcode!');
                        // window.location.href = 'nextPage.html'; // Uncomment to redirect
                    } else {
                        feedback.textContent = 'Incorrect passcode. Please try again.';
                        input.value = ''; // Clear input
                    }
                    break;
            }
        });
    });
}

function setupEggImagesModal() {
    var revealEggBtn = document.getElementById('revealEggBtn');
    var eggImagesModal = document.getElementById('eggImagesModal');
    if (eggImagesModal) {
        var closeEggImagesModal = eggImagesModal.querySelector('.close');
        revealEggBtn.onclick = function() {
            eggImagesModal.style.display = 'block';
        };
        closeEggImagesModal.onclick = function() {
            eggImagesModal.style.display = 'none';
        };
        window.onclick = function(event) {
            if (event.target == eggImagesModal) {
                eggImagesModal.style.display = 'none';
            }
        };
    }
}

function setupUrgentMessageModal() {
    const openModalBtn = document.getElementById('openModal');
    if (openModalBtn) {
        openModalBtn.addEventListener('click', () => {
            const urgentMessageModal = document.getElementById('urgentMessageModal');
            urgentMessageModal.style.display = 'block';
            setupTypewriter('typewriterHeader', "🚨🐰 URGENT MESSAGE from the Easter Bunny 🐰🚨");
            setupTypewriter('typewriterBody', "Attention all Easter Egg Hunters: This is an emergency notice from the Easter Bunny. The two keys to a precious treasure Easter Egg have gone missing! 🚨🗝️ Without these keys, we risk losing access to the most magical Easter treasure! We need your help to find the keys! 🕵️‍♀️🔍 Please search high and low, under every bush and behind every flower. Time is of the essence, as Easter draws near and the magic of the holiday depends on retrieving these keys. If you discover any clues or have any leads, please dispatch a message to me immediately. Together, we can save Easter and ensure a joyous celebration for all! Hop to it, my friends! The fate of Easter rests in your hands! With urgency and hope, The Easter Bunny 🐰");
        });
    }
}

function setupTypewriter(elementId, text) {
    const element = document.getElementById(elementId);
    let cursorPosition = 0;
    let typeSpeed = 70;

    function type() {
        if (cursorPosition < text.length) {
            element.innerHTML += text.charAt(cursorPosition);
            cursorPosition++;
            setTimeout(type, typeSpeed);
        }
    }

    if (element) {
        element.innerHTML = ''; // Clear existing text
        type();
    }
}

function setupEggModal() {
    var eggModal = document.getElementById("eggModal");
    var closeButton = document.querySelector("#eggModal .close");

    if (eggModal && closeButton) {
        closeButton.onclick = function() {
            eggModal.style.display = "none";
        };
    }

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

function setupEventListeners() {
    const revealEggBtn = document.getElementById('revealEggBtn');
    const startHuntBtn = document.getElementById('startHuntButton');
    const submitAnswerButton = document.getElementById('submitAnswer');
    const submitBtn = document.getElementById('submitBtn');

    var revealBtn = document.getElementById('revealBtnId');
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
        startHuntBtn.addEventListener('click', startHunt);
    } else {
        console.log('startHuntButton not found on this page.');
    }
}

function showNewEgg() {
    document.getElementById('newEgg').style.display = 'block';
    document.querySelector('.egg-container').style.display = 'flex';
    document.getElementById('eggRevealModal').style.display = 'none';
}

function startHunt() {
    window.location.href = 'page1.html';
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
