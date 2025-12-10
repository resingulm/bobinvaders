# Space Invaders - Classic Browser Game

A classic Space Invaders game built with pure HTML5 Canvas and vanilla JavaScript - no dependencies required!

## Features

- **Classic Gameplay**: Defend Earth from waves of alien invaders
- **Scoring System**: Different point values for different alien rows (10-30 points)
- **Lives System**: Start with 3 lives
- **Progressive Difficulty**: Aliens speed up as you destroy them
- **Responsive Controls**: Smooth keyboard controls for movement and shooting
- **Win/Lose Conditions**: Clear all aliens to win, or lose when aliens reach Earth or you run out of lives
- **Retro Aesthetic**: Classic arcade-style graphics with neon colors

## 🚀 Running the Project

### Option A: Run Locally

This is a pure HTML5/JavaScript game with no dependencies or build process required!

**Method 1: Direct File Opening**
1. Clone or download this repository
2. Navigate to the project folder
3. Double-click `index.html` to open it in your default browser

**Method 2: Using a Local Server (Recommended)**

Using Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Using Node.js (if you have it installed):
```bash
# Install http-server globally (one-time)
npm install -g http-server

# Run server
http-server -p 8000
```

Using VS Code:
- Install the "Live Server" extension
- Right-click on `index.html` and select "Open with Live Server"

Then open your browser and navigate to `http://localhost:8000`

### Option B: GitHub Pages Deployment

This project is deployed and playable at: **[Your GitHub Pages URL will be here]**

**To deploy your own version:**

1. **Fork or clone this repository to your GitHub account**

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" section (in the left sidebar)
   - Under "Source", select the branch you want to deploy (usually `main` or `master`)
   - Select the root folder `/` as the source
   - Click "Save"

3. **Access your game:**
   - GitHub will provide a URL like: `https://yourusername.github.io/bobinvaders/`
   - The site will be live in a few minutes

**Note:** No build process is required! GitHub Pages will serve the static files directly.

## How to Play

1. Open the game in your browser (locally or via GitHub Pages)
2. Press **ENTER** to start the game
3. Use **← →** arrow keys to move your ship left and right
4. Press **SPACE** to shoot at the aliens
5. Destroy all aliens to win!
6. Avoid alien bullets and don't let them reach the bottom of the screen

## Game Mechanics

### Scoring
- **Top row aliens** (red): 30 points each
- **Middle row aliens** (yellow): 20 points each
- **Bottom row aliens** (white): 10 points each

### Alien Behavior
- Aliens move in formation from side to side
- When they reach the edge, they drop down and reverse direction
- Only the bottom-most alien in each column can shoot
- Aliens speed up as their numbers decrease

### Player
- Start with 3 lives
- Lose a life when hit by an alien bullet
- Game over when all lives are lost or aliens reach Earth

## Technical Details

### Files
- `index.html` - Main HTML structure and canvas element
- `styles.css` - Styling with retro neon aesthetic
- `game.js` - Complete game logic (449 lines)

### Architecture
- **Player Class**: Handles player ship movement, shooting, and rendering
- **Alien Class**: Manages individual alien behavior and appearance
- **Bullet Class**: Handles projectile physics for both player and aliens
- **Game State Manager**: Controls game flow (menu, playing, game over, win)
- **Collision Detection**: Efficient bounding box collision system
- **Game Loop**: 60 FPS rendering using requestAnimationFrame

### Browser Compatibility
Works in all modern browsers that support:
- HTML5 Canvas
- ES6 JavaScript (classes, arrow functions, etc.)
- requestAnimationFrame

## Customization

You can easily modify game parameters in `game.js`:

```javascript
const PLAYER_SPEED = 5;           // Player movement speed
const BULLET_SPEED = 7;           // Bullet velocity
const ALIEN_SPEED = 1;            // Initial alien speed
const ALIEN_SHOOT_CHANCE = 0.001; // Alien firing frequency
const ALIEN_ROWS = 5;             // Number of alien rows
const ALIEN_COLS = 11;            // Number of alien columns
```

## Future Enhancements

Potential features to add:
- Sound effects and background music
- Multiple levels with increasing difficulty
- Power-ups (shields, rapid fire, etc.)
- High score persistence using localStorage
- Mobile touch controls
- Particle effects for explosions
- Defensive barriers/bunkers
- Boss battles

## Credits

Created as a classic arcade game tribute using pure web technologies.

## License

Free to use and modify for personal and educational purposes.