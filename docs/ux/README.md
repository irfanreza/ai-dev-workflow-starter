# Review UX R2 — Ruang Bersama

Proyek `household-task-management`, berdasarkan PRODUCT D2 yang disetujui. **R2 belum disetujui.** Ini prototype HTML, tanpa backend aplikasi, database, atau pilihan stack produksi. Desain orisinal memakai CSS lokal, warna kertas/hijau hutan, Georgia dan Trebuchet/Verdana lokal; tidak memakai CDN atau font eksternal. Pilihan tampilan masih hipotesis UX untuk ditinjau.

## Membuka prototype

Dari root repository:

```bash
scripts/ux-lavish.sh docs/ux/prototype/index.html
```

Perintah mencetak URL sesi di `http://127.0.0.1:57123/session/...`. Buka URL itu di browser pada mesin yang sama. Sesi R2 yang dibuat saat persiapan: `http://127.0.0.1:57123/session/3d632bebb71c9593`. Jika server berhenti, jalankan perintah kembali untuk memperoleh URL aktif. Wrapper sengaja tidak membuka jendela browser otomatis.

Tanpa Lavish, buka `docs/ux/prototype/index.html` langsung dari file manager atau browser. Seluruh CSS dan JavaScript ada di HTML tersebut; tidak memerlukan server/build. Tampilan standalone menyediakan penyimpanan localStorage jika browser mengizinkannya. Dalam iframe sandbox Lavish, perubahan disimpan dalam memori tab; **reload/penutupan tab mengembalikan data awal**. Ini ditampilkan dalam prototype. Buka standalone jika ingin menyimpan perubahan dummy antar-reload. Reset data tersedia di “Skenario review”.

## Memberikan feedback melalui Lavish

1. Masuk sebagai **Ayu · Parent**, **Nara · Member**, atau **Bima · Member**. Dito sengaja nonaktif untuk mencoba akses ditolak. “Keluar / ganti akun” berpindah identitas dummy; ini bukan autentikasi produksi.
2. Tombol/form tetap dapat dioperasikan ketika Annotate menyala. Klik elemen tampilan atau pilih teks untuk menambahkan catatan; matikan Annotate sementara jika ingin menjelajah tanpa anotasi.
3. Sertakan identitas, layar, tindakan, kondisi yang terlihat, dan perubahan yang diinginkan. Contoh: “R2, Parent, pembatalan: peringatan saldo negatif sebaiknya tepat di atas konfirmasi.” Catatan dipersiapkan dalam antrean sebelum dikirim.
4. Tekan **Send to Agent**. Setelah mengirim, tulis **“Ambil feedback Lavish R2”** di chat ini. Agen akan menjalankan `poll`, menerima antrean tanpa Anda menyalin isi feedback, dan mencatat feedback/revisi. **Tidak ada pemantau otomatis aktif setelah giliran agen selesai.** Pesan bisa mengantre sampai diambil; status “agent not listening” saat itu sesuai keadaan.
5. Gunakan **Send & End** hanya jika ingin mengirim catatan terakhir sekaligus menutup sesi review. Akhir sesi bukan approval UX. Jangan gunakan menu Publish: publikasi belum diizinkan.

CLI pengambilan dan balasan (bagi agen, dari root repository):

```bash
scripts/ux-lavish.sh poll docs/ux/prototype/index.html --owner ux-r2-review
scripts/ux-lavish.sh reply docs/ux/prototype/index.html --agent-reply-file docs/ux/reply.txt
```

`poll` menunggu hingga ada feedback; setelah mengembalikan pesan, baca semuanya karena delivery mengonsumsi antrean. Jangan menjalankan listener kedua. `reply.txt` adalah contoh lokasi untuk teks balasan yang nanti dibuat, bukan file wajib. Wrapper memakai konfigurasi yang sama untuk open/poll/reply/stop. Perintah penghentian server: `scripts/ux-lavish.sh stop`.

## Urutan review yang disarankan

- **Parent / setup:** dari layar masuk pilih “Simulasikan setup keluarga baru”; nama keluarga dan zona waktu, lalu tambah anggota tanpa email. Di Keluarga, tambah/edit area, coba arsip area Dapur dan nonaktifkan Bima untuk melihat blocker.
- **Parent / tugas:** buat sekali jalan/interval, edit, arsip/aktifkan. Coba nilai tidak valid dan tugas pending yang dikunci.
- **Member:** masuk Nara, temukan tugas overdue, tandai Cuci piring selesai (poin langsung), lihat giliran berikutnya dan riwayat; ajukan Lipat selimut (pending tanpa poin).
- **Verifikasi:** masuk Ayu, tolak Rapikan rak buku dengan alasan, lalu masuk Bima untuk memperbaiki/ajukan ulang. Parent menyetujui dan melihat waktu pengajuan/persetujuan terpisah. Ayu juga dapat menyelesaikan dan memverifikasi Bersihkan kompor miliknya sendiri, dengan penanda audit.
- **Reward:** sebagai Nara, minta dua reward 80 poin dari saldo 100. Permintaan tidak mereservasi saldo. Parent menyetujui satu; persetujuan kedua gagal dengan pesan saldo kurang dan tetap pending. Coba edit biaya/nonaktifkan katalog; biaya permintaan lama tetap.
- **Koreksi:** buka “Skenario review → Koreksi saldo negatif”. Di Riwayat batalkan Lipat selimut: saldo 10 → −20. Coba tutup dialog tanpa perubahan, alasan kosong, serta “Simulasikan saldo berubah” sebelum konfirmasi untuk melihat permintaan konfirmasi ulang. Pembatalan diblokir jika giliran berikut pernah diajukan, meski ditolak.
- **States:** panel “Skenario review” menyediakan normal, kosong, loading, error/retry, akses ditolak untuk setiap layar. “Gagalkan aksi berikut” menguji gagal tanpa mutasi sebagian. Pending/overdue/sukses muncul lewat alur nyata simulasi. Fixture mereset seluruh data dummy dan masuk Parent; hindari menjalankannya sebelum mencatat feedback yang bergantung pada data sebelumnya.
- **Aksesibilitas:** coba Tab/Shift+Tab, Enter/Space, Escape untuk dialog; fokus terlihat dan tombol tutup mengembalikan fokus. Bandingkan 360px dan 1280px. Sembunyikan Conversation di Lavish untuk memberi ruang lebih luas pada prototype.

Pemetaan lengkap: [coverage.md](coverage.md). Bukti aktual dan batas pengujian: [review.md](review.md). Catatan feedback: [feedback.md](feedback.md). Identitas revisi: [revision.json](revision.json).

## Batas gate

Feedback → revisi → review ulang → **approval eksplisit untuk revisi dan hash tertentu** merupakan langkah terpisah. R2 belum memiliki approval. UX tidak boleh completed dan architecture tidak boleh dimulai sampai approval tersebut tercatat. Perubahan HTML menghasilkan hash/revisi review baru. Data/aksi dalam prototype tidak membuktikan keamanan server, transaksi paralel, ketahanan penyimpanan, atau kinerja aplikasi produksi.

Revisi sebelumnya: R1 diarsipkan di `history/R1.html`; feedback UX-001 dan pemeriksaan R2 ada di [R2-review.md](R2-review.md). R2 mempertahankan penyimpanan dummy browser yang sama agar perubahan kata tidak memaksa reset data.
