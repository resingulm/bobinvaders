# Space Invaders - TypeScript Edition

A classic Space Invaders game built with TypeScript, HTML5 Canvas, and Web Audio API.

## Features

- **Classic Gameplay**: Defend Earth from waves of alien invaders
- **Scoring System**: Different point values for different alien rows (10-30 points)
- **Lives System**: Start with 3 lives
- **Progressive Difficulty**: Aliens speed up as you destroy them
- **Responsive Controls**: Smooth keyboard controls for movement and shooting
- **Sound Effects**: Retro-style sound effects using Web Audio API
- **Win/Lose Conditions**: Clear all aliens to win, or lose when aliens reach Earth or you run out of lives
- **Retro Aesthetic**: Classic arcade-style graphics with neon colors
- **Type Safety**: Full TypeScript implementation with strict type checking

## 🚀 Running the Project

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/resingulm/bobinvaders.git
   cd bobinvaders
   git checkout typescript-migration
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the TypeScript code**
   ```bash
   npm run build
   ```

4. **Open the game**
   - Simply double-click `index.html` to open it in your browser
   - Or use a local server (see below)

### Development Mode

For active development with automatic recompilation:

```bash
npm run dev
```

This will watch for changes in your TypeScript files and automatically recompile them.

### Build Commands

- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Watch mode for development
- `npm run clean` - Remove compiled files
- `npm run dev` - Same as watch mode

### Using a Local Server (Optional)

If you prefer to use a local server:

**VS Code:**
- Install the "Live Server" extension
- Right-click on `index.html` and select "Open with Live Server"

**Command line:**
```bash
npx http-server -p 8000
```

Then open your browser and navigate to `http://localhost:8000`

## How to Play

1. Open the game in your browser
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

### Project Structure
```
bobinvaders/
├── src/
│   └── game.ts          # TypeScript source code
├── dist/                # Compiled JavaScript (generated)
│   ├── game.js
│   ├── game.js.map
│   ├── game.d.ts
│   └── game.d.ts.map
├── index.html           # Main HTML file
├── styles.css           # Game styling
├── tsconfig.json        # TypeScript configuration
├── package.json         # Project dependencies
└── README.md           # This file
```

### TypeScript Features
- **Strict Type Checking**: Full type safety with strict mode enabled
- **Enums**: Game states defined as TypeScript enums
- **Interfaces**: Type definitions for game objects
- **Classes**: Object-oriented design with typed classes
- **Type Annotations**: Explicit types throughout the codebase

### Architecture
- **Player Class**: Handles player ship movement, shooting, and rendering
- **Alien Class**: Manages individual alien behavior and appearance
- **Bullet Class**: Handles projectile physics for both player and aliens
- **Game State Manager**: Controls game flow using TypeScript enums
- **Collision Detection**: Efficient bounding box collision system
- **Game Loop**: 60 FPS rendering using requestAnimationFrame
- **Audio System**: Web Audio API with lazy initialization

### Browser Compatibility
Works in all modern browsers that support:
- HTML5 Canvas
- ES2017 JavaScript
- Web Audio API
- TypeScript (compiled to JavaScript)

## Customization

You can easily modify game parameters in `src/game.ts`:

```typescript
const PLAYER_SPEED: number = 5;           // Player movement speed
const BULLET_SPEED: number = 7;           // Bullet velocity
const ALIEN_SPEED: number = 1;            // Initial alien speed
const ALIEN_SHOOT_CHANCE: number = 0.001; // Alien firing frequency
const ALIEN_ROWS: number = 5;             // Number of alien rows
const ALIEN_COLS: number = 11;            // Number of alien columns
```

After making changes, run `npm run build` to recompile.

## Development

### Adding New Features

1. Edit `src/game.ts`
2. Run `npm run build` or use `npm run dev` for auto-compilation
3. Refresh your browser to see changes

### Type Checking

TypeScript provides compile-time type checking. If there are type errors, the build will fail with helpful error messages.

## Deployment

### GitHub Pages

The compiled JavaScript files in the `dist/` directory are ready for deployment. To deploy:

1. Ensure `dist/` is committed to your repository
2. Push to GitHub
3. Enable GitHub Pages in repository settings
4. Select the branch and root folder
5. Your game will be live at: `https://yourusername.github.io/bobinvaders/`

## Migration from JavaScript

This TypeScript version includes:
- Full type annotations for all variables, functions, and classes
- Enum for game states instead of plain object
- Interface definitions for complex types
- Strict null checking and type safety
- Better IDE support with autocomplete and type hints

## Credits

Created as a classic arcade game tribute using TypeScript and modern web technologies.

## License

Free to use and modify for personal and educational purposes.