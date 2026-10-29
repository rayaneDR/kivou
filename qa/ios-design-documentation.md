# Current iOS-inspired system documentation

Created 2026-10-29 in scan mode after the final starter review. Write boundary: DESIGN.md, .impeccable/design.json, .impeccable/surfaces/app-index-html.md and this report. No application, core, package or product-plan files changed by the documenter.

## Authority and extraction

Read PRODUCT.md, AGENTS.md, .impeccable/direction.md, the pinned apple-design skill and Impeccable reference/document.md. The owner's already-selected iOS direction and delegated implementation choices supply the qualitative authority; no new identity workshop was needed. Neither DESIGN.md nor the sidecar existed, so this creates them without overwriting an incumbent system. The north star uses the already-shipped island heading, “A little room to think.”

Extracted current app/style.css and app/island.css, checked component markup and island focus handling. Inspected the actual settings-mobile screenshot as a visual cross-check; the independent complete review remains qa/ios-finish-review.md. The design record captures the implemented system rather than the superseded paper/citron or earlier glass-only shell. The direction record's historical self-hosted DM Sans sentence is stale: both current surfaces use system stacks. The parent corrected the island's stale font import before final documentation, and qa/island-font-check.json records the corrected Segoe UI font, restored collapse focus and zero model calls.

DESIGN.md owns actual primitive colors, typography, observed spacing/radii and component properties in YAML frontmatter. All eight canonical markdown sections are present. The version-2 sidecar contains extensions for shadows, motion, breakpoints, synthesized preview ramps, narrative and seven isolated component examples. The original K SVG geometry is inlined for the companion preview. Generated ramp previews are explicitly identified as synthesized OKLCH samples, not shipped application tokens. Snippets resolve existing workspace CSS variables with literal fallbacks; they require no framework, font CDN or icon runtime. The static companion snippet illustrates appearance, not native IPC behavior.

## Verification and limits

Checked JSON parsing, schemaVersion, component count, nonempty scoped snippets, eight-step ramp lengths, canonical section order, token-reference targets and frontmatter component-property limits using local structural checks. No official Stitch schema/linter or new panel-render audit was run; representative snippets remain documentation examples. These checks do not replace application smoke or accessibility testing.

The accepted interface review is at development-starter scope with both targeted findings resolved. qa/desktop-smoke.json is the final synthetic form/UI run with zero model calls and Windows encryption of a synthetic key. qa/desktop-model.json separately records one earlier real model call through the UI and a reopened completed mission; qa/provider-live.json is separate core provider evidence. No private key is reproduced here. Gmail, MCP tools and calls remain disconnected. No public independent executable, native Apple material fidelity, screen-reader certification or measured animation performance is claimed.


Post-documentation note: the root agent corrected the old DM Sans sentence in .impeccable/direction.md to match the final platform system stack. DESIGN.md and the sidecar already recorded the correct implementation.
