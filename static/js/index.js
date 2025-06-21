import { spawnEnemy } from './gameLogic.js';
import { enemyTypes } from './enemyTypes.js';
import { updatePlayer } from './inputController.js';
import { updateEnemies } from './update/updateEnemies.js';
import { updateExplosions } from './update/updateExplosion.js';
import { updateLasers } from './update/updateLaser.js';
import { updatePowerUps } from './update/updatePowerup.js';
import { spawnBoss } from './spawn/spawn.js';
import { drawExplosion } from './draw/drawExplosion.js';
import { drawStars } from './draw/drawStars.js';
import { drawLaser } from './draw/drawLaser.js';
import { drawPowerUp } from './draw/drawPowerUp.js';
import { drawPlayer, drawEnemy, drawHeavy, drawInterceptor, drawBoss } from './draw/draw.js';
import { levelConfigs } from './levelConfigs.js';
import { game } from './gameState.js';
import { preloadGameImages } from './draw/draw.js';

let isImagesLoaded = false;

// Import canvas and context
import { canvas, ctx } from './canvas.js';

// Initialize menu and event listeners when the DOM is fully loaded
async function initMenu() {
  // Wstępne ładowanie obrazów
  try {
    isImagesLoaded = await preloadGameImages();
    console.log('Obrazy załadowane:', isImagesLoaded ? 'sukces' : 'błąd');
  } catch (error) {
    console.error('Błąd podczas wczytywania obrazów:', error);
  }
  // Add event listeners
  const startBtn = document.getElementById('startBtn');
  const restartBtn = document.getElementById('restartBtn');
  const menuBtn = document.getElementById('menuBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const startLevelBtn = document.getElementById('startLevelBtn');
  const skipBtn = document.getElementById('skipBtn');
  const instructionsBtn = document.getElementById('instructionsBtn');
  const backToMenuBtn = document.getElementById('backToMenuBtn');

  if (startBtn) startBtn.addEventListener('click', startGame);
  if (restartBtn) restartBtn.addEventListener('click', restartGame);
  if (menuBtn) menuBtn.addEventListener('click', showMenu);
  if (pauseBtn) pauseBtn.addEventListener('click', togglePause);
  if (startLevelBtn) startLevelBtn.addEventListener('click', startLevel);
  if (skipBtn) skipBtn.addEventListener('click', skipCutscene);
  if (instructionsBtn) instructionsBtn.addEventListener('click', showInstructions);
  if (backToMenuBtn) backToMenuBtn.addEventListener('click', hideInstructions);

  // Initialize the menu
  showMenu();
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', initMenu);

// Game functions
async function startGame() {
  try {
    // Upewnij się, że obrazy są załadowane przed rozpoczęciem gry
    if (!isImagesLoaded) {
      isImagesLoaded = await preloadGameImages();
    }

    game.state = 'levelIntro';
    game.level = 1;
    game.score = 0;
    resetPlayer();
    showLevelIntro();
  } catch (error) {
    console.error('Błąd podczas rozpoczynania gry:', error);
    alert('Wystąpił błąd podczas ładowania gry. Proszę odświeżyć stronę.');
  }
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
  game.enemiesNeededForNextLevel = levelConfigs[(game.level - 1) % levelConfigs.length].maxEnemies;

  // Ensure boss state is fully reset
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

  // Boss spawning - only spawn if we've killed enough enemies, there's no boss active, and we're not in the process of completing the level
  if (
    game.enemiesKilled >= game.enemiesNeededForNextLevel &&
    !game.bossActive &&
    !game.boss &&
    game.state === 'playing'
  ) {
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
