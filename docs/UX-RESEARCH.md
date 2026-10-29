# UI/UX research — personal agents

Research date: 2026-10-29. This is a targeted landscape review, not a ranking of every AI agent. Product documents describe advertised behavior; public user reports describe individual experiences. Neither substitutes for direct testing or customer interviews.

The broader landscape now covers 18 products: the 11 in RESEARCH.md plus Grok Bot, Hermes, DeerFlow, Claude Cowork, Perplexity Computer, Wisp and Neika. The closer UX study below focuses on their task, context, settings and approval patterns. No paid account, competitor executable or private service was accessed.

## Patterns worth adopting independently

| Product / evidence | Interaction pattern | Kivou decision |
|---|---|---|
| [Grok Bot: bots](https://docs.x.ai/grok-bot/bots), [guide](https://x.ai/bot/guides/grok-bot-101) | Durable named workers with separate conversations; a persistent computer can be handed back to the person | Keep a mission's context and results together. Add worker roles only after a single useful workflow is reliable. A cloud computer is not included in the zero-budget local build. |
| [Grok Bot: approvals](https://docs.x.ai/grok-bot/approvals-security-and-privacy) | Inline cards separate an action approval, secure secret entry and account connection | Use three different flows: model setup, service connection, exact-action review. Never ask for an API key inside normal chat. |
| [OpenClaw: panels](https://docs.openclaw.ai/web/control-ui/panels) | Conversation remains central; optional details/files/tools dock alongside; smaller screens give one panel enough room | Center task conversation; open a result/context panel explicitly. Avoid squeezing chat, tools and files into three tiny columns. |
| [Hermes release notes](https://github.com/NousResearch/hermes-agent/releases), [memory providers](https://github.com/NousResearch/hermes-agent/blob/main/website/docs/user-guide/features/memory-providers.md) | Guided setup, connectors and remembered procedures; memory backends have different costs and behavior | Progressive onboarding: model → one connection → one useful task. Show memory source/scope and provider choice rather than a large settings wall. Do not promise a free trial model without a funded provider. |
| [DeerFlow documentation](https://github.com/bytedance/deer-flow/blob/main/frontend/src/content/en/index.mdx) | Runtime harness and workspace app are separate concerns; tools, memory and skills compose around a thread | Keep engine, adapters and interface separate. Completed outputs need a stable preview/export; in-progress output must not pretend to be a finished artifact. |
| [Claude Cowork guide](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork) | A user states the task, reviews the approach, can steer progress and choose permission behavior | Support clear run state, stop, recovery and a review point. Keep model consent distinct from permission to send an email. |
| [Perplexity Computer](https://www.perplexity.ai/en-GB/products/computer), [changelog](https://www.perplexity.ai/changelog) | Task-first composition, connected tools, context/sources, ongoing work and results | Start from the user's goal, then show relevant context and results. Connected services are capabilities, not decoration. |
| [Wisp](https://github.com/ycl-2004/Wisp) | A small desktop presence; expansion direction, screen boundaries and focus restoration matter | Keep the island small and keyboard reachable; test multiple displays, focus and transparent hit regions before a broad release. No Wisp source or assets are reused. |
| [Neika](https://github.com/alexiaWvinchester/Neika) | A compact Windows capsule and bring-your-own-key settings are advertised | Small Windows islands and BYOK already exist: these alone are not a novel product claim. Its performance numbers are author claims, not our measurements. Its proprietary license rules out importing its implementation. |

## Visual evidence and limits

- `research/screens/grok-bot-guide.png`: public official walkthrough page, captured in a fresh isolated Edge session.
- `research/screens/grok-cloud-computer.png`: the official guide's image of a cloud desktop, captured and inspected. It is reference material, not Kivou media or a hands-on Grok Bot session.
- Perplexity's public page loaded and its title was observed, but both screenshot attempts timed out. No visual comparison claim is made from an unavailable screenshot; its documentation supports the interaction analysis.
- Current Kivou screenshots in `.impeccable/review/` depict the independent local prototype, not competitors and not a finished personal-agent release.
- The in-app browser skill file was unavailable at its catalog path and was not found in the installed plugin skill tree. Research used public web tools and a separate unsigned-in Edge session; the owner's tabs and signed-in state were not used.

## What real users are asking for

These are self-selected reports, not measured prevalence. Preserve counterexamples and follow-up corrections.

| Need | Direct user source | Design consequence |
|---|---|---|
| Useful work without becoming an agent engineer | [OpenClaw discussion](https://www.reddit.com/r/openclaw/comments/1s0nz1u/does_openclaw_do_anything/) includes frustration about setup and positive replies describing working recurring tasks | Ship one end-to-end workflow with a setup check and a visible result. Measure a new user's first success, not the number of integrations. |
| Understand how much a task consumes | [Grok Bot user](https://www.reddit.com/r/cursor/comments/1w7j1ue/grok_bot_is_expensive/) found inbox/schedule help useful but reported rapid allowance consumption | Show provider and reported tokens, limits and stop controls. Do not present one person's prices as current product pricing or invent exact cost estimates. |
| Find work after interface changes | [Cowork user](https://www.reddit.com/r/ClaudeAI/comments/1uqdohx/anthropic_quietly_folded_the_cowork_tab_into/) initially thought work was lost, then found it had moved into Projects | Stable navigation and explicit migration notices matter as much as persistence. An empty state must distinguish no work from a failed read. |
| Recover history instead of silently resetting | [Cowork report with correction](https://www.reddit.com/r/ClaudeCowork/comments/1us1c97/claude_cowork_update_just_stole_all_my_data_and/) says a later update restored the files; [OpenCode #43277](https://github.com/anomalyco/opencode/issues/43277) reports stuck sessions | Do not repeat allegations of permanent deletion as fact. Build explicit recovery, preservation of corrupt originals and portable exports. |
| Keep long sessions responsive | [Hermes #77311](https://github.com/NousResearch/hermes-agent/issues/77311) reports renderer growth and freezes under heavy histories | Load summaries in navigation, page histories, and measure a real long-session memory benchmark. Our current full-snapshot prototype needs pagination before that scale. |
| Know whether memory is current | [Hermes #66025](https://github.com/NousResearch/hermes-agent/issues/66025) describes stale snapshots | Store provenance/version with included context; show which snapshot a run actually used. |
| See stable deliverables | [DeerFlow #3107](https://github.com/bytedance/deer-flow/issues/3107) documents preview flicker/partial-file presentation in a tested prerelease | Distinguish working output from completed files and reopen stable artifacts. This is historical release-testing evidence, not a claim about the latest release. |
| Control what is remembered | [AnythingLLM #4288](https://github.com/Mintplex-Labs/anything-llm/issues/4288), [LibreChat #11497](https://github.com/LibreChat-AI/LibreChat/discussions/11497) | User-editable memory, per-task scope, visible inclusion and a real forget path. |

## Kivou experience specification

Kivou is a **general personal assistant/second brain**, per the owner's latest clarification. Creator work is one use case, not the whole product. The design must make actual actions understandable, while the starter prototype remains a drafting and local-export foundation.

### Main workspace

Left navigation: Today, Missions, Memory, Connections, Settings. Center: current conversation and plan/progress. Optional right panel: output, included context or action details, one active panel at a time. On narrow windows, the panel becomes a full-width view with an explicit back action. No fabricated KPIs or fake connected-account logos.

Today shows only real items: running work, things needing approval, recent completed results and scheduled work that is actually configured. A fresh account shows a guided first task instead of invented activity. Global search searches local mission titles and answer text first; semantic search is a separate later capability.

### Model and connection setup

Model providers and tools are separate. Initial protocols: Codex login, OpenAI-compatible APIs (custom base/model, including xAI-compatible services where supported), Anthropic Messages, Gemini generateContent and Ollama. These are concrete adapter protocols, not a guarantee that every provider or model works. Keys use Windows secure storage, and changing an endpoint must not silently reuse another endpoint's secret. Display live-tested versus configured-only states honestly.

MCP belongs under Connections as a tool/service protocol. Account authorization remains in native OAuth or an appropriate secure connection flow. Do not import the coding chat's Gmail, GitHub, plugin sessions or credentials into Kivou. Expose per-service read/write scopes and disconnect. MCP server startup is code execution; arbitrary auto-installs are not part of onboarding.

### First action workflow

**Inbox catch-up:** connect Gmail read-only → choose account/time range → inspect selected messages → summarize priorities with links back to source messages → draft a reply → review recipient/subject/body → separately authorize sending → record a verified receipt. Until sending is implemented, the UI must label the output as a draft and never report it sent.

Email contents are data, not owner instructions. A request inside an email cannot grant Kivou permission to change accounts, forward files or install tools. Revoked access, pagination, empty inbox, rate limits and partial reads have explicit states. Actual Gmail access may require OAuth app configuration and verification before public distribution.

### Small island

Collapsed: 264 x 48 logical pixels, with a simpler 200 x 40 experimental option to compare later. Show a concise real state and one path into work. Expanded: short input, clear provider/permission context, stop, and open workspace. No constant bounce, unsolicited narration or idle polling animation. Pointer reveal: approximately 180 ms; keyboard opening: immediate; reduced motion removes movement. Preserve focus and stay inside the active display work area.

### Action review and history

Show target, exact proposed change, provider/service, scope and any known cost before consequential actions. Allow once and deny are initial controls; future standing permissions need explicit scope and expiry. Changed content invalidates old approval. Deduplicate actions across retries and restarts. A successful model sentence is not an action receipt.

## Decision

Build an original **personal work companion with inspectable context and dependable handoffs**. The first real integration is Gmail catch-up and reply preparation. Multi-provider access and MCP are architectural requirements; a dozen cosmetic worker avatars and an all-app claim are not substitutes for that useful loop. Novelty and willingness to pay remain hypotheses to test with people.

## Owner's final visual clarification: iOS interaction language

The owner explicitly invoked `C:/Users/rayan/.agents/skills/apple-design/SKILL.md` and rejected a merely frosted desktop skin. The selected direction is iOS-inspired navigation, typography, grouped settings, switches and meaningful motion, adapted to Windows. It is not a request to make a native iPhone application or copy Apple assets.

Primary references: [Apple's iOS 26 design presentation](https://www.apple.com/newsroom/2025/06/apple-elevates-the-iphone-experience-with-ios-26/), [Materials](https://developer.apple.com/design/human-interface-guidelines/materials), [Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars), [Designing for iOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-ios), and [Meet Liquid Glass](https://developer.apple.com/videos/play/wwdc2025/219/). iOS 26 is the reference design introduction, not a claim that it is today's latest operating-system version.

`research/screens/apple-ios-official.png` is an inspected capture of Apple's public product image, kept locally for reference and excluded from version control/distribution. The specific Messages carousel image was not captured because the chosen carousel element was hidden; no visual claim depends on that failed capture.

The implemented starter now has four persistent destinations: Home, Missions, Memory and Settings. Narrow windows use a labeled floating bottom bar; wide windows adapt it to a sidebar. Settings contains actual provider controls and encrypted-key entry. Dark mode and reduced-transparency controls are included. The current material is a CSS approximation; it does not reproduce native Apple lensing or desktop-background blur.

Model selection and tool connections remain separate. UI/provider protocol tests use synthetic credentials and responses; Windows encryption has an actual desktop check. Only Codex has real model receipts so far. Gmail, MCP tool execution and calls remain absent and explicitly labeled as such.
