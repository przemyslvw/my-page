import { game } from '../gameState.js';
import { createExplosion } from '../spawn/spawn.js';
import { gameOver } from '../gameState.js';
import { spawnPowerUp } from '../spawn/spawn.js';
import { showLevelIntro } from '../index.js';

export function updateEnemies() {
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
