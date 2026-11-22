"""Real two-tab browser test against dummy file-local storage; run from repository root."""
import json
import subprocess
from pathlib import Path
SESSION = 'household-ux-r3-tabs'
URL = (Path.cwd() / 'docs/ux/prototype/index.html').as_uri()
def run(*args):
    result = subprocess.run(['agent-browser', '--session', SESSION, *args], text=True, capture_output=True, check=True)
    return result.stdout

def evaluate(code):
    output = json.loads(run('eval', code))
    return json.loads(output) if isinstance(output, str) else output

results = []
run('open', URL)
evaluate("fixture('conflict');rewardReview(db.requests.filter(q=>q.member==='n')[1].id);document.querySelector('#rewardReason').value='Catatan yang dipertahankan';window.realStorageEvents=0;window.addEventListener('storage',e=>{if(e.key==='ruang-bersama-ux-r1'&&e.isTrusted)window.realStorageEvents++});true")
run('tab', 'new', '--label', 'other-parent', URL)
evaluate("document.querySelector('#loginForm').requestSubmit();document.querySelector('[data-act=nav][data-id=rewards]').click();rewardReview(db.requests.find(q=>q.member==='n').id);document.querySelector('[data-act=rewardApprove]').click();true")
run('tab', 't1')
result = evaluate("JSON.stringify({open:document.querySelector('#modal').open,disabled:document.querySelector('[data-act=rewardApprove]').disabled,balance:balance('n'),deficit:document.querySelector('#rewardFigures').textContent.includes('60 poin'),reason:document.querySelector('#rewardReason').value,storageEvents:window.realStorageEvents,pending:db.requests.filter(q=>q.member==='n')[1].status})")
assert result['open'] and result['disabled'] and result['balance'] == 20 and result['deficit'] and result['pending'] == 'pending' and result['reason'] == 'Catatan yang dipertahankan' and result['storageEvents'] > 0, result
results.append({'case': 'Other Parent approves first reward; second dialog updates on real storage event', 'status': 'PASS', 'observed': result})
run('tab', 'other-parent')
evaluate("rewardReview(db.requests.find(q=>q.member==='n'&&q.status==='pending').id);document.querySelector('[data-act=rewardBalanceSim][data-id=\"60\"]').click();true")
run('tab', 't1')
result = evaluate("JSON.stringify({enabled:!document.querySelector('[data-act=rewardApprove]').disabled,balance:balance('n'),pending:db.requests.filter(q=>q.member==='n')[1].status,reason:document.querySelector('#rewardReason').value,storageEvents:window.realStorageEvents})")
assert result['enabled'] and result['balance'] == 80 and result['pending'] == 'pending' and result['reason'] == 'Catatan yang dipertahankan' and result['storageEvents'] > 1, result
results.append({'case': 'Other tab simulation credits 60; approval becomes available without auto-approval', 'status': 'PASS', 'observed': result})
evaluate("document.querySelector('[data-act=rewardApprove]').click();true")
run('tab', 'other-parent')
result = evaluate("JSON.stringify({approved:db.requests.filter(q=>q.member==='n')[1].status,balance:balance('n'),approveDisabled:document.querySelector('[data-act=rewardApprove]').disabled,rejectDisabled:document.querySelector('[data-act=rewardReject]').disabled})")
assert result['approved'] == 'approved' and result['balance'] == 0 and result['approveDisabled'] and result['rejectDisabled'], result
results.append({'case': 'Decision in first tab disables stale decisions in second tab, no duplicate debit', 'status': 'PASS', 'observed': result})
Path('docs/ux/evidence/R3-two-tabs.json').write_text(json.dumps({'session': SESSION, 'results': results, 'failed': 0}, indent=2) + '\n')
run('close')
print(json.dumps(results, indent=2))
