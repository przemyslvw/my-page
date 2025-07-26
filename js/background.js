// static/js/background.js

document.addEventListener('DOMContentLoaded', () => {
  const bgMusic = document.getElementById('backgroundMusic');
  const volumeControl = document.getElementById('volumeControl');
  const volumeIcon = document.getElementById('volumeIcon');
  const pauseBtn = document.getElementById('pauseBtn');
  let isMuted = false;
  let currentVolume = 0.1;

  const USER_EVENTS = ['click', 'keydown', 'touchstart', 'mousedown'];

  const setVolumeIcon = (volume, muted) => {
    if (muted || volume === 0) {
      volumeIcon.className = 'fas fa-volume-mute';
    } else if (volume > 0.1) {
      volumeIcon.className = 'fas fa-volume-up';
    } else if (volume > 0) {
      volumeIcon.className = 'fas fa-volume-down';
    } else {
      volumeIcon.className = 'fas fa-volume-off';
    }
  };

  const toggleMute = () => {
    isMuted = !isMuted;
    bgMusic.volume = isMuted ? 0 : currentVolume;
    setVolumeIcon(bgMusic.volume, isMuted);
    volumeControl.style.opacity = isMuted ? '0.5' : '1';
  };

  // Set initial state
  bgMusic.loop = true;
  bgMusic.volume = currentVolume;
  setVolumeIcon(currentVolume, false);

  volumeControl.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMute();
  });

  const playMusic = async () => {
    try {
      if (bgMusic.paused) {
        await bgMusic.play();
        bgMusic.volume = 0.2;
        bgMusic.muted = false;
        isMuted = false;
        setVolumeIcon(bgMusic.volume, false);
      }
    } catch (err) {
      console.error('Audio playback failed:', err);
    } finally {
      USER_EVENTS.forEach(event => document.removeEventListener(event, playMusic));
    }
  };

  USER_EVENTS.forEach(event => document.addEventListener(event, playMusic, { once: true }));

  pauseBtn?.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play().catch(console.error);
    } else {
      bgMusic.pause();
    }
  });
});