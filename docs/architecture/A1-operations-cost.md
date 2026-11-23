# A1 — deployment, biaya dan prosedur operasional

Status: **DRAFT — belum approved**, bagian [A1](../ARCHITECTURE-A1.md). Tidak ada akun/cloud resources yang dibuat, layanan dibeli, secret diakses atau deployment dijalankan. Prosedur di bawah adalah rencana operasional, bukan script/migration yang sudah dibuat.

## Deployment topology

- Railway Hobby: satu service Node app, satu replica always-on (app sleep dimatikan), HTTPS/subdomain platform. Artifact immutable dengan Next standalone, app health `/health/live` tanpa data/DB query; readiness DB hanya saat startup/deploy atau diagnosis, bukan monitor yang terus membangunkan database. Runtime local disk hanya cache/temp non-authoritative.
- Neon Free PostgreSQL18: koneksi TLS verify, role app nonowner, pool app max5/min0/idle timeout10detik. Transaksi memakai satu connection pinned; direct endpoint untuk backup/administrasi, bukan pool transaction-mode yang diasumsikan mendukung session state. SET LOCAL/driver compatibility diuji. Batasi compute0.25CU untuk pilot bila plan memungkinkan; scale-to-zero DB tetap aktif untuk biaya, dengan gate N-05.
- Job Railway pada00.00/12.00UTC, artifact verifier terpisah berisi client/server PostgreSQL18 dan alat enkripsi backup. Job menjalankan dump/restore-check sebentar lalu exit, tidak worker always-on. Timeout keseluruhan60menit; close seluruh handles agar schedule tidak terlewat karena run sebelumnya menggantung. Retry2kali dengan jeda15/30menit di dalam batas timeout, lalu gagal dan alert. [Railway cron](https://docs.railway.com/cron-jobs).
- R2 Standard private: backup bucket dan deletion-register bucket terpisah agar credentials bisa dibatasi bucket; encryption/authentication pada aplikasi backup. App runtime tidak punya akses bucket atau private key backup.
- Healthchecks Hobbyist: heartbeat app setiap5menit tanpa query DB, period5menit/grace5menit; heartbeat backup hanya sesudah available+verified, period12jam/grace1jam. Email ke operator untuk monitoring operasional; bukan notifikasi produk keluarga. Ini infrastruktur N-07, bukan penambahan fitur notifikasi eksternal MVP. [Healthchecks pricing](https://healthchecks.io/pricing/).
- Dev/CI menggunakan data dummy dan PostgreSQL terisolasi. Tidak ada staging always-on berbayar untuk pilot; on-demand staging/verification resource dihitung dalam biaya. Deployment produksi, pembuatan environment dan perubahan schema kelak memerlukan otorisasi tahap yang sesuai.

Fallback app: redeploy artifact yang sama ke host Node alternatif setelah izin, DB tetap sama, ubah redirect URI OAuth secara terkendali. Fallback database: restore konsisten ke PostgreSQL18 lain yang telah dinilai/diperbolehkan, provision role/RLS, ganti URL dan revoke sessions. Tidak mengganti PostgreSQL menjadi SQLite sebagai emergency otomatis: schema/dialect/constraints dan uji berbeda. Tidak ada standby berbayar tersembunyi dalam estimasi.

## Harga, asumsi dan estimasi all-in

Harga sumber resmi diperiksa23November2026; perlu konfirmasi console saat pemilihan. Kurs18.000/USD adalah asumsi perencanaan. Allowance12% pajak +3% spread diterapkan secara aditif sebagai buffer15%, bukan pernyataan tarif pajak hukum/aktual. Biaya tenaga developer, internet pribadi dan perangkat sudah tersedia tidak termasuk tagihan infrastruktur; waktu pemeliharaan dicatat terpisah. Tidak ada biaya lisensi aplikasi berulang yang diasumsikan.

| Komponen | Skenario dasar per bulan | Asumsi / kapan naik |
| --- | --- | --- |
| Node app + backup job + build/runtime/transfer Railway | max($5 minimum, perkiraan $4.75 pemakaian) = **$5** | Rincian footprint di bawah, bukan paket flat; kenaikan RAM/CPU/job menaikkan total |
| PostgreSQL Neon Free | $0 |100CU-jam,1GB storage,5GB transfer; quota termasuk semua query user/backup/auth, bukan hanya halaman |
| Backup R2 Standard | $0 dalam kuota | contoh snapshot25MB x28 salinan=700MB plus manifest/register; ukuran ini asumsi, bukan hasil dump. <=10GB-month dan kuota operasi harus dibuktikan |
| Auth Google OIDC + credential lokal | $0 biaya layanan tambahan diasumsikan | Tidak memakai paket Identity Platform/SMTP berbayar; app auth/DB CPU sudah dihitung di atas. Konfigurasi aktual Google diperiksa sebelum pilot |
| Domain dan TLS | $0 bersyarat | subdomain platform/managed TLS; bila Google mewajibkan domain milik sendiri, ajukan opsi/biaya dulu |
| Log dan monitor | $0 tambahan | Railway log history7hari, Healthchecks free2checks; tidak mengekspor data keluarga ke SaaS analytics |
| Total USD dasar | **$5** | seluruh komponen di atas, dalam kuota dan footprint asumsi |
| Konversi + allowance15% | **Rp103.500** |5 x18.000 x1.15 |
| Cadangan fluktuasi/pemakaian/operasi | **Rp18.000** | cadangan anggaran, bukan tagihan provider atau izin auto-spend |
| **All-in rencana dasar** | **Rp121.500** | selisih terhadap target150.000: Rp28.500 |

Dasar perkiraan Railway: RAM rata-rata0.35GB x$10=$3.50; CPU rata-rata0.035vCPU x$20=$0.70; egress total app/job3GB x$0.05=$0.15; allowance job verifikasi+drill singkat$0.10; build/pemakaian tambahan$0.30 => $4.75 <minimum$5. Footprint ini **belum diukur**. Untuk 60job/bulan x5menit=5jam, job0.75GB/0.25vCPU menghabiskan sekitar$0.087 pada asumsi720jam/bulan; run lebih lama atau volume dump besar menaikkan biaya. Contoh60upload snapshot25MB sekitar1.5GB; source export Neon dan seluruh transfer lain juga harus diukur terhadap quota, bukan hanya ukuran penyimpanan. [Railway rates](https://docs.railway.com/pricing).

Skenario tekanan: rata-rata RAM0.5GB=$5 +CPU0.075=$1.5 +job/build/transfer$0.5 => $7; total `(7 x18.000 x1.15)+18.000`=**Rp162.900**, melewati target dan perlu persetujuan terlebih dahulu. Pada konsumsi$6, formula yang sama menjadiRp142.200; ini batas perencanaan, bukan quota yang diaktifkan. Alarm forecast saat proyeksi$5.5 dan evaluasi sebelum$6, karena tagihan lain/kurs bisa berubah. Limit provider bukan cap rupiah all-in. [Railway cost control](https://docs.railway.com/pricing/cost-control).

Neon Free: sumber kini menyebut100CU-jam/1GB, restore window sampai6jam/1GB changes. Ia bukan backup14hari atau SLA. Pada0.25CU,100CU-jam sekitar400jam aktif/bulan; polling/keep-alive query terus-menerus dapat menghabiskan quota. Free compute/transfer habis dapat menangguhkan compute sampai siklus berikutnya, sehingga bertentangan dengan target RTO bila tidak ada fallback. Monitor forecast quota pada50/70/85%; jika proyeksi mencapai100 sebelum akhir bulan, putuskan alternatif **sebelum** suspension agar fresh export masih mungkin. Jangan mengakali batas dengan rotasi akun/proyek. [Neon pricing dan quota](https://neon.com/pricing).

Kuota backup: R2 Standard10GB-month/1juta classA/10juta classB gratis menurut sumber; perhitungan harus memasukkan salinan sementara verification dan register. Retensi14hari dan ukuran backup aktual menentukan biaya. [R2 pricing](https://developers.cloudflare.com/r2/pricing/).

Alternatif: Render app$7 + Neon Free ($0) sekitarRp162.900 dengan buffer/cadangan formula yang sama; Render app$7+SQLite disk1GB$0.25 sekitarRp168.075; Render app$7+Postgres$6 sekitarRp287.100 sebelum storage/job ekstra. Ini estimasi alternatif, bukan pilihan/izin overbudget. Harga compute+disk: [Render](https://render.com/pricing), [Postgres starting tier](https://render.com/articles/managed-postgresql-pricing-2026). Free app Render cold start sekitar1menit dan disk ephemeral tidak cocok sebagai default N-05/N-06; [free limitations](https://render.com/docs/free).

Domain fallback: gunakan domain yang sudah dimiliki bila memenuhi verifikasi. Jika belum ada, biaya registrasi/perpanjangan tahunan harus ditampilkan sebagai cash outlay awal serta amortisasi per bulan, dan dihitung kembali bersama tax/renewal; belum ada domain/TLD dipilih atau harga registrar diklaim. Google personal-pilot exemption/subdomain harus diuji; bukan janji domain gratis selalu valid. Estimasi domain berbayar tidak ditutup dengan menghapus cadangan tanpa review.

Gate biaya/reliability terbuka: fallback DB berbayar mungkin melebihi target; hard spending stop Railway mematikan workloads dan job, sehingga tidak menjamin RTO/RPO. Pengguna belum menerima downtime akibat quota/provider seperti risiko operator. Sebelum pilot, perlu forecast terukur, fallback yang biayanya disetujui dan/atau penerimaan risiko spesifik. A1 merekomendasikan route managed bersyarat, bukan menyatakan semua batas sudah terpenuhi.

## Backup tersedia dan terverifikasi

Usulan job12jam menjalankan seluruh tahap berikut, dengan source schema/version manifest. pg_dump membuat snapshot konsisten, namun tidak otomatis mencakup role/global objects; inventory role/grants/RLS/extension dan secret recovery disimpan terpisah secara aman. PostgreSQL18 dipin bersama dump/restore tool. [PostgreSQL pg_dump](https://www.postgresql.org/docs/18/app-pgdump.html).

1. Catat snapshot coverage time konservatif saat memulai snapshot konsisten, DB/schema/app version dan UTC server time; jangan menandai waktu upload sebagai titik data. Export satu database penuh, termasuk command ledger/auth/history, memakai role backup yang mencakup semua tenant, tanpa mengubah primary.
2. Encrypt authenticated archive (kandidat `age`) dengan key backup khusus; manifest non-sensitive berisi backup id, ciphertext hash dan snapshot time. Upload ke bucket private, unduh kembali, validasi hash, dekripsi menggunakan verifier key terbatas; jangan sekadar cek status upload.
3. Restore archive yang diunduh ke PostgreSQL18 sementara **di job**, tidak ke primary/branch lain dalam database produksi. Provision roles/grants yang sesuai, aktifkan RLS dan jalankan pemeriksaan FK/constraints, saldo/ledger, completion/reward/occurrence, command source dan negative tenant tests pada hasil restore. Apply deletion register terbaru terlebih dahulu. Assert recovery app/schema compatibility dan minimal can-read melalui role app.
4. Setelah seluruh checks lulus, tulis manifest `verified` dengan available_at/verified_at dan source snapshot_at, kemudian heartbeat success. Backup gagal tidak menggantikan pointer last_verified. Hapus plaintext/temp DB walau job gagal; jangan mengirim dump/assertion rows ke logs/monitor. Hanya catat count/status/id acak.
5. Pantau usia **snapshot_at** last_verified yang objeknya masih tersedia, bukan timestamp heartbeat saja. Grace1jam ditambah durasi job maksimum1jam berarti alarm konservatif sekitar14jam dari snapshot; manifest age check juga berjalan pada setiap job/daily operator review. Jika backup hilang atau gagal decrypt, invalidasi manifest, alert dan pilih backup verified sebelumnya.
6. Purge backup setelah14hari dan temp verification setelah job selesai; log teknis7hari. Uji lifecycle deletion provider dan periksa listing; lifecycle yang terlambat/retensi internal provider merupakan risiko yang perlu diungkap, bukan klaim penghapusan instan.

Manifest last_verified dan monitor independen dari primary DB, agar primary hilang tidak menghilangkan bukti backup. Job punya read DB, read/write backup bucket dan read register; app tidak punya key ini. Credential operator untuk register/backup cleanup terpisah. Private key verifier di secret store job, salinan offline terenkripsi tersedia untuk operator; compromise job berarti risiko bocor backup dan harus ditangani.

Jika usia valid snapshot mendekati18jam: alert kritis, retry backup/manual job dan diagnosis verifikasi. Jika mencapai24jam: laporkan RPO at risk/breached, jangan tandai backup sehat; hentikan klaim pilot siap dan minta tindakan/keputusan insiden. Membatasi write saja tidak membuat snapshot lama tiba-tiba memenuhi RPO. Best-effort operator masih meninggalkan risiko pelampauan RPO yang **belum diterima**; pilih otomasi/prosedur/fallback dan uji, jangan memasukkan risiko ini ke penerimaan RTO.

## Runbook restore dan rollback

| Langkah | Tindakan/rencana evidence |
| --- | --- |
| Deteksi/klasifikasi | Rekam incident_at, failure ordinary vs permanent storage loss, dampak, operator acknowledgement. Gangguan biasa tidak mengizinkan kehilangan committed |
| Amankan | Maintenance mode, blok business writes, cabut/rotate token yang terdampak, simpan evidence tanpa secrets; jangan restore di atas primary yang belum didiagnosis |
| Pilih backup | Ambil last available verified, download/decrypt/restore-check lagi; `RPO=incident_at-snapshot_at` <=24jam untuk disaster. Jika gagal pilih sebelumnya, laporkan nilai sebenarnya |
| Provision | Target PostgreSQL18 dan role/grants/RLS disetujui; gunakan artifact/schema yang kompatibel; secret operator hanya pada prosedur terotorisasi |
| Pulihkan | Restore seluruh database konsisten, jangan campur ledger dan domain dari snapshot berbeda; apply register deletion dan rekonsiliasi binding keamanan terbaru; invalidate seluruh sessions/OAuth attempts/recovery requests/recovery codes tersisa dan ganti recovery_epoch di config offline agar sesi/codes lama tidak hidup kembali |
| Validasi | Jalankan invariant suites dan cross-tenant deny dengan runtime role; pastikan feature rules dan due dates sama; periksa application read/write dalam lingkungan terisolasi |
| Rekonsiliasi | Catat rentang transaksi hilang, terutama reward yang sudah dipenuhi manual. Jangan replay browser queue/approve ulang otomatis. Instruksikan login ulang dan review data; tidak mengarang refund/edit saldo baru |
| Cutover | Setelah operator menyatakan pemeriksaan lulus, update DB URL/redirect bila berubah, buka traffic, smoke-test, catat reopened_at. RTO meliputi seluruh langkah sejak layanan berhenti |
| Follow-up | Regenerate Parent recovery code melalui Google identity yang aman, rotate credential, hapus temp copies, laporan root cause dan biaya; evaluasi risiko sebelum ekspansi |

Rollback aplikasi: artifact sebelumnya yang kompatibel schema, tanpa mengembalikan DB ke snapshot hanya untuk rollback UI. Rencana perubahan schema kelak memakai backward-compatible expand/contract dan backup verified; destructive migration membutuhkan izin eksplisit. Belum ada migration yang dibuat.

Drill operator sebelum pilot, bulanan dan setelah perubahan backup/schema besar: restore ke target terisolasi dengan data dummy atau data pilot dilindungi sama, ukur seluruh tahap dan buktikan RPO/RTO. Uji otomatis per backup tidak menggantikan drill manusia/provisioning/cutover. Operator tunggal best effort memiliki risiko residual yang diterima hanya untuk ketidaktersediaan operator, bukan bukti target24jam terpenuhi.

## Penghapusan dan retensi

Permintaan keluarga diverifikasi melalui Parent fresh-auth/kanal operator terdaftar; minta konfirmasi scope karena data seluruh keluarga. Tidak ada endpoint publik delete ledger. Prosedur operator:

1. Append entry terenkripsi dan ditandatangani dalam register terpisah: family UUID acak, requested/verified_at, deleting status, scope, opaque operator reference; tanpa nama/email/tugas. Simpan salinan offline terenkripsi; jika register gagal disimpan, jangan mengklaim penghapusan selesai.
2. Family lock, mark deleting, revoke semua sesi, lalu hapus seluruh data/auth yang terkait secara konsisten memakai operator role; jalur purge memerlukan hak khusus, app role tidak memiliki DELETE ledger. Untuk ukuran pilot satu transaksi purge dapat diuji. Seluruh histori keluarga dihapus bersama, bukan menyunting poin individual.
3. Tandai completed pada register; ulangi aman bila proses terputus di tengah. Cek orphan/caches/secrets/invites dan OAuth bindings. Backup lama tidak ditulis ulang, tetap terenkripsi inaccessible untuk penggunaan biasa dan kedaluwarsa14hari dari snapshot, bukan14hari lagi saat restore/copy.
4. Setiap verification/restore menerapkan register sebelum membuka akses. Jangan membuat backup baru dari restore yang masih mengandung keluarga terhapus. Register disimpan sampai seluruh backup yang mengandung keluarga kedaluwarsa ditambah satu hari validasi, kemudian purge (target15hari sesudah delete bila semua backup14hari benar-benar terhapus). Jika retensi provider/temp lebih lama, tandai risiko dan perpanjangan register minimal yang perlu direview.

Retensi log teknis7hari berbeda dari audit bisnis yang bertahan selama keluarga aktif. Metadata monitor hanya success/fail opaque job identifiers, tanpa IP/member/task payload; log metadatanya mengikuti batas vendor yang harus dicatat. Vendor security/access logs mungkin memiliki retention berbeda yang tidak dapat kita kendalikan: dokumentasikan scope/DPA/subprocessor sebelum mengklaim semua salinan mengikuti7hari. Tidak ada klaim compliance hukum.

Bucket register juga memiliki prefix keamanan untuk intent/completed Parent rebind yang ditulis operator, sesuai prosedur auth. Verifier/operator restore membaca register terbaru dan salinan offline terautentikasi; jika register hilang, tidak terverifikasi, atau terdapat intent dengan outcome ambigu, fail closed dan jangan membuka kembali akses sampai direkonsiliasi. Primary DB snapshot tidak dapat menjadi satu-satunya sumber kebenaran untuk penghapusan atau perubahan binding yang lebih baru. Tidak mengklaim R2 memberi WORM atau atomic transaction dengan PostgreSQL.

## Monitoring dan rutinitas

| Sinyal | Rencana threshold dan respons |
| --- | --- |
| App heartbeat hilang | 10menit termasuk grace; email operator, cek host/health. Tidak membuktikan login/DB sehat |
| Error bisnis/API | Ringkasan5xx/timeout per request, alert >=5error/5menit pada traffic pilot; log sanitized7hari; jangan query DB idle untuk uptime |
| Backup freshness | heartbeat independent +verified manifest; warning sekitar14jam, critical18jam, RPO breach24jam; test job hang/no heartbeat |
| Ledger integrity | Per backup seluruh akun; mismatch critical dan tahan akses restore. Jangan auto-adjust saldo |
| Kuota/biaya | Review dashboard harian, forecast50/70/85% quota, forecast appUSD5.5/6; persetujuan sebelum target terlampaui |
| Auth abuse | Rate limit counter dan sanitized counts; operator review burst tanpa menyimpan secrets/IP plaintext |
| Kinerja | Timing request+client usability secara terukur; N-05 19/20 pada data/jaringan tercatat termasuk idle, tanpa menyembunyikan cold start |

Harian: periksa backup verified, alert email, quota/biaya dan failure counts. Mingguan: dependency security update, backup purge/register expiry, akses provider. Bulanan: drill restore, cek recovery Parent, estimasi biaya ulang. Sebelum ekspansi: ulangi penerimaan risiko operator, tenancy/performance tests, biaya dan lokasi provider. Semua runbook/checks masih rancangan; tidak ada monitoring yang diaktifkan atau pesan yang dikirim.
