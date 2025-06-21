import { game } from '../gameState.js';

export function updatePowerUps() {
  game.powerups.forEach((powerup, index) => {
    // Bobbing animation
    powerup.bobOffset += 0.1;

    // Check collision with player
    const dx = powerup.x - game.player.worldX;
    const dy = powerup.y - game.player.worldY;

    if (Math.sqrt(dx * dx + dy * dy) < 30) {
      if (powerup.type === 'health') {
        game.player.health = Math.min(game.player.maxHealth, game.player.health + 25);
      } else if (powerup.type === 'damage') {
        // Activate double damage
        game.player.damageMultiplier = 4;
        // Reset damage multiplier after 10 seconds
        setTimeout(() => {
          if (game.player.damageMultiplier === 4) {
            game.player.damageMultiplier = 1;
          }
        }, 10000);
      }
      game.powerups.splice(index, 1);
      game.score += 50;
    }
  });
}
