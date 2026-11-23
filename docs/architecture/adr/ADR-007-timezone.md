# ADR-007 — hari lokal dan recurring occurrence

Status: **proposed — belum approved**, A1,23November2026.

## Context and constraints

U-04/F-09: interval dari waktu penyelesaian sah, hari pada jam lokal keluarga, timezone dipilih saat setup dan tidak berubah di MVP. Pending tidak menghasilkan successor. DST harus diuji bila timezone tersebut digunakan.

## Options and trade-offs

1. Menambah n x24jam pada instant: sederhana tetapi dapat memindahkan jam lokal saat DST; tidak sesuai maksud hari lokal.
2. Temporal ZonedDateTime menambah hari kalender, kebijakan compatible untuk DST recurring: konsisten dan tidak memerlukan scheduler, tetapi gap dapat menggeser jam hasil dan perlu review eksplisit.
3. Membatasi hanya timezone tanpa DST atau meminta keputusan manual setiap DST: mengurangi ambiguity, tetapi membatasi produk/menambah flow yang belum approved.

## Decision and rationale

Rekomendasi opsi2, UTC instants+IANA timezone, input lokal invalid/ambigu ditolak dengan pesan validasi, recurring hasil gap maju sebesar gap/overlap pilih instant lebih awal sesuai Temporal compatible. Simpan local/offset hasil untuk audit. Definisi hari tetap kalender, bukan durasi tetap. Waktu submitted/decision terpisah, server yang menentukan effective_at.

## Consequences and risks

Kebijakan gap/overlap adalah usulan teknis yang belum approved; jika bertentangan ekspektasi produk lakukan change control sebelum diterapkan. Tidak diam-diam membatasi timezone Asia/Jakarta atau membuat next occurrence selama pending. Versi timezone data/runtime perlu dicatat agar hasil tes dapat direproduksi. [Temporal ZonedDateTime](https://tc39.es/proposal-temporal/docs/zoneddatetime.html).

## Verification approach

T-07: contoh D2 WIB, early/late approval, spring gap/fall overlap dan zona non-DST; assert jumlah successor dan jam lokal hasil. Belum diuji.

## Approval evidence and revision

A1 proposed; tidak ada approval ADR. Tidak mengubah PRODUCT/UX atau jadwal aktual. Detail [overview timezone](../../ARCHITECTURE-A1.md#5-boundary-konsistensi-dan-timezone).
