---
name: product-discovery
description: Conduct interactive, evidence-led product discovery before drafting an MVP specification.
---
# Product discovery — interview first, specification second

## Non-negotiable behavior for a vague new-product idea
If the user provides only a broad idea (e.g. "build a household task app"), **do not immediately write a complete product specification or ask for scope approval**. First identify decisions that materially affect target users, MVP, workflows, permissions, data model, or operational constraints. Ask 1–5 concise high-impact questions in a single round (prefer 3), wait for the user's answers, and ask another round only if material uncertainty remains. Do not treat assumptions as confirmed requirements.

A question is blocking only if different plausible answers would materially change MVP scope, product behavior, security, or architecture. Avoid questions about implementation stack during product discovery unless the user has a binding constraint. Do not ask questions already answered by the user or an imported handoff.

## Process
1. Read existing intake, user request, and any previously approved decisions. Record confirmed facts, hypotheses and unknowns separately.
2. Assess ambiguity. For vague ideas, **ask the blocking questions and STOP the turn**. Do not create a comprehensive D1 spec yet. You may create a short intake/questions note, but not a full requirements document.
3. After user answers, confirm problem, target users, primary jobs, success metrics, key flows, permissions, MVP/non-goals, constraints, edge cases, and nonfunctional requirements. Use Must/Should/Could priority labels. Ask a further short round only for remaining high-impact ambiguity.
4. Write `docs/PRODUCT.md` from `docs/PRODUCT-TEMPLATE.md`, with requirement IDs and measurable acceptance criteria. Explicitly distinguish confirmed decisions from proposals.
5. Present a concise scope summary, open decisions, and a clear approval request referencing the spec revision. Do not transition discovery to completed without explicit approval evidence.
6. For a detailed imported ChatGPT handoff, skip questions already answered; ask only genuinely blocking gaps. For a sufficiently detailed prompt, it is valid to draft directly, but record why no questions were needed.

## Evaluation gate
For a vague new-product prompt, success requires the **first response to contain meaningful discovery questions and to await answers**. Producing an elaborate D1 before asking those questions is a workflow failure, even if D1 is well written.
