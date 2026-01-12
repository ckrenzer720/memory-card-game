/**
 * Sound Effects Management
 * Handles audio feedback for game actions
 * Uses Web Audio API for better performance and control
 */

// Audio context for sound generation
let audioContext = null;

/**
 * Initialize audio context (lazy loading)
 */
function initAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

/**
 * Generate a beep sound using Web Audio API
 * @param {number} frequency - Frequency in Hz
 * @param {number} duration - Duration in milliseconds
 * @param {string} type - Wave type ('sine', 'square', 'triangle', 'sawtooth')
 */
function playBeep(frequency, duration, type = 'sine') {
  try {
    const ctx = initAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    // Envelope for smooth sound
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration / 1000);
  } catch (error) {
    // Silently fail if audio is not supported or user hasn't interacted
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Audio playback failed:', error);
    }
  }
}

/**
 * Play match sound (successful match)
 */
export function playMatchSound() {
  // Play two ascending notes
  playBeep(523.25, 100, 'sine'); // C5
  setTimeout(() => {
    playBeep(659.25, 150, 'sine'); // E5
  }, 100);
}

/**
 * Play mismatch sound (cards don't match)
 */
export function playMismatchSound() {
  // Play a lower, shorter note
  playBeep(220, 200, 'sine'); // A3
}

/**
 * Play win sound (game completed)
 */
export function playWinSound() {
  // Play a celebratory sequence
  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  notes.forEach((freq, index) => {
    setTimeout(() => {
      playBeep(freq, 200, 'sine');
    }, index * 150);
  });
}

/**
 * Play card flip sound
 */
export function playFlipSound() {
  // Subtle click sound
  playBeep(800, 50, 'square');
}

/**
 * Check if audio is enabled (user preference)
 * Can be extended to check localStorage or user settings
 */
export function isAudioEnabled() {
  // Check localStorage for user preference
  const audioPref = localStorage.getItem('memoryGameAudio');
  if (audioPref !== null) {
    return audioPref === 'true';
  }
  // Default to enabled
  return true;
}

/**
 * Toggle audio on/off
 */
export function toggleAudio() {
  const current = isAudioEnabled();
  localStorage.setItem('memoryGameAudio', (!current).toString());
  return !current;
}
