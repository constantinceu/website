// Navigation and View Management
const greetingScreen = document.getElementById('greetingScreen');
const gameScreen = document.getElementById('gameScreen');
const globeScreen = document.getElementById('globeScreen');

const startJumperBtn = document.getElementById('startJumper');
const showMapBtn = document.getElementById('showMap');
const backToGreetingBtn = document.getElementById('backToGreeting');
const backToGreetingMapBtn = document.getElementById('backToGreetingMap');

// Switch screen visibility
function showScreen(screenToShow) {
    // Hide all screens
    [greetingScreen, gameScreen, globeScreen].forEach(screen => screen.classList.add('hidden'));
    // Show the desired screen
    screenToShow.classList.remove('hidden');
}

// Button listeners for navigation
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

// ----- Jumper Game Logic -----
let gameRunning = false;
let canvas, ctx;

function startGame() {
    if (gameRunning) return; // Prevent multiple initializations

    gameRunning = true;
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize the game state
    resetGame();
    gameLoop();
}

function stopGame() {
    gameRunning = false;
    // Clear the canvas when the game stops
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function resetGame() {
    // Reset player, platforms, etc., as part of game initialization
    player = { x: canvas.width / 2, y: canvas.height - 100, dx: 0, dy: 2 }; // Example of a player reset
    platforms = generatePlatforms(); // Re-generate platforms
}

// Game loop (placeholder logic - use your existing game logic here)
function gameLoop() {
    if (!gameRunning) return;

    // Game update logic here

    // Example rendering logic:
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Call the next frame
    requestAnimationFrame(gameLoop);
}

// ----- Globe Logic -----
let viewer;

function initMap() {
    if (viewer) return; // Prevent re-initializing

    // Initialize CesiumJS Viewer
    viewer = new Cesium.Viewer('cesiumContainer', {
        terrainProvider: Cesium.createWorldTerrain(),
        imageryProvider: new Cesium.IonImageryProvider({
            assetId: 2, // Bing Maps Aerial Imagery
        }),
        animation: false,
        timeline: false,
    });
}



