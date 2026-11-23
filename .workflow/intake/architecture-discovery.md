# Architecture discovery — awal, belum approved

Tanggal sesi: 23 November 2026 (Asia/Jakarta).
Otorisasi: pengguna secara eksplisit mengizinkan memulai Architecture, hanya discovery; meminta analisis alternatif dan maksimal lima pertanyaan, lalu berhenti. Tidak mengizinkan desain final, implementasi, migration atau deployment pada langkah ini.

## Baseline dan batas

- PRODUCT D2: docs/PRODUCT.md; approval docs/PRODUCT-D2-APPROVAL.md.
- UX R3: docs/ux/prototype/index.html; approval docs/ux/approval.md.
- SHA-256 HTML dihitung ulang dan cocok manifest: 512aa9f01784a0a7fb0b69e458abaa892740d73acbbc887725c9ed9ddcb1328b.
- Discovery/UX completed. Architecture in_progress bukan approval keputusan.
- Tidak ada konflik requirement yang ditemukan dalam arah awal ini. Perubahan baseline memerlukan change control.

## Evaluasi awal

- Fakta D2: pilot satu keluarga; <=10 anggota, <=100 tugas aktif, <=10.000 aktivitas; online, perangkat pribadi, UI Indonesia responsif. N-05 menargetkan <=3 detik pada 19/20 pengukuran, belum hasil ukur.
- Belum ada angka trafik atau konkurensi aktual. Dugaan kerja: volume kecil dan interaksi sesekali, tetapi dua tab/retry/keputusan bersamaan tetap wajib aman.
- Risiko utama: kredit/debit ganda, pembelanjaan poin bersamaan, koreksi beradu dengan pengajuan berikutnya, perubahan data sejak pratinjau, dan kebocoran antaranggota/keluarga.
- Pending tidak memberi kredit atau occurrence berikutnya; biaya reward disimpan saat permintaan; saldo negatif karena koreksi diperbolehkan. Saldo dan jadwal harus berubah atomik sesuai D2.
- Waktu server menjadi acuan; tambahan hari mengikuti jam lokal zona keluarga, bukan selalu kelipatan 24 jam.
- Prototype localStorage/simulasi bukan mekanisme keamanan atau jaminan transaksi produksi. Interaksi R3 tetap baseline.

## Alternatif dan arah sementara

Semua rekomendasi berikut adalah hipotesis untuk dibahas, bukan keputusan final/approved.

1. Bentuk aplikasi: full-stack satu deploy vs frontend/API terpisah. Arah awal satu aplikasi dengan komponen interaktif untuk R3; lebih sedikit komponen operasional. Browser-only tidak memenuhi akses lintas perangkat dan otorisasi tepercaya.
2. Penyimpanan: SQL embedded pada satu server persisten vs SQL client/server vs document store dengan transaksi. Embedded mengurangi layanan, tetapi satu writer dan backup/volume terikat server; client/server menambah biaya/operasi namun memberi fleksibilitas transaksi/deploy; document store perlu pembuktian invariant lintas dokumen. Arah awal SQL, produk belum dipilih.
3. Konkurensi: transaksi dengan locking terarah vs optimistic version checks dengan retry. Keduanya perlu constraint unik dan identitas aksi untuk retry aman. Arah awal transaksi singkat dengan locking terarah; evaluasi sesuai database, termasuk deadlock/retry. Ledger kredit/debit menjadi sumber rekonsiliasi; bukan event sourcing seluruh aplikasi.
4. A-01 Parent: password dengan library auth matang dan recovery email vs tautan email sekali pakai. Pertama perlu pengelolaan password/reset, kedua bergantung pengiriman email setiap login. Pilih setelah preferensi/recovery dikonfirmasi; jangan merancang kriptografi sendiri.
5. A-01 anak/pilot: username unik dan passphrase yang direset Parent vs pairing sekali pakai dari Parent ke perangkat anak. Pertama lebih mudah lintas perangkat; kedua mengurangi pengetikan tetapi menambah lifecycle/revocation/re-pair. Arah awal passphrase, provisioning keluarga terbatas oleh operator dan akses anak dibuat Parent. Profil saja atau kode keluarga bersama tidak memenuhi identitas individual.
6. Isolasi: shared tables dengan family_id, otorisasi server dan constraint konsisten vs database terpisah per keluarga. Pertama biaya/operasi lebih kecil namun memerlukan disiplin serta uji lintas dua keluarga; kedua menambah backup/migration/provisioning. Arah awal shared tables; pertimbangkan row-level security sebagai lapisan tambahan bila database mendukung dan kompleksitasnya layak.
7. A-02/N-07 operasi: satu server persisten dengan backup terpisah vs aplikasi/database managed. Pertama potensi tagihan layanan rendah dengan tanggung jawab patching/monitoring/restore lebih besar; kedua mengurangi sebagian operasi dengan biaya berulang serta ketergantungan penyedia. RPO 24 jam/RTO 24 jam dan RPO 1 jam/RTO 4 jam hanya contoh alternatif untuk dijawab, bukan target yang disetujui. Harga/provider belum dipilih atau diestimasi nominal.
8. N-02: hapus data aktif atas permintaan Parent terverifikasi dengan backup kedaluwarsa terbatas vs jendela penundaan penghapusan yang dinyatakan jelas. Pertama meminimalkan retensi, kedua memberi kesempatan membatalkan namun menambah state dan penyimpanan. Arah awal prosedur operator terverifikasi, retensi backup terbatas, tanpa UI tambahan; restore wajib menerapkan ulang penghapusan agar data tidak muncul kembali. Usulan awal backup 7–30 hari dan log teknis tanpa rahasia 7–14 hari belum disetujui.

