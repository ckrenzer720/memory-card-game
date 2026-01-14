/**
 * Main Game Logic
 * Initializes and manages the game
 */

import { createCardArray, renderCards } from "./cards.js";
import { initGameState, handleCardClick, getMoves } from "./matching.js";
import { playWinSound, isAudioEnabled } from "./sounds.js";
import { announceToScreenReader } from "./utils.js";

// Cache DOM elements
let cardGrid = null;
let loadingState = null;
let winMessage = null;
let finalMoves = null;

// Track if event listeners are already set up
let eventListenersSetup = false;

/**
 * Initialize the game
 */
export async function initGame() {
  // Ensure DOM elements are cached
  cacheDOMElements();

  if (!cardGrid) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Card grid not found!");
    }
    return;
  }

  // Show loading state
  if (loadingState) {
    loadingState.classList.remove("hidden");
    loadingState.setAttribute("aria-hidden", "false");
  }
  cardGrid.classList.add("hidden");

  // Reset game state
  initGameState();

  // Simulate brief loading delay for better UX (optional - can be removed)
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Create and shuffle cards
  const cards = createCardArray();

  // Render cards to grid
  renderCards(cards, cardGrid);

  // Hide loading state and show grid
  if (loadingState) {
    loadingState.classList.add("hidden");
    loadingState.setAttribute("aria-hidden", "true");
  }
  cardGrid.classList.remove("hidden");

  // Hide win message
  if (winMessage) {
    winMessage.classList.add("hidden");
    winMessage.setAttribute("aria-hidden", "true");
  }

  // Focus on first card for keyboard navigation
  const firstCard = cardGrid?.querySelector(".card");
  if (firstCard) {
    // Use setTimeout to ensure card is fully rendered
    setTimeout(() => {
      firstCard.focus();
    }, 100);
  }
}

/**
 * Callback when cards match
 * @param {HTMLElement} card1 - First matched card
 * @param {HTMLElement} card2 - Second matched card
 */
function onCardMatch() {
  // Match animation is handled by CSS
  // Match sound is handled in matching.js
  // This callback is kept for potential future enhancements
}

/**
 * Callback when game is won
 */
function onGameWin() {
  if (winMessage && finalMoves) {
    finalMoves.textContent = getMoves();
    winMessage.classList.remove("hidden");
    winMessage.setAttribute("aria-hidden", "false");

    // Play win sound if audio is enabled
    if (isAudioEnabled()) {
      playWinSound();
    }

    // Focus on win message for accessibility
    winMessage.focus();

    // Announce win to screen readers
    const announcement = `Congratulations! You won the game in ${getMoves()} moves!`;
    announceToScreenReader(announcement);
  }
}

/**
 * Reset the game
 */
export function resetGame() {
  initGame();
}

/**
 * Initialize event listeners
 * Uses event delegation for better performance
 * Only sets up once to avoid duplicate listeners
 */
function setupEventListeners() {
  if (eventListenersSetup) {
    return; // Already set up
  }

  // Event delegation for reset buttons
  document.addEventListener("click", (e) => {
    if (e.target.id === "resetBtn" || e.target.id === "playAgainBtn") {
      resetGame();
    }
  });

  // Event delegation for card clicks and keyboard navigation
  // This is more efficient than attaching listeners to each card
  // Will work for all cards, even when re-rendered
  if (cardGrid) {
    cardGrid.addEventListener("click", (e) => {
      const cardElement = e.target.closest(".card");
      if (cardElement) {
        handleCardClick(cardElement, onCardMatch, onGameWin);
      }
    });

    cardGrid.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        const cardElement = e.target.closest(".card");
        if (cardElement) {
          e.preventDefault();
          handleCardClick(cardElement, onCardMatch, onGameWin);
        }
      }
    });
  }

  eventListenersSetup = true;
}

/**
 * Initialize DOM element cache
 * Called once at startup
 */
function cacheDOMElements() {
  if (!cardGrid) {
    cardGrid = document.getElementById("cardGrid");
    loadingState = document.getElementById("loadingState");
    winMessage = document.getElementById("winMessage");
    finalMoves = document.getElementById("finalMoves");
  }
}

// Initialize game when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    cacheDOMElements();
    setupEventListeners();
    initGame();
  });
} else {
  cacheDOMElements();
  setupEventListeners();
  initGame();
}
