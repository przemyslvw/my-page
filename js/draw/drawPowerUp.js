import { ctx } from '../canvas.js';

export function drawPowerUp(powerup) {
  const bobY = powerup.y + Math.sin(powerup.bobOffset) * 5;

  ctx.save();
  ctx.translate(powerup.x, bobY);

  ctx.fillStyle = '#0088ff';
  ctx.strokeStyle = '#00ccff';
  ctx.lineWidth = 2;
  ctx.fillRect(-8, -8, 16, 16);
  ctx.strokeRect(-8, -8, 16, 16);

  ctx.fillStyle = '#00ccff';
  ctx.globalAlpha = 0.7;
  ctx.fillRect(-6, -6, 12, 12);
  ctx.globalAlpha = 1;

  ctx.fillStyle = 'white';
  ctx.font = 'bold 12px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('+', 0, 0);

  ctx.restore();
}
