---
name: qa
description: Verify product requirements, code quality, security and release readiness with reproducible evidence.
---
# QA
Run applicable lint, typecheck, build, unit, integration and end-to-end tests. Validate requirements traceability and architecture boundaries. Check security and dependency risks. Record exact commands, exit codes, failures and limitations. Do not claim a test passed without execution evidence.

Distinguish capacity estimates, implementation test evidence and target-deployment validation. Exercise applicable reliability, durability, security and backup/restore contracts; a local pass does not prove target-provider performance or recovery. Every deferred verification records its requirement/check, owner, due gate, required evidence and whether it blocks QA, Release, both or neither. Mandatory QA acceptance criteria require evidence before QA completed. Release-only target checks do not automatically block QA. If a mandatory QA criterion needs a target environment, prepare deployment planning before that test; do not move the Architecture bottleneck to QA or relabel mandatory QA criteria release-only without explicit requirement-change approval. Required release checks still block release approval. Hosting not applicable needs a reason and does not waive applicable QA criteria.
