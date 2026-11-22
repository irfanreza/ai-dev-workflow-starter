// Additional real browser timing/focus checks; dummy storage only.
(async () => {
 const $=s=>document.querySelector(s),assert=(ok,m)=>{if(!ok)throw Error(m)},results=[];
 const prepare=()=>{close();fixture('conflict');rewardReview(db.requests.find(q=>q.member==='n').id)};
 const debit=()=>{const d=JSON.parse(localStorage.getItem('ruang-bersama-ux-r1'));d.ledger.push({id:'timer-test',member:'n',amount:-80,title:'Dummy activity in another context',at:new Date().toISOString()});localStorage.setItem('ruang-bersama-ux-r1',JSON.stringify(d))};
 try{prepare();debit();await new Promise(resolve=>setTimeout(resolve,1300));assert($('[data-act=rewardApprove]').disabled&&$('#rewardFigures').textContent.includes('20 poin'),'Timer refreshed before action');results.push({case:'Timer refresh without storage notification or decision click',status:'PASS'})}catch(e){results.push({case:'Timer refresh',status:'FAIL',reason:e.message})}
 try{prepare();debit();window.dispatchEvent(new Event('focus'));assert($('[data-act=rewardApprove]').disabled,'Window focus refresh');results.push({case:'Window focus refreshes latest balance',status:'PASS'})}catch(e){results.push({case:'Window focus refresh',status:'FAIL',reason:e.message})}
 try{prepare();$('[data-act=rewardApprove]').focus();debit();window.dispatchEvent(new StorageEvent('storage',{key:'ruang-bersama-ux-r1'}));assert(document.activeElement===$('#rewardUpdated'),'Disabled focused button moves focus to update notice');results.push({case:'Focus remains meaningful when approval becomes disabled',status:'PASS'})}catch(e){results.push({case:'Focus when disabled',status:'FAIL',reason:e.message})}
 return JSON.stringify({results,total:results.length,failed:results.filter(r=>r.status==='FAIL').length});
})()
