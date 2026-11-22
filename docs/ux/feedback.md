# Feedback UX

## UX-001 — bahasa status/jadwal

- Sumber: feedback pengguna melalui Lavish, diterima `poll` pada sesi review R1. Bukan approval.
- Pesan lengkap: **“"sejak sah" saya sedikit bingung maksudnya "sah" itu apa ya? Mungkin bisa diganti kata yang lebih umum.”**
- Tindakan: mengganti bahasa UI pada jadwal, status, riwayat, kontribusi, verifikasi, dan dialog pembatalan. Aturan D2 tetap sama.

| ID | Layar/elemen | Perubahan | Revisi | Status |
| --- | --- | --- | --- | --- |
| UX-001 | Kartu/detail tugas berulang | “sejak tugas selesai” tanpa verifikasi; “sejak disetujui Parent” jika perlu verifikasi | R2 | Diterapkan, menunggu review pengguna |
| UX-001 | Status/ringkasan/riwayat/penjelasan | Menghapus “sah” dari seluruh teks UI; status “Selesai” atau “Disetujui Parent”, penjelasan jadwal dan poin sesuai konteks | R2 | Diterapkan, menunggu review pengguna |

Bukti pemeriksaan: `R2-review.md`. R1 diarsipkan di `history/R1.html`. Belum ada approval terhadap R1 atau R2. Izin memulai UX, feedback, maupun pesan dummy uji integrasi bukan approval hasil UX.

## UX-002 — pratinjau kelayakan persetujuan reward

- Sumber: permintaan eksplisit pengguna di chat setelah commit/push R2; bukan approval.
- Skenario: Nara saldo 100, dua permintaan masing-masing 80; reward pertama disetujui → saldo 20. Pengguna meminta saldo terbaru, biaya dan kekurangan terlihat sebelum keputusan; Setujui disabled saat kurang, Tolak tetap tersedia, pending dipertahankan, dapat disetujui nanti, perubahan saat dialog terbuka diperbarui sebelum keputusan.
- Penilaian D2: konsisten dengan F-14/F-15/F-16 dan aturan tanpa reservasi; tidak ada konflik atau perubahan aturan bisnis.
- Diterapkan pada R3: panel angka dan kelayakan reaktif, native disabled + penjelasan, pembaruan di tempat, penolakan dengan alasan, guard data usang sebelum keputusan, serta skenario simulasi saldo lokal.
- Bukti: `R3-review.md`; 12 skenario khusus dan 15 regresi pada masing-masing ukuran browser, pengujian storage dua tab asli dan timing/fokus.
- Status: diterapkan, **menunggu review pengguna R3**. R2 diarsipkan utuh; belum ada approval UX.
