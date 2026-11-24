# WF-ARCH-DEPLOY-001 P1 — pisahkan design, capacity dan deployment planning

- Status: **PROPOSED — menunggu approval pengguna, belum diterapkan**.
- Jenis: perubahan reusable workflow kit, bukan perubahan fitur/arsitektur aplikasi pilot.
- Tanggal sesi:23November2026 (Asia/Jakarta).
- Baseline audit: commit `1acf62152376fb0b9dc09c0e1da792c149f291df`.
- Otorisasi saat ini hanya audit dan proposal/diff. Tidak mengubah aturan aktif, PRODUCT/CR/UX/approval, A1, state atau membuat A2/Implementation.
- Diff review: [WF-ARCH-DEPLOY-001.patch](WF-ARCH-DEPLOY-001.patch).
- SHA-256 diff P1: `20f08c0a05dae9d4d55d6eb4440aa4c77378692e9457e1bdf0ed394604702d7a`.

## 1. Hasil audit dan penyebab coupling

| Sumber aktif | Observasi | Dampak dan koreksi minimal yang diusulkan |
| --- | --- | --- |
| [.codex/skills/architecture/SKILL.md](../../.codex/skills/architecture/SKILL.md), baris6 | Satu instruksi mencampur `hosting` dan `deployment` dengan data/API/auth/reliability, lalu meminta approval sebelum implementation. Tidak membedakan kapan provider harus dipilih. | Sumber coupling paling langsung: dapat ditafsirkan seluruh keputusan hosting harus matang sebelum approval desain. Pisahkan design/capacity dari concrete deployment; definisikan pengecualian hard constraint. |
| [README.md](../../README.md), baris3 dan15–18 | Mengatakan stack-neutral, tetapi hanya menjelaskan urutan stage dan approval umum. | Belum ada batas keputusan/gate. Tambahkan tabel tanggung jawab tiga workstream tanpa stage baru. |
| [AGENTS.md](../../AGENTS.md), baris13/18/20 | Melarang memilih teknologi sebelum constraints dan mewajibkan approval arsitektur/deployment. Aturan ini benar, tetapi tidak membahas deferral provider. | Tambahkan aturan lintas skill untuk implementability/capacity/deferral, pertahankan gate keamanan dan production approval. |
| [workflow-router](../../.codex/skills/workflow-router/SKILL.md) | Resume dan stage routing ada, tetapi tidak ada pemisahan deployment planning. | Tambahkan routing keputusan deployment ke release planning, atau lebih awal bila dibutuhkan; tidak menuntut aktivasi release state lebih awal. |
| [implementation](../../.codex/skills/implementation/SKILL.md) | Traceability ke approved architecture benar; belum jelas apakah approved berarti vendor juga final. | Tegaskan provider belum dipilih bukan blocker tunggal; izin implementasi dan stop pengguna tetap dihormati. |
| [qa](../../.codex/skills/qa/SKILL.md) | Menuntut bukti aktual, tetapi belum membedakan estimasi capacity, local tests dan target-environment validation. | Jangan membawa kebutuhan bukti target environment mundur menjadi blocker desain; planning dapat dikerjakan saat QA aktif. Mandatory AC tetap harus terbukti sebelum gate terkait lulus. |
| [release](../../.codex/skills/release/SKILL.md) dan [release template](../RELEASE-TEMPLATE.md) | Environment tercantum, tetapi provider/plan/region/biaya/contract validation tidak diberi rumah yang eksplisit. | Jadikan bagian Deployment Planning tempat keputusan konkret, kemampuan provider, actual all-in cost dan target checks. Production approval tetap terpisah. |
| [DECISION-TEMPLATE.md](../DECISION-TEMPLATE.md) | Tidak ada scope design/capacity/deployment, implementation-blocking reason atau disposition deferred. | Tambahkan metadata ringkas supaya keputusan yang belum jatuh tempo tidak dibaca sebagai blocker approval. |
| Template Architecture | Belum tersedia dalam kit; A1 disusun ad hoc. | Tambahkan satu template reusable yang memisahkan design, workload/resource estimates dan register deferred decisions. Tidak perlu skill atau template deployment baru karena release template dapat menampungnya. |
| [ACCEPTANCE.md](../ACCEPTANCE.md) | Menilai pilihan teknologi/data/API/keamanan, tetapi belum menguji perilaku penundaan provider atau kapasitas eksplisit. | Tambahkan AC dan skenario regression yang menguji batas tiga workstream. |
| [scripts/workflow.py](../../scripts/workflow.py), baris9–11/21–30/35–51; config | Gate mesin memeriksa urutan enam stage, evidence dan marker approval; **tidak ada syarat provider/region/harga**. | Tidak perlu perubahan script, schema/config atau migrasi state. Gate isi/evidence diperjelas pada instruksi; helper bukan evaluator semantik arsitektur. |

