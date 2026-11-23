# Spesifikasi produk — D2

Proyek: `household-task-management`.
Revisi: D2, 22 November 2026. Status: **disetujui eksplisit oleh pengguna**.
Dokumen ini menetapkan scope MVP yang disetujui, bukan keputusan teknologi atau izin implementasi. Evidence: [approval D2](PRODUCT-D2-APPROVAL.md). Pernyataan status review di bagian historis berikut menggambarkan saat penyusunan D2; approval terkini dicatat di akhir dokumen.

## Catatan perubahan D1 → D2

Baseline D1 disimpan utuh di [arsip D1](history/PRODUCT-D1.md). Masukan pengguna mengonfirmasi arah MVP dan rekomendasi U-01–U-05, dengan penegasan berikut. Konfirmasi keputusan produk ini tidak dianggap sebagai approval dokumen D2.

| Perubahan | Bagian terdampak |
| --- | --- |
| Reward tetap Must; permintaan tidak mereservasi saldo dan belum menjamin reward sebelum disetujui. | Journey 6, F-14–16, edge cases reward |
| Sebelum pembatalan, Parent melihat alasan, debit, saldo sebelum/sesudah, dampak jadwal, dan peringatan saldo negatif. | Journey 7, F-12, edge cases koreksi |
| Maksimal satu pengajuan pending per occurrence; tidak ada occurrence berikutnya sebelum sah. Retry tidak membuat pengajuan/occurrence ganda. | F-07–09, N-03, definisi dan skenario konsistensi |
| Verifikasi diri Parent diperbolehkan dengan pelaku dan penanda verifikasi diri dalam audit trail. | F-08/11, edge cases verifikasi |
| Waktu pengajuan dan persetujuan ditampilkan terpisah; interval tetap dari waktu sah. | F-09/11, edge cases waktu |
| Target pilot/metrik tetap hipotesis evaluasi; bukan jaminan hasil. | Metrik, U-05 |
| Identitas proyek ditetapkan dan status usulan diperbarui sesuai review. | Header, register keputusan, state workflow |

Pemeriksaan konsistensi D2 tercatat di `docs/DISCOVERY-D2-REVIEW.md`. Tidak ada tambahan fitur Should/Could yang dinaikkan menjadi Must.

## Bukti discovery

Sumber: permintaan, dua putaran jawaban discovery, dan review D1 oleh pengguna dalam percakapan ini; catatan di `.workflow/intake/discovery-notes.md`.

| Topik wawancara | Jawaban/keputusan pengguna yang terkonfirmasi |
| --- | --- |
| Pengguna | Pilot satu keluarga, Parent/Admin dan Member termasuk anak, identitas individual, perangkat pribadi. |
| Akses | Parent login sederhana dan aman; Parent membuat akses anak tanpa email wajib. Mekanisme autentikasi dievaluasi pada architecture. |
| Masalah nyata | Pekerjaan mengandalkan ingatan/permintaan langsung; sulit mengetahui penanggung jawab, waktu terakhir dibersihkan, dan pekerjaan yang terlalu lama tidak dilakukan. |
| Penugasan | Parent membuat tugas dengan tepat satu penanggung jawab; pengambilan tugas bebas ditunda. |
| Jadwal | Sekali jalan atau interval sejak penyelesaian sah; jika diverifikasi, interval mulai saat disetujui. Tugas belum selesai tetap overdue. Kalender tetap ditunda. |
| Poin | Poin tetap per tugas; langsung untuk tugas tanpa verifikasi, setelah persetujuan untuk tugas dengan verifikasi; wajib mencegah pemberian ganda dan mencatat koreksi. |
| Reward | Katalog, kebutuhan poin, permintaan Member, dan persetujuan/penolakan Parent dipertahankan dalam MVP. Tidak mereservasi saldo; belum dijamin sebelum disetujui. Pemenuhan manual di luar aplikasi. |
| Batasan | Web responsif, bahasa Indonesia, online, biaya rendah, isolasi keluarga, tanpa tenggat ketat, hindari overengineering. |
| Gate | Review dan approval scope eksplisit sebelum UX; stack hanya pada architecture. Lavish AXI memerlukan persetujuan instalasi jika digunakan. |

