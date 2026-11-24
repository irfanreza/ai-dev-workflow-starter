# WF-ARCH-DEPLOY-001 P2 — revisi minimal setelah independent review

- Status: **APPROVED dan APPLIED pada 11 target; validasi ulang setelah perbaikan test isolation lulus**.
- Tanggal: 24 November 2026 (Asia/Jakarta).
- Baseline aturan aktif: commit `1acf62152376fb0b9dc09c0e1da792c149f291df`.
- Riwayat: [proposal P1](WF-ARCH-DEPLOY-001.md) dan [patch P1](WF-ARCH-DEPLOY-001.patch) dipertahankan utuh. Arah konseptual diterima reviewer menurut laporan pengguna; itu bukan approval penerapan P1 atau P2.
- Patch review: [WF-ARCH-DEPLOY-001-P2.patch](WF-ARCH-DEPLOY-001-P2.patch).
- SHA-256 patch P2: `280845462425443fc1e3b98efd08b9433750b322d776631430ae70b6817e5b78`.
- P2 adalah **patch kumulatif terhadap aturan aktif**, bukan delta yang diterapkan setelah P1. Jika nanti disetujui, gunakan hanya P2 setelah memeriksa baseline; jangan menerapkan P1 lalu P2.

## Tujuan dan batas

Pertahankan pemisahan Architecture Design, Capacity Planning dan Deployment Planning dari P1. Architecture tetap implementable dan sebisa mungkin vendor-neutral, dengan capacity envelope berupa asumsi traffic/concurrency/request rate/data serta rentang CPU/RAM/storage, formula, ketidakpastian dan batas validitas. Estimasi bukan benchmark.

RPO/RTO, security, durable committed data, backup terverifikasi, recovery, retensi dan acceptance criteria tetap bagian desain yang wajib. Yang boleh ditunda hanya keputusan infrastruktur konkret yang belum diperlukan; bukan requirement atau bukti yang sudah jatuh tempo.

Revisi dibatasi tiga temuan review. Tidak ada stage baru, perubahan helper/config/schema, aturan aktif, state, PRODUCT D2, CR-N06-001/addendum, UX R3, A1, keputusan pengguna atau approval evidence. Tidak ada A2, Implementation, commit, push atau deployment.

## Ringkasan P1 ke P2

| Temuan | Koreksi P2 |
| --- | --- |
| Provider seolah wajib pada semua release | Hosting/provider selection dapat `not applicable` dengan alasan untuk CLI, library, aplikasi lokal/offline atau proyek tanpa managed deployment. Release tidak memaksa pilihan yang tidak relevan. Kewajiban lain tetap dinilai sesuai requirement. |
| Deferred deployment checks bisa memblokir seluruh QA | Setiap deferred verification mencatat requirement/check, owner, due gate, required evidence dan blocking untuk QA/Release/both/neither. Mandatory QA criteria tetap menghalangi QA completed; release-only checks tidak otomatis menghalangi QA. |
| Feasibility terlalu umum sebagai alasan early provider research | Majukan hanya keputusan terkait dependency konkret implementability/mandatory test, user hard constraint, atau konflik material yang didukung evidence. Catat requirement, contract/test, bukti, alternatif dan alasan penundaan tidak aman. Harga belum diketahui bukan bukti konflik. |

Scope tetap10modifikasi dan1template baru seperti P1; tidak ada target file tambahan. Patch P2 berisi120baris tambahan/4baris dihapus terhadap aturan aktif, dibanding111/4 pada P1. Perubahan utama berupa penajaman kalimat, metadata verification dan dua skenario acceptance tambahan.

## 1. Deployment not applicable

`Not applicable` adalah penilaian applicability, bukan approval dan bukan waiver. Contoh sah: library hanya menghasilkan package/artifact dan tidak dikelola sebagai layanan, CLI/local app tanpa hosting, atau aplikasi offline tanpa managed deployment.

Alasan harus menyatakan mengapa hosting/provider tidak dibutuhkan dan requirement mana yang tetap berlaku. Misalnya aplikasi lokal yang menyimpan data masih harus memenuhi durability/backup/security yang ditetapkan produknya; tidak boleh menandai semuanya N/A hanya karena tidak ada cloud. Jika masih ada kebutuhan distribution, external identity atau dependency terkelola yang mengikat desain, evaluasi dependency itu secara spesifik.

