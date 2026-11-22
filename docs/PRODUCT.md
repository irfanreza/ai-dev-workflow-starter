# Spesifikasi produk — D1

Revisi: D1, 22 November 2026. Status: **draft untuk review; belum disetujui**.
Dokumen ini mengusulkan scope MVP, bukan keputusan teknologi atau izin implementasi.

## Bukti discovery

Sumber: permintaan dan dua putaran jawaban pengguna dalam percakapan ini; catatan awal di `.workflow/intake/discovery-notes.md`.

| Topik wawancara | Jawaban/keputusan pengguna yang terkonfirmasi |
| --- | --- |
| Pengguna | Pilot satu keluarga, Parent/Admin dan Member termasuk anak, identitas individual, perangkat pribadi. |
| Akses | Parent login sederhana dan aman; Parent membuat akses anak tanpa email wajib. Mekanisme autentikasi dievaluasi pada architecture. |
| Masalah nyata | Pekerjaan mengandalkan ingatan/permintaan langsung; sulit mengetahui penanggung jawab, waktu terakhir dibersihkan, dan pekerjaan yang terlalu lama tidak dilakukan. |
| Penugasan | Parent membuat tugas dengan tepat satu penanggung jawab; pengambilan tugas bebas ditunda. |
| Jadwal | Sekali jalan atau interval sejak penyelesaian sah; jika diverifikasi, interval mulai saat disetujui. Tugas belum selesai tetap overdue. Kalender tetap ditunda. |
| Poin | Poin tetap per tugas; langsung untuk tugas tanpa verifikasi, setelah persetujuan untuk tugas dengan verifikasi; wajib mencegah pemberian ganda dan mencatat koreksi. |
| Reward | Katalog, kebutuhan poin, permintaan Member, dan persetujuan/penolakan Parent diusulkan masuk MVP sesuai permintaan pengguna. Pemenuhan manual di luar aplikasi. |
| Batasan | Web responsif, bahasa Indonesia, online, biaya rendah, isolasi keluarga, tanpa tenggat ketat, hindari overengineering. |
| Gate | Review dan approval scope eksplisit sebelum UX; stack hanya pada architecture. Lavish AXI memerlukan persetujuan instalasi jika digunakan. |

Wawancara telah dilakukan. Semua detail di bawah yang belum dijawab pengguna ditandai **U** (usulan), untuk dikonfirmasi saat review D1. Tidak ada asumsi yang dianggap telah disetujui.

## Masalah, pengguna, dan nilai produk

Keluarga membutuhkan satu tempat untuk melihat pekerjaan rumah yang perlu dilakukan, penanggung jawab, riwayat, dan kontribusi. Parent mengatur pekerjaan dan motivasi; Member menyelesaikan pekerjaan serta mengajukan reward. Nilai yang diuji: pekerjaan lebih jelas dan teratur, pencatatan mudah, serta poin/reward membantu partisipasi tanpa membebani Parent.

Pilot melayani satu keluarga. Batas privasi keluarga berlaku sejak MVP agar data tidak bercampur ketika produk berkembang; peluncuran publik banyak keluarga tidak masuk scope pilot.

## Metrik keberhasilan — target usulan U

Evaluasi pilot selama 14 hari setelah setup, minimal satu Parent dan dua Member bila tersedia. Sampel kecil memberi sinyal awal, bukan bukti umum.

| ID | Target dan cara mengukur |
| --- | --- |
| S-01 | Setiap peserta pilot dapat menemukan tugasnya dan menandai satu tugas selesai tanpa bantuan, masing-masing dalam 2 menit pada uji penggunaan pertama. |
| S-02 | Parent dapat menemukan tugas overdue serta siapa/kapan terakhir menyelesaikan satu pekerjaan dalam 60 detik, tanpa bantuan. |
| S-03 | Pada sedikitnya 10 dari 14 hari pilot, Parent menyatakan daftar pekerjaan cukup jelas untuk menentukan apa yang perlu dilakukan; catat jawaban harian singkat. |
| S-04 | Parent dapat menemukan kontribusi setiap anggota dan menyetujui/menolak satu penyelesaian dalam 2 menit. |
| S-05 | Sedikitnya satu permintaan reward diajukan dan diputuskan; wawancara akhir menanyakan apakah poin/reward mendorong partisipasi dan apakah pengelolaannya merepotkan. Ini sinyal pemakaian, bukan klaim sebab-akibat. |

