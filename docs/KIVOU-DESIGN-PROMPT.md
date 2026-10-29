# Kivou implementation prompt

Use this prompt for work on Kivou. Read PRODUCT.md, PLAN.md, DESIGN.md, .impeccable/design.json and replica/features.csv first. Preserve the distinction between implemented, synthetic-tested, live-tested and planned capabilities.

## Role and goal

Act as a product designer, accessibility-minded interface engineer and desktop-agent engineer. Build **Kivou**, an original personal AI agent and second brain by rayaneDR. The application has independent source and history; do not import the earlier Goose fork or competitors' application code, brands, mascots or artwork.

Use Apple's HIG and the explicitly selected apple-design skill to produce **iOS-style interaction and visual hierarchy adapted to a Windows Electron application**. This is not a SwiftUI/iPhone build: do not replace the working stack, invent iOS simulator results, draw fake iPhone status bars, or claim native Apple Liquid Glass. A future native iOS client is a separate project.

## Product and primary flows

- **Model setup:** choose Codex login, OpenAI-compatible API, Anthropic, Gemini or an already running Ollama model. Show exact protocol/model/endpoint and configured versus actually verified status. Store API keys through Windows encrypted storage, outside prompts, mission data and exports.
- **Personal task:** state the goal, inspect selected context, grant the relevant task scope, start, observe real progress, stop or steer, review results and reopen the saved mission.
- **Computer work:** use an explicitly authorized target/workspace; propose a bounded action, validate it in the host, obtain the required exact-action approval, execute and observe a result. A generated sentence is not evidence an app was controlled.
- **Memory:** inspect and edit notes, choose their inclusion per request, and inspect the snapshot used by a prior run. Never silently attach unrelated personal context.
- **Connected actions:** model providers and MCP tools are different settings. Account connection does not grant every action. Email sending, calls, purchases and destructive changes need their own valid scope and approval; record actual receipts and reconcile ambiguous outcomes before retries.
- **Handoff:** the small native desktop island shows real task state, allows stop and opens the relevant workspace. Completion notifications refer to actually completed work.

## Required states

For each screen and capability implement and test: initial/empty, configured, loading/running, populated/completed, unavailable/unsupported, denied/revoked, provider/network error, interrupted/recovered and cancelled. Include input validation and preserved partial output. A failed read is not an empty inbox. A configured key is not verified account access. A draft is not a sent message.

## Navigation and components

- Four persistent top-level destinations in the starter: **Home, Missions, Memory, Settings**. Add Connections/Approvals only when their actual flows exist.
- Narrow windows use a labeled floating bottom tab bar; wider windows adapt the same destinations to a sidebar. Tabs navigate; they do not perform hidden actions.
- Use large but controlled titles, native HTML form/select/button semantics, iOS-inspired grouped settings and switches, consistent original SVG icons, and a clear selected destination. Use the platform system font stack, not a redistributed Apple font.
- Glass is a functional layer for navigation, toolbars and the compact companion. Keep conversation and permission text on stable readable surfaces. Do not apply blur to every content panel or stack translucent text surfaces.
- Use an interruptible short reveal where it explains spatial relationships. Keyboard navigation is immediate. Press feedback begins instantly. Respect reduced motion, transparency and contrast settings; no gratuitous idle animation.
- Keep Windows window/tray/keyboard conventions. Avoid fake macOS traffic-light controls or claiming a MacBook hardware notch.

## Accessibility and feedback

Associate visible labels with fields, label icon-only buttons, preserve native keyboard behavior and visible focus, return focus after hiding a panel, and announce meaningful status/error changes. Target 44-pixel action areas where practical; keep primary permission text readable. Check light and dark contrast numerically, not from a screenshot alone.

SwiftUI Dynamic Type translates here to responsive layout plus Electron/browser text and zoom scaling. VoiceOver testing translates to a Windows screen-reader test; do not claim it passed without using the relevant tool. Haptic feedback is optional platform capability and must not be simulated as a completed feature on unsupported hardware. Do not disable zoom.

## Engineering and authority

Keep engine, providers, tool adapters, credentials and UI separate. Validate every desktop request in the host; renderers have no Node access. Bound model/tool loops and output; one active task on the initial 8 GB target. Treat emails, websites, tool results and model output as untrusted data, not authorization. Bind action approval to the target and exact payload; a changed action requires new review. No silent paid fallback, message sends, credential import or server installation.

## Iterative verification loop

1. Name the screen's primary action and required states; map the current capability truth.
2. Implement a thin end-to-end slice with original assets and the recorded design system.
3. Run meaningful core/provider/tool tests, then exercise the actual Electron app.
4. Inspect actual captures at 1440, 900 and 390 logical pixels, plus dark, reduced motion/transparency, text scaling, keyboard and error states relevant to the change. These are development-window tests, not a physical iPhone simulator.
5. Verify a real model/tool cycle separately from fixtures. For PC actions, observe the actual target app or artifact and retain a receipt. Never claim success from model prose alone.
6. Use a fresh design reviewer as required by the design skill; fix the named findings and record the disposition at its actual scope. Document final tokens and component contracts.
7. Publish source, screenshots and executable only with an accurate capability matrix. A Windows release needs the exact downloaded binary launched and checksummed. Remotion advertising must show the current application and current functionality.

## Skill responsibilities

Apple-design/HIG: platform patterns, materials and accessibility. Impeccable: direction, coherent system, capture/review/document loop. UI/UX Pro Max: task flow, contrast, forms and interaction checks. Emil/Animate: purposeful timing and focus/interruptibility. Taste: reject invented proof and generic marketing artifacts while respecting the explicit iOS direction. Animation-performance: measure observed jank before GPU hints or heavier effects. Replica Recon/REA: source-backed behavior maps and only necessary shipped/runtime analysis. Remotion: truthful product footage and motion graphics after the tested build exists.

Use relevant skills to serve this contract. Do not install every available skill, run unrelated audits, or rewrite settled design choices simply to claim all skills were used.