Pada release, keputusan provider yang relevan harus selesai pada due gate-nya; keputusan yang memang tidak relevan dan memiliki alasan tidak menjadi blocker. Produksi yang benar-benar akan di-deploy tetap membutuhkan approval eksplisit.

## 2. QA blockers versus Release blockers

| Kategori verifikasi | Due gate dan perlakuan |
| --- | --- |
| Mandatory QA acceptance criterion | Evidence wajib sebelum QA completed. Jika membutuhkan target environment, siapkan Deployment Planning sebelum pengujian tersebut saat stage terkait aktif. |
| Target check khusus release readiness | Boleh tetap terbuka ketika QA selesai bila bukan mandatory QA criterion; menjadi blocker Release sampai bukti tersedia. |
| Check diperlukan oleh QA dan Release | Tandai `both`; due gate terawal tetap berlaku, sehingga wajib terpenuhi sebelum QA completed. |
| Check tidak menghalangi kedua gate | Tandai `neither` dengan alasan dan due gate bila masih dijadwalkan; tidak boleh dipakai untuk mengecualikan criterion yang wajib. |

Record minimum: requirement/check, owner, due gate, required evidence, dan QA/Release blocking status. Penempatan gate berasal dari requirement dan rencana verifikasi yang disepakati, bukan dipilih belakangan agar stage mudah selesai. Jangan mengubah mandatory QA criterion menjadi release-only tanpa approval perubahan requirement secara eksplisit.

Contoh: fungsi transaksi dan tenant isolation yang wajib pada QA diuji dengan database representatif; pemeriksaan konfigurasi domain produksi yang hanya disyaratkan untuk release tetap release blocker. Bila requirement QA sendiri mensyaratkan pengukuran pada target environment, requirement itu tetap QA blocker. Local pass tidak membuktikan performance/recovery provider target.

## 3. Early provider decision yang objektif

Majukan keputusan hanya jika ada hubungan konkret dengan pekerjaan/requirement yang tidak dapat diselesaikan dengan aman sambil menundanya. Batasi penelitian pada keputusan yang terdampak; tidak otomatis memilih seluruh paket/region/provider stack.

| Alasan sah | Evidence yang diperlukan |
| --- | --- |
| Code bergantung pada API/SDK/runtime spesifik provider | Identifikasi contract/code boundary yang berubah dan mengapa alternatif netral tidak cukup untuk memulai implementasi. |
| Mandatory test memerlukan capability target yang tidak tersedia di lingkungan lokal representatif | Sebut criterion, capability/test gap dan due gate; identifikasi apakah memblokir QA atau Release. |
| User mewajibkan provider atau constraint residency yang mengikat | Referensi keputusan pengguna dan dampaknya pada desain, data atau testing. |
| Konflik material dengan feasibility/hard budget/requirement | Bukti kebutuhan resource/durability/security dan batasnya, kelas alternatif yang dievaluasi, serta mengapa konflik tidak dapat ditunda. Jangan menyatakan harga pasti tanpa sumber. |

Alasan yang tidak cukup: quotation belum ada, region belum dibandingkan tanpa constraint lokasi, ingin mencari promo, quota free-tier dari kandidat yang belum dipilih, atau klaim umum bahwa feasibility memerlukan riset vendor. Ketidakpastian harga saja bukan blocker Architecture kecuali evidence menunjukkan konflik material terhadap hard budget atau requirement.

Jika user secara eksplisit meminta exploratory vendor research, hasilnya boleh diberikan dalam scope permintaan, tetapi tidak otomatis berubah menjadi prerequisite approval Architecture. Ketergantungan yang ditemukan kemudian terhadap desain approved ditangani melalui impact analysis/change control, bukan perubahan kontrak diam-diam.

## File yang diusulkan terdampak

