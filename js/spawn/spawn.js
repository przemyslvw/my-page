import { game } from '../gameState.js';
import { levelConfigs } from '../levelConfigs.js';

export function spawnBoss() {
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
