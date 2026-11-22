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
