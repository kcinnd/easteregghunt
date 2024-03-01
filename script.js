document.addEventListener('DOMContentLoaded', function() {
    setupModal();
    setupEggModal();
    setupSecretImageAndConfetti();
    setupEventListeners();
    const closeableImageModal = document.getElementById('closeableImageModal');
    const closeSpan = closeableImageModal.querySelector('.close');
    const permanentImage = document.getElementById('permanentImage');
    const passcodeModal = document.getElementById('passcodeModal');
    const passcodeInput = document.getElementById('passcodeInput');
    const submitPasscode = document.getElementById('submitPasscode');

    document.getElementById('permanentImage').addEventListener('click', function() {
    document.querySelector('.glowing-circle').style.display = 'block'; // Show the circle
    });

    window.addEventListener('click', function(event) {
        const circle = document.querySelector('.glowing-circle');
        if (event.target !== circle && !circle.contains(event.target)) {
            circle.style.display = 'none'; // Hide the circle if clicking outside
        }
    });

    closeSpan.onclick = function() {
        closeableImageModal.style.display = "none";
    }

    permanentImage.onclick = function() {
        passcodeModal.style.display = "block";
    }

    submitPasscode.onclick = function() {
        if(passcodeInput.value === "30636") {
            window.location.href = "nextPage.html"; // Redirect to the next page
        } else {
            alert("Incorrect passcode. Please try again.");
            passcodeInput.value = ""; // Clear the input field
        }
    }

    document.getElementById('submitEasterBunny').addEventListener('click', function() {
        var userInput = document.getElementById('easterBunnyInput').value.trim().toLowerCase();
        if (userInput === 'eggspert') {
            window.location.href = 'eggspert.html'; // Redirect to Eggspert page
        } else {
            document.getElementById('easterBunnyFeedback').textContent = 'That is not right; please try again.';
        }
    });

    document.getElementById('submitEggspert').addEventListener('click', function() {
        var userInput = document.getElementById('eggspertInput').value.trim();
        if (userInput === '30636') {
            // Redirect to the next page or show a success message
            alert('Congratulations! You have completed the Eggspert challenge!');
            // Example: window.location.href = 'nextpage.html';
        } else {
            document.getElementById('eggspertFeedback').textContent = 'That is not right; please try again.';
        }
    });

    document.getElementById('submitMysteryTrail').addEventListener('click', function() {
        var userInput = document.getElementById('mysteryTrailInput').value.trim().toLowerCase();
        if (userInput === 'easterbunny') {
            window.location.href = 'easterbunny.html'; // Redirect to the Easter Bunny page
        } else {
            document.getElementById('mysteryTrailFeedback').textContent = 'That is not right; please try again.';
        }
    });

    var revealEggBtn = document.getElementById('revealEggBtn');
    var eggImagesModal = document.getElementById('eggImagesModal');
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
    
    const openModalBtn = document.getElementById('openModal');
    if (openModalBtn) {
        openModalBtn.addEventListener('click', function() {
            const headerElement = document.getElementById('typewriterHeader');
            const bodyElement = document.getElementById('typewriterBody');
            const headerText = "🚨🐰 URGENT MESSAGE from the Easter Bunny 🐰🚨";
            const bodyText = "Attention all Easter Egg Hunters: This is an emergency notice from the Easter Bunny. The two keys to a precious treasure Easter Egg have gone missing! 🚨🗝️ Without these keys, we risk losing access to the most magical Easter treasure! We need your help to find the keys! 🕵️‍♀️🔍 Please search high and low, under every bush and behind every flower. Time is of the essence, as Easter draws near and the magic of the holiday depends on retrieving these keys. If you discover any clues or have any leads, please dispatch a message to me immediately. Together, we can save Easter and ensure a joyous celebration for all! Hop to it, my friends! The fate of Easter rests in your hands! With urgency and hope, The Easter Bunny 🐰";

            // Clear existing text before starting typewriter effect
            if (headerElement && bodyElement) {
                headerElement.innerHTML = '';
                bodyElement.innerHTML = '';
                setupTypewriter(headerElement, headerText, function() {
                    setupTypewriter(bodyElement, bodyText);
                });
            }
        });
    }
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

function setupTypewriter(element, text, callback = null) {
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
