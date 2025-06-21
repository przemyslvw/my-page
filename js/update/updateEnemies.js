import { game } from '../gameState.js';
import { createExplosion } from '../spawn/spawn.js';
import { gameOver } from '../gameState.js';
import { spawnPowerUp } from '../spawn/spawn.js';
import { showLevelIntro } from '../index.js';
import { bossTypes, enemyTypes } from '../enemyTypes.js';

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
      game.player.health -= Math.floor(game.player.maxHealth / 2);
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
      // Chance to spawn power-up (decreases with level)
      const baseChance = 0.3; // 30% base chance
      const levelPenalty = Math.min(0.05 * (game.level - 1), 0.25); // 5% less per level, max 25% reduction
      const dropChance = Math.max(baseChance - levelPenalty, 0.05); // Never go below 5%

      if (Math.random() < dropChance) {
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
      // Move faster when far from player
      const currentSpeed = distance > 600 ? game.boss.speed * 5 : game.boss.speed;
      game.boss.x += (dx / distance) * currentSpeed;
      game.boss.y += (dy / distance) * currentSpeed;
    }
    game.boss.angle = Math.atan2(dy, dx);

    // Boss shooting
    const now = Date.now();
    if (now - game.boss.lastShot > game.boss.shootCooldown) {
      const bossType = bossTypes[game.boss.type];

      switch (game.boss.attackPattern) {
        case 'single':
          // Single powerful shot
          game.lasers.push({
            x: game.boss.x,
            y: game.boss.y,
            dx: Math.cos(game.boss.angle) * 8,
            dy: Math.sin(game.boss.angle) * 8,
            type: 'enemy',
            damage: 20, // More damage for single shot
            laserColor: bossType.laserColor,
            width: 20,
          });
          break;

        case 'spread':
          // Spread shot (3-way)
          for (let i = -1; i <= 1; i++) {
            const angle = game.boss.angle + i * 0.3;
            game.lasers.push({
              x: game.boss.x,
              y: game.boss.y,
              dx: Math.cos(angle) * 6,
              dy: Math.sin(angle) * 6,
              type: 'enemy',
              damage: 25,
              laserColor: bossType.laserColor,
              width: 20,
            });
          }
          break;

        case 'barrage':
          // Standard barrage for bosses (5 shots in quick succession)
          for (let i = 0; i < 5; i++) {
            const spread = (Math.random() - 0.5) * 1; // Slight spread
            const angle = game.boss.angle + spread;

            // Stagger the shots slightly for visual effect
            setTimeout(() => {
              if (game.boss) {
                // Check if boss still exists
                game.lasers.push({
                  x: game.boss.x,
                  y: game.boss.y,
                  dx: Math.cos(angle) * 7,
                  dy: Math.sin(angle) * 7,
                  type: 'enemy',
                  damage: 30,
                  laserColor: bossType.laserColor,
                  width: 20,
                });
              }
            }, i * 50); // 50ms between shots
          }
          break;

        case 'super-barrage':
          // Death Star's super spread attack - 21 shots in a very wide arc
          for (let i = -10; i <= 10; i++) {
            const angle = game.boss.angle + i * 0.25; // Wider spread with more projectiles

            setTimeout(() => {
              if (game.boss) {
                game.lasers.push({
                  x: game.boss.x,
                  y: game.boss.y,
                  dx: Math.cos(angle) * 8, // Slightly faster
                  dy: Math.sin(angle) * 8,
                  type: 'enemy',
                  damage: 35, // More damage per shot
                  laserColor: bossType.laserColor,
                  width: 20, // Thicker lasers
                  // Add a special effect property for the super attack
                  isSuperLaser: true,
                });

                // Add a visual effect for each super laser
                createExplosion(game.boss.x, game.boss.y, false, 0.5);
              }
            }, (i + 4) * 50); // Stagger the shots for dramatic effect
          }
          break;

        default:
          // Default pattern (similar to spread but with 5 shots)
          for (let i = -2; i <= 2; i++) {
            const angle = game.boss.angle + i * 0.2;
            game.lasers.push({
              x: game.boss.x,
              y: game.boss.y,
              dx: Math.cos(angle) * 6,
              dy: Math.sin(angle) * 6,
              type: 'enemy',
              damage: 20,
              width: 20,
              laserColor: bossType.laserColor,
            });
          }
      }

      game.boss.lastShot = now;
    }

    // Boss defeated
    if (game.boss.health <= 0) {
      createExplosion(game.boss.x, game.boss.y, true);
      game.score += bossTypes[game.boss.type].points;
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
