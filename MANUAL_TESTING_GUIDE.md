# Manual Testing Guide

## Quick Start
1. Ensure dev server is running: `npm run dev`
2. Open browser to the URL shown (usually `http://localhost:5173`)
3. Follow the checklist below

---

## Visual Test Checklist (Lines 9-16)

### Test 1: Gradient Background
**What to check:**
- [ ] Page background shows a purple gradient (blue-purple to purple)
- [ ] Gradient covers entire viewport
- [ ] No white spaces or breaks in gradient

**How to test:**
- Open the page
- Look at the background color
- Resize window - gradient should still cover full area

---

### Test 2: Game Title
**What to check:**
- [ ] Title "Memory Card Game" is visible
- [ ] Title is white color
- [ ] Title has text shadow (slight depth effect)
- [ ] Title is centered
- [ ] Title size is appropriate (not too small/large)

**How to test:**
- Look at top of page
- Verify text is readable and styled correctly

---

### Test 3: Moves Counter
**What to check:**
- [ ] Shows "Moves: 0" on page load
- [ ] "Moves:" label is visible
- [ ] "0" value is displayed (should be gold/yellow color)
- [ ] Counter is in the game info section

**How to test:**
- Check the game info bar
- Verify initial value is 0
- Click some cards - counter should increment

---

### Test 4: Reset Button
**What to check:**
- [ ] "Reset Game" button is visible
- [ ] Button has white background
- [ ] Button text is purple/blue
- [ ] Button has rounded corners
- [ ] Button has shadow
- [ ] Hover effect works (button lifts slightly on hover)
- [ ] Button is clickable

**How to test:**
- Look for button in game info section
- Hover over button - should see lift effect
- Click button - game should reset

---

### Test 5: 16 Cards in 4x4 Grid
**What to check:**
- [ ] Exactly 16 cards are visible
- [ ] Cards are arranged in 4 columns
- [ ] Cards are arranged in 4 rows
- [ ] Grid is centered on page
- [ ] All cards are same size

**How to test:**
- Count the cards - should be 16 total
- Verify grid structure (4 columns × 4 rows)
- Check that grid doesn't overflow container

---

### Test 6: Cards Show "?" on Front
**What to check:**
- [ ] All 16 cards show "?" symbol
- [ ] "?" is white color
- [ ] "?" is on purple gradient background
- [ ] "?" is centered on card
- [ ] "?" is large enough to see clearly

**How to test:**
- Look at each card
- Verify all show "?" (not blank or other symbols)
- Verify styling is consistent

---

### Test 7: Card Spacing and Sizing
**What to check:**
- [ ] Cards are square (equal width and height)
- [ ] Consistent spacing between all cards
- [ ] Cards are not overlapping
- [ ] Cards fit nicely in container
- [ ] Cards are not too small or too large

**How to test:**
- Visual inspection of card proportions
- Check spacing between cards
- Verify cards are well-proportioned

---

### Test 8: Responsive Design
**What to check:**
- [ ] Layout adapts on smaller screens
- [ ] Cards remain visible and clickable
- [ ] Text remains readable
- [ ] No horizontal scrolling needed
- [ ] Game info section stacks on mobile

**How to test:**
- Resize browser window to < 600px width
- Check mobile view (F12 → Toggle device toolbar)
- Test on actual mobile device if available
- Verify all elements remain functional

---

## Browser Console Check

**Important:** Open browser DevTools (F12) and check:
- [ ] No JavaScript errors in Console
- [ ] No CSS errors
- [ ] No 404 errors for missing files
- [ ] All modules load correctly

---

## Common Issues to Watch For

1. **Cards not appearing:**
   - Check browser console for errors
   - Verify JavaScript modules are loading
   - Check network tab for failed requests

2. **Styling issues:**
   - Clear browser cache
   - Verify all CSS files are loading
   - Check for CSS conflicts

3. **Layout problems:**
   - Verify viewport meta tag is present
   - Check CSS Grid support in browser
   - Verify no conflicting styles

---

## Test Results Template

```
Date: ___________
Browser: ___________
Screen Size: ___________

Test Results:
1. Gradient Background: ⬜ Pass ⬜ Fail
2. Game Title: ⬜ Pass ⬜ Fail
3. Moves Counter: ⬜ Pass ⬜ Fail
4. Reset Button: ⬜ Pass ⬜ Fail
5. 16 Cards Grid: ⬜ Pass ⬜ Fail
6. "?" on Cards: ⬜ Pass ⬜ Fail
7. Spacing/Sizing: ⬜ Pass ⬜ Fail
8. Responsive Design: ⬜ Pass ⬜ Fail

Notes:
_______________________________________
_______________________________________
_______________________________________
```


