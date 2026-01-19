/**
 * Tests for sounds.js
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { 
  playMatchSound, 
  playMismatchSound, 
  playWinSound, 
  playFlipSound,
  isAudioEnabled,
  toggleAudio
} from '../js/sounds.js';

describe('isAudioEnabled', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return true by default', () => {
    expect(isAudioEnabled()).toBe(true);
  });

  it('should return false when disabled in localStorage', () => {
    localStorage.setItem('memoryGameAudio', 'false');
    expect(isAudioEnabled()).toBe(false);
  });

  it('should return true when enabled in localStorage', () => {
    localStorage.setItem('memoryGameAudio', 'true');
    expect(isAudioEnabled()).toBe(true);
  });
});

describe('toggleAudio', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should toggle from enabled to disabled', () => {
    expect(isAudioEnabled()).toBe(true);
    const result = toggleAudio();
    expect(result).toBe(false);
    expect(isAudioEnabled()).toBe(false);
  });

  it('should toggle from disabled to enabled', () => {
    localStorage.setItem('memoryGameAudio', 'false');
    expect(isAudioEnabled()).toBe(false);
    const result = toggleAudio();
    expect(result).toBe(true);
    expect(isAudioEnabled()).toBe(true);
  });

  it('should persist preference in localStorage', () => {
    toggleAudio();
    expect(localStorage.getItem('memoryGameAudio')).toBe('false');
    
    toggleAudio();
    expect(localStorage.getItem('memoryGameAudio')).toBe('true');
  });
});

describe('Sound functions', () => {
  beforeEach(() => {
    // Mock AudioContext methods
    global.AudioContext = vi.fn(() => ({
      currentTime: 0,
      destination: {},
      createOscillator: vi.fn(() => ({
        connect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
        frequency: { value: 0 },
        type: 'sine'
      })),
      createGain: vi.fn(() => ({
        connect: vi.fn(),
        gain: {
          setValueAtTime: vi.fn(),
          linearRampToValueAtTime: vi.fn(),
          exponentialRampToValueAtTime: vi.fn()
        }
      }))
    }));
    
    global.webkitAudioContext = global.AudioContext;
  });

  it('playMatchSound should not throw error', () => {
    expect(() => playMatchSound()).not.toThrow();
  });

  it('playMismatchSound should not throw error', () => {
    expect(() => playMismatchSound()).not.toThrow();
  });

  it('playWinSound should not throw error', () => {
    expect(() => playWinSound()).not.toThrow();
  });

  it('playFlipSound should not throw error', () => {
    expect(() => playFlipSound()).not.toThrow();
  });
});
