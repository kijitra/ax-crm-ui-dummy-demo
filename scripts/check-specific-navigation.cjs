const assert=require('node:assert/strict'),h=require('./demo-harness.cjs')();
let html=h.run("chatAnswer('today-prep')");assert(!html.includes('次回の商談を見る'));assert(html.includes('次回の商談は以下です'));
h.run("db.meetings.forEach(m=>{m.owner='Ikeda'});meeting('m2').owner='Wada';meeting('m2').date='2026-10-27 09:00';meeting('m2').completedAt=null");html=h.run("chatAnswer('today-prep')");assert(html.includes('meeting/m2/brief'));assert(html.includes(h.run("meeting('m2').name")));assert(!html.includes('meeting/m1/brief'));
h.run("meeting('m2').completedAt='2026-10-27'");assert(h.run("chatAnswer('today-prep')").includes('次回の商談予定は登録されていません'));
for(const kind of ['mail','status','lifecycle']){html=h.run(`chatAnswer('${kind}')`);assert(!/>内容を見る<|>タスクを見る<|>メールを開く<|>活動を見る</.test(html))}
html=h.run("chatAnswer('mail')");assert(html.includes(h.run('db.mails.m1.subject')));h.run("go('meeting/m1/mail')");assert(h.elements['#main'].innerHTML.includes('<h1>'+h.run('db.mails.m1.subject')+'</h1>'));
console.log('PASS: next meeting derives from owned future schedule; concrete navigation labels match record destinations');
