// Screen navigation
const greetingScreen = document.getElementById('greetingScreen');
const gameScreen = document.getElementById('gameScreen');
const globeScreen = document.getElementById('globeScreen');

const startJumperBtn = document.getElementById('startJumper');
const showMapBtn = document.getElementById('showMap');
const backToGreetingBtn = document.getElementById('backToGreeting');
const backToGreetingMapBtn = document.getElementById('backToGreetingMap');

// Global game and globe states
let gameRunning = false;
let viewer = null; // Cesium viewer instance
let canvas, ctx;

// Show specific screen
function showScreen(screenToShow) {
  [greetingScreen, gameScreen, globeScreen].forEach(screen => {
    screen.classList.add('hidden');
  });
  screenToShow.classList.remove('hidden');
}

// ---- EVENT LISTENERS ---- //
startJumperBtn.addEventListener('click', () => {
  showScreen(gameScreen);
  startGame();
});

showMapBtn.addEventListener('click', () => {
  showScreen(globeScreen);
  initMap();
});

backToGreetingBtn.addEventListener('click', () => {
  showScreen(greetingScreen);
  stopGame();
});

backToGreetingMapBtn.addEventListener('click', () => {
  showScreen(greetingScreen);
});

// ---- JUMPER GAME ---- //
function startGame() {
  if (gameRunning) return; // Prevent multiple initializations

  gameRunning = true;
  canvas = document.getElementById('gameCanvas');
  ctx = canvas.getContext('2d');

  // Initialize the canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Reset game state
  resetGame();

  // Start the game loop
  requestAnimationFrame(gameLoop);
}

function stopGame() {
  gameRunning = false;
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  }
}

// Game state
let player, platforms;

function resetGame() {
  // Example initial state
  player = { x: canvas.width / 2, y: canvas.height - 50, dy: -5, size: 20 };
  platforms = [{ x: canvas.width / 2 - 50, y: canvas.height - 10, width: 100, height: 10 }];
}

function gameLoop() {
  if (!gameRunning) return;

  // Game logic (basic player movement for testing)
  player.y += player.dy; // Simulate falling

  // Reset player when falling below screen
  if (player.y > canvas.height) {
    player.y = canvas.height / 2;
  }

  // Rendering
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear canvas

  ctx.fillStyle = 'red';
  ctx.fillRect(player.x, player.y, player.size, player.size); // Draw player

  platforms.forEach(platform => {
    ctx.fillStyle = 'blue';
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height); // Draw platform
  });

  requestAnimationFrame(gameLoop); // Continue game loop
}

// ---- CESIUM GLOBE ---- //
function initMap() {
  if (!viewer) {
    viewer = new Cesium.Viewer('cesiumContainer', {
      terrainProvider: Cesium.createWorldTerrain(),
      imageryProvider: new Cesium.IonImageryProvider({
        assetId: 2 // Bing Maps
      }),
      animation: false,
      timeline: false,
    });
  }
}




