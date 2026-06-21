// ─── NAVIGATION ───────────────────────
let curSec='dashboard',curNoteTab='session',spellFilter='all',advMode='normal';

function showSection(id){
  if(curSec==='notes')autoSaveNote();
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.ntab').forEach(t=>t.classList.remove('active'));
  document.getElementById('sec-'+id)?.classList.add('active');
  document.querySelector(`.ntab[data-s="${id}"]`)?.classList.add('active');
  curSec=id;renderSection(id);window.scrollTo(0,0);
}
function renderSection(id){
  const el=document.getElementById('sec-'+id);if(!el)return;
  const fn={dashboard:dashHTML,combat:combatHTML,spellbook:spellbookHTML,bard:bardHTML,inventory:inventoryHTML,vara:varaHTML,conditions:conditionsHTML,notes:notesHTML,dice:diceHTML}[id];
  if(fn)el.innerHTML=fn();
  updateHeaderHP();updateCondBanner();
}

// ─── TOAST ────────────────────────────
function toast(msg,ms=2200){const el=document.getElementById('toast');el.textContent=msg;el.classList.add('show');clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('show'),ms)}
function openModal(id){document.getElementById(id)?.classList.add('open')}
function closeModal(id){document.getElementById(id)?.classList.remove('open')}

// ─── HP ───────────────────────────────
function updateHeaderHP(){
  const{current:c,max:m}=S.hp;const pct=c/m*100;
  const el=document.getElementById('hdr-hp');if(!el)return;
  el.textContent=c;el.className='hstat-val '+(pct>50?'ok':pct>25?'warn':'crit');
}
function adjustHP(n){
  S.hp.current=Math.max(0,Math.min(S.hp.max,S.hp.current+n));
  save();updateHeaderHP();renderSection(curSec);
  toast(n<0?`⚔️ ${Math.abs(n)} damage taken`:`💚 +${n} HP restored`);
}
function applyHP(t){
  const v=parseInt(document.getElementById('mi-hp').value)||0;if(v<=0)return;
  if(t==='dmg'){if(S.hp.temp>0){const ab=Math.min(S.hp.temp,v);S.hp.temp-=ab;S.hp.current=Math.max(0,S.hp.current-(v-ab));}else S.hp.current=Math.max(0,S.hp.current-v);}
  else S.hp.current=Math.min(S.hp.max,S.hp.current+v);
  save();updateHeaderHP();closeModal('m-hp');document.getElementById('mi-hp').value='';renderSection(curSec);
  toast(t==='dmg'?`⚔️ ${v} damage`:`💚 +${v} HP`);
}
function applyTempHP(){
  const v=parseInt(document.getElementById('mi-temp').value)||0;
  S.hp.temp=v;save();closeModal('m-temp');renderSection(curSec);toast(`🛡️ ${v} temp HP`);
}

function hpBarHTML(){
  const{current:c,max:m,temp:t}=S.hp;const pct=Math.round(c/m*100);
  const col=pct>50?'#4a9a60':pct>25?'#b07a10':'#c04040';
  return`<div style="display:flex;align-items:baseline;gap:8px;justify-content:center;margin:6px 0">
    <span class="big-num" style="color:${col}">${c}</span>
    <span class="muted cinzel" style="font-size:20px"> / ${m}</span>
    ${t>0?`<span style="font-size:14px;color:#70a0e0"> +${t}🛡️</span>`:''}
  </div>
  <div class="hp-wrap"><div class="hp-bar" style="width:${pct}%;background:${col}"></div></div>
  <div class="tc muted ts mb8">${pct}% · Temp HP: ${t>0?t:'—'}</div>`;
}

// ─── DANCING SWORD ────────────────────
const DS={name:'Dancing Sword',type:'Shortsword',rarity:'Very Rare',atk:5,dmg:'1d6+2',dmgType:'piercing',atkMod:'DEX +2 + Prof +3'};