Wawancara telah dilakukan. ID **U-01–U-05** dipertahankan untuk penelusuran rekomendasi D1 yang dikonfirmasi dalam review pengguna; penegasan pengguna dimasukkan ke D2. Approval scope D2 secara keseluruhan tetap menunggu. Keputusan teknis A-01/A-02 tetap terbuka untuk architecture.

## Masalah, pengguna, dan nilai produk

Keluarga membutuhkan satu tempat untuk melihat pekerjaan rumah yang perlu dilakukan, penanggung jawab, riwayat, dan kontribusi. Parent mengatur pekerjaan dan motivasi; Member menyelesaikan pekerjaan serta mengajukan reward. Nilai yang diuji: pekerjaan lebih jelas dan teratur, pencatatan mudah, serta poin/reward membantu partisipasi tanpa membebani Parent.

Pilot melayani satu keluarga. Batas privasi keluarga berlaku sejak MVP agar data tidak bercampur ketika produk berkembang; peluncuran publik banyak keluarga tidak masuk scope pilot.

## Metrik keberhasilan — hipotesis evaluasi pilot

Evaluasi pilot selama 14 hari setelah setup, minimal satu Parent dan dua Member bila tersedia. Target berikut disetujui pengguna sebagai hipotesis evaluasi, bukan jaminan keberhasilan produk atau syarat bahwa hasil pilot harus positif. Sampel kecil memberi sinyal awal, bukan bukti umum.

| ID | Target dan cara mengukur |
| --- | --- |
| S-01 | Setiap peserta pilot dapat menemukan tugasnya dan menandai satu tugas selesai tanpa bantuan, masing-masing dalam 2 menit pada uji penggunaan pertama. |
| S-02 | Parent dapat menemukan tugas overdue serta siapa/kapan terakhir menyelesaikan satu pekerjaan dalam 60 detik, tanpa bantuan. |
| S-03 | Pada sedikitnya 10 dari 14 hari pilot, Parent menyatakan daftar pekerjaan cukup jelas untuk menentukan apa yang perlu dilakukan; catat jawaban harian singkat. |
| S-04 | Parent dapat menemukan kontribusi setiap anggota dan menyetujui/menolak satu penyelesaian dalam 2 menit. |
| S-05 | Sedikitnya satu permintaan reward diajukan dan diputuskan; wawancara akhir menanyakan apakah poin/reward mendorong partisipasi dan apakah pengelolaannya merepotkan. Ini sinyal pemakaian, bukan klaim sebab-akibat. |

Tidak memasukkan analytics pihak ketiga sebagai kebutuhan MVP; observasi dan catatan pilot manual cukup.

## User journeys dan batas MVP

1. Parent memperoleh akses pilot, menyiapkan keluarga dan zona waktu, lalu membuat akses Member/anak. Member masuk dengan identitasnya sendiri.
2. Parent membuat area, membuat tugas di area tersebut, memilih satu anggota aktif, poin, tenggat awal, interval opsional, dan kebutuhan verifikasi.
3. Member membuka tugas miliknya, melihat tenggat/status, lalu menandai selesai. Tugas tanpa verifikasi langsung sah; tugas dengan verifikasi menunggu Parent.
4. Parent menyetujui atau menolak pengajuan. Penyelesaian sah memberi poin tepat sekali, memperbarui riwayat, dan menentukan tenggat berikutnya bila berulang.
5. Parent/Member melihat kapan tugas terakhir sah, siapa yang mengerjakannya, dan riwayat poin. Parent melihat kontribusi per anggota.
6. Parent membuat reward; Member melihat saldo dan pemberitahuan bahwa permintaan tidak mereservasi saldo serta reward belum dijamin sebelum persetujuan. Member mengajukan permintaan; Parent memutuskan. Setelah disetujui, keluarga memenuhi reward secara manual di luar aplikasi.
7. Parent memperbaiki penyelesaian yang keliru: melihat debit, saldo sebelum/sesudah, dampak jadwal dan peringatan jika saldo akan negatif, lalu mengonfirmasi pembatalan dengan alasan. Membatalkan dialog tidak mengubah data.