| Target patch | Alasan perubahan |
| --- | --- |
| `AGENTS.md` | Ringkas aturan early dependency, N/A dan QA/Release gates lintas skill. |
| `.codex/skills/workflow-router/SKILL.md` | Routing planning sebelum dependent work tanpa aktivasi release state terlalu awal. |
| `.codex/skills/architecture/SKILL.md` | Definisi early decision beserta contoh valid/invalid, capacity envelope, N/A dan deferred verification. |
| `.codex/skills/implementation/SKILL.md` | Coding against approved contracts tanpa menuntut provider final; advance hanya dependency konkret. |
| `.codex/skills/qa/SKILL.md` | Mandatory QA versus release-only checks, evidence dan larangan reclassification diam-diam. |
| `.codex/skills/release/SKILL.md` | Conditional applicability provider dan penyelesaian applicable Release blockers. |
| `README.md` | Panduan tiga workstream dan penjelasan N/A/blocking status. |
| `docs/DECISION-TEMPLATE.md` | Metadata N/A, bukti early dependency dan verifikasi dengan blocking status. |
| `docs/RELEASE-TEMPLATE.md` | Applicability, actual cost bila relevan dan registry QA/Release checks. |
| `docs/ACCEPTANCE.md` | Kriteria/skenario untuk local release, objektivitas early decision dan pemisahan blocker. |
| `docs/ARCHITECTURE-TEMPLATE.md` (baru dalam diff) | Template design/capacity/handoff dengan applicability, contoh dependency dan verification gates. |

## Approval gates dan state setelah P2

1. Architecture boleh approved secara eksplisit bila desain dan capacity assumptions cukup untuk implementasi, kontrak wajib ditentukan, dan tidak ada unresolved implementation-blocking deployment dependency. Provider boleh deferred atau N/A dengan alasan. Capability feasibility harus didukung argumentasi/bukti yang proporsional, bukan janji kosong atau kewajiban otomatis membeli cloud.
2. Implementation boleh dimulai setelah approval Architecture, prerequisite stage dan otorisasi implementasi terpenuhi. User stop instruction tetap berlaku. Belum ada izin implementasi aplikasi dari proposal ini.
3. Provider/plan/region/actual all-in cost diputuskan saat applicable Deployment Planning sebelum dependent implementation, mandatory testing atau Release yang membutuhkannya. Spending di luar otorisasi dan production deployment tetap memerlukan approval eksplisit; jika N/A, tidak ada pemilihan provider fiktif.
4. QA completed membutuhkan seluruh mandatory QA evidence. Release completed/approval membutuhkan seluruh applicable Release evidence dan keputusan due pada gate tersebut; release-only checks tidak menghambat QA.
5. State tetap enam stage: discovery, ux, architecture, implementation, qa, release. Menyiapkan planning lebih awal tidak memajukan release state sebelum prerequisite. Tidak perlu mengubah `scripts/workflow.py`, config atau schema: helper memeriksa struktur/urutan/marker evidence, bukan semantik blocker/N/A. Review manusia tetap diperlukan.

Baseline pilot dan A1 tetap utuh. P2 hanya mengusulkan perubahan kit reusable, tidak mengubah AC proyek atau menerima risiko baru. Penataan ulang A1 memerlukan instruksi tersendiri. Target RTO dan penerimaan risiko operator tetap terpisah, bukan bukti target terpenuhi.

## Validasi dan batas evidence

- `git apply --check docs/workflow/WF-ARCH-DEPLOY-001-P2.patch`: exit0.
- `git apply --check --whitespace=error docs/workflow/WF-ARCH-DEPLOY-001-P2.patch`: exit0.
- `git apply --numstat`:11target,120baris tambahan/4dihapus. Ini pemeriksaan patch tanpa penerapan.
- `python scripts/workflow.py validate`: exit0, `Workflow validation passed`.
- `git diff HEAD --exit-code`: exit0; seluruh aturan aktif dan file tracked tetap identik baseline. P1 proposal/patch dipertahankan byte-identik. Hanya dua artefak P2 dibuat.
- Pemeriksaan integritas akhir mencakup hash P1/P2, link proposal, state dan ketiadaan target terlarang pada patch. Tidak ada skill validator atas aturan yang diterapkan, uji perilaku, benchmark, runtime atau deployment yang diklaim lulus.

Skenario regression berikut masih rencana: CLI/library release tanpa provider; mandatory QA target check menahan QA; release-only target check tidak menahan QA tetapi menahan Release; mandatory criterion tidak boleh direlabel untuk bypass; dependency provider-specific yang nyata diselesaikan awal; harga belum diketahui tidak memicu vendor-selection gate; evidenced hard-budget conflict diekskalasi; scope proyek tetap dihormati.

## Permintaan approval historis — sebelum penerapan

