// Canvas initialization
export const canvas = document.getElementById('gameCanvas');
export const ctx = canvas.getContext('2d');

// Responsive canvas setup
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);
