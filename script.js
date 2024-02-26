document.querySelectorAll('.color-button').forEach(btn => {
  btn.addEventListener('click', function() {
    const color = this.getAttribute('data-color');
    // Set this color as the current paint color
  });
});

const colors = ['#CDF4F8', '#D1CCEC', '#FED3D9', '#FDF0D7', '#C4EBD5'];
const colorPalette = document.getElementById('colorPalette');

colors.forEach(color => {
  const colorSwatch = document.createElement('button');
  colorSwatch.style.backgroundColor = color;
  colorSwatch.className = 'color-button'; // Assign a class for styling if needed
  colorPalette.appendChild(colorSwatch);

  colorSwatch.addEventListener('click', () => {
    applyColorToEgg(color);
  });
});

function applyColorToEgg(color) {
  const egg = document.getElementById('egg');
  egg.style.backgroundColor = color;
}

function startHunt() {
  window.location.href = 'page1.html'; // Redirects to the first puzzle page
}

function setupModal() {
  const modal = document.getElementById('urgentMessageModal');
  const btn = document.getElementById('openModal');
  const span = document.querySelector('.close');

  btn.addEventListener('click', () => modal.style.display = 'block');
  span.addEventListener('click', () => modal.style.display = 'none');

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

function setupSpecialTrigger() {
  const specialTrigger = document.getElementById('specialTrigger');
  specialTrigger.addEventListener('mouseenter', () => {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 }
    });
  });
}

function showNewEgg() {
  const newEgg = document.getElementById('newEgg');
  newEgg.style.display = 'block';
  document.querySelector('.egg-container').style.display = 'flex';
  document.getElementById('eggRevealModal').style.display = 'none';
}

function setupEventListeners() {
  document.getElementById('revealEggBtn')?.addEventListener('click', showNewEgg);
  document.getElementById('startHuntButton')?.addEventListener('click', startHunt);
  document.querySelector('button')?.addEventListener('click', checkWord);
}

// Main function to set up the page functionalities
function setupPage() {
  setupModal();
  setupSpecialTrigger();
  setupEventListeners();
  setupAdditionalImages();
  revealKeysOnHover();
  handlePageNavigation();
}

document.addEventListener('DOMContentLoaded', setupPage);

function handlePageNavigation() {
  var hiddenMessage = document.getElementById('hiddenMessage');
  if (hiddenMessage) {
    hiddenMessage.onclick = function() {
      window.location.href = 'mysteryTrail.html';
    };
  }

  var submitButton = document.querySelector('button');
  if (submitButton && window.location.href.includes('mysteryTrail.html')) {
    submitButton.addEventListener('click', checkWord);
  }
}

// Function to check the user's input against the correct answer on Page 3
function checkWord() {
  var userInput = document.getElementById('userInput').value;
  var feedback = document.getElementById('feedback');

  if (userInput.toLowerCase() === 'easterbunny') {
    feedback.textContent = 'Correct! You unraveled the clue.';
  } else {
    feedback.textContent = 'Hmm, that does not seem right. Try pondering a bit more.';
  }
}

// Hover over bottom images to reveal keys
function revealKeysOnHover() {
  document.querySelectorAll('.bottom-img').forEach((img, index) => {
    img.addEventListener('mouseenter', () => {
      const keyImage = document.createElement('img');
      keyImage.src = `path/to/keyImage${index + 1}.png`; // Ensure the path is correct
      keyImage.style.position = 'absolute';
      keyImage.style.width = '150px';
      document.body.appendChild(keyImage);

      placeKeyRandomly(keyImage);
    });
  });
}

function setupAdditionalImages() {
  const newImages = [
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
  ];

  keyImages.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.style.width = '150px'; // Setting the width to 150px as requested
    img.style.position = 'absolute';
    document.body.appendChild(img);

    placeRandomly(img);
  });
}
  
  newImages.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.style.width = '20px'; // Set the new images width
    img.style.position = 'absolute';
    img.classList.add('random-img'); // Use this class for additional styling if needed
    document.body.appendChild(img);

    placeRandomly(img); // Function to place images randomly

    // Hover effect to add a key
    img.addEventListener('mouseenter', () => {
      const keyImage = document.createElement('img');
      keyImage.src = `path/to/randomKey${index + 1}.png`; // Adjust the path to your key images
      keyImage.style.position = 'absolute';
      keyImage.style.width = '150px'; // Set key image width
      document.body.appendChild(keyImage);

      placeRandomly(keyImage); // Reuse the function to place keys randomly
    });
  });
}

// Function to place elements randomly without overlapping important elements
function placeRandomly(element) {
  let overlap;
  do {
    element.style.left = `${Math.random() * (window.innerWidth - element.offsetWidth)}px`;
    element.style.top = `${Math.random() * (window.innerHeight - element.offsetHeight)}px`;
    overlap = checkOverlap(element);
  } while (overlap);
}

// Function to check for overlap with container and bottom images
function checkOverlap(element) {
  const rect = element.getBoundingClientRect();
  const containerRect = document.querySelector('.container').getBoundingClientRect();
  const bottomImagesRect = document.querySelector('.image-border').getBoundingClientRect();

  // Check for overlap with the container and bottom images
  if (!(rect.right < containerRect.left || rect.left > containerRect.right ||
      rect.bottom < containerRect.top || rect.top > containerRect.bottom) ||
    rect.bottom > bottomImagesRect.top) {
    return true;
  }

  // Check for proximity to page edges
  if (rect.left < 10 || rect.top < 10 || window.innerWidth - rect.right < 10 || window.innerHeight - rect.bottom < 10) {
    return true;
  }

  return false;
}

function setupStickers() {
  document.querySelectorAll('.sticker').forEach(sticker => {
    sticker.addEventListener('click', function() {
      addStickerToEgg(this.getAttribute('src'));
    });
  });
}

function addStickerToEgg(src) {
  const egg = document.getElementById('egg');
  const stickerImg = document.createElement('img');
  stickerImg.src = src;
  stickerImg.style.height = '20px'; // Full size for the sticker on the egg
  egg.appendChild(stickerImg);
}

// Call setupStickers in setupPage
function setupPage() {
  // Previous setup functions
  setupStickers(); // Initialize stickers functionality
}

function setupColorPalette() {
  const colors = ['#CDF4F8', '#D1CCEC', '#FED3D9', '#FDF0D7', '#C4EBD5'];
  const colorPalette = document.getElementById('colorPalette');

  colors.forEach(color => {
    const colorSwatch = document.createElement('div');
    colorSwatch.style.backgroundColor = color;
    colorSwatch.className = 'color-swatch';
    colorPalette.appendChild(colorSwatch);

    colorSwatch.addEventListener('click', () => applyColorToEgg(color));
  });
}

function applyColorToEgg(color) {
  console.log(`Applying color ${color} to the egg`); // Replace with actual implementation
}

const stickers = [
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
];

const stickerContainer = document.getElementById('stickerContainer'); // A div to hold stickers

stickers.forEach(src => {
  const img = document.createElement('img');
  img.src = src;
  img.className = 'sticker'; // Assign a class for styling
  img.style.width = '50px'; // Smaller size for the sticker palette
  stickerContainer.appendChild(img);

  img.addEventListener('click', () => {
    addStickerToEgg(src);
  });
});