## Pertanyaan prioritas untuk pengguna

1. Plafon biaya bulanan dan biaya awal, termasuk aplikasi, database, backup, email dan domain?
2. Kehilangan data maksimum (RPO) dan waktu pemulihan maksimum (RTO) yang dapat diterima?
3. Preferensi login/recovery Parent dan akses anak: password atau email link untuk Parent; passphrase atau pairing untuk anak; apakah email Parent dan provisioning pilot oleh operator tersedia?
4. Kebijakan penghapusan, retensi backup/log, dan batas lokasi penyimpanan data anak; apakah usulan rentang retensi dapat diterima?
5. Siapa operator/maintainer, pengalaman bahasa/framework/hosting yang tersedia, dan kapasitas melakukan patching/backup/restore dibanding membayar layanan managed?

## Referensi teknis yang diperiksa

- SQLite, Appropriate Uses: https://www.sqlite.org/whentouse.html
- PostgreSQL, Explicit Locking: https://www.postgresql.org/docs/current/explicit-locking.html
- PostgreSQL, Transaction Isolation: https://www.postgresql.org/docs/current/transaction-iso.html
- OWASP, Authentication: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
- OWASP, Session Management: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html

Referensi dipakai menilai mekanisme, bukan menetapkan produk database/framework. Validasi requirement dan integritas baseline bukan bukti QA aplikasi. Tidak ada kebutuhan yang membenarkan microservices, broker, Kubernetes, cache terdistribusi atau layanan realtime terpisah pada discovery awal ini.

## Pendalaman setelah jawaban pengguna — belum menjadi desain A1

Keputusan/preferensi pengguna dicatat terpisah di architecture-user-decisions.md. Bagian ini adalah analisis dan rekomendasi agen; semuanya masih provisional. Architecture tetap in_progress, tanpa approval arsitektur atau transisi lanjutan.

### A-01: autentikasi dan recovery

- Google OIDC cocok dengan preferensi pengguna: mengurangi pengelolaan password Parent dan email login/reset oleh aplikasi. Ketergantungan berpindah ke Google, konfigurasi OAuth, dan kemampuan memulihkan akun Google. Akun Google yang berhasil login belum otomatis berhak menjadi Parent; provisioning/undangan lokal tetap wajib.
- Password memberi kendali independen atas kredensial, tetapi membutuhkan hashing, pembatasan percobaan, recovery serta pengiriman email. Magic link menghilangkan password Parent, tetapi bergantung pada pengiriman email setiap login dan pengamanan tautan sekali pakai. Keduanya tidak dipilih hanya sebagai fallback tanpa kebutuhan yang disetujui.
- Kandidat Google: library OIDC matang, alur authorization code dengan PKCE S256, state dan nonce; validasi signature, issuer, audience, expiry dan nonce. Identitas permanen adalah pasangan issuer/sub yang dinormalisasi, bukan email. Scope minimal openid/email; jangan mengambil foto, tanggal lahir, Drive atau Gmail. Jangan menyimpan refresh token Google jika tidak perlu mengakses API Google.
- Gunakan sesi aplikasi opaque yang dapat dicabut di server; cookie Secure/HttpOnly/SameSite yang sesuai callback; rotasi setelah login/recovery, idle/absolute expiry, CSRF untuk mutasi dan pemeriksaan keaktifan akun/peran pada setiap aksi. Logout aplikasi berbeda dari logout Google; pencabutan akses Google tidak boleh diasumsikan langsung mematikan semua sesi lokal tanpa mekanisme tambahan.
- Anak tetap akses lokal, passphrase di-hash dengan library matang (kandidat Argon2id), username unik dengan namespace login jelas, rate limiting, error generik, reset hanya oleh Parent berwenang dan pencabutan sesi setelah reset/nonaktif. Operator tidak menyimpan passphrase plaintext.
- Jika satu-satunya Parent kehilangan akun Google: Google recovery saja dapat menyebabkan lockout berkepanjangan. Alternatif: Parent kedua yang sudah berwenang; atau recovery code acak kuat sekali pakai disimpan offline dengan verifikasi operator untuk mengikat akun Google baru. Recovery berdasarkan nama/email saja atau bypass operator tanpa bukti ditolak. Metode dan jangka sesi belum dikunci.
- Google auth termasuk evaluasi metode akses yang memang ditunda di A-01 dan coverage UX, bukan penambahan integrasi bisnis. Prototype tetap tidak diubah. Bila layar login baru memerlukan perubahan artefak approved, gunakan change control dan approval UX terpisah.
- Domain/consent/branding dan pengecualian personal-use perlu diperiksa sebelum rencana domain gratis dijanjikan. Tidak menyiapkan OAuth client atau mempublikasikan privacy page pada tahap ini.

