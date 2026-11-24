# AI Dev Workflow Starter

Codex-first, stack-neutral, human-gated workflow from product idea to release readiness. This is a **workflow starter**, not a preselected application stack or a fully autonomous agent runner.

## Start
```bash
git clone https://github.com/irfanreza/ai-dev-workflow-starter.git
cd ai-dev-workflow-starter
codex
```
Tell Codex: **"Start a new project: [describe your idea]. Follow AGENTS.md."**

Codex should start with discovery and ask only blocking questions. The same process supports a ChatGPT handoff at `.workflow/intake/handoff.md`.

## Stages
Discovery → UX (if UI exists) → Architecture → Implementation → QA → Release readiness.

Human approval is required for product scope, major architecture choices, UX design when applicable, and production release. No stage is marked complete without evidence. Use `python scripts/workflow.py status` and `python scripts/workflow.py validate`.

## Architecture, capacity and deployment boundaries

| Work | Output and approval boundary |
| --- | --- |
| Architecture Design | Implementable components, stack, data/API/transaction/auth contracts, reliability, security, durability, backup and recovery design. Explicit design approval is required before implementation. |
| Capacity Planning | Assumptions for traffic/concurrency/request rate/data growth, CPU/RAM/storage ranges and validity limits; estimates are not benchmark results. Compare infrastructure classes. This supports design approval and is refined with evidence later. |
| Deployment Planning | Provider, plan, region, actual all-in prices and target configuration/validation, normally prepared for release readiness; bring forward only when requested or needed for a binding constraint or implementation/QA feasibility. |

A final provider is not required for architecture approval or authorized implementation when no unresolved deployment dependency blocks implementation. Technology/runtime/database choices still need sufficient specificity to code and test. Advance a provider decision only for a documented implementation or mandatory-test dependency, user hard constraint, or evidenced material feasibility conflict; unknown prices alone do not qualify. Budget remains a constraint, but missing quotes are not proof of infeasibility. Production deployment and spending beyond authorization require explicit approval.

Use [the architecture template](docs/ARCHITECTURE-TEMPLATE.md) and record deferred decisions with owner, reason, due gate and evidence. Deployment Planning is a workstream, not a seventh state stage: keep the existing six stages and use the release template's deployment section. Planning can precede release state activation when a target environment is needed; it does not bypass stage gates. Hosting/provider selection may be not applicable for CLI tools, libraries, local/offline apps or projects without managed deployment, with a reason that does not waive applicable requirements. Deferred verification records owner, due gate, evidence and QA/Release blocking status. Mandatory QA criteria need evidence before QA completed; release-only target checks do not block QA. Prepare planning early if mandatory testing actually depends on a target environment, without changing requirement gates silently.

## UX review: Lavish AXI adapter
The workflow owns requirements, feedback tracking, and approval. [Lavish AXI](https://github.com/kunchenguid/lavish-axi) is an optional third-party local browser review tool, **not** a bundled dependency. Review the tool and approve installation before using:
```bash
npx skills add kunchenguid/lavish-axi --skill lavish
```
The agent can then inspect `npx -y lavish-axi --help`, open an HTML prototype with `npx -y lavish-axi <path-to-prototype.html>`, and follow current `poll`/`reply` guidance. Avoid assuming that a browser comment constitutes UX approval. If Lavish is unavailable, open the HTML locally and record manual feedback. Never invoke remote sharing without explicit consent.

## What this version does not do
It does not auto-start Codex, install dependencies, independently run browser tests, or deploy production systems. Skills guide Codex; the Python helper validates workflow state. See [acceptance criteria](docs/ACCEPTANCE.md).

## Security
Do not commit credentials, personal data, or private product specifications to this public repository. Use this as a template or clone for a separate application repository.

MIT licensed.