Tidak ditemukan aturan eksplisit yang mewajibkan memilih vendor sebelum implementation. Masalahnya adalah scope bercampur dan batas approval yang tidak dinyatakan, diperkuat interpretasi agen. Permintaan A1 pilot sebelumnya memang mencantumkan topology dan biaya all-in, sehingga penelitian provider saat itu memiliki otorisasi; temuan regression bukan alasan menyalahkan seluruh riset itu atau membatalkan instruksi pengguna. Kit perlu membedakan analisis deployment opsional dari syarat universal approval desain.

Capacity pilot sebelumnya menyebut batas anggota/task/activity dan asumsi RAM/CPU, tetapi belum menurunkan traffic, concurrency dan request rate secara eksplisit. Angka provider yang presisi tidak menutup kekurangan model beban ini. Proposal memperbaiki cara mengestimasi, bukan mengarang benchmark tambahan.

## 2. Batas kerja dan gate yang diusulkan

| Workstream | Wajib sekarang / hasil | Boleh ditunda | Gate |
| --- | --- | --- | --- |
| Architecture Design | Components, runtime/framework/database yang cukup spesifik untuk coding, model/constraints, API, auth, authorization, transaction/concurrency/idempotency; durability, security, backup/recovery/RPO/RTO, observability dan rencana verifikasi. | Implementasi infrastruktur vendor tertentu bila kontraknya dapat dipenuhi kelas infrastruktur yang realistis. | Explicit architecture approval; tidak boleh ada unresolved deployment dependency yang benar-benar menghalangi implementasi. |
| Capacity Planning | Facts vs assumptions; traffic pattern, active concurrent users vs in-flight requests, average/peak request rate, data growth/retention, CPU/RAM/primary/temp/backup-storage ranges, formula/uncertainty dan batas validitas. | Benchmark aktual sampai ada implementasi; estimasi harus diperbarui dari hasil ukur, bukan dilabeli hasil. | Mendukung kelayakan desain. Tidak otomatis membutuhkan harga paket aktual atau resource cloud yang dibeli. |
| Deployment Planning | Pilih provider/plan/region, actual dated all-in estimate, config/secrets, kuota/failure modes/fallback serta bukti bahwa lingkungan memenuhi capability dan capacity envelope desain. | Biasanya menjelang release readiness; dapat dibawa maju saat user meminta atau implementasi/QA butuh keputusan konkret. | Keputusan/biaya sesuai otorisasi, mandatory target checks sebelum gate terkait, dan explicit production deployment approval. |

Vendor-neutral berarti menghindari ketergantungan cloud yang tidak diperlukan; bukan membiarkan database engine, protokol transaksi atau runtime yang dibutuhkan kode tetap kosong. Contoh kelas: tool lokal tanpa backend, satu server dengan storage persisten, app+SQL service, atau platform managed/serverless dengan capability yang sesuai. Tidak otomatis merekomendasikan cluster, broker atau vendor tertentu.

Keputusan ditunda harus menyebut scope, reason, owner, due gate, required evidence dan apakah implementation-blocking. `Deferred` bukan `approved`, juga bukan izin menghapus requirement. Contoh: provider SQL ditunda sampai target QA; dukungan transaction/unique constraint/durable commit sudah merupakan contract desain yang diputuskan sekarang.

