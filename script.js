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
    [greetingScreen, gameScreen, globeScreen].forEach(screen => screen.classList.add('hidden'));
    screenToShow.classList.remove('hidden');
}

// Button listeners for screen navigation
startJumperBtn.addEventListener('click', () => {
    showScreen(gameScreen);
    startGame();
});

showMapBtn.addEventListener('click', () => {
    showScreen(globeScreen);
    showMap();
});

backToGreetingBtn.addEventListener('click', () => {
    showScreen(greetingScreen);
    stopGame(); // Stop the game logic
});

backToGreetingMapBtn.addEventListener('click', () => {
    showScreen(greetingScreen);
});

// ----- Jumper Game Logic (same as before) -----
let gameRunning = false;

function startGame() {
    if (gameRunning) return; // Prevent restarting an existing game
    gameRunning = true;

    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Reset player state and restart the game loop here.
    // Insert the existing game logic.
    gameLoop();
}

function stopGame() {
    gameRunning = false;
}

// ----- Globe Logic -----
function showMap() {
    const viewer = new Cesium.Viewer('cesiumContainer', {
        terrainProvider: Cesium.createWorldTerrain(),
        imageryProvider: new Cesium.IonImageryProvider({
            assetId: 2, // Bing Maps Aerial Imagery
        }),
    });

    // You can add further entities or functionalities to your globe here
}