Tidak memasukkan analytics pihak ketiga sebagai kebutuhan MVP; observasi dan catatan pilot manual cukup (U).

## User journeys dan batas MVP

1. Parent memperoleh akses pilot, menyiapkan keluarga dan zona waktu, lalu membuat akses Member/anak. Member masuk dengan identitasnya sendiri.
2. Parent membuat area, membuat tugas di area tersebut, memilih satu anggota aktif, poin, tenggat awal, interval opsional, dan kebutuhan verifikasi.
3. Member membuka tugas miliknya, melihat tenggat/status, lalu menandai selesai. Tugas tanpa verifikasi langsung sah; tugas dengan verifikasi menunggu Parent.
4. Parent menyetujui atau menolak pengajuan. Penyelesaian sah memberi poin tepat sekali, memperbarui riwayat, dan menentukan tenggat berikutnya bila berulang.
5. Parent/Member melihat kapan tugas terakhir sah, siapa yang mengerjakannya, dan riwayat poin. Parent melihat kontribusi per anggota.
6. Parent membuat reward; Member melihat saldo dan mengajukan permintaan; Parent memutuskan. Setelah disetujui, keluarga memenuhi reward secara manual di luar aplikasi.
7. Parent memperbaiki penyelesaian yang keliru melalui pembatalan tercatat dan melihat dampaknya pada poin/jadwal (aturan U di bawah).

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

- **Pilihan D1 yang diusulkan:** katalog + permintaan + persetujuan/penolakan. Paling sesuai untuk menguji motivasi sampai tindakan nyata; tanpa stok, pemenuhan, atau persetujuan bertingkat.
- **Alternatif lebih kecil:** katalog + saldo saja; pengajuan dan pengurangan poin manual di luar aplikasi. Lebih sederhana, tetapi tidak menguji kemudahan alur penukaran dan rekonsiliasi saldo dalam aplikasi.

Rekomendasi: pertahankan pilihan D1, dengan batasan ketat di bawah. Keputusan final menunggu review pengguna, tidak ditetapkan otomatis.

## Functional requirements dan acceptance criteria

Seluruh AC adalah target pengujian, **belum merupakan hasil pengujian**. Aturan U tetap memerlukan konfirmasi scope.

