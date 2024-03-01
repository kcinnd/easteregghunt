document.addEventListener('DOMContentLoaded', function() {
    setupEggModal();
    setupModal();
    setupSecretImageAndConfetti();
    setupGrassAndKeysHoverEffect();
    setupEventListeners();
    setupTypewriterMessages();
    setupStickerSwatches();
    setupDrawing(canvas, ctx);
    setupModeToggle(canvas, ctx);

    const canvas = document.getElementById('eggCanvas');

    if (canvas) {
        const canvas = document.getElementById('eggCanvas');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                drawEgg(ctx, canvas.width / 2, canvas.height / 2, 300, 450, '#FAF0E6'); // Draw the initial egg
                setupEggColorSwatches(); // Set up color swatches for the egg
                setupStickers(canvas, ctx);
                setupDrawingFeature(canvas, ctx);
            }
        };
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;
        let drawingColor = '#000000';
        let currentColor = '#FAF0E6', currentDrawColor = '#000', decoratedArea = 0;
        const eggColors = ['f9ceee', 'e0cdff', 'c0f0fb', 'ddf9a8'];
        const drawColors = ['68FFB9', 'F298F4', '9386E6', '75ECFB'];
        let stickerMode = false;
        let selectedSticker = null;

    // Draw the initial egg
        function drawEgg() {
            ctx.fillStyle = currentColor;
            ctx.beginPath();
            ctx.ellipse(canvas.width / 2, canvas.height / 2, 200, 300, 0, 0, 2 * Math.PI);
            ctx.fill();
        }
    
        // Change egg base color
        function setupEggColorSwatches() {
            document.querySelectorAll('.color-swatch').forEach(swatch => {
                swatch.addEventListener('click', function() {
                    const color = this.getAttribute('data-color');
                    changeEggColor(color);
                });
            });
        }
        
        function changeEggColor(color) {
            ctx.fillStyle = color;
            // Assuming drawEgg is a function that draws the egg
            drawEgg(ctx, canvas.width / 2, canvas.height / 2, 200, 300); // Adjust size as needed
        }

        function draw(e) {
            if (!isDrawing || mode !== 'drawing') return;
            
            ctx.strokeStyle = currentDrawColor;
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            [lastX, lastY] = [e.offsetX, e.offsetY];
            // Increment decorated area per draw action (simplified for demonstration)
            decoratedArea += 0.1; // Assume each draw action covers 0.1%
            checkDecorationCoverage();
        }

        function setupDrawing(canvas, ctx) {
            canvas.addEventListener('mousedown', (e) => {
                isDrawing = true;
                [lastX, lastY] = [e.offsetX, e.offsetY];
            });
        
            canvas.addEventListener('mousemove', (e) => {
                if (!isDrawing) return;
                ctx.strokeStyle = drawingColor;
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
                [lastX, lastY] = [e.offsetX, e.offsetY];
            });
        
            canvas.addEventListener('mouseup', () => isDrawing = false);
            canvas.addEventListener('mouseout', () => isDrawing = false);
        
            // Setup drawing color swatches
            document.querySelectorAll('.drawColor').forEach(swatch => {
                swatch.addEventListener('click', function() {
                    drawingColor = this.getAttribute('data-color');
                });
            });
        }

        function setupStickerSwatches() {
            document.querySelectorAll('.sticker-swatch').forEach(swatch => {
                swatch.addEventListener('click', function() {
                    const shape = this.getAttribute('data-shape');
                    selectSticker(shape);
                    document.body.style.cursor = 'crosshair'; // Or use a custom cursor
                });
            });
        }

        canvas.addEventListener('click', function(e) {
            if (mode !== 'sticker') return;
        
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
        
            placeSticker(selectedSticker, x, y);
        });

        function selectSticker(shape) {
            selectedSticker.shape = shape;
            stickerMode = true;
        }
    
        function placeSticker(shape, x, y) {
            ctx.fillStyle = currentDrawColor;
        
            if (shape === 'circle') {
                ctx.beginPath();
                ctx.arc(x, y, 20, 0, Math.PI * 2);
                ctx.fill();
            } else if (shape === 'heart') {
                drawHeart(x, y);
            } else if (shape === 'star') {
                drawStar(x, y, 5, 20, 10);
            }
        
            // Increment decorated area (simplified for demonstration)
            decoratedArea += 5; // Assume each sticker covers 5% for simplicity
            checkDecorationCoverage();
        }
        
        function drawHeart(x, y) {
            ctx.beginPath();
            const width = 20;
            const height = 20;
            ctx.moveTo(x, y + height / 4);
            ctx.quadraticCurveTo(x, y, x + width / 4, y);
            ctx.quadraticCurveTo(x + width / 2, y - height / 2, x + width / 2, y + height / 4);
            ctx.quadraticCurveTo(x + width / 2, y - height / 2, x + width * 3/4, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + height / 4);
            ctx.quadraticCurveTo(x + width, y + height, x + width / 2, y + height * 3/4);
            ctx.quadraticCurveTo(x, y + height, x, y + height / 4);
            ctx.fill();
        }
        
        function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
            var rot = Math.PI / 2 * 3;
            var x = cx;
            var y = cy;
            var step = Math.PI / spikes;
        
            ctx.beginPath();
            ctx.moveTo(cx, cy - outerRadius)
            for (i = 0; i < spikes; i++) {
                x = cx + Math.cos(rot) * outerRadius;
                y = cy + Math.sin(rot) * outerRadius;
                ctx.lineTo(x, y)
                rot += step
        
                x = cx + Math.cos(rot) * innerRadius;
                y = cy + Math.sin(rot) * innerRadius;
                ctx.lineTo(x, y)
                rot += step
            }
            ctx.lineTo(cx, cy - outerRadius);
            ctx.closePath();
            ctx.fill();
        } 

        let mode = 'drawing'; // Default mode

        function setupModeToggle(canvas, ctx) {
            const toggleButton = document.getElementById('toggleMode');
            toggleButton.addEventListener('click', () => {
                if (mode === 'drawing') {
                    mode = 'sticker';
                    toggleButton.textContent = 'Switch to Drawing Mode';
                    canvas.style.cursor = 'default'; // Change cursor to default when in sticker mode
                } else {
                    mode = 'drawing';
                    toggleButton.textContent = 'Switch to Sticker Mode';
                    canvas.style.cursor = 'crosshair'; // Change cursor to crosshair when in drawing mode
                }
            });
        }
    
        function checkDecorationCoverage() {
            if (decoratedArea >= 80) {
                alert('Congratulations on decorating your egg! The Easter Bunny is grateful and wants you to know eastershiddenkeys.');
                decoratedArea = 0; // Reset for next decoration session
            }
        }
    
        // Setup color swatches
        eggColors.forEach(color => {
            const swatch = document.createElement('div');
            swatch.className = 'swatch';
            swatch.style.backgroundColor = `#${color}`;
            swatch.addEventListener('click', () => changeEggColor(color));
            document.getElementById('colorSwatches').appendChild(swatch);
        });
    
        // Setup sticker buttons (simplified example)
        ['circle', 'heart', 'star'].forEach(shape => {
            const button = document.createElement('button');
            button.innerText = shape;
            button.addEventListener('click', () => placeSticker(shape));
            document.getElementById('stickerSwatches').appendChild(button);
        });

        canvas.addEventListener('click', function(e) {
            if (stickerMode) {
                // Calculate the correct x and y based on the canvas position and click position
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

        // Place the selected sticker
        placeSticker(selectedSticker, x, y);

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
