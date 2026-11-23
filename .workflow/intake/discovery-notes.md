# Catatan discovery

Status terkini: Architecture discovery in_progress; pengguna sudah menjawab pertanyaan awal dan mengizinkan pendalaman evaluasi. Keputusan/preferensi pengguna terpisah di `.workflow/intake/architecture-user-decisions.md`; analisis, sumber harga dan pertanyaan tersisa di `.workflow/intake/architecture-discovery.md`. Discovery/UX completed; implementation/QA/release pending. PRODUCT D2, UX R3 dan approval evidence tidak boleh diubah tanpa change control. Belum ada keputusan arsitektur approved. STOP setelah pendalaman dan pertanyaan; jangan membuat Architecture Draft A1 atau implementation sebelum instruksi berikutnya. Catatan sebelumnya di bawah merupakan riwayat.

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

## Otorisasi dan resume UX R1
- Pengguna mengizinkan lanjut UX berdasarkan D2, seluruh journeys dan F Must dipetakan, prototype HTML responsif dengan data dummy, tanpa backend/database/stack produksi.
- Pengguna mengizinkan pemeriksaan sumber dan instalasi/penggunaan Lavish AXI lokal setelah penjelasan perintah, dependensi, konsekuensi keamanan; tidak mengizinkan publikasi/upload. Evidence pemeriksaan: `docs/ux/lavish-review.md`.
- Hasil: prototype review R1 `docs/ux/prototype/index.html`; pemetaan `docs/ux/coverage.md`; instruksi `docs/ux/README.md`; bukti `docs/ux/review.md`; identitas hash `docs/ux/revision.json`.
- STOP di review UX. Feedback bukan approval; belum ada approval revisi. Jangan architecture atau UX completed sebelum persetujuan eksplisit artefak tertentu.

## Feedback Lavish UX-001 → R2
- Pengguna bingung istilah “sejak sah”, meminta kata yang lebih umum. Pesan diterima via poll, bukan approval.
- R2 mengganti seluruh teks UI “sah” dengan selesai/disetujui Parent sesuai konteks; perilaku D2 tidak berubah.
- Bukti `docs/ux/R2-review.md`; hash aktif `docs/ux/revision.json`; arsip R1 `docs/ux/history/R1.html`. Tetap berhenti pada review, tanpa approval UX atau architecture.

## Feedback UX-002 → R3
- Pengguna meminta revisi interaksi persetujuan reward Parent: saldo/biaya/kekurangan sebelum keputusan, disabled bila kurang, penolakan tetap tersedia, pending dipertahankan, dapat diputuskan nanti dan perubahan data ditinjau sebelum diterapkan. Bukan approval UX.
- Konsisten dengan D2 F-14/F-15/F-16, tanpa perubahan aturan bisnis/reservasi. R2 diarsipkan `docs/ux/history/R2.html`; R3 aktif dan hash `docs/ux/revision.json`.
- Bukti interaksi, mobile/desktop, dua tab asli, timing/fokus dan Lavish sandbox: `docs/ux/R3-review.md`. Tetap berhenti pada review tanpa architecture.

## WF-CONFLICT-001 — keputusan mempertahankan D2
- Usulan occurrence langsung dibuat saat “Tandai selesai” meski pending dipakai pengguna hanya untuk menguji penanganan konflik requirement setelah approval.
- Agen mengidentifikasi konflik F-07/F-09/N-03/U-04 dan dampak terkait, menawarkan A (tetap D2) atau B (revisi scope dengan approval baru), lalu menunggu tanpa mengubah baseline.
- Pengguna memilih **A**, menegaskan tidak ada perubahan produk sebenarnya. Pertahankan D2 dan R3; tidak membuat D3 atau mengubah occurrence. Pilihan A bukan approval UX.
- Evidence pengujian manual dan verifikasi hash: `docs/workflow/WF-CONFLICT-001.md`. Resume final review UX R3 via Lavish; status workflow dan approval evidence tetap utuh.

## Approval eksplisit UX R3 — titik berhenti
- Pengguna menyatakan final review dan approval R3 untuk alur Parent/Member, tugas, verifikasi, poin, reward dan koreksi. Kutipan lengkap: `docs/ux/approval.md`.
- Hash yang dihitung ulang dan disetujui: `512aa9f01784a0a7fb0b69e458abaa892740d73acbbc887725c9ed9ddcb1328b`; cocok dengan manifest R3. Prototype dan D2 tidak diubah.
- Catat UX completed melalui `scripts/workflow.py transition` dengan evidence approval, lalu validasi. Discovery tetap completed; architecture/implementation/QA/release tetap pending.
- STOP setelah pelaporan. Approval UX bukan izin memulai architecture; tunggu instruksi pengguna berikutnya.
