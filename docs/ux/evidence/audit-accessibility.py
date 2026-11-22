import json,subprocess
from pathlib import Path
session='household-ux-r1'
def run(*args):
 r=subprocess.run(['agent-browser','--session',session,*args],text=True,capture_output=True,check=True)
 return r.stdout
run('eval',"close();db=seed();save();user='p';render();true")
reports=[]
for who, pages in [('p',['home','tasks','verify','history','rewards','family']),('n',['home','tasks','history','rewards'])]:
 for page in pages:
  code=f"close();user='{who}';page='{page}';scenario='normal';render();true"
  run('eval',code)
  report=json.loads(run('a11y','--json'))
  reports.append({'role':who,'page':page,'viewport':'360x800','report':report})
# Dialogs and expanded review toolbar.
for label,code in [('task-form',"user='p';page='tasks';render();taskForm('');true"),('cancel-negative',"fixture('negative');cancelPreview('h1');true"),('reward-review',"close();user='p';page='rewards';render();rewardReview('q1');true"),('review-tools',"close();document.querySelector('#reviewTools').open=true;true")]:
 run('eval',code)
 reports.append({'view':label,'report':json.loads(run('a11y','--json'))})
Path('docs/ux/evidence/accessibility.json').write_text(json.dumps(reports,indent=2)+'\n')
for r in reports:
 d=r['report']['data'];print(r.get('page',r.get('view')),d['counts'])
