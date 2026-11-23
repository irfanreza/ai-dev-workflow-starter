# ADR-002 — PostgreSQL dan isolasi keluarga

Status: **proposed — belum approved**, A1,23November2026.

## Context and constraints

Database harus mempertahankan committed data pada gangguan biasa, mengamankan relasi keluarga dan mendukung unique pending/ledger consistency. Beban kecil tidak membenarkan database-per-tenant atau cluster HA sendiri.

## Options and trade-offs

1. SQLite file lokal pada volume persisten: transaksi kuat dan sederhana untuk satu app; single writer/topologi/backup dan volume mesti dikelola. File app ephemeral tidak layak.
2. PostgreSQL managed: relasi/partial uniques/RLS/locking lengkap; ketergantungan network/provider dan quota/free-tier.
3. Document store transaksional: mungkin, tetapi pembuktian relasi/invariant lintas dokumen dan operasionalnya tidak memberi manfaat untuk model ini.

## Decision and rationale

Rekomendasi PostgreSQL18 managed, shared business tables dengan family_id dan composite FK, RLS per keluarga, role runtime nonowner, aplikasi tetap role/ownership checks. Auth schema privat bootstrap terpisah. Tidak menganggap PostgreSQL menjamin semua invariant tanpa service protocol. Neon Free adalah kandidat bersyarat pada ADR-005, bukan bagian keputusan engine yang sudah approved.

## Consequences and risks

RLS tidak menggantikan Member ownership; owner/BYPASSRLS melewati policy. `SET LOCAL` dan satu transaksi/connection mencegah pooled tenant context bocor. Auth tables perlu server-only access yang diperiksa khusus. SQLite fallback membutuhkan porting/uji tersendiri, tidak boleh otomatis saat insiden. [RLS PostgreSQL18](https://www.postgresql.org/docs/18/ddl-rowsecurity.html), [SQLite uses](https://www.sqlite.org/whentouse.html).

## Verification approach

T-02/T-05/T-12/T-15/T-17, model constraints D-01–08, fail-closed empty context dan physical restart durability. SQL/role/migration belum dibuat; semua planned.

## Approval evidence and revision

A1, belum ada approval. Detail [data](../A1-data-transactions.md), [cost](../A1-operations-cost.md). Tidak mengubah approval produk atau state.
