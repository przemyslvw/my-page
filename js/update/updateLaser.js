import { game } from '../gameState.js';
import { gameOver } from '../gameState.js';

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
