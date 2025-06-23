# Bug Fix Tracking

This file tracks bugs and issues that we've encountered but haven't been able to resolve yet. Each entry contains the problem description, affected files, attempted solutions, and current status.

---

## Bug #001: Triangle Framework Alignment Issues

**Date Reported**: June 23, 2025  
**Date Resolved**: *(unresolved)*  
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

## Bug #002: Speaker Notes to Key Takeaways Refactoring

**Date Reported**: June 23, 2025  
**Date Resolved**: *(unresolved)*  
**Status**: 🔴 **UNRESOLVED**  
**Priority**: **HIGH**  
**Reporter**: User

### Problem Description
The codebase currently has a naming inconsistency issue where the functionality has been changed from "Speaker Notes" to "Key Takeaways" in the user interface, but all the underlying code still uses "Speaker Notes" terminology. This creates confusion for future developers and makes the codebase harder to maintain.

### Current State
- **UI Layer**: Shows "Key Takeaways" (tooltip, panel title, help text)
- **Functionality**: Displays TL;DR content instead of speaker notes
- **Code Layer**: Still uses "Speaker Notes" terminology throughout

### Naming Inconsistencies Found
The following elements need to be renamed from Speaker Notes to Key Takeaways:

**JavaScript Methods & Variables:**
- `toggleSpeakerNotes()` → `toggleKeyTakeaways()`
- `handleSpeakerNotes()` → `handleKeyTakeaways()`
- `updateSpeakerNotes()` → `updateKeyTakeaways()`
- `getSpeakerNotes()` → `getKeyTakeaways()`
- `autoCloseSpeakerNotes()` → `autoCloseKeyTakeaways()`
- `speakerNotesVisible` → `keyTakeawaysVisible`

**HTML Element IDs:**
- `speaker-notes` → `key-takeaways`
- `speaker-notes-panel` → `key-takeaways-panel`
- `speaker-notes-content` → `key-takeaways-content`
- `speaker-notes-toggle` → `key-takeaways-toggle`
- `notes-btn` → `takeaways-btn`
- `notes-content` → `takeaways-content`

**CSS Classes:**
- `.speaker-notes` → `.key-takeaways`
- `.slide-notes` → `.slide-takeaways`

### Files Impacted
- `presentation-html/index.html` - HTML element IDs and references
- `presentation-html/assets/js/presentation.js` - Method names and variables
- `presentation-html/assets/js/slideLoader.js` - Method names and variables  
- `presentation-html/assets/js/navigation.js` - Event handler references
- `presentation-html/assets/js/minimal-loader.js` - Fallback functionality
- `presentation-html/assets/css/main.css` - CSS class names (if any)
- `presentation-html/assets/css/components.css` - CSS class names (if any)

### Expected Behavior After Refactoring
1. All method names should reflect "Key Takeaways" terminology
2. Variable names should be semantically correct
3. HTML element IDs should match the functionality
4. CSS classes should be consistently named
5. Code should be self-documenting and intuitive for future developers
6. No functional changes - only naming consistency improvements

### Impact Assessment
- **Risk Level**: Medium - Involves multiple files and cross-references
- **Breaking Changes**: Yes - Will require updating all references
- **Testing Required**: Full regression testing of Key Takeaways functionality
- **User Impact**: None (purely internal code changes)

### Recommended Approach
1. **Phase 1**: Create a mapping document of all old → new names
2. **Phase 2**: Update JavaScript files (methods, variables, references)
3. **Phase 3**: Update HTML files (element IDs, event handlers)
4. **Phase 4**: Update CSS files (class names, selectors)
5. **Phase 5**: Test all functionality thoroughly
6. **Phase 6**: Update documentation and comments

### Current Status
This is a technical debt issue that affects code maintainability. The functionality works correctly but the naming inconsistency will cause confusion for future developers and make the codebase harder to understand and maintain.

### Next Steps
- Schedule dedicated refactoring session
- Create comprehensive mapping document
- Implement changes systematically to avoid breaking references
- Ensure thorough testing of all Key Takeaways functionality

### Notes
- This refactoring should be done as a single atomic change to avoid intermediate broken states
- Consider using find-and-replace with regex patterns for efficiency
- The original "Speaker Notes" to "Key Takeaways" transformation was implemented as a minimal change approach, but a full refactoring is needed for long-term maintainability
- This is a perfect example of why semantic naming is important from the start of a project