### Integritas: invariant dan alternatif mekanisme

- Satu transaksi untuk validasi akhir, conditional state transition, ledger dan perubahan occurrence. Status pending hanya dapat diputuskan bila masih pending. Persetujuan reward mengecek reward aktif, biaya permintaan tersimpan dan saldo terbaru; saldo kurang tidak mengubah pending atau membuat debit.
- Idempotency key dicakup keluarga, pelaku dan jenis aksi; payload fingerprint mencegah key yang sama dipakai untuk maksud berbeda. Simpan identitas hasil bersama transaksi bisnis agar respons hilang setelah commit dapat ditemukan lewat retry. Otorisasi diperiksa ulang pada retry. Replay merujuk aksi/pengajuan lama, bukan otomatis membuat aksi baru setelah ditolak/dibatalkan; pengajuan ulang sengaja memakai aksi baru.
- Key dari klien saja tidak cukup untuk dua tab yang menghasilkan key berbeda. Tambahkan unique constraint pending per occurrence, pending reward per keluarga/Member/reward, efek ledger per sumber aksi, dan successor per peristiwa penyelesaian. Status usang mengembalikan hasil terkini tanpa efek ulang.
- Jangan membuat constraint satu kredit selamanya per occurrence: D2 mengizinkan pengajuan sah baru setelah pembatalan. Kredit unik per penyelesaian/pengajuan sah, satu debit pembalik per kredit asli, dan maksimal satu penyelesaian efektif per occurrence. Successor ditautkan ke generasi/peristiwa penyelesaian agar pembatalan dan penyelesaian ulang tidak merusak histori.
- Saldo berasal dari jumlah ledger kredit/debit, kontribusi terpisah dari saldo penukaran. Kandidat pilot: hitung dari ledger di bawah lock akun yang sama untuk semua mutasi saldo; alternatif saldo tersimpan yang diperbarui atomik dan direkonsiliasi. Jangan memaksakan constraint saldo >=0 karena koreksi boleh negatif; guard saldo cukup berlaku pada permintaan/persetujuan reward.
- PostgreSQL: lock entitas stabil seperti akun poin dan tugas, bukan hanya row permintaan reward yang berbeda. Setiap operasi relevan memakai protokol lock dan urutan konsisten; conditional update/unique constraints melengkapi locking. Alternatif serializable transactions membutuhkan retry seluruh transaksi pada serialization failure. Deadlock ditangani dengan retry terbatas memakai identitas aksi semula.
- SQLite: transaksi tulis singkat BEGIN IMMEDIATE pada file persisten lokal menserialkan writer; atur busy timeout/retry terbatas. Ini cukup potensial untuk pilot, bukan kegagalan integritas inheren SQLite. Jangan memakai asumsi row lock PostgreSQL untuk SQLite. Foreign key enforcement harus aktif pada setiap koneksi.
- Koreksi dan pengajuan occurrence berikutnya memakai penguncian tugas/protokol yang sama, sehingga hanya hasil yang sesuai urutan sah yang commit. Pratinjau dibandingkan dengan versi data terkini; jika dampak berubah, tidak menerapkan aksi sebelum Parent meninjau dan mengonfirmasi ulang. Persetujuan reward R3 juga mempertahankan guard keputusan usang.
- Recurrence hanya dibuat pada penyelesaian sah, bukan selama pending atau oleh scheduler harian. Waktu diajukan/keputusan terpisah; perhitungan hari lokal memakai zona keluarga. Rollback mengembalikan seluruh mutasi saat ada kegagalan.
- Rencana bukti (belum dijalankan): dua request saldo100/biaya80, approve-vs-reject, correction-vs-next-submit, reward-disable-vs-approve, retry setelah respons hilang, key berbeda dua tab, recomplete setelah koreksi dan injeksi gagal antara ledger/occurrence. Verifikasi tidak ada commit parsial dan jumlah ledger cocok.

