import { game } from '../gameState.js';

export function updateExplosions() {
  game.explosions.forEach((explosion, index) => {
    explosion.life--;
    if (explosion.life <= 0) {
      game.explosions.splice(index, 1);
    }
  });
}
