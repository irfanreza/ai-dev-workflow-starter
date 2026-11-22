// Run in the prototype document using agent-browser eval --stdin.
// Destructive only to dummy localStorage. Each case starts from UI Reset data R1.
(() => {
 const results=[];
 const click=(act,id)=>{const s=`[data-act="${act}"]${id!==undefined?`[data-id="${id}"]`:''}`;const e=document.querySelector(s);if(!e)throw Error('Missing '+s);e.click()};
 const fill=(id,value)=>{const e=document.getElementById(id);e.value=value;e.dispatchEvent(new Event('input',{bubbles:true}))};
 const submit=id=>document.getElementById(id).requestSubmit();
 const data=()=>JSON.parse(localStorage.getItem('ruang-bersama-ux-r1'));
 const bal=id=>data().ledger.filter(l=>l.member===id).reduce((s,l)=>s+l.amount,0);
 const assert=(ok,msg)=>{if(!ok)throw Error(msg)};
 const reset=()=>{if(document.getElementById('modal').open)click('close');click('reset');click('resetConfirm')};
 const login=id=>{fill('identity',id);submit('loginForm')};
 const run=(label,fn)=>{try{reset();fn();results.push({label,status:'PASS'})}catch(e){results.push({label,status:'FAIL',reason:e.message})}};
 run('F-01 / J1 setup, child without email, recovery and inactive login',()=>{
  fill('identity','d');submit('loginForm');assert(document.querySelector('#loginForm'),'Inactive user denied');
  click('setup');fill('familyName','Keluarga Pinus');fill('zone','Asia/Makassar');submit('setupForm');
  assert(document.querySelector('#main').textContent.includes('Asia/Makassar'),'Zone shown');
  click('memberForm');fill('memberName','Raka');submit('memberForm');assert(data().members.some(m=>m.name==='Raka'),'Child created');
  const id=data().members.find(m=>m.name==='Raka').id;click('recover',id);assert(document.querySelector('#modalBody').textContent.includes('Simulasi pemulihan selesai'),'Recovery view');click('close');
  click('deactivate',id);click('deactivateConfirm',id);assert(!data().members.find(m=>m.id===id).active,'Deactivated');
 });
 run('F-03/04/05/17 / J2 task and area validation, archive, blockers',()=>{
  login('p');click('nav','family');click('areaForm','a1');document.querySelector('#areaForm [name=active]').checked=false;submit('areaForm');assert(document.querySelector('#formError').textContent.includes('tugas aktif'),'Area blocked');click('close');
  click('areaForm');fill('areaName','Balkon');submit('areaForm');const a=data().areas.at(-1);assert(a.name==='Balkon','Area added');
  click('nav','tasks');click('taskForm');fill('points','-1');submit('taskForm');assert(document.querySelector('#formError').textContent,'Invalid form');fill('title','Lap meja balkon');fill('points','12');fill('area',a.id);fill('interval','0');submit('taskForm');const t=data().tasks.at(-1);assert(t.title==='Lap meja balkon','Task added');
  click('detail',t.id);click('taskForm',t.id);fill('title','Lap meja balkon depan');submit('taskForm');assert(data().tasks.at(-1).title.endsWith('depan'),'Task edited');click('detail',t.id);click('archiveTask',t.id);assert(!data().tasks.at(-1).active,'Archived');click('filter','archive');click('detail',t.id);click('archiveTask',t.id);assert(data().tasks.at(-1).active,'Reactivated');
  click('nav','family');click('deactivate','b');assert(document.querySelector('#modalBody').textContent.includes('Rapikan rak buku')&&document.querySelector('#modalBody').textContent.includes('Reward pending'),'Blockers enumerated');
 });
 run('F-06/07/09 / J3 direct completion + safe retry + next due',()=>{
  login('n');click('nav','tasks');assert(!document.querySelector('#main').textContent.includes('Rapikan rak buku'),'Only own tasks');click('detail','t1');click('complete','t1');assert(bal('n')===115,'One credit');const t=data().tasks.find(t=>t.id==='t1');assert(t.occ===2,'One following occurrence');const h=data().history.at(-1);assert(h.decided===h.submitted,'Direct valid time equals submission');assert(Date.parse(t.due)===Date.parse(h.decided)+86400000,'Due since valid');
  complete('t1',1);assert(bal('n')===115&&data().tasks.find(t=>t.id==='t1').occ===2,'Stale retry no duplicate');
 });
 run('F-07/08/10 / J3-J4 pending, overdue, rejection and resubmission',()=>{
  login('p');click('nav','verify');assert(document.querySelector('#main').textContent.includes('Terlambat'),'Pending also overdue');click('reviewTask','h2');click('taskReject','h2');assert(document.querySelector('#formError').textContent,'Reason required');fill('reason','Buku bawah belum rapi');click('taskReject','h2');assert(bal('b')===60,'Rejected gives no points');
  click('logout');login('b');click('nav','tasks');click('detail','t2');assert(document.querySelector('#modalBody').textContent.includes('Buku bawah belum rapi'),'Reason visible');click('complete','t2');assert(data().history.filter(h=>h.task==='t2'&&h.status==='pending').length===1,'One pending');assert(data().tasks.find(t=>t.id==='t2').occ===1,'No next while pending');
  click('logout');login('p');click('nav','verify');const h=data().history.at(-1);click('reviewTask',h.id);click('taskApprove',h.id);assert(bal('b')===80,'Credited once');click('nav','history');assert(document.querySelector('#main').textContent.includes('Keputusan Parent'),'Submission/decision distinct');
 });
 run('F-05/08/11 parent assignee self verification audit, pending locks',()=>{
  login('p');click('nav','tasks');click('detail','t4');click('complete','t4');click('detail','t4');click('taskForm','t4');assert(document.querySelector('#modalTitle').textContent==='Perubahan dikunci','Edit pending blocked');click('close');click('nav','verify');const h=data().history.at(-1);click('reviewTask',h.id);assert(document.querySelector('#modalBody').textContent.includes('Verifikasi diri'),'Self visible');click('taskApprove',h.id);assert(bal('p')===30,'Parent points');assert(data().history.at(-1).actor==='p','Actor audit');click('nav','history');assert(document.querySelector('#main').textContent.includes('Verifikasi diri'),'Self audit visible');
 });
 run('F-09 once-only completion disappears from active list',()=>{
  login('p');click('nav','tasks');click('taskForm');fill('title','Buang kardus');fill('assignee','p');fill('interval','0');submit('taskForm');const t=data().tasks.at(-1);click('detail',t.id);click('complete',t.id);assert(!document.querySelector('#main').textContent.includes('Buang kardus'),'Done removed');click('nav','history');assert(document.querySelector('#main').textContent.includes('Buang kardus'),'History retained');assert(document.querySelector('#main').textContent.includes('Selesai; tidak memerlukan persetujuan Parent'),'Direct completion wording');
 });
 run('F-12 / J7 cancellation close, negative preview, reason and correction',()=>{
  click('fixture','negative');click('cancelPreview','h1');assert(document.querySelector('#modalBody').textContent.includes('-20 poin'),'Negative preview');click('close');assert(bal('n')===10,'Close no mutation');click('cancelPreview','h1');click('cancelConfirm','h1');assert(document.querySelector('#formError').textContent,'Reason required');fill('cancelReason','Belum selesai');click('cancelConfirm','h1');assert(bal('n')===-20,'Debit applied');assert(data().tasks.find(t=>t.id==='t5').occ===1,'Original reopened');assert(data().history.find(h=>h.id==='h1').status==='cancelled','Original retained');assert(data().ledger.filter(l=>l.history==='h1').length===1,'One corrective transaction');
 });
 run('F-12 changed impact requires fresh confirmation',()=>{
  click('fixture','negative');click('cancelPreview','h1');fill('cancelReason','Belum selesai');click('changeImpact');click('cancelConfirm','h1');assert(document.querySelector('#formError').textContent.includes('Dampak berubah'),'Reconfirm requested');assert(bal('n')===15,'No debit before fresh confirmation');fill('cancelReason','Konfirmasi setelah meninjau');click('cancelConfirm','h1');assert(bal('n')===-15,'Updated debit');
 });
 run('F-12 cancellation blocked after next occurrence submission, even rejected',()=>{
  login('n');click('nav','tasks');click('detail','t5');click('complete','t5');const h=data().history.at(-1);click('logout');login('p');click('nav','verify');click('reviewTask',h.id);fill('reason','Coba lagi');click('taskReject',h.id);click('nav','history');click('cancelPreview','h1');assert(document.querySelector('#modalTitle').textContent==='Pembatalan tidak tersedia','Later submitted blocks');
 });
 run('F-13/14 / J6 catalog, stored cost, duplicate pending, no reservation',()=>{
  login('n');click('nav','rewards');click('requestPreview','r1');assert(document.querySelector('#modalBody').textContent.includes('tidak mereservasi saldo'),'Notice before');click('request','r1');assert(bal('n')===100,'No reservation');click('requestPreview','r1');assert(!document.querySelector('[data-act=request]'),'Duplicate blocked');click('close');click('requestPreview','r2');click('request','r2');assert(data().requests.filter(q=>q.member==='n').length===2,'Different allowed');click('logout');login('p');click('nav','rewards');click('rewardForm','r1');fill('cost','90');submit('rewardForm');assert(data().requests.find(q=>q.reward==='r1').cost===80,'Cost snapshot');
 });
 run('F-15/16 / J6 competing requests, insufficient funds stay pending',()=>{
  click('fixture','conflict');let qs=data().requests.filter(q=>q.member==='n');click('rewardReview',qs[0].id);click('rewardApprove',qs[0].id);assert(bal('n')===20,'First debited');click('rewardReview',qs[1].id);click('rewardApprove',qs[1].id);assert(document.querySelector('#formError').textContent.includes('tidak cukup'),'Insufficient message');assert(data().requests.find(q=>q.id===qs[1].id).status==='pending','Still pending');assert(bal('n')===20,'No second debit');fill('rewardReason','Saldo belum cukup');click('rewardReject',qs[1].id);assert(document.querySelector('#main').textContent.includes('bukan bukti reward sudah diserahkan'),'Fulfillment copy');
 });
 run('F-13/15 inactive reward cannot be approved, can be rejected',()=>{
  login('p');click('nav','rewards');click('rewardForm','r3');fill('cost','0');submit('rewardForm');assert(document.querySelector('#formError').textContent,'Cost >0');fill('cost','50');document.querySelector('#rewardForm [name=active]').checked=false;submit('rewardForm');click('rewardReview','q1');click('rewardApprove','q1');assert(document.querySelector('#formError').textContent.includes('nonaktif'),'Inactive blocked');fill('rewardReason','Reward tidak tersedia');click('rewardReject','q1');assert(bal('b')===60,'No debit');
 });
 run('F-02 member cannot manage Parent screens; cross-family denied',()=>{
  login('n');assert(!document.querySelector('[data-act=nav][data-id=family]'),'No admin menu');taskForm('t1');assert(document.querySelector('#modalTitle').textContent==='Akses ditolak','Management denied');click('close');click('denied');assert(!document.querySelector('#modalBody').textContent.includes('Cemara'),'No other-family content');
 });
 run('N-06 failed action is retryable without partial state',()=>{
  login('n');click('nav','tasks');click('detail','t1');click('failNext');click('complete','t1');assert(bal('n')===100&&data().history.length===2,'Failure unchanged');assert(document.querySelector('#formError').textContent.includes('Coba kembali'),'Retry instruction');click('complete','t1');assert(bal('n')===115,'Retry succeeds once');
 });
 run('States and responsive: all pages, all global states, no horizontal overflow',()=>{
  for(const who of ['p','n']){if(!document.querySelector('#loginForm'))click('logout');login(who);for(const pg of who==='p'?['home','tasks','verify','history','rewards','family']:['home','tasks','history','rewards']){for(const st of ['normal','empty','loading','error','denied']){click('nav',pg);fill('scenario',st);document.querySelector('#scenario').dispatchEvent(new Event('change'));assert(document.documentElement.scrollWidth<=innerWidth,`${who}/${pg}/${st} overflow`);assert(document.querySelector('h1'),`${pg}/${st} heading`)}fill('scenario','normal');document.querySelector('#scenario').dispatchEvent(new Event('change'))}}
 });
 reset();login('p');
 return JSON.stringify({viewport:{width:innerWidth,height:innerHeight},results,total:results.length,failed:results.filter(r=>r.status==='FAIL').length});
})()
