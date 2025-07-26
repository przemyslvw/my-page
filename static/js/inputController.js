// --- Imports ---
import { game } from './gameState.js';
import { canvas } from './canvas.js';
import { fireLaser } from './gameLogic.js';

// --- Global State ---
const keys = {};
let mouseX = 0;
let mouseY = 0;

// --- Keyboard Input ---
document.addEventListener('keydown', e => {
  keys[e.key.toLowerCase()] = true;
});
document.addEventListener('keyup', e => {
  keys[e.key.toLowerCase()] = false;
});

function updateKeyboardToJoystick() {
  // Map WSAD/Arrow keys to joystick.x/y
  let x = 0, y = 0;
  if (keys['w'] || keys['arrowup']) y -= 1;
  if (keys['s'] || keys['arrowdown']) y += 1;
  if (keys['a'] || keys['arrowleft']) x -= 1;
  if (keys['d'] || keys['arrowright']) x += 1;

  // Normalize
  if (x !== 0 || y !== 0) {
    const len = Math.sqrt(x * x + y * y);
    x /= len;
    y /= len;
  }
  // Only update if not using touch/mouse joystick
  if (!game.joystick.active) {
    game.joystick.x = x;
    game.joystick.y = y;
  }
}

// --- Gamepad Input ---
function pollGamepadToJoystick() {
  const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
  if (!gamepads) return;
  for (const gp of gamepads) {
    if (gp && gp.connected) {
      let x = gp.axes[0] || 0;
      let y = gp.axes[1] || 0;
      if (Math.abs(x) < 0.15) x = 0;
      if (Math.abs(y) < 0.15) y = 0;
      if ((x !== 0 || y !== 0) && !game.joystick.active) {
        game.joystick.x = x;
        game.joystick.y = y;
      }
      break; // Only first connected pad
    }
  }
}

// --- Input Integration Loop ---
function inputIntegrationLoop() {
  updateKeyboardToJoystick();
  pollGamepadToJoystick();
  requestAnimationFrame(inputIntegrationLoop);
}
inputIntegrationLoop();

// --- Touch/Mouse Joystick ---
const joystickElement = document.getElementById('joystick');
const knobElement = document.getElementById('joystickKnob');

function handleJoystickStart(e) {
  game.joystick.active = true;
  updateJoystick(e);
}
function handleJoystickMove(e) {
  if (game.joystick.active) updateJoystick(e);
}
function handleJoystickEnd() {
  game.joystick.active = false;
  game.joystick.x = 0;
  game.joystick.y = 0;
  knobElement.style.transform = 'translate(-50%, -50%)';
  // Reset mouse position to (0,0) when joystick is released
  mouseX = 0;
  mouseY = 0;
}

function updateJoystick(e) {
  const rect = joystickElement.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  let clientX, clientY;
  if (e.touches && e.touches[0]) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else if (typeof e.clientX === 'number' && typeof e.clientY === 'number') {
    clientX = e.clientX;
    clientY = e.clientY;
  } else {
    return; // brak danych o pozycji
  }

  const deltaX = clientX - centerX;
  const deltaY = clientY - centerY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const maxDistance = game.joystick.radius / 2;

  if (distance <= maxDistance) {
    game.joystick.x = (deltaX / maxDistance) * 0.8;
    game.joystick.y = (deltaY / maxDistance) * 0.8;
    knobElement.style.transform = `translate(${deltaX - 25}px, ${deltaY - 25}px)`;
  } else {
    const angle = Math.atan2(deltaY, deltaX);
    game.joystick.x = Math.cos(angle);
    game.joystick.y = Math.sin(angle);
    knobElement.style.transform = `translate(${Math.cos(angle) * maxDistance - 25}px, ${Math.sin(angle) * maxDistance - 25}px)`;
  }
}

// --- Joystick Event Listeners ---
joystickElement.addEventListener('touchstart', handleJoystickStart);
joystickElement.addEventListener('touchmove', handleJoystickMove);
joystickElement.addEventListener('touchend', handleJoystickEnd);
joystickElement.addEventListener('mousedown', handleJoystickStart);
document.addEventListener('mousemove', handleJoystickMove);
document.addEventListener('mouseup', handleJoystickEnd);

// --- Mouse Tracking ---
document.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  if (game.joystick.active) {
    // When joystick is active, force mouse position to (0,0)
    mouseX = 0;
    mouseY = 0;
  } else {
    // Only update mouse position if joystick is not active
    mouseX = e.clientX - rect.left + game.camera.x;
    mouseY = e.clientY - rect.top + game.camera.y;
  }
});

// --- Player Update Logic ---
export function updatePlayer() {
  // Aktualizuj pozycje gracza w przestrzeni swiata na podstawie joysticka/klawiatury/pada
  if (game.joystick.active || game.joystick.x !== 0 || game.joystick.y !== 0) {
    game.player.worldX += game.joystick.x * game.player.maxSpeed;
    game.player.worldY += game.joystick.y * game.player.maxSpeed;
  } else if (keys['w'] || keys['arrowup']) {
    game.player.worldY -= game.player.maxSpeed;
  } else if (keys['s'] || keys['arrowdown']) {
    game.player.worldY += game.player.maxSpeed;
  }
  if (keys['a'] || keys['arrowleft']) {
    game.player.worldX -= game.player.maxSpeed;
  } else if (keys['d'] || keys['arrowright']) {
    game.player.worldX += game.player.maxSpeed;
  }

  // Kamera zawsze sledzi pozycje gracza w przestrzeni swiata
  game.camera.x = game.player.worldX - canvas.width / 2;
  game.camera.y = game.player.worldY - canvas.height / 2;

  // --- AUTO-AIM: jeśli pozycja myszy to (0,0), auto-namierzanie na najbliższego wroga ---
  if (mouseX === 0 && mouseY === 0) {
    let nearestEnemy = null;
    let nearestDistance = Infinity;
    [...game.enemies, game.boss].filter(Boolean).forEach(enemy => {
      const dx = enemy.x - game.player.worldX;
      const dy = enemy.y - game.player.worldY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestEnemy = enemy;
      }
    });
    if (nearestEnemy) {
      const dx = nearestEnemy.x - game.player.worldX;
      const dy = nearestEnemy.y - game.player.worldY;
      game.player.angle = Math.atan2(dy, dx);
      // AUTO-SHOOT
      const now = Date.now();
      const healthMultiplier = game.player.health < game.player.maxHealth / 2 ? 1.5 : 3;
      const shootCooldownMultiplier = game.player.shootCooldownMultiplier || 1;
      const totalCooldown = game.shootCooldown * healthMultiplier * shootCooldownMultiplier;
      if (now - game.lastShot > totalCooldown) {
        game.lasers = fireLaser(game.player, game.lasers);
        game.lastShot = now;
      }
    }
  } else {
    // --- MANUAL-AIM: jeśli pozycja myszy różna od (0,0), celowanie myszą ---
    const dx = mouseX - game.player.worldX;
    const dy = mouseY - game.player.worldY;
    game.player.angle = Math.atan2(dy, dx);
    // AUTO-SHOOT
    const now = Date.now();
    const healthMultiplier = game.player.health < game.player.maxHealth / 2 ? 1.5 : 3;
    const shootCooldownMultiplier = game.player.shootCooldownMultiplier || 1;
    const totalCooldown = game.shootCooldown * healthMultiplier * shootCooldownMultiplier;
    if (now - game.lastShot > totalCooldown) {
      game.lasers = fireLaser(game.player, game.lasers);
      game.lastShot = now;
    }
  }
}