| ID | Prioritas | Kebutuhan dan acceptance criteria |
| --- | --- | --- |
| F-01 | Must | Parent dapat masuk/keluar; Parent membuat dan menonaktifkan identitas Member tanpa email anak. Member dapat masuk/keluar sendiri. Akses nonaktif ditolak, termasuk sesi yang masih ada. Parent dapat membantu pemulihan akses anak; metode dan batas percobaan dievaluasi di architecture. |
| F-02 | Must | Member tidak dapat mengelola anggota, area, tugas, aturan poin, reward, atau memutuskan pengajuan. Percobaan langsung di luar UI tetap ditolak. Akses keluarga lain ditolak untuk daftar, detail, perubahan, dan riwayat, tanpa membocorkan isinya. |
| F-03 | Must | Parent dapat membuat/mengubah nama area dan mengarsipkannya (U). Area aktif dapat dipilih saat membuat tugas. Pengarsipan ditolak bila masih ada tugas aktif; riwayat tetap bisa dibaca. |
| F-04 | Must | Tugas wajib memiliki judul, area aktif, tepat satu anggota aktif dari keluarga yang sama, poin bilangan bulat ≥0, tenggat awal, dan pilihan verifikasi. Tugas berulang wajib memiliki interval bilangan bulat ≥1 hari. Nilai kosong/tidak valid ditolak dengan pesan Indonesia. |
| F-05 | Must | Parent dapat mengubah tugas dan mengarsipkan pekerjaan mendatang. Saat pengajuan menunggu verifikasi, perubahan poin/assignee/verifikasi/interval dan pengarsipan ditolak sampai pengajuan diputuskan (U). Perubahan tidak mengubah riwayat atau poin yang sudah sah. |
| F-06 | Must | Member melihat tugas sendiri beserta area, poin, tenggat, status dan kebutuhan verifikasi. Parent melihat tugas keluarga dan jumlah overdue, menunggu verifikasi, serta selesai. Saat belum ada tugas, tampil arahan yang sesuai peran. |
| F-07 | Must | Hanya assignee aktif yang dapat mengajukan selesai. Tanpa verifikasi: satu penyelesaian sah dan satu kredit poin tercatat. Dengan verifikasi: status menunggu, belum ada kredit atau tenggat baru. Pengajuan ulang untuk pekerjaan yang sama tidak menghasilkan catatan ganda. |
| F-08 | Must | Hanya Parent keluarga tersebut dapat menyetujui/menolak pengajuan pending. Persetujuan menghasilkan satu kredit dan waktu sah; penolakan wajib mencatat alasan, mengembalikan tugas untuk dikerjakan dengan tenggat lama, dan tidak memberi poin (U). Member melihat hasil dan alasan. Keputusan ulang atas pengajuan yang sama tidak berdampak lagi. |
| F-09 | Must | Tugas sekali jalan berhenti muncul di daftar perlu dikerjakan setelah sah, namun tetap di riwayat. Tugas berulang menghasilkan tepat satu pekerjaan berikutnya dengan tenggat = waktu sah + interval. Tugas yang belum sah tidak menghasilkan salinan baru ketika tenggat lewat. |
| F-10 | Must | Overdue berarti tenggat telah lewat dan pekerjaan belum sah. Tugas pending yang melewati tenggat tetap tampil sebagai menunggu verifikasi sekaligus overdue (U). Tidak ada penyelesaian otomatis. Pengajuan ulang yang ditolak tetap memakai tenggat lama. |
| F-11 | Must | Riwayat menampilkan pelaku, assignee, waktu diajukan, waktu sah/ditolak/dibatalkan, alasan bila ada, dan dampak poin. Waktu terakhir dibersihkan ditampilkan sebagai waktu terakhir penyelesaian sah yang belum dibatalkan (U), disertai waktu pengajuan bila berbeda. Kontribusi per anggota menampilkan jumlah penyelesaian sah dan poin diperoleh, terpisah dari saldo setelah penukaran. |
| F-12 | Must | Parent dapat membatalkan penyelesaian sah dengan alasan, memakai aturan koreksi U di bawah. Sistem menambahkan debit sebesar kredit asli, tanpa menghapus riwayat. Retry pembatalan tidak menambah debit. Poin dan jadwal berubah sebagai satu hasil konsisten; kegagalan tidak boleh menyisakan perubahan sebagian. |
| F-13 | Must | Parent membuat/mengubah/menonaktifkan reward dengan nama dan biaya bilangan bulat >0. Member melihat reward aktif dan saldo sendiri. Biaya reward yang sudah diminta tidak berubah akibat edit katalog (U). |
| F-14 | Must | Member mengajukan reward aktif jika saldo saat itu mencukupi biaya. Satu klik/retry menghasilkan satu permintaan dengan biaya tercatat. Satu Member hanya boleh memiliki satu permintaan pending untuk reward yang sama (U). Permintaan berbeda diperbolehkan, tetapi tidak memesan saldo. |
| F-15 | Must | Parent menyetujui/menolak permintaan pending; penolakan menyimpan alasan tanpa debit. Persetujuan memeriksa saldo terkini dan mendebit biaya tercatat tepat sekali. Saldo tidak cukup: persetujuan gagal dengan alasan, permintaan tetap pending. Dua persetujuan bersamaan tidak boleh membelanjakan poin yang sama. |
| F-16 | Must | Member melihat saldo, transaksi poin dan status permintaan sendiri; Parent melihat seluruh keluarga. Reward yang disetujui berarti poin telah dibelanjakan; UI menyatakan pemenuhan dilakukan manual. Reward nonaktif tidak bisa diminta atau disetujui; pending tetap bisa ditolak (U). |
| F-17 | Must | Menonaktifkan Member ditolak jika ia masih memiliki tugas aktif, pengajuan tugas pending, atau reward pending; Parent diberi daftar yang perlu dialihkan/diselesaikan lebih dulu (U). Penonaktifan tidak menghapus riwayat. |

