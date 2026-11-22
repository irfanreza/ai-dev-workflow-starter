// Browser UX acceptance for F-14/15/16. Dummy storage only; no production security claims.
(() => {
 const results=[];
 const $=s=>document.querySelector(s),click=(act,id)=>{const e=$(`[data-act="${act}"]${id!==undefined?`[data-id="${id}"]`:''}`);if(!e)throw Error('Missing '+act);e.click()},assert=(x,m)=>{if(!x)throw Error(m)};
 const data=()=>JSON.parse(localStorage.getItem('ruang-bersama-ux-r1'));
 const balance=()=>data().ledger.filter(l=>l.member==='n').reduce((s,l)=>s+l.amount,0);
 const approve=()=>$('[data-act=rewardApprove]'),reject=()=>$('[data-act=rewardReject]');
 const fillReason=value=>$('#rewardReason').value=value;
 const fixture=()=>{if($('#modal').open)click('close');click('fixture','conflict');return data().requests.filter(q=>q.member==='n')};
 const run=(label,fn)=>{try{fn();results.push({label,status:'PASS'})}catch(e){results.push({label,status:'FAIL',reason:e.message})}};
 const externalChange=(amount,event=false)=>{const d=data();d.ledger.push({id:'test-'+Math.random(),member:'n',amount,title:'External dummy activity',at:new Date().toISOString()});d.rev++;localStorage.setItem('ruang-bersama-ux-r1',JSON.stringify(d));if(event)window.dispatchEvent(new StorageEvent('storage',{key:'ruang-bersama-ux-r1'}))};
 run('100 → 20: second 80-point reward disabled before click, deficit 60, pending, no reservation',()=>{
  const qs=fixture();assert(balance()===100,'No reservation for two pending');click('rewardReview',qs[0].id);assert(!approve().disabled,'Enough funds');assert($('#rewardFigures').textContent.includes('100 poin'),'Latest balance');click('rewardApprove',qs[0].id);assert(balance()===20,'First debit');click('rewardReview',qs[1].id);
  assert(approve().disabled&&!reject().disabled,'Only approval disabled');assert($('#rewardFigures').textContent.includes('60 poin'),'Deficit visible');assert($('#rewardEligibility').textContent.includes('dapat disetujui nanti'),'Future approval explained');assert($('#modalBody').textContent.includes('tidak mereservasi saldo'),'No reservation notice');
  const count=data().ledger.length;approve().click();assert(data().ledger.length===count&&data().requests.find(q=>q.id===qs[1].id).status==='pending','Disabled does not debit or reject');click('close');assert(data().requests.find(q=>q.id===qs[1].id).status==='pending','Close preserves pending');
 });
 run('Insufficient funds: rejection remains available and requires reason, with no debit',()=>{
  const qs=fixture();click('rewardReview',qs[0].id);click('rewardApprove',qs[0].id);click('rewardReview',qs[1].id);click('rewardReject',qs[1].id);assert($('#formError').textContent.includes('alasan'),'Reason required');fillReason('Tunda reward ini, kita pilih yang lain');click('rewardReject',qs[1].id);assert(balance()===20,'Reject no debit');assert(data().requests.find(q=>q.id===qs[1].id).status==='rejected','Explicit rejection only');
 });
 run('Live balance fall: storage notification updates open dialog without losing typed reason',()=>{
  const qs=fixture();click('rewardReview',qs[1].id);fillReason('Catatan Parent tetap ada');$('#rewardReason').focus();externalChange(-80,true);
  assert($('#modal').open&&approve().disabled&&!reject().disabled,'Dialog retained, approval disabled');assert($('#rewardFigures').textContent.includes('20 poin')&&$('#rewardFigures').textContent.includes('60 poin'),'Updated balance and deficit');assert($('#rewardReason').value==='Catatan Parent tetap ada'&&document.activeElement===$('#rewardReason'),'Input/focus preserved');assert($('#rewardUpdated').textContent.includes('diperbarui'),'Update announced');
 });
 run('Balance becomes sufficient in open dialog: approval enabled, explicit decision applies once',()=>{
  const qs=fixture();click('rewardReview',qs[0].id);click('rewardApprove',qs[0].id);click('rewardReview',qs[1].id);click('rewardBalanceSim','60');assert(!approve().disabled,'Enabled at 80');assert($('#rewardFigures').textContent.includes('0 poin'),'No deficit');assert(data().requests.find(q=>q.id===qs[1].id).status==='pending','Not auto-approved');click('rewardApprove',qs[1].id);assert(balance()===0,'Exactly 80 debited');const len=data().ledger.length;rewardDecision(qs[1].id,true);assert(data().ledger.length===len,'Retry no second debit');
 });
 run('Stale approval before notification: data refreshed and no decision applied',()=>{
  const qs=fixture();click('rewardReview',qs[0].id);externalChange(-80);click('rewardApprove',qs[0].id);assert($('#modal').open&&approve().disabled,'Stale approval blocked');assert(balance()===20&&data().requests.find(q=>q.id===qs[0].id).status==='pending','No debit/decision');assert($('#rewardUpdated').textContent.includes('Periksa'),'Latest information shown');
 });
 run('Balance changes while still sufficient: review latest impact before applying decision',()=>{
  const qs=fixture();click('rewardReview',qs[0].id);externalChange(60);click('rewardApprove',qs[0].id);assert($('#modal').open&&!approve().disabled,'Requires fresh click');assert(balance()===160&&data().requests.find(q=>q.id===qs[0].id).status==='pending','No decision on stale preview');click('rewardApprove',qs[0].id);assert(balance()===80,'Second deliberate click uses new balance');
 });
 run('Stored request cost preserved despite catalog price change',()=>{
  const qs=fixture();click('rewardForm','r1');$('#cost').value='120';$('#rewardForm').requestSubmit();click('rewardReview',qs[0].id);assert(!approve().disabled&&$('#rewardFigures').textContent.includes('80 poin'),'Stored 80, not catalog 120');click('rewardApprove',qs[0].id);assert(balance()===20,'Stored price debit');
 });
 run('Reward disabled during review: approval disabled, rejection available',()=>{
  const qs=fixture();click('rewardReview',qs[0].id);const d=data();d.rewards.find(r=>r.id==='r1').active=false;localStorage.setItem('ruang-bersama-ux-r1',JSON.stringify(d));window.dispatchEvent(new StorageEvent('storage',{key:'ruang-bersama-ux-r1'}));assert(approve().disabled&&!reject().disabled,'Active state refreshed');fillReason('Reward sementara tidak tersedia');click('rewardReject',qs[0].id);assert(balance()===100,'No debit for inactive reward');
 });
 run('Other Parent has decided: show current status, no duplicate approval or rejection',()=>{
  const qs=fixture();click('rewardReview',qs[0].id);const d=data();d.requests.find(q=>q.id===qs[0].id).status='rejected';localStorage.setItem('ruang-bersama-ux-r1',JSON.stringify(d));window.dispatchEvent(new StorageEvent('storage',{key:'ruang-bersama-ux-r1'}));assert(approve().disabled&&reject().disabled,'Both disabled for decided request');assert($('#rewardFigures').textContent.includes('Ditolak'),'Latest status');assert($('#modalBody [data-act=close]:not([aria-label])').textContent==='Tutup','Close label accurate');
 });
 run('Negative corrected balance: correct deficit, no reward approval',()=>{
  const qs=fixture();externalChange(-120);click('rewardReview',qs[0].id);assert(approve().disabled&&$('#rewardFigures').textContent.includes('-20 poin')&&$('#rewardFigures').textContent.includes('100 poin'),'Negative balance and deficit');assert(!reject().disabled,'Rejection still allowed');
 });
 run('Transient decision failure: no partial debit and safe retry',()=>{
  const qs=fixture();click('rewardReview',qs[0].id);click('failNext');click('rewardApprove',qs[0].id);assert($('#modal').open&&balance()===100,'Failed without debit');assert(data().requests.find(q=>q.id===qs[0].id).status==='pending','Still pending');click('rewardApprove',qs[0].id);assert(balance()===20,'Retry exactly once');
 });
 run('Modal responsive width, explanatory association and live announcements',()=>{
  const qs=fixture();click('rewardReview',qs[0].id);click('rewardApprove',qs[0].id);click('rewardReview',qs[1].id);assert(document.documentElement.scrollWidth<=innerWidth,'Document fits');assert($('#modal').scrollWidth===$('#modal').clientWidth,'Dialog has no horizontal scroll');assert(approve().getAttribute('aria-describedby')==='rewardEligibility','Disabled explained');assert($('#rewardEligibility').getAttribute('aria-live')==='polite','Balance update announced');
 });
 // Leave the requested scenario ready for visual review.
 const qs=fixture();click('rewardReview',qs[0].id);click('rewardApprove',qs[0].id);click('rewardReview',qs[1].id);$('#toast').hidden=true;
 return JSON.stringify({viewport:{width:innerWidth,height:innerHeight},results,total:results.length,failed:results.filter(r=>r.status==='FAIL').length});
})()
