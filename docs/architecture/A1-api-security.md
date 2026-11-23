# A1 — kontrak API, identity dan security

Status: **DRAFT — belum approved**, bagian [A1](../ARCHITECTURE-A1.md). Kontrak ini spesifikasi untuk review, bukan endpoint yang sudah tersedia atau implementasi auth.

## Konvensi

Base `/api/v1`, JSON UTF-8, same-origin HTTPS, cookie sesi opaque. `P`=Parent aktif, `M`=Member aktif, `A`=keduanya sesuai ownership. Scope keluarga berasal sesi, tidak ada endpoint publik yang menerima family_id sebagai izin. UUID path tidak memberi hak akses. Seluruh mutasi bisnis membutuhkan CSRF+Origin yang benar dan `Idempotency-Key` acak per aksi; perubahan entity membutuhkan `expectedVersion`. Pengecualian khusus auth dijelaskan terpisah dan tidak menyimpan credential dalam command ledger.

Response sukses `{data, meta:{requestId,serverTime,familyVersion,replayed?}}`; list `{items,nextCursor}`. Error `{error:{code,message,fields?,retryable,current?},meta:{requestId,serverTime}}`, pesan Indonesia. `current` hanya projection yang caller boleh baca. 400 invalid format, 401 tanpa sesi, 403 peran tak boleh, 404 resource tidak ada/tidak boleh dilihat lintas tenant, 409 state/version/insufficient balance, 422 nilai domain invalid, 429 rate limited, 503 unavailable/transaction retry exhausted. Tidak memaparkan constraint names, SQL, issuer token atau data tenant lain.

Command yang sudah ditolak secara domain memiliki outcome refused tersimpan; retry key semula mengembalikan penolakan semula dengan projection kondisi terkini yang boleh dilihat, bukan menerapkan aksi baru. Setelah meninjau ulang, keputusan baru memakai key baru. Error transport/infrastruktur sebelum hasil tersimpan tetap dapat di-retry dengan key yang sama. Input/auth invalid ditolak sebelum menjalankan command bisnis dan tidak menyimpan credential error payload.

Semua list keyset cursor opaque terikat filter/scope, default25/max50. Date-time output RFC3339 instant UTC plus familyTimezone dan label waktu lokal; input tenggat `{localDateTime,timeZone}` divalidasi server. Semua data personal `Cache-Control: private, no-store`; JSON endpoint tidak di-cache CDN/Next shared cache. Pengguna tidak mengirim amount ledger atau saldo yang dipercaya server.

## DTO keluaran utama

| DTO | Field yang ditampilkan |
| --- | --- |
| SessionView | memberId, displayName, role, familyId/timeZone, permissions; tidak ada token/hash/passphrase |
| TaskView | taskId/version, title, area{id,name}, assignee{id,name}, points, needsVerification, intervalDays, archived, currentOccurrence{id,version,dueAt,status,overdue}, lastEffectiveCompletion |
| SubmissionView | id/version, occurrence, assignee, submittedAt, decidedAt/actor, reason, status, selfVerified, rulesSnapshot minimum; label diajukan/disetujui terpisah |
| AccountView | memberId, balance, netEarned, validCompletionCount; contribution dan balance bukan hal yang sama |
| RewardRequestView | id/version, reward/nameSnapshot, costSnapshot, member, requestedAt, status, decisionAt/reason, manualFulfilment=true; pending tidak mereservasi |
| RewardPreview | request/version, rewardActive/version, balance, costSnapshot, shortage, balanceAfter, canApprove, reviewToken, stateChanged=false/true; pending tetap pending |
| CorrectionPreview | completion, reasonRequired, originalCredit, correctionDebit, balanceBefore/After, wouldBeNegative, originalDueAt, successorRetired, taskRemainsArchived, allowed/blockers, reviewToken |
| HistoryView | actor/assignee, submitted/decision/corrected timestamps, reasons, pointImpact, selfVerified, effective/cancelled, relatedEntity; tidak mengembalikan auth secrets |

