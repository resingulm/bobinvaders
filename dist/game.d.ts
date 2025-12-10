declare const CANVAS_WIDTH: number;
declare const CANVAS_HEIGHT: number;
declare const PLAYER_WIDTH: number;
declare const PLAYER_HEIGHT: number;
declare const PLAYER_SPEED: number;
declare const BULLET_WIDTH: number;
declare const BULLET_HEIGHT: number;
declare const BULLET_SPEED: number;
declare const ALIEN_WIDTH: number;
declare const ALIEN_HEIGHT: number;
declare const ALIEN_ROWS: number;
declare const ALIEN_COLS: number;
declare const ALIEN_SPACING_X: number;
declare const ALIEN_SPACING_Y: number;
declare const ALIEN_START_X: number;
declare const ALIEN_START_Y: number;
declare const ALIEN_SPEED: number;
declare const ALIEN_DROP_DISTANCE: number;
declare const ALIEN_SHOOT_CHANCE: number;
declare enum GameState {
    MENU = "menu",
    PLAYING = "playing",
    GAME_OVER = "game_over",
    WIN = "win"
}
type BulletOwner = 'player' | 'alien';
interface KeyMap {
    [key: string]: boolean;
}
interface SoundEffects {
    playerShoot: () => void;
    alienShoot: () => void;
    explosion: () => void;
    playerHit: () => void;
    gameOver: () => void;
    win: () => void;
}
declare const canvas: HTMLCanvasElement;
declare const ctx: CanvasRenderingContext2D;
declare const scoreElement: HTMLElement;
declare const livesElement: HTMLElement;
declare const messageElement: HTMLElement;
declare let audioContext: AudioContext | null;
declare function initAudio(): void;
declare const sounds: SoundEffects;
declare let gameState: GameState;
declare let score: number;
declare let lives: number;
declare let player: Player;
declare let aliens: Alien[];
declare let playerBullets: Bullet[];
declare let alienBullets: Bullet[];
declare let keys: KeyMap;
declare let alienDirection: number;
declare let alienSpeed: number;
declare class Player {
    width: number;
    height: number;
    x: number;
    y: number;
    speed: number;
    canShoot: boolean;
    constructor();
    move(): void;
    shoot(): void;
    draw(): void;
    takeDamage(): void;
}
declare class Bullet {
    x: number;
    y: number;
    width: number;
    height: number;
    speedY: number;
    owner: BulletOwner;
    constructor(x: number, y: number, speedY: number, owner: BulletOwner);
    update(): void;
    draw(): void;
    isOffScreen(): boolean;
}
declare class Alien {
    x: number;
    y: number;
    width: number;
    height: number;
    row: number;
    alive: boolean;
    points: number;
    color: string;
    constructor(x: number, y: number, row: number);
    draw(): void;
    canShoot(): boolean;
    shoot(): void;
}
declare function initGame(): void;
declare function update(): void;
declare function updateAliens(): void;
declare function checkCollisions(): void;
declare function render(): void;
declare function drawMenu(): void;
declare function updateUI(): void;
declare function showMessage(text: string): void;
declare function hideMessage(): void;
declare function gameLoop(): void;
//# sourceMappingURL=game.d.ts.map