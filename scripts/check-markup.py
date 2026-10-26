"""Validate generated controls as HTML, beyond substring smoke assertions."""
import json
import subprocess
from html.parser import HTMLParser
from pathlib import Path

class Controls(HTMLParser):
    def __init__(self):
        super().__init__()
        self.buttons = 0
        self.cards = []
        self.finished = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'article' and 'next-action-card' in attrs.get('class', '').split():
            self.cards.append(0)
        if tag == 'button':
            assert self.buttons == 0, 'nested button: browser will split the task card'
            self.buttons += 1
            if self.cards:
                self.cards[-1] += 1
    def handle_endtag(self, tag):
        if tag == 'button':
            assert self.buttons == 1, 'unmatched button end'
            self.buttons -= 1
        if tag == 'article' and self.cards:
            self.finished.append(self.cards.pop())

root = Path(__file__).resolve().parent.parent
js = """const h=require('./scripts/demo-harness.cjs')();const pages=[];for(const r of ['chat','dashboard','tasks','deals','flows',...Array.from({length:50},(_,i)=>'deal/d'+(i+1)),...Array.from({length:50},(_,i)=>'task/t'+(i+1))]){h.run('go('+JSON.stringify(r)+')');pages.push([r,h.elements['#main'].innerHTML])}for(const type of ['daily-todo','tasks','mail','update','status','table'])pages.push(['reply/'+type,h.run('chatAnswer('+JSON.stringify(type)+')')]);console.log(JSON.stringify(pages));"""
pages = json.loads(subprocess.check_output(['node', '-e', js], cwd=root))
for route, markup in pages:
    parser = Controls()
    try:
        parser.feed(markup)
        assert parser.buttons == 0, 'unclosed button'
        if route == 'reply/daily-todo':
            assert len(parser.finished) > 0
            assert all(count == 1 for count in parser.finished), 'each task card must contain one action'
    except AssertionError as error:
        raise AssertionError(f'{route}: {error}') from error
print(f'PASS: parsed {len(pages)} generated pages/replies, no nested buttons, daily task action containment')
