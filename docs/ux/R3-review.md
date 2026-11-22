# Review UX R3 — persetujuan reward dengan saldo terbaru

Status: **siap direview, belum disetujui**. Sumber: permintaan pengguna dalam chat untuk memperbaiki interaksi Parent, bukan approval UX. Artefak aktif: `prototype/index.html`; SHA-256 pada `revision.json`. R2 diarsipkan utuh pada `history/R2.html` dan `history/R2-revision.json`, dengan hash `f34c5246879269c8c31d5d3bd05f819f7bcf9c6a2405180cd4aea8c0f5f9dda5`.

## Kesesuaian PRODUCT D2

Tidak ditemukan konflik dengan D2. Dokumen produk yang disetujui tidak diubah.

| Requirement | Alur R3 |
| --- | --- |
| F-14 / tanpa reservasi | Dua permintaan berbeda 80 poin tetap dapat pending bersamaan dari saldo 100. Membuka/menutup dialog dan pembaruan informasi tidak mereservasi atau membelanjakan saldo. Penjelasan bahwa reward belum dijamin tetap ada. |
| F-15 / keputusan Parent | Dialog menunjukkan saldo terbaru, biaya tersimpan, kekurangan dan saldo sesudah persetujuan bila cukup. Jika kurang, Setujui disabled sejak awal, disertai penjelasan; Tolak tetap tersedia dan wajib alasan. Permintaan tidak berubah menjadi ditolak otomatis. Pemeriksaan final saldo, status dan reward aktif dipertahankan saat aksi. |
| F-16 / status dan pemenuhan | Pending dapat ditinjau lagi nanti jika saldo cukup dan reward aktif. Reward nonaktif tidak dapat disetujui, tetapi masih dapat ditolak. Status disetujui tetap berarti poin dibelanjakan dan pemenuhan manual, tanpa refund. |
| Data usang / keputusan bersaing | Informasi dialog diperbarui tanpa menghapus alasan yang diketik. Jika perubahan baru diketahui saat klik, keputusan belum diterapkan; Parent melihat data terbaru dan perlu memilih keputusan lagi. Jika sudah diputuskan di tab lain, kedua tombol keputusan dinonaktifkan. |

Disabled adalah pencegahan di UI, bukan pengganti pemeriksaan saldo saat persetujuan. Aturan D2 bahwa saldo kurang tidak menghasilkan debit atau penolakan otomatis tetap berlaku.

## Perubahan interaksi

1. Parent membuka reward pertama: saldo 100, biaya 80, kekurangan 0, saldo sesudah 20; Setujui aktif.
2. Setelah persetujuan, Parent membuka reward kedua: saldo 20, biaya 80, kekurangan 60. Setujui nonaktif; penjelasan muncul **sebelum tindakan**, Tolak dan Tutup tetap tersedia.
3. Menutup dialog tetap menyimpan permintaan pending. Penjelasan menyebut dapat disetujui nanti bila saldo cukup dan reward aktif. Penolakan hanya terjadi atas keputusan Parent dengan alasan.
4. Saat saldo turun/naik atau status/reward berubah, ringkasan dan kemampuan aksi diperbarui di tempat, tanpa mengganti textarea. Pemberitahuan perubahan menggunakan live region. Fokus dari tombol yang menjadi disabled dipindah ke pemberitahuan; keyboard tetap dapat menavigasi dialog.
5. Pembaruan berasal dari storage event antar-tab standalone, fokus jendela/visibility, dan pemeriksaan lokal setiap 1 detik saat dialog terbuka. Sebelum setiap keputusan, data dibaca lagi; perubahan yang belum tampil memblokir keputusan pertama sampai Parent meninjau ulang.
6. Pada iframe sandbox Lavish yang tidak memiliki localStorage, state tetap memori per tab. Bagian “Skenario review lokal” di dialog memodelkan aktivitas dummy dari konteks lain (+60/−80). Ini **bukan fitur edit saldo produk**. Dua iframe Lavish tidak berbagi saldo; pengujian dua tab sungguhan dilakukan pada file standalone dengan storage bersama.

Asumsi UX: setelah menerima pembaruan otomatis, Parent dapat memilih keputusan berdasarkan informasi yang sudah ditampilkan. Jika pembaruan baru terdeteksi ketika aksi diklik, perlu klik keputusan lagi sesudah informasi terbaru ditampilkan. Biaya permintaan yang tersimpan tetap acuan, walaupun biaya katalog berubah.

## Bukti pengujian aktual

