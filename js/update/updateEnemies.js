import { game } from '../gameState.js';
import { createExplosion } from '../spawn/spawn.js';
import { gameOver } from '../gameState.js';
import { spawnPowerUp } from '../spawn/spawn.js';
import { showLevelIntro } from '../index.js';
import { enemyTypes } from '../enemyTypes.js';

export function updateEnemies() {
  // Update regular enemies
  for (let i = game.enemies.length - 1; i >= 0; i--) {
    const enemy = game.enemies[i];
    const dx = game.player.worldX - enemy.x;
    const dy = game.player.worldY - enemy.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Respawn enemy if too far from player
    if (distance > 1000) {
      game.enemies.splice(i, 1);
      // Spawn new enemy near player
      const angle = Math.random() * Math.PI * 2;
      const spawnDistance = 700;
      game.enemies.push({
        x: game.player.worldX + Math.cos(angle) * spawnDistance,
        y: game.player.worldY + Math.sin(angle) * spawnDistance,
        health: enemy.maxHealth,
        maxHealth: enemy.maxHealth,
        angle: 0,
        speed: enemy.speed,
        type: enemy.type,
        lastShot: 0,
        shootCooldown: enemy.shootCooldown,
      });
      continue;
    }

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
    if (now - enemy.lastShot > enemyTypes[enemy.type].shootCooldown && distance < enemyTypes[enemy.type].range) {
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

    // Boss AI - move towards player and face the player
    if (distance > 100) {
      // Keep some distance from the player
      game.boss.x += (dx / distance) * game.boss.speed;
      game.boss.y += (dy / distance) * game.boss.speed;
    }
    game.boss.angle = Math.atan2(dy, dx);

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
      const bossWasActive = game.bossActive;
      game.boss = null;
      game.state = 'pause';
      game.bossActive = false;

      // Level complete
      if (bossWasActive) {
        // Only trigger level complete if boss was actually active
        setTimeout(() => {
          game.level++;
          game.state = 'levelIntro';
          game.boss = null; // Ensure boss is null
          game.bossActive = false; // Ensure boss is not active
          showLevelIntro();
        }, 2000);
      }
    }
  }
}
