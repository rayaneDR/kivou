---
name: Kivou
description: An iOS-inspired personal assistant workspace adapted for Windows.
colors:
  blue: "#0765d8"
  bg: "#f2f2f7"
  surface: "#fff"
  ink: "#18202d"
  muted: "#5f6877"
  line: "#dedfe7"
  glass: "rgba(252,252,255,.82)"
  selected: "#e8eefb"
  switch-on: "#24824e"
  dark-bg: "#14161b"
  dark-surface: "#20232a"
  dark-ink: "#f0f2f7"
  dark-muted: "#b0b8c8"
  dark-line: "#383e49"
  dark-blue: "#8db8ff"
  dark-glass: "rgba(35,39,48,.9)"
  dark-selected: "#33415b"
  dark-primary: "#316cda"
  island-surface: "rgba(28,37,53,.95)"
  island-ink: "#f6f5f0"
  island-muted: "#d4dded"
  island-accent: "#abc5ff"
typography:
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI Variable', 'Segoe UI', sans-serif"
    fontSize: "16px"
    lineHeight: 1.5
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI Variable', 'Segoe UI', sans-serif"
    fontSize: "34px"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-.035em"
  title:
    fontSize: "19px"
    fontWeight: 600
  label:
    fontSize: "14px"
  island:
    fontFamily: "'Segoe UI', system-ui, sans-serif"
    fontSize: "12px"
rounded:
  control: "13px"
  group: "18px"
  conversation: "20px"
  capsule: "24px"
  tabs: "32px"
  island-field: "8px"
spacing:
  icon-gap: "12px"
  group-inset: "18px"
  page-narrow: "20px"
  composer: "22px"
  conversation-gap: "24px"
  page-wide: "35px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.surface}"
    rounded: "{rounded.capsule}"
    padding: "11px 21px"
  button-plain:
    textColor: "{colors.blue}"
    rounded: "{rounded.control}"
    padding: "10px 14px"
    height: "44px"
  group:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.group}"
    padding: "17px 19px"
  composer:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.capsule}"
    padding: "{spacing.composer}"
  island:
    backgroundColor: "{colors.island-surface}"
    textColor: "{colors.island-ink}"
    rounded: "{rounded.capsule}"
    width: "264px"
    height: "48px"
---

# Design System: Kivou

## Overview

**Creative North Star: "A little room to think"**

Kivou combines a quiet, opaque work canvas with a small translucent companion. The owner's chosen iOS direction appears in large titles, inset grouped settings, labeled switches and four stable destinations. Wide Windows layouts adapt those destinations to a sidebar; narrow windows use floating bottom tabs.

The material is a custom Electron/CSS approximation. The original K mark and rayaneDR attribution remain Kivou's identity. The system does not imply Apple affiliation, native Apple lensing or desktop blur through the transparent island. The north star uses existing interface language rather than introducing a new brand metaphor.

**Key Characteristics:**
- System typography and restrained blue actions.
- Opaque conversation, permission and settings surfaces.
- Persistent labeled navigation and an optional compact companion.
- Brief press feedback, explicit reduced motion and opaque fallbacks.

## Colors

Cool neutral surfaces carry the work; blue marks actions and selection. Green communicates enabled switches and connected state, rather than a second brand accent.

### Primary

- **Action Blue** (`blue`): interactive labels, primary actions, focus outlines and selected navigation.
- **Companion Blue** (`island-accent`): the dark island's action, caret, focus and working indicator.

### Neutral

- **Grouped Canvas** (`bg`) and **Content White** (`surface`): page background and opaque content groups.
- **Deep Ink** (`ink`) and **Supporting Slate** (`muted`): primary content and supporting text.
- **Quiet Divider** (`line`): settings rows, content disclosures and rail edge.
- **Navigation Glass** (`glass`) and **Selected Wash** (`selected`): navigation material and selected destination.
- Dark-prefixed tokens are the observed system dark-mode overrides. The primary button uses `dark-primary`; dark blue text uses `dark-blue`.
- Island tokens define its consistently dark treatment independently of workspace theme.

**The Readable Canvas Rule.** Keep conversation and permission content on opaque surfaces; reserve translucent material for navigation, the model control and companion.

## Typography

Workspace text uses the platform system stack in the frontmatter. On Windows it resolves to Segoe UI Variable or Segoe UI. The island uses its separate Segoe UI/system stack. No external font dependency is required.

The hierarchy is compact and familiar: large bold section headings, a semibold editable mission name and ordinary form labels. The home greeting is (36px/1.17), reducing to (34px) at the intermediate breakpoint and (33px) in narrow windows. Standard section headings remain (34px/1.15). Mission titles use (19px), reducing to (17px) on narrow screens. Main descriptions use (16px/1.65), reducing to (15px); conversation paragraphs use (16px/1.8), bounded to (72ch). Supporting and permission copy uses (13px), with selected narrow layouts and the island using (12px). Do not shrink consent to decorative microcopy.

