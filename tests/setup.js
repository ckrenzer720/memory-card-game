/**
 * Test Setup File
 * Configures the testing environment
 */

import { afterEach } from 'vitest';

// Clean up DOM after each test
afterEach(() => {
  document.body.innerHTML = '';
});

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

global.localStorage = localStorageMock;

// Mock window.AudioContext for sound tests
class MockAudioContext {
  constructor() {
    this.currentTime = 0;
    this.destination = {};
  }
  createOscillator() {
    return {
      connect: () => {},
      start: () => {},
      stop: () => {},
      frequency: { value: 0 },
      type: 'sine'
    };
  }
  createGain() {
    return {
      connect: () => {},
      gain: {
        setValueAtTime: () => {},
        linearRampToValueAtTime: () => {},
        exponentialRampToValueAtTime: () => {}
      }
    };
  }
}

global.AudioContext = MockAudioContext;
global.window = global;
global.window.AudioContext = MockAudioContext;
global.window.webkitAudioContext = MockAudioContext;
