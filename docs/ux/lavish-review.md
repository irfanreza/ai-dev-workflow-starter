# Pemeriksaan Lavish AXI untuk review lokal

Izin: pengguna secara eksplisit mengizinkan instalasi dan penggunaan lokal setelah pemeriksaan sumber serta penjelasan perintah/dependensi/konsekuensi. Tidak ada izin publikasi. Pemeriksaan dan penjelasan dilakukan sebelum instalasi dalam percakapan sesi UX R1, 22 November 2026.

Sumber primer diperiksa:
- Repository/README: https://github.com/kunchenguid/lavish-axi ; clone read-only untuk pemeriksaan di `/tmp/household-lavish-source`.
- Commit sumber yang diperiksa: `2b32b92ec8e8fcfb7069af3e1a89c0cabc3bf9aa`, package version `0.1.98`.
- Metadata npm: `npm view lavish-axi version repository homepage engines dependencies optionalDependencies scripts dist.integrity --json`.
- Kode `src/telemetry.js` (opt-out), `src/paths.js` (host), `src/server.js` dan `src/cli.js` (server, publikasi dan CLI).

Versi tetap yang dipasang: **lavish-axi@0.1.98**, Node minimum 22. Lingkungan aktual Node v24.6.0, npm 11.5.1. Metadata npm integrity: `sha512-LGadkBwrutayCodUzcuE68xZ5roAQr76tNq6UQQjyTAozZJZulbm2/3sHqq8IVxLa74aVrUnkLYi18emYlhlCQ==`. Ini pemeriksaan sumber terarah, bukan audit keamanan menyeluruh atau pembuktian kesamaan setiap byte source dan paket terbitan.

Perintah instalasi yang dijelaskan sebelum dieksekusi:

```bash
npm install --prefix .workflow/tools/lavish --ignore-scripts --no-audit --no-fund --save-exact lavish-axi@0.1.98
```

Hasil: exit 0, 91 paket ditambahkan. Unduhan registry memerlukan jaringan. `--ignore-scripts` menonaktifkan lifecycle scripts (sumber mendeklarasikan prepare/prepack build); paket distribusi sudah memiliki `dist/cli.mjs`. Tidak ada install global, hook sesi, plugin, atau perubahan stack aplikasi. Manifest dan lockfile instalasi lokal berada di `.workflow/tools/lavish/`, diabaikan Git. Perintah dapat mengunduh dependensi transitif yang sesuai range bila diulang tanpa lockfile lokal yang sama.

Dependensi langsung:

| Paket | Range/versi deklarasi | Kegunaan |
| --- | --- | --- |
| express | ^5.2.1 | Server review |
| ws | ^8.21.3 | Komunikasi lokal |
| chokidar | ^4.0.3 | Watch file |
| open | ^10.2.0 | Buka browser (dinonaktifkan wrapper) |
| parse5 | ^8.0.1 | Pemrosesan HTML |
| cross-spawn | 7.0.6 | Subproses |
| axi-sdk-js | ^0.1.8 | Infrastruktur CLI |
| @tailwindcss/browser | 4.2.4 | Aset tooling; prototype memakai CSS sendiri |
| daisyui | ^5.5.19 | Aset tooling; prototype memakai CSS sendiri |

Kode pihak ketiga dijalankan dengan akses file/proses pengguna. Sebagai mitigasi lokal, wrapper `scripts/ux-lavish.sh` menetapkan telemetry off, host `127.0.0.1`, port `57123`, state khusus workspace `.workflow/lavish`, dan tidak membuka browser otomatis. `ss -ltnp 'sport = :57123'` mengonfirmasi listener hanya di 127.0.0.1. State, log, dan feedback runtime lokal diabaikan Git. Prototype tidak memuat CDN/font luar; data dummy. Jangan memasukkan data pribadi dalam anotasi atau lampiran.

CLI/help aktual yang dibaca setelah pemasangan: `--help`, `design`, `poll --help`, `reply --help`, `playbook input`, `playbook table`. Perintah dijalankan lewat CLI lokal, ekuivalen penggunaan `npx -y lavish-axi@0.1.98`, agar versi tidak bergerak dan telemetry sudah off sejak eksekusi pertama. Tidak ada `share`, publish, upload, atau akses hosting publik yang dijalankan. UI Lavish menyediakan menu publikasi; adanya menu bukan izin menggunakannya.

Uji integrasi dilakukan melalui browser Lavish asli: masuk Nara, menyelesaikan tugas, saldo berubah 100 → 115 dalam iframe sandbox. Ditemukan localStorage diblokir sandbox; fallback memori ditambahkan dan diuji lewat interaksi itu. Pesan dummy dengan label **UJI INTEGRASI LOKAL — bukan feedback pengguna atau approval** dikirim dengan Send to Agent, diterima satu kali oleh `poll --owner ux-r1-integration-check`, dan dibalas lewat `reply` dengan receipt `status: sent`. Tidak ada feedback pengguna atau approval yang dihasilkan oleh tes ini. Pada handoff tidak ada listener otomatis aktif; feedback berikutnya dapat mengantre dan diambil saat agen dilanjutkan.
