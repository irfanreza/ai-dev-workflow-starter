# ADR-005 — hosting managed dengan batas biaya pilot

Status: **proposed bersyarat — belum approved**, A1,23November2026.

## Context and constraints

Target150ribu/bulan meliputi app/DB/backup/auth/domain; overbudget memerlukan persetujuan. Satu developer memprioritaskan operasi rendah. Free-tier tanpa SLA hanya boleh dievaluasi dengan risiko/monitor/fallback, bukan penerimaan outage quota otomatis.

## Options and trade-offs

1. Railway app+job, Neon Free PostgreSQL, R2 dan Healthchecks free: base estimate121.500 all-in termasuk buffer/cadangan, quota/provider dependencies dan penggunaan belum diukur.
2. Satu app+SQLite persistent disk: service lebih sedikit; backup/storage topology terikat host, dapat melebihi target setelah buffer. Engine/model perlu review tersendiri.
3. Full paid app+PostgreSQL: lebih sedikit quota-free constraints tetapi contoh Render all-in rencana sekitar287.100 sebelum extras; di atas target dan perlu approval biaya baru.

## Decision and rationale

Rekomendasi opsi1 **bersyarat** bukti footprint/performa, entitlement/provider region, OAuth subdomain dan fallback. Tidak auto-upgrade. Tidak memilih free app dengan cold start panjang atau keep-warm query tersembunyi. Rate/kuota diperiksa pada sumber resmi; biaya dihitung atas RAM/CPU/jobs/transfer, tidak hanya minimum$5.

## Consequences and risks

Stress estimate162.900 melewati target. Neon compute bisa suspend sampai billing berikutnya; fallback DB belum disetujui biayanya dan bukan standby gratis. Hard usage limit Railway mematikan workloads; pilihan hard cap vs continuity memerlukan keputusan review, tidak tertutup risiko operator. [Railway prices](https://docs.railway.com/pricing), [cost limits](https://docs.railway.com/pricing/cost-control), [Neon quotas](https://neon.com/pricing).

## Verification approach

T-19/T-22 dan backup job rehearsal: measure resources/quotas, verify invoice tax/FX, true monthly all-in, alert/fallback exercise. Kelayakan150ribu belum terbukti. Detail [operations/cost](../A1-operations-cost.md).

## Approval evidence and revision

A1 proposed; tidak ada provider/biaya/upgrade approved atau pembelian/deployment. Harga perlu reconfirm sebelum tindakan berbayar. Reviewer approval belum ada.
