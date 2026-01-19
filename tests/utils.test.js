/**
 * Tests for utils.js
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { shuffleArray, delay, announceToScreenReader } from '../js/utils.js';

describe('shuffleArray', () => {
  it('should return an empty array for empty input', () => {
    const result = shuffleArray([]);
    expect(result).toEqual([]);
  });

  it('should return an empty array for non-array input', () => {
    const result = shuffleArray(null);
    expect(result).toEqual([]);
  });

  it('should return a shuffled array with same length', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffleArray(input);
    expect(result).toHaveLength(5);
  });

  it('should not mutate the original array', () => {
    const input = [1, 2, 3, 4, 5];
    const original = [...input];
    shuffleArray(input);
    expect(input).toEqual(original);
  });

  it('should contain all original elements', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffleArray(input);
    expect(result.sort()).toEqual(input.sort());
  });

  it('should produce different orders on multiple calls (high probability)', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const results = [];
    
    // Run shuffle multiple times
    for (let i = 0; i < 10; i++) {
      results.push(shuffleArray(input).join(','));
    }
    
    // Check that at least some results are different
    const uniqueResults = new Set(results);
    expect(uniqueResults.size).toBeGreaterThan(1);
  });
});

describe('delay', () => {
  it('should return a Promise', () => {
    const result = delay(10);
    expect(result).toBeInstanceOf(Promise);
  });

  it('should resolve after the specified time', async () => {
    const start = Date.now();
    await delay(50);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(45);
    expect(elapsed).toBeLessThan(100);
  });

  it('should handle zero delay', async () => {
    const start = Date.now();
    await delay(0);
    const elapsed = Date.now() - start;
    // Zero delay should resolve almost immediately, but allow some margin for test execution
    expect(elapsed).toBeLessThan(50);
  });
});

describe('announceToScreenReader', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should create an announcement element', () => {
    announceToScreenReader('Test message');
    const announcement = document.querySelector('.sr-only');
    expect(announcement).toBeTruthy();
    expect(announcement.textContent).toBe('Test message');
  });

  it('should set proper ARIA attributes', () => {
    announceToScreenReader('Test message');
    const announcement = document.querySelector('.sr-only');
    expect(announcement.getAttribute('role')).toBe('status');
    expect(announcement.getAttribute('aria-live')).toBe('polite');
    expect(announcement.getAttribute('aria-atomic')).toBe('true');
  });

  it('should append to document body', () => {
    announceToScreenReader('Test message');
    const announcement = document.querySelector('.sr-only');
    expect(document.body.contains(announcement)).toBe(true);
  });

  it('should remove announcement after timeout', async () => {
    vi.useFakeTimers();
    announceToScreenReader('Test message');
    
    expect(document.querySelector('.sr-only')).toBeTruthy();
    
    vi.advanceTimersByTime(1000);
    await Promise.resolve(); // Allow async cleanup
    
    // Element should be removed
    expect(document.querySelector('.sr-only')).toBeFalsy();
    
    vi.useRealTimers();
  });
});
