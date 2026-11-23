# ADR-004 — Google Parent, credential anak dan recovery

Status: **proposed — belum approved**, A1,23November2026. Preferensi Google, credential anak dan metode recovery berasal pengguna; detail teknis ADR belum approved.

## Context and constraints

A-01 memilih akses individual aman, anak tanpa email, provisioning operator, Parent recovery code offline sekali pakai+verifikasi operator. Tidak ada public signup atau shared-profile authentication.

## Options and trade-offs

1. Google OIDC Parent + local child: mengurangi password/email Parent, tetapi dependency Google/subdomain/consent/recovery.
2. Local password Parent+anak: kontrol mandiri, tetapi recovery email dan password lifecycle menambah operasi.
3. Magic link Parent: tidak password Parent, tetapi setiap login tergantung pengiriman email dan tautan aman. Tidak dipilih sebagai fallback diam-diam.

## Decision and rationale

Rekomendasi openid-client code/PKCE/state/nonce, issuer/sub binding, min scope; anak Argon2id, persistent rate limits. Opaque revocable sessions, server role/ownership. Recovery high-entropy one-use code+new Google proof+operator confirmation, consume/rebind/revoke atomik. Operator routes terpisah dari public app; user session expiry/passphrase minimum dan kanal verifikasi adalah kebijakan draft untuk review.

## Consequences and risks

Google login tidak memberi Parent role otomatis. Session app berbeda dari Google; revoke aplikasi tidak logout Google. Recovery operator best effort bukan SLA. Code/Google sama-sama hilang tidak memberi bypass otomatis. Restore lama dapat resurrect code/binding: revoke semua code/sesi dan reconcile latest binding dengan register keamanan di luar primary sebelum login dibuka. UI authentication baru mungkin membutuhkan approval UX tersendiri. [Google OIDC](https://developers.google.com/identity/openid-connect/openid-connect), [OWASP sessions](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html).

## Verification approach

T-01/T-02/T-14/T-17/T-21: invalid claims, uninvited identity, inactive session, brute-force, concurrent code consumption, wrong new binding/missing operator and disaster restore regression. Belum dijalankan.

## Approval evidence and revision

A1 proposed; [keputusan pengguna](../../../.workflow/intake/architecture-user-decisions.md) tidak sama dengan approval detail ADR. [Kontrak/security](../A1-api-security.md). Tidak ada akses akun/OAuth client yang dibuat.
