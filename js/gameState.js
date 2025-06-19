// Game state
export const game = {
  state: 'menu', // menu, playing, paused, gameOver, levelIntro
  level: 1,
  score: 0,
  player: {
    worldX: 0, // Player's position in world coordinates
    worldY: 0,
    health: 100,
    maxHealth: 100,
    angle: 0,
    speed: 0,
    maxSpeed: 5,
  },
  camera: { x: 0, y: 0 },
  enemies: [],
  lasers: [],
  powerups: [],
  explosions: [],
  lastShot: 0,
  shootCooldown: 200,
  enemySpawnTimer: 0,
  enemiesKilled: 0,
  enemiesNeededForNextLevel: 10,
  joystick: {
    active: false,
    x: 0,
    y: 0,
    centerX: 80,
    centerY: window.innerHeight - 80,
    radius: 60,
  },
  bossActive: false,
  boss: null,
};

export function gameOver() {
  game.state = 'gameOver';
  document.getElementById('finalScore').textContent = game.score;
  document.getElementById('finalLevel').textContent = game.level;
  document.getElementById('gameOverScreen').classList.remove('hidden');
}