## Prioritas Must / Should / Could

**Must — usulan paket MVP untuk disetujui:**
- Identitas individual, peran, akses anak tanpa email, dan isolasi keluarga.
- Pengelolaan anggota, area, tugas, satu penanggung jawab, tenggat, sekali jalan/interval, overdue.
- Pengajuan selesai, verifikasi opsional, riwayat, poin tetap dan koreksi yang konsisten.
- Tampilan tugas Member, ringkasan Parent, kontribusi dan saldo individual.
- Katalog reward sederhana, permintaan, keputusan Parent, pengurangan poin tepat sekali.
- Keadaan kosong, loading, gagal, akses ditolak, dan pencegahan aksi berulang.

**Should — setelah Must lulus, tidak menjadi syarat release MVP:**
- Filter area/anggota dan penjelasan singkat cara kerja poin pada penggunaan pertama.
- Estimasi durasi per tugas; tidak digunakan dalam perhitungan poin.

**Could — kandidat iterasi berikutnya:**
- Tingkat kesulitan, tugas bebas diambil, jadwal kalender tetap, dukungan perangkat bersama, pengingat, ekspor riwayat.

## Kompleksitas reward dan alternatif scope

Reward sederhana menambah kompleksitas **menengah relatif terhadap pencatatan tugas+poin**, karena membutuhkan katalog, daftar permintaan dan keputusan untuk dua peran, riwayat biaya, pemeriksaan saldo saat persetujuan, serta pengujian keputusan bersamaan dengan koreksi poin. Ini menambah satu alur vertikal penuh; belum ada dasar untuk estimasi hari sebelum UX dan architecture.

- **Pilihan yang dikonfirmasi dalam review D1:** katalog + permintaan + persetujuan/penolakan. Paling sesuai untuk menguji motivasi sampai tindakan nyata; tanpa stok, pemenuhan, atau persetujuan bertingkat.
- **Alternatif D1 yang tidak dipilih:** katalog + saldo saja; pengajuan dan pengurangan poin manual di luar aplikasi. Lebih sederhana, tetapi tidak menguji kemudahan alur penukaran dan rekonsiliasi saldo dalam aplikasi.

Pilihan reward penuh sederhana dipertahankan dalam draft D2 berdasarkan keputusan pengguna, dengan batasan di bawah. Approval dokumen D2 tetap diperlukan.

## Functional requirements dan acceptance criteria

Seluruh AC adalah target pengujian, **belum merupakan hasil pengujian**. D2 menggabungkan keputusan review D1 dan menunggu approval scope eksplisit.

Istilah: **tugas** adalah definisi pekerjaan; **occurrence** adalah satu giliran pekerjaan dengan tenggat; **pengajuan** adalah laporan selesai untuk satu occurrence. Penolakan membuka kesempatan pengajuan baru pada occurrence yang sama, bukan membuat occurrence berikutnya. Retry pengajuan lama tetap merujuk hasil lama, termasuk setelah penolakan atau pembatalan; pengajuan ulang yang disengaja merupakan aksi baru.

