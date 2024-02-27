// Utility functions for common actions
function applyColorToEgg(color) {
  const egg = document.getElementById('egg');
  egg ? egg.style.backgroundColor = color : console.error('Egg element not found!');
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

function placeRandomly(element) {
  for (let attempts = 0; attempts < 100; attempts++) {
    element.style.left = `${Math.random() * (window.innerWidth - element.offsetWidth)}px`;
    element.style.top = `${Math.random() * (window.innerHeight - element.offsetHeight)}px`;

    if (!checkOverlap(element)) {
      document.body.appendChild(element);
      break;
    }
  }
}

function checkOverlap(element) {
  const rect = element.getBoundingClientRect();
  return [...document.querySelectorAll('.no-overlap')].some(el => {
    const elRect = el.getBoundingClientRect();
    return !(rect.right < elRect.left || rect.left > elRect.right || rect.bottom < elRect.top || rect.top > elRect.bottom);
  });
}

// Event listeners setup
function setupEventListeners() {
  document.getElementById('revealEggBtn')?.addEventListener('click', showNewEgg);
  document.getElementById('startHuntButton')?.addEventListener('click', startHunt);
  document.querySelectorAll('button[onclick="checkWord()"]').forEach(button => button.addEventListener('click', checkWord));
}

// Feature initialization functions
function setupModal() {
  const modal = document.getElementById('urgentMessageModal');
  document.getElementById('openModal').onclick = () => modal.style.display = "block";
  document.getElementsByClassName("close")[0].onclick = () => modal.style.display = "none";
  window.onclick = event => event.target === modal ? modal.style.display = "none" : null;
}

function setupSpecialTrigger() {
  document.getElementById('specialTrigger').addEventListener('mouseenter', () => confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } }));
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

function setupAdditionalImages() {
  [
    'https://i.imgur.com/9a87llh.png?1', 'https://i.imgur.com/Cx5sW4T.png?1', // More URLs...
  ].forEach(src => placeRandomly(Object.assign(document.createElement('img'), { src, style: { width: '150px', position: 'absolute' } })));
}

// Main setup function
function setupPage() {
  setupModal();
  setupSpecialTrigger();
  setupColorPalette();
  setupStickers();
  setupEventListeners();
  setupAdditionalImages();
  setupGrassAndImagesHoverEffect();
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

function checkWord() {
  const userInput = document.getElementById('userInput').value;
  const feedback = document.getElementById('feedback');
  feedback.textContent = userInput.toLowerCase() === 'easterbunny' ? 'Correct! You unraveled the clue.' : 'Hmm, that does not seem right. Try pondering a bit more.';
}

function setupGrassAndImagesHoverEffect() {
  document.querySelectorAll('.easter-bunny-grass .grass-img, .additional-img').forEach((element, index) => {
    element.addEventListener('mouseenter', () => showKeyRandomlyOnPage(index % 16)); // Adjust modulo based on the number of keys
  });
}

function showKeyRandomlyOnPage(keyIndex) {
  // Functionality to show a key randomly on the page
}

function setupAdditionalImages() {
  const keyImages = [
    'https://i.imgur.com/9a87llh.png?1',
    'https://i.imgur.com/Cx5sW4T.png?1',
    'https://i.imgur.com/Sppxziz.png',
    // Add the rest of your key images here...
  ];

  keyImages.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'key-image'; // Assign a class for potential styling
    img.style.width = '100px'; // Set a fixed width, or adjust as needed
    document.body.appendChild(img); // Append the image to the body, or another container element

    placeRandomly(img);
  });
}

function placeRandomly(element) {
  let attempts = 0;
  const maxAttempts = 50; // Limit the number of placement attempts to avoid an infinite loop

  do {
    const randomX = Math.random() * (window.innerWidth - element.offsetWidth);
    const randomY = Math.random() * (window.innerHeight - element.offsetHeight);

    element.style.left = `${randomX}px`;
    element.style.top = `${randomY}px`;

    attempts++;
  } while (checkOverlap(element) && attempts < maxAttempts);
}

function checkOverlap(element) {
  // Your implementation to check if `element` overlaps with any other elements
}

// Initialize everything once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', setupPage);
