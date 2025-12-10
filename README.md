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

## How to Play

1. Open `index.html` in any modern web browser
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