# Kivou independent build plan

Owner: rayaneDR. Decision date: 2026-10-29. This replaces the Goose-fork implementation direction, while retaining that experiment separately. Revenue and company interest are goals, never guaranteed outcomes.

## Product thesis

Build a general Windows personal assistant and second brain: **goal → visible context → bounded run → review → portable result**. The owner clarified that email, messages and personal workflows are central; creators are only one audience. Initial pilot segment: Windows users with repeated inbox/reply work. Validate this segment directly; public complaints are not customer commitments.

The differentiating hypothesis is a mission handoff containing what was requested, which memory was included, what completed, what remains uncertain and where results are saved. Similar features already exist elsewhere; the product must earn its position through execution and user outcomes.

## Stage 1 — independent vertical slice (start now)

- New workspace C:/Users/rayan/Kivou with original application code and independent Git history.
- Original local mission store with atomic persistence, explicit memory snapshot, bounded input, one active run, cancellation and restart recovery.
- Provider adapters: direct Codex login, OpenAI-compatible APIs, Anthropic, Gemini and Ollama. Protocol tests use synthetic fixtures until a user configures that provider; only direct Codex has a real model receipt so far. Ignore inherited configuration; disable unrelated tools, plugins and hooks. No Goose binary, ACP bridge or upstream source tree.
- English workspace, a small 264 x 48 desktop island, visible connection state, mission history/search, memory editor and original playbook prompts.
- Export each result to a new Markdown/JSON bundle. Never overwrite earlier exports. Model-generated claims remain drafts until reviewed.
- Tests cover Unicode, restart recovery, cancellation races, input bounds, no cross-mission memory, corrupt-file preservation and export integrity. Separate one real model cycle from synthetic tests.
- Build a Windows single-file portable Kivou.exe. Publish only after downloading and launching the exact asset, with SHA-256.

Acceptance: new user can connect, complete one real mission, close/reopen, inspect included memory and export without losing work. No paid key required by the initial adapter; eligibility and account limits still apply.

## Stage 2 — first real personal-agent action loop

Connect the user's own Gmail read-only, scope the requested inbox/time range, and return a source-linked catch-up. Then build reply drafts and an exact-action review queue: recipient, subject, body, account, permission and actual receipt. MCP tools and model connections are separate. The development chat's credentials/plugins are never imported.

Persist intent and approval before dispatch. Denied, changed or expired approval never executes. A timeout after a send is uncertain: reconcile with provider records before retrying. A local idempotency key alone does not guarantee exactly-once delivery.

Phone calls require a separately connected telephony provider, explicit scope and its actual cost. No free phone service or autonomous calling is claimed. Gmail OAuth distribution requirements and public-app verification must be checked before launch.

## Stage 3 — prove a customer problem

Interview 8–12 Windows users with repeated inbox/personal work; target is a research plan, not a completed count. Observe at least three real workflows. Compare existing tools and manual alternatives. Measure task completion, repeated setup and review effort with consent, not invented benchmarks.

Go/no-go: at least two people independently demonstrate the same costly repeated problem and agree to a real pilot. Prefer one concrete job, such as preparing and reviewing a reliable inbox/reply handoff, over an everything-agent pitch. Record negative evidence too.

## Stage 4 — useful actions and reliability

Add only the integration required by pilots. Each action adapter declares read/write scope; preview external changes and bind authorization to the exact action. Deduplicate retries using a persisted action key; record success only from a receipt. Prototype crash/recovery, revoked permissions, expired auth, failure and rate limits before unattended work.

Research/source checking, document ingestion and additional provider protocols follow actual workflow needs. Do not market browser control, email, local models, multi-agent swarms or scheduled operation before they are implemented and tested. An 8 GB machine favors one active model run and a small background footprint.

## Stage 5 — public proof and revenue experiment

Publish independent source, honest capability table, Windows guide, real screenshots and a Remotion demo of the actual independent application. Archive the earlier fork without deleting its history or legal notices; avoid presenting its old video as the new app. Keep rayaneDR/kivou as the intended canonical independent repository once the working slice is reviewable.

Offer a small paid pilot only after observing value. Open-source core can support a future paid team service, setup/support or managed integrations, but pricing, payments, recurring hosting and a commercial model remain unvalidated decisions. Zero additional spend without revenue or explicit revised budget.

## Measures and failure criteria

Track actual activated users, completed real missions, repeat use, pilot commitments, payments, fees and settled cash separately. Stars, views, generated demo data and free accounts are not revenue. Stop expanding features if users do not return or the workflow has no meaningful advantage.

## Skills by stage

Replica Recon: sourced feature and problem maps. Reverse Engineer Anything: only for a later unanswered shipped-artifact/runtime question, not a ritual. Impeccable/Taste/Apple design/Animate: interface hierarchy, original identity and small-island behavior. Remotion: an accurate product demo after working screenshots exist. Add a skill only for a demonstrated capability gap; no indiscriminate installs.


## Research revision and execution status

The deeper study in [docs/UX-RESEARCH.md](docs/UX-RESEARCH.md) expands the landscape to 18 products and distinguishes documented patterns, reference imagery and individual user reports. Grok Bot, Hermes, DeerFlow, Cowork, Perplexity Computer and small desktop companions informed the revised interaction plan. No paid competitor account was used.

Started: an independent original Node/Electron foundation, 15 deterministic tests, one real direct-Codex model run, and a development native-island/UI smoke at 1440/900/390. This is not yet the general-agent product described above. API adapters have synthetic protocol tests; the complete multi-provider settings UI and actual Windows encrypted-key path passed desktop checks with a synthetic secret. One separate real UI Codex cycle completed and reopened. Live non-Codex provider/model access remains unverified. Gmail, MCP tools, calls and autonomous external actions are not connected. The earlier Goose-fork release build was cancelled; no old fork executable is being passed off as the independent app.

Next concrete checkpoints: implement and test the action-review ledger; then wire one Gmail/MCP read-only integration with a real account connection. Ship source and an executable only with a capability table matching those receipts. There is no scheduled unattended Kivou expansion or revenue promise.


## Confirmed visual direction

Owner explicitly selected iOS interaction style using apple-design on 2026-10-29: four persistent sections, grouped settings, switches, clear typography and floating bottom navigation at narrow widths. Replace the paper/citron prototype skin with a restrained floating functional layer: frosted navigation and island, crisp readable content, subtle depth and short meaningful motion. This is a Windows/web approximation, not Apple's native system material or an affiliation claim. Provide reduced transparency, reduced motion and high-contrast fallback; test blur cost on the actual 8 GB machine. See docs/UX-RESEARCH.md for official Apple sources and .impeccable/direction.md for the design contract.
