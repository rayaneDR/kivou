# Independent Kivou starter — finish review

## 1. Disposition

**FIX, then recapture the affected states.** Preserve the visual direction; a rebuild is unwarranted. The supplied captures show a coherent, restrained Operate surface with clear mission composition, explicit memory inclusion and an appropriately small desktop presence. This is a researched plan and working starter, not a completed or released general personal agent.

## 2. Scope and evidence

Reviewed PRODUCT.md, PLAN.md, docs/UX-RESEARCH.md, app/index.html, app/style.css, app/workspace.js, app/island.html, app/island.css, app/island.js, relevant desktop/main.cjs behavior and the Impeccable craft floor. Visually inspected the five real development-Electron captures in `.impeccable/review/`: desktop.png (1440), tablet.png (900), mobile.png (390), island-compact.png and island-expanded.png. These captures precede provider-settings UI. No approved image comp exists; the reference is the established Kivou ink/paper/citron identity and DM Sans, applied to independently written application code.

Provider-settings UI is not built in this reviewed surface. Gmail, MCP tools, calling, browser control, messaging integrations and autonomous scheduling are absent and are not credited as implemented. No customer, revenue or company-interest claim is supported or implied by this review. The screenshots show composition and memory-preview states; they do not establish live provider operation, recovery, completion, export, keyboard behavior or performance. This reviewer did not perform a new interactive app run.

## 3. Material findings

1. **P1 — The expanded island has no Stop control.** `app/island.html` exposes Ask Kivou and Open your workspace; `app/island.js` disables Ask while busy and changes the header to “Kivou is working.” A user who starts a quick mission must enter the workspace to stop it. This misses the specified expanded-island contract. Add an explicit Stop run control while active, calling the existing cancellation request, with progress and failure feedback. Verify starting and stopping from the island without opening the workspace.

2. **P2 — Essential permission copy is treated as microtext.** `.consent` in both stylesheets is 11px; the workspace limitation note is also 11px. In the 1440 and 390 captures these are the least readable parts of the central decision, despite describing what leaves the device. Raise consent text to at least 12px, preferably 13px in the workspace, retain readable line height and allow its row to grow. Use the same floor for the nearby preview limitation and memory-retention explanation. The decorative author/version line need not be promoted simply because the detector flags it. Recapture the memory-included state at all three widths and the expanded island after this change.

3. **P2 — Disconnected island leaves the disabled action unexplained.** The supplied expanded capture shows a disabled Ask Kivou button while the header says only “Kivou is here.” `render()` has the ready state but supplies no visible disconnected explanation. Show a concise persistent instruction such as “Connect Codex in your workspace to ask a question” with the existing workspace action. Keep that instruction synchronized with probing and connection failures. A new user should understand the next step without trying a disabled button.

## 4. Craft assessment

The desktop, intermediate and narrow compositions have no visible clipping or overlapping controls in the supplied captures. The mobile rail becomes a practical stacked navigation area; consent and submission wrap cleanly. The explicit memory preview is well placed before consent. The incumbent paper palette is a brand decision, so the detector's cream-palette warning is not a reason to change it. Type hierarchy, restrained surfaces, authored K mark and citron emphasis form a coherent identity without a card-grid scaffold or fabricated activity.

Source provides visible focus treatment, labels, disabled states, live status regions, hover feedback, reduced-motion rules and a short pointer-only island reveal. The desktop code establishes 264 × 48 logical pixels for the collapsed island; capture pixel dimensions alone should not be mistaken for logical window size. Contrast and keyboard behavior have not been instrumented by this independent review, so this is not an accessibility certification. Esc closes the island in source, but focus restoration after hiding the panel still needs an interactive check.

## 5. Exit checks

After the three fixes, recapture the changed consent and disconnected views, plus an active island with Stop and its cancelled state. Walk keyboard opening, Tab navigation, Escape and reopening; ensure focus remains visible on a visible control after collapse. Check reduced motion in the actual Electron app. Keep the known functional evidence from the parent separate from this visual verdict: a real mission, reopened history, preserved included-memory snapshot and export must be demonstrated before calling the starter's vertical slice accepted. Any later provider-settings surface needs its own screenshots and review; these captures cannot approve it.
