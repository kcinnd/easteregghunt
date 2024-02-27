var btn = document.getElementById('openModal');
var modal = document.getElementById('urgentMessageModal');
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
};
span.onclick = function() {
  modal.style.display = "none";
};
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

document.getElementById('urgentModalCloseBtn').addEventListener('click', function() {
  
document.getElementById('urgentMessageModal').style.display = 'none';
});

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

// Secret image interaction
const secretImage = document.getElementById('secretImage');
const eggRevealModal = document.getElementById('eggRevealModal');
const closeModalBtn = document.querySelector('.egg-reveal-modal .close');

if (secretImage) {
  secretImage.addEventListener('mouseenter', function() {
    // Start confetti effect
    confetti({
      particleCount: 500,
      spread: 200,
      origin: { y: 0.6 }
    });
    // Wait for two seconds, then display the popup
    setTimeout(() => {
      eggRevealModal.style.display = 'block';
    }, 2000); 
  });
} else {
  console.log('Secret image element not found');
}

// Close button for the egg reveal modal
const closeModal = document.querySelector('.egg-reveal-modal .close');
if (closeModal) {
  closeModal.addEventListener('click', function() {
    document.getElementById('eggRevealModal').style.display = 'none'; // Hide the modal when close button is clicked
  });
}

function applyColorToEgg(color) {
  const egg = document.getElementById('egg');
  if (egg) egg.style.backgroundColor = color;
  else console.error('Egg element not found!');
}

function addStickerToEgg(src) {
  const egg = document.getElementById('egg');
  if (egg) {
    const stickerImg = document.createElement('img');
    stickerImg.src = src;
    stickerImg.className = 'sticker';
    egg.appendChild(stickerImg);
  } else {
    console.error('Egg element not found!');
  }
}

// Event listeners setup
function setupEventListeners() {
  document.getElementById('revealEggBtn').addEventListener('click', showNewEgg);
  document.getElementById('startHuntButton').addEventListener('click', startHunt);
  document.querySelectorAll('button[onclick="checkWord()"]').forEach(button => {
    button.addEventListener('click', checkWord);
  });
  document.getElementById('submitAnswer').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value;
    console.log(userInput); // Process the user input here
  });
}

// Feature initialization functions
function setupModal() {
  const modal = document.getElementById('urgentMessageModal');
  document.getElementById('openModal').onclick = () => modal.style.display = "block";
  document.getElementsByClassName("close")[0].onclick = () => modal.style.display = "none";
  window.onclick = event => event.target === modal ? modal.style.display = "none" : null;
}

function setupSpecialTrigger() {
  const specialTrigger = document.getElementById('specialTrigger');
  if (specialTrigger) {
    specialTrigger.addEventListener('mouseenter', () => confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 }
    }));
  } else {
    console.log('specialTrigger element not found');
  }
}
function setupColorPalette() {
  const colorPalette = document.getElementById('colorPalette');
  ['#CDF4F8', '#D1CCEC', '#FED3D9', '#FDF0D7', '#C4EBD5'].forEach(color => {
    const colorSwatch = document.createElement('button');
    colorSwatch.style.backgroundColor = color;
    colorSwatch.className = 'color-button';
    colorSwatch.onclick = () => applyColorToEgg(color);
    colorPalette.appendChild(colorSwatch);
  });
}

function setupStickers() {
  const stickerContainer = document.getElementById('stickerContainer');
  [
    'https://i.imgur.com/9a87llh.png?1',
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
  ].forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'sticker';
    img.onclick = () => addStickerToEgg(src);
    stickerContainer.appendChild(img);
  });
}

function placeKeysRandomly() {
  keyImages.forEach(src => {
    const keyImg = document.createElement('img');
    keyImg.src = src;
    keyImg.className = 'key-img';
    keyImg.style.position = 'absolute';
    keyImg.style.width = '150px';
    document.body.appendChild(keyImg);
    placeKeyRandomly(keyImg, '.grass-img, .key-img, .logo, #container'); // Adjust to avoid overlapping
  });
}

