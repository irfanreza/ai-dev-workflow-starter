---
name: release
description: Prepare a controlled release with rollback, migration, environment and approval checks.
---
# Release
Create release readiness report using docs/RELEASE-TEMPLATE.md. Where managed deployment is applicable, Deployment Planning selects provider, plan, region, runtime settings and current all-in costs against approved design/capacity contracts. CLI tools, libraries, local/offline apps and projects without managed deployment may mark hosting/provider selection not applicable with a reason; release must not force irrelevant selection or waive applicable requirements. Verify applicable infrastructure support for transactions, durability, security, backup/restore, RPO/RTO, observability, retention and capacity; resolve deviations through change control. Obtain approval before spending beyond authorized limits.

Prepare planning before dependent implementation or mandatory testing when a concrete dependency, user hard constraint or evidenced material feasibility conflict requires an early provider decision; do not add a state stage or bypass prerequisites. Verify applicable target-environment evidence, configuration, secrets handling, migration strategy and rollback. Record each deferred verification with due gate, evidence and QA/Release blocking status. Release-only checks block Release, not QA; mandatory QA criteria still block QA. Applicable provider decisions due for release must be resolved before release approval; justified not-applicable decisions do not block it. Do not deploy to production without separate explicit approval.