function dsSwordWidgetHTML(){
  const d=S.dancingSword;
  const hovering=d.hovering;
  const attacks=d.attacks;
  const remaining=4-attacks;
  let pips='';for(let i=0;i<4;i++){const used=i<attacks;pips+=`<span class="sword-pip${used?' used':''}"></span>`;}
  const statusLabel=hovering?`🌀 Hovering — ${remaining} attack${remaining!==1?'s':''} remaining`:'🗡️ In hand / Grounded';
  const statusColor=hovering?'#80b0f0':'var(--txt2)';
  const disadvWarn=hasAttackDisadv()&&!hovering?`<div class="disadv-warning">⚠️ Condition: DISADV on attack rolls</div>`:'';
  return`<div class="card dance">
    <div class="ctitle" style="color:#80b0f0">⚔️ Dancing Sword (Shortsword)</div>
    <div class="ts c2 mb8">Very Rare · Requires Attunement · ATK ${fmtMod(DS.atk)} · ${DS.dmg} piercing</div>
    <div class="sword-status${hovering?' hovering':' grounded'}">
      <span class="sword-icon-big">${hovering?'🌀':'🗡️'}</span>
      <div>
        <div style="font-family:'Cinzel',serif;font-size:12px;color:${statusColor};margin-bottom:4px">${statusLabel}</div>
        <div class="sword-pip-lbl">Attacks used this launch:</div>
        <div class="sword-atk-pips">${pips}</div>
      </div>
    </div>
    ${disadvWarn}
    <div class="btn-row mb8">
      ${!hovering?`<button class="btn blue f1" onclick="dsLaunch()">🎵 Launch<br><span style="font-size:9px;opacity:.7">Bonus Action</span></button>`:''}
      ${hovering&&remaining>0?`<button class="btn blue f1" onclick="dsAttack()">⚔️ Attack<br><span style="font-size:9px;opacity:.7">Bonus Action (${remaining} left)</span></button>`:''}
      ${hovering?`<button class="btn f1" onclick="dsRecall()">↩ Recall<br><span style="font-size:9px;opacity:.7">Let it return</span></button>`:''}
      ${!hovering?`<button class="btn f1" onclick="diceRoll(1,6,2,'Dancing Sword ATK Dmg (1d6+2)');showSection('dice')">🎲 Roll Dmg</button>`:''}
    </div>
    ${hovering?`<button class="btn full" style="margin-bottom:8px" onclick="dsRollAtk()">🎲 Roll Attack ${fmtMod(DS.atk)}</button>`:''}
    <div class="muted txs">
      ${hovering?'Sword hovers up to 30 ft away · attacks one creature within 5 ft of itself · uses your attack roll & ability mod':'Bonus Action to launch · flies up to 30 ft · attacks one creature within 5 ft · returns after 4 attacks'}
    </div>
  </div>`;
}

function dsLaunch(){
  if(S.dancingSword.hovering){toast('Sword is already hovering!');return}
  S.dancingSword.hovering=true;S.dancingSword.attacks=0;
  save();renderSection(curSec);toast('🌀 Dancing Sword launched! (Bonus Action used)');
}
function dsAttack(){
  if(!S.dancingSword.hovering){toast('Sword is not hovering');return}
  if(S.dancingSword.attacks>=4){toast('4 attacks used — sword returning');dsRecall();return}
  S.dancingSword.attacks++;
  const r=rollD20(DS.atk,'Dancing Sword Attack');
  save();renderSection(curSec);
  if(S.dancingSword.attacks>=4){toast(`⚔️ Attack! (${DS.atk>=0?'+':''}${DS.atk}) — 4th attack! Sword returns.`);S.dancingSword.hovering=false;save();renderSection(curSec);}
  else toast(`⚔️ Attack ${S.dancingSword.attacks}/4 — rolled ${r.total}`);
}
function dsRollAtk(){
  const r=rollD20(DS.atk,'Dancing Sword Attack Roll');
  toast(`⚔️ DS Attack: ${r.total}`);
}
function dsRecall(){
  S.dancingSword.hovering=false;S.dancingSword.attacks=0;
  save();renderSection(curSec);toast('↩ Dancing Sword returned to hand');
}

// ─── SPELL SLOTS ──────────────────────
function slotsHTML(){
  return[1,2,3,4].map(lv=>{
    const sl=S.slots[lv];const avail=sl.m-sl.u;
    let pips='';for(let i=0;i<sl.m;i++){const used=i<sl.u;pips+=`<span class="slot-pip${used?' used':''}" onclick="${used?'restoreSlot':'useSlot'}(${lv})"></span>`;}
    return`<div class="slots-lbl">LEVEL ${lv} — ${avail} available</div><div class="slots-row">${pips}</div>`;
  }).join('');
}
function useSlot(lv){if(S.slots[lv].u>=S.slots[lv].m){toast('No level '+lv+' slots remaining');return}S.slots[lv].u++;save();renderSection(curSec);toast(`Level ${lv} slot used`)}
function restoreSlot(lv){if(S.slots[lv].u<=0)return;S.slots[lv].u--;save();renderSection(curSec)}

