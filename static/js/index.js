import { spawnEnemy } from './gameLogic.js';
import { enemyTypes } from './enemyTypes.js';
import { updatePlayer } from './inputController.js';
import { updateEnemies } from './update/updateEnemies.js';
import { updateExplosions } from './update/updateExplosion.js';
import { updateLasers } from './update/updateLaser.js';
import { updatePowerUps } from './update/updatePowerup.js';
import { spawnBoss } from './spawn/spawn.js';
import {
  drawStars,
  drawPlayer,
  drawEnemy,
  drawHeavy,
  drawInterceptor,
  drawBoss,
  drawLaser,
  drawPowerUp,
  drawExplosion,
} from './draw/draw.js';
import { levelConfigs } from './levelConfigs.js';
import { game } from './gameState.js';

// Import canvas and context
import { canvas, ctx } from './canvas.js';

// Menu event listeners
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('restartBtn').addEventListener('click', restartGame);
document.getElementById('menuBtn').addEventListener('click', showMenu);
document.getElementById('pauseBtn').addEventListener('click', togglePause);
document.getElementById('startLevelBtn').addEventListener('click', startLevel);
document.getElementById('skipBtn').addEventListener('click', skipCutscene);
document.getElementById('instructionsBtn').addEventListener('click', showInstructions);
document.getElementById('backToMenuBtn').addEventListener('click', hideInstructions);

// Game functions
function startGame() {
  game.state = 'levelIntro';
  game.level = 1;
  game.score = 0;
  resetPlayer();
  showLevelIntro();
}

function restartGame() {
  game.state = 'levelIntro';
  game.level = 1;
  game.score = 0;
  game.enemies = [];
  game.lasers = [];
  game.powerups = [];
  game.explosions = [];
  game.enemiesKilled = 0;
  game.bossActive = false;
  game.boss = null;
  resetPlayer();
  showLevelIntro();
}

function showMenu() {
  game.state = 'menu';
  document.getElementById('menu').classList.remove('hidden');
  document.getElementById('gameOverScreen').classList.add('hidden');
  document.getElementById('levelIntro').classList.add('hidden');
  document.getElementById('instructionsScreen').classList.add('hidden');
}

function showInstructions() {
  document.getElementById('menu').classList.add('hidden');
  document.getElementById('instructionsScreen').classList.remove('hidden');
}

function hideInstructions() {
  document.getElementById('instructionsScreen').classList.add('hidden');
  document.getElementById('menu').classList.remove('hidden');
}

export function showLevelIntro() {
  const config = levelConfigs[(game.level - 1) % levelConfigs.length];
  document.getElementById('currentLevelText').textContent = game.level;
  document.getElementById('levelDescription').textContent = config.description;
  document.getElementById('levelIntro').classList.remove('hidden');
  document.getElementById('menu').classList.add('hidden');
  document.getElementById('gameOverScreen').classList.add('hidden');
}

function startLevel() {
  game.state = 'playing';
  document.getElementById('levelIntro').classList.add('hidden');

  // Reset level-specific variables
  game.enemies = [];
  game.lasers = [];
  game.powerups = [];
  game.explosions = [];
  game.enemiesKilled = 0;
  game.enemiesNeededForNextLevel = 10 + (game.level - 1) * 5;
  game.bossActive = false;
  game.boss = null;

  // Show cutscene placeholder (in real game, load specific video for level)
  showCutscene();
}

function showCutscene() {
  const videoOverlay = document.getElementById('videoOverlay');
  const video = document.getElementById('cutsceneVideo');

  // In a real implementation, you would load different videos per level
  // video.src = `cutscene_level_${game.level}.mp4`;

  videoOverlay.style.display = 'block';

  // Auto-skip after 3 seconds for demo (in real game, play full video)
  setTimeout(() => {
    skipCutscene();
  }, 3000);
}

function skipCutscene() {
  document.getElementById('videoOverlay').style.display = 'none';
  // Start actual gameplay
  gameLoop();
}

function togglePause() {
  if (game.state === 'playing') {
    game.state = 'paused';
  } else if (game.state === 'paused') {
    game.state = 'playing';
    gameLoop();
  }
}

function resetPlayer() {
  game.player.worldX = 0;
  game.player.worldY = 0;
  game.player.health = game.player.maxHealth;
  game.player.angle = 0;
  game.camera.x = 0;
  game.camera.y = 0;
}

// Rendering
function render() {
  // Clear canvas with space background
  ctx.fillStyle = '#001122';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw scrolling starfield
  drawStars();

  // Save context for world transformations
  ctx.save();

  // Apply camera transformation to all world objects
  ctx.translate(-game.camera.x, -game.camera.y);

  // Draw power-ups
  game.powerups.forEach((powerup) => {
    drawPowerUp(powerup);
  });

  // Draw lasers
  game.lasers.forEach((laser) => {
    drawLaser(laser);
  });

  // Draw enemies
  game.enemies.forEach((enemy) => {
    if (enemy.type === 'heavy') {
      drawHeavy(enemy);
    } else if (enemy.type === 'interceptor') {
      drawInterceptor(enemy);
    } else {
      drawEnemy(enemy);
    }
  });

  // Draw boss
  if (game.boss) {
    drawBoss(game.boss);
  }

  // Draw explosions
  game.explosions.forEach((explosion) => {
    drawExplosion(explosion);
  });

  ctx.restore();

  // Draw player ALWAYS at screen center (no camera transformation)
  drawPlayer();

  // Update HUD
  updateHUD();
}

function updateHUD() {
  // Update health bar
  const healthPercent = game.player.health / game.player.maxHealth;
  document.getElementById('healthFill').style.width = healthPercent * 100 + '%';

  // Update score and level
  document.getElementById('score').textContent = game.score;
  document.getElementById('level').textContent = game.level;
}

// Game loop
function gameLoop() {
  if (game.state !== 'playing') return;

  // Update game logic
  updatePlayer();
  updateEnemies();
  updateLasers();
  updatePowerUps();
  updateExplosions();

  // Enemy spawning
  const now = Date.now();
  const config = levelConfigs[(game.level - 1) % levelConfigs.length];

  if (now - game.enemySpawnTimer > config.spawnRate) {
    if (!game.bossActive && game.enemiesKilled < game.enemiesNeededForNextLevel) {
      const newEnemies = spawnEnemy(game.level, game.player, game.enemies, levelConfigs, enemyTypes);
      if (newEnemies) {
        game.enemies = newEnemies;
      }
    }
    game.enemySpawnTimer = now;
  }

  // Boss spawning
  if (game.enemiesKilled >= game.enemiesNeededForNextLevel && !game.bossActive && !game.boss) {
    spawnBoss();
  }

  // Render
  render();

  // Continue loop
  requestAnimationFrame(gameLoop);
}

// Initialize
showMenu();

// Handle window visibility
document.addEventListener('visibilitychange', () => {
  if (document.hidden && game.state === 'playing') {
    togglePause();
  }
});
