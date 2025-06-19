import { spawnEnemy } from './gameLogic.js';
import { enemyTypes } from './enemyTypes.js';
import { updatePlayer } from './inputController.js';
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

function showLevelIntro() {
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

function gameOver() {
  game.state = 'gameOver';
  document.getElementById('finalScore').textContent = game.score;
  document.getElementById('finalLevel').textContent = game.level;
  document.getElementById('gameOverScreen').classList.remove('hidden');
}

// Game logic

function spawnBoss() {
  if (game.bossActive) return;

  game.bossActive = true;
  const config = levelConfigs[(game.level - 1) % levelConfigs.length];

  game.boss = {
    x: game.player.worldX + 400,
    y: game.player.worldY,
    health: 100,
    maxHealth: 100,
    angle: 0,
    speed: 0.5,
    type: config.bossType,
    lastShot: 0,
    shootCooldown: 500,
    phase: 1,
  };
}

function updateEnemies() {
  // Update regular enemies
  for (let i = game.enemies.length - 1; i >= 0; i--) {
    const enemy = game.enemies[i];
    const dx = game.player.worldX - enemy.x;
    const dy = game.player.worldY - enemy.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Kolizja gracza z wrogiem
    if (distance < 30) {
      createExplosion(game.player.worldX, game.player.worldY, true);
      game.player.health = Math.floor(game.player.health / 2);
      game.enemies.splice(i, 1);
      if (game.player.health <= 0) {
        gameOver();
        return;
      }
      continue;
    }

    // Move towards player
    if (distance > 50) {
      enemy.x += (dx / distance) * enemy.speed;
      enemy.y += (dy / distance) * enemy.speed;
    }
    enemy.angle = Math.atan2(dy, dx);

    // Enemy shooting
    const now = Date.now();
    if (now - enemy.lastShot > enemy.shootCooldown && distance < 400) {
      game.lasers.push({
        x: enemy.x,
        y: enemy.y,
        dx: Math.cos(enemy.angle) * 6,
        dy: Math.sin(enemy.angle) * 6,
        type: 'enemy',
        enemyType: enemy.type,
      });
      enemy.lastShot = now;
    }

    // Remove dead enemies
    if (enemy.health <= 0) {
      createExplosion(enemy.x, enemy.y);
      game.enemies.splice(i, 1);
      game.score += 100;
      game.enemiesKilled++;
      // Chance to spawn power-up
      if (Math.random() < 0.3) {
        spawnPowerUp(enemy.x, enemy.y);
      }
      continue;
    }
  }

  // Update boss
  if (game.boss) {
    const dx = game.player.worldX - game.boss.x;
    const dy = game.player.worldY - game.boss.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Boss AI - circle around player
    game.boss.angle += 0.02;
    game.boss.x += Math.cos(game.boss.angle) * game.boss.speed;
    game.boss.y += Math.sin(game.boss.angle) * game.boss.speed;

    // Boss shooting
    const now = Date.now();
    if (now - game.boss.lastShot > game.boss.shootCooldown) {
      // Multi-directional shots
      for (let i = 0; i < 3; i++) {
        const angle = Math.atan2(dy, dx) + (i - 1) * 0.3;
        game.lasers.push({
          x: game.boss.x,
          y: game.boss.y,
          dx: Math.cos(angle) * 6,
          dy: Math.sin(angle) * 6,
          type: 'enemy',
        });
      }
      game.boss.lastShot = now;
    }

    // Boss defeated
    if (game.boss.health <= 0) {
      createExplosion(game.boss.x, game.boss.y, true);
      game.score += 1000;
      game.boss = null;
      game.bossActive = false;

      // Level complete
      setTimeout(() => {
        game.level++;
        game.state = 'levelIntro';
        showLevelIntro();
      }, 2000);
    }
  }
}

function updateLasers() {
  game.lasers.forEach((laser, index) => {
    laser.x += laser.dx;
    laser.y += laser.dy;

    // Remove off-screen lasers (relative to player position)
    const relativeX = laser.x - game.player.worldX;
    const relativeY = laser.y - game.player.worldY;

    if (Math.abs(relativeX) > 800 || Math.abs(relativeY) > 600) {
      game.lasers.splice(index, 1);
      return;
    }

    // Collision detection
    if (laser.type === 'player') {
      // Sprawdź kolizje z wrogami
      game.enemies.forEach((enemy) => {
        const dx = laser.x - enemy.x;
        const dy = laser.y - enemy.y;
        if (Math.sqrt(dx * dx + dy * dy) < 20) {
          // Zadaj obra enie wrogowi
          enemy.health -= 5;
          // Usu  laser
          game.lasers.splice(index, 1);
        }
      });

      // Check collision with boss
      if (game.boss) {
        const dx = laser.x - game.boss.x;
        const dy = laser.y - game.boss.y;
        if (Math.sqrt(dx * dx + dy * dy) < 40) {
          game.boss.health -= 10;
          game.lasers.splice(index, 1);
        }
      }
    } else if (laser.type === 'enemy') {
      // Check collision with player
      const dx = laser.x - game.player.worldX;
      const dy = laser.y - game.player.worldY;
      if (Math.sqrt(dx * dx + dy * dy) < 25) {
        game.player.health -= 10;
        game.lasers.splice(index, 1);

        if (game.player.health <= 0) {
          gameOver();
        }
      }
    }
  });
}

function spawnPowerUp(x, y) {
  game.powerups.push({
    x: x,
    y: y,
    type: 'health',
    bobOffset: Math.random() * Math.PI * 2,
  });
}

function updatePowerUps() {
  game.powerups.forEach((powerup, index) => {
    // Bobbing animation
    powerup.bobOffset += 0.1;

    // Check collision with player
    const dx = powerup.x - game.player.worldX;
    const dy = powerup.y - game.player.worldY;

    if (Math.sqrt(dx * dx + dy * dy) < 30) {
      if (powerup.type === 'health') {
        game.player.health = Math.min(game.player.maxHealth, game.player.health + 25);
      }
      game.powerups.splice(index, 1);
      game.score += 50;
    }
  });
}

function createExplosion(x, y, large = false) {
  for (let i = 0; i < (large ? 15 : 8); i++) {
    game.explosions.push({
      x: x + (Math.random() - 0.5) * (large ? 80 : 40),
      y: y + (Math.random() - 0.5) * (large ? 80 : 40),
      life: 30,
      maxLife: 30,
      size: large ? Math.random() * 15 + 10 : Math.random() * 8 + 5,
    });
  }
}

function updateExplosions() {
  game.explosions.forEach((explosion, index) => {
    explosion.life--;
    if (explosion.life <= 0) {
      game.explosions.splice(index, 1);
    }
  });
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
