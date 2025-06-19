import { game } from '../gameState.js';
import { levelConfigs } from '../levelConfigs.js';
import { bossTypes } from '../enemyTypes.js';

/**
 * Spawns a boss enemy based on the current level configuration.
 * The boss's type and attributes are determined by the level configuration.
 * Only one boss can be active at a time.
 *
 * @returns {void}
 */
export function spawnBoss() {
  if (game.bossActive) return;

  game.bossActive = true;
  const config = levelConfigs[(game.level - 1) % levelConfigs.length];
  const bossConfig = bossTypes[config.bossType] || bossTypes['tie-boss'];

  game.boss = {
    x: game.player.worldX + 600,
    y: game.player.worldY,
    health: bossConfig.health,
    maxHealth: bossConfig.health,
    angle: 0,
    speed: bossConfig.speed,
    type: config.bossType,
    name: bossConfig.name,
    laserColor: bossConfig.laserColor,
    healthBarColor: bossConfig.healthBarColor,
    lastShot: 0,
    shootCooldown: bossConfig.shootCooldown,
    phase: 1,
    points: bossConfig.points,
    attackPattern: bossConfig.attackPattern,
    image: bossConfig.image,
  };
}

export function spawnPowerUp(x, y) {
  game.powerups.push({
    x: x,
    y: y,
    type: 'health',
    bobOffset: Math.random() * Math.PI * 2,
  });
}

export function createExplosion(x, y, large = false) {
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
