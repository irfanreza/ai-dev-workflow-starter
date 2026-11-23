# A1 — traceability, rencana uji dan risiko review

Status: **DRAFT — belum approved**, bagian [A1](../ARCHITECTURE-A1.md). Semua test di bawah **planned / belum dijalankan**. Validasi dokumen tidak sama dengan hasil uji aplikasi. AC produk dan addendum CR tetap sumber penerimaan; tabel ini bukan penggantinya.

## Katalog pengujian yang direncanakan

| ID | Rencana bukti dan assertion |
| --- | --- |
| T-01 | Auth integration: Google issuer/aud/signature/state/nonce/PKCE dan identity uninvited ditolak; member login/logout, invalid credentials, rate limit; session revoked/nonaktif ditolak pada API langsung |
| T-02 | Dua tenant lengkap, Parent/Member masing-masing, ganti ID/list/detail/count/write/history, member baca saudara, mixed-family FK, pool connection reuse dan RLS context kosong/default deny; runtime role sungguhan bukan owner |
| T-03 | Area create/rename/archive dengan task aktif ditolak; histori tetap; invalid fields/poin/interval/area/assignee/nonaktif diuji pada API |
| T-04 | Edit/archive/reactivate task, pending protected-field lock, snapshots historis tetap, inactive area/assignee dan versi usang ditolak |
| T-05 | Submit direct/verified, assignee only, poin0, double-click dan dua request concurrent berbeda key, repeated same key, rejected deliberate resubmit baru vs replay lama, pending tanpa successor |
| T-06 | Approve/reject bersamaan, alasan wajib, self-verification audit, persetujuan berulang tidak kredit/successor ganda; rollback jika gagal sesudah ledger sebelum successor |
| T-07 | Recurring: approval vs submission timestamps, completion dini/terlambat, pending overdue, once-off hilang dari daftar aktif, penolakan due lama; contoh D2 dan DST gap/overlap, kalenderhari bukan24jam |
| T-08 | Summary/history: labels diajukan/keputusan terpisah, last valid completion setelah koreksi, validCompletionCount/netEarned vs balance sesudah reward, ownership dan pagination tidak bocor |
| T-09 | Correction preview/cancel/no side effect, debit kredit asli setelah task edit, boleh saldo negatif, stale balance/schedule perlu review ulang, archived task tetap archived, successor pernah rejected memblokir, correction-vs-next-submit serialized, recomplete menghasilkan kredit/successor generasi baru |
| T-10 | Reward catalog edit/inactive dan cost snapshot tidak berubah; blank/nonpositive/noninteger cost422 |
| T-11 | Request reward tanpa reservasi, satu pending per member/reward dua tab berbeda key, request berbeda boleh jika saldo cukup; saldo negatif/kurang ditolak tanpa create |
| T-12 | Dua approvals reward80 dari saldo100 bersamaan => maksimal satu debit, lainnya pending saldo20; approve-vs-reject/inactive/correction; retry uncertain commit; replay refused key setelah saldo naik tetap refused, keputusan baru butuh key baru; nonaktif tetap bisa reject; no refund/fulfilment otomatis |
| T-13 | R3 browser360/1280: saldo/cost/shortage/balanceAfter sebelum aksi, Setujui disabled saat kurang, Tolak tersedia, pending dapat dibuka lagi; live update/focus/tab/textarea preservation, stale final click409 tanpa mutasi |
| T-14 | Deactivate Member dengan blocker task/submission/reward; revoke existing sessions setelah berhasil, histori tetap dan akses langsung ditolak |
| T-15 | Ordinary fault injection: restart/redeploy/crash/network setelah commit tidak kehilangan data; response lost kemudian retry tidak duplikasi; rollback seluruh efek jika gagal sebelum commit. Jangan mensimulasikan hanya localStorage |
| T-16 | Backup pipeline actual encrypted upload-download-decrypt-restore setiap candidate, role/RLS/FK/ledger/reward/occurrence invariant checks; candidate gagal tidak menimpa last_verified. Hang job/skip/no heartbeat dan stale snapshot alarm diuji |
| T-17 | Disaster drill permanent storage loss: pilih last available verified, hitung incident_at-snapshot_at<=24jam, backup terbaru corrupt pilih sebelumnya dan laporkan bila >24jam; measure full RTO, revoked session/code/security binding reconciliation, deletion register apply, actual cutover smoke |
| T-18 | Privacy/delete drill: verified family request, write register fail/purge fail/idempotent retry, no orphan, restore backup pra-delete tidak resurrect family, temp copies/log7hari/backup14hari/registry expiry; tidak menghapus ledger individual |
| T-19 | N-05 pada10anggota/100task aktif/10.000aktivitas, fixed recorded device/network/region, browser usability bukan server latency saja. Masing-masing20pengukuran tasks/history halaman pertama >=19<=3detik; sertakan akses setelah idle+warm mix yang representatif, catat seluruh sampel. Tidak membangunkan DB dengan ping tersembunyi |
| T-20 | Semua Must states dan accessibility: empty/loading/error/retry/forbidden/success, keyboard/focus/dialog/live region, kontras>=4.5:1, tanpa horizontal scroll360/1280 dan label Indonesia. Reuse UX R3 journeys, bukan mengklaim evidence prototype sebagai test implementasi |
| T-21 | Parent recovery: rotate code fresh auth, offline storage instructions, rate-limit, wrong code/new identity/missing operator deny, concurrent consume satu binding, old session revoked, code unusable lagi; simulate operator unavailable tanpa bypass |
| T-22 | Cost/ops rehearsal: measure app RAM/CPU, SQL active hours, backups ukuran/durasi/temp compute, egress, tax invoice estimate+domain, quota forecast; test spending/backup alert. Daily dashboard checks/runbook drill dan fallback provisioning di lingkungan berizin |