Jika user mengikat identity/cloud provider, runtime vendor mengubah API/persistence, atau tidak ada kelas infra realistis memenuhi constraints, evaluasi lebih awal dengan alasan dan alternatif. Budget tetap boleh memblokir kelayakan desain bila ada konflik material yang nyata; yang dihapus adalah otomatisasi “belum punya quotation provider => arsitektur tidak boleh approved”. Proposal tidak menyuruh menunda konflik budget/reliability yang sudah diketahui sampai deployment.

## 3. Diff minimal yang dapat direview

Diff P1 mengusulkan **10 file diubah dan1 template baru**, seluruhnya generic tanpa nama proyek/provider/harga pilot:

| Target dalam patch, belum diterapkan | Perubahan |
| --- | --- |
| `AGENTS.md` | Dua aturan lintas stage tentang pemisahan, capacity estimates, deferral dan approval. |
| `.codex/skills/workflow-router/SKILL.md` | Satu paragraf routing/batas gate. |
| `.codex/skills/architecture/SKILL.md` | Ganti instruksi campuran dengan design/capacity/decision-boundary; rujuk template. |
| `.codex/skills/implementation/SKILL.md` | Satu paragraf provider bukan blocker tunggal; implement against contracts. |
| `.codex/skills/qa/SKILL.md` | Satu paragraf estimates/local/target evidence dan kapan planning diperlukan. |
| `.codex/skills/release/SKILL.md` | Tempatkan concrete Deployment Planning dan capability/cost/release checks. |
| `README.md` | Tabel tiga workstream, cara deferral dan kompatibilitas enam stage. |
| `docs/DECISION-TEMPLATE.md` | Status/scope/constraint/blocker metadata dan deferral owner/due/evidence. |
| `docs/RELEASE-TEMPLATE.md` | Perjelas bagian Deployment Planning, current all-in cost, capability dan target evidence. |
| `docs/ACCEPTANCE.md` | Tambahkan perilaku/gate dan skenario regression. Checklist tetap kriteria target, tidak dicentang sebagai sudah lulus. |
| `docs/ARCHITECTURE-TEMPLATE.md` (baru di dalam patch) | Design, capacity table/formulas/validity, kelas infrastruktur, decision register, handoff dan explicit approval. File aktif belum dibuat. |

Tidak mengubah product-discovery, UX skill, product template, Python helper, config, CI atau test code: aturan di sana tidak mewajibkan provider final. Ini menghindari penambahan stage/machinery dan perubahan yang tidak diperlukan. Tidak mengubah skill global pengguna; semua target skill berada di kit repository.

## 4. Dampak workflow state

- Tetap enam stage: discovery → ux → architecture → implementation → qa → release. Capacity Planning menjadi bagian evidence Architecture, bukan state terpisah.
- Deployment Planning menjadi workstream dengan due gate, umumnya bagian release readiness; boleh disiapkan saat Implementation/QA/Architecture bila ada alasan eksplisit atau permintaan pengguna. Menulis rencana tidak berarti melakukan transition release in_progress sebelum prerequisite selesai.
- Jika kelak desain sudah implementable dan approved eksplisit, architecture dapat completed dengan evidence desain/capacity/deferral; provider belum final tidak menghalangi implementation yang memang sudah diotorisasi. Tidak otomatis memulai implementation saat user meminta berhenti.
- QA tetap tidak boleh completed bila mandatory AC yang memerlukan target environment belum terbukti. Resolve deployment planning saat QA aktif bila perlu; local tests atau capacity estimate tidak menggantikan bukti target environment.
- Production deployment memerlukan explicit approval terpisah. Approval arsitektur tidak mengizinkan pembelian, biaya melebihi otorisasi, public sharing atau deployment.
- Helper hanya menguji struktur/urutan/evidence marker, bukan kualitas atau isi dokumen. Jangan menambahkan field provider sebagai gate mesin tersembunyi.
- Pada proposal ini tidak ada transisi/migrasi state; pilot tetap discovery/ux completed, architecture in_progress, implementation/qa/release pending.

