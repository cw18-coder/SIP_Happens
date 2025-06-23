# Bug Fix Tracking

This file tracks bugs and issues that we've encountered but haven't been able to resolve yet. Each entry contains the problem description, affected files, attempted solutions, and current status.

---

## Bug #001: Triangle Framework Alignment Issues

**Date Reported**: June 23, 2025  
**Status**: 🔴 **UNRESOLVED**  
**Priority**: Low  
**Reporter**: User  

### Problem Description
The triangle framework on slide 4 (The Three Pillars Framework) has alignment issues where:
- SVG triangle lines overlap with text content in the triangle-point divs
- Triangle vertices don't properly align with the borders of the triangle-point boxes
- Inconsistent box heights and widths
- Poor spacing between the framework graphic and subsequent content sections

### Expected Behavior
1. The bottom edge of `div.triangle-point.top` should align with the top edges of `div.triangle-point.bottom-left` and `div.triangle-point.bottom-right`
2. The top vertex of `svg.triangle` should intersect at the mid-point of `div.triangle-point.top`
3. The left vertex of `svg.triangle` should intersect at the mid-point of `div.triangle-point.bottom-left`
4. The right vertex of `svg.triangle` should intersect at the mid-point of `div.triangle-point.bottom-right`
5. Triangle vertices should only touch the blue borders of the boxes (bottom of top box, right of left box, left of right box)
6. All boxes should have uniform height and width
7. Proper spacing should exist between the graphic and next content section

### Files Impacted
- `presentation-html/slides/slide-04.html` - HTML structure of the triangle framework
- `presentation-html/assets/css/components.css` - CSS styling for triangle-point and triangle-lines classes

### Attempted Solutions

#### Attempt #1: Z-index Approach
- **Changes**: Added `z-index: 10` to `.triangle-point` and `z-index: 1` to `.triangle-lines`
- **Result**: Failed - SVG lines still overlapped text content
- **Reason**: Z-index didn't address the core positioning problem

#### Attempt #2: SVG Path Coordinate Adjustment
- **Changes**: Modified SVG path from `M 200 50 L 100 250 L 300 250 Z` to `M 200 100 L 100 200 L 300 200 Z`
- **Result**: Failed - Still had overlap and misalignment issues
- **Reason**: Coordinates were estimated without proper calculation of actual box dimensions

#### Attempt #3: Triangle-Point Repositioning
- **Changes**: 
  - Changed bottom triangle-points from `bottom: 0` to `top: 120px`, then `top: 140px`, then `top: 160px`, then `top: 170px`
  - Adjusted SVG coordinates multiple times
- **Result**: Failed - Alignment remained incorrect
- **Reason**: Inconsistent box heights made precise positioning impossible

#### Attempt #4: Triangle-First Positioning Approach
- **Changes**: 
  - Rendered SVG triangle first with vertices at (200, 60), (80, 260), (320, 260)
  - Positioned triangle-point boxes around triangle vertices
  - Increased padding for text protection
- **Result**: Failed - Vertices didn't properly touch borders, spacing issues persisted
- **Reason**: Box dimensions and positioning calculations were still imprecise

#### Attempt #5: Fixed Box Dimensions Approach
- **Changes**:
  - Set fixed width (140px) and height (120px) for all triangle-point boxes
  - Used flexbox for content centering
  - Recalculated SVG triangle coordinates to (200, 140), (90, 220), (310, 220)
  - Reduced text font sizes to fit in fixed boxes
  - Increased container height and margin for better spacing
- **Result**: Failed - User still not satisfied with results
- **Reason**: Approach may have been too complex or calculations still incorrect

### Current Status
All changes have been discarded using `git restore`. The triangle framework remains in its original state with the alignment issues unresolved.

### Next Steps
- Consider a complete redesign of the triangle framework component
- Research alternative CSS layout approaches (CSS Grid, custom positioning)
- Investigate using a different visual representation that's easier to align
- Consider using a background image or canvas-based approach instead of SVG

### Notes
- The core challenge appears to be precisely calculating the intersection points between SVG coordinates and CSS positioned elements
- Fixed box dimensions help with consistency but may impact responsive design
- The triangle framework is a key visual element that represents the investment philosophy, so a working solution is important for the workshop's effectiveness

---

## Bug Template (for future issues)

## Bug #XXX: [Bug Title]

**Date Reported**: [Date]  
**Status**: 🔴 **UNRESOLVED** / 🟡 **IN PROGRESS** / 🟢 **RESOLVED**  
**Priority**: High / Medium / Low  
**Reporter**: [Name]  

### Problem Description
[Detailed description of the issue]

### Expected Behavior
[What should happen]

### Files Impacted
- `[file1]` - [description]
- `[file2]` - [description]

### Attempted Solutions
#### Attempt #1: [Approach Name]
- **Changes**: [What was changed]
- **Result**: [Success/Failure]
- **Reason**: [Why it worked or didn't work]

### Current Status
[Current state of the bug]

### Next Steps
[Potential solutions to try]

### Notes
[Additional context or observations]

---

*Last Updated: June 23, 2025*
