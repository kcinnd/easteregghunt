document.addEventListener('DOMContentLoaded', function() {
    setupEggModal();
    setupModal();
    setupSecretImageAndConfetti();
    setupEventListeners();
    setupTypewriterMessages();
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

function setupTypewriter(element, text, callback) {
    let cursorPosition = 0;
    let typeSpeed = 75;

    function type() {
        if (cursorPosition < text.length) {
            element.innerHTML += text.charAt(cursorPosition);
            cursorPosition++;
            setTimeout(type, typeSpeed);
        } else if (typeof callback === 'function') {
            callback();
        }
    }

    type();
}
