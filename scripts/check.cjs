const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8'),script=html.split('<script>')[1].split('</script>')[0];
new vm.Script(script);
const events={},elements={};
const context={console,structuredClone,Intl,Date,setTimeout:()=>1,clearTimeout:()=>{},document:{querySelector:s=>elements[s]||=({innerHTML:'',value:'',addEventListener:(event,fn)=>{(events[s+event]||=[]).push(fn)}}),addEventListener:(event,fn)=>{(events[event]||=[]).push(fn)}}};
vm.createContext(context);vm.runInContext(script,context);
const run=s=>vm.runInContext(s,context),go=r=>run(`go(${JSON.stringify(r)})`),action=a=>events.click.forEach(fn=>fn({target:{closest:()=>({dataset:{action:a}})}}));
function fill(id,value){elements['#'+id]={value}}
function submit(id,data={},mode){events.submit.forEach(fn=>fn({target:{id,dataset:data},preventDefault(){},submitter:{value:mode}}))}
for(const r of ['dashboard','tasks','customers','customer/c1','customer/c2','customer/c3','deals','deal/d1','deal/d2','deal/d3','deal/d4','deal/d1/overview','deal/d1/memo','deal/d1/email','deal/d1/task','deal/d1/meeting','meetings','meeting/m1/brief','meeting/m1/mail','meeting/m1/notes','meeting/m2/brief','meeting/m2/mail','activity/a1','activity/a2','activity/a3','activity/a4','task/t3','task/t4','flows','flow/f1','run/r1']){go(r);assert(elements['#main'].innerHTML,r)}
go('dashboard');assert(!elements['#main'].innerHTML.includes('対応すること'));assert(elements['#main'].innerHTML.includes('受注実績'));assert.equal(run("db.deals.filter(d=>d.stage==='受注').reduce((n,d)=>n+d.amount,0)"),300000);
go('deal/d4');assert(!elements['#main'].innerHTML.includes('次回打ち合わせのご連絡'));assert(elements['#main'].innerHTML.includes('ワークショップの実施報告'));
go('deal/d1');assert(!elements['#main'].innerHTML.includes('ワークショップの実施報告'));
action('accept-update');assert.equal(run("deal('d1').close"),'2026-11-30');
action('edit');fill('prop-name','受注業務のAX導入');fill('prop-stage','提案中');fill('prop-amount','1300000');fill('prop-close','2026-11-20');submit('deal-properties',{deal:'d1'});assert.equal(run("deal('d1').amount"),1300000);
for(const kind of ['memo','email','task','meeting']){go('deal/d4/'+kind);fill('compose-title','検証'+kind);fill('compose-body','案件d4の記録');fill('compose-date',kind==='task'?'2026-10-29':'2026-10-29T13:30');submit('compose-form',{deal:'d4',kind});if(kind==='email'){const id=run('db.activities[0].id');fill('draft-title','送信の検証');fill('draft-body','送信本文');submit('draft-form',{activity:id},'send');assert.equal(run(`db.activities.find(a=>a.id==='${id}').type`),'送信メール')}}
assert(run("db.tasks.some(t=>t.dealId==='d4'&&t.title==='検証task')"));assert(run("db.meetings.some(t=>t.deal==='d4'&&t.name==='検証meeting')"));
go('deal/d1');assert(!elements['#main'].innerHTML.includes('送信の検証'));
go('meeting/m1/mail');action('edit');fill('mail-subject','Test');fill('mail-body','Body');action('save-mail');action('send-mail');action('send-mail');assert.equal(run("db.activities.filter(a=>a.id==='sent-m1').length"),1);assert.equal(run("db.activities.find(a=>a.id==='sent-m1').dealId"),'d1');assert.equal(run('db.mails.m1.sourceIds.join(",")'),'a1,a2');
go('run/r1');action('finish-run');assert(run("db.tasks.some(t=>t.id==='review-m2'&&t.dealId==='d2')"));
assert.equal(run("meeting('m2').sourceIds.some(id=>db.activities.find(a=>a.id===id).dealId!=='d2')"),false);
go('meeting/m1/notes');fill('meeting-notes','議事録');fill('next-task','次のタスク');action('save-notes:m1');assert.equal(run('db.tasks.at(-1).dealId'),'d1');
console.log('PASS: syntax, 31 routes, dashboard semantics, deal isolation, property edit, four activity creation flows, mail send guard, sources, automation review tasks');
