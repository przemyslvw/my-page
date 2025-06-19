// Level configurations
export const levelConfigs = [
  {
    name: 'TIE Fighter Assault',
    description: 'Flotilla myśliwców TIE nadciąga! Przygotuj się do walki!',
    enemyTypes: ['tie'],
    spawnRate: 2000,
    maxEnemies: 10,
    bossType: 'tie-boss',
  },
  {
    name: 'Imperial Squadron',
    description: 'Elitarne eskadry Imperium! Uważaj na ich formacje!',
    enemyTypes: ['tie', 'heavy'],
    spawnRate: 1500,
    maxEnemies: 10,
    bossType: 'destroyer',
  },
  {
    name: 'Death Star Approach',
    description: 'Zbliżasz się do Gwiazdy Śmierci. To będzie trudne!',
    enemyTypes: ['tie', 'heavy', 'interceptor'],
    spawnRate: 1000,
    maxEnemies: 30,
    bossType: 'death-star',
  },
];