| ID | Prioritas | Kebutuhan dan acceptance criteria |
| --- | --- | --- |
| F-01 | Must | Parent dapat masuk/keluar; Parent membuat dan menonaktifkan identitas Member tanpa email anak. Member dapat masuk/keluar sendiri. Akses nonaktif ditolak, termasuk sesi yang masih ada. Parent dapat membantu pemulihan akses anak; metode dan batas percobaan dievaluasi di architecture. |
| F-02 | Must | Member tidak dapat mengelola anggota, area, tugas, aturan poin, reward, atau memutuskan pengajuan. Percobaan langsung di luar UI tetap ditolak. Akses keluarga lain ditolak untuk daftar, detail, perubahan, dan riwayat, tanpa membocorkan isinya. |
| F-03 | Must | Parent dapat membuat/mengubah nama area dan mengarsipkannya. Area aktif dapat dipilih saat membuat tugas. Pengarsipan ditolak bila masih ada tugas aktif; riwayat tetap bisa dibaca. |
| F-04 | Must | Tugas wajib memiliki judul, area aktif, tepat satu anggota aktif dari keluarga yang sama, poin bilangan bulat ≥0, tenggat awal, dan pilihan verifikasi. Tugas berulang wajib memiliki interval bilangan bulat ≥1 hari. Nilai kosong/tidak valid ditolak dengan pesan Indonesia. |
| F-05 | Must | Parent dapat mengubah tugas dan mengarsipkan pekerjaan mendatang, serta mengaktifkan kembali tugas arsip jika area dan assignee aktif. Saat pengajuan menunggu verifikasi, perubahan poin/assignee/verifikasi/interval/tenggat dan pengarsipan ditolak sampai pengajuan diputuskan. Perubahan tidak mengubah riwayat atau poin yang sudah sah. |
| F-06 | Must | Member melihat tugas sendiri beserta area, poin, tenggat, status dan kebutuhan verifikasi. Parent melihat tugas keluarga dan jumlah overdue, menunggu verifikasi, serta selesai. Saat belum ada tugas, tampil arahan yang sesuai peran. |
| F-07 | Must | Hanya assignee aktif, termasuk Parent yang menjadi assignee, dapat mengajukan selesai. Tanpa verifikasi: satu penyelesaian sah dan satu kredit poin tercatat per occurrence. Dengan verifikasi: maksimal satu pengajuan pending per occurrence; belum ada kredit atau occurrence berikutnya. Double-click, retry, dan dua tab mengembalikan pengajuan yang sama. Setelah ditolak, pengajuan baru diperbolehkan pada occurrence yang sama; riwayat penolakan tetap ada. |
| F-08 | Must | Hanya Parent keluarga tersebut dapat menyetujui/menolak pengajuan pending. Persetujuan menghasilkan satu kredit dan waktu sah; penolakan wajib mencatat alasan, mengembalikan tugas untuk dikerjakan dengan tenggat lama, dan tidak memberi poin. Member melihat hasil dan alasan. Parent boleh memverifikasi tugasnya sendiri; audit trail menyimpan pengaju, pemberi keputusan, waktu keputusan dan penanda verifikasi diri. Keputusan ulang atas pengajuan yang sama tidak berdampak lagi. |
| F-09 | Must | Tugas sekali jalan berhenti muncul di daftar perlu dikerjakan setelah sah, namun tetap di riwayat. Tugas berulang menghasilkan tepat satu occurrence berikutnya dengan tenggat = waktu sah + interval. Untuk verifikasi, waktu sah adalah waktu persetujuan; tanpa verifikasi, waktu pengajuan yang diterima sistem. Tugas belum sah, termasuk pending, tidak menghasilkan occurrence berikutnya meskipun tenggat lewat. |
| F-10 | Must | Overdue berarti tenggat telah lewat dan pekerjaan belum sah. Tugas pending yang melewati tenggat tetap tampil sebagai menunggu verifikasi sekaligus overdue. Tidak ada penyelesaian otomatis. Pengajuan ulang yang ditolak tetap memakai tenggat lama. |
| F-11 | Must | Riwayat menampilkan pelaku, assignee, waktu diajukan, waktu disetujui/ditolak/dibatalkan, alasan bila ada, dan dampak poin. Waktu pengajuan dan persetujuan diberi label terpisah meskipun nilainya sama; tanpa verifikasi tampil “Langsung sah; tidak memerlukan persetujuan”. Verifikasi diri ditandai eksplisit. Waktu terakhir dibersihkan ditampilkan sebagai waktu terakhir penyelesaian sah yang belum dibatalkan. Kontribusi per anggota menampilkan jumlah penyelesaian sah yang belum dibatalkan dan poin perolehan bersih setelah koreksi, terpisah dari saldo setelah penukaran. |
| F-12 | Must | Parent dapat membatalkan hanya penyelesaian sah terbaru suatu tugas yang belum diikuti pengajuan occurrence berikutnya. Sebelum konfirmasi, UI wajib menampilkan kredit yang dibalik, debit koreksi, saldo sebelum/sesudah, dampak jadwal, dan peringatan bila saldo menjadi negatif; alasan wajib diisi. Menutup/membatalkan dialog tidak mengubah data. Konfirmasi menambahkan debit sebesar kredit asli tanpa menghapus riwayat. Retry pembatalan tidak menambah debit. Jika saldo/jadwal berubah sejak pratinjau, tampilkan dampak terbaru dan minta konfirmasi ulang sebelum menerapkan koreksi. Poin dan jadwal berubah sebagai satu hasil konsisten; kegagalan tidak boleh menyisakan perubahan sebagian. |
| F-13 | Must | Parent membuat/mengubah/menonaktifkan reward dengan nama dan biaya bilangan bulat >0. Member melihat reward aktif dan saldo sendiri. Biaya reward yang sudah diminta tidak berubah akibat edit katalog. |
| F-14 | Must | Member mengajukan reward aktif jika saldo saat itu mencukupi biaya. Satu klik/retry menghasilkan satu permintaan dengan biaya tercatat. Satu Member hanya boleh memiliki satu permintaan pending untuk reward yang sama. Permintaan berbeda diperbolehkan, tetapi tidak mereservasi saldo. Sebelum pengajuan dan pada detail pending, UI menjelaskan “Permintaan tidak mereservasi saldo. Reward belum dijamin sampai Parent menyetujui.” |
| F-15 | Must | Parent menyetujui/menolak permintaan pending; penolakan menyimpan alasan tanpa debit. Persetujuan memeriksa saldo terkini dan mendebit biaya tercatat tepat sekali. Saldo tidak cukup: persetujuan gagal dengan alasan, permintaan tetap pending. Dua persetujuan bersamaan tidak boleh membelanjakan poin yang sama. |
| F-16 | Must | Member melihat saldo, transaksi poin dan status permintaan sendiri; Parent melihat seluruh keluarga. Pending belum menjamin reward dan tidak mereservasi saldo; status disetujui berarti poin telah dibelanjakan, bukan bukti reward telah diserahkan. UI menyatakan pemenuhan dilakukan manual. Reward nonaktif tidak bisa diminta atau disetujui; pending tetap bisa ditolak. |
| F-17 | Must | Menonaktifkan Member ditolak jika ia masih memiliki tugas aktif, pengajuan tugas pending, atau reward pending; Parent diberi daftar yang perlu dialihkan/diselesaikan lebih dulu. Penonaktifan tidak menghapus riwayat. |

