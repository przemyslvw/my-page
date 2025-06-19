import { game } from '../gameState.js';
import { canvas, ctx } from '../canvas.js';
import { enemyTypes } from '../enemyTypes.js';

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

export function drawPlayer() {
  // Player is ALWAYS drawn at screen center
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  // Draw health bar above player
  drawHealthBar(centerX, centerY - 55, game.player.health, game.player.maxHealth, 60, '#00ff00');

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(game.player.angle);

  // Draw Millennium Falcon using image
  const falconImage = new Image();
  falconImage.src = 'falcon.png'; // Path to the PNG file
  ctx.drawImage(falconImage, -falconImage.width / 2, -falconImage.height / 2);

  ctx.restore();
}

export function drawEnemy(enemy) {
  ctx.save();
  ctx.translate(enemy.x, enemy.y);
  ctx.rotate(enemy.angle);

  // Draw TIE Fighter
  ctx.fillStyle = '#333333';
  ctx.strokeStyle = '#666666';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, 0, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#444444';
  ctx.fillRect(-15, -5, 30, 10);

  ctx.fillStyle = '#666666';
  ctx.fillRect(-12, -3, 24, 6);

  ctx.fillStyle = '#ff0000';
  ctx.beginPath();
  ctx.arc(0, 0, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  // Health bar
  if (enemy.health < enemy.maxHealth) {
    drawHealthBar(enemy.x, enemy.y - 25, enemy.health, enemy.maxHealth, 30, enemyTypes[enemy.type]?.healthBarColor);
  }
}

export function drawHeavy(enemy) {
  ctx.save();
  ctx.translate(enemy.x, enemy.y);
  ctx.rotate(enemy.angle);
  ctx.fillStyle = '#990000';
  ctx.strokeStyle = '#cc0000';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-15, 0);
  ctx.bezierCurveTo(-10, 10, 10, 10, 15, 0);
  ctx.bezierCurveTo(10, -10, -10, -10, -15, 0);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#ff0000';
  ctx.beginPath();
  ctx.moveTo(-5, 0);
  ctx.bezierCurveTo(0, 5, 5, 5, 10, 0);
  ctx.bezierCurveTo(5, -5, 0, -5, -5, 0);
  ctx.fill();

  ctx.restore();

  // Health bar
  if (enemy.health < enemy.maxHealth) {
    drawHealthBar(enemy.x, enemy.y - 25, enemy.health, enemy.maxHealth, 30, enemyTypes[enemy.type]?.healthBarColor);
  }
}
// draw interceptor
export function drawInterceptor(interceptor) {
  ctx.save();
  ctx.translate(interceptor.x, interceptor.y);
  ctx.rotate(interceptor.angle);

  ctx.fillStyle = '#005500';
  ctx.strokeStyle = '#007700';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-10, 0);
  ctx.lineTo(0, -10);
  ctx.lineTo(10, 0);
  ctx.lineTo(0, 10);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#009900';
  ctx.fillRect(-12, -6, 24, 12);

  ctx.fillStyle = '#00ff00';
  ctx.beginPath();
  ctx.arc(0, 0, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  // Health bar
  if (interceptor.health < interceptor.maxHealth) {
    drawHealthBar(
      interceptor.x,
      interceptor.y - 25,
      interceptor.health,
      interceptor.maxHealth,
      30,
      enemyTypes[interceptor.type]?.healthBarColor
    );
  }
}

export function drawBoss(boss) {
  ctx.save();
  ctx.translate(boss.x, boss.y);
  ctx.rotate(boss.angle);

  // Draw large enemy ship
  ctx.fillStyle = '#444444';
  ctx.strokeStyle = '#666666';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(0, 0, 40, 20, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#666666';
  ctx.beginPath();
  ctx.ellipse(0, 0, 30, 15, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#333333';
  ctx.fillRect(-35, -8, 70, 16);

  // Weapon mounts
  ctx.fillStyle = '#ff0000';
  ctx.beginPath();
  ctx.arc(-20, 0, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(0, 0, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(20, 0, 6, 0, Math.PI * 2);
  ctx.fill();

  // Engine
  ctx.fillStyle = '#ff6600';
  ctx.fillRect(-5, 20, 10, 15);

  ctx.restore();

  // Boss health bar (larger)
  drawHealthBar(boss.x, boss.y - 50, boss.health, boss.maxHealth, 80);
}

// Rysuj laser gracza lub wroga
export function drawLaser(laser) {
  ctx.save();
  ctx.translate(laser.x, laser.y);

  if (laser.type === 'player') {
    // zielony laser gracza
    ctx.fillStyle = '#00ff00';
    ctx.shadowColor = '#00ff00';
    ctx.shadowBlur = 5;
  } else if (laser.type === 'enemy' && laser.enemyType && enemyTypes[laser.enemyType]) {
    // laser przeciwnika z dedykowanym kolorem
    ctx.fillStyle = enemyTypes[laser.enemyType].laserColor;
    ctx.shadowColor = enemyTypes[laser.enemyType].laserColor;
    ctx.shadowBlur = 5;
  } else {
    // domyślny laser wroga
    ctx.fillStyle = '#ff0000';
    ctx.shadowColor = '#ff0000';
    ctx.shadowBlur = 5;
  }

  // rysuj laser
  ctx.fillRect(-1, -2, 5, 5);
  ctx.shadowBlur = 0;
  ctx.restore();
}

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

export function drawHealthBar(x, y, health, maxHealth, width, color = null) {
  const healthPercent = health / maxHealth;

  ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
  ctx.fillRect(x - width / 2, y, width, 6);

  ctx.fillStyle = color ? color : `hsl(${healthPercent * 120}, 100%, 50%)`;
  ctx.fillRect(x - width / 2, y, width * healthPercent, 6);

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 1;
  ctx.strokeRect(x - width / 2, y, width, 6);
}