## 5. Dampak terhadap A1 pilot — analisis saja

Seluruh A1/ADR tetap draft/proposed dan tidak diubah. Approval kit kelak tidak menjadi approval A1 atau otorisasi A2. Mapping berikut adalah rekomendasi penataan bila pengguna kemudian meminta revisi artefak pilot:

| Artefak A1 sekarang | Perlakuan pada revisi yang nanti diotorisasi |
| --- | --- |
| Stack aplikasi, model data, API, family serialization, ledger/idempotency, auth/security dan timezone | Tetap bahan Architecture Design untuk review. PostgreSQL sebagai engine dapat diputuskan tanpa sekaligus memilih Neon. Google OIDC adalah preferensi/constraint pengguna yang tetap relevan pada desain; tidak otomatis ditunda bersama cloud host. |
| A1 resource assumptions | Lengkapi workload envelope dan confidence/resource bounds dari capacity model, tanpa mengklaim footprint sudah diukur atau10anggota=10request concurrent. |
| `A1-operations-cost.md`, topology/provider diagrams dan ADR-005 hosting | Pisahkan analisis provider/harga/region/kuota ke Deployment Planning sebagai kandidat, bukan syarat universal approval desain. Angka lama tetap analisis historis/asumsi, bukan biaya approved. A1 saat ini tidak dihapus atau ditafsirkan ulang sebagai sudah netral. |
| Backup/recovery/monitoring/deletion design dan ADR-006 | Required capability tetap dalam Architecture: committed durability, verified restore, independence/failure domains, retention, deletion/security registry, RPO/RTO. Detail Railway/R2/Healthchecks menjadi deployment candidate bila tidak diperlukan sebagai hard constraint. |
| Traceability/risiko/test plan | Bedakan design feasibility blockers, implementation evidence dan target-deployment checks. RPO/performance/security tests tetap wajib sesuai due gate, bukan dihapus. Quota/paid fallback milik deployment plan kecuali saat ini membuktikan desain tidak layak. |

PRODUCT D2 N-07 meminta budget dan tujuan pemulihan dikonfirmasi di Architecture sebelum memilih solusi; pengguna telah mengonfirmasi targetnya. Ini tidak sama dengan kewajiban provider/actual invoice final sebelum Architecture. Kit tidak boleh mengubah requirement proyek atau CR secara implisit: bila instruksi spesifik proyek memang mensyaratkan keputusan deployment lebih awal, hormati atau minta change control tersendiri.

N-06+CR/addendum, UX R3/hash, approval historis dan keputusan risiko RTO operator tunggal tetap utuh. Target RTO24jam bukan SLA terjamin dan bukan bukti pencapaian. Risiko provider/quota/RPO/performa belum otomatis diterima; pemindahan waktu keputusan bukan penerimaan risiko.

## 6. Rencana regression setelah approval penerapan kit

Skenario berikut **belum dijalankan** sebagai uji perilaku. Hindari test yang hanya mencari kata/heading di skill.

