document.addEventListener('DOMContentLoaded', function() {
    setupModal();
    setupSecretImageAndConfetti();
    setupEggCustomization();
    setupGrassAndKeysHoverEffect();
    setupEventListeners();
});

function setupModal() {
    var btn = document.getElementById('openModal');
    var modal = document.getElementById('urgentMessageModal');
    var spans = document.getElementsByClassName("close");

    if (btn) {
        btn.onclick = function() {
            if (modal) modal.style.display = "block";
        };
    }

    Array.from(spans).forEach(span => {
        span.onclick = function() {
            if (modal) modal.style.display = "none";
        };
    });

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

function setupSecretImageAndConfetti() {
    const secretImage = document.getElementById('secretImage');
    const eggRevealModal = document.getElementById('eggRevealModal');

    if (secretImage) {
        secretImage.addEventListener('mouseenter', function() {
            confetti({
                particleCount: 500,
                spread: 200,
                origin: { y: 0.6 }
            });
            setTimeout(() => {
                if (eggRevealModal) eggRevealModal.style.display = 'block';
            }, 2000);
        });
    }

    if (eggRevealModal) {
        const closeModal = eggRevealModal.querySelector('.close');
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                eggRevealModal.style.display = 'none';
            });
        }
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

document.addEventListener('DOMContentLoaded', function() {
    setupModal();
    setupSecretImageAndConfetti();
    setupEggCustomization();
    setupGrassAndKeysHoverEffect();
    setupEventListeners();
});

function setupModal() {
    const btn = document.getElementById('openModal');
    const modal = document.getElementById('urgentMessageModal');
    const spans = document.getElementsByClassName("close");

    if (btn && modal) {
        btn.onclick = () => modal.style.display = "block";
        Array.from(spans).forEach(span => {
            span.onclick = () => modal.style.display = "none";
        });
        window.onclick = event => {
            if (event.target === modal) modal.style.display = "none";
        };
    }
}

function setupSecretImageAndConfetti() {
    const secretImage = document.getElementById('secretImage');
    const eggRevealModal = document.getElementById('eggRevealModal');

    if (secretImage && eggRevealModal) {
        secretImage.addEventListener('mouseenter', () => {
            confetti({ particleCount: 500, spread: 200, origin: { y: 0.6 } });
            setTimeout(() => eggRevealModal.style.display = 'block', 2000);
        });

        const closeModal = eggRevealModal.querySelector('.close');
        if (closeModal) {
            closeModal.addEventListener('click', () => eggRevealModal.style.display = 'none');
        }
    }
}

function setupEggCustomization() {
    const egg = document.getElementById('egg');
    const colorPalette = document.getElementById('colorPalette');
    const stickerContainer = document.getElementById('stickerContainer');

    if (egg && colorPalette && stickerContainer) {
        ['#CDF4F8', '#D1CCEC', '#FED3D9', '#FDF0D7', '#C4EBD5'].forEach(color => {
            const colorSwatch = document.createElement('button');
            colorSwatch.style.backgroundColor = color;
            colorSwatch.className = 'color-button';
            colorSwatch.onclick = () => egg.style.backgroundColor = color;
            colorPalette.appendChild(colorSwatch);
        });

        const stickerSources = 
            ['https://i.imgur.com/9a87llh.png?1',
            'https://i.imgur.com/Cx5sW4T.png?1',
            'https://i.imgur.com/Sppxziz.png',
            'https://i.imgur.com/xgWycmI.png',
            'https://i.imgur.com/xkm6yV7.png',
            'https://i.imgur.com/tEW10f7.png',
            'https://i.imgur.com/HcTyCd7.png',
            'https://i.imgur.com/tURKwGZ.png',
            'https://i.imgur.com/P6If7vu.png',
            'https://i.imgur.com/yDVaMFM.png',
            'https://i.imgur.com/xtNwn5Q.png',
            'https://i.imgur.com/4OYvyjf.png',
            'https://i.imgur.com/61J8Ydt.png',
            'https://i.imgur.com/q6c11A9.png',
            'https://i.imgur.com/pbUBsZf.png',
            'https://i.imgur.com/ymXcQbo.png'
             ];
         stickerSources.forEach(src => {
            const stickerImg = document.createElement('img');
            stickerImg.src = src;
            stickerImg.className = 'sticker';
            stickerImg.onclick = () => {
                const img = document.createElement('img');
                img.src = src;
                img.className = 'sticker';
                egg.appendChild(img);
            };
            stickerContainer.appendChild(stickerImg);
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
    document.getElementById('revealEggBtn').addEventListener('click', showNewEgg);
    document.getElementById('startHuntButton').addEventListener('click', startHunt);
    document.querySelectorAll('button[onclick="checkWord()"]').forEach(button => button.addEventListener('click', checkWord));
    document.getElementById('submitAnswer').addEventListener('click', () => {
        const userInput = document.getElementById('userInput')?.value;
        console.log(userInput); // Process the user input here
    });
}

// Additional or game-specific functions
function showNewEgg() {
    document.getElementById('newEgg').style.display = 'block';
    document.querySelector('.egg-container').style.display = 'flex';
    document.getElementById('eggRevealModal').style.display = 'none';
    document.getElementById('revealEggBtn').addEventListener('click', showNewEgg);
}

function startHunt() {
    window.location.href = 'page1.html';
}

function checkWord() {
    const userInput = document.getElementById('userInput').value;
    const feedback = document.getElementById('feedback');
    if (userInput === 'easterbunny') {
            // If the answer is correct
            feedback.textContent = 'Correct! You found the secret word.';
            // You can add any action here, like revealing more content or redirecting to another page
    } else {
            // If the answer is incorrect
            feedback.textContent = 'Hmm, that doesn’t seem right. Try again!';
    }
}
