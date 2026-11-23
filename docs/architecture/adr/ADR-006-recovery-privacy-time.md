# ADR-006 — backup terverifikasi, restore dan privasi

Status: **proposed — belum approved**, A1,23November2026. Timezone diputuskan terpisah di [ADR-007](ADR-007-timezone.md).

## Context and constraints

N-06+CR: ordinary faults zero committed loss, permanent-storage disaster RPO24h pilot, integrity tetap. Pengguna menetapkan backup14hari/log7hari, penghapusan operator dan target RTO24h dengan risiko operator khusus pilot diterima terpisah.

## Options and trade-offs

1. Backup provider saja: sedikit operasi, tetapi window/free-tier/account dependency belum memenuhi retensi dan independent restore evidence.
2. Dump terenkripsi12jam ke R2 dengan download/decrypt/isolated restore-check setiap backup+operator drill: lebih banyak job/secret handling, tetapi membuktikan recoverability dan memisahkan storage.
3. Continuous replication/PITR managed berbayar: RPO dapat lebih kecil, tetapi biaya/operasi tidak dibenarkan saat ini dan bukan jaminan user-ready recovery.

## Decision and rationale

Rekomendasi opsi2, actual valid snapshot_at sebagai metrik RPO, heartbeat setelah tersedia+verified, purge14hari. Independent deletion/security register mencegah resurrection keluarga dan binding/code lama. App secrets/roles dipisah dari backup/operator. Drill sebelum pilot/bulanan; ordinary redeploy tidak restore snapshot untuk menyembunyikan data loss.

## Consequences and risks

Job verifier dan quota/retensi vendor harus dibuktikan dan dihitung biaya. RPO>24jam tidak diterima oleh penerimaan risiko RTO operator. Register persisten di luar primary dan salinan offline harus tersedia; data di luar aplikasi seperti pemenuhan reward tidak dapat di-rollback otomatis. Operator unavailable residual diterima pengguna khusus pilot, bukan bukti target RTO. [CR approved](../../workflow/CR-N06-001.md), [addendum](../../workflow/CR-N06-001-AC-ADDENDUM.md).

## Verification approach

T-15/T-16/T-17/T-18/T-22: ordinary fault, backup corrupt/old/missing, actual restore/invariants/tenant/privacy, measure end-to-end RTO dan source point age. Belum dijalankan. [Runbooks](../A1-operations-cost.md).

## Approval evidence and revision

A1 proposed. Approval CR dan user risk acceptance tetap historis terpisah, tidak diubah menjadi approval frekuensi12jam/provider/pipeline ini. Tidak ada deployment/job/backup aktual.