## Layout

The wide shell uses a (248px) sticky sidebar and one flexible content column. Pages are centered at a maximum outer width of (815px), with (28px 35px 55px) padding. The top bar is (68px) high. At (900px) and below the rail becomes (210px), pages use (25px 25px 45px) padding, and send controls wrap.

At (620px) and below the layout becomes one column, pages use (22px 20px 32px) padding and the top bar is (60px) high. The four destinations become fixed labeled bottom tabs with (14px) side offsets, bottom safe-area handling and (53px) minimum button height. Body bottom padding is (95px) so content can scroll above the navigation. Keep lower settings, details and send actions reachable at the end of scroll.

The native companion's compact window is (264px by 48px). Its expanded request panel scrolls within the available height. Do not interpret the narrow workspace preview as an implemented native iPhone application.

## Elevation & Depth

Opaque groups use tonal separation; the composer has a very faint shadow. Translucent navigation adds controlled depth: sidebar blur (22px), model control blur (12px), narrow tabs blur (24px), island blur (18px). Exact shadows and motion values live in the sidecar. Blur performance has not been benchmarked.

**The Opaque Fallback Rule.** Preserve the reduce-transparency setting and the reduced-transparency/increased-contrast media fallbacks. Workspace material becomes the solid surface; the island becomes solid dark with an outline.

## Shapes

Use soft corners for distinct containers, with capsule primary buttons and companion; grouped settings are less rounded. Settings rows share one outer group and thin internal dividers. Search uses the control radius, user messages the conversation radius, and narrow navigation the larger tabs radius. Original line SVG icons use rounded caps and joins with a (1.8) stroke width in the workspace. Do not introduce Apple logos, imitation macOS window controls or iPhone hardware chrome.

## Components

### Buttons

Primary actions are blue capsules with white text; the send action uses the narrower observed (10px 16px) padding. Plain actions are blue text with rounded press areas. Workspace buttons have a (44px) minimum height, except the compact top-bar control's narrow (40px) override. Disabled actions reduce opacity to (.45). Fine-pointer hover changes the surface, press scales to (.97), and visible keyboard focus uses a (3px) blue outline with (3px) offset.

### Inputs / Fields

Forms use transparent native text fields inside opaque groups. Settings rows are at least (60px) high, with labels opposite provider/model controls and vertically stacked endpoint/key fields. Keep visible labels, key masking and explanatory provider text. Search uses its own muted filled surface. The island field uses an explicit stroke, dark fill and smaller corners. Focus must remain visible on each surface.

### Cards / Containers

Inset groups contain memory, settings and mission lists. Group titles sit outside the surface. The composer combines message entry, playbook selection, an explicit memory switch and preview, transmission consent, Stop and Send. Preserve its content order and readable wrapping. User message bubbles are tinted; generated text stays on the content canvas.

### Navigation

Home, Missions, Memory and Settings remain the same four labeled destinations at both layouts. Use the `aria-current` selected state, an icon and visible text. Desktop recent missions are secondary navigation; they disappear with the rail in narrow windows. Navigation uses original Kivou SVG geometry.

### Switches

The workspace's labeled native checkbox switch is (44px by 27px), with a (23px) white thumb, a (17px) checked translation and green enabled fill. Preserve keyboard operation and semantic labels. Memory inclusion remains explicit and previewed before transmission consent.

### Companion and notices

The island has a persistent toggle, readiness/working text, request field, consent, a real Stop control when active and a workspace handoff. Pointer expansion reveals the panel over (180ms); keyboard expansion is immediate. Collapse restores focus to the toggle. Working status pulses over (1.6s). Reduced motion disables animation and transitions. This is a bounded reveal, not a spring morph or a gesture sheet.

Dismissible notices sit above content and move above the narrow tab bar. They use a dark readable surface, live status and a labeled close action; keep long messages wrapped.

## Do's and Don'ts

### Do:
- **Do** retain the four labeled destinations across widths.
- **Do** keep consent, provider help and disconnected states readable and truthful.
- **Do** preserve keyboard focus, reduced motion and opaque material fallbacks.
- **Do** use original Kivou identity assets and system typography.

### Don't:
- **Don't** describe CSS translucency as native Apple Liquid Glass or measured desktop lensing.
- **Don't** add invented connections, missions, customer metrics or account state.
- **Don't** restore the superseded paper/citron palette or external DM Sans dependency.
- **Don't** hide required actions or text behind fixed navigation.
