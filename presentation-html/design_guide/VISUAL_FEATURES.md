# VISUAL_FEATURES.md

## Universal Visual Features for All Slides

### 1. Card/Grid-Based Layout
- **Main View:**
  - The primary content area displays a grid of interactive cards (`.category-card`), each representing a main topic or drill-down entry point.
  - The grid is responsive, with cards sized to fit the viewport and maintain a visually balanced layout.
  - Cards are spaced evenly with consistent gaps (`gap: var(--space-lg)`), and the grid is centered within the content area.
- **Detailed View:**
  - When a card is clicked, the main grid is hidden and a detailed view container appears, also styled as a card or set of cards.
  - Detailed content is presented in a visually distinct, elevated container with padding, rounded corners, and a subtle shadow.

### 2. Card Design
- **Background:** Cards use a secondary or tertiary background color for contrast against the main slide background.
- **Border Radius:** All cards have a medium-to-large border radius for a modern, friendly look.
- **Shadow:** Cards have a soft shadow (`box-shadow: var(--shadow-md)` or `var(--shadow-lg)`) to create depth and separation from the background.
- **Hover Effect:** Cards slightly scale up and the shadow intensifies on hover, providing interactive feedback.
- **Iconography:** Each card features a prominent emoji or SVG icon at the top, visually representing the card’s topic.
- **Text:** Card titles are bold and clear, with supporting stats or descriptors below in a muted or secondary color.

### 3. Buttons
- **Explore Button:**
  - Each card has a visually prominent “Click to Explore →” button at the bottom.
  - Buttons use the primary accent color, with a hover state that inverts or intensifies the color for feedback.
  - Buttons are large, rounded, and have a bold font for easy interaction.
- **Back Button:**
  - The back button is always centered at the top of the detailed view, wide, and visually prominent.
  - It uses the same accent color and hover effect as the explore buttons, ensuring consistency.
  - The button is placed in a dedicated `.back-button` container for alignment and spacing.

### 4. Typography
- **Font:** Uses a modern, sans-serif font for all text.
- **Hierarchy:**
  - Slide titles are large and bold.
  - Subtitles are slightly smaller but still prominent.
  - Card titles and detailed view headings are clear and easy to scan.
  - Supporting text and lists use a slightly smaller, readable font size.

### 5. Color Scheme
- **Backgrounds:** Slides use a dark or neutral background for the main area, with lighter or accent backgrounds for cards and buttons.
- **Text:** Primary text is high-contrast for readability. Secondary and muted text colors are used for supporting information.
- **Accents:** Accent colors are used for buttons, highlights, and icons to draw attention to interactive elements.

### 6. Animations and Transitions
- **Fade-in Animation:** Detailed views and cards animate in with a fade and slight upward movement for a smooth, modern feel.
- **Transitions:** All hover and state changes (cards, buttons) use quick, smooth transitions.

### 7. Lists and Content Blocks
- **Lists:** Bullet lists in detailed views are indented, spaced, and use clear, readable bullets.
- **Interpretation/Highlight Blocks:** Key takeaways or interpretations are highlighted in a distinct color or style within the detailed view.

### 8. Responsiveness
- **Grid and Card Sizing:** The layout adapts to different screen sizes, ensuring cards remain readable and accessible on all devices.

### 9. Speaker Notes (TL;DR)
- **Dynamic Injection:** Speaker notes are not hardcoded in the HTML but are injected dynamically from a central source (`slideLoader.js`).
- **Consistent Placement:** Notes are always available in a dedicated panel or area, styled to match the rest of the UI.

---

## Summary Table of Key Visual Features

| Component         | Visual Features                                                                                   |
|-------------------|--------------------------------------------------------------------------------------------------|
| Main Card Grid    | Responsive, evenly spaced, modern cards with icons, titles, stats, and explore buttons           |
| Card              | Rounded corners, shadow, accent hover, icon, bold title, muted stats, large explore button        |
| Detailed View     | Elevated card/container, fade-in animation, back button centered at top, clear headings/lists     |
| Buttons           | Accent color, bold, rounded, large, hover feedback, consistent style for explore/back             |
| Typography        | Modern sans-serif, clear hierarchy, readable sizes, bold for titles, muted for secondary info     |
| Color Scheme      | Dark/neutral backgrounds, accent highlights, high-contrast text, consistent accent usage          |
| Animations        | Fade-in for details, smooth transitions for hover/interactions                                    |
| Lists/Blocks      | Indented, spaced, readable, with highlighted key takeaways                                        |
| Responsiveness    | Grid and cards adapt to screen size, maintain usability and aesthetics                            |
| Speaker Notes     | Centrally managed, dynamically injected, always accessible, styled to match slide                 |

---

**All of these features should be present in both the main (card grid) and detailed (drill-down) views of every slide, ensuring a seamless, modern, and interactive experience throughout the presentation.**