## Aturan detail dan edge cases

### Waktu, interval, dan perubahan tugas
- Keluarga memilih satu zona waktu saat setup. Perubahan zona waktu setelah setup ditunda untuk MVP; UI selalu menunjukkan zona waktu keluarga.
- Tenggat awal dipilih Parent sebagai tanggal dan jam lokal keluarga; interval berarti tambahan sejumlah hari pada jam lokal yang sama. Aturan perpindahan waktu musiman harus diuji bila zona waktu tersebut dipakai.
- Contoh: tenggat 1 Desember 09.00, interval 7 hari; diajukan 2 Desember 10.00 dan disetujui 3 Desember 08.00 → tenggat berikutnya 10 Desember 08.00. Sebelum persetujuan tetap overdue, tanpa poin.
- Tugas dapat diselesaikan sebelum tenggat. Pekerjaan berulang berikutnya tetap dihitung dari waktu sah, sehingga penyelesaian dini memajukan jadwal.
- Waktu pengajuan dicatat terpisah untuk menunjukkan kapan Member melaporkan pekerjaan; waktu sah menjadi acuan interval sesuai keputusan pengguna.
- Nilai poin, assignee, interval dan kebutuhan verifikasi diambil dari aturan pekerjaan saat diajukan; tidak berubah selama pending. Perubahan selanjutnya hanya berlaku pada pekerjaan yang belum diajukan.
- Pengarsipan tugas menghentikan pekerjaan mendatang; riwayat dan poin sah tetap ada. Tidak ada hapus permanen melalui UI MVP.
- Parent juga dapat memiliki tugas; tugas milik Parent mengikuti aturan yang sama, dan Parent boleh memverifikasinya sendiri untuk MVP. Audit trail wajib mencatat pengaju dan pemberi keputusan beserta penanda verifikasi diri; kredit tetap hanya sekali.

