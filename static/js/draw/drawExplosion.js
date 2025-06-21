import { ctx } from '../canvas.js';

export function drawExplosion(explosion) {
  const alpha = explosion.life / explosion.maxLife;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = `hsl(${30 + Math.random() * 30}, 100%, 60%)`;
  ctx.shadowColor = ctx.fillStyle;
  ctx.shadowBlur = explosion.size;
  ctx.beginPath();
  ctx.arc(explosion.x, explosion.y, explosion.size * alpha, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.restore();
}
