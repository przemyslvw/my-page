import { game } from '../gameState.js';
import { canvas, ctx } from '../canvas.js';

export function drawStars() {
  // Scrolling star field based on camera position
  ctx.fillStyle = 'white';
  for (let i = 0; i < 100; i++) {
    // Create pseudo-random star positions that move with camera
    const starX = ((i * 73 + game.camera.x * 0.1) % (canvas.width + 100)) - 50;
    const starY = ((i * 91 + game.camera.y * 0.1) % (canvas.height + 100)) - 50;
    const size = (i % 3) + 1;
    ctx.fillRect(starX, starY, size, size);
  }

  // Add some distant stars that move slower
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  for (let i = 0; i < 50; i++) {
    const starX = ((i * 127 + game.camera.x * 0.05) % (canvas.width + 200)) - 100;
    const starY = ((i * 163 + game.camera.y * 0.05) % (canvas.height + 200)) - 100;
    ctx.fillRect(starX, starY, 1, 1);
  }
}