### Pembatalan dan koreksi poin
- Member tidak dapat membuka ulang penyelesaian sah. Parent membatalkan dengan alasan.
- MVP hanya membatalkan penyelesaian sah terbaru suatu tugas, jika occurrence berikutnya belum pernah diajukan (termasuk pengajuan yang kemudian ditolak) atau diselesaikan. Jika syarat tidak terpenuhi, pembatalan ditolak dengan penjelasan. Koreksi historis bebas ditunda agar rantai interval tidak ambigu.
- Pembatalan menonaktifkan occurrence berikutnya yang belum pernah diajukan, tanpa menghapus jejaknya, dan membuka kembali occurrence asal dengan tenggat aslinya; akibatnya dapat langsung overdue. Tugas yang sudah diarsipkan tetap diarsipkan; occurrence asal terbuka tercatat tetapi baru muncul sebagai pekerjaan aktif jika Parent mengaktifkan kembali tugas. Waktu terakhir sah kembali ke penyelesaian sebelumnya, atau “belum pernah”. Tindakan dan jejak pekerjaan berikutnya tetap terlacak dalam riwayat.
- Debit pembatalan sebesar kredit asli, meskipun poin tugas kemudian berubah. Pengajuan sah baru setelah pembatalan memberi kredit baru tepat sekali.
- Sebelum konfirmasi pembatalan, Parent melihat jumlah debit, saldo sebelum/sesudah dan dampak pada jadwal. Contoh saldo 10 dan kredit asal 30: tampilkan saldo hasil −20 serta peringatan bahwa penukaran baru akan terblokir. Jika kondisi berubah sejak pratinjau, perbarui dampak dan minta konfirmasi ulang. Jika poin terlanjur ditukar, koreksi **boleh membuat saldo negatif**, ditampilkan jelas; permintaan/persetujuan reward baru ditolak sampai saldo cukup. Ini menjaga jejak koreksi tanpa membatalkan reward yang sudah dipenuhi di luar aplikasi.
- Tidak ada edit saldo manual atau pembatalan reward yang sudah disetujui di MVP. Parent harus mengonfirmasi persetujuan dan biaya sebelum keputusan final. Bila refund menjadi kebutuhan wajib, scope perlu direvisi.

### Reward, konkurensi, dan kegagalan
- Pending tidak mereservasi saldo; sebelum pengajuan dan pada detail pending, UI menjelaskan bahwa reward belum dijamin sampai Parent menyetujui dan saldo diperiksa lagi saat persetujuan. Contoh: saldo 100, dua permintaan masing-masing 80; hanya satu dapat disetujui sebelum ada pemasukan baru.
- Edit biaya katalog tidak mengubah biaya permintaan yang sudah diajukan. Menonaktifkan reward mencegah persetujuan pending agar Parent tidak menyetujui reward yang sudah tidak tersedia.
- Persetujuan, penolakan, pembatalan, dan pengajuan yang bersaing hanya boleh menghasilkan satu transisi sah. Permintaan dengan status usang diberi hasil terkini tanpa transaksi ganda.
- Saat jaringan terputus setelah aksi dikirim, UI menyediakan cara memeriksa hasil/retry yang aman. Mengklik dua kali, retry, muat ulang, dan dua tab tidak boleh menggandakan poin atau pengurangan saldo.
- Sistem tidak membuktikan kebersihan secara objektif; pencatatan dan verifikasi keluarga menjadi sumber kepercayaan. Foto bukti tidak masuk MVP.