### Isolasi keluarga

- Arah awal shared tables dengan family_id, scope berasal dari sesi/membership tepercaya; jangan mempercayai family_id kiriman klien. Composite foreign keys mengikat seluruh relasi lintas entitas ke keluarga yang sama. Otorisasi Member juga memeriksa ownership, bukan hanya keluarga.
- PostgreSQL RLS merupakan lapisan tambahan; bukan pengganti otorisasi. Role owner/superuser/BYPASSRLS dapat melewatinya. Bila dipakai, role runtime harus sesuai, konteks tenant transaction-local untuk mencegah bocor saat pooling, dan backup memakai hak yang mencakup seluruh keluarga. SQLite tidak menyediakan RLS setara; pembatasan terpusat pada akses data aplikasi dan constraint perlu diverifikasi.
- Uji dua keluarga walau pilot satu: Parent A vs semua data B, Member A vs B dan anggota A lain, read/detail/list/count/mutation/history, ID diketahui, payload relasi campuran, session revoked, idempotency key sama lintas tenant dan pergantian konteks pada koneksi pool. Pastikan penolakan tanpa bocor nama/saldo/count dan tanpa mutasi.

### Penghapusan, backup dan restore

- Penghapusan seluruh keluarga terverifikasi berbeda dari pengarsipan bisnis. Selama keluarga aktif, histori dan ledger dipertahankan; tidak menghapus debit/kredit individual untuk menutupi koreksi. Penghapusan keluarga menghapus seluruh data terkait termasuk kredensial/sesi/identitas OAuth dan catatan idempotency yang memuat data, sesuai prosedur privasi.
- Setelah verifikasi permintaan: blok akses/tulisan keluarga, cabut sesi, hapus data aktif secara konsisten, catat bukti minimal penyelesaian. Salinan backup immutable tidak diedit satu per satu; berakhir sesuai retensi yang diumumkan. Hapus file backup sementara dan salinan uji restore juga.
- Simpan register penghapusan minimal terpisah (ID keluarga acak, waktu/cakupan, bukan isi keluarga) dengan retensi terbatas setidaknya sampai semua backup lama kedaluwarsa. Register juga harus tahan pemulihan; jangan hanya mengandalkan database yang sedang direstore. Terapkan ulang penghapusan sebelum database hasil restore dapat diakses. Periode/penyimpanan register belum final.
- RPO24h: backup tepat setiap24h memenuhi hanya jika snapshot, upload dan pemulihan selalu berhasil tepat waktu. Satu kegagalan atau durasi upload dapat melampaui batas. Rekomendasi provisional: snapshot konsisten tiap12h, retry/alert, pantau waktu snapshot backup terakhir yang benar-benar tersedia di luar host; tangani sebelum usia24h. Ini rekomendasi frekuensi baru, bukan keputusan pengguna.
- Usulan durasi tepat: backup14hari, log teknis7hari. Snapshot terenkripsi di lokasi terpisah dari compute/volume, private dan least privilege; kunci pemulihan tersedia di luar host. Nilai kapasitas dihitung dari ukuran snapshot terkompres aktual x jumlah snapshot, bukan asumsi 10.000 aktivitas pasti muat free tier.
- SQLite: gunakan Online Backup API atau snapshot konsisten yang didukung; jangan menyalin file database aktif sambil mengabaikan WAL. PostgreSQL: logical dump seluruh database sesuai ukuran pilot, snapshot konsisten; versi tool, role/extensions/config dan keterbatasan dump harus diperhitungkan. Backup provider/PITR bukan otomatis retensi7–30hari atau backup independen akun/provider.
- Uji restore yang diusulkan: sebelum pilot, bulanan selama pilot, serta setelah perubahan backup signifikan. Restore ke lingkungan terisolasi, verifikasi checksum/integritas/FK, ledger/saldo, pending unik, rantai occurrence, snapshot biaya/histori dan daftar penghapusan; nonaktifkan sesi lama dan uji login ulang/otorisasi. Catat snapshot timestamp, insiden/deteksi, provisioning, restore, validasi dan cutover untuk membuktikan RPO/RTO.
- RTO24h juga mencakup respons manusia; satu developer yang tidak tersedia lebih dari24h tidak dapat menjamin target tanpa pengganti/runbook. Belum ada uji backup/restore atau bukti SLA yang dijalankan.
- Lokasi belum dibatasi: pilih region aplikasi/DB berdekatan untuk latensi dan dokumentasikan lokasi backup/log, akses subprocessor serta kontrol akun. Enkripsi transit/at-rest tidak mencegah operator provider dengan akses sah; app-side encryption backup mengurangi paparan salinan. Google menerima konteks login Parent, tidak perlu menerima tugas/ledger atau kredensial anak. Ini analisis teknis, bukan klaim kepatuhan hukum.