## Aturan detail dan edge cases — usulan U

### Waktu, interval, dan perubahan tugas
- Keluarga memilih satu zona waktu saat setup. Perubahan zona waktu setelah setup ditunda untuk MVP; UI selalu menunjukkan zona waktu keluarga.
- Tenggat awal dipilih Parent sebagai tanggal dan jam lokal keluarga; interval berarti tambahan sejumlah hari pada jam lokal yang sama. Aturan perpindahan waktu musiman harus diuji bila zona waktu tersebut dipakai.
- Contoh: tenggat 1 Desember 09.00, interval 7 hari; diajukan 2 Desember 10.00 dan disetujui 3 Desember 08.00 → tenggat berikutnya 10 Desember 08.00. Sebelum persetujuan tetap overdue, tanpa poin.
- Tugas dapat diselesaikan sebelum tenggat. Pekerjaan berulang berikutnya tetap dihitung dari waktu sah, sehingga penyelesaian dini memajukan jadwal.
- Waktu pengajuan dicatat terpisah untuk menunjukkan kapan Member melaporkan pekerjaan; waktu sah menjadi acuan interval sesuai keputusan pengguna.
- Nilai poin, assignee, interval dan kebutuhan verifikasi diambil dari aturan pekerjaan saat diajukan; tidak berubah selama pending. Perubahan selanjutnya hanya berlaku pada pekerjaan yang belum diajukan.
- Pengarsipan tugas menghentikan pekerjaan mendatang; riwayat dan poin sah tetap ada. Tidak ada hapus permanen melalui UI MVP.
- Parent juga dapat memiliki tugas; tugas milik Parent mengikuti aturan yang sama, dan Parent boleh memverifikasinya sendiri untuk pilot keluarga berbasis kepercayaan. Ini perlu konfirmasi pengguna.

### Pembatalan dan koreksi poin
- Member tidak dapat membuka ulang penyelesaian sah. Parent membatalkan dengan alasan.
- MVP hanya membatalkan penyelesaian sah terbaru suatu tugas, jika pekerjaan berulang berikutnya belum diajukan atau diselesaikan. Jika syarat tidak terpenuhi, pembatalan ditolak dengan penjelasan. Koreksi historis bebas ditunda agar rantai interval tidak ambigu.
- Pembatalan menghapus pekerjaan berikutnya yang masih belum diajukan dan membuka kembali pekerjaan asal dengan tenggat aslinya; akibatnya dapat langsung overdue. Waktu terakhir sah kembali ke penyelesaian sebelumnya, atau “belum pernah”. Tindakan dan jejak pekerjaan berikutnya tetap terlacak dalam riwayat.
- Debit pembatalan sebesar kredit asli, meskipun poin tugas kemudian berubah. Pengajuan sah baru setelah pembatalan memberi kredit baru tepat sekali.
- Jika poin terlanjur ditukar, koreksi **boleh membuat saldo negatif**, ditampilkan jelas; permintaan/persetujuan reward baru ditolak sampai saldo cukup. Ini menjaga jejak koreksi tanpa membatalkan reward yang sudah dipenuhi di luar aplikasi.
- Tidak ada edit saldo manual atau pembatalan reward yang sudah disetujui di MVP. Parent harus mengonfirmasi persetujuan dan biaya sebelum keputusan final. Bila refund menjadi kebutuhan wajib, scope perlu direvisi.

