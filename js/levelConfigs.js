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
    spawnRate: 1900,
    maxEnemies: 15,
    bossType: 'destroyer',
  },
  {
    name: 'Death Star Approach',
    description: 'Ostatnia linia obrony! Star Destroyer!',
    enemyTypes: ['tie', 'interceptor', 'heavy'],
    spawnRate: 1800,
    maxEnemies: 20,
    bossType: 'star-destroyer',
  },
  {
    name: 'Imperial Fleet',
    description: 'Zbliżasz się do Gwiazdy Śmierci. To będzie trudne!',
    enemyTypes: ['tie', 'condor', 'interceptor'],
    spawnRate: 1700,
    maxEnemies: 30,
    bossType: 'death-star',
  },
];