### SQLite/PostgreSQL dan kelayakan anggaran

Harga sumber resmi diperiksa pada sesi ini. Kurs Rp18.000/USD di bawah adalah asumsi perencanaan, bukan kurs pasar terverifikasi. Estimasi belum termasuk pajak, spread kartu, kelebihan pemakaian, biaya job backup dan domain berbayar. Tidak ada layanan dibeli/deploy.

| Skenario kandidat | Perhitungan dasar | Risiko/konsekuensi |
| --- | --- | --- |
| Node paid Render + SQLite disk1GB | $7 + $0.25 = $7.25, sekitar Rp130.500/bulan | Satu instance, volume persisten, backup terpisah tetap perlu; ruang anggaran setelah pajak/biaya sangat tipis. |
| Node paid Render + Neon Free PostgreSQL | $7 + $0 = sekitar Rp126.000/bulan | Mengurangi pengelolaan DB; quota/free tier, cold start DB, koneksi dan backup independen harus dipantau. |
| Railway Node + Neon Free atau SQLite volume | Hobby minimum $5 (sekitar Rp90.000), kemudian pemakaian di atas kredit ditagih; bukan paket flat $5 | Memiliki ruang awal lebih besar, tetapi CPU/RAM/volume/egress/jobs dihitung bersama; anggaran perlu pengukuran dan kontrol. |
| Render Node + PostgreSQL paid | Minimal $7+$6=$13, sekitar Rp234.000 sebelum storage/backup/pajak | Melebihi target; tidak dipilih tanpa keputusan anggaran baru. |
| Render free Node + Neon Free | Infrastruktur utama dapat $0 dalam kuota, tetapi cold start app sekitar1menit, disk app ephemeral | Bukan rekomendasi untuk pilot D2; target N-05 tidak boleh dilonggarkan diam-diam atau dites hanya setelah warm-up. Render Free Postgres juga kedaluwarsa30hari. |

- PostgreSQL managed/free merupakan kandidat utama bersyarat untuk satu developer Node: transaksi/constraint/RLS tersedia tanpa mengurus proses DB sendiri. SQLite tetap layak secara kapasitas dan konsistensi untuk satu instance; tidak perlu menolaknya karena ada dua tab. Kesederhanaan SQL embedded dibayar dengan ketergantungan persistent disk, backup dan topologi satu writer.
- Halaman Neon pricing yang diperiksa mencantumkan Free100CU-hours/bulan dan1GB storage/proyek; dokumentasi lama yang terindeks masih menyebut0.5GB. Gunakan entitlement console terkini saat pemilihan, jangan mengandalkan angka lama. Free instant-restore window sekitar6jam bukan pengganti backup independen7–30hari. Free quota tidak sama dengan SLA/ketersediaan berbayar.
- Polling idle yang menjaga DB terus aktif dapat menghabiskan kuota compute; jangan menyalin timer1detik prototype sebagai polling global produksi. Perilaku pembaruan/guard R3 tetap wajib dipertahankan dengan mekanisme yang nanti dievaluasi.
- Kandidat backup R2 Standard: free10GB-month beserta kuota operasi; biaya scheduler/egress sumber/enkripsi tetap diperhitungkan. Tidak menyimpulkan semua backup pasti gratis. Provider subdomain dapat menghindari pembelian domain jika konfigurasi Google personal-pilot mengizinkan; kebutuhan verifikasi domain/branding harus dinilai, bukan diasumsikan.
- Rekomendasi belum final: shortlist satu aplikasi Node dengan managed PostgreSQL free, backup independen dan host app berbiaya rendah. Bandingkan dengan SQLite single-instance jika kuota/free-tier/dependensi dua penyedia tidak diterima. Usahakan base bill di bawah plafon agar ada cadangan; jangan menganggap $7 atau minimum $5 sebagai total all-in.
- Konflik bersyarat: free app cold start yang melampaui target N-05, penghentian layanan karena quota >24h, atau biaya paket penuh yang melewati anggaran tidak boleh disembunyikan dengan perubahan requirement. Alternatif tersebut tidak ditetapkan; laporkan dan minta keputusan sebelum memilih.

