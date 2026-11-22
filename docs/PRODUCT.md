# Spesifikasi produk — Pekerjaan Rumah Keluarga

Revisi: D1 · 22 November 2026 · Status: menunggu persetujuan scope.

## Problem and target users

Fakta terkonfirmasi: pengguna ingin aplikasi web untuk mengelola pekerjaan rumah
bersama anggota keluarga. Proses harus melalui discovery, UX, keputusan teknis,
implementasi, QA, dan release readiness dengan approval eksplisit.

Hipotesis masalah: pembagian tugas melalui percakapan mudah terlupakan; keluarga
sulit melihat siapa mengerjakan apa dan tugas mana yang belum selesai.
Pengguna utama usulan: pengelola rumah tangga dan anggota keluarga dewasa.
Validasi masalah dengan keluarga nyata belum dilakukan; spesifikasi ini merupakan
hipotesis MVP, bukan hasil wawancara pengguna.

## Value proposition and success metrics

Satu daftar bersama yang memperlihatkan pekerjaan, penanggung jawab, tenggat, dan
status tanpa harus menanyakan ulang melalui percakapan.

Target evaluasi usability (belum diukur): sedikitnya 4 dari 5 peserta dapat
membuat tugas, menugaskan anggota, lalu menyelesaikannya tanpa bantuan; masing-masing
alur selesai dalam 2 menit. Jika peserta belum tersedia, catat keterbatasan tersebut.
Target pilot: setelah dua minggu, ≥70% tugas yang jatuh tempo ditandai selesai
oleh anggota keluarga. Ukur dari jumlah kejadian tugas selesai / seluruh kejadian
yang jatuh tempo pada periode itu, tidak termasuk yang dibatalkan. Ini target
hipotesis, bukan syarat kelulusan pengujian perangkat lunak.

## User journeys and MVP scope

1. Pengelola masuk, membuat satu keluarga, lalu mengundang anggota melalui tautan.
2. Anggota masuk dan menerima undangan untuk bergabung.
3. Pengelola atau anggota membuat pekerjaan, menentukan penanggung jawab dan tanggal.
4. Anggota membuka daftar Hari ini atau Semua, memfilter tugas sendiri/keluarga,
   melihat yang terlambat, lalu menandai selesai.
5. Anggota memperbaiki kesalahan dengan membuka kembali pekerjaan selesai.
6. Pengelola mencabut undangan atau mengeluarkan anggota; tugas yang ditinggalkan
   tetap tersedia dan ditandai belum memiliki penanggung jawab.

MVP usulan: satu keluarga per akun, dua peran (pengelola dan anggota), tugas
sekali jalan atau berulang harian/mingguan, serta riwayat penyelesaian sederhana.
Semua anggota boleh membuat, mengedit, menyelesaikan, dan membuka kembali tugas
keluarganya. Hanya pengelola mengurus keanggotaan dan penghapusan tugas.

## Non-goals

Tidak termasuk: akun anak khusus, multi-keluarga, chat, poin/hadiah, pembayaran,
lampiran foto, AI, kalender eksternal, push/email pengingat tugas, aplikasi native,
mode offline dengan perubahan data, atau laporan analitik lanjutan.
Undangan dapat disalin dan dikirim sendiri; pengiriman email otomatis bukan scope.

## Functional requirements

| ID | Kebutuhan | Kriteria penerimaan |
| --- | --- | --- |
| FR-01 | Identitas dan keluarga | Pengguna dapat masuk/keluar dan membuat keluarga; sesi yang berakhir meminta masuk kembali tanpa menampilkan data privat. Metode autentikasi diputuskan di arsitektur. |
| FR-02 | Keanggotaan | Undangan berlaku 7 hari, sekali pakai, dapat dicabut; penerimaan memerlukan login. Undangan invalid/kedaluwarsa menampilkan pesan dan tidak menambah anggota. |
| FR-03 | Buat/edit tugas | Judul wajib 1–120 karakter setelah trim; catatan opsional ≤1.000 karakter; penanggung jawab opsional harus anggota aktif; tanggal opsional. Input invalid tidak tersimpan dan diberi pesan dekat field. |
| FR-04 | Daftar bersama | Hari ini menampilkan tugas belum selesai dengan tanggal ≤hari ini; tugas tanpa tanggal tersedia di Semua. Filter Saya/Keluarga bekerja bersama filter status. Tanggal terdekat didahulukan, tanpa tanggal di akhir. |
| FR-05 | Status dan riwayat | Selesai mencatat pelaku dan waktu; buka kembali menghapus status selesai aktif dan mempertahankan riwayat. Aksi berulang tidak menggandakan catatan/transisi. |
| FR-06 | Pengulangan | Harian/mingguan memerlukan tanggal awal. Setiap tanggal jadwal adalah kejadian terpisah. Menyelesaikan kejadian tidak mengubah tanggal kejadian berikutnya; kejadian terlewat tetap terlambat. |
| FR-07 | Edit/hapus seri | Edit jadwal seri hanya memengaruhi kejadian masa depan yang belum selesai; kejadian hari ini dan historis tetap. Hapus memerlukan konfirmasi pengelola dan membatalkan kejadian belum selesai; riwayat selesai dipertahankan. |
| FR-08 | Akses dan anggota keluar | Keluarga lain tidak dapat membaca/mengubah data, termasuk melalui URL/permintaan langsung. Anggota dikeluarkan segera kehilangan akses; penugasannya menjadi kosong. Pengelola terakhir tidak dapat keluar tanpa menyerahkan peran. |
| FR-09 | Sinkronisasi | Perubahan dari sesi A terlihat pada sesi B saat muat ulang. Edit terhadap versi data yang sudah berubah ditolak dengan pesan untuk memuat versi terbaru; input pengguna tetap tersedia untuk disalin. |

