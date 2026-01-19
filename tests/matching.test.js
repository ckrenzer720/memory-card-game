/**
 * Tests for matching.js
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { 
  initGameState, 
  handleCardClick, 
  getMoves, 
  isGameComplete 
} from '../js/matching.js';
import * as cardsModule from '../js/cards.js';

describe('initGameState', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="moves">0</div>';
    initGameState();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should reset moves to 0', () => {
    initGameState();
    expect(getMoves()).toBe(0);
  });

  it('should reset game completion status', () => {
    initGameState();
    expect(isGameComplete()).toBe(false);
  });
});

describe('handleCardClick', () => {
  let card1, card2;

  beforeEach(() => {
    document.body.innerHTML = '<div id="moves">0</div>';
    initGameState();
    
    // Create mock card elements
    card1 = document.createElement('div');
    card1.className = 'card';
    card1.dataset.cardId = '0'; // First card of pair 0
    
    card2 = document.createElement('div');
    card2.className = 'card';
    card2.dataset.cardId = '1'; // Second card of pair 0 (matches card1)
    
    document.body.appendChild(card1);
    document.body.appendChild(card2);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should flip a single card when clicked', async () => {
    const onMatch = vi.fn();
    const onWin = vi.fn();
    
    await handleCardClick(card1, onMatch, onWin);
    
    expect(card1.classList.contains('flipped')).toBe(true);
  });

  it('should not flip if card is already flipped', async () => {
    card1.classList.add('flipped');
    const onMatch = vi.fn();
    const onWin = vi.fn();
    
    await handleCardClick(card1, onMatch, onWin);
    
    // Should not process the click
    expect(onMatch).not.toHaveBeenCalled();
  });

  it('should not flip if card is matched', async () => {
    card1.classList.add('matched');
    const onMatch = vi.fn();
    const onWin = vi.fn();
    
    await handleCardClick(card1, onMatch, onWin);
    
    expect(onMatch).not.toHaveBeenCalled();
  });

  it('should match two cards with same symbol', async () => {
    // Spy on the function
    const markCardAsMatchedSpy = vi.spyOn(cardsModule, 'markCardAsMatched');
    const onMatch = vi.fn();
    const onWin = vi.fn();
    
    // Flip first card
    await handleCardClick(card1, onMatch, onWin);
    
    // Flip second matching card
    await handleCardClick(card2, onMatch, onWin);
    
    // Wait for async matching logic (500ms delay + processing time)
    await new Promise(resolve => setTimeout(resolve, 600));
    
    expect(markCardAsMatchedSpy).toHaveBeenCalled();
    expect(onMatch).toHaveBeenCalled();
    
    markCardAsMatchedSpy.mockRestore();
  });

  it('should increment moves when two cards are compared', async () => {
    const onMatch = vi.fn();
    const onWin = vi.fn();
    
    const initialMoves = getMoves();
    
    // Flip first card
    await handleCardClick(card1, onMatch, onWin);
    
    // Flip second card (triggers comparison)
    await handleCardClick(card2, onMatch, onWin);
    
    // Wait for async matching logic
    await new Promise(resolve => setTimeout(resolve, 600));
    
    expect(getMoves()).toBe(initialMoves + 1);
  });

  it('should return early for invalid card element', async () => {
    const onMatch = vi.fn();
    const onWin = vi.fn();
    
    await handleCardClick(null, onMatch, onWin);
    
    expect(onMatch).not.toHaveBeenCalled();
  });

  it('should return early for card without cardId', async () => {
    const invalidCard = document.createElement('div');
    invalidCard.className = 'card';
    // No dataset.cardId
    
    const onMatch = vi.fn();
    const onWin = vi.fn();
    
    await handleCardClick(invalidCard, onMatch, onWin);
    
    expect(onMatch).not.toHaveBeenCalled();
  });
});

describe('getMoves', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="moves">0</div>';
    initGameState();
  });

  it('should return 0 initially', () => {
    expect(getMoves()).toBe(0);
  });
});

describe('isGameComplete', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="moves">0</div>';
    initGameState();
  });

  it('should return false initially', () => {
    expect(isGameComplete()).toBe(false);
  });
});