### Keputusan yang masih perlu dijawab

1. Apakah plafon Rp150.000 keras, dan apakah ketergantungan free-tier DB tanpa SLA dapat diterima? Jika quota/biaya mengancam RTO24h, perlu rencana biaya/fallback yang disetujui, bukan otomatis upgrade atau melonggarkan target.
2. Bila akun Google Parent hilang, pilih Parent kedua yang sudah berwenang, recovery code offline dengan verifikasi operator, atau hanya Google recovery (risiko lockout perlu diterima)?
3. Konfirmasi durasi tepat: usulan backup14hari dan log7hari di dalam rentang yang sudah diterima.
4. Apakah developer dapat menerima alert dan menangani insiden dalam24h, termasuk akhir pekan/cuti, atau tersedia pengganti?
5. Apakah ada domain yang sudah dimiliki untuk OAuth/privacy page; bila tidak, apakah subdomain platform cukup untuk pilot jika konfigurasi Google mengizinkan? Domain baru harus dimasukkan anggaran sebelum dipilih.

### Referensi tambahan

- Google OIDC: https://developers.google.com/identity/openid-connect/openid-connect
- Google brand verification: https://developers.google.com/identity/protocols/oauth2/production-readiness/brand-verification
- OWASP session management: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
- OWASP password storage: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
- SQLite transactions: https://www.sqlite.org/lang_transaction.html
- SQLite partial indexes: https://www.sqlite.org/partialindex.html
- SQLite foreign keys: https://www.sqlite.org/foreignkeys.html
- SQLite backups: https://www.sqlite.org/backup.html
- PostgreSQL constraints: https://www.postgresql.org/docs/current/ddl-constraints.html
- PostgreSQL row security: https://www.postgresql.org/docs/current/ddl-rowsecurity.html
- PostgreSQL locking: https://www.postgresql.org/docs/current/explicit-locking.html
- PostgreSQL dumps: https://www.postgresql.org/docs/current/app-pgdump.html
- Render pricing: https://render.com/pricing
- Render managed PostgreSQL pricing: https://render.com/articles/managed-postgresql-pricing-2026
- Render free limitations: https://render.com/docs/free
- Railway pricing: https://docs.railway.com/pricing
- Railway cost controls: https://docs.railway.com/pricing/cost-control
- Neon pricing: https://neon.com/pricing
- Neon restore: https://neon.com/blog/practical-guide-to-database-branching
- R2 pricing: https://developers.cloudflare.com/r2/pricing/

STOP: tunggu jawaban. Tidak membuat Architecture Draft A1, ADR final, implementation, migration, deployment atau perubahan baseline/approval.

## Kesiapan A1 setelah lima keputusan terakhir pengguna

Status terbaru: kelima pertanyaan putaran sebelumnya telah dijawab. Sumber keputusan pengguna adalah architecture-user-decisions.md. Bagian ini hanya evaluasi/mitigasi agen, bukan desain A1, approval ADR, penerimaan risiko oleh pengguna atau perubahan baseline. Architecture tetap in_progress.

### Kesesuaian baseline dan keputusan

- Target biaya Rp150.000/bulan bukan persetujuan overrun. Estimasi total harus memasukkan pajak, biaya pembayaran, backup/job/transfer, domain bila diperlukan dan cadangan pemakaian. Estimasi melampaui target wajib diajukan, tanpa membeli/mengaktifkan opsi berbayar terlebih dahulu. Harga kandidat pada bagian sebelumnya tetap data penelitian, bukan quotation baru atau pilihan final.
- Google OIDC Parent dan recovery code offline + verifikasi operator konsisten dengan ruang keputusan A-01. Username/passphrase anak, provisioning operator dan isolasi keluarga tetap berlaku. Tidak perlu mengubah D2 untuk sekadar mengevaluasi mekanisme yang sebelumnya terbuka. Perubahan UI approved tetap harus mengikuti change control.
- Retensi backup14hari/log7hari ditetapkan pengguna dan sesuai N-02/N-07. Arah agen: terapkan juga pada salinan sementara dan uji restore; catat pengecualian retention provider sebelum memilih. Register penghapusan minimal terpisah tetap diperlukan sampai semua backup yang mungkin berisi keluarga tersebut kedaluwarsa; backup baru tidak boleh memperpanjang umur salinan data yang seharusnya sudah dihapus.
- Subdomain platform adalah prioritas bersyarat, bukan jaminan memenuhi semua skenario consent/branding Google. Jika tidak memenuhi kebutuhan OAuth pilot, ajukan alternatif domain dan biaya total sebelum memilih; jangan mengubah preferensi menjadi pembelian otomatis.
- Tidak ada perubahan requirement yang diterapkan. Risiko ketidakmampuan mencapai target dan ambiguitas di bawah tetap terbuka; bukan dinyatakan resolved melalui jawaban pengguna.

