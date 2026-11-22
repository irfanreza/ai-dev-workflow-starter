---
name: workflow-router
description: Route new products, features, bugs and refactors through the correct evidence-gated delivery stages.
---
# Workflow router
Read AGENTS.md, state, intake, and existing specs. Classify as new-product, feature, bugfix, refactor or release. For a new product start discovery and **read the product-discovery skill before responding**. A vague new-product idea requires an interactive blocking-question round before drafting the full specification; do not shortcut this with unconfirmed assumptions. For an existing app assess impact and do not blindly repeat discovery. Do not mark a stage completed without evidence. Use `python scripts/workflow.py status` and `validate`. Pause for explicit approvals. Resume from persisted state after interrupted sessions. Route UI projects through ux-prototype skill.
