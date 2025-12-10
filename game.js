// Game Constants
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 30;
const PLAYER_SPEED = 5;
const BULLET_WIDTH = 4;
const BULLET_HEIGHT = 15;
const BULLET_SPEED = 7;
const ALIEN_WIDTH = 40;
const ALIEN_HEIGHT = 30;
const ALIEN_ROWS = 5;
const ALIEN_COLS = 11;
const ALIEN_SPACING_X = 60;
const ALIEN_SPACING_Y = 50;
const ALIEN_START_X = 50;
const ALIEN_START_Y = 50;
const ALIEN_SPEED = 1;
const ALIEN_DROP_DISTANCE = 20;
const ALIEN_SHOOT_CHANCE = 0.001;

// Game States
const GAME_STATE = {
    MENU: 'menu',
    PLAYING: 'playing',
    GAME_OVER: 'game_over',
    WIN: 'win'
};

// Canvas and Context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// UI Elements
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const messageElement = document.getElementById('message');

// Audio Context - Initialize lazily to avoid blocking issues
let audioContext = null;

// Initialize audio context on first user interaction
function initAudio() {
    if (!audioContext && typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)) {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Audio context initialization failed:', e);
        }
    }
}

// Sound Effects Functions
const sounds = {
    playerShoot: () => {
        if (!audioContext) return;
        try {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            console.warn('Sound effect failed:', e);
        }
    },
    
    alienShoot: () => {
        if (!audioContext) return;
        try {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.15);
            
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.15);
        } catch (e) {
            console.warn('Sound effect failed:', e);
        }
    },
    
    explosion: () => {
        if (!audioContext) return;
        try {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.2);
            
            gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        } catch (e) {
            console.warn('Sound effect failed:', e);
        }
    },
    
    playerHit: () => {
        if (!audioContext) return;
        try {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);
            
            gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (e) {
            console.warn('Sound effect failed:', e);
        }
    },
    
    gameOver: () => {
        if (!audioContext) return;
        try {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.5);
            
            gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.warn('Sound effect failed:', e);
        }
    },
    
    win: () => {
        if (!audioContext) return;
        try {
            // Victory fanfare
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            notes.forEach((freq, index) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.15);
                
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + index * 0.15);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.15 + 0.3);
                
                oscillator.start(audioContext.currentTime + index * 0.15);
                oscillator.stop(audioContext.currentTime + index * 0.15 + 0.3);
            });
        } catch (e) {
            console.warn('Sound effect failed:', e);
        }
    }
};

// Game Variables
let gameState = GAME_STATE.MENU;
let score = 0;
let lives = 3;
let player;
let aliens = [];
let playerBullets = [];
let alienBullets = [];
let keys = {};
let alienDirection = 1;
let alienSpeed = ALIEN_SPEED;
let lastAlienShootTime = 0;

// Player Class
class Player {
    constructor() {
        this.width = PLAYER_WIDTH;
        this.height = PLAYER_HEIGHT;
        this.x = CANVAS_WIDTH / 2 - this.width / 2;
        this.y = CANVAS_HEIGHT - this.height - 20;
        this.speed = PLAYER_SPEED;
        this.canShoot = true;
    }

    move() {
        if (keys['ArrowLeft'] && this.x > 0) {
            this.x -= this.speed;
        }
        if (keys['ArrowRight'] && this.x < CANVAS_WIDTH - this.width) {
            this.x += this.speed;
        }
    }

    shoot() {
        if (this.canShoot && keys[' ']) {
            playerBullets.push(new Bullet(
                this.x + this.width / 2 - BULLET_WIDTH / 2,
                this.y,
                -BULLET_SPEED,
                'player'
            ));
            sounds.playerShoot();
            this.canShoot = false;
        }
        
        // Allow shooting again when space is released
        if (!keys[' ']) {
            this.canShoot = true;
        }
    }

    draw() {
        // Draw player ship (triangle shape)
        ctx.fillStyle = '#00ff00';
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.closePath();
        ctx.fill();
        
        // Draw ship base
        ctx.fillRect(this.x + 5, this.y + this.height - 5, this.width - 10, 5);
    }

