# Cakupan UX R1/R2 — household-task-management

Sumber: PRODUCT D2 disetujui. Status: untuk review, bukan approval. Seluruh data dummy.

## Journeys

| Journey | Layar dan interaksi |
| --- | --- |
| J1 Akses dan setup | Masuk simulasi → setup keluarga/zona waktu → Keluarga → tambah anggota tanpa email, pulihkan akses, keluar |
| J2 Menyiapkan pekerjaan | Keluarga → area; Tugas → tambah/edit, arsip/aktifkan; tepat satu penanggung jawab |
| J3 Menyelesaikan | Masuk sebagai Nara/Bima/Parent → Tugas → detail → Tandai selesai; langsung sah atau pending |
| J4 Verifikasi | Verifikasi → detail waktu/assignee → setujui atau tolak dengan alasan; verifikasi diri ditandai |
| J5 Riwayat dan kontribusi | Ringkasan → kontribusi; Riwayat → detail, waktu pengajuan dan keputusan, transaksi/saldo |
| J6 Reward | Reward → katalog/edit; Member → minta → Parent → keputusan dengan biaya tersimpan dan pemeriksaan saldo |
| J7 Koreksi | Riwayat → batalkan penyelesaian terbaru → preview debit/saldo/jadwal → alasan → konfirmasi; perubahan dampak meminta konfirmasi ulang |

## Functional requirements Must

| ID | Layar / perilaku R1 | Cara review |
| --- | --- | --- |
| F-01 | Masuk, Keluar, Keluarga: tambah/nonaktif/pulihkan anggota | Masuk dummy, akun nonaktif ditolak; pemulihan demonstrasi tanpa memilih metode autentikasi produksi |
| F-02 | Menu per peran, kontrol aksi, panel skenario akses keluarga lain | Member mencoba layar Parent; akses ditolak tanpa isi keluarga lain; keamanan server belum diuji |
| F-03 | Keluarga: area tambah/edit/arsip | Arsip area bertugas aktif ditolak, area arsip tidak dipilih untuk tugas baru |
| F-04 | Form tugas: judul, area, anggota, poin, tenggat, interval/verifikasi | Nilai wajib dan bilangan bulat divalidasi dengan pesan Indonesia |
| F-05 | Detail tugas: edit/arsip/aktifkan | Pending mengunci perubahan; reaktivasi memeriksa area dan anggota; sejarah tidak berubah |
| F-06 | Ringkasan Parent, Tugas Member | Jumlah overdue/pending/selesai; arahan kosong sesuai peran |
| F-07 | Detail → selesai | Hanya assignee; aksi berulang tidak menambah pending/kredit; ditolak dapat diajukan ulang |
| F-08 | Verifikasi → setujui/tolak | Alasan wajib; keputusan ulang tidak berefek; Parent dapat memverifikasi diri dengan audit |
| F-09 | Riwayat + daftar tugas | Sekali jalan selesai hilang dari daftar aktif; interval menghasilkan giliran berikut dari waktu sah |
| F-10 | Badge overdue dan pending terpisah | Tugas pending lewat tenggat menampilkan keduanya; penolakan mempertahankan tenggat |
| F-11 | Riwayat/detail; kontribusi di Ringkasan | Waktu pengajuan/keputusan, pelaku, alasan, dampak poin, terakhir sah; kontribusi berbeda dari saldo |
| F-12 | Riwayat → koreksi | Preview, alasan wajib, negatif, batal tanpa perubahan, retry, perubahan dampak, batas pengajuan berikut |
| F-13 | Reward → tambah/edit/nonaktif | Nama dan biaya bulat positif; biaya permintaan terdahulu tetap |
| F-14 | Member → minta reward | Saldo cukup, satu pending/reward/Member, tanpa reservasi; penjelasan sebelum dan selama pending |
| F-15 | Parent → keputusan reward | Konfirmasi biaya; saldo terkini kurang → pending; tolak wajib alasan; retry tidak debit ganda |
| F-16 | Reward dan Riwayat | Saldo/transaksi per Member; Parent seluruh keluarga; pemenuhan manual; nonaktif tidak disetujui |
| F-17 | Keluarga → nonaktif | Daftar blocker tugas/pengajuan/reward; sejarah dipertahankan |

## States dan batas verifikasi

Panel “Skenario review” terpisah dari UI produk: normal, kosong, loading, gagal/retry, akses ditolak; fixture koreksi negatif dan konflik reward. Pending/overdue/sukses muncul dari interaksi normal. State global diterapkan pada semua halaman; error aksi berikutnya juga dapat disimulasikan tanpa mutasi sebagian. Fixture waktu dibekukan pada 22 Nov 2026 10.00 WIB, aksi memajukan jam simulasi. Persistensi hanya localStorage dummy; reset tersedia. Tidak ada backend, database, pilihan stack produksi, atau bukti keamanan/konkurensi produksi. Semua pemeriksaan peran dan idempotensi pada prototype bersifat ilustrasi lokal. Perbedaan tab disinkronkan saat storage event, bukan jaminan transaksi atomik.

Asumsi UX untuk review: nama tampilan “Ruang Bersama”, palet kertas hangat/hijau hutan, akses simulasi melalui identitas dummy. Mekanisme autentikasi, plafon biaya dan pemulihan produksi tetap A-01/A-02 pada architecture. Tambah area dilakukan pada Keluarga; verifikasi dan permintaan reward dipisah untuk mengurangi keputusan keliru. Tanggal zona keluarga terlihat; zona waktu terkunci sesudah setup.

Target review: lebar 360px dan 1280px, keyboard/fokus, label, status dengan teks, pesan kesalahan, kontras. Uji pilot S-01–05 serta kinerja/security N-01/03/05 bukan hasil tahap ini.

R2 mengubah bahasa UI sesuai UX-001 tanpa mengubah cakupan, aturan produk, atau interaksi D2. Istilah domain “sah” pada dokumen D2 tetap berlaku; UI memakai penjelasan selesai/disetujui Parent.