### Risiko dan mitigasi yang belum merupakan keputusan pengguna

| ID | Target/risiko | Evaluasi dan mitigasi agen | Status/penerimaan yang diperlukan |
| --- | --- | --- | --- |
| AR-01 | RTO24h vs satu developer best effort tanpa pengganti | Target24h tetap berlaku sebagai tujuan pemulihan, bukan SLA. Restore teknis dapat disederhanakan lewat runbook, konfigurasi tersimpan aman, backup terpisah, alert dan latihan; namun tidak mengatasi developer tidak tersedia atau provider down berkepanjangan. Ukur deteksi, respons manusia, provisioning, restore, validasi dan cutover. | Belum ada bukti atau jaminan pencapaian24h. Bila tidak menambah pengganti/otomasi yang memadai, butuh penerimaan eksplisit risiko downtime >24h untuk pilot sebelum klaim kesiapan operasional. |
| AR-02 | RPO24h vs backup gagal/tidak terpantau | Rekomendasi agen tetap backup konsisten tiap12h, retry otomatis, off-host terenkripsi, alert umur snapshot terakhir dan pemantauan hasil job yang independen. Backup14hari hanya retensi, bukan frekuensi/RPO. Tentukan respons bila umur salinan mendekati24h; tanpa respons manusia/otomasi, risiko kehilangan >24h tetap ada. | Frekuensi12h belum merupakan keputusan pengguna. RPO belum terbukti sampai pengujian snapshot/restore dan penanganan kegagalan. Risiko residual tidak otomatis diterima. |
| AR-03 | N-05 <=3detik pada19/20 pengukuran vs free-tier | Izin mengevaluasi free-tier bukan izin gagal N-05. Hindari app cold start panjang yang sudah diketahui; DB scale-to-zero/latensi/kuota tetap perlu uji. Profil uji harus mewakili penggunaan pilot termasuk akses setelah idle, bukan hanya warm-up; ukuran data mengikuti D2. | Tidak ada hasil performa. Provider/plan hanya dapat dinyatakan memenuhi setelah bukti; bila gagal, cari alternatif sesuai target atau ajukan change control, bukan menerima diam-diam. |
| AR-04 | Anggaran vs fallback free-tier | Ukur penggunaan, tetapkan alert sebelum kuota/biaya habis, siapkan backup portabel dan runbook pemindahan. Cadangan biaya harus dihitung; fallback yang bergantung pada upgrade berbayar belum diizinkan. Hard spending stop dapat menyebabkan downtime >24h sehingga bukan solusi otomatis untuk RTO. | Provider, fallback, waktu pemindahan dan total biaya belum dipilih/terbukti. Estimasi >Rp150.000 diajukan terlebih dahulu. Free-tier tanpa SLA tidak menjamin RTO. |
| AR-05 | Recovery Parent vs operator yang juga tidak tersedia | Recovery code acak kuat, simpan hash saja, verifikasi operator melalui prosedur terdokumentasi, konsumsi sekali pakai secara atomik bersama pengikatan identitas baru, cabut sesi lama, audit minimal dan rotasi kode. Jangan menaruh kode asli di repo/log atau meminta pengguna mengirimnya dalam chat. | Mekanisme dipilih pengguna, detail verifikasi dan latihan masih perlu dirancang nanti. Jika kode hilang dan akses Google juga hilang, jangan menjanjikan bypass; pemulihan manual mengikuti bukti yang nantinya disepakati. |
| AR-06 | N-06 data dikonfirmasi tetap ada vs RPO24h pada kehilangan database | D2 N-06 menyatakan data yang sudah dikonfirmasi tersimpan tetap ada saat sesi baru dibuka. Restart/redeploy/pergantian sesi harus mempertahankan data committed. Pada kehilangan seluruh storage dan pemulihan snapshot, RPO24h dapat berarti kehilangan data committed sejak snapshot; cakupan disaster vs gangguan biasa belum dinyatakan eksplisit dalam D2. | Potensi ambiguitas requirement, bukan izin menghapus data. Minta klarifikasi cakupan; bila ingin mengecualikan disaster dari N-06, catat melalui change control yang disetujui. Alternatif memperkecil risiko kehilangan lewat penyimpanan durable/replikasi/backup lebih rapat tetap perlu evaluasi biaya dan bukan janji zero loss. |

