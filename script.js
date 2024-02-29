document.addEventListener('DOMContentLoaded', function() {
    setupEggModal();
    setupModal();
    setupSecretImageAndConfetti();
    setupGrassAndKeysHoverEffect();
    setupEventListeners();
    setupTypewriterMessages();

    // Check for the egg canvas and set up page-specific features
    const canvas = document.getElementById('eggCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        drawEgg(ctx, canvas.width / 2, canvas.height / 2, 300, 450, '#FAF0E6');
        setupEggColorChange(canvas, ctx); // Function to change the egg's color
        setupStickers(canvas, ctx); // Function to handle sticker placement
        setupDrawingFeature(canvas, ctx); // Function to enable drawing on the egg
        const canvasArea = canvas.width * canvas.height;
        function updateCoverage() {
            const estimatedCoverage = (stickerCount * averageStickerCoverage) + (drawingLength * averageDrawingCoverage);
            const coveragePercentage = (estimatedCoverage / canvasArea) * 100;

            if (coveragePercentage >= 80) {
                // Display congratulations popup
                alert("Congratulations! You've decorated the special Easter EGG!");
            }
        }
    }
});

function setupDrawingFeature(canvas, ctx) {
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function draw(e) {
        if (!isDrawing) return;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function stopDrawing() {
        isDrawing = false;
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
}

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

function drawHeart(ctx, x, y, width, height, color) {
    ctx.save(); // Save the current state
    ctx.beginPath();
    const topCurveHeight = height * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    // Top left curve
    ctx.bezierCurveTo(
        x, y, 
        x - width / 2, y, 
        x - width / 2, y + topCurveHeight
    );

    // Bottom left curve
    ctx.bezierCurveTo(
        x - width / 2, y + (height + topCurveHeight) / 2, 
        x, y + (height + topCurveHeight) / 2, 
        x, y + height
    );

    // Bottom right curve
    ctx.bezierCurveTo(
        x, y + (height + topCurveHeight) / 2, 
        x + width / 2, y + (height + topCurveHeight) / 2, 
        x + width / 2, y + topCurveHeight
    );

    // Top right curve
    ctx.bezierCurveTo(
        x + width / 2, y, 
        x, y, 
        x, y + topCurveHeight
    );

    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore(); // Restore the original state
}

// When placing the heart, adjust the size appropriately
// Example: drawHeart(ctx, eggX, eggY, 30, 30, 'red');

let stickerCount = 0;
let drawingLength = 0;
const canvasArea = canvas.width * canvas.height;
const averageStickerCoverage = canvasArea * 0.01; // Assume each sticker covers 1% of the canvas
const averageDrawingCoverage = canvasArea * 0.0005; // Assume each unit length of drawing covers 0.05% of the canvas

function placeSticker(x, y, shape, color) {
    // Logic to place a sticker on the canvas at (x, y) with the given shape and color
    drawShape(ctx, shape, x, y, color); // Assume drawShape is a function that draws the sticker

    stickerCount++; // Increment the sticker count
    updateCoverage(); // Recalculate and update the coverage
}

function draw(e) {
    if (!isDrawing) return;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    // Calculate the length of the line drawn
    const dx = e.offsetX - lastX;
    const dy = e.offsetY - lastY;
    const length = Math.sqrt(dx * dx + dy * dy);

    drawingLength += length; // Add the length of the line to the total drawing length

    [lastX, lastY] = [e.offsetX, e.offsetY]; // Update lastX and lastY for the next line segment

    updateCoverage(); // Recalculate and update the coverage
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

function setupEggColorChange(canvas, ctx) {
    const colorSwatches = document.querySelectorAll('.color-swatch');
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            drawEgg(ctx, canvas.width / 2, canvas.height / 2, 300, 450, color); // Use updated size
        });
    });
}
    
    
function setupAnswerSubmissions(buttonId, correctAnswer, inputId, feedbackId) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.addEventListener('click', function() {
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

// Usage
setupAnswerSubmissions('submitAnswerEasterBunny', 'specialeasteregg', 'easterBunnyInput', 'easterBunnyFeedback');
setupAnswerSubmissions('submitAnswerMysteryTrail', 'easterbunny', 'mysteryTrailInput', 'mysteryTrailFeedback');
    
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
