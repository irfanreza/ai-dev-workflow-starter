# Success criteria

## Starter workflow
- [ ] Codex recognizes AGENTS.md and starts discovery from an empty project.
- [ ] **For a vague new-product prompt, the first response asks 1–5 high-impact product questions and waits; it does not produce a full D1.**
- [ ] For a sufficiently detailed prompt or handoff, Codex does not repeat already-answered questions.
- [ ] A ChatGPT handoff can be ingested and validated without repeating accepted discovery.
- [ ] Workflow routes new product, feature, bug, and refactor appropriately.
- [ ] Stage state can be resumed and validated after session interruption.

## Discovery
- [ ] Product spec records interview answers, confirmed facts and assumptions distinctly.
- [ ] Problem, target users, success metrics, prioritized MVP, non-goals and edge cases are documented.
- [ ] Functional and nonfunctional requirements have testable acceptance criteria.
- [ ] Scope approval is recorded before architecture work.

## UX (when relevant)
- [ ] Browser-openable HTML prototype includes important user flows and UI states.
- [ ] Lavish feedback can be sent to the agent without manual copying when installed.
- [ ] A manual browser feedback path exists if Lavish is unavailable.
- [ ] Feedback rounds are distinguished from explicit UX approval.
- [ ] Approved prototype path, SHA-256 and reviewer approval are recorded.
- [ ] Changes to approved prototype invalidate its approval.

## Architecture
- [ ] Frontend/backend/database needs are evaluated rather than assumed.
- [ ] Technology options, data model, API contracts, security and reliability are assessed.
- [ ] ADRs and explicit approval exist for major decisions.

## Implementation and QA
- [ ] Vertical slices trace to acceptance criteria.
- [ ] Lint, typecheck, unit/integration/E2E tests and build are run when applicable.
- [ ] Test command, exit status and limitations are documented; no invented evidence.

## Release
- [ ] Environment, migration, rollback and security readiness are documented.
- [ ] Production deployment requires separate explicit approval.

## End-to-end evaluation scenarios
1. Browser-only offline tool: no backend/database unless justified.
2. Full-stack multi-user product: schema, migrations, API, auth, tests.
3. Existing project feature: impact analysis, targeted plan and regression tests.

**Important:** These are target criteria, not claims of completed E2E validation.
