# ADR-001 — aplikasi full-stack TypeScript

Status: **proposed — belum approved**, A1,23November2026. Mengikuti [template ADR](../../DECISION-TEMPLATE.md).

## Context and constraints

Satu developer, Node/TypeScript diprioritaskan, UI R3 interaktif, pilot10anggota, tanpa offline/public signup. Butuh server tepercaya untuk auth dan integritas.

## Options and trade-offs

1. Next.js16/React+REST Route Handlers: satu build/deploy, UI dan API same-origin, tetapi runtime/cache framework perlu disiplin dan footprint diukur.
2. Fastify+React/Vite dalam satu deploy: server dapat lebih kecil, tetapi build/static delivery/session glue lebih banyak dirakit.
3. Browser-only: murah, tetapi tidak memenuhi server authorization, multi-device source of truth dan transaksi. Tidak layak untuk D2.

## Decision and rationale

Rekomendasi A1: Node24LTS, Next16, TS strict, Zod dan `pg` SQL eksplisit. Plain CSS/React mengikuti UX R3, tanpa redesign/icon framework baru. Route bisnis melalui service/repository yang sama; tidak mengandalkan middleware UI. Tidak ada Edge runtime, microservices atau broker.

## Consequences and risks

Single process failure ditangani redeploy; state durable di PostgreSQL. Patch dependency dan actual RAM/CPU dapat mengubah biaya. UI login detail produksi perlu review bila berbeda dari prototype simulasi; A1 tidak mengubah R3. Migrasi framework belum dibutuhkan.

## Verification approach

T-01/T-13/T-19/T-20/T-22: auth boundary, R3 states, bundle/startup/performa360/1280 dan footprint hosting. Semua planned, belum dijalankan. [Sumber Node deployment](https://nextjs.org/docs/app/getting-started/deploying).

## Approval evidence and revision

Revision A1; reviewer approval **belum ada**. Izin pengguna menyusun draft bukan approval ADR atau izin implementasi. Baseline dan referensi di [A1](../../ARCHITECTURE-A1.md).
