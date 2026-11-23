# ADR-003 — serialisasi write keluarga dan points ledger

Status: **proposed — belum approved**, A1,23November2026.

## Context and constraints

Kredit, debit reward, correction dan recurring successor harus atomik dan idempotent. Dua tab berbeda key juga tidak boleh menghasilkan kredit/debit ganda. Pilot hanya satu keluarga kecil.

## Options and trade-offs

1. Row lock keluarga untuk seluruh write bisnis: paling mudah diaudit, tetapi serialisasi bisa membatasi throughput dan membuat preview konservatif stale.
2. Lock per task/account/request dengan urutan terkoordinasi: paralelisme lebih tinggi, tetapi lebih banyak protokol untuk member-disable, reward-disable dan correction races.
3. SERIALIZABLE+retry: kuat bila seluruh transaksi/predicate benar, tetapi failure/retry dan observability lebih rumit untuk developer tunggal.

## Decision and rationale

Rekomendasi READ COMMITTED + family `FOR UPDATE`, constraints, conditional status dan commands satu transaksi. Read-only summary memakai REPEATABLE READ. Lock di database, bukan mutex in-memory. Sumber saldo adalah SUM ledger, tanpa cache saldo awal. Commands mereferensikan hasil domain dan payload fingerprint aman; kredit unik per completion, bukan selamanya per occurrence. Koreksi append debit asli dan retire successor tanpa hapus histori.

## Consequences and risks

Seluruh writer harus mengikuti protokol, termasuk deactivate/reset/arsip/edit. Tidak ada external network call di dalam lock. Retry bounded dengan key semula; commit unknown diselesaikan query hasil. Tidak menjamin exactly-once jika seluruh command record setelah snapshot hilang dalam disaster; recovery membutuhkan reconciliasi. R3 preview guard tetap server-side; saldo negatif koreksi tetap sah. [Locking](https://www.postgresql.org/docs/18/explicit-locking.html), [pg same-client](https://node-postgres.com/features/transactions).

## Verification approach

T-05/T-06/T-09/T-11/T-12/T-15, deterministic concurrent requests, fault injection antara ledger/successor dan setelah commit, recomplete setelah correction. Ukur lock wait dan dialog UX; belum diuji.

## Approval evidence and revision

A1 proposed, tidak ada approval. [Spesifikasi transaksi](../A1-data-transactions.md). Bukan event sourcing atau perubahan aturan produk.
