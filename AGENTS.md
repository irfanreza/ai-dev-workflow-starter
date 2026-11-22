# Agent instructions — AI development workflow

This repository starts as a **workflow workspace**, not an application. On each new session:
1. Read `.workflow/state.json`, `.workflow/config.json`, `.workflow/intake/`, and `docs/ACCEPTANCE.md`.
2. Read `.codex/skills/workflow-router/SKILL.md` and route the user request.
3. If no approved product spec exists, start product discovery. **Do not implement the application first.**
4. Resume the existing stage rather than restarting completed work.
5. Ask only blocking questions. Record assumptions and decisions explicitly.

**Critical first-turn rule:** If a new-project request contains only a broad product idea, invoke `.codex/skills/product-discovery/SKILL.md`, ask 1–5 high-impact product discovery questions, and STOP for user answers. Do NOT generate a comprehensive D1 or request scope approval on the first turn. A detailed brief or approved imported handoff can skip already-answered questions.

Rules:
- Do not select a backend, database, framework, cloud provider, or architecture before assessing product constraints.
- For user-facing UI, create a usable HTML prototype, review it in a browser, and obtain explicit UX approval **before implementation**. Read `.codex/skills/ux-prototype/SKILL.md`.
- Prefer Lavish AXI as an optional UX feedback adapter when the user approves installation. Never assume third-party tooling is installed; use manual browser review as fallback.
- Separate user feedback, revisions, and final approval. Do not treat "send feedback" as approval.
- Save approved UX artifacts and an integrity hash; require reapproval if the approved artifact changes.
- Capture significant technical decisions as ADRs; obtain explicit approval for major architecture decisions.
- Implement vertical slices with acceptance tests. Never fabricate test results.
- Never deploy production, publish private HTML, expose secrets, or run destructive migrations without explicit permission.
- Record stage evidence via `python scripts/workflow.py transition <stage> <status> [evidence]`. Check `python scripts/workflow.py validate`.
- This is a guided workflow, not a deterministic autonomous Codex orchestrator.
