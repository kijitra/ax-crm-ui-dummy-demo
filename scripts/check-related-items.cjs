const assert=require('node:assert/strict'),h=require('./demo-harness.cjs')();
h.action('open-task:t1');const html=h.elements['#main'].innerHTML;
assert(html.includes('related-chip'));assert(!html.includes('準備資料を見る'));assert(!html.includes('保存済みのメール案を見る'));
const subject=h.run("db.mails.m1.subject");assert(html.includes(subject));assert(html.includes('商談準備資料 — '));
const source=h.run("sources(['a1'])");assert(source.includes('related-chip'));assert(source.includes(h.run("db.activities.find(a=>a.id==='a1').title")));assert(!source.includes('.pdf'));
let prevented=false;h.events.click.forEach(f=>f({target:{closest:s=>s==='button,a[data-go]'?{dataset:{go:'meeting/m1/mail'}}:null},preventDefault(){prevented=true}}));assert(prevented);assert.equal(h.run('route'),'meeting/m1/mail');
console.log('PASS: related item chips show record titles, canonical routes and keyboard-native links without invented filenames');
