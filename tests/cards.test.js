/**
 * Tests for cards.js
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { 
  createCardArray, 
  createCardElement, 
  renderCards,
  unflipCard,
  markCardAsMatched,
  disableCard,
  enableCard
} from '../js/cards.js';

describe('createCardArray', () => {
  it('should create 16 cards total', () => {
    const cards = createCardArray();
    expect(cards).toHaveLength(16);
  });

  it('should create 8 pairs (2 cards per symbol)', () => {
    const cards = createCardArray();
    const symbols = cards.map(card => card.symbol);
    
    // Count occurrences of each symbol
    const symbolCounts = {};
    symbols.forEach(symbol => {
      symbolCounts[symbol] = (symbolCounts[symbol] || 0) + 1;
    });
    
    // Each symbol should appear exactly twice
    Object.values(symbolCounts).forEach(count => {
      expect(count).toBe(2);
    });
    
    // Should have 8 unique symbols
    expect(Object.keys(symbolCounts)).toHaveLength(8);
  });

  it('should assign unique IDs to each card', () => {
    const cards = createCardArray();
    const ids = cards.map(card => card.id);
    const uniqueIds = new Set(ids);
    
    expect(uniqueIds.size).toBe(16);
    expect(ids.length).toBe(16);
  });

  it('should have all cards with matched: false initially', () => {
    const cards = createCardArray();
    cards.forEach(card => {
      expect(card.matched).toBe(false);
    });
  });

  it('should shuffle the cards (order should differ from creation order)', () => {
    const cards1 = createCardArray();
    const cards2 = createCardArray();
    
    // Get IDs in order
    const ids1 = cards1.map(c => c.id).join(',');
    const ids2 = cards2.map(c => c.id).join(',');
    
    // At least one shuffle should produce different order
    // (running multiple times increases probability)
    let different = false;
    for (let i = 0; i < 5; i++) {
      const testCards = createCardArray();
      const testIds = testCards.map(c => c.id).join(',');
      if (testIds !== ids1) {
        different = true;
        break;
      }
    }
    
    // High probability that at least one shuffle differs
    expect(different).toBe(true);
  });
});

describe('createCardElement', () => {
  it('should create a valid card element', () => {
    const card = { id: 0, symbol: '🍎', matched: false };
    const element = createCardElement(card, 0);
    
    expect(element).toBeTruthy();
    expect(element.classList.contains('card')).toBe(true);
  });

  it('should set correct data attributes', () => {
    const card = { id: 5, symbol: '🍌', matched: false };
    const element = createCardElement(card, 5);
    
    expect(element.dataset.cardId).toBe('5');
    expect(element.dataset.index).toBe('5');
  });

  it('should set ARIA attributes for accessibility', () => {
    const card = { id: 0, symbol: '🍎', matched: false };
    const element = createCardElement(card, 0);
    
    expect(element.getAttribute('role')).toBe('button');
    expect(element.getAttribute('aria-label')).toContain('Card');
    expect(element.getAttribute('tabindex')).toBe('0');
  });

  it('should create card with front and back faces', () => {
    const card = { id: 0, symbol: '🍎', matched: false };
    const element = createCardElement(card, 0);
    
    const front = element.querySelector('.card-front');
    const back = element.querySelector('.card-back');
    
    expect(front).toBeTruthy();
    expect(back).toBeTruthy();
    expect(front.textContent).toBe('?');
    expect(back.textContent).toBe('🍎');
  });

  it('should return null for invalid card object', () => {
    const invalidCard = null;
    const element = createCardElement(invalidCard, 0);
    expect(element).toBeNull();
  });

  it('should return null for card without id', () => {
    const invalidCard = { symbol: '🍎' };
    const element = createCardElement(invalidCard, 0);
    expect(element).toBeNull();
  });
});

describe('renderCards', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    container.id = 'testGrid';
    document.body.appendChild(container);
  });

  it('should render all cards to container', () => {
    const cards = createCardArray();
    renderCards(cards, container);
    
    const renderedCards = container.querySelectorAll('.card');
    expect(renderedCards).toHaveLength(16);
  });

  it('should clear existing cards before rendering', () => {
    const oldCard = document.createElement('div');
    oldCard.className = 'card';
    container.appendChild(oldCard);
    
    const cards = createCardArray();
    renderCards(cards, container);
    
    const renderedCards = container.querySelectorAll('.card');
    expect(renderedCards).toHaveLength(16);
    expect(container.contains(oldCard)).toBe(false);
  });

  it('should handle empty array', () => {
    renderCards([], container);
    expect(container.children.length).toBe(0);
  });

  it('should not render if container is invalid', () => {
    const cards = createCardArray();
    const originalLength = container.children.length;
    
    renderCards(cards, null);
    expect(container.children.length).toBe(originalLength);
  });
});

describe('Card manipulation functions', () => {
  let cardElement;

  beforeEach(() => {
    cardElement = document.createElement('div');
    cardElement.className = 'card';
  });

  it('unflipCard should remove flipped class', () => {
    cardElement.classList.add('flipped');
    unflipCard(cardElement);
    expect(cardElement.classList.contains('flipped')).toBe(false);
  });

  it('markCardAsMatched should add matched and flipped classes', () => {
    markCardAsMatched(cardElement);
    expect(cardElement.classList.contains('matched')).toBe(true);
    expect(cardElement.classList.contains('flipped')).toBe(true);
  });

  it('disableCard should add disabled class', () => {
    disableCard(cardElement);
    expect(cardElement.classList.contains('disabled')).toBe(true);
  });

  it('enableCard should remove disabled class', () => {
    cardElement.classList.add('disabled');
    enableCard(cardElement);
    expect(cardElement.classList.contains('disabled')).toBe(false);
  });
});
