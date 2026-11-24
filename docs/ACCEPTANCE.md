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
- [ ] Architecture Design, Capacity Planning and Deployment Planning have distinct boundaries; early provider selection requires a documented concrete implementation/mandatory-test dependency, user hard constraint or evidenced material feasibility conflict. Price uncertainty alone is insufficient.
- [ ] Capacity assumptions include traffic, active concurrency/in-flight requests, average/peak request rate, data growth and CPU/RAM/storage estimates with formulas and validity limits; estimates are not fabricated benchmarks.
- [ ] Infrastructure classes and trade-offs are assessed while reliability, RPO/RTO, security, backup and durability remain required design contracts.
- [ ] Deferred decisions record owner, reason, due gate and evidence; deferred verification states QA/Release blocking status. Pending vendor quotes alone do not block architecture approval or authorized implementation.

## Implementation and QA
- [ ] Vertical slices trace to acceptance criteria.
- [ ] Lint, typecheck, unit/integration/E2E tests and build are run when applicable.
- [ ] Test command, exit status and limitations are documented; no invented evidence.

## Release
- [ ] Environment, migration, rollback and security readiness are documented.
- [ ] Production deployment requires separate explicit approval.
- [ ] Where managed deployment applies, Deployment Planning resolves provider/plan/region/current all-in costs, validates capabilities/evidence and obtains approval for spending beyond authorization. Hosting/provider selection may be not applicable with reasons for CLI/library/local/offline/no-managed-deployment projects; this cannot waive applicable requirements.
- [ ] Mandatory QA criteria are evidenced before QA completed; release-only target checks do not block QA and remain release blockers. Prepare deployment planning before tests that concretely need it; do not relabel mandatory criteria or claim target evidence from estimates/local tests.

## End-to-end evaluation scenarios
1. Browser-only offline tool: no backend/database unless justified.
2. Full-stack multi-user product: schema, migrations, API, auth, tests.
3. Existing project feature: impact analysis, targeted plan and regression tests.
4. No provider constraint: approve an implementable design/capacity envelope with provider deferred, then start only authorized implementation; resolve vendor and target checks by their due gate.
5. Binding provider/runtime constraint: resolve its architectural impact early with reasons; do not defer an implementation-blocking contract.
6. Budget guidance without purchase: present capacity assumptions and infrastructure classes without a vendor-price approval bottleneck; escalate evidenced material conflicts rather than unknown prices and require explicit production deployment approval.
7. CLI/library/local release: justify hosting not applicable, retain relevant tests/security/durability and release evidence, and do not require a provider.
8. QA complete with a release-only target check pending: keep that check as a release blocker with owner/due gate/evidence; a mandatory QA target check must instead block QA until evidenced. No silent reclassification.

**Important:** These are target criteria, not claims of completed E2E validation.