    takeDamage() {
        lives--;
        sounds.playerHit();
        updateUI();
        if (lives <= 0) {
            gameState = GAME_STATE.GAME_OVER;
            sounds.gameOver();
            showMessage('GAME OVER!<br>Press ENTER to restart');
        }
    }
}

// Bullet Class
class Bullet {
    constructor(x, y, speedY, owner) {
        this.x = x;
        this.y = y;
        this.width = BULLET_WIDTH;
        this.height = BULLET_HEIGHT;
        this.speedY = speedY;
        this.owner = owner;
    }

    update() {
        this.y += this.speedY;
    }

    draw() {
        ctx.fillStyle = this.owner === 'player' ? '#ffff00' : '#ff0000';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    isOffScreen() {
        return this.y < 0 || this.y > CANVAS_HEIGHT;
    }
}

// Alien Class
class Alien {
    constructor(x, y, row) {
        this.x = x;
        this.y = y;
        this.width = ALIEN_WIDTH;
        this.height = ALIEN_HEIGHT;
        this.row = row;
        this.alive = true;
        
        // Different point values for different rows
        if (row === 0) {
            this.points = 30;
            this.color = '#ff0000';
        } else if (row === 1 || row === 2) {
            this.points = 20;
            this.color = '#ffff00';
        } else {
            this.points = 10;
            this.color = '#ffffff';
        }
    }

    draw() {
        if (!this.alive) return;
        
        ctx.fillStyle = this.color;
        
        // Draw alien body (rectangle with details)
        ctx.fillRect(this.x + 5, this.y, this.width - 10, this.height - 10);
        
        // Draw alien eyes
        ctx.fillStyle = '#000000';
        ctx.fillRect(this.x + 10, this.y + 5, 5, 5);
        ctx.fillRect(this.x + 25, this.y + 5, 5, 5);
        
        // Draw alien legs
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x + 8, this.y + this.height - 10, 5, 10);
        ctx.fillRect(this.x + 27, this.y + this.height - 10, 5, 10);
    }

    canShoot() {
        // Check if this is the bottom-most alien in its column
        for (let alien of aliens) {
            if (alien.alive && 
                Math.abs(alien.x - this.x) < 5 && 
                alien.y > this.y) {
                return false;
            }
        }
        return true;
    }

    shoot() {
        if (this.canShoot() && Math.random() < ALIEN_SHOOT_CHANCE) {
            alienBullets.push(new Bullet(
                this.x + this.width / 2 - BULLET_WIDTH / 2,
                this.y + this.height,
                BULLET_SPEED,
                'alien'
            ));
            sounds.alienShoot();
        }
    }
}

// Initialize Game
function initGame() {
    gameState = GAME_STATE.PLAYING;
    score = 0;
    lives = 3;
    player = new Player();
    aliens = [];
    playerBullets = [];
    alienBullets = [];
    alienDirection = 1;
    alienSpeed = ALIEN_SPEED;
    
    // Create alien grid
    for (let row = 0; row < ALIEN_ROWS; row++) {
        for (let col = 0; col < ALIEN_COLS; col++) {
            const x = ALIEN_START_X + col * ALIEN_SPACING_X;
            const y = ALIEN_START_Y + row * ALIEN_SPACING_Y;
            aliens.push(new Alien(x, y, row));
        }
    }
    
    updateUI();
    hideMessage();
}

// Update Game State
function update() {
    if (gameState !== GAME_STATE.PLAYING) return;
    
    // Update player
    player.move();
    player.shoot();
    
    // Update player bullets
    playerBullets = playerBullets.filter(bullet => {
        bullet.update();
        return !bullet.isOffScreen();
    });
    
    // Update alien bullets
    alienBullets = alienBullets.filter(bullet => {
        bullet.update();
        return !bullet.isOffScreen();
    });
    
    // Move aliens
    updateAliens();
    
    // Aliens shoot
    aliens.forEach(alien => {
        if (alien.alive) {
            alien.shoot();
        }
    });
    
    // Check collisions
    checkCollisions();
    
    // Check win condition
    if (aliens.every(alien => !alien.alive)) {
        gameState = GAME_STATE.WIN;
        sounds.win();
        showMessage('YOU WIN!<br>Press ENTER to play again');
    }
}

