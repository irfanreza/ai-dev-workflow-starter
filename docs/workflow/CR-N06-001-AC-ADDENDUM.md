# Addendum acceptance criteria N-06 — CR-N06-001 P1

- Sumber otorisasi: approval final dan instruksi penerapan pengguna pada 23 November 2026 (Asia/Jakarta), dicatat di [CR-N06-001](CR-N06-001.md#approval-final-dan-penerapan-terkendali).
- Baseline: PRODUCT D2 ditambah revisi N-06 melalui CR-N06-001 P1. Addendum ini memperjelas pengujian N-06; tidak mengubah AC requirement lain, target performa N-05, aturan bisnis, atau UX R3.
- Status: klarifikasi dokumentasi acceptance criteria terkait N-06; **belum diuji**. Bukan bukti QA atau approval Architecture.

## Gangguan biasa — tidak boleh kehilangan transaksi committed

1. Seluruh keadaan loading, sukses, kosong bila relevan, akses ditolak dan gagal/retry tetap mengikuti N-06 dan UX R3.
2. Siapkan transaksi committed, lalu uji restart, redeploy, crash proses dan gangguan jaringan biasa. Saat sesi baru dibuka, seluruh transaksi committed tetap tersimpan dan konsisten.
3. Simulasikan commit berhasil tetapi respons ke klien hilang. Pemeriksaan hasil/retry mengacu aksi yang sama tanpa kredit, debit, pengajuan atau occurrence ganda. Transaksi yang belum commit tidak meninggalkan perubahan parsial.
4. Hilangnya file database karena menggunakan disk ephemeral saat redeploy bukan pengecualian disaster recovery: deployment tersebut gagal memenuhi ketahanan gangguan biasa.

## Kehilangan permanen storage utama — pengecualian khusus pilot

1. Pengecualian kehilangan data hanya berlaku pada bencana kehilangan permanen storage utama yang memerlukan restore backup. Ini bukan izin melonggarkan durability saat proses crash atau jaringan terputus.
2. Pilih backup terakhir yang **benar-benar tersedia dan berhasil diverifikasi untuk pemulihan**. Jadwal job, status upload saja, checksum saja, atau backup yang belum dapat dipulihkan tidak cukup membuktikan pemenuhan RPO.
3. Catat identitas backup, titik data konsisten yang tercakup, waktu backup tersedia, hasil/waktu verifikasi pemulihan, dan waktu kehilangan permanen storage. Hitung kehilangan data sebagai selisih waktu kehilangan storage dengan titik data yang dapat dipulihkan; wajib **maksimal 24 jam**. Waktu upload/verifikasi yang lebih baru tidak membuat snapshot lama menjadi lebih baru.
4. Jika backup terbaru gagal diverifikasi, gunakan backup valid sebelumnya untuk penilaian. Jika titik pemulihannya lebih dari24jam sebelum kehilangan storage, hasilnya **tidak memenuhi RPO**; tidak boleh dinyatakan lulus karena job harian terjadwal atau ada penerimaan risiko RTO.
5. Verifikasi hasil restore: database/FK/constraint konsisten; saldo sama dengan seluruh kredit/debit ledger yang dipulihkan; status dan biaya tersimpan reward konsisten; occurrence/penyelesaian/pending sesuai aturan D2; serta identitas aksi yang dipulihkan tidak menghasilkan efek ganda. Pulihkan seluruh komponen ke titik konsisten yang sama, bukan mencampur snapshot berlainan.
6. Uji kembali isolasi keluarga, peran dan ownership. Terapkan ulang register penghapusan yang lebih baru dari snapshot sebelum membuka akses, sesuai prosedur privasi; hasil restore tidak menghidupkan kembali keluarga yang telah dihapus.
7. Catat rentang transaksi yang hilang. Jangan memutar ulang aksi secara otomatis atau menulis ulang histori yang tersisa. Periksa dampak terhadap reward yang mungkin sudah dipenuhi manual di luar aplikasi; snapshot tidak dapat membatalkan kejadian di dunia nyata. Ini klarifikasi rekonsiliasi insiden, bukan fitur refund/edit saldo baru.

## RTO dan evidence — terpisah dari pengecualian N-06

- Target desain/operasional RTO tetap maksimal24jam, bukan SLA terjamin. Catat waktu kehilangan layanan, deteksi, respons operator, provisioning, restore, verifikasi dan pembukaan layanan; durasi restore teknis saja bukan seluruh downtime.
- Risiko khusus pilot bahwa operator tunggal tidak tersedia dapat menyebabkan downtime >24jam sudah diterima terpisah pada [.workflow/intake/architecture-user-decisions.md](../../.workflow/intake/architecture-user-decisions.md#penerimaan-risiko-rto-pilot--keputusan-pengguna-terpisah-dari-n-06). Hasil >24jam tetap dilaporkan melampaui target, dengan sebab dan cakupan penerimaan risiko; tidak diklaim lulus target.
- Monitoring, alert, runbook dan prosedur restore tetap wajib. Frekuensi backup12jam adalah rekomendasi agen yang belum dikunci; retensi backup14hari/log7hari adalah keputusan pengguna. Retensi maupun frekuensi tidak menggantikan bukti backup tersedia dan terverifikasi.
- Pelaksanaan QA kelak harus mencatat perintah, lingkungan, exit status, hasil assertions, backup/titik pemulihan yang dipakai, hasil pemeriksaan integritas/tenant, serta keterbatasan. Tidak ada pengujian aplikasi atau restore yang dijalankan pada penerapan dokumentasi ini.
