# Catatan discovery

Status: wawancara berlangsung; scope belum disetujui. Belum ada keputusan stack.

## Fakta terkonfirmasi dari pengguna
- Pengguna awal satu keluarga, termasuk orang tua dan anak; peluang banyak keluarga di masa depan dengan isolasi data keluarga.
- Parent/Admin mengelola anggota, tugas, poin, dan progres. Member melihat serta menyelesaikan tugas; tidak boleh mengubah aturan poin atau menghapus tugas.
- Masalah: pekerjaan bergantung pada ingatan/permintaan langsung; penanggung jawab, waktu terakhir selesai, dan kebutuhan pengerjaan ulang tidak jelas.
- Tujuan: pekerjaan lebih terorganisasi, pembagian jelas, partisipasi meningkat, riwayat dan kontribusi mudah dilihat.
- Poin dan reward merupakan motivasi yang diinginkan; batas MVP masih perlu diputuskan.
- Web responsif smartphone/desktop, bahasa Indonesia, online dahulu, biaya rendah, privasi antarkeluarga, tanpa tenggat ketat, hindari overengineering.
- Scope wajib mendapat persetujuan eksplisit sebelum UX; keputusan stack pada tahap architecture.
- Lavish AXI hanya digunakan jika tersedia dan instalasinya disetujui pengguna.

## Ide pengguna, belum otomatis menjadi scope MVP
- Area/ruangan dan tugas per area; estimasi durasi, kesulitan, poin, frekuensi.
- Jadwal harian/mingguan atau interval sejak selesai.
- Penugasan oleh Admin atau pemilihan tugas oleh Member.
- Konfirmasi Admin untuk tugas tertentu sebelum pemberian poin.
- Riwayat penyelesaian, saldo poin, katalog dan penukaran reward.

## Usulan untuk dikonfirmasi
- Mulai dari tugas yang ditetapkan Admin; pengambilan tugas bebas ditunda.
- Mulai dari interval sejak penyelesaian yang sah; kalender tetap ditunda.
- Poin tetap per tugas; reward dikelola manual di luar aplikasi pada MVP.

## Pertanyaan lanjutan terbuka
- Akses tiap anggota di perangkat bersama/pribadi, serta kebutuhan akun anak tanpa email.
- Persetujuan atas batas awal penugasan dan penjadwalan interval.
- Kebutuhan penukaran reward dalam aplikasi dan aturan verifikasi penyelesaian.

## Jawaban putaran kedua yang terkonfirmasi
- Identitas individual; Parent login sederhana dan aman, akses anak tanpa email. Mekanisme dipilih di architecture; perangkat pribadi cukup untuk MVP.
- Parent menugaskan tepat satu anggota; sekali jalan atau interval sejak penyelesaian sah. Untuk tugas terverifikasi, interval sejak persetujuan. Tugas terlambat tetap overdue.
- Poin tetap; tanpa verifikasi langsung diberikan, dengan verifikasi setelah persetujuan. Wajib mencegah kredit ganda dan mencatat koreksi pembatalan.
- Pengguna menginginkan katalog reward, permintaan Member, keputusan Parent; pemenuhan manual. Minta evaluasi kompleksitas dan alternatif sebelum scope final.
- Pengguna meminta draft D1 untuk review, melarang pemilihan stack dan lanjut UX sebelum approval eksplisit.

Draft scope dan aturan usulan tersedia di `docs/PRODUCT.md` revisi D1. Catatan ini bukan bukti approval; discovery menunggu review/approval, tahap lain belum dimulai.
