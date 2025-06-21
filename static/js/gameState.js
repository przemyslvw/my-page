// Game state
export const game = {
  state: 'menu', // menu, playing, paused, gameOver, levelIntro
  level: 1,
  score: 0,
  previousLevel: {
    level: 1,
    score: 0,
    health: 0
  },
  player: {
    worldX: 0, // Player's position in world coordinates
    worldY: 0,
    health: 100,
    maxHealth: 100,
    angle: 0,
    speed: 0,
    maxSpeed: 3, // Reduced from 5 to slow down movement
    damageMultiplier: 1, // For damage powerup
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

export function saveLevelResults() {
  game.previousLevel = {
    level: game.level,
    score: game.score,
    health: game.player.health
  };
}

export function loadPreviousLevel() {
  if (game.previousLevel.level > 0) {
    game.level = game.previousLevel.level;
    game.score = game.previousLevel.score;
    game.player.health = game.previousLevel.health;
    game.player.maxHealth = Math.max(100, game.previousLevel.health); // Ensure maxHealth is at least the current health
    return true;
  }
  return false;
}

export function gameOver() {
  saveLevelResults();
  game.state = 'gameOver';
  document.getElementById('finalScore').textContent = game.score;
  document.getElementById('finalLevel').textContent = game.level;
  document.getElementById('gameOverScreen').classList.remove('hidden');
}
