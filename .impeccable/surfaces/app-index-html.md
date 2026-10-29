# Workspace surface: app/index.html

Status: implemented original Windows Electron development starter, 2026-10-29. Visual authority: owner's explicit iOS direction, recorded in ../direction.md; actual tokens in ../../DESIGN.md supersede the stale DM Sans sentence in that direction record.

Purpose: start a mission, inspect context and consent before sending, reopen saved work, manage explicit memory and configure a selected model. The first viewport pairs a large conversational greeting with a named mission and one clear composer. Returning missions replace the greeting with their conversation.

Structure: Home / Missions / Memory / Settings, persistent sidebar above 620px and floating labeled bottom tabs at or below 620px. One content column; opaque grouped content; glass only around navigation and selected controls. Keep API model, base URL and secure key fields readable in both wide and narrow settings. Ollama hides the key field and explains local prerequisites.

Companion: app/island.html is a separate 264x48 compact native window with an expandable short request, transmission consent, Stop while running and workspace handoff. It excludes saved memory in quick requests. Keyboard collapse returns focus to its toggle. The island is a CSS material approximation, not native Apple lensing.

States to preserve: disconnected, empty history/search, busy/cancel, disabled send, consent unchecked, optional memory preview, errors, dismissible notice, light/dark, reduced motion and reduced transparency. Show actual local state and distinguish planned connections from connected services.

Evidence: ../../qa/ios-finish-review.md accepts the development starter with both focused findings resolved. ../../qa/desktop-smoke.json is the final zero-model-call UI/form proof; ../../qa/desktop-model.json separately records one earlier actual UI model call and reopened completed mission. ../../qa/island-font-check.json follows the final system-font correction. Screenshots under ../review/ include API and keyless Ollama settings. No released independent executable, full external-provider compatibility, screen-reader certification or animation performance is established by these captures.
