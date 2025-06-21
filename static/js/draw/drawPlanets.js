import { game } from '../gameState.js';
import { canvas, ctx } from '../canvas.js';

// Initialize planets if they don't exist
export function initPlanets() {
  if (!game.planets) {
    game.planets = [];

    for (let i = 0; i < 12; i++) {
      game.planets.push({
        x: Math.random() * 10000 - 5000, // Random position in world space
        y: Math.random() * 10000 - 5000,
        radius: 30 + Math.random() * 70, // Random size between 30-100
        color: getRandomPlanetColor(),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.002,
        parallax: 0.3 + Math.random() * 0.4, // Parallax effect (0-1, lower = further away)
        hasRing: i % 3 === 0, // Every 3rd planet has a ring
        ringRadius: 0,
        ringColor: '',
      });

      // Set ring properties if planet has one
      const planet = game.planets[i];
      if (planet.hasRing) {
        planet.ringRadius = planet.radius * 1.5;
        planet.ringColor = getRandomRingColor();
      }
    }
  }
}

function getRandomPlanetColor() {
  const colors = [
    '#666666', // Dark gray
    '#786C3B', // Dark brown
    '#1E865E', // Dark green
    '#C39800', // Dark yellow
    '#2E4053', // Dark blue
    '#E67E73', // Dark pink
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomRingColor() {
  const colors = [
    '#d4af37', // Gold
    '#c0c0c0', // Silver
    '#cd7f32', // Bronze
    '#a9a9a9', // Dark gray
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export function drawPlanets() {
  if (!game.planets) return;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  game.planets.forEach((planet) => {
    // Calculate screen position with parallax effect
    const screenX = centerX + (planet.x - game.camera.x) * planet.parallax;
    const screenY = centerY + (planet.y - game.camera.y) * planet.parallax;

    // Only draw if planet is on or near the screen
    if (
      screenX + planet.radius > 0 &&
      screenX - planet.radius < canvas.width &&
      screenY + planet.radius > 0 &&
      screenY - planet.radius < canvas.height
    ) {
      // Save context
      ctx.save();

      // Draw planet
      ctx.beginPath();
      ctx.arc(screenX, screenY, planet.radius, 0, Math.PI * 2);
      ctx.fillStyle = planet.color;
      ctx.fill();

      // Add some details
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(
        screenX - planet.radius * 0.3,
        screenY - planet.radius * 0.2,
        planet.radius * 0.8,
        planet.radius * 0.6,
        planet.rotation,
        0,
        Math.PI * 2
      );
      ctx.stroke();

      // Draw ring if planet has one
      if (planet.hasRing) {
        ctx.save();
        ctx.translate(screenX, screenY);
        ctx.rotate(planet.rotation);

        // Ring shadow
        ctx.beginPath();
        ctx.ellipse(0, 0, planet.ringRadius, planet.ringRadius * 0.3, 0, 0, Math.PI * 2);
        const gradient = ctx.createLinearGradient(0, -planet.radius * 0.2, 0, planet.radius * 0.2);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.5, planet.ringColor);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.7;
        ctx.fill();

        // Ring highlight
        ctx.beginPath();
        ctx.ellipse(0, -planet.radius * 0.1, planet.ringRadius * 0.9, planet.ringRadius * 0.25, 0, 0, Math.PI);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
      }

      // Update rotation
      planet.rotation += planet.rotationSpeed;

      // Restore context
      ctx.restore();
    }
  });
}
