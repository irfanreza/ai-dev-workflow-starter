# Keputusan dan preferensi pengguna — Architecture discovery

Sumber: jawaban eksplisit pengguna pada percakapan proyek, sesi 23 November 2026 (Asia/Jakarta). Catatan ini terpisah dari rekomendasi teknis agen; bukan approval Architecture Draft A1, ADR, database, framework atau hosting.

| Topik | Pernyataan pengguna |
| --- | --- |
| Anggaran | Target Rp0–150.000/bulan untuk pilot, mencakup aplikasi, database, backup, autentikasi dan domain jika diperlukan. Jika tidak realistis, jelaskan trade-off/alternatif sebelum memilih. |
| Pemulihan | RPO maksimal 24 jam; RTO maksimal 24 jam. Evaluasi kecukupan backup harian dan pengujian restore. |
| Parent | Lebih memilih Google Login OAuth/OIDC; keamanan, sesi dan pemulihan Parent tetap perlu dievaluasi. Ini preferensi mekanisme, bukan approval rancangan autentikasi final. |
| Member/anak | Username/passphrase dengan reset oleh Parent dapat digunakan; anak tidak wajib email. |
| Provisioning | Pembentukan keluarga pilot oleh operator dapat diterima. |
| Privasi | Rentang backup 7–30 hari dan log teknis 7–14 hari diterima; data aktif dihapus melalui prosedur operator setelah permintaan terverifikasi. Durasi tepat belum dipilih. |
| Lokasi | Belum dibatasi; konsekuensi privasi/keamanan perlu dijelaskan. Tidak menyatakan bahwa lokasi tidak memiliki konsekuensi. |
| Pemeliharaan | Satu developer; prioritaskan TypeScript/Node.js, deployment sederhana dan operasi minimal. Managed dapat dipertimbangkan bila sesuai anggaran. |

Batas terbaru: perdalam analisis autentikasi, transaksi, tenancy, penghapusan/pemulihan, SQLite/PostgreSQL dan biaya; tanyakan keputusan kritis; lalu berhenti. Jangan membuat Architecture Draft A1 atau implementation, dan jangan mengubah PRODUCT D2, UX R3 atau approval evidence.