Lingkungan: browser Chromium melalui agent-browser terpasang; sesi `household-ux-r3`, `household-ux-r3-tabs`, dan `household-lavish-r3`. Seluruh data dummy. Perintah dijalankan dari root repository.

| Pemeriksaan | Hasil aktual | Evidence |
| --- | --- | --- |
| Syntax JavaScript inline | Exit 0 | Node `new Function` atas script inline |
| Skenario khusus reward di 1280×900 | 12 PASS, 0 FAIL | `evidence/R3-reward-desktop.json` |
| Skenario khusus reward di 360×800 | 12 PASS, 0 FAIL | `evidence/R3-reward-mobile.json` |
| Regresi alur D2 pada dua ukuran | Masing-masing 15 PASS, 0 FAIL | `evidence/R3-browser-desktop.json`, `evidence/R3-browser-mobile.json` |
| Dua tab browser sungguhan | 3 PASS; storage event asli teramati | `evidence/R3-two-tabs.json` |
| Timer, fokus jendela, fokus tombol disabled | 3 PASS | `evidence/R3-live-refresh.json` |
| Keyboard dialog saldo kurang | Shift+Tab melewati tombol disabled ke Tolak; Tab kembali ke Tutup; Escape menutup dan fokus kembali ke pembuka | `evidence/R3-keyboard.json` |
| Axe dialog saldo cukup/kurang (360px) | Masing-masing 0 violations, 0 incomplete | `evidence/R3-a11y-sufficient.json`, `evidence/R3-a11y-insufficient.json` |
| Review visual mobile/desktop | Informasi saldo/biaya/kekurangan dan kemampuan aksi terlihat; dialog tidak overflow horizontal | `evidence/R3-insufficient-mobile.png`, `evidence/R3-insufficient-desktop.png` |
| Lavish sandbox | Saldo 20/biaya 80/kurang 60, Setujui disabled; simulasi +60 mengaktifkan Setujui, tetap pending | `evidence/R3-lavish-insufficient.txt`, `evidence/R3-lavish-restored.txt` |
| Error halaman | `agent-browser errors` exit 0 tanpa output error | Sesi browser saat pengujian |

Dua belas skenario reward mencakup kasus 100→20, penolakan/alasan, saldo turun saat terbuka, saldo naik dan persetujuan eksplisit, data usang sebelum notifikasi, perubahan saldo yang masih cukup, biaya permintaan versus katalog, reward dinonaktifkan saat terbuka, keputusan Parent lain, saldo negatif akibat koreksi, kegagalan aksi/retry, dan responsive/label/live region. Pengujian real dua-tab juga memastikan alasan tidak hilang dan status pending tidak berubah otomatis ketika saldo bertambah.

### Reproduksi

```bash
agent-browser --session household-ux-r3 open file://$PWD/docs/ux/prototype/index.html
agent-browser --session household-ux-r3 set viewport 1280 900
agent-browser --session household-ux-r3 eval --stdin < docs/ux/evidence/browser-review.js
agent-browser --session household-ux-r3 eval --stdin < docs/ux/evidence/R3-reward-review.js
agent-browser --session household-ux-r3 set viewport 360 800
agent-browser --session household-ux-r3 eval --stdin < docs/ux/evidence/browser-review.js
agent-browser --session household-ux-r3 eval --stdin < docs/ux/evidence/R3-reward-review.js
agent-browser --session household-ux-r3 eval --stdin < docs/ux/evidence/R3-live-refresh.js
python docs/ux/evidence/R3-two-tabs.py
python scripts/workflow.py validate
```

Periksa `failed` pada output JSON, bukan hanya exit CLI. Script memakai dan mereset data dummy. Beberapa kasus menyuntikkan ledger/storage event dummy untuk mereproduksi perubahan; pengujian `R3-two-tabs.py` secara terpisah membuktikan event storage **asli** dari browser tab lain, termasuk persetujuan reward melalui UI. Reproduksi penuh tidak memerlukan backend aplikasi.

## Gate dan batas

UX tetap `waiting_approval`. Belum ada approval R3; architecture, implementation, QA, dan release tetap pending. Tidak ada backend/database, pilihan stack produksi, instalasi tambahan, atau publikasi. Tidak ada klaim bahwa prototype localStorage menjamin transaksi atomik pada konkurensi produksi; keamanan, konsistensi server dan reliability perlu diuji pada tahap yang sesuai. Perubahan ini menyempurnakan interaksi dan pencegahan data usang dalam prototype, tanpa mengubah aturan bisnis D2.