Unit tests fokus aturan state/points/timezone, integration memakai PostgreSQL18 dan koneksi bersamaan dengan barrier deterministik, E2E memakai UI+API terotorisasi. Concurrency tidak dibuktikan hanya dengan sequential test atau mock mutex. Failure injection pada boundary transaksi dan setelah commit membedakan retry dari aksi baru. Commands `lint`, `typecheck`, `unit`, `integration`, `e2e`, `build` akan didefinisikan di implementation; belum ada package scripts untuk dijalankan.

## Traceability F-01–F-17

| Requirement | Komponen/model/kontrak A1 | AC sumber dan bukti rencana |
| --- | --- | --- |
| F-01 | Identity/Sessions, members/credentials/recovery; API-01–11, recovery routes | Login/logout/anak tanpa email/reset/nonaktif dari F-01; T-01/T-14/T-21; UX J1 |
| F-02 | Authorization, scoped read, RLS/composite FK; seluruh API | Direct access/tenant/role/ownership deny dari F-02; T-02; UX per-role/access-denied |
| F-03 | Family/Areas, areas; API-12–15 | Create/edit/archive-blocker/history dari F-03; T-03; UX J2 |
| F-04 | Tasks/Occurrences; API-18 | Required fields/satu assignee/integer poin/interval/initial due dari F-04; T-03/T-07; UX J2 |
| F-05 | Task version/snapshot/pending guards; API-19–21 | Protected edit/archive lock/reactivate/riwayat dari F-05; T-04/T-09; UX J2 |
| F-06 | Task query/Summary; API-16/17/27 | Own tasks/Parent counts/role empty states dari F-06; T-08/T-20; UX J3/J5 |
| F-07 | Submission state/commands/unique pending/family lock; API-22/40 | Assignee only/direct credit/one pending/retry/rejection resubmit dari F-07; T-05/T-15; UX J3 |
| F-08 | Verification/completion/audit; API-23–26 | Parent decisions/reason/self-verification/idempotency dari F-08; T-06; UX J4 |
| F-09 | Successor unique per completion/timezone; API-22/25 | Once-off/one successor only after effective completion dari F-09; T-05/T-06/T-07; UX J3/J4 |
| F-10 | Due query flags, occurrence due unchanged on rejection; API-16/26/27 | Pending+overdue/no auto-complete/old due dari F-10; T-07; UX task badges |
| F-11 | Events/ledger projections/contributions; API-24/27/28/39 | Actor/assignee/reason/time labels/last-cleaned/net contribution dari F-11; T-08/T-09; UX J5 |
| F-12 | Correction preview/version, reversal+retired successor; API-29/30/40 | Seluruh guard koreksi, original credit, negatif, reconfirmation dan atomicity dari F-12; T-09/T-15; UX J7 |
| F-13 | Rewards/cost snapshot; API-31–33 | Catalog validation/active/immutable requested cost dari F-13; T-10; UX J6 |
| F-14 | RewardRequest+unique pending+commands; API-34/35/40 | Sufficient request/one pending/retry/no reserve/notice dari F-14; T-11/T-13; UX J6 R3 |
| F-15 | Family transaction+SUM ledger+preview guard; API-36–38/40 | Current funds/exactly-one debit/insufficient stays pending/reject reason dari F-15; T-12/T-13; UX J6 R3 |
| F-16 | Account query/request scopes/manual fulfilment notice; API-31/35/38/39 | Self vs Parent history/status/no guarantee/inactive reject allowed dari F-16; T-02/T-10/T-12/T-13; UX J6 |
| F-17 | Member service/family lock/blockers/revoke; API-11 | Deactivate blocked until obligations settled/history retained dari F-17; T-14/T-02; UX J1 |

