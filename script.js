document.querySelectorAll('.color-swatch').forEach(swatch => {
  swatch.addEventListener('click', function() {
    const color = this.style.backgroundColor;
    applyColorToEgg(color);
  });
});

const colors = ['#CDF4F8', '#D1CCEC', '#FED3D9', '#FDF0D7', '#C4EBD5'];
const colorPalette = document.getElementById('colorPalette');

colors.forEach(color => {
  const colorSwatch = document.createElement('button');
  colorSwatch.style.backgroundColor = color;
  colorSwatch.className = 'color-button';
  colorPalette.appendChild(colorSwatch);

  colorSwatch.addEventListener('click', () => {
    applyColorToEgg(color);
  });
});

function applyColorToEgg(color) {
  const egg = document.getElementById('egg'); // Make sure there's an element with id="egg"
  if (egg) {
    egg.style.backgroundColor = color;
  } else {
    console.error('Egg element not found!');
  }
}

function startHunt() {
  window.location.href = 'page1.html'; // Redirects to the first puzzle page
}

function setupModal() {
  const modal = document.getElementById('urgentMessageModal');
  const btn = document.getElementById('openModal');
  const span = document.querySelector('.close');

  btn.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  span.addEventListener('click', () => {
    modal.style.display = 'none';
  });

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
  setupGrassAndImagesHoverEffect();;
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

function showKeyRandomlyOnPage(keyIndex) {
  const keyImages = [
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

  const keyImg = document.createElement('img');
  keyImg.src = keyImageSources[keyIndex];
  keyImg.style.width = '150px';
  keyImg.style.position = 'absolute';
  keyImg.style.zIndex = '10';

  // Randomly position the key, ensuring it doesn't overlap with other elements
  let overlap;
  do {
    keyImg.style.left = `${Math.random() * (window.innerWidth - keyImg.offsetWidth)}px`;
    keyImg.style.top = `${Math.random() * (window.innerHeight - keyImg.offsetHeight)}px`;
    overlap = checkOverlap(keyImg);
  } while (overlap);

  document.body.appendChild(keyImg);
  
document.addEventListener('DOMContentLoaded', () => {
  setupModal();
  setupSpecialTrigger();
  setupEventListeners();
  setupStickers();
  revealKeysOnHover();
});

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
  
  newImages.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.style.width = '150px'; // Setting the width to 150px as requested
    img.style.position = 'absolute';
    document.body.appendChild(img);

    placeRandomly(img);
  });
}

    // Hover effect to add a key
    img.addEventListener('mouseenter', () => {
      const keyImage = document.createElement('img');
      keyImage.src = `path/to/randomKey${index + 1}.png`; // Adjust the path to your key images
      keyImage.style.position = 'absolute';
      keyImage.style.width = '150px'; // Set key image width
      document.body.appendChild(keyImage);

      placeRandomly(keyImage); // Reuse the function to place keys randomly
    });
  };

// Function to place elements randomly without overlapping important elements
function placeRandomly(element) {
  let overlap;
  do {
    element.style.left = `${Math.random() * (window.innerWidth - element.offsetWidth)}px`;
    element.style.top = `${Math.random() * (window.innerHeight - element.offsetHeight)}px`;
    overlap = checkOverlap(element);
  } while (overlap);
}

function checkOverlap(element) {
  // Get the bounding rectangle of the element to be checked
  const rect = element.getBoundingClientRect();

  // Select all elements that the key image shouldn't overlap with
  const elementsToCheck = document.querySelectorAll('.container, .grass-img, .random-img, .key-img'); // Add more selectors as needed

  // Iterate over each element to check for overlap
  for (const el of elementsToCheck) {
    const elRect = el.getBoundingClientRect();

    // Check if the rectangles overlap
    const isOverlapping = !(rect.right < elRect.left || 
                             rect.left > elRect.right || 
                             rect.bottom < elRect.top || 
                             rect.top > elRect.bottom);

    if (isOverlapping) {
      return true; // Overlap found, return true
    }
  }

  // No overlaps found, return false
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

document.addEventListener('DOMContentLoaded', function() {
  setupColorPalette();
  // Call other setup functions here
});

function setupColorPalette() {
  const colors = ['#CDF4F8', '#D1CCEC', '#FED3D9', '#FDF0D7', '#C4EBD5'];
  const colorPalette = document.getElementById('colorPalette');

  if (!colorPalette) {
    console.error('colorPalette element not found!');
    return;
  }

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

document.addEventListener('DOMContentLoaded', function() {
  setupGrassAndImagesHoverEffect();
});

function setupGrassAndImagesHoverEffect() {
  const grassElements = document.querySelectorAll('.easter-bunny-grass .grass-img');
  const additionalImages = document.querySelectorAll('.additional-img'); // Ensure these elements have this class
  const allHoverElements = [...grassElements, ...additionalImages];
  
  allHoverElements.forEach((element, index) => {
    element.addEventListener('mouseenter', () => {
      showKeyRandomlyOnPage(index % 16); // Loop through 16 keys for each element
    });
  });
}

document.addEventListener('DOMContentLoaded', setupPage);