// ─── BARDIC INSPIRATION ───────────────
function biPipsHTML(){
  const{used,max}=S.bi;let h='';
  for(let i=0;i<max;i++){const on=i<(max-used);h+=`<span class="bi-pip${on?' on':''}" onclick="${on?'useBI':'restoreBI'}()"></span>`;}
  return`<div class="bi-pips">${h}</div>`;
}
function useBI(){if(S.bi.used>=S.bi.max){toast('No Bardic Inspiration remaining');return}S.bi.used++;save();renderSection(curSec);diceRoll(1,8,0,'Bardic Inspiration (d8)');toast('♪ Bardic Inspiration granted')}
function restoreBI(){if(S.bi.used<=0)return;S.bi.used--;save();renderSection(curSec)}

// ─── CONCENTRATION ────────────────────
function concHTML(){
  if(S.conc)return`<div class="conc-wrap" onclick="openModal('m-conc')"><div class="conc-dot"></div><span class="conc-text">${S.conc}</span><button class="btn" style="padding:3px 10px;font-size:10px" onclick="breakConc();event.stopPropagation()">✕</button></div>`;
  return`<div class="ab w" onclick="openModal('m-conc')" style="text-align:center;color:var(--txt3);font-size:14px;padding:12px">🔵 No concentration — tap to activate</div>`;
}
function setConc(){const v=document.getElementById('mi-conc').value.trim();if(!v)return;S.conc=v;save();closeModal('m-conc');document.getElementById('mi-conc').value='';renderSection(curSec);toast(`🔵 Concentrating: ${v}`)}
function breakConc(){S.conc=null;save();closeModal('m-conc');renderSection(curSec);toast('Concentration broken')}

// ─── VARA COMMAND ─────────────────────
function useVaraCmd(){if(S.varaCmd){toast("Already used today");return}S.varaCmd=true;save();renderSection(curSec);toast('⚡ Vara Command used')}

// ─── CONDITIONS ───────────────────────
function toggleCond(name){
  const i=S.conds.indexOf(name);
  if(i>=0)S.conds.splice(i,1);else S.conds.push(name);
  save();renderSection(curSec);updateCondBanner();
  toast(i>=0?`Condition removed: ${name}`:`⚠️ ${name} active`);
}
function activeCondsHTML(small=false){
  if(S.conds.length===0)return`<span class="muted ts">No active conditions</span>`;
  return S.conds.map(n=>{const c=CONDITIONS_DB[n]||{icon:'❓',color:'#aaa'};
    return`<span class="cond-chip on" style="${small?'font-size:12px;padding:3px 8px':''}" onclick="${small?`showSection('conditions')`:`toggleCond('${n}')`}">${c.icon} ${n}${!small?' <span style="opacity:.6">✕</span>':''}</span>`;
  }).join('');
}

// ─── DEATH SAVES ──────────────────────
function dsPipsHTML(type){
  const count=type==='s'?S.ds.s:S.ds.f;const cls=type==='s'?'succ':'fail';
  let h='';for(let i=0;i<3;i++)h+=`<span class="ds-pip ${cls}${i<count?' on':''}" onclick="toggleDS('${type}',${i})"></span>`;return h;
}
function toggleDS(t,i){
  if(t==='s')S.ds.s=S.ds.s>i?i:i+1;else S.ds.f=S.ds.f>i?i:i+1;
  save();renderSection(curSec);
  if(S.ds.f>=3)toast('💀 Three failures — dying...',3000);
  if(S.ds.s>=3)toast('✨ Three successes — stabilized!',3000);
}

// ─── ACTIONS ──────────────────────────
function toggleAct(k){S.acts[k]=!S.acts[k];save();renderSection(curSec)}
function actGridHTML(){
  return`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">${[{k:'a',icon:'⚔️',name:'ACTION'},{k:'b',icon:'⚡',name:'BONUS'},{k:'r',icon:'🛡️',name:'REACTION'}].map(a=>`
    <div class="act-token${S.acts[a.k]?' used':''}" onclick="toggleAct('${a.k}')">
      <span class="act-icon">${a.icon}</span><span class="act-name">${a.name}</span>
      <span class="act-state">${S.acts[a.k]?'Used':'Available'}</span>
    </div>`).join('')}</div>`;
}
function resetTurn(){S.acts={a:false,b:false,r:false};save();renderSection(curSec);toast('↺ New turn')}

