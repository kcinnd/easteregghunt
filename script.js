document.addEventListener('DOMContentLoaded', function() {
    setupEggModal();
    setupModal();
    setupSecretImageAndConfetti();
    setupGrassAndKeysHoverEffect();
    setupEventListeners();
    setupColorSwatches();
    setupTypewriterMessages();
    setupAnswerSubmissions();

    // Check for the egg canvas and set up page-specific features
    const canvas = document.getElementById('eggCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        setupEggPageSpecifics(canvas);
        setupStickers(canvas, ctx);
        setupDrawingFeature(canvas, ctx); // Initialize the drawing feature here
    }
});

function setupDrawingFeature(canvas, ctx) {
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    canvas.addEventListener('mousedown', (e) => startDrawing(e, ctx, lastX, lastY, isDrawing));
    canvas.addEventListener('mousemove', (e) => draw(e, ctx, lastX, lastY, isDrawing));
    canvas.addEventListener('mouseup', () => stopDrawing(isDrawing));
    canvas.addEventListener('mouseleave', () => stopDrawing(isDrawing));
}

function startDrawing(e, ctx, lastX, lastY, isDrawing) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e, ctx, lastX, lastY, isDrawing) {
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopDrawing(isDrawing) {
    isDrawing = false;
}

function setupEggPageSpecifics(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Unable to get canvas context!');
        return;
    }

    // Increase the size of the egg by adjusting these values
    drawEgg(ctx, canvas.width / 2, canvas.height / 2, 300, 450, '#FAF0E6'); // Tripled size

    // Setup for color swatches and stickers only if on the Easter egg page
    setupColorSwatches(canvas, ctx);
    setupStickers(canvas, ctx); // Make sure to define this function if it involves canvas
}

let currentSticker = { shape: 'circle', color: '#000000' }; // Default shape and color

function setupStickers(canvas, ctx) {
    // Sticker shape selection
    document.querySelectorAll('.sticker-preview').forEach(preview => {
        preview.addEventListener('click', function() {
            currentSticker.shape = this.dataset.shape;
            // Update cursor to indicate selected sticker shape
            canvas.style.cursor = `url('path/to/${currentSticker.shape}-cursor.png'), auto`; // You'll need cursor images for each shape
        });
    });

    // Sticker color selection
    document.querySelectorAll('.color-swatch-sticker').forEach(swatch => {
        swatch.addEventListener('click', function() {
            currentSticker.color = this.dataset.color;
        });
    });

    // Placing the sticker on the canvas
    canvas.addEventListener('click', function(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        drawShape(ctx, currentSticker.shape, x, y, currentSticker.color);
    });
}

function drawEgg(ctx, x, y, width, height, color) {
    ctx.beginPath();
    ctx.ellipse(x, y, width / 2, height / 2, 0, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawShape(ctx, shape, x, y, color) {
    switch (shape) {
        case 'circle':
            drawCircle(ctx, x, y, color);
            break;
        case 'star':
            drawStar(ctx, x, y, color);
            break;
        case 'heart':
            drawHeart(ctx, x, y, color);
            break;
        // Add more cases for other shapes
    }
}

function drawCircle(ctx, x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI); // 10 is the radius of the circle
    ctx.fillStyle = color;
    ctx.fill();
}

function drawStar(ctx, x, y, color, spikes = 5, outerRadius = 10, innerRadius = 5) {
    ctx.beginPath();
    ctx.moveTo(x, y - outerRadius);

    for (let i = 0; i < spikes; i++) {
        ctx.lineTo(x + outerRadius * Math.cos((i * 2 * Math.PI) / spikes - Math.PI / 2), 
                   y + outerRadius * Math.sin((i * 2 * Math.PI) / spikes - Math.PI / 2));
        ctx.lineTo(x + innerRadius * Math.cos(((i + 0.5) * 2 * Math.PI) / spikes - Math.PI / 2), 
                   y + innerRadius * Math.sin(((i + 0.5) * 2 * Math.PI) / spikes - Math.PI / 2));
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

function drawHeart(ctx, x, y, color) {
    ctx.beginPath();
    const topCurveHeight = 10;
    ctx.moveTo(x, y + topCurveHeight);
    // Top left curve
    ctx.bezierCurveTo(
        x - 20, y + topCurveHeight - 20,
        x - 20, y + topCurveHeight + 45 - 20,
        x, y + topCurveHeight + 45
    );
    // Top right curve
    ctx.bezierCurveTo(
        x + 20, y + topCurveHeight + 45 - 20,
        x + 20, y + topCurveHeight - 20,
        x, y + topCurveHeight
    );
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

let stickerCount = 0;
let drawingLength = 0;
const canvasArea = canvas.width * canvas.height;
const averageStickerCoverage = canvasArea * 0.01; // Assume each sticker covers 1% of the canvas
const averageDrawingCoverage = canvasArea * 0.0005; // Assume each unit length of drawing covers 0.05% of the canvas

function updateCoverage() {
    const estimatedCoverage = (stickerCount * averageStickerCoverage) + (drawingLength * averageDrawingCoverage);
    const coveragePercentage = (estimatedCoverage / canvasArea) * 100;

    if (coveragePercentage >= 80) {
        // Display congratulations popup
        alert("Congratulations! You've decorated the special Easter EGG! The Easter Bunny is grateful and wants you to know the word secrethiddenkeys.");
        // Reset or disable further actions if necessary
    }
}

// Call updateCoverage() each time a sticker is placed or drawing is done
// For stickers:
function placeSticker() {
    // Sticker placement logic...
    stickerCount += 1;
    updateCoverage();
}

// For drawings, you'll need to calculate the length of each stroke
// This is a simplified example; actual implementation will vary
function drawStroke(startX, startY, endX, endY) {
    // Drawing logic...
    const strokeLength = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    drawingLength += strokeLength;
    updateCoverage();
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

function setupColorSwatches(canvas, ctx) {
    const colorSwatches = document.querySelectorAll('.color-swatch');
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            drawEgg(ctx, canvas.width / 2, canvas.height / 2, 300, 450, color); // Use updated size
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