// Update Aliens Movement
function updateAliens() {
    let shouldDrop = false;
    let leftMost = CANVAS_WIDTH;
    let rightMost = 0;
    
    // Find boundaries of living aliens
    aliens.forEach(alien => {
        if (alien.alive) {
            leftMost = Math.min(leftMost, alien.x);
            rightMost = Math.max(rightMost, alien.x + alien.width);
        }
    });
    
    // Check if aliens hit the edge
    if (rightMost >= CANVAS_WIDTH || leftMost <= 0) {
        shouldDrop = true;
        alienDirection *= -1;
    }
    
    // Move aliens
    aliens.forEach(alien => {
        if (alien.alive) {
            if (shouldDrop) {
                alien.y += ALIEN_DROP_DISTANCE;
                
                // Check if aliens reached the bottom
                if (alien.y + alien.height >= player.y) {
                    gameState = GAME_STATE.GAME_OVER;
                    sounds.gameOver();
                    showMessage('GAME OVER!<br>Aliens reached Earth!<br>Press ENTER to restart');
                }
            }
            alien.x += alienSpeed * alienDirection;
        }
    });
    
    // Increase speed as aliens are destroyed
    const aliveCount = aliens.filter(a => a.alive).length;
    alienSpeed = ALIEN_SPEED + (ALIEN_ROWS * ALIEN_COLS - aliveCount) * 0.05;
}

// Check Collisions
function checkCollisions() {
    // Player bullets vs aliens
    playerBullets = playerBullets.filter(bullet => {
        let hit = false;
        aliens.forEach(alien => {
            if (alien.alive && 
                bullet.x < alien.x + alien.width &&
                bullet.x + bullet.width > alien.x &&
                bullet.y < alien.y + alien.height &&
                bullet.y + bullet.height > alien.y) {
                alien.alive = false;
                score += alien.points;
                sounds.explosion();
                updateUI();
                hit = true;
            }
        });
        return !hit;
    });
    
    // Alien bullets vs player
    alienBullets = alienBullets.filter(bullet => {
        if (bullet.x < player.x + player.width &&
            bullet.x + bullet.width > player.x &&
            bullet.y < player.y + player.height &&
            bullet.y + bullet.height > player.y) {
            player.takeDamage();
            return false;
        }
        return true;
    });
}

// Render Game
function render() {
    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    if (gameState === GAME_STATE.MENU) {
        drawMenu();
        return;
    }
    
    // Draw player
    player.draw();
    
    // Draw aliens
    aliens.forEach(alien => alien.draw());
    
    // Draw bullets
    playerBullets.forEach(bullet => bullet.draw());
    alienBullets.forEach(bullet => bullet.draw());
}

// Draw Menu
function drawMenu() {
    ctx.fillStyle = '#00ff00';
    ctx.font = '48px "Courier New"';
    ctx.textAlign = 'center';
    ctx.fillText('SPACE INVADERS', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 50);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px "Courier New"';
    ctx.fillText('Press ENTER to Start', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);
    
    ctx.font = '16px "Courier New"';
    ctx.fillText('Use Arrow Keys to Move', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 60);
    ctx.fillText('Press SPACE to Shoot', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 85);
}

// Update UI
function updateUI() {
    scoreElement.textContent = score;
    livesElement.textContent = lives;
}

// Show Message
function showMessage(text) {
    messageElement.innerHTML = text;
    messageElement.classList.add('show');
}

// Hide Message
function hideMessage() {
    messageElement.classList.remove('show');
}

// Game Loop
function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

// Keyboard Event Listeners
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    
    // Prevent default behavior for game keys
    if (['ArrowLeft', 'ArrowRight', ' ', 'Enter'].includes(e.key)) {
        e.preventDefault();
    }
    
    // Start/Restart game
    if (e.key === 'Enter') {
        if (gameState === GAME_STATE.MENU ||
            gameState === GAME_STATE.GAME_OVER ||
            gameState === GAME_STATE.WIN) {
            // Initialize audio on first user interaction
            initAudio();
            initGame();
        }
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Start the game loop
gameLoop();

// Made with Bob
