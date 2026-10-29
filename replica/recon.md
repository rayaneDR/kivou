# Kivou behavior map

Independent implementation. Research sources and evidence limits: [UX research](../docs/UX-RESEARCH.md), [landscape/user reports](../docs/RESEARCH.md). No competitor application code or assets are used. The earlier Goose fork is a separate experiment.

## Scope

Windows personal assistant/second brain. First proposed action loop is Gmail catch-up and reviewed replies. The current runnable starter supports local mission conversations, explicit memory, a small native island and exports. The rest of this map is a build specification, not observed implemented behavior.

## Screen inventory

| ID | Screen / entry | Purpose and required states | Current implementation |
|---|---|---|---|
| S01 | First run / model setup | Choose login/API/local model; missing dependency, encrypted-key availability, invalid model, configured versus live-tested | Provider settings UI and encrypted-key path tested; live non-Codex model/account access unverified |
| S02 | Today | Real running, awaiting review and recently completed work; meaningful fresh/failed states | Proposed |
| S03 | Missions | Search, new mission, draft, running, completed, interrupted, cancelled, failed | Starter implemented; long-history pagination pending |
| S04 | Mission work | Goal, selected memory, messages, stop, result and input/usage receipt | Starter implemented; result currently plain text |
| S05 | Memory | Editable notes and inclusion preview; empty, saved, full, error | Starter implemented; provenance graph/forget-history controls pending |
| S06 | Connections | Model-independent MCP/tools/account connection, scopes, revoke, failed/expired auth | Proposed |
| S07 | Inbox catch-up | Bounded account/date scope, source messages, partial read, draft summary | Proposed |
| S08 | Exact-action review | Recipient, subject, body, scope, stale/denied/approved/expired state | Proposed |
| S09 | Result and receipt | Completed artifact, source references, export, actual external receipt or uncertain outcome | Local Markdown/JSON export implemented; external receipts absent |
| S10 | Compact island | Concise real state, focus-safe expansion/hotkey, stop/open workspace | Starter native 264 x 48 implemented; collapse focus restoration passed; multi-monitor/foreground focus acceptance still pending |

## Flows

- F01 First local mission: S01 → S03 → S04 → S09. Missing connection or no consent blocks sending. Interrupted work stays recoverable.
- F02 Explicit context: S05 → S04; only a checked inclusion sends saved notes. The receipt records the snapshot used.
- F03 Inbox catch-up (proposed): S06 → S07 → S04 → S09. A failed connection cannot be represented as an empty inbox.
- F04 Reply action (proposed): S04 draft → S08 exact review → service send → S09 actual receipt. Changed content invalidates approval. Timeout after dispatch produces uncertain outcome and reconciliation, never automatic resend.
- F05 Quick thought: S10 → independent mission → S04. No saved personal memory is attached by the quick path.

## Data and boundaries

Mission owns messages, status, input snapshots and usage receipts. Memory is editable local text, included explicitly. Provider settings and encrypted keys live outside mission/export records. Future tool connections own scopes and revocation; future Action owns target, payload digest, authorization and observed outcome. MCP and model protocols remain separate.

The current core has no browser, Gmail, calls or external-send tool. Do not advertise an agent that can do those tasks until the corresponding adapters, review flow and actual receipts exist.
