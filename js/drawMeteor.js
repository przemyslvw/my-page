function drawMeteor(meteor) {
  const screenX = meteor.x - game.camera.x + canvas.width / 2;
  const screenY = meteor.y - game.camera.y + canvas.height / 2;

  // Skip drawing if off-screen
  if (screenX < -100 || screenX > canvas.width + 100 || screenY < -100 || screenY > canvas.height + 100) {
    return;
  }

  ctx.save();
  ctx.translate(screenX, screenY);
  ctx.rotate(meteor.rotation);

  // Meteor body
  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 20);
  gradient.addColorStop(0, '#A0522D');
  gradient.addColorStop(1, '#8B4513');

  ctx.fillStyle = gradient;

  // Draw irregular oval shape
  ctx.beginPath();
  const width = 30;
  const height = 25;
  const points = 8;

  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const radius = (i % 2 === 0 ? 0.8 : 1.2) * (width / 2);
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * (height / 2) * 0.8;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.closePath();
  ctx.fill();

  // Add some craters
  ctx.fillStyle = '#704214';
  for (let i = 0; i < 3; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * (width / 2) * 0.6;
    const craterX = Math.cos(angle) * dist;
    const craterY = Math.sin(angle) * dist * 0.8;
    const craterSize = 2 + Math.random() * 3;

    ctx.beginPath();
    ctx.arc(craterX, craterY, craterSize, 0, Math.PI * 2);
    ctx.fill();
  }

  // Add a glowing effect
  const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 30);
  glowGradient.addColorStop(0, 'rgba(255, 165, 0, 0.7)');
  glowGradient.addColorStop(1, 'rgba(255, 165, 0, 0)');

  ctx.fillStyle = glowGradient;
  ctx.beginPath();
  ctx.arc(0, 0, 30, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  // Draw health bar if not at full health
  if (meteor.health < meteor.maxHealth) {
    drawHealthBar(screenX, screenY - 25, meteor.health, meteor.maxHealth, 30, enemyTypes.meteor.healthBarColor);
  }
}