## Non-functional requirements dan acceptance criteria

| ID | Kriteria terukur / bukti yang diperlukan |
| --- | --- |
| N-01 Keamanan | Semua aksi terlindungi memeriksa identitas, peran, keluarga, dan kepemilikan. Uji akses lintas dua keluarga untuk Member dan Parent, termasuk akses langsung ke identitas data yang diketahui. Tidak ada kredensial anak atau sesi dalam URL/log yang dapat dibaca pengguna lain. |
| N-02 Privasi | Hanya data minimum: identitas tampilan, peran, akses, tugas, aktivitas, poin, reward. Tidak mewajibkan tanggal lahir, foto, alamat rumah, atau email anak. Prosedur penghapusan data keluarga dan retensi backup harus diputuskan sebelum release readiness; log tidak memuat rahasia. |
| N-03 Integritas | Uji double-click, retry, dua tab dan keputusan bersamaan untuk F-07/08/12/14/15. Buktikan maksimal satu pending per occurrence, tidak ada occurrence baru selama pending, audit trail verifikasi diri, serta konfirmasi ulang koreksi saat dampak berubah. Saldo sama dengan jumlah seluruh kredit/debit tercatat; tidak ada catatan historis yang diam-diam diubah. |
| N-04 Penggunaan | Seluruh alur Must berbahasa Indonesia dan dapat dipakai pada lebar 360px serta 1280px tanpa scroll horizontal. Kontrol memiliki label, dapat dipakai dengan keyboard, fokus terlihat, status tidak hanya dibedakan dengan warna; kontras teks normal minimal 4,5:1. Buktikan dengan review browser dan pemeriksaan aksesibilitas. |
| N-05 Kinerja | Untuk pilot ≤10 anggota, ≤100 tugas aktif, dan ≤10.000 aktivitas, daftar tugas serta riwayat halaman pertama dapat digunakan dalam ≤3 detik pada sekurangnya 19 dari 20 pengukuran, di lingkungan dan profil jaringan yang dicatat saat QA. Target ini belum hasil ukur atau pilihan hosting. |
| N-06 Kegagalan | Setiap alur Must mempunyai keadaan loading, sukses, kosong bila relevan, akses ditolak dan gagal/retry yang dapat dipahami. Pada restart, redeploy, crash proses, atau gangguan jaringan biasa, seluruh transaksi yang sudah committed harus tetap tersimpan dan konsisten saat sesi baru dibuka. Khusus pilot, hanya pada bencana kehilangan permanen storage utama yang memerlukan restore dari backup, kehilangan data maksimal 24 jam dapat diterima sesuai target RPO. Restore wajib menjaga integritas database, ledger poin, reward, occurrence, dan isolasi keluarga. |
| N-07 Operasional | Sebelum release readiness, dokumentasikan estimasi biaya pilot, konfigurasi lingkungan, pemulihan akses, backup/restore dan uji pemulihan, rollback, serta batas retensi. Anggaran maksimum dan target waktu pemulihan dikonfirmasi pada architecture sebelum memilih solusi. |
| N-08 Pengujian | Skenario acceptance ditelusurkan ke ID F/N, termasuk isolasi keluarga dan integritas poin. Bukti QA mencatat perintah, lingkungan, hasil aktual dan keterbatasan. Tidak ada klaim lulus sebelum pengujian dijalankan. |

## Non-goals MVP

Pendaftaran publik banyak keluarga, bergabung ke banyak keluarga, perangkat bersama, offline/sinkronisasi offline, native mobile, jadwal kalender tetap, pengambilan tugas bebas, banyak assignee, penilaian otomatis, foto bukti, notifikasi eksternal, leaderboard, stok reward, pembayaran, pemenuhan otomatis, refund reward, koreksi sejarah bebas, dan integrasi pihak ketiga.