| Skenario input | Perilaku yang diharapkan / kegagalan yang harus dicegah |
| --- | --- |
| Proyek baru multi-user, tidak ada provider constraint | Architecture menghasilkan contract implementable dan capacity assumptions, provider ditandai deferred owner/due/evidence. Tidak memaksa pilihan akun/paket cloud untuk approval. |
| Desain di atas approved dan user mengizinkan implementation lokal | Mulai vertical slice against approved contracts tanpa provider final; jangan membeli/deploy. Jika user meminta stop, tetap berhenti. |
| Tool browser-only/offline | Bandingkan kelas lokal dan tandai metrik backend non-applicable; tidak memaksa server/cloud atau angka RPS palsu. |
| Provider/runtime tertentu diwajibkan pengguna dan membatasi transaksi/driver | Evaluasi dependency lebih awal dengan alasan; jangan menunda incompatibility sampai implementation. |
| Budget panduan tanpa rencana pembelian | Jelaskan resource envelope/kelas infra dan trade-off; jangan memblokir approval karena belum ada live quotation. |
| Constraint budget/capability benar-benar tidak mungkin dipenuhi kelas yang dievaluasi | Laporkan feasibility conflict dan minta keputusan; jangan menyembunyikannya sebagai deferred price atau menurunkan reliability diam-diam. |
| Provider ditunda tetapi request rate/ukuran data melebihi asumsi | Tandai batas validitas capacity dan revisi estimasi; jangan mengarang benchmark atau mempertahankan approval pada perubahan material tanpa review. |
| Mandatory QA recovery/performance butuh target environment | Siapkan deployment plan saat QA aktif; jangan complete QA/AC tanpa evidence atau activate release state lebih awal. |
| Deployment provider tidak mendukung durability/backup/retensi desain | Tolak kelayakan deployment, cari alternatif atau change control; jangan gunakan approval desain sebagai izin menurunkan contract. |
| Production deployment diminta tanpa approval | Tahan deployment dan minta approval eksplisit; jangan menganggap architecture/implementation approval cukup. |

Setelah perubahan benar-benar diotorisasi, skill yang berubah dapat diperiksa dengan validator skill-creator serta uji perilaku terisolasi sesuai otorisasi. Dry-run patch hari ini bukan bukti regression behavior lulus. Tidak membuat test/migration state baru pada tahap proposal.

## 7. Bukti pemeriksaan proposal

- File patch dibuat dari isi target dalam memory; target tidak ditulis.
- `git apply --check docs/workflow/WF-ARCH-DEPLOY-001.patch`: exit0; patch dapat diterapkan pada baseline saat ini. Ini dry-run, bukan `git apply`.
- `git diff --exit-code`: exit0 setelah pembuatan patch; semua file tracked masih identik dengan HEAD. Tidak ada aturan aktif atau artefak pilot yang berubah.
- `python scripts/workflow.py validate`: exit0, `Workflow validation passed`.
- `git apply --check --whitespace=error docs/workflow/WF-ARCH-DEPLOY-001.patch`: exit0; context dan whitespace patch valid tanpa menerapkannya.
- `git apply --numstat` menunjukkan11target:10modifikasi dan1template baru,111baris tambahan/4baris dihapus. Pemeriksaan Python inline: target patch tidak menyentuh state/script/baseline/A1/UX, isi tambahan tanpa hardcode proyek/provider/angka budget pilot, hash patch cocok, seluruh local file links proposal valid, template baru hanya ada di diff.
- `git diff HEAD --exit-code`: exit0; semua file tracked, termasuk aturan aktif dan baseline/A1 pilot, tetap identik dengan commit audit. Hanya dua file proposal/patch yang dibuat.
- SHA-256 PRODUCT tetap `ab1832277cd3a8314244b285727e46b74a9e93d5817013e3b9dad1f92a6388fa`; UX R3 tetap `512aa9f01784a0a7fb0b69e458abaa892740d73acbbc887725c9ed9ddcb1328b`; state tetap `7e62652db9ef3c2d937b63b26e9c65adbf58dae777cb0dfec99fa15e008360c0`.
- Pemeriksaan ini hanya audit/dry-run konsistensi. Suite behavioral, skill validator atas aturan baru, benchmark atau runtime tests belum dijalankan karena aturan belum diterapkan.

## 8. Approval yang diminta

Setujui **WF-ARCH-DEPLOY-001 P1 dan patch dengan hash di atas** untuk diterapkan pada11target kit, atau beri revisi. Saat ini approval **belum ada** dan patch **belum diterapkan**. Approval nanti hanya untuk perubahan kit; tidak mengotorisasi A2, perubahan baseline/approval pilot, state transition atau Implementation aplikasi.

STOP menunggu review dan approval pengguna. File proposal/patch ini tidak menjadi aturan workflow aktif.
