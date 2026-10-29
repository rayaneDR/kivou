# Agent landscape and user signals

Researched 2026-10-29. Purpose: choose a credible initial problem for an independent Kivou. This is a purposive public sample, not an exhaustive ranking of every agent, a statistical survey, or proof that issues remain unfixed. Closed reports remain useful historical signals; reproduce before making competitive claims.

## Products examined

| Product / primary source | Relevant strength | Implication for Kivou |
|---|---|---|
| [OpenClaw](https://github.com/openclaw/openclaw) | Local gateway, channels and extensibility | Separate provider adapters from local mission state; do not clone every connector |
| [Meta Muse](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/) | Goal-oriented assistance and review of sensitive actions | Present the goal, proposed work and review state clearly; no claim to reproduce its infrastructure |
| [OpenHands](https://github.com/OpenHands/OpenHands) | AI-driven software development | Study bounded execution and useful artifact handoffs |
| [OpenCode](https://github.com/anomalyco/opencode) | Open-source coding agent | Keep sessions recoverable and provider-specific failures understandable |
| [AnythingLLM](https://github.com/Mintplex-Labs/anything-llm) | Local-first document and agent workflows | Explicit, inspectable memory belongs in the initial design |
| [LibreChat](https://github.com/LibreChat-AI/LibreChat) | Multiple providers, agents and conversation tools | Make context portable; avoid promising immediate provider parity |
| [Khoj](https://github.com/khoj-ai/khoj) | Personal knowledge, research and automation | Attach source/context provenance to outputs |
| [Flowise](https://github.com/FlowiseAI/Flowise) | Visual agent workflows | Avoid requiring a flowchart for a simple task |
| [Browser Use](https://github.com/browser-use/browser-use) | Browser task automation | Add browser work only with bounded execution and verified outcomes |
| [Dify](https://github.com/langgenius/dify) | Collaborative agent workflows and RAG | Team governance is later work, not an initial checkbox |
| [Agent Zero](https://github.com/agent0ai/agent-zero) | General agent framework | Breadth alone is not a useful initial differentiation |

No competitor source code was imported. Public docs and issue descriptions inform behavior only. This phase does not require binary reverse engineering; Reverse Engineer Anything explicitly excludes ordinary source/document research.

## User reports and product decisions

| Signal | Primary user evidence | Interpretation and response |
|---|---|---|
| People want to control memory | [AnythingLLM #4288](https://github.com/Mintplex-Labs/anything-llm/issues/4288), closed; [#4821](https://github.com/Mintplex-Labs/anything-llm/issues/4821), closed | Users described remembered material they could not manage. Provide visible editable memory and a per-mission inclusion choice. |
| Personal context can leak between purposes | [LibreChat discussion #11497](https://github.com/LibreChat-AI/LibreChat/discussions/11497) | Request for per-agent memory controls. Default new missions to no personal memory; inclusion is explicit. |
| Long projects need context portability | [LibreChat discussion #12883](https://github.com/LibreChat-AI/LibreChat/discussions/12883) | Users describe repeated summaries and copy/paste. Export a context-and-result bundle with provenance. This alone is not unique; a reply already describes another product with portable memory. |
| Stuck work needs recovery | [OpenCode #43277](https://github.com/anomalyco/opencode/issues/43277), reported open in retrieved page | Session state reportedly survived reboots while refusing messages. Recover interrupted runs into an explicit state; keep partial output and let users start again without losing prior work. |
| Loops waste time and credits | [OpenHands #15087](https://github.com/OpenHands/OpenHands/issues/15087), closed; [Flowise #5620](https://github.com/FlowiseAI/Flowise/issues/5620), closed; [Browser Use #1275](https://github.com/browser-use/browser-use/issues/1275), closed | Bound execution; no automatic retry storm. These reports are not evidence current versions still loop. |
| Memory itself can multiply cost | [LibreChat #10809](https://github.com/LibreChat-AI/LibreChat/issues/10809); [#13594](https://github.com/LibreChat-AI/LibreChat/issues/13594), closed | Avoid a separate model request for each memory edit. Bound input and expose provider-reported usage without inventing a dollar price. |
| Background approvals can stall | [OpenClaw #60037](https://github.com/openclaw/openclaw/issues/60037), closed | Exact, scoped permissions matter. Start with local outputs; connectors require their own review and receipts. |

These are individual self-selected reports, predominantly from technical users. They establish candidate needs, not prevalence or willingness to pay. Creator/freelancer interviews remain necessary.

## Chosen hypothesis

**A small Windows companion for client work that carries a reviewable mission between sessions.** Each mission owns its input, explicitly selected memory, lifecycle, output and export receipt. Initially the application drafts and exports; it does not claim to operate external accounts. Future actions should show proposed changes, exact authorization, and an observed receipt.

The moat is not a unique pill shape or a list of every integration. Potential differentiation must be demonstrated through reliable recovery, low-friction context control and a valuable customer workflow. No uniqueness or competitor-superiority claim is established by this research.
