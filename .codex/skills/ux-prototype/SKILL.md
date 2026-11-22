---
name: ux-prototype
description: Produce browser-reviewable HTML prototypes with human feedback and approval gates, optionally using Lavish AXI.
---
# UX prototype and validation
1. Confirm the project has user-facing UI. Otherwise record why UX is not applicable.
2. Read approved product specification; derive screen inventory, flows, states, accessibility and responsive requirements.
3. Generate a **working, locally openable HTML prototype** (include supporting local assets). Do not treat a screenshot or static mockup as sufficient for interaction testing.
4. Offer optional Lavish AXI review. Do **not** install or execute third-party packages without user consent. If approved, use current instructions from `npx -y lavish-axi --help`, `design`, `poll --help` and `reply --help` rather than hardcoding unverified CLI flags. Open via `npx -y lavish-axi <prototype.html>`. User annotates in browser; agent receives feedback and revises. Never use Lavish `share` unless separately approved.
5. Fallback: user opens HTML in local browser; capture element-specific feedback in `docs/ux/feedback.md`.
6. Repeat feedback/revision until requirements are met. Check empty/loading/error/success states, keyboard navigation, mobile and desktop layouts.
7. Obtain **explicit approval** for a specific artifact revision. Record reviewer, approval statement, file path and SHA-256 in `docs/ux/approval.md` using `docs/UX-APPROVAL-TEMPLATE.md`.
8. Mark UX complete only with approval evidence. If prototype content changes, re-review and reapprove. Do not infer approval from absence of feedback.
9. Architecture and implementation must trace back to approved flows and acceptance criteria.

Lavish is an optional browser-feedback adapter. This skill owns product validation and approval, not Lavish.
