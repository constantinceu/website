const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game settings
const gravity = 0.4;
const jumpForce = -15; // Normal jump force
const boostForce = -30; // Force for jump pads
let score = 0;
let gameRunning = true;
let cameraOffset = 0; // Tracks the vertical camera movement

// Player character
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    color: '#FFD700', // Gold color
    dy: 0,
    lastPlatform: null, // Tracks the last platform landed on
};

// Platforms
const platforms = [];
const platformWidth = 100;
const platformHeight = 10;
const platformGap = 100;

// Colors for platform types
const platformColors = {
    normal: '#32CD32', // Green
    jumpPad: '#1E90FF', // Blue
    breakable: '#FF6347', // Red
};

// Add a beginner platform
platforms.push({
    x: canvas.width / 2 - platformWidth / 2,
    y: canvas.height / 2 + 100, // Start below the player
    type: 'normal',
    broken: false, // For breakable platforms
});

// Generate initial platforms with random types
for (let i = 1; i < 10; i++) { // Start at index 1 because we added the beginner platform
    platforms.push({
        x: Math.random() * (canvas.width - platformWidth),
        y: canvas.height / 2 + 100 - i * platformGap,
        type: Math.random() < 0.1 ? 'jumpPad' : Math.random() < 0.3 ? 'breakable' : 'normal', // 10% Jump Pads, 30% Breakables, 60% Normal
        broken: false,
    });
}

// Tilt value
let tiltX = 0;

// Listen for device orientation
window.addEventListener('deviceorientation', (event) => {
    tiltX = event.gamma || 0; // gamma = tilt left/right
});

// Main game loop
function gameLoop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move camera up when the player is above the center of the canvas
    if (player.y < canvas.height / 2) {
        cameraOffset += canvas.height / 2 - player.y;
        player.y = canvas.height / 2; // Fix the player's vertical position for the camera
    }

    // Draw player
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();

    // Player movement
    player.dy += gravity;
    player.y += player.dy;
    player.x += tiltX * 0.5;

    // Keep player within canvas bounds
    if (player.x < player.radius) player.x = player.radius;
    if (player.x > canvas.width - player.radius) player.x = canvas.width - player.radius;

    // Draw and update platforms
    platforms.forEach((platform, index) => {
        const platformY = platform.y + cameraOffset; // Adjust for camera movement
        if (platform.type === 'jumpPad') {
            ctx.fillStyle = platformColors.jumpPad;
            ctx.fillRect(platform.x, platformY, platformWidth, platformHeight);
        } else if (platform.type === 'breakable') {
            if (!platform.broken) {
                ctx.fillStyle = platformColors.breakable;
                ctx.fillRect(platform.x, platformY, platformWidth, platformHeight);
            }
        } else {
            ctx.fillStyle = platformColors.normal;
            ctx.fillRect(platform.x, platformY, platformWidth, platformHeight);
        }

        // Recycle platforms that go off the bottom
        if (platformY > canvas.height) {
            platform.y = Math.min(
                ...platforms.map(p => p.y) // Find the highest platform
            ) - platformGap;
            platform.x = Math.random() * (canvas.width - platformWidth);
            platform.type = Math.random() < 0.1 ? 'jumpPad' : Math.random() < 0.3 ? 'breakable' : 'normal'; // Random new type
            platform.broken = false; // Reset breakable platform state
            score++;
        }

        // Improved collision detection
        if (
            player.dy > 0 && // Ensure the player is falling
            player.x + player.radius > platform.x && // Right edge of the player overlaps platform
            player.x - player.radius < platform.x + platformWidth && // Left edge of the player overlaps platform
            player.y + player.radius <= platformY && // Player is above the platform
            player.y + player.radius + player.dy >= platformY // Player would intersect this frame
        ) {
            if (platform !== player.lastPlatform) { // Prevent repeat collisions in consecutive frames
                if (platform.type === 'jumpPad') {
                    player.dy = boostForce; // Jump much higher
                } else if (platform.type === 'breakable') {
                    if (!platform.broken) {
                        player.dy = jumpForce; // Normal jump
                        platform.broken = true; // Break the platform after a jump
                    }
                } else {
                    player.dy = jumpForce; // Normal jump
                }
                player.lastPlatform = platform; // Record this as the last touched platform
            }
        }
    });

    // Game over if the player falls too far
    if (player.y - cameraOffset > canvas.height) {
        gameRunning = false;
        setTimeout(() => alert(`Game Over! Your score: ${score}`), 100);
        setTimeout(() => window.location.reload(), 500);
    }

    // Display score
    ctx.font = '20px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(`Score: ${score}`, 20, 40);

    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();





