# Architecture design and capacity plan

- Revision / status (draft or explicitly approved):
- Approved product, UX and change-control baseline references:
- User decisions versus agent proposals:

## Architecture Design
### System overview and component diagram
### Runtime, frameworks and persistence choices with alternatives
### Data model, ownership/tenancy, relations and constraints
### API contracts, auth, authorization and session management
### Transaction boundaries, concurrency and idempotency
### Reliability, durability, security and threat scenarios
### Backup, verified restore, monitoring, deletion and retention contracts
### RPO/RTO targets, residual risks and verification plan
### Traceability to requirements and acceptance criteria

Define implementable contracts rather than placeholders. Prefer provider-neutral interfaces, but choose implementation-critical technologies. Advance only the affected provider decision for a documented implementation or mandatory-test dependency, user hard constraint or evidenced material feasibility conflict; record the requirement, contract/test, evidence, alternatives and why deferral is unsafe. Valid: provider-specific SDK/runtime contract, mandatory target-only test, mandated provider/residency, or evidenced conflict with hard budget/durability. Invalid: unknown prices, possible discounts/free-tier quotas of unselected candidates, or generic feasibility concerns. Scale detail to the product and mark non-applicable sections with reasons.

## Capacity Planning
Every value is a confirmed fact, explicit assumption, estimate or measured result with provenance. Do not invent benchmark results. State average, peak and stress scenarios; active users are not automatically simultaneous requests.

| Dimension | Input/assumption and unit | Derivation or evidence | Estimated range/confidence | Validity limit / revisit trigger |
| --- | --- | --- | --- | --- |
| Traffic pattern and average/peak active concurrency | | | | |
| Average/peak requests per second and in-flight requests | | | | |
| Payload sizes and network transfer | | | | |
| Initial data, growth, indexes and retention | | | | |
| CPU and RAM, including background/verification work | | | | |
| Primary/temp/backup storage and growth | | | | |

Use workload formulas where applicable, e.g. peak requests/second = active users x actions/minute x requests/action / 60; in-flight requests depend on rate and latency. State uncertainty and assumptions instead of false precision. Benchmarks refine estimates during implementation/QA.

### Infrastructure classes and trade-offs
Compare the smallest realistic classes (such as local-only, single durable server, application plus SQL service, or managed/serverless platform) against capability/resource needs, failure modes and operational effort. Do not default to provider names or complex infrastructure. Record budget as guidance or a hard constraint, and distinguish affordability/feasibility risks from a deferred vendor quote.

## Decision register and Deployment Planning handoff
| Decision / verification | Scope | Disposition (proposed/approved/deferred/not applicable) | Concrete dependency / reason | Owner / due gate | Required evidence | Blocks Implementation / QA / Release / none |
| --- | --- | --- | --- | --- | --- | --- |

Provider, paid plan, region and current prices may be deferred absent the documented dependency above; price uncertainty alone is not a blocker unless evidence shows material conflict with a hard budget or requirement. Hosting/provider selection may be not applicable for CLI tools, libraries, local/offline apps or projects without managed deployment; record why and retain applicable requirements. Handoff lists required capabilities, capacity bounds, reliability/security/backup contracts and tests. Do not hide evidenced infeasibility as a deferral or use not applicable to waive requirements.

## ADRs, verification and approval
- Design/ADR decisions requiring approval:
- Local/isolated and target-environment checks: owner, due gate, evidence and whether each blocks QA, Release, both or neither:
- Deferred decisions that genuinely block implementation:
- Risks accepted by the user versus proposed mitigations:
- Explicit approval statement, reviewer, date and exact revision:

Architecture may be approved without a provider when implementable and free of unresolved implementation-blocking deployment dependencies. Approval is not evidence of achieved performance/RPO/RTO, authorization to purchase/deploy, or permission to disregard a user stop instruction. Mandatory QA criteria need evidence before QA completed; release-only target checks do not block QA. Prepare Deployment Planning before dependent mandatory testing; do not reclassify required criteria without explicit change approval. Resolve applicable deployment decisions before their due gate; justified not-applicable hosting does not block release. Production deployment requires separate explicit approval.
