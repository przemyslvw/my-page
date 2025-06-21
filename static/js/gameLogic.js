// Game logic functions
export function fireLaser(player, lasers) {
  // Add laser to the game with damage based on player's damage multiplier
  const baseDamage = 5; // Base damage of the laser
  const damage = Math.round(baseDamage * (player.damageMultiplier || 1));
  
  lasers.push({
    x: player.worldX, // Starting position of the laser (player's position)
    y: player.worldY,
    dx: Math.cos(player.angle) * 4, // Laser speed on X axis
    dy: Math.sin(player.angle) * 4, // Laser speed on Y axis
    type: 'player', // Laser type (player)
    damage: damage, // Store the calculated damage
  });

  return lasers;
}

export function spawnEnemy(level, player, enemies, levelConfigs, enemyTypes) {
  const config = levelConfigs[(level - 1) % levelConfigs.length];
  if (enemies.length >= config.maxEnemies) return enemies;

  // Spawn around player but off-screen
  const angle = Math.random() * Math.PI * 2;
  const distance = 700;

  const type = config.enemyTypes[Math.floor(Math.random() * config.enemyTypes.length)];
  const enemyConfig = enemyTypes[type];
  const enemy = {
    x: player.worldX + Math.cos(angle) * distance,
    y: player.worldY + Math.sin(angle) * distance,
    health: enemyConfig.health,
    maxHealth: enemyConfig.health,
    angle: 0,
    speed: enemyConfig.speed,
    type: type,
    lastShot: 0,
    shootCooldown: 500 + Math.random() * 1000,
  };

  // Add enemy to the game
  return [...enemies, enemy];
}
