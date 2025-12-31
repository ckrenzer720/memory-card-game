/**
 * Card Management
 * Handles card creation, rendering, and flip functionality
 */

import { shuffleArray } from './utils.js';

// Card symbols/icons - 8 pairs = 16 cards total
const CARD_SYMBOLS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

/**
 * Create the initial card array with pairs
 * @returns {Array} - Array of card objects
 */
export function createCardArray() {
  const cards = [];
  // Create pairs
  CARD_SYMBOLS.forEach((symbol, index) => {
    cards.push({ id: index * 2, symbol, matched: false });
    cards.push({ id: index * 2 + 1, symbol, matched: false });
  });
  return shuffleArray(cards);
}

/**
 * Create a card element
 * @param {Object} card - Card object with id, symbol, matched
 * @param {number} index - Index in the grid
 * @returns {HTMLElement} - Card DOM element
 */
export function createCardElement(card, index) {
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card';
  cardDiv.dataset.cardId = card.id;
  cardDiv.dataset.index = index;

  const cardInner = document.createElement('div');
  cardInner.className = 'card-inner';

  const cardFront = document.createElement('div');
  cardFront.className = 'card-front';
  cardFront.textContent = '?';

  const cardBack = document.createElement('div');
  cardBack.className = 'card-back';
  cardBack.textContent = card.symbol;

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  cardDiv.appendChild(cardInner);

  return cardDiv;
}

/**
 * Render all cards to the grid
 * @param {Array} cards - Array of card objects
 * @param {HTMLElement} gridContainer - Grid container element
 */
export function renderCards(cards, gridContainer) {
  gridContainer.innerHTML = ''; // Clear existing cards
  cards.forEach((card, index) => {
    const cardElement = createCardElement(card, index);
    gridContainer.appendChild(cardElement);
  });
}

/**
 * Flip a card
 * @param {HTMLElement} cardElement - Card DOM element
 */
export function flipCard(cardElement) {
  cardElement.classList.add('flipped');
}

/**
 * Unflip a card
 * @param {HTMLElement} cardElement - Card DOM element
 */
export function unflipCard(cardElement) {
  cardElement.classList.remove('flipped');
}

/**
 * Mark a card as matched
 * @param {HTMLElement} cardElement - Card DOM element
 */
export function markCardAsMatched(cardElement) {
  cardElement.classList.add('matched');
  cardElement.classList.add('flipped');
}

/**
 * Disable card interactions (during animations)
 * @param {HTMLElement} cardElement - Card DOM element
 */
export function disableCard(cardElement) {
  cardElement.classList.add('disabled');
}

/**
 * Enable card interactions
 * @param {HTMLElement} cardElement - Card DOM element
 */
export function enableCard(cardElement) {
  cardElement.classList.remove('disabled');
}


