import { game } from '../gameState.js';
import { gameOver } from '../gameState.js';
import { createExplosion } from '../spawn/spawn.js';

export function updateLasers() {
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
          // Zadaj obrażenia wrogowi z uwzględnieniem wartości damage lasera
          const damage = laser.damage || 5;
          enemy.health -= damage;
          // Usuń laser
          game.lasers.splice(index, 1);
        }
      });

      // Check collision with boss
      if (game.boss) {
        const dx = laser.x - game.boss.x;
        const dy = laser.y - game.boss.y;
        if (Math.sqrt(dx * dx + dy * dy) < 40) {
          // Use the laser's damage property if it exists, otherwise default to 10
          const damage = laser.damage || 10;
          game.boss.health -= damage;
          game.lasers.splice(index, 1);
          
          // Visual feedback for critical hits
          if (damage > 15) {
            // Add a bigger explosion for powerful hits
            createExplosion(laser.x, laser.y, true);
          }
        }
      }
    } else if (laser.type === 'enemy') {
      // Check collision with player
      const dx = laser.x - game.player.worldX;
      const dy = laser.y - game.player.worldY;
      if (Math.sqrt(dx * dx + dy * dy) < 25) {
        // Use the laser's damage property if it exists, otherwise default to 10
        const damage = laser.damage || 10;
        game.player.health -= damage;
        game.lasers.splice(index, 1);

        // Visual feedback for hit
        createExplosion(laser.x, laser.y, damage > 15);

        if (game.player.health <= 0) {
          gameOver();
        }
      }
    }
  });
}
