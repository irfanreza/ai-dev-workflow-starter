# Keputusan dan preferensi pengguna — Architecture discovery

Sumber: jawaban eksplisit pengguna pada percakapan proyek, sesi 23 November 2026 (Asia/Jakarta). Catatan ini terpisah dari rekomendasi teknis agen; bukan approval Architecture Draft A1, ADR, database, framework atau hosting.

| Topik | Pernyataan pengguna |
| --- | --- |
| Anggaran | Target operasional Rp0–150.000/bulan untuk pilot, mencakup aplikasi, database, backup, autentikasi dan domain jika diperlukan. Bukan izin otomatis melampaui target; estimasi di atas target harus dimintakan persetujuan terlebih dahulu. |
| Free-tier | Tanpa SLA boleh dievaluasi untuk pilot dengan risiko, monitoring dan fallback yang jelas. Ini izin evaluasi, bukan penerimaan seluruh risiko atau persetujuan provider. |
| Pemulihan | RPO maksimal24jam dan RTO maksimal24jam tetap target pilot. Risiko downtime >24jam akibat operator tunggal tidak tersedia diterima eksplisit untuk pilot, bukan SLA terjamin. Revisi N-06 CR-N06-001 P1 disetujui final dan diterapkan hanya pada N-06. RPO dinilai dari backup yang benar-benar tersedia dan terverifikasi untuk pemulihan. |
| Parent | Lebih memilih Google Login OAuth/OIDC; keamanan, sesi dan pemulihan Parent tetap perlu dievaluasi. Ini preferensi mekanisme, bukan approval rancangan autentikasi final. |
| Member/anak | Username/passphrase dengan reset oleh Parent dapat digunakan; anak tidak wajib email. |
| Provisioning | Pembentukan keluarga pilot oleh operator dapat diterima. |
| Recovery Parent | Recovery code kuat sekali pakai disimpan offline, dengan verifikasi operator sebelum pengikatan akun Google baru. Bukan recovery berdasar nama/email saja. |
| Privasi | Durasi tepat ditetapkan pengguna: backup14hari dan log teknis7hari; data aktif dihapus melalui prosedur operator setelah permintaan terverifikasi. |
| Lokasi | Belum dibatasi; konsekuensi privasi/keamanan perlu dijelaskan. Tidak menyatakan bahwa lokasi tidak memiliki konsekuensi. |
| Pemeliharaan | Satu developer, respons insiden best effort, belum ada operator pengganti. Prioritaskan TypeScript/Node.js, deployment sederhana dan operasi minimal. Managed dapat dipertimbangkan bila sesuai anggaran. |
| Domain | Prioritaskan subdomain platform bila memenuhi ketentuan Google OAuth; bila tidak, ajukan opsi domain beserta biaya. Tidak ada izin pembelian domain. |

Batas terbaru: pengguna menyetujui final CR-N06-001 P1 dan mengizinkan penerapan terkendali hanya pada N-06 serta addendum AC terkait. Approval D2 historis dan seluruh UX R3 tetap utuh; Architecture in_progress, implementation/QA/release pending. Jalankan validasi/konsistensi lalu berhenti; jangan membuat A1/implementation.

## Batas penerimaan keputusan

Kelima jawaban sebelumnya menetapkan anggaran/evaluasi free-tier, recovery, retensi, kapasitas operasional dan prioritas domain. Penerimaan risiko RTO terbaru dan persetujuan prinsip N-06 dirinci terpisah di bawah. Keduanya bukan approval desain/ADR, bukan hasil QA/restore, bukan penerimaan risiko pelampauan RPO24jam atau penurunan performa, dan bukan otorisasi pengeluaran di atas target. Rekomendasi agen tetap terpisah di architecture-discovery.md.

## Penerimaan risiko RTO pilot — keputusan pengguna, terpisah dari N-06

Status: **diterima eksplisit oleh pengguna, khusus pilot**. Sumber: pesan terbaru pengguna pada sesi23November2026.

> Saya menerima risiko residual untuk pilot bahwa downtime dapat melebihi 24 jam jika operator tunggal tidak tersedia, dengan respons insiden best effort.

Pengguna mempertahankan target RTO maksimal24jam sebagai sasaran desain/operasional, bukan SLA yang dijamin. Monitoring, alert, runbook dan prosedur restore tetap wajib. Risiko harus dievaluasi ulang sebelum memperluas penggunaan. Cakupan penerimaan ini tidak diperluas menjadi izin atas kehilangan data >24jam, kegagalan integritas, semua kegagalan provider atau penurunan performa. Target yang terlewat tetap dilaporkan sebagai terlewat.

## Riwayat persetujuan prinsip N-06 — sebelum approval final

Pengguna secara prinsip menyetujui pengecualian hanya untuk bencana kehilangan permanen storage utama yang memerlukan restore backup, dengan kehilangan data maksimal24jam sesuai RPO pilot. Restart, redeploy, crash proses dan gangguan jaringan biasa tetap harus mempertahankan seluruh transaksi committed secara konsisten. Restore wajib menjaga integritas database, ledger, reward, occurrence dan isolasi keluarga.

Pengguna secara eksplisit meminta change control dan review redaksi final sebelum PRODUCT diubah. Proposal: docs/workflow/CR-N06-001.md P1, status proposed. Approval D2 dan UX R3 tidak berubah; persetujuan prinsip ini tidak menjadi approval proposal atau izin membuat Draft A1.

## Approval final N-06 dan instruksi penerapan

Pengguna menyatakan: “Saya memberikan approval final terhadap redaksi revisi N-06 yang tercantum dalam CR-N06-001 P1.” Tanggal sesi:23November2026 (Asia/Jakarta). Evidence, wording sebelum/sesudah, pemeriksaan kesamaan dan identitas perubahan dicatat di docs/workflow/CR-N06-001.md. Revisi diterapkan hanya pada cell N-06 dalam PRODUCT; approval D2 historis tidak diubah.

Instruksi tambahan pengguna: RPO24jam berdasarkan backup terakhir yang benar-benar tersedia dan berhasil diverifikasi untuk pemulihan, bukan hanya jadwal backup. Klarifikasi AC terkait di docs/workflow/CR-N06-001-AC-ADDENDUM.md. Target desain RTO24jam serta penerimaan risiko operator tunggal tetap terpisah dan tidak dihapus. Approval ini tidak menjadi approval Architecture atau izin A1/implementation.
