# Review konsistensi discovery D2

Jenis pemeriksaan: review dokumen, bukan pengujian aplikasi. Baseline: `docs/history/PRODUCT-D1.md`; hasil revisi: `docs/PRODUCT.md`. Approval D2 belum diberikan.

## Penelusuran penegasan pengguna

| Penegasan | Requirement/AC | Edge case yang diperiksa |
| --- | --- | --- |
| Reward dipertahankan; tanpa reservasi; belum dijamin | F-13–16, journey 6 | Saldo 100, dua pending biaya 80: keduanya boleh diajukan, hanya satu disetujui sebelum pemasukan baru. UI menjelaskan status sebelum pengajuan dan saat pending. |
| Pembatalan terbatas, dampak terlihat sebelum konfirmasi | F-12, N-03, journey 7 | Saldo 10 dikoreksi −30: pratinjau −20, peringatan, alasan dan konfirmasi. Menutup dialog tidak mengubah data; saldo berubah sebelum konfirmasi memerlukan pratinjau dan konfirmasi ulang. |
| Satu pending per occurrence; tanpa occurrence baru saat pending | F-07–10, N-03 | Dua tab mengajukan occurrence yang sama: satu pending, nol kredit, nol occurrence berikutnya. Penolakan memungkinkan pengajuan baru pada occurrence yang sama; retry aksi lama tidak menjadi pengajuan baru. |
| Verifikasi diri dengan audit | F-07/08/11 | Parent assignee mengajukan lalu menyetujui sendiri: satu kredit, identitas pengaju/pemberi keputusan, waktu dan penanda verifikasi diri tersimpan. |
| Interval dari waktu sah, waktu ditampilkan terpisah | F-09/11 | Diajukan 2 Des 10.00, disetujui 3 Des 08.00, interval 7 hari: tenggat 10 Des 08.00. Tanpa verifikasi, waktu sah adalah waktu pengajuan diterima; tidak mengarang waktu persetujuan. |
| Metrik sebagai hipotesis | S-01–05, U-05 | Hasil pilot rendah dicatat sebagai temuan evaluasi, bukan dianggap otomatis gagal secara teknis atau disembunyikan. Target kinerja N-05 tetap diuji tersendiri. |
| Nama proyek | Header D2, `.workflow/state.json` | `household-task-management`; discovery waiting_approval, semua tahap berikutnya pending. |

## Cakupan review seluruh requirement

- F-01–02 dan N-01–02: identitas, peran, isolasi keluarga dan privasi tetap konsisten; mekanisme akses belum dipilih.
- F-03–06: arsip mempertahankan riwayat; reaktivasi memerlukan area/assignee aktif. Tenggat ikut dikunci saat pending agar penolakan kembali ke tenggat lama secara konsisten.
- F-07–11: definisi tugas/occurrence/pengajuan dipisahkan; penolakan, retry, overdue dan waktu sah tidak memicu kredit atau occurrence ganda. Kontribusi mengecualikan penyelesaian yang dibatalkan dan memperhitungkan koreksi poin.
- F-12: larangan pembatalan berlaku jika occurrence berikutnya pernah diajukan, termasuk kemudian ditolak. Occurrence berikutnya yang belum diajukan dinonaktifkan tanpa menghapus jejak. Pembatalan pada tugas arsip tidak diam-diam mengaktifkan tugas.
- F-13–16: biaya permintaan tetap, saldo diperiksa saat persetujuan, reward nonaktif tidak bisa disetujui, tidak ada refund/pemenuhan otomatis. Saldo negatif akibat koreksi diperbolehkan; belanja baru tidak boleh membuat saldo negatif.
- F-17: anggota tidak dinonaktifkan selama masih ada tugas aktif atau pengajuan pending; audit tetap ada setelah penonaktifan.
- N-03–08: integritas, aksesibilitas, kinerja, kegagalan, operasional dan bukti QA tetap target yang harus diuji nanti. Tidak ada hasil tes aplikasi yang diklaim.
- Must/Should/Could, journeys, non-goals dan register U/A/R dibaca ulang terhadap aturan di atas. Alternatif reward lebih kecil ditandai tidak dipilih; keputusan architecture tetap terbuka.

## Hasil dan batasan

Inkonsistensi D1 yang ditemukan pada istilah pengajuan ulang, penghapusan occurrence, waktu persetujuan tanpa verifikasi, status U-01–U-05, dan kontribusi setelah koreksi telah diperjelas di D2. Review ini tidak menggantikan approval pengguna, review UX, atau pengujian implementasi. Detail reaktivasi arsip dan konfirmasi ulang koreksi termasuk dalam draft D2 yang diminta disetujui, bukan dianggap otomatis mendapat approval.