### Ringkasan kesiapan dan titik berhenti

- Input bisnis/operasional utama untuk menyusun A1 sudah tersedia: anggaran dan batas otorisasi, Google/anak/recovery, retensi, kapasitas operator dan prioritas domain. Database/host/fallback tetap kandidat; framework belum dikunci. Tidak menambah infrastruktur kompleks untuk menutupi ketidakpastian.
- Kesiapan bersyarat untuk penyusunan draft setelah izin baru, dengan risiko eksplisit dan rencana verifikasi; belum siap approval arsitektur atau release. Penerimaan risiko bukan pengganti uji dan bukan kelulusan AC.
- Dua hal memerlukan jawaban eksplisit: (1) penerimaan risiko pilot bahwa respons best effort/operator tunggal bisa menyebabkan downtime >24h meski target tetap24h, atau permintaan mitigasi tambahan; (2) klarifikasi cakupan N-06 vs kehilangan data dalam disaster recovery dari snapshot (RPO24h). Tidak menganggap kelima keputusan terbaru sudah menerima dua hal ini.
- Belum membuat Draft A1, ADR final, kode aplikasi, migration atau deployment. Tidak menjalankan benchmark/restore dan tidak menandai hasilnya lulus. Tidak ada transisi workflow baru; tetap tunggu instruksi pengguna.

## Tindak lanjut dua risiko — titik resume terbaru

- Pengguna menerima eksplisit risiko downtime >24jam khusus pilot ketika operator tunggal tidak tersedia. Target RTO24jam tetap sasaran, bukan SLA, dengan kewajiban monitoring/alert/runbook/restore dan evaluasi ulang sebelum ekspansi. Sumber keputusan terpisah: architecture-user-decisions.md. AR-01 kini diterima hanya pada cakupan tersebut; belum ada hasil uji pemulihan atau penerimaan semua risiko operasional.
- Untuk AR-06, pengguna memberikan persetujuan prinsip pengecualian kehilangan permanen storage utama dengan RPO24jam. Approval final wording belum ada. Proposal change control docs/workflow/CR-N06-001.md P1 memuat wording N-06 asli, usulan minimal, AC turunan dan dampak UX/Architecture/QA.
- N-06 D2 asli tetap berlaku sampai perubahan disetujui dan diterapkan secara eksplisit. Tidak ada perubahan PRODUCT, approval evidence, UX R3 atau state. AR-02/AR-03/AR-04/AR-05 tetap memerlukan mitigasi/evaluasi/bukti sesuai cakupan masing-masing; tidak dianggap lolos oleh penerimaan risiko RTO.
- STOP pada review CR-N06-001 P1. Tunggu approval redaksi final N-06; jangan membuat Draft A1 atau implementation.

## CR-N06-001 P1 approved dan applied — titik resume terbaru

- Pengguna memberikan approval final redaksi P1 dan mengizinkan penerapan terkendali. Teks N-06 sama persis dengan P1 dan hanya cell N-06 pada PRODUCT yang diubah; baseline aktif PRODUCT D2 + CR-N06-001 P1. Evidence approval, tanggal dan sebelum/sesudah tersimpan di docs/workflow/CR-N06-001.md.
- Addendum docs/workflow/CR-N06-001-AC-ADDENDUM.md memperjelas gangguan biasa (seluruh committed tetap ada) vs kehilangan permanen storage untuk pilot (RPO <=24jam dari backup terakhir yang benar-benar tersedia dan terverifikasi). Bukan perubahan requirement lain atau hasil QA/restore.
- AR-06 ditangani melalui change control eksplisit, bukan interpretasi diam-diam. Bukti kemampuan pemulihan tetap perlu diperoleh kelak. Penerimaan risiko AR-01/operator tunggal tetap terpisah dengan target desain RTO24jam dan kewajiban mitigasi; performa, anggaran dan integritas tidak dilonggarkan.
- Approval PRODUCT D2 historis, UX R3/manifest/hash/approval dan state tidak diubah. Architecture tetap in_progress; implementation/QA/release pending. STOP setelah validasi/pelaporan tanpa Draft A1 atau implementation.