// ─── RESTS ────────────────────────────
function shortRest(){S.bi.used=0;S.acts={a:false,b:false,r:false};save();renderSection(curSec);toast('🌙 Short Rest — Bardic Inspiration restored')}
function longRest(){
  S.hp.current=S.hp.max;S.hp.temp=0;[1,2,3,4].forEach(lv=>S.slots[lv].u=0);
  S.bi.used=0;S.varaCmd=false;S.ds={s:0,f:0};S.acts={a:false,b:false,r:false};
  S.dancingSword={hovering:false,attacks:0,attuned:true};
  save();renderSection(curSec);updateHeaderHP();toast('☀️ Long Rest — everything restored');
}
function adjExhaustion(d){S.exhaustion=Math.max(0,Math.min(6,(S.exhaustion||0)+d));save();updateCondBanner();renderSection(curSec)}
function adjGold(t,n){S.gold[t]=Math.max(0,(S.gold[t]||0)+n);save();renderSection(curSec)}

// ─── DICE ────────────────────────────
function diceRoll(count,sides,mod,label){
  const rolls=Array.from({length:count},()=>Math.floor(Math.random()*sides)+1);
  const total=rolls.reduce((a,b)=>a+b,0)+(mod||0);
  const ms=mod?(mod>0?` + ${mod}`:` - ${Math.abs(mod)}`): '';
  const r={label:label||`${count}d${sides}${mod?fmtMod(mod):''}`,total,bd:rolls.join(' + ')+ms,rolls};
  S.diceLog.unshift(r);if(S.diceLog.length>15)S.diceLog.pop();save();
  if(curSec==='dice')renderSection('dice');return r;
}
function rollD20(mod,label,adv){
  const r1=Math.floor(Math.random()*20)+1;const ms=mod?(mod>0?` + ${mod}`:` - ${Math.abs(mod)}`): '';
  if(adv==='adv'){const r2=Math.floor(Math.random()*20)+1;const best=Math.max(r1,r2);const total=best+(mod||0);const r={label:`${label} (Advantage)`,total,bd:`(${r1}, ${r2}) → ${best}${ms}`,rolls:[r1,r2]};S.diceLog.unshift(r);if(S.diceLog.length>15)S.diceLog.pop();save();if(curSec==='dice')renderSection('dice');return r;}
  if(adv==='dis'){const r2=Math.floor(Math.random()*20)+1;const worst=Math.min(r1,r2);const total=worst+(mod||0);const r={label:`${label} (Disadvantage)`,total,bd:`(${r1}, ${r2}) → ${worst}${ms}`,rolls:[r1,r2]};S.diceLog.unshift(r);if(S.diceLog.length>15)S.diceLog.pop();save();if(curSec==='dice')renderSection('dice');return r;}
  const total=r1+(mod||0);const r={label:label||`d20${mod?fmtMod(mod):''}`,total,bd:`${r1}${ms}`,rolls:[r1]};
  S.diceLog.unshift(r);if(S.diceLog.length>15)S.diceLog.pop();save();if(curSec==='dice')renderSection('dice');return r;
}
function qRoll(mod,label){
  const adv=hasAttackDisadv()&&!hasAttackAdv()?'dis':hasAttackAdv()&&!hasAttackDisadv()?'adv':advMode==='normal'?undefined:advMode;
  rollD20(mod,label,adv);
}
function qRollFree(mod,label){rollD20(mod,label,advMode==='normal'?undefined:advMode)}

function lastDiceHTML(){
  const r=S.diceLog[0];if(!r)return`<div class="dice-label2">DICE ASSISTANT</div><div class="dice-total muted" style="font-size:48px">—</div><div class="dice-breakdown muted">Choose a roll below</div>`;
  const crit=r.rolls&&r.rolls.length===1&&r.rolls[0]===20;const fumble=r.rolls&&r.rolls.length===1&&r.rolls[0]===1;
  return`<div class="dice-label2">${r.label}</div>
    <div class="dice-total" style="${crit?'color:var(--goldbr);text-shadow:0 0 30px rgba(240,192,96,.6)':fumble?'color:var(--danger)':''}">${r.total}</div>
    <div class="dice-breakdown">${r.bd}</div>
    ${crit?'<div class="gold cinzel" style="font-size:12px;margin-top:6px;letter-spacing:.12em">✦ CRITICAL HIT ✦</div>':''}
    ${fumble?'<div class="danger-c cinzel" style="font-size:12px;margin-top:6px;letter-spacing:.12em">☠ CRITICAL FAIL ☠</div>':''}`;
}
function setAdvMode(m){advMode=m;renderSection('dice')}