## Non-functional requirements and constraints

| ID | Kebutuhan dan cara verifikasi |
| --- | --- |
| NFR-01 | Antarmuka Bahasa Indonesia, responsif pada lebar 360 dan 1280 px tanpa scroll horizontal; semua aksi inti dapat dilakukan dengan keyboard, fokus terlihat, label field dan pesan status dapat dibaca pembaca layar. Target WCAG 2.2 AA untuk alur inti; audit otomatis disertai pemeriksaan manual. |
| NFR-02 | Penolakan otorisasi diuji pada setiap operasi data keluarga; tidak ada kredensial/token undangan di log; data privat hanya untuk anggota aktif. Transport terenkripsi menjadi syarat lingkungan release. |
| NFR-03 | State kosong, memuat, gagal, berhasil, serta sesi berakhir tersedia. Gagal simpan tidak menghapus input atau menampilkan sukses. Saat koneksi pulih pengguna dapat mencoba lagi tanpa duplikasi. |
| NFR-04 | Pada dataset uji 10 anggota dan 1.000 kejadian tugas, daftar interaktif ≤2 detik untuk ≥95% dari 20 pengukuran pada lingkungan uji yang dicatat. Kondisi jaringan/perangkat dan batas keterwakilan produksi dilaporkan. |
| NFR-05 | Tanggal tugas mengikuti zona waktu keluarga, default usulan Asia/Jakarta, dipilih saat pembuatan dan tetap untuk MVP. Waktu audit disimpan sebagai waktu absolut. Batas tengah malam diuji. |
| NFR-06 | Sebelum release readiness: kebijakan retensi/penghapusan, backup/restore, konfigurasi lingkungan, pemulihan dan rollback harus terdokumentasi serta diuji sesuai arsitektur terpilih. Tidak ada klaim produksi siap tanpa bukti. |

## Acceptance criteria and edge cases

Pengujian harus menelusuri ID di atas. Skenario wajib meliputi dua anggota dari
keluarga yang sama, satu pengguna keluarga lain, undangan kedaluwarsa/dicabut/dipakai
ulang, tugas tanpa penanggung jawab/tanggal, judul kosong, klik ganda selesai,
edit bersamaan, koneksi gagal, serta akses setelah anggota dikeluarkan.

Pengulangan wajib diuji melewati tengah malam dan pergantian bulan/tahun;
mingguan mengikuti hari dari tanggal awal, bukan tujuh hari setelah penyelesaian.
Tidak ada status selesai otomatis untuk tugas terlambat. Jadwal berulang tanpa
tanggal awal ditolak. Riwayat tetap menyebut pelaku yang sudah keluar sebagai
mantan anggota tanpa membocorkan identitas tambahan.

## Assumptions and unresolved questions

Semua butir di bawah adalah **usulan untuk disetujui**, bukan fakta pengguna:

- A1: pilot satu rumah tangga, 2–10 anggota dewasa; akun anak ditunda.
- A2: penggunaan online lewat ponsel dan desktop; muat ulang cukup untuk sinkronisasi MVP.
- A3: anggota saling dipercaya untuk mengubah tugas, tetapi isolasi antar keluarga wajib.
- A4: frekuensi harian/mingguan cukup; belum perlu rotasi otomatis atau pengingat.
- A5: Bahasa Indonesia dan default Asia/Jakarta sesuai calon pengguna awal.
- A6: privasi prioritas; tidak ada publikasi data keluarga atau HTML privat tanpa izin.
- A7: budget, target hosting, tanggal peluncuran, kebutuhan penghapusan akun dan
  retensi belum diberikan. Sebelum keputusan arsitektur, batas biaya dan operasi
  harus dinyatakan atau usulannya dimintakan persetujuan. Tidak ada stack dipilih.

## Explicit product approval (who, when, spec revision)

Belum disetujui. Reviewer: pengguna. Tanggal dan pernyataan approval belum ada.
Persetujuan harus menyebut revisi D1 atau revisi penggantinya dan mencakup scope,
non-goals, asumsi, serta kriteria penerimaan. Umpan balik tidak dianggap approval.

Setelah scope disetujui: buat prototype HTML lokal, lakukan review browser dan
iterasi, minta approval UX dengan hash artefak; kemudian evaluasi arsitektur/ADR
dan minta approval; implementasikan per irisan dengan tes; lakukan QA; siapkan
release readiness dan approval release. Deployment produksi perlu izin terpisah.