### Reward, konkurensi, dan kegagalan
- Pending tidak menahan saldo; UI menjelaskan saldo diperiksa lagi saat Parent menyetujui. Contoh: saldo 100, dua permintaan masing-masing 80; hanya satu dapat disetujui sebelum ada pemasukan baru.
- Edit biaya katalog tidak mengubah biaya permintaan yang sudah diajukan. Menonaktifkan reward mencegah persetujuan pending agar Parent tidak menyetujui reward yang sudah tidak tersedia.
- Persetujuan, penolakan, pembatalan, dan pengajuan yang bersaing hanya boleh menghasilkan satu transisi sah. Permintaan dengan status usang diberi hasil terkini tanpa transaksi ganda.
- Saat jaringan terputus setelah aksi dikirim, UI menyediakan cara memeriksa hasil/retry yang aman. Mengklik dua kali, retry, muat ulang, dan dua tab tidak boleh menggandakan poin atau pengurangan saldo.
- Sistem tidak membuktikan kebersihan secara objektif; pencatatan dan verifikasi keluarga menjadi sumber kepercayaan. Foto bukti tidak masuk MVP.

## Non-functional requirements dan acceptance criteria

| ID | Kriteria terukur / bukti yang diperlukan |
| --- | --- |
| N-01 Keamanan | Semua aksi terlindungi memeriksa identitas, peran, keluarga, dan kepemilikan. Uji akses lintas dua keluarga untuk Member dan Parent, termasuk akses langsung ke identitas data yang diketahui. Tidak ada kredensial anak atau sesi dalam URL/log yang dapat dibaca pengguna lain. |
| N-02 Privasi | Hanya data minimum: identitas tampilan, peran, akses, tugas, aktivitas, poin, reward. Tidak mewajibkan tanggal lahir, foto, alamat rumah, atau email anak. Prosedur penghapusan data keluarga dan retensi backup harus diputuskan sebelum release readiness; log tidak memuat rahasia. |
| N-03 Integritas | Uji double-click, retry, dua tab dan keputusan bersamaan untuk F-07/08/12/14/15. Saldo sama dengan jumlah seluruh kredit/debit tercatat; tidak ada catatan historis yang diam-diam diubah. |
| N-04 Penggunaan | Seluruh alur Must berbahasa Indonesia dan dapat dipakai pada lebar 360px serta 1280px tanpa scroll horizontal. Kontrol memiliki label, dapat dipakai dengan keyboard, fokus terlihat, status tidak hanya dibedakan dengan warna; kontras teks normal minimal 4,5:1. Buktikan dengan review browser dan pemeriksaan aksesibilitas. |
| N-05 Kinerja U | Untuk pilot ≤10 anggota, ≤100 tugas aktif, dan ≤10.000 aktivitas, daftar tugas serta riwayat halaman pertama dapat digunakan dalam ≤3 detik pada sekurangnya 19 dari 20 pengukuran, di lingkungan dan profil jaringan yang dicatat saat QA. Target ini belum hasil ukur atau pilihan hosting. |
| N-06 Kegagalan | Setiap alur Must mempunyai keadaan loading, sukses, kosong bila relevan, akses ditolak dan gagal/retry yang dapat dipahami. Setelah gangguan, data yang sudah dikonfirmasi tersimpan tetap ada saat sesi baru dibuka. |
| N-07 Operasional | Sebelum release readiness, dokumentasikan estimasi biaya pilot, konfigurasi lingkungan, pemulihan akses, backup/restore dan uji pemulihan, rollback, serta batas retensi. Anggaran maksimum dan target waktu pemulihan dikonfirmasi pada architecture sebelum memilih solusi. |
| N-08 Pengujian | Skenario acceptance ditelusurkan ke ID F/N, termasuk isolasi keluarga dan integritas poin. Bukti QA mencatat perintah, lingkungan, hasil aktual dan keterbatasan. Tidak ada klaim lulus sebelum pengujian dijalankan. |

