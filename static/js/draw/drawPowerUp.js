import { ctx } from '../canvas.js';

export function drawPowerUp(powerup) {
  const bobY = powerup.y + Math.sin(powerup.bobOffset) * 5;

  ctx.save();
  ctx.translate(powerup.x, bobY);

  if (powerup.type === 'damage') {
    // Draw damage powerup (red/black)
    ctx.fillStyle = '#ff4444';
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 2;
    ctx.fillRect(-8, -8, 16, 16);
    ctx.strokeRect(-8, -8, 16, 16);

    ctx.fillStyle = '#ff8888';
    ctx.globalAlpha = 0.7;
    ctx.fillRect(-6, -6, 12, 12);
    ctx.globalAlpha = 1;

    ctx.fillStyle = 'white';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('4x', 0, 0);
  } else if (powerup.type === 'speed') {
    // Draw speed powerup (yellow/black)
    ctx.fillStyle = '#ffcc00';
    ctx.strokeStyle = '#ff9900';
    ctx.lineWidth = 2;
    ctx.fillRect(-8, -8, 16, 16);
    ctx.strokeRect(-8, -8, 16, 16);

    ctx.fillStyle = '#ffdd55';
    ctx.globalAlpha = 0.7;
    ctx.fillRect(-6, -6, 12, 12);
    ctx.globalAlpha = 1;

    ctx.fillStyle = 'white';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⚡', 0, 2);
  } else {
    // Default health powerup (blue)
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
  }

  ctx.restore();
}
