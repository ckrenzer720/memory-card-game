# Testing Checklist

## Setup
- [x] Dev server running (`npm run dev`)
- [x] All modules created and imported correctly
- [x] No console errors on page load

## Visual Tests
- [ ] Page loads with gradient background
- [ ] Game title displays correctly
- [ ] Moves counter shows "0" initially
- [ ] Reset button is visible and styled
- [ ] 16 cards (4x4 grid) are displayed
- [ ] All cards show "?" on the front
- [ ] Cards have proper spacing and sizing
- [ ] Responsive design works on mobile

## Functionality Tests

### Card Interaction
- [ ] Clicking a card flips it to show the symbol
- [ ] Only one card can be flipped at a time initially
- [ ] Clicking a second card flips it
- [ ] Cards flip smoothly with animation
- [ ] Cannot click a card that's already flipped
- [ ] Cannot click a card that's already matched

### Matching Logic
- [ ] When two matching cards are flipped, they stay flipped
- [ ] Matching cards show green gradient background
- [ ] Matching cards become slightly transparent
- [ ] When two non-matching cards are flipped, they flip back after ~1 second
- [ ] Move counter increments when two cards are compared
- [ ] Cards are disabled during the matching check (can't click others)

### Game Completion
- [ ] When all 8 pairs are matched, win message appears
- [ ] Win message shows correct move count
- [ ] "Play Again" button appears in win message
- [ ] Win message is styled correctly

### Reset Functionality
- [ ] "Reset Game" button resets the game
- [ ] Cards shuffle to new positions on reset
- [ ] Move counter resets to 0
- [ ] All cards flip back to face-down
- [ ] Win message hides on reset
- [ ] "Play Again" button also resets the game

### Edge Cases
- [ ] Rapid clicking doesn't break the game
- [ ] Clicking during animation doesn't cause issues
- [ ] Game handles multiple resets correctly
- [ ] No duplicate event listeners after reset

## Browser Compatibility
- [ ] Works in Chrome/Edge
- [ ] Works in Firefox
- [ ] Works in Safari (if available)
- [ ] ES6 modules load correctly

## Performance
- [ ] Cards render quickly
- [ ] Animations are smooth (60fps)
- [ ] No memory leaks (test by playing multiple games)

## Code Quality
- [x] No linter errors
- [x] Modular structure is clean
- [x] Code is well-commented
- [x] Functions have clear responsibilities

---

## Known Issues / Notes
- None currently

## Test Results
Date: _______________
Tester: _______________
Status: ⬜ Pass  ⬜ Fail  ⬜ Needs Fix