## Traceability N-01–N-08, UX dan change control

| Requirement/evidence | Komponen/keputusan A1 | Acceptance sumber dan rencana |
| --- | --- | --- |
| N-01 | Identity/Authorization/RLS/FK/least privilege/log redaction; ADR-002/004 | Seluruh aksi cek identity/role/family/ownership, tidak secrets URL/log; T-01/T-02/T-21 |
| N-02 | Minimum data, operator deletion, encrypted backup/register, log7hari/backup14hari; ADR-006 | Penghapusan/retensi minimum dan backup scope diputuskan pengguna; T-18/T-22; vendor retention tetap open |
| N-03 | Family lock, constraints D-01–08, commands, ledger, review token; ADR-003 | Double-click/retry/two-tab/concurrent, no next while pending, self-audit, balanceSUM, no silent history edit; T-05/06/09/11/12/15 |
| N-04 | React/CSS R3, localized errors, browser states |360/1280, keyboard, labels, contrast4.5:1; T-13/T-20; approval UX tidak membuktikan implementasi |
| N-05 | Bounded SQL indexes/pagination/pool and no idle polling; ADR-001/005 |10/100/10.000,19/20<=3detik pada profil tercatat; T-19/T-22; belum terukur |
| N-06 | Durable PostgreSQL plus verified disaster backup; ADR-002/006 | Redaksi persis CR-N06-001 P1; gangguan biasa zero committed loss, disaster RPO24h+integrity; T-15/T-16/T-17 |
| N-07 | Cost formula, environments, auth recovery, runbooks/restore/rollback/retention; ADR-004/005/006 | N-07 dan keputusan pengguna RPO/RTO24h; T-16/T-17/T-18/T-21/T-22; RTO residual bukan SLA |
| N-08 | Katalog T-01–22, traceability dan evidence format | Perintah/exit/environment/assertions/limits aktual kelak; tidak mengarang lulus test; seluruh planned tests dan laporan dokumen terpisah |
| UX R3 approved | J1 akses/setup; J2 area/task; J3 submit; J4 verify; J5 history/contribution; J6 reward; J7 correction | Coverage/review R3 dan hash immutable; T-01–14/T-20 sesuai journey. Detail mekanisme login produksi masih memerlukan review bila mengubah artefak UX |
| UX R3 reward refinement | API-36–38, polling hanya dialog/focus, guard server, typed errors, no reserve | T-12/T-13: insufficient disabled, pending retained, reject available, no textarea loss, no stale decision auto-apply |
| CR-N06-001 P1 | N-06 baru, storage/backup design, separate RTO risk | T-15/T-16/T-17; tidak mengubah wording CR atau memakai approval D2 lama sebagai approval perubahan |
| CR addendum ordinary1–4 | API retry/commands+durable DB+ephemeral app non-authoritative | T-15: commit response loss, rollback partial, redeploy storage bukan disaster exception |
| CR addendum disaster1–7 | snapshot_at/available_at/verified_at, independent manifest/register, consistent restore | T-16/T-17/T-18: valid backup selection, <=24h point age, whole-state restore, no resurrection/replay |
| CR addendum RTO/evidence | Incident timeline/end-to-end validation, no fabricated pass | T-17/T-22; target24h tetap; operator unavailable risk recorded separately |