`reviewToken` berisi fingerprint versi/fakta yang ditampilkan, ditandatangani server dan terikat entity+family+actor, TTL10menit. Bukan otorisasi, bukan reserve poin. Server tetap membandingkan data terbaru di bawah family lock. Token expired atau dampak berubah=>409 REVIEW_REQUIRED dengan preview terbaru, **tanpa aksi**. UI memerlukan keputusan lagi setelah menampilkan fakta terbaru, sesuai R3.

## Endpoint Must

| ID | Method/path | Aktor, request | Sukses / kegagalan domain penting | Trace |
| --- | --- | --- | --- | --- |
| API-01 | GET `/auth/google/start` | Parent candidate; optional invite reference server-issued | 302 ke Google; state/nonce/PKCE terikat cookie attempt; invite invalid generic reject | F-01 |
| API-02 | GET `/auth/google/callback` | code/state tervalidasi; jangan log query | 303 ke UI bersih dan cookie sesi baru jika identity diprovision; akun tak diundang ditolak tanpa membuat keluarga | F-01/02 |
| API-03 | POST `/auth/member/login` | `{loginHandle,passphrase}`; tanpa credential dalam URL | 200 SessionView+cookie; error generik401, 429; tidak ada replay credential body | F-01 |
| API-04 | GET `/session` | A | 200 SessionView atau401 termasuk member nonaktif | F-01/02 |
| API-05 | POST `/auth/logout` | A; CSRF | 204, revoke session dan clear cookie; safe repeated logout | F-01 |
| API-06 | GET `/family` | A projection minimum | 200 nama/zona/anggota yang boleh dilihat, status setup | F-01/06 |
| API-07 | POST `/family/setup` | P, `{name,timeZone}` sekali setelah provisioning | 200; setup ulang409, timezone immutable setelah setup | F-01/U-04 |
| API-08 | GET `/members` | P | 200 daftar anggota/aktif tanpa credential | F-01/17 |
| API-09 | POST `/members` | P, `{displayName,loginHandle,passphrase}` | 201 M identity+point account; handle unavailable generik, invalid422. Passphrase tidak disimpan dalam command payload/result | F-01 |
| API-10 | POST `/members/{id}/reset-access` | P, fresh auth, `{newPassphrase,expectedVersion}` | 200; hash diganti, sessions revoked, tidak echo secret | F-01 |
| API-11 | POST `/members/{id}/deactivate` | P, `{expectedVersion}` | 200; blocker409 daftar task/submission/reward; member family lain404 | F-01/17 |
| API-12 | GET `/areas` | A untuk nama area relevan, P seluruh keluarga | 200 active/archived scoped | F-03/06 |
| API-13 | POST `/areas` | P, `{name}` | 201 AreaView | F-03 |
| API-14 | PATCH `/areas/{id}` | P, `{name,expectedVersion}` | 200 | F-03 |
| API-15 | POST `/areas/{id}/archive` | P, `{expectedVersion}` | 200 atau409 ACTIVE_TASKS | F-03 |
| API-16 | GET `/tasks` | A; scope=self untuk M, family untuk P; status/filter cursor | 200 TaskViews termasuk pending+overdue; empty array+role guidance | F-06/10 |
| API-17 | GET `/tasks/{id}` | owner M atau P | 200 TaskView+history summary, denied404 | F-02/06/11 |
| API-18 | POST `/tasks` | P, `{title,areaId,assigneeId,points,needsVerification,initialDue,intervalDays?}` | 201 task+occurrence, invalid422 | F-04 |
| API-19 | PATCH `/tasks/{id}` | P, editable fields+expectedVersion | 200; pending protected field409 PENDING_SUBMISSION | F-05 |
| API-20 | POST `/tasks/{id}/archive` | P, expectedVersion | 200; pending409 | F-05 |
| API-21 | POST `/tasks/{id}/reactivate` | P, expectedVersion | 200; area/assignee inactive409 | F-05 |
| API-22 | POST `/occurrences/{id}/submissions` | active assignee (P juga boleh), `{expectedVersion}` | 201 pending atau direct completion; repeated same occurrence200 canonical, tidak menambah efek | F-07/09 |
| API-23 | GET `/submissions` | P family queue; M histori milik sendiri | 200 scoped paginated | F-08/11 |
| API-24 | GET `/submissions/{id}` | P/owner M | 200 SubmissionView | F-08/11 |
| API-25 | POST `/submissions/{id}/approve` | P, expectedVersion | 200 completion+credit+successor atau409 STATE_CHANGED, self-verification flagged | F-08/09 |
| API-26 | POST `/submissions/{id}/reject` | P, `{reason,expectedVersion}` | 200 rejected+open occurrence due lama; blank reason422 | F-08/10 |
| API-27 | GET `/summary` | P family, M self | 200 overdue/pending/effective completions, contribution per authorized scope | F-06/11 |
| API-28 | GET `/history` | P family/M self; related task/submission/member filters scoped | 200 HistoryView pagination; no silent historical mutation | F-11/16 |
| API-29 | GET `/completions/{id}/correction-preview` | P | 200 CorrectionPreview; blocked preview allowed=false+reason | F-12 |
| API-30 | POST `/completions/{id}/correct` | P, `{reason,reviewToken}` | 200 reversal+schedule result; stale409 REVIEW_REQUIRED; next submitted409 NOT_CORRECTABLE | F-12 |
| API-31 | GET `/rewards` | M active katalog; P includes inactive | 200 reward+own balance+pending notice | F-13/16 |
| API-32 | POST `/rewards` | P, `{name,cost}` | 201; cost<=0/noninteger422 | F-13 |
| API-33 | PATCH `/rewards/{id}` | P, `{name?,cost?,active?,expectedVersion}` | 200; pending cost snapshots tetap, inactive blocks approval | F-13/16 |
| API-34 | POST `/rewards/{id}/requests` | M, `{expectedRewardVersion}` | 201 request cost snapshot atau200 existing pending; balance kurang409 tanpa create | F-14 |
| API-35 | GET `/reward-requests` | P family/M self; status cursor | 200 scoped RequestViews | F-15/16 |
| API-36 | GET `/reward-requests/{id}/preview` | P | 200 RewardPreview, termasuk kurang saldo/nonaktif/decided | F-15/R3 |
| API-37 | POST `/reward-requests/{id}/approve` | P, `{reviewToken}` | 200 approved+debit; stale409 REVIEW_REQUIRED, kurang409 tetap pending, inactive409 tetap pending | F-15/16 |
| API-38 | POST `/reward-requests/{id}/reject` | P, `{reason,reviewToken}` | 200 rejected tanpa debit; nonaktif tetap boleh; decided409 | F-15/16 |
| API-39 | GET `/points` | M self, P optional memberId scoped | 200 AccountView+point entries cursor | F-11/16 |
| API-40 | GET `/commands/{operation}/{key}` | original actor authorized | 200 original entity/result+status terbaru, not found404; tidak memaparkan payload credential | F-07/12/14/15/N-06 |

