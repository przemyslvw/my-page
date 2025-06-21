import { ctx } from '../canvas.js';
import { enemyTypes } from '../enemyTypes.js';

// Rysuj laser gracza lub wroga
export function drawLaser(laser) {
  ctx.save();
  ctx.translate(laser.x, laser.y);

  // Ustaw domyślne wartości
  let laserColor = '#ff0000';
  let shadowColor = '#ff0000';
  let shadowBlur = 5;
  let width = 20; // Szerokość lasera (wąski)
  let height = 2; // Wysokość lasera (długość)
  let offsetX = -10; // Przesunięcie X (połowa szerokości)
  let offsetY = -2; // Przesunięcie Y (połowa wysokości)

  if (laser.type === 'player') {
    // zielony laser gracza
    laserColor = '#00ff00';
    shadowColor = '#00ff00';
  } else if (laser.type === 'enemy') {
    // Użyj koloru z obiektu lasera, jeśli jest zdefiniowany, w przeciwnym razie użyj domyślnego koloru wroga
    if (laser.laserColor) {
      laserColor = laser.laserColor;
      shadowColor = laser.laserColor;
    } else if (laser.enemyType && enemyTypes[laser.enemyType]) {
      laserColor = enemyTypes[laser.enemyType].laserColor;
      shadowColor = enemyTypes[laser.enemyType].laserColor;
    }

    // Dostosuj rozmiar lasera jeśli zdefiniowany
    if (laser.width !== undefined && laser.width !== null) {
      height = 2; // Ustawiamy długość lasera
      width = parseFloat(laser.width);
      offsetX = -width / 2;
      offsetY = -height / 2;
    }
  }

  // Ustaw właściwości rysowania
  ctx.fillStyle = laserColor;
  ctx.shadowColor = shadowColor;
  ctx.shadowBlur = shadowBlur;

  // Rysuj laser z uwzględnieniem kierunku ruchu
  const angle = Math.atan2(laser.dy, laser.dx);
  ctx.rotate(angle);

  // Rysuj prostokąt obrócony w kierunku ruchu
  ctx.fillRect(offsetX, offsetY, width, height);

  // Dodatkowy efekt dla potężniejszych laserów
  if (laser.damage > 15) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillRect(offsetX + 1, offsetY + 1, width - 2, height - 2);
  }

  ctx.shadowBlur = 0;
  ctx.restore();
}