## Gate review, risiko dan keputusan yang belum approved

| ID | Risiko / keputusan | Status dan langkah sebelum pilot |
| --- | --- | --- |
| A1-R01 | All-in121.500 dasar tetapi162.900 saat resource naik; penggunaan belum diukur | Stack/provider adalah rekomendasi. Buktikan footprint dan invoice lengkap; estimasi >150ribu perlu approval, tidak auto-upgrade |
| A1-R02 | Neon quota suspend sampai siklus berikut, tidak ada standby berbayar yang disetujui | Monitoring forecast dan fresh verified exports; perlu memilih/mendanai fallback yang dapat diuji atau menerima risiko quota khusus secara eksplisit. Ini belum tercakup penerimaan RTO operator |
| A1-R03 | N-05 termasuk DB cold starts/pooling/session checks, belum benchmark | T-19 pada data+jaringan representatif. Jangan menghapus idle samples atau menyatakan free-tier pasti memenuhi |
| A1-R04 | Backup pipeline dan verifikasi otomatis/job RAM/durasi/roles belum diuji | T-16/T-17 dan cost rehearse; RPO dihitung dari point last available verified. Risiko >24h kehilangan data belum diterima |
| A1-R05 | Operator best effort tanpa pengganti | Risiko >24h karena tidak tersedia **diterima pengguna khusus pilot**; mitigasi tetap wajib, tinjau sebelum ekspansi; bukan bukti target sudah terpenuhi |
| A1-R06 | Google subdomain/branding/personal pilot restrictions | Buktikan config Google dan private provisioning; jika domain dibutuhkan ajukan biaya cash/amortisasi sebelum memilih |
| A1-R07 | Recovery code proof/kanal operator, proposed session/passphrase/rate limits | Review kebijakan auth A1; exercise recovery dan usability anak, jangan bypass bila kode/Google hilang. UX auth detail yang berubah perlu approval terpisah |
| A1-R08 | Hari lokal pada DST gap/overlap belum dipilih eksplisit | A1 mengusulkan compatible resolution untuk recurring, input invalid reject. Review ADR-007; bila mengubah ekspektasi produk lakukan change control |
| A1-R09 | Family lock serialize write, conservatively stale unrelated changes | Sengaja sederhana; ukur contention dan T-13 dialog usability. Jangan mengganti dengan kompleksitas account locks sebelum bukti kebutuhan |
| A1-R10 | Provider logs/internal backups/lifecycle deletion tidak sama dengan retensi aplikasi | Dokumentasikan actual retention/subprocessor/location. Jangan klaim delete semua salinan seketika; ajukan jika berbeda dari kebijakan yang diterima |
| A1-R11 | Disaster dapat menghilangkan catatan konsumsi recovery/identity rebind dan transaksi reward nyata setelah snapshot | Restore revoke semua codes/sessions, reconcile binding dengan register keamanan operator dan reward range sebelum akses; T-17/T-21. Tidak menjanjikan exactly-once lintas kehilangan permanen catatan |

Review yang diminta kelak: ADR dan stack/deployment bersyarat, kebijakan auth/DST, serta tindakan pada trade-off biaya/reliability. Approval A1 tidak boleh disimpulkan dari izin menyusun dokumen. Gate sebelum Implementation adalah explicit architecture approval; gate release tetap QA/recovery evidence, biaya/domain/fallback berizin, dan approval release/deploy terpisah. Pada giliran ini berhenti untuk review; tidak mengubah status Architecture menjadi completed/approved.
