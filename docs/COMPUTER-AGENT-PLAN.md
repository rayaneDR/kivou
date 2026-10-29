# From the starter to a real desktop agent

Owner's explicit goal: Kivou should execute tasks in PC applications, return observed results, remember useful context and support the user's chosen model. The current chat/mission starter is not that complete agent. This plan defines the next implementation, not a claim that every PC task already works.

## Delivery order

1. **Original tool host:** typed capability registry; exact target/scope, validation, cancellation, bounded steps and persisted execution/approval records. Keep model and MCP protocols separate.
2. **First real PC cycle:** a user-authorized task in a deliberately chosen test workspace/app. Observe a real file/app result, test denial, cancellation, stale scope and restart. A process launch request alone is not proof the requested app interaction completed.
3. **Desktop/browser bridge:** choose or explicitly grant the target, capture only with consent, validate proposed operations, execute and observe a fresh state. Support actual screenshots/vision only for provider protocols tested to handle them. Add a dedicated browser session before touching a user's existing signed-in one. Keep login and consequential-action handoffs visible.
4. **MCP and Gmail:** real tool discovery and a tested server connection, bounded inbox reading with source links, exact reply review and a verified send receipt. Public Gmail OAuth app distribution and owner sign-in are external setup requirements; the coding chat's accounts are not application credentials.
5. **Reliability:** timeout and loop detection, no automatic ambiguous resend, memory provenance, provider-switch boundaries, corruption/recovery and multi-display/focus checks. Measure the actual machine's footprint before performance claims.
6. **Source and product proof:** update the intended rayaneDR/kivou with independent source/history. Preserve the previous licensed fork separately. Build/test a downloadable independent Kivou.exe, then make an original English Remotion ad from the current real app and embed it in the repository. Do not reuse the obsolete fork demo as if it showed the new agent.

## Acceptance scenarios

- Ask Kivou for a local task; it proposes only supported tools and accurately says when a task is unsupported.
- A selected workspace bounds file operations; traversal, linked destinations and overwriting are rejected or explicitly reviewed.
- A human reviews the exact proposed operation. Denial, timeout or changed target means no execution. The execution ledger survives restart and does not repeat completed work.
- Actual desktop interaction is verified in the intended app; private credentials are not placed into normal model prompts or logs. Screenshots require explicit access and are excluded from ordinary exports unless separately selected.
- A cancelled model/action cannot later mark a task completed. Partial outputs survive failures.
- Multi-provider API fixtures remain distinguishable from live provider testing. No extra API spend or telephony is silently enabled.

## Research-supported product opportunities

The 18-product review and individual reports in docs/RESEARCH.md and docs/UX-RESEARCH.md suggest: less setup before the first useful action; visible/editable memory; recoverable missions; clear resource usage; exact approvals; portable results; and an unobtrusive desktop companion. These are product hypotheses, not proof that competitors lack them or that users will pay. Validate them through observed users rather than claiming a globally best or uniquely invented agent.
