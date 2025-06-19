// Initialize background music
document.addEventListener('DOMContentLoaded', () => {
  const bgMusic = document.getElementById('backgroundMusic');
  const volumeControl = document.getElementById('volumeControl');
  const volumeIcon = document.getElementById('volumeIcon');
  let isMuted = false;

  // Configure audio
  bgMusic.loop = true;
  bgMusic.volume = 0.1; // Set volume to 10%
  let currentVolume = 0.1;

  // Toggle mute function
  const toggleMute = () => {
    isMuted = !isMuted;
    if (isMuted) {
      bgMusic.volume = 0;
      volumeIcon.className = 'fas fa-volume-mute';
    } else {
      bgMusic.volume = currentVolume;
      volumeIcon.className =
        currentVolume > 0.1 ? 'fas fa-volume-up' : currentVolume > 0 ? 'fas fa-volume-down' : 'fas fa-volume-off';
    }
    volumeControl.style.opacity = isMuted ? '0.5' : '1';
  };

  // Set initial icon based on volume
  volumeIcon.className = 'fas fa-volume-off'; // 25% volume

  // Volume control click handler
  volumeControl.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMute();
  });

  // Try to play music when user interacts with the page
  const playMusic = async () => {
    try {
      if (bgMusic.paused) {
        await bgMusic.play();
        bgMusic.volume = 0.2;
        bgMusic.muted = false;
        isMuted = false;
        volumeIcon.className = 'fas fa-volume-up';
      }
    } catch (err) {
      console.log('Audio playback failed:', err);
    }

    // Remove event listeners after first interaction
    ['click', 'keydown', 'touchstart', 'mousedown'].forEach((event) => {
      document.removeEventListener(event, playMusic);
    });
  };

  // Add event listeners for user interaction
  ['click', 'keydown', 'touchstart', 'mousedown'].forEach((event) => {
    document.addEventListener(event, playMusic, { once: true });
  });

  // Pause music when game is paused
  document.getElementById('pauseBtn')?.addEventListener('click', () => {
    if (!bgMusic.paused) {
      bgMusic.pause();
    } else {
      bgMusic.play().catch(console.error);
    }
  });
});
