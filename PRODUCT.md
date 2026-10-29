# Kivou
<!-- impeccable:product-schema 1 -->

## Platform
web

Windows desktop with a sandboxed Electron renderer. Other platforms are untested.

## Stack
Delegated by the owner: original Node.js application core, Electron, plain HTML/CSS/JavaScript. Model access uses external provider adapters: Codex login, OpenAI-compatible APIs, Anthropic, Gemini and Ollama. MCP is a separate tools protocol, not a model provider. No Goose runtime or source.

## Users
General Windows users who want a personal assistant/second brain for inbox, messages, planning and recurring work. Creators and freelancers are one segment. Initial proposed pilot: people doing repeated inbox/reply work. Companies evaluating the project are a secondary audience, not confirmed customers.

## Product Purpose
Turn a goal into reviewable work while keeping the user in control of context, execution and saved results. First success is a real saved mission completed and reopened by a new user.

## Positioning
Hypothesis: a small desktop companion whose missions carry explicit context, status and a portable handoff. This is a proposed combination, not a claim of invention or market uniqueness.

## Operating Context
An approximately 8 GB Windows PC; one model run at a time. English interface, multilingual input. Existing subscription limits apply. Zero additional spend before revenue; no automatic paid API fallback.

## Capabilities and Constraints
The owner explicitly replaced the earlier licensed Goose fork with an independent implementation on 2026-10-29. Keep that experiment separate and preserve its legal history. Do not relabel fork code as original. Initial work: mission records, explicit memory, provider isolation, cancellation, durable recovery and exports. First proposed integration is Gmail read-only catch-up, followed by separately approved replies with actual receipts. Gmail, MCP tools, calls, browser control, messaging channels, autonomous scheduling, purchases and team billing require implementation and verification; they are not currently connected.

## Brand Commitments
Kivou, by rayaneDR. Small top-screen island with useful motion and an English product presentation. Owner selected Apple-inspired Liquid Glass, a smaller island and smooth purposeful motion. Replace the earlier paper/citron skin while preserving the original Kivou name and ownership. Windows uses a custom approximation; do not imply Apple affiliation.

## Evidence on Hand
Public competitor documentation and individual user reports in docs/RESEARCH.md. These are research signals, not interviews, purchase commitments, or proof of current competitor defects. No revenue, customer testimonials or company interest is established.

## Product Principles
Show what was actually completed. Let users inspect context before sending. Keep recovery and exports independent of a particular provider. Add integrations only when a real workflow needs them.