---

## Bug #003: Fund Categories File Naming and Scope Refactoring  

**Date Reported**: June 23, 2025  
**Date Resolved**: *(unresolved)*  
**Status**: 🔴 **UNRESOLVED**  
**Priority**: **HIGH**  
**Reporter**: User  

### Problem Description
The file `fund-categories-simple.js` has a misleading name that implies it's only for fund categories, but it actually provides generic interactive drill-down functionality that works for any slide content. This creates confusion about its purpose and limits its perceived reusability for future slides.

### Current State vs Actual Functionality
- **File Name**: `fund-categories-simple.js` (implies fund-specific)
- **Actual Purpose**: Generic interactive exploration system with drill-down navigation
- **Current Usage**: 
  - Slide 5: Goal-Time-Risk Triage Matrix (time horizon exploration)
  - Slide 6: Fund Categories Deep Dive (fund type exploration)
- **Pattern**: Two-level navigation (overview → detailed view → back to overview)

### Misleading Aspects
1. **Name Confusion**: Developers might think it's only for fund-related content
2. **Scope Limitation**: Name doesn't reflect its generic, reusable nature  
3. **Future Scalability**: Will discourage use for other slide types that need similar functionality
4. **Code Clarity**: Purpose is not immediately obvious from filename

### Recommended Refactoring
**New Filename**: `interactive-explorer.js`

**Reasoning for This Name**:
- ✅ **Descriptive**: Clearly indicates it handles interactive exploration
- ✅ **Generic**: Not tied to specific content types (funds, categories, etc.)
- ✅ **Extensible**: Can easily handle new slide types requiring drill-down functionality
- ✅ **Professional**: Uses standard UX/UI terminology
- ✅ **Intuitive**: Future developers will understand its purpose immediately

### Files That Need Updates
1. **File Rename**: `fund-categories-simple.js` → `interactive-explorer.js`
2. **Script Reference**: `presentation-html/index.html` (line 178)
3. **Function Names**: 
   - `initFundCategories()` → `initInteractiveExplorer()`
   - Update all console.log references
4. **Comments**: Update internal documentation and comments
5. **Variable Names**: Any references to "fund categories" in variable names

### Scope of Changes Required
#### **JavaScript Updates**:
- Rename main initialization function
- Update console.log messages and comments
- Rename any fund-specific variable names to generic equivalents

#### **HTML Reference Updates**:
- Update script src path in `index.html`
- Ensure no hardcoded references to old filename exist

#### **Documentation Updates**:
- Update any README or documentation files
- Update inline comments to reflect generic nature

### Expected Benefits After Refactoring
1. **Scalability**: Easy to add interactive exploration to new slides
2. **Code Clarity**: Purpose is immediately obvious to new developers  
3. **Reusability**: Other presentation systems could use this pattern
4. **Maintainability**: Reduces confusion about what the file does
5. **Future-Proofing**: Encourages use for similar interactive patterns

### Implementation Approach
1. **Phase 1**: Rename the file and update the script reference
2. **Phase 2**: Update function names and internal references
3. **Phase 3**: Update comments and documentation
4. **Phase 4**: Test all interactive functionality on slides 5 and 6
5. **Phase 5**: Verify no broken references or console errors

### Risk Assessment
- **Risk Level**: Low - Simple rename operation with find/replace
- **Breaking Changes**: Minimal - Only file path reference needs updating
- **Testing Required**: Verify slides 5 and 6 interactive functionality works
- **User Impact**: None (purely internal refactoring)

### Current Status
This is a code quality and maintainability issue. The functionality works perfectly but the naming creates confusion about its purpose and scope, which could limit its future usage and make the codebase harder to understand.

### Next Steps
- Schedule refactoring session to rename file and update references
- Ensure comprehensive testing of interactive drill-down functionality
- Update any documentation that references the old filename
- Consider creating a pattern guide for future interactive slide development

### Notes
- This file provides a valuable reusable pattern for interactive presentation content
- The current implementation is robust with multiple initialization fallbacks
- Proper naming will encourage its use for other slides requiring similar functionality
- This is an excellent example of why semantic naming is crucial for code maintainability

---

## Bug Template (for future issues)

## Bug #XXX: [Bug Title]

**Date Reported**: [Date]  
**Date Resolved**: *(leave blank if unresolved)*  
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
