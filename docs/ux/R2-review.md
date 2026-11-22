Revisi aktif sekarang **R3**; lihat [R3-review.md](R3-review.md). Dokumen berikut merekam R2 sebagai baseline historis, bukan approval.

# Review UX R2 — perbaikan bahasa UX-001

Status: **menunggu review pengguna, belum disetujui**. Feedback diambil dari Lavish melalui `scripts/ux-lavish.sh poll docs/ux/prototype/index.html --owner ux-r1-review`. Satu pesan diterima dan dibaca utuh, dicatat pada `feedback.md`.

Perubahan:
- Jadwal tanpa verifikasi: “Setiap N hari sejak tugas selesai”.
- Jadwal dengan verifikasi: “Setiap N hari sejak disetujui Parent”.
- “Terakhir sah” menjadi “Terakhir selesai”; “Selesai sah” menjadi “Selesai”. Riwayat membedakan “Disetujui Parent” dan “Selesai” sesuai kebutuhan verifikasi.
- Penjelasan poin, giliran berikutnya, form tugas dan pembatalan memakai bahasa yang menjelaskan selesai/persetujuan. Seluruh istilah “sah” dihapus dari teks UI prototype.
- Label revisi menjadi R2. Data dummy dan aturan bisnis tidak berubah; localStorage key dipertahankan untuk kompatibilitas data simulasi.

Artefak aktif: `prototype/index.html`, hash pada `revision.json`. Baseline R1 utuh: `history/R1.html` (SHA-256 `2c411c847401a96752a848a19309a7329b39e9dec1c402306ef1a4c8c6e12038`); manifest historis `history/R1-revision.json`.

Pemeriksaan aktual:

| Pemeriksaan | Hasil | Evidence |
| --- | --- | --- |
| Syntax JavaScript inline | Exit 0 | Node `new Function` terhadap script inline |
| Browser mobile 360×800 | 15 skenario, 0 gagal; termasuk pemeriksaan seluruh halaman/states tanpa overflow horizontal | `evidence/R2-browser-mobile.json` |
| Browser desktop 1280×900 | 15 skenario, 0 gagal | `evidence/R2-browser-desktop.json` |
| Axe pada daftar tugas 360px | 0 violations; 1 incomplete untuk kontras ikon dekoratif non-text | `evidence/R2-a11y-tasks.json` |
| Review visual daftar tugas | Kata baru tampil, membungkus pada mobile | `evidence/R2-tasks-mobile.png`, `evidence/R2-tasks-desktop.png` |
| Error halaman | `agent-browser errors` exit 0 tanpa output error | Sesi `household-ux-r2` |

Pemeriksaan browser menggunakan agent-browser terpasang dan Chromium yang sama dengan R1. Assertion wording riwayat pada `evidence/browser-review.js` disesuaikan ke teks R2. Script tetap menggunakan penyimpanan dummy yang sama dan mereset fixture. Pemeriksaan R2 memverifikasi revisi kata; bukan pengujian aplikasi produksi, jaminan keamanan/transaksi paralel, atau approval pengguna. Batas pengujian baseline pada `review.md` tetap berlaku.

UX tetap `waiting_approval`; architecture/implementation/QA/release tetap pending. Feedback UX-001 sudah ditangani untuk direview lagi; belum ada statement approval R2. Tidak ada publikasi atau instalasi tambahan.
