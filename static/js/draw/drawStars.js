import { game } from '../gameState.js';
import { canvas, ctx } from '../canvas.js';

// Star data structure to maintain star properties between frames
const stars = [];
const STAR_COUNT = 400;

// Initialize stars with random properties
function initStars() {
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random(), // Depth (0 = near, 1 = far)
      size: Math.random() * 0.5 + 0.0001,
      baseBrightness: Math.random() * 1 + 1, // Base brightness (0.2 to 1.0)
      twinkleSpeed: Math.random() * 1 + 0.1, // How fast the star twinkles (increased speed)
      twinkleOffset: Math.random() * 2, // Random phase for twinkling
      color: getRandomStarColor(),
      parallaxFactor: 0.1 + Math.random() * 0.9, // How much the star moves with camera (0.1 = far, 1.0 = near)
    });
  }
}

// Generate a random star color (mostly white/blue/white-yellow)
function getRandomStarColor() {
  const colors = [
    { r: 255, g: 255, b: 255 }, // White
    { r: 255, g: 252, b: 220 }, // Warm white
    { r: 200, g: 220, b: 255 }, // Cool white
    { r: 200, g: 200, b: 255 }, // Blue-white
    { r: 255, g: 200, b: 200 }, // Red-white
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Draw a single star with twinkling effect
function drawStar(star, time) {
  // Calculate twinkling effect
  // More pronounced twinkling effect
  const twinkle = (Math.sin(time * star.twinkleSpeed + star.twinkleOffset) + 1) * 0.5;
  // Increase the twinkle intensity (from 0.7-1.3 to 0.5-1.5 range)
  const brightness = star.baseBrightness * (0.5 + twinkle);

  // Calculate position with parallax
  const parallaxX = game.camera.x * (1 - star.parallaxFactor);
  const parallaxY = game.camera.y * (1 - star.parallaxFactor);

  let x = (star.x + parallaxX) % (canvas.width * 1.5);
  if (x < -canvas.width * 0.5) x += canvas.width * 1.5;

  let y = (star.y + parallaxY) % (canvas.height * 1.5);
  if (y < -canvas.height * 0.5) y += canvas.height * 1.5;

  // Draw star glow for brighter stars
  if (brightness > 0.6) {
    // More dynamic glow effect
    const glowIntensity = 0.7 + Math.sin(time * 0.003) * 0.3;
    const glowRadius = star.size * 2;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowRadius * 3);
    gradient.addColorStop(0, `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${brightness * 0.7})`);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, glowRadius * 3, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw star core
  ctx.fillStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${brightness})`;
  ctx.beginPath();
  ctx.arc(x, y, star.size * 0.5, 0, Math.PI * 2);
  ctx.fill();
}

export function drawStars() {
  // Initialize stars if needed
  if (stars.length === 0) {
    initStars();
  }

  const time = Date.now();

  // Draw a dark gradient background for space
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#00081A'); // Dark blue-black
  gradient.addColorStop(1, '#000000'); // Pure black

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw all stars
  stars.forEach((star) => drawStar(star, time));
}