Review **WF-ARCH-DEPLOY-001 P2 beserta patch dengan hash di atas**. Approval arah konseptual bukan approval penerapan. Sampai approval eksplisit, P2 tetap proposal dan tidak aktif. Approval kit nanti tidak otomatis mengotorisasi A2, Implementation aplikasi, state transition, pembelian atau deployment.

STOP menunggu approval eksplisit pengguna. Tidak menerapkan patch, commit atau push.


## Approval penerapan dan audit pelaksanaan — 24 November 2026

Pengguna memberikan approval eksplisit untuk menerapkan hanya11target berdasarkan patch SHA-256 `280845462425443fc1e3b98efd08b9433750b322d776631430ae70b6817e5b78`:

> Saya menyetujui WF-ARCH-DEPLOY-001 P2 untuk diterapkan pada reusable AI Development Workflow Kit.

Approval hanya untuk kit, bukan Architecture aplikasi. Pengguna mewajibkan berhenti tanpa commit jika ada kegagalan validasi. Baseline saat penerapan `1acf62152376fb0b9dc09c0e1da792c149f291df`, branch `test-discovery-v2`, remote origin GitHub yang sudah tersimpan. Working tree awal hanya memiliki4dokumen/patch P1/P2 untracked, tanpa perubahan tracked.

P2 diperiksa hash dan dry-run bersih, lalu hanya patch P2 diterapkan; P1 tidak diterapkan. Rekonstruksi isi patch terhadap HEAD dibandingkan file aktual: persis10file existing berubah+1template baru. Sebanyak87tracked files lain tetap byte-identik, termasuk PRODUCT/CR/addendum/UX/A1/approval pilot/scripts/config/state. P1 proposal/patch tetap byte-identik dan patch P2 tidak diubah.

| Pemeriksaan aktual | Hasil |
| --- | --- |
| Hash/baseline/branch dan dry-run `git apply --check --whitespace=error` | PASS sebelum penerapan |
| Diff aktual dibanding hasil P2, `git diff --check`, integritas baseline | PASS |
| `python scripts/workflow.py validate` pada workspace pilot | Exit0, Workflow validation passed |
| `/usr/bin/python3 .../skill-creator/scripts/quick_validate.py` untuk7skill repository | Seluruhnya exit0, Skill is valid. Python default tidak memiliki PyYAML; interpreter sistem tersedia tanpa instalasi |
| Suite existing4test dengan ROOT/STATE fixture starter sementara |4PASS, state pilot tidak diubah |
|8state-helper behavioral regressions pada fixture sementara |8PASS: provider deferred ke implementation; CLI release N/A; QA selesai dengan release-only pending; release sebelum QA ditolak; architecture tanpa marker approval ditolak; implementation sebelum architecture ditolak; finalized stage tidak dibuka ulang; resume6stage tanpa field provider |
| Perintah CI persis `python -m unittest discover -s tests -v` pada workspace pilot | Exit1; FAIL, lihat output berikut |

Fixture sementara memakai TemporaryDirectory dan mock ROOT/STATE proses pengujian saja; file state pilot tidak disentuh. Ini membuktikan perilaku helper/urutan/marker, bukan kemampuan agen menilai semantik hard constraint, kebenaran QA evidence atau mandatory vs release-only. Independent multi-session agent behavior, vendor feasibility nyata, benchmark, cloud/deployment dan environment-target tests belum diuji. Tidak mengklaim root CI lulus dari hasil fixture.

Output perintah CI workspace:

```text
Workflow validation passed
test_default_state (test_workflow.WorkflowTests.test_default_state) ... FAIL
test_stages (test_workflow.WorkflowTests.test_stages) ... ok
test_ux_approval_required (test_workflow.WorkflowTests.test_ux_approval_required) ... ok
test_validate (test_workflow.WorkflowTests.test_validate) ... ok

======================================================================
FAIL: test_default_state (test_workflow.WorkflowTests.test_default_state)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "/home/irfan/playground/ai-dev-workflow-regression/tests/test_workflow.py", line 10, in test_default_state
    self.assertEqual(data["stages"]["discovery"], "pending")
    ~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: 'completed' != 'pending'
- completed
+ pending


----------------------------------------------------------------------
Ran 4 tests in 0.002s

FAILED (failures=1)
```

