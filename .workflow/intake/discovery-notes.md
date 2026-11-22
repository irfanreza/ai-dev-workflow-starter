# Catatan discovery

Status: spesifikasi D2 disetujui eksplisit; discovery completed. Belum ada keputusan stack. Instruksi pengguna: jangan mulai UX dahulu.

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

## Usulan awal — historis, ditindaklanjuti pada jawaban berikutnya
- Mulai dari tugas yang ditetapkan Admin; pengambilan tugas bebas ditunda.
- Mulai dari interval sejak penyelesaian yang sah; kalender tetap ditunda.
- Poin tetap per tugas; usulan awal reward di luar aplikasi kemudian direvisi: katalog, permintaan dan keputusan masuk MVP, hanya pemenuhan di luar aplikasi.

## Pertanyaan lanjutan awal — sudah dijawab pada putaran kedua
- Akses tiap anggota di perangkat bersama/pribadi, serta kebutuhan akun anak tanpa email.
- Persetujuan atas batas awal penugasan dan penjadwalan interval.
- Kebutuhan penukaran reward dalam aplikasi dan aturan verifikasi penyelesaian.

## Jawaban putaran kedua yang terkonfirmasi
- Identitas individual; Parent login sederhana dan aman, akses anak tanpa email. Mekanisme dipilih di architecture; perangkat pribadi cukup untuk MVP.
- Parent menugaskan tepat satu anggota; sekali jalan atau interval sejak penyelesaian sah. Untuk tugas terverifikasi, interval sejak persetujuan. Tugas terlambat tetap overdue.
- Poin tetap; tanpa verifikasi langsung diberikan, dengan verifikasi setelah persetujuan. Wajib mencegah kredit ganda dan mencatat koreksi pembatalan.
- Pengguna menginginkan katalog reward, permintaan Member, keputusan Parent; pemenuhan manual. Minta evaluasi kompleksitas dan alternatif sebelum scope final.
- Pengguna meminta draft D1 untuk review, melarang pemilihan stack dan lanjut UX sebelum approval eksplisit.

## Review D1 dan permintaan revisi D2
- Pengguna menyetujui arah MVP dan rekomendasi U-01–U-05 dengan penegasan; meminta D2 dan approval eksplisit terpisah sebelum UX.
- Reward tetap mencakup katalog, permintaan dan keputusan Parent. Tidak mereservasi saldo; UI wajib menyatakan reward belum dijamin sebelum disetujui.
- Pembatalan hanya penyelesaian terbaru yang belum diikuti pengajuan berikutnya. Koreksi boleh membuat saldo negatif; Parent wajib melihat peringatan serta dampak sebelum konfirmasi.
- Maksimal satu pengajuan pending per occurrence; tidak membuat occurrence berikutnya saat pending. Verifikasi diri Parent diperbolehkan dengan audit trail.
- Interval dari waktu sah; waktu pengajuan dan persetujuan ditampilkan terpisah.
- Metrik pilot adalah hipotesis evaluasi, bukan jaminan keberhasilan.
- Identitas proyek: `household-task-management`.

## Approval D2 dan titik resume
- Pengguna menyetujui eksplisit spesifikasi D2, scope MVP, Must/Should/Could, acceptance criteria, U-01–U-05, non-goals dan risiko.
- Evidence persetujuan: `docs/PRODUCT-D2-APPROVAL.md`; spesifikasi disetujui: `docs/PRODUCT.md` D2; baseline D1 tetap `docs/history/PRODUCT-D1.md`.
- Pengguna meminta transisi discovery completed, validasi, lalu berhenti tanpa memulai UX. Tahap lain tetap pending; tunggu instruksi pengguna untuk memulai UX saat resume.
