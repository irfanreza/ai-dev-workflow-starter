---
name: implementation
description: Implement approved product slices with tests and architectural boundaries.
---
# Implementation
Work one vertical slice at a time. Trace code to approved spec, UX, architecture and acceptance criteria. Add tests and migration plans as needed. Respect module boundaries, validation, security, observability and error handling. Escalate deviations from approved decisions rather than silently changing them.

After explicit architecture approval and authorization to implement, an unselected provider alone is not a blocker. Implement against approved runtime, persistence, auth and infrastructure capability contracts, with local/isolated acceptance tests where appropriate. Advance a provider decision only for a documented dependency or hard constraint affecting implementation, mandatory testing or evidenced feasibility; keep other choices deferred or mark hosting not applicable with a reason. Do not silently introduce platform-specific dependencies, weaken reliability requirements or treat permission to implement as permission to buy or deploy.