Tidak memilih framework, backend, database, penyedia cloud, atau mekanisme autentikasi pada discovery.

## Risiko, asumsi, dan keputusan terbuka

| ID | Status | Risiko/keputusan dan tindak lanjut |
| --- | --- | --- |
| U-01 | Dikonfirmasi dalam review D1 | Katalog+permintaan+keputusan dipertahankan; pending tidak mereservasi saldo dan belum menjamin reward. Diterapkan pada F-13–16. |
| U-02 | Dikonfirmasi dengan penegasan | Pembatalan terbaru yang belum diikuti pengajuan berikutnya, saldo negatif akibat koreksi, tanpa refund. Parent wajib melihat peringatan dan dampak sebelum konfirmasi (F-12). |
| U-03 | Dikonfirmasi dalam review D1 | Pending tidak mereservasi saldo, biaya tersimpan, satu pending per reward/Member, tanpa pembatalan mandiri oleh Member. Parent dapat menolak atas permintaan Member. |
| U-04 | Dikonfirmasi dengan penegasan | Zona waktu, tenggat, penyelesaian dini, arsip, penonaktifan anggota; satu pending per occurrence, tanpa occurrence berikutnya selama pending; verifikasi diri Parent diaudit. Waktu pengajuan/persetujuan terpisah. |
| U-05 | Dikonfirmasi sebagai hipotesis/target | Metrik pilot adalah hipotesis evaluasi, bukan jaminan hasil produk. Batas volume dan target kinerja tetap kriteria QA, belum bukti hasil ukur. |
| A-01 | Ditunda ke architecture | Evaluasi akses anak yang sederhana dan aman, pemulihan, batas percobaan, akses Parent, serta pembentukan keluarga pilot; tidak mengandalkan pilihan profil saja sebagai autentikasi. |
| A-02 | Ditunda ke architecture | Tetapkan plafon biaya dan tujuan pemulihan; evaluasi kebutuhan teknis berdasarkan F/N yang disetujui, bukan pertumbuhan hipotetis. |
| R-01 | Risiko produk | Persetujuan Parent yang terlambat menggeser interval meski pekerjaan fisik lebih awal; tampilkan kedua waktu dan ukur beban verifikasi saat pilot. |
| R-02 | Risiko motivasi | Poin dapat memicu kompetisi atau pencatatan palsu; gunakan transparansi riwayat dan verifikasi opsional, evaluasi lewat wawancara pilot. |
| R-03 | Risiko scope | Reward dan koreksi menambah pengujian konsistensi; kurangi fitur pendukung sebelum mengurangi integritas, keamanan, atau riwayat. |

## Approval produk eksplisit

- Revisi yang disetujui: **D2**.
- Reviewer: pengguna/pemilik produk dalam percakapan ini.
- Keputusan: **approved: spesifikasi produk D2**, 22 November 2026 (tanggal sesi). Mencakup scope MVP, prioritas Must/Should/Could, acceptance criteria, U-01–U-05, non-goals, dan risiko yang terdokumentasi.
- Evidence dan kutipan persetujuan: [PRODUCT-D2-APPROVAL.md](PRODUCT-D2-APPROVAL.md). Persetujuan arah MVP pada review D1 tetap dibedakan dari approval D2 ini.
- Instruksi terbaru pengguna: **jangan mulai UX dahulu**; catat approval, selesaikan discovery, validasi, lalu berhenti. Semua tahap berikutnya tetap pending. Resume menunggu instruksi pengguna untuk memulai UX.
- Tahap UX nantinya memerlukan prototype HTML, review browser dan approval terpisah. Lavish AXI hanya dipasang dengan izin; fallback review browser manual tersedia. Architecture memerlukan approval tersendiri sesudah UX; release readiness dan deployment produksi juga dibedakan.
