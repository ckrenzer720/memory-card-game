/**
 * Card Management
 * Handles card creation, rendering, and flip functionality
 */

import { shuffleArray } from './utils.js';

// Card symbols/icons - 8 pairs = 16 cards total
const CARD_SYMBOLS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

/**
 * Create the initial card array with pairs
 * Creates 8 pairs (16 cards total) with unique IDs for each card
 * Each pair shares the same symbol but has different IDs
 * 
 * @returns {Array<Object>} - Array of card objects with structure:
 *   - id: number - Unique identifier (0-15)
 *   - symbol: string - Emoji symbol for the card
 *   - matched: boolean - Whether the card has been matched
 * 
 * @example
 * // Returns shuffled array like:
 * // [{ id: 0, symbol: '🐶', matched: false }, { id: 1, symbol: '🐶', matched: false }, ...]
 */
export function createCardArray() {
  const cards = [];
  
  // Create pairs: for each symbol, create 2 cards with consecutive IDs
  // Pair 0: IDs 0,1 (🐶)
  // Pair 1: IDs 2,3 (🐱)
  // Pair 2: IDs 4,5 (🐭)
  // ... and so on
  CARD_SYMBOLS.forEach((symbol, index) => {
    // First card of the pair
    cards.push({ 
      id: index * 2, 
      symbol, 
      matched: false 
    });
    // Second card of the pair
    cards.push({ 
      id: index * 2 + 1, 
      symbol, 
      matched: false 
    });
  });
  
  // Validate we have the correct number of cards
  if (cards.length !== 16) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`Expected 16 cards, but got ${cards.length}`);
    }
  }
  
  // Shuffle the array randomly and return
  return shuffleArray(cards);
}

/**
 * Create a card DOM element dynamically
 * Generates the HTML structure for a single card with front and back faces
 * 
 * @param {Object} card - Card object with id, symbol, matched
 * @param {number} index - Index position in the grid (0-15)
 * @returns {HTMLElement} - Complete card DOM element ready to be appended
 * 
 * @example
 * const card = { id: 0, symbol: '🐶', matched: false };
 * const cardElement = createCardElement(card, 0);
 * gridContainer.appendChild(cardElement);
 */
export function createCardElement(card, index) {
  // Validate input
  if (!card || typeof card.id !== 'number' || !card.symbol) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Invalid card object provided to createCardElement');
    }
    return null;
  }

  // Main card container
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card';
  cardDiv.dataset.cardId = card.id; // Store card ID for matching logic
  cardDiv.dataset.index = index; // Store grid position
  cardDiv.setAttribute('role', 'button');
  cardDiv.setAttribute('aria-label', `Card ${index + 1}, click to flip`);
  cardDiv.setAttribute('tabindex', '0'); // Make keyboard accessible

  // Inner container for 3D flip animation
  const cardInner = document.createElement('div');
  cardInner.className = 'card-inner';

  // Front face (question mark - shown when card is face down)
  const cardFront = document.createElement('div');
  cardFront.className = 'card-front';
  cardFront.textContent = '?';
  cardFront.setAttribute('aria-hidden', 'true');

  // Back face (symbol - shown when card is flipped)
  const cardBack = document.createElement('div');
  cardBack.className = 'card-back';
  cardBack.textContent = card.symbol;
  cardBack.setAttribute('aria-hidden', 'true');

  // Assemble the card structure
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  cardDiv.appendChild(cardInner);

  return cardDiv;
}

/**
 * Render all cards to the grid
 * Clears the grid and dynamically generates card elements for each card in the array
 * 
 * @param {Array<Object>} cards - Array of card objects to render
 * @param {HTMLElement} gridContainer - The DOM element that contains the card grid
 * @returns {void}
 * 
 * @example
 * const cards = createCardArray(); // Get shuffled cards
 * const grid = document.getElementById('cardGrid');
 * renderCards(cards, grid); // Render all cards to the grid
 */
export function renderCards(cards, gridContainer) {
  // Validate inputs
  if (!Array.isArray(cards)) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('renderCards: cards must be an array');
    }
    return;
  }
  
  if (!gridContainer || !(gridContainer instanceof HTMLElement)) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('renderCards: gridContainer must be a valid DOM element');
    }
    return;
  }

  // Validate card count
  if (cards.length !== 16 && process.env.NODE_ENV !== 'production') {
    console.warn(`Expected 16 cards, but got ${cards.length}`);
  }

  // Clear existing cards from the grid
  gridContainer.innerHTML = '';

  // Use DocumentFragment for better performance (batch DOM operations)
  const fragment = document.createDocumentFragment();

  // Generate all card elements and append to fragment
  cards.forEach((card, index) => {
    const cardElement = createCardElement(card, index);
    if (cardElement) {
      fragment.appendChild(cardElement);
    } else if (process.env.NODE_ENV !== 'production') {
      console.error(`Failed to create card element at index ${index}`);
    }
  });

  // Append all cards at once (single reflow)
  gridContainer.appendChild(fragment);
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