// Main setup function
function setupPage() {
  setupModal();
  setupSpecialTrigger();
  setupColorPalette();
  setupStickers();
  setupEventListeners();
  placeKeysRandomly(); // Replace setupAdditionalImages with this
}

// Function to check overlap
function checkOverlap(element1, element2) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

// Function to place keys randomly but avoid overlapping with specified elements
function placeKeyRandomly(keyImg, avoidElementsClass) {
  let placed = false;
  const maxAttempts = 50;
  let attempts = 0;

  while (!placed && attempts < maxAttempts) {
    const x = Math.random() * (window.innerWidth - keyImg.offsetWidth);
    const y = Math.random() * (window.innerHeight - keyImg.offsetHeight);

    keyImg.style.left = `${x}px`;
    keyImg.style.top = `${y}px`;

    let overlapping = false;
    document.querySelectorAll(avoidElementsClass).forEach(element => {
      if (checkOverlap(keyImg, element)) {
        overlapping = true;
      }
    });

    if (!overlapping) {
      placed = true;
    }

    attempts++;
  }

  if (!placed) {
    console.error("Couldn't place key without overlapping after max attempts");
  }
}

// Function to set up grass and keys with hover functionality
function setupGrassAndKeysHoverEffect() {
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

  // Append grass images to the easter-bunny-grass div
  const grassContainer = document.querySelector('.easter-bunny-grass');
  grassImages.forEach((src, index) => {
    const grassImg = document.createElement('img');
    grassImg.src = src;
    grassImg.className = 'grass-img';
    grassImg.id = `grass${index + 1}`;
    grassContainer.appendChild(grassImg);
  });

  // Append key images to the body and initially hide them
  keyImages.forEach((src, index) => {
    const keyImg = document.createElement('img');
    keyImg.src = src;
    keyImg.className = 'key-img';
    keyImg.id = `key${index + 1}`;
    keyImg.style.position = 'absolute';
    keyImg.style.display = 'none'; // Initially hidden
    document.body.appendChild(keyImg);
    placeKeyRandomly(keyImg, '.grass-img, .key-img, .logo, #container'); // Avoid overlapping with grass, other keys, logo, and container
  });

  // Add hover effect to grass images to show corresponding key image
  grassImages.forEach((_, index) => {
    const grassImg = document.getElementById(`grass${index + 1}`);
    grassImg.addEventListener('mouseenter', () => {
      const keyImg = document.getElementById(`key${index + 1}`);
      keyImg.style.display = 'block'; // Show the key on hover
    });
  });
}

document.addEventListener('DOMContentLoaded', setupGrassAndKeysHoverEffect);

// Additional or game-specific functions
function showNewEgg() {
  document.getElementById('newEgg').style.display = 'block';
  document.querySelector('.egg-container').style.display = 'flex';
  document.getElementById('eggRevealModal').style.display = 'none';
}

function startHunt() {
  window.location.href = 'page1.html';
}

function checkWord() {
  const userInput = document.getElementById('userInput').value;
  const feedback = document.getElementById('feedback');
  feedback.textContent = userInput.toLowerCase() === 'easterbunny' ? 'Correct! You unraveled the clue.' : 'Hmm, that does not seem right. Try pondering a bit more.';
}

document.querySelectorAll('.easter-bunny-grass .grass-img').forEach((grass, index) => {
    grass.addEventListener('mouseenter', () => {
      const keyImg = document.createElement('img');
      keyImg.src = keyImageURLs[index % keyImageURLs.length]; // Cycle through key images
      keyImg.className = 'key-img'; // Ensure this class is styled appropriately
      keyImg.style.position = 'absolute';
      document.body.appendChild(keyImg);
      placeKeyRandomly(keyImg, '.grass-img, .key-img, .logo, #container'); // Adjust selector as needed
    });
});


document.addEventListener('DOMContentLoaded', function() {
  setupPage();
  setupGrassAndKeysHoverEffect(); // Call this function here to ensure it's executed after the DOM is fully loaded
});
