/**
 * Integration tests for game.js
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('Game Initialization', () => {
  beforeEach(() => {
    // Setup DOM
    document.body.innerHTML = `
      <div id="cardGrid"></div>
      <div id="loadingState" class="hidden"></div>
      <div id="winMessage" class="hidden"></div>
      <div id="finalMoves">0</div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should have required DOM elements', () => {
    const cardGrid = document.getElementById('cardGrid');
    const loadingState = document.getElementById('loadingState');
    const winMessage = document.getElementById('winMessage');
    
    expect(cardGrid).toBeTruthy();
    expect(loadingState).toBeTruthy();
    expect(winMessage).toBeTruthy();
  });
});