## Non-goals MVP

Pendaftaran publik banyak keluarga, bergabung ke banyak keluarga, perangkat bersama, offline/sinkronisasi offline, native mobile, jadwal kalender tetap, pengambilan tugas bebas, banyak assignee, penilaian otomatis, foto bukti, notifikasi eksternal, leaderboard, stok reward, pembayaran, pemenuhan otomatis, refund reward, koreksi sejarah bebas, dan integrasi pihak ketiga.

Tidak memilih framework, backend, database, penyedia cloud, atau mekanisme autentikasi pada discovery.

## Risiko, asumsi, dan keputusan terbuka

| ID | Status | Risiko/keputusan dan tindak lanjut |
| --- | --- | --- |
| U-01 | Belum dikonfirmasi | Paket reward D1 vs alternatif lebih kecil; rekomendasi mempertahankan katalog+permintaan+keputusan. |
| U-02 | Belum dikonfirmasi | Pembatalan terbatas, saldo negatif akibat koreksi, tanpa refund reward; perlu persetujuan karena memengaruhi ekspektasi keluarga. |
| U-03 | Belum dikonfirmasi | Pending tidak memesan saldo, biaya tersimpan, satu pending per reward/Member, tanpa pembatalan mandiri oleh Member. Parent dapat menolak atas permintaan Member. |
| U-04 | Belum dikonfirmasi | Detail zona waktu, tenggat, penyelesaian dini, perubahan/arsip tugas, penonaktifan anggota, dan verifikasi diri Parent seperti di atas. |
| U-05 | Belum dikonfirmasi | Target pilot, kinerja, batas volume, serta metrik keberhasilan adalah usulan, belum data empiris. |
| A-01 | Ditunda ke architecture | Evaluasi akses anak yang sederhana dan aman, pemulihan, batas percobaan, akses Parent, serta pembentukan keluarga pilot; tidak mengandalkan pilihan profil saja sebagai autentikasi. |
| A-02 | Ditunda ke architecture | Tetapkan plafon biaya dan tujuan pemulihan; evaluasi kebutuhan teknis berdasarkan F/N yang disetujui, bukan pertumbuhan hipotetis. |
| R-01 | Risiko produk | Persetujuan Parent yang terlambat menggeser interval meski pekerjaan fisik lebih awal; tampilkan kedua waktu dan ukur beban verifikasi saat pilot. |
| R-02 | Risiko motivasi | Poin dapat memicu kompetisi atau pencatatan palsu; gunakan transparansi riwayat dan verifikasi opsional, evaluasi lewat wawancara pilot. |
| R-03 | Risiko scope | Reward dan koreksi menambah pengujian konsistensi; kurangi fitur pendukung sebelum mengurangi integritas, keamanan, atau riwayat. |

## Approval produk eksplisit

- Revisi yang diminta direview: **D1**.
- Reviewer: pengguna/pemilik produk dalam percakapan ini.
- Keputusan: **belum diberikan**; tanggal persetujuan: belum ada.
- Pengguna dapat meminta revisi atau menyetujui D1 beserta U-01 sampai U-05 secara eksplisit. Komentar/feedback tidak dihitung sebagai approval.
- Setelah scope disetujui, lanjut ke UX prototype HTML, review browser, dan approval UX terpisah. Lavish AXI hanya dipasang dengan izin; gunakan fallback review browser manual bila tidak tersedia/tidak dipilih. Architecture memerlukan approval tersendiri sesudah UX; release readiness dan deployment produksi juga dibedakan.