// ─── SPELL CASTING ────────────────────
function castSpell(name,lv){
  if(lv===0){toast(`✨ ${name} cast`);const sp=SPELLS_DB[name];if(sp?.conc){S.conc=name;save();}return;}
  if(S.slots[lv].u>=S.slots[lv].m){toast('No slots available');return}
  S.slots[lv].u++;const sp=SPELLS_DB[name];if(sp?.conc)S.conc=name;
  save();renderSection(curSec);toast(`✨ ${name} (Lv${lv}) — slot used`);
}
function toggleSpellCard(id){document.getElementById('sc-'+id)?.classList.toggle('open')}
function spellCardHTML(name,sp){
  const lv=sp.lv||0;const lid=name.replace(/[^a-zA-Z0-9]/g,'_');
  const badge=['Cantrip','Level 1','Level 2','Level 3','Level 4'][lv];
  let castBtns='';
  const disadv=hasAttackDisadv()&&sp.save;
  if(lv===0)castBtns=`<button class="cast-btn" onclick="castSpell('${name}',0);event.stopPropagation()">Cast</button>`;
  else{let any=false;for(let l=lv;l<=4;l++){if(S.slots[l]&&S.slots[l].u<S.slots[l].m){castBtns+=`<button class="cast-btn" onclick="castSpell('${name}',${l});event.stopPropagation()">Cast Lv${l}</button>`;any=true;}}if(!any)castBtns='<span class="muted ts">No slots available</span>';}
  return`<div class="spell-card${sp.conc?' conc-card':''}${lv===0?' cantrip-card':''}" id="sc-${lid}" onclick="toggleSpellCard('${lid}')">
    <div class="row jb" style="gap:8px;margin-bottom:4px">
      <div><div class="spell-name">${name}</div><div style="font-size:12px;color:var(--txt3)">${sp.school||''}${sp.ct?' · '+sp.ct:''}</div></div>
      <span class="spell-badge badge-${lv}">${badge}</span>
    </div>
    <div class="spell-meta">
      <span class="stag">🕐 ${sp.ct}</span><span class="stag">📏 ${sp.range}</span><span class="stag">⏱ ${sp.dur}</span>
      ${sp.dmg?`<span class="stag" style="color:#c08040">⚔️ ${sp.dmg}</span>`:''}
      ${sp.save?`<span class="stag" style="color:#c0a0f0">DC${CHAR.DC} ${sp.save}</span>`:''}
      ${sp.conc?`<span class="conc-badge">🔵 Conc.</span>`:''}
      ${disadv?`<span class="stag" style="color:#f08080">⚠ DISADV</span>`:''}
    </div>
    <div class="spell-desc">
      <p style="margin-bottom:6px">${sp.desc}</p>
      ${(sp.long_desc || sp.long_desc_spa) ? `
        <details class="feat-details" onclick="event.stopPropagation()">
          <summary>English</summary>
          <div class="feat-long-desc">${sp.long_desc || ''}</div>
        </details>
        <details class="feat-details" onclick="event.stopPropagation()">
          <summary>Español</summary>
          <div class="feat-long-desc">${sp.long_desc_spa || sp.long_desc || ''}</div>
        </details>
      ` : ''}
      ${sp.special?`<div class="spec-note">${sp.special}</div>`:''}
      ${sp.upc?`<div class="up-note">↑ ${sp.upc}</div>`:''}
      <div class="cast-actions">${castBtns}</div>
    </div>
  </div>`;
}
function addCustomSpell(){
  const name=document.getElementById('cs-name').value.trim();if(!name)return;
  const sp={name,lv:parseInt(document.getElementById('cs-level').value)||0,ct:document.getElementById('cs-cast').value||'1 Action',range:document.getElementById('cs-range').value||'—',dur:document.getElementById('cs-dur').value||'Instantaneous',desc:document.getElementById('cs-desc').value||'No description.',conc:false,school:'Custom',tags:[]};
  S.customSpells.push(sp);save();closeModal('m-custom-spell');renderSection('spellbook');toast(`✨ ${name} added`);
}
function removeCustomSpell(name){S.customSpells=S.customSpells.filter(s=>s.name!==name);save();renderSection('spellbook');toast('Spell removed')}

// ─── NOTES ───────────────────────────
function autoSaveNote(){const ta=document.getElementById('note-ta');if(ta){S.notes[curNoteTab]=ta.value;save();}}
function setNoteTab(t){autoSaveNote();curNoteTab=t;renderSection('notes')}
function saveNote(){autoSaveNote();toast('📝 Note saved')}

// ══════════════════════════════════════