Hasil: berhenti tanpa commit atau push sesuai instruksi. `test_default_state` mengharapkan discovery pending, sedangkan pilot yang disimpan sudah completed. Test/script/config/state tidak diubah untuk membuat hasil hijau. Perbedaan asumsi fixture ini sudah ada sebelum patch; approval saat ini tidak mencakup perbaikan test atau perubahan state. Perubahan kit yang sudah diotorisasi dan bukti audit dibiarkan untuk review berikutnya.


## Resolusi test isolation dan validasi ulang — 24 November 2026

Riwayat kegagalan di atas dipertahankan; bukan regresi P2 dan tidak dihapus untuk menyatakan seolah root CI sudah lulus sejak awal. Pengguna kemudian menyetujui perbaikan hanya `tests/test_workflow.py`, dengan daftar fixture stage diambil dari `workflow.STAGES`, tanpa mengubah helper/config/state. Pengguna mengotorisasi dua commit terpisah dan push hanya bila seluruh pemeriksaan berhasil.

Perbaikan: TemporaryDirectory per test, fixture proyek baru tanpa membaca state pilot, patch ROOT/STATE, addCleanup yang memulihkan path sebelum menghapus directory, dan negative test completed-discovery tanpa evidence. Fungsi load/validate tidak dimock dan assertion lama tidak dihapus. File pendukung fixture hanya memenuhi pemeriksaan existence yang memang dilakukan helper saat ini; bukan pengujian config schema atau fungsi init yang belum tersedia.

| Pemeriksaan setelah perbaikan | Hasil aktual |
| --- | --- |
| `PYTHONDONTWRITEBYTECODE=1 python -m unittest discover -s tests -v`, run1 |5test PASS, exit0 |
| Perintah yang sama, run2 |5test PASS, exit0 |
| Suite pada salinan scripts/tests dalam TemporaryDirectory dengan state luar fresh |5test PASS, exit0; state luar byte-identik sebelum/sesudah |
| Suite pada salinan scripts/tests dengan state luar discovery/UX completed dan architecture in_progress |5test PASS, exit0; state luar byte-identik sebelum/sesudah |
| Pemeriksaan cleanup dalam proses Python yang sama, pada kedua fixture luar |PASS; setelah suite ROOT/STATE kembali ke path awal, state luar tetap identik |
| `python scripts/workflow.py validate` pada workspace pilot asli |Exit0, Workflow validation passed |

Fixture luar fresh/running dibuat sintetis dari workflow.STAGES dan generic approval evidence, bukan salinan state/approval pilot. Scripts/tests disalin, tetapi tidak diubah di salinan. Suite berjalan melalui runner unittest yang sama seperti CI. Seluruh negative missing-evidence test menggunakan validator asli pada state sementara yang invalid; ini memastikan kegagalan validasi tidak ditutupi. Validasi pilot tetap merupakan command terpisah seperti CI.

Audit diff akhir mempertahankan isi11target kit persis patch P2 approved; satu-satunya perubahan kode tambahan yang diotorisasi adalah tests/test_workflow.py. P1 proposal/patch, patch P2 dan seluruh baseline pilot/scripts/config/state tidak diubah. Commit direncanakan terpisah: test isolation lebih dahulu agar tidak membuat commit P2 dengan known failing CI, kemudian11target kit+4dokumen proposal/patch audit P1/P2. Dokumen proposal adalah audit trail; hanya AGENTS/skills/panduan/template yang menjadi aturan aktif. Tidak ada penerapan ulang patch P2.

Keterbatasan tetap: validasi skill dan tests helper tidak membuktikan independent agent behavior, semantik QA evidence/provider feasibility, cloud performance atau deployment readiness. Tidak ada aplikasi/Architecture A2/Implementation/deployment atau stage transition dari perubahan kit/test ini. Approval kit dan test bukan approval Architecture pilot.


Catatan whitespace audit: unified diff menyimpan context blank line sebagai satu spasi yang merupakan format patch. Whitespace generik pada staged documentation/code diperiksa dengan `git diff --cached --check -- . ':!docs/workflow/*.patch'`; dua artefak patch dijaga hash-nya, dan whitespace target perubahan P2 diperiksa melalui `git apply --check --whitespace=error` sebelum penerapan serta pemeriksaan reverse dry-run setelah penerapan. Tidak men-strip context spaces karena akan mengubah audit hash. Reverse dry-run memakai --check saja dan tidak membatalkan/menerapkan ulang patch.