Member Parent yang menjadi assignee mengikuti F-07 termasuk credit. Request reward dalam draft dibatasi role Member sesuai F-14; tidak mengasumsikan Parent dapat mengajukan reward sendiri. Perlu review jika produk menghendaki perluasan. Tidak ada endpoint delete task/ledger, manual balance edit, refund, public signup atau fulfilment otomatis.

Contoh kegagalan persetujuan reward: `{error:{code:"INSUFFICIENT_POINTS",message:"Saldo belum cukup. Permintaan tetap menunggu.",retryable:false,current:{status:"pending",balance:20,costSnapshot:80,shortage:60}}}`. Kegagalan ini tidak memakai key baru secara otomatis; setelah kondisi berubah dan Parent memilih keputusan lagi, gunakan aksi baru yang menyertakan reviewToken terbaru. Retry request lama tidak mengubah hasil aksi lama menjadi persetujuan baru diam-diam.

## Google OIDC, akses anak dan sesi

Google: authorization code+PKCE S256, state/nonce one-use; discovery/keys issuer Google tetap, verifikasi signature/aud/iss/exp/nonce melalui library. Normalisasi issuer yang diterima dan gunakan issuer+sub sebagai identitas permanen, bukan email. Scope `openid email`, tidak meminta foto/profile luas, Gmail/Drive atau refresh token offline. Token Google hanya untuk login, bukan sesi otorisasi aplikasi. OAuth identity harus sudah terikat melalui provisioning/invitation operator; email verified yang cocok boleh membantu verifikasi undangan satu kali, tetapi tidak mengganti binding issuer/sub setelah terbentuk. Tidak auto-link akun berbeda hanya karena email sama. [Google OIDC](https://developers.google.com/identity/openid-connect/openid-connect).

Provisioning awal: operator membuat keluarga belum setup dan Parent bootstrap invitation acak>=128bit, TTL24jam, disampaikan melalui kanal privat yang disepakati. Parent membuktikan Google identity dan invitation; binding dilakukan sekali dalam transaksi, invitation dikonsumsi, kemudian setup nama/zona. Tidak ada profil dummy sebagai autentikasi. Google branding/subdomain personal pilot harus dibuktikan nanti; bila verifikasi domain diperlukan, ajukan biaya/domain, jangan mempublikasikan prototype. [Brand verification](https://developers.google.com/identity/protocols/oauth2/production-readiness/brand-verification).

Anak: login_handle unik dipilih/dibuat Parent, passphrase minimum15karakter (usulan draft; beri panduan frasa yang mudah diingat), hash Argon2id parameter awal OWASP minimum19MiB/t2/p1 lalu benchmark pada batas RAM. Tidak membuat credential dari tanggal lahir. Rate limit awal5gagal/15menit per handle dan20/15menit per IP dengan backoff; error generik dan tidak permanent-lock agar serangan tidak mudah memblokir anak. Counter DB menghindari reset limit pada redeploy; cleanup TTL24jam, IP tidak disimpan plaintext di log. Parameter UX/security ini menunggu review; tidak mengubah prototype. [Password storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html).

Opaque session256bit acak, hanya SHA-256 token di DB. Cookie `__Host-household_session`, Secure, HttpOnly, SameSite=Lax, Path=/, tanpa Domain; cocok redirect top-level Google. Rotate saat login/recovery, absolute7hari, idle24jam, fresh auth <=15menit untuk reset anak/generate recovery/delete request. Usulan expiry ini belum approved. Update last_seen dibatasi sekali/5menit pada request yang memang aktif, bukan heartbeat DB. Per-request status member/auth_version/recovery_epoch diverifikasi; nonaktif langsung ditolak. Authenticated mutation mengecek CSRF token dan Origin; tidak mengandalkan SameSite saja. OAuth callback mengikuti state/nonce (bukan business CSRF POST). [OWASP sessions](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html).

## Recovery Parent yang dipilih pengguna

Tambahan auth routes draft: POST `/auth/recovery-code/rotate` (P fresh-auth, CSRF, hasil code ditampilkan sekali tanpa log/cache, kode lama revoked); POST `/auth/parent-recovery/start` (rate limited, recovery code via body pada HTTPS, tidak auto-login); GET `/auth/parent-recovery/google/callback` (membuktikan issuer/sub akun baru pada request recovery); operator menyelesaikan melalui prosedur privileged terpisah, bukan endpoint admin publik.

Kode acak256bit dengan checksum format untuk mengurangi salah ketik, disimpan offline oleh Parent; simpan hash saja, jangan plaintext dalam commands/backup logs/chat. Setelah start, operator memverifikasi kode di environment terotorisasi, memeriksa family/member yang benar, proof akun Google baru yang belum terikat, serta konfirmasi melalui kanal offline/terdaftar yang disepakati saat provisioning. Operator tidak menerima bukti berupa nama/email saja. Request TTL24jam; kode belum consumed sebelum final rebind, competing request tidak boleh menghasilkan binding ganda.

Final transaksi: family lock, code valid+belum consumed, operator approval yang spesifik request+new-sub, revoke identity lama, insert binding baru, consume code, bump auth_version, revoke seluruh sesi Parent, audit actor/time/request-id tanpa kode. Kode yang sama tidak dapat dipakai lagi; retry hanya status hasil. Parent login Google baru lalu membuat kode pengganti. Jika kode dan akses Google sama-sama hilang, tidak ada bypass otomatis; operator menahan rebind sampai bukti pemulihan yang disepakati cukup. Operator best effort dapat menyebabkan pemulihan akun tertunda; bukan janji SLA. Latihan recovery wajib sebelum pilot.

Sebelum final rebind, operator menyimpan intent bertanda tangan pada prefix register keamanan di bucket register terpisah dan salinan offline terenkripsi: family/member UUID, request id, hash binding lama/baru dan waktu, tanpa kode atau profile. Setelah commit, tandai completed di register. Ini bukan transaksi atomik lintas DB/object store: intent yang belum jelas hasilnya menyebabkan recovery ditahan untuk rekonsiliasi, bukan auto-rebind. Register gagal=>jangan finalisasi. Pada disaster restore, invalidate seluruh recovery codes/sessions dan cocokkan binding Parent dengan register terbaru sebelum login dibuka agar akun Google lama dari snapshot tidak hidup kembali. Jangan menganggap snapshot merekam konsumsi kode yang terjadi sesudah titik pemulihan. Metadata keamanan minimal dipurge setelah semua snapshot lama yang relevan kedaluwarsa, sesuai prosedur retensi register.

Kanal verifikasi operator dan pengalaman login baru adalah titik review A1. A1 tidak membuat UI pengganti R3; jika implementasi memerlukan revisi UX authentication detail, lakukan review/approval terpisah sebelum perubahan artefak approved.

## Threat scenarios dan kontrol

| Ancaman | Kontrol desain dan uji kelak |
| --- | --- |
| Member memanggil API Parent atau ID keluarga lain | Per-request role/ownership, scoped repository, composite FK dan RLS; negative tests seluruh method/read/count/history |
| Pool memakai tenant sebelumnya | SET LOCAL dalam transaksi, fail-closed context kosong, test reuse koneksi A/B; tidak SET session global |
| Session theft/fixation atau sesi nonaktif | HTTPS, cookie flags, token hash, rotation, revoke/version per-request; no token URL/log/localStorage |
| OAuth login CSRF/replay/token akun lain | state/nonce/PKCE, exact callback, issuer/aud/signature/expiry, unique sub; test altered state/issuer/nonce |
| Credential guessing/recovery takeover | Argon2id, shared durable rate limit, code kuat sekali pakai, proof akun baru dan operator, tidak email-only rebind |
| XSS/CSRF/SQL injection | React escaping, hindari unsafe HTML, CSP, origin+CSRF, parameterized SQL, input/output schemas; jangan mengandalkan menu tersembunyi |
| Double spend/retry dua tab | DB family lock+conditional status+unique source ledger+commands+preview guard; fault injection |
| Backup bocor/diubah atau restore resurrect data | Enkripsi authenticated, key terpisah, least privilege per bucket/role, verifikasi unduh/restore, register penghapusan terpisah dan salinan offline |
| Runtime app compromised | Role nonowner dan grants minimum; app tidak punya key backup/register/operator. RLS tidak mengamankan bila penyerang menguasai seluruh app+semua konteks: perlakukan sebagai insiden, revoke secret/session |
| DoS/budget exhaustion | Body size limit, pagination, login limits, timeouts/query limits, usage alerts, resource limits terukur. Hard stop tidak dianggap mitigasi RTO gratis |
| Supply-chain/secrets di repo/telemetry | Pin patch/lockfile, review dependency, audit/security updates, env secret store, scrub OAuth query/passphrase/recovery/body; tidak kirim data keluarga ke monitor |

Tidak mengklaim kepatuhan hukum atau provider tanpa akses administratif. Privasi lokasi/subprocessor, akses akun provider MFA dan retensi provider harus direview sebelum pilot.
