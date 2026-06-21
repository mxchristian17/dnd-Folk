// SECTION HTML GENERATORS
// ══════════════════════════════════════

function dashHTML(){
  const biAvail=S.bi.max-S.bi.used;const spd=effectiveSpeed();
  return`
<div class="sec-title">⚔️ Combat Dashboard</div>
${condEffectsBoxHTML()}
<div class="card acc glow">
  <div class="ctitle">Hit Points</div>
  ${hpBarHTML()}
  <div class="adj"><button class="ab d" onclick="adjustHP(-10)">−10</button><button class="ab d" onclick="adjustHP(-5)">−5</button><button class="ab d" onclick="adjustHP(-1)">−1</button><button class="ab h" onclick="adjustHP(1)">+1</button><button class="ab h" onclick="adjustHP(5)">+5</button><button class="ab h" onclick="adjustHP(10)">+10</button></div>
  <div class="adj mt8"><button class="ab w" onclick="openModal('m-hp')">📊 Manual</button><button class="ab w" onclick="openModal('m-temp')">🛡️ Temp HP</button></div>
</div>
<div class="card">
  <div class="ctitle">Key Stats</div>
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px">
    <div class="stat-box"><div class="stat-name">AC</div><div class="stat-score" style="font-size:18px">18</div></div>
    <div class="stat-box"><div class="stat-name">DC</div><div class="stat-score" style="font-size:18px">16</div></div>
    <div class="stat-box"><div class="stat-name">ATK</div><div class="stat-score" style="font-size:18px">+8</div></div>
    <div class="stat-box"><div class="stat-name">INIT</div><div class="stat-score" style="font-size:18px">+2</div></div>
    <div class="stat-box" style="${spd<CHAR.baseSpeed?'border-color:'+(spd===0?'var(--danger)':'var(--warn)'):''}">
      <div class="stat-name">SPD</div>
      <div class="stat-score" style="font-size:${spd===0?'14':'18'}px;color:${spd===0?'var(--danger)':spd<CHAR.baseSpeed?'var(--warn)':''}">${spd}ft${spd<CHAR.baseSpeed&&spd>0?'⚠':''}${spd===0?'🚫':''}</div>
    </div>
  </div>
</div>
<div class="card acc">
  <div class="ctitle">Bardic Inspiration · d8</div>
  ${biPipsHTML()}
  <div class="row fw" style="gap:6px"><button class="btn pri" onclick="useBI()">♪ Grant (${biAvail}/${S.bi.max})</button><button class="btn" onclick="diceRoll(1,8,0,'Bardic Inspiration d8')">🎲 Roll d8</button></div>
  <div class="muted txs mt8">Restored on Short Rest</div>
</div>
<div class="card"><div class="ctitle">Concentration</div>${concHTML()}</div>
<div class="card"><div class="ctitle">Active Conditions</div><div>${activeCondsHTML(true)}</div></div>
${dsSwordWidgetHTML()}
<div class="card" style="border-color:var(--copper);background:linear-gradient(135deg,var(--card),#1a1208)">
  <div class="ctitle" style="color:var(--copper)">Vara del Juglar</div>
  <div class="muted ts mb8">+1 DC · +1 ATK · Eloquence · Bite</div>
  <button class="btn${S.varaCmd?'':' pri'} full" onclick="useVaraCmd()" ${S.varaCmd?'disabled':''}>${S.varaCmd?'✓ Command used today':'⚡ Use Free Command'}</button>
  <div class="tc txs mt8 ${S.varaCmd?'muted':'success-c'}">${S.varaCmd?'Restored on Long Rest':'Available'}</div>
</div>
<div class="card"><div class="ctitle">Rests</div><div class="btn-row"><button class="btn f1" onclick="shortRest()">🌙 Short Rest</button><button class="btn pri f1" onclick="longRest()">☀️ Long Rest</button></div></div>`;
}

function combatHTML(){
  const spd=effectiveSpeed();
  const{str:autoStr,dex:autoDex}=autoFailSaves();
  const disadv=hasAttackDisadv();const advAtk=hasAttackAdv();
  const atkNote=disadv&&!advAtk?'<div class="disadv-warning">⚠️ Condition effect: DISADVANTAGE on attack rolls</div>':advAtk&&!disadv?'<div class="adv-note">✦ Condition effect: ADVANTAGE on attack rolls</div>':'';
  const vsYouNote=attacksVsYouAdv()?'<div class="disadv-warning" style="background:rgba(64,192,80,.1);border-color:rgba(64,192,80,.4);color:#70d090">⚠️ Enemies have ADVANTAGE on attacks against you</div>':'';
  const incapNote=isIncapacitated()?'<div class="disadv-warning">⛔ INCAPACITATED — cannot take actions or reactions</div>':'';
  return`
<div class="sec-title">⚔️ Combat Management</div>
${condEffectsBoxHTML()}
<div class="card acc">
  <div class="ctitle">Hit Points</div>
  ${hpBarHTML()}
  <div class="adj"><button class="ab d" onclick="adjustHP(-20)">−20</button><button class="ab d" onclick="adjustHP(-10)">−10</button><button class="ab d" onclick="adjustHP(-5)">−5</button><button class="ab d" onclick="adjustHP(-1)">−1</button></div>
  <div class="adj"><button class="ab h" onclick="adjustHP(1)">+1</button><button class="ab h" onclick="adjustHP(5)">+5</button><button class="ab h" onclick="adjustHP(10)">+10</button><button class="ab h" onclick="adjustHP(${S.hp.max-S.hp.current})">Max</button></div>
  <div class="adj mt8"><button class="ab w" onclick="openModal('m-hp')">📊 Manual</button><button class="ab w" onclick="openModal('m-temp')">🛡️ Temp HP</button></div>
</div>
<div class="card">
  <div class="ctitle">Action Economy</div>
  ${incapNote}${actGridHTML()}
  <button class="btn full mt8" onclick="resetTurn()">↺ New Turn</button>
</div>
${dsSwordWidgetHTML()}
<div class="card">
  <div class="ctitle">Attacks & Rolls</div>
  ${atkNote}${vsYouNote}
  <div class="ts c2">
    <div class="row jb" style="padding:5px 0;border-bottom:1px solid var(--border)"><span>⚡ Spell Attack</span><div class="row" style="gap:6px"><strong>1d20+8</strong><button class="btn" style="padding:3px 10px;font-size:10px" onclick="qRoll(8,'Spell Attack')">Roll</button></div></div>
    <div class="row jb" style="padding:5px 0;border-bottom:1px solid var(--border)"><span>🗡️ Dancing Sword</span><div class="row" style="gap:6px"><strong>1d20+5</strong><button class="btn" style="padding:3px 10px;font-size:10px" onclick="qRoll(5,'Dancing Sword ATK')">Roll</button></div></div>
    <div class="row jb" style="padding:5px 0"><span>⚡ Initiative</span><div class="row" style="gap:6px"><strong>1d20+2</strong><button class="btn" style="padding:3px 10px;font-size:10px" onclick="qRoll(2,'Initiative')">Roll</button></div></div>
  </div>
</div>
<div class="card"><div class="ctitle">Concentration</div>${concHTML()}
  <div class="muted txs mt8">War Caster: ADV on CON saves · DC = 10 or ½ damage (higher)</div>
  <div class="btn-row mt8"><button class="btn f1" onclick="rollD20(2,'CON Save (Concentration)')">Normal</button><button class="btn mag f1" onclick="rollD20(2,'CON Save (Concentration)','adv')">★ With Advantage</button></div>
</div>
<div class="card">
  <div class="ctitle">Turn Reference</div>
  <div class="ts c2">
    <div class="row jb" style="padding:4px 0;border-bottom:1px solid var(--border)"><span>🏃 Speed</span><strong style="color:${spd===0?'var(--danger)':spd<CHAR.baseSpeed?'var(--warn)':''}">${spd} ft${spd<CHAR.baseSpeed?' ⚠':''}</strong></div>
    <div class="row jb" style="padding:4px 0;border-bottom:1px solid var(--border)"><span>🛡️ AC / Spell DC</span><strong>18 / 16</strong></div>
    ${autoStr?'<div class="row jb" style="padding:4px 0;border-bottom:1px solid var(--border)"><span>STR Saves</span><strong style="color:var(--danger)">AUTO-FAIL</strong></div>':''}
    ${autoDex?'<div class="row jb" style="padding:4px 0;border-bottom:1px solid var(--border)"><span>DEX Saves</span><strong style="color:var(--danger)">AUTO-FAIL</strong></div>':''}
    <div class="row jb" style="padding:4px 0"><span>Extra Attack</span><strong>2 attacks per Attack action</strong></div>
  </div>
</div>
<div class="card danger">
  <div class="ctitle" style="color:var(--danger)">Death Saving Throws</div>
  <div class="row" style="padding:7px 0"><span class="cinzel txs success-c" style="min-width:80px">✓ SUCCESSES</span><div style="display:flex;gap:8px">${dsPipsHTML('s')}</div></div>
  <div class="row" style="padding:7px 0"><span class="cinzel txs danger-c" style="min-width:80px">✕ FAILURES</span><div style="display:flex;gap:8px">${dsPipsHTML('f')}</div></div>
  <div class="btn-row mt8"><button class="btn suc f1" onclick="rollD20(0,'Death Saving Throw')">🎲 Roll d20</button><button class="btn f1" onclick="S.ds={s:0,f:0};save();renderSection('combat')">Reset</button></div>
</div>
<div class="card"><div class="ctitle">Rests</div><div class="btn-row"><button class="btn f1" onclick="shortRest()">🌙 Short Rest</button><button class="btn pri f1" onclick="longRest()">☀️ Long Rest</button></div></div>`;
}

function spellbookHTML(){
  const filters=[['all','All'],['cantrip','Cantrips'],['1','Level 1'],['2','Level 2'],['3','Level 3'],['4','Level 4'],['conc','Concentration'],['control','Control'],['heal','Healing']];
  function matchF(sp){if(spellFilter==='all')return true;if(spellFilter==='cantrip')return sp.lv===0;if(['1','2','3','4'].includes(spellFilter))return sp.lv===parseInt(spellFilter);if(spellFilter==='conc')return sp.conc;if(spellFilter==='control')return sp.tags?.includes('control');if(spellFilter==='heal')return sp.tags?.includes('healing');return true;}
  const customHTML=S.customSpells.filter(sp=>matchF(sp)).map(sp=>{
    const lid=sp.name.replace(/[^a-zA-Z0-9]/g,'_');const badge=['Cantrip','Level 1','Level 2','Level 3','Level 4'][sp.lv]||'Cantrip';
    return`<div class="spell-card" id="sc-${lid}" onclick="toggleSpellCard('${lid}')"><div class="row jb" style="gap:8px;margin-bottom:4px"><div><div class="spell-name">${sp.name}</div><div style="font-size:12px;color:var(--txt3)">${sp.school} · ${sp.ct}</div></div><div style="display:flex;gap:4px;align-items:center"><span class="spell-badge badge-${sp.lv}">${badge}</span><button style="background:none;border:none;color:var(--danger);cursor:pointer;font-size:16px" onclick="removeCustomSpell('${sp.name}');event.stopPropagation()">✕</button></div></div><div class="spell-meta"><span class="stag">🕐 ${sp.ct}</span><span class="stag">📏 ${sp.range}</span><span class="stag">⏱ ${sp.dur}</span></div><div class="spell-desc"><p>${sp.desc}</p>${(sp.long_desc || sp.long_desc_spa) ? `
        <details class="feat-details" onclick="event.stopPropagation()">
          <summary>English</summary>
          <div class="feat-long-desc">${sp.long_desc || ''}</div>
        </details>
        <details class="feat-details" onclick="event.stopPropagation()">
          <summary>Español</summary>
          <div class="feat-long-desc">${sp.long_desc_spa || sp.long_desc || ''}</div>
        </details>
      ` : ''}<div class="cast-actions">${sp.lv===0?`<button class="cast-btn" onclick="castSpell('${sp.name}',0);event.stopPropagation()">Cast</button>`:`<button class="cast-btn" onclick="castSpell('${sp.name}',${sp.lv});event.stopPropagation()">Cast Lv${sp.lv}</button>`}</div></div></div>`;
  }).join('');
  return`
<div class="sec-title">📖 Folk's Spellbook</div>
<div class="card acc"><div class="ctitle">Spell Slots</div>${slotsHTML()}<div class="muted txs">Tap ○ to use · Tap ● to restore</div></div>
<div class="card ts c2"><div class="row jb fw" style="gap:8px"><span>⚡ Spell Attack: <strong class="txt">+${CHAR.atkBonus}</strong></span><span>🎯 Spell DC: <strong class="txt">${CHAR.DC}</strong></span><span>🪄 Focus: <strong class="txt">Vara del Juglar</strong></span></div>${hasAttackDisadv()?'<div class="disadv-warning" style="margin-top:8px">⚠️ Current condition: DISADVANTAGE on spell attack rolls</div>':''}</div>
<div class="fbar">${filters.map(([f,l])=>`<span class="fchip${spellFilter===f?' on':''}" onclick="spellFilter='${f}';renderSection('spellbook')">${l}</span>`).join('')}</div>
${Object.entries(SPELLS_DB).filter(([,sp])=>matchF(sp)).map(([name,sp])=>spellCardHTML(name,sp)).join('')}
${customHTML}
<div class="card" style="border-style:dashed"><div class="ctitle">Homebrew</div><button class="btn full" onclick="openModal('m-custom-spell')">+ Add Custom Spell</button></div>`;
}

function bardHTML(){
  return`
<div class="sec-title">🎵 Bard Features</div>
${condEffectsBoxHTML()}
<div class="card acc">
  <div class="ctitle">Bardic Inspiration · d8 · ${S.bi.max-S.bi.used}/${S.bi.max} available</div>
  <div class="row" style="gap:12px;flex-wrap:wrap;align-items:flex-start">
    <div style="text-align:center"><div class="cinzel" style="font-size:40px;font-weight:700;color:var(--copper)">d8</div><div class="muted txs">die</div></div>
    <div style="flex:1">${biPipsHTML()}<div class="btn-row mt8"><button class="btn pri f1" onclick="useBI()">♪ Grant</button><button class="btn f1" onclick="diceRoll(1,8,0,'Bardic Inspiration d8')">🎲 Roll d8</button></div></div>
  </div>
</div>
<div class="card"><div class="ctitle">Ability Scores</div><div class="stat-grid">${Object.entries(CHAR.scores).map(([ab,sc])=>`<div class="stat-box"><div class="stat-name">${ab}</div><div class="stat-score">${sc}</div><div class="stat-mod">${fmtMod(abilMod(sc))}</div></div>`).join('')}</div></div>
<div class="card"><div class="ctitle">Saving Throws</div>
  ${Object.entries(CHAR.savingThrows).map(([ab,p])=>{
    const v=saveVal(ab);const{str,dex}=autoFailSaves();
    const fail=(ab==='STR'&&str)||(ab==='DEX'&&dex);
    return`<div class="skill-row"><div class="pip${p?' prof':''}"></div><span class="sk-name">${ab} Save</span><span class="sk-ab">${p?'★':''}</span><span class="sk-bon" style="${fail?'color:var(--danger)':''}">${fail?'AUTO-FAIL':fmtMod(v)}</span><button class="btn" style="padding:3px 9px;font-size:10px" onclick="qRollFree(${v},'${ab} Save')">Roll</button></div>`;
  }).join('')}
</div>
<div class="card"><div class="ctitle">Skills</div>
  ${Object.entries(CHAR.skills).map(([name,sk])=>{
    const v=skillVal(name);const disadvCheck=S.conds.some(c=>['Poisoned','Frightened','Exhausted'].includes(c)&&S.exhaustion>=1);
    return`<div class="skill-row"><div class="pip${sk.e?' expert':sk.p?' prof':''}"></div><span class="sk-name">${name}${sk.e?' ★★':sk.p?' ★':''}</span><span class="sk-ab">${sk.ab}</span><span class="sk-bon">${fmtMod(v)}</span></div>`;
  }).join('')}
  <div class="muted txs mt8">★★ Expertise · ★ Proficiency · unmarked = +1 (JoAT)</div>
</div>
<div class="card">
    <div class="ctitle">Class Features (Level 8)</div>

    ${BARD_FEATS.map(f=>`
        <div class="feat-card">
            <div class="feat-name">
                ${f.name}
                <span class="muted" style="font-weight:400">(Lv${f.lv})</span>
            </div>

            <div class="feat-desc">${f.desc}</div>

            ${f.long_desc || f.long_desc_spa ? `
                <details class="feat-details">
                    <summary>English</summary>
                    <div class="feat-long-desc">
                        ${f.long_desc || ''}
                    </div>
                </details>
                <details class="feat-details">
                    <summary>Español</summary>
                    <div class="feat-long-desc">
                        ${f.long_desc_spa || f.long_desc || ''}
                    </div>
                </details>
            ` : ''}
        </div>
    `).join('')}
</div>
<div class="card"><div class="ctitle">Exhaustion Level</div>
  <div class="row" style="gap:12px;align-items:center">
    <button class="ab d" onclick="adjExhaustion(-1)" style="max-width:50px">−</button>
    <div style="flex:1;text-align:center"><div class="cinzel" style="font-size:34px;font-weight:700;color:${S.exhaustion>0?'var(--danger)':'var(--success)'}">${S.exhaustion}</div><div class="muted ts">${EXHAUST_DESC[S.exhaustion]}</div></div>
    <button class="ab" onclick="adjExhaustion(1)" style="max-width:50px;border-color:var(--warn);color:var(--warn)">+</button>
  </div>
</div>`;
}

function inventoryHTML(){
  const{gp,sp,cp}=S.gold;
  return`
<div class="sec-title">🎒 Inventory</div>
<div class="card gold-border"><div class="ctitle">Currency</div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
    ${[['gp','💰 Gold',gp],['sp','🪙 Silver',sp],['cp','🟤 Copper',cp]].map(([k,l,v])=>`<div class="gold-box"><span class="gold-name2">${l}</span><span class="gold-val">${v}</span><div style="display:flex;gap:4px;margin-top:6px;justify-content:center"><button class="ab d" onclick="adjGold('${k}',-1)" style="padding:4px;min-width:28px;font-size:12px">−</button><button class="ab h" onclick="adjGold('${k}',1)" style="padding:4px;min-width:28px;font-size:12px">+</button></div></div>`).join('')}
  </div>
</div>
<div class="card"><div class="ctitle">Worn Equipment</div>
  ${CHAR.equipment.map(e=>`<div class="item-row"><span class="item-icon">${e.icon}</span><div style="flex:1"><div class="item-name">${e.name}${e.magic?' ✨':''}</div><div class="item-desc2">${e.desc}</div></div></div>`).join('')}
</div>
<div class="card dance">
  <div class="ctitle" style="color:#80b0f0">⚔️ Dancing Sword — Very Rare ✨</div>
  <div class="ts c2 mb8">Requires Attunement · Shortsword · +5 ATK · 1d6+2 piercing (Finesse)</div>
  <div style="font-size:13px;color:var(--txt2);margin-bottom:12px;line-height:1.6">
    <strong class="cinzel" style="font-size:10px;color:#80b0f0;letter-spacing:.1em">HOW TO USE:</strong><br>
    1. <strong>Bonus Action:</strong> Toss — sword hovers, flies up to 30 ft, attacks one creature within 5 ft.<br>
    2. <strong>Bonus Action (each turn):</strong> Fly up to 30 ft, attack one creature within 5 ft.<br>
    3. After <strong>4 attacks</strong> it returns to hand automatically.<br>
    4. Ceases hovering if you move >30 ft away or grasp it.
  </div>
  <div class="muted txs mb8">While hovering: your hands are FREE — use a 2-handed spell, cast freely, take another weapon.</div>
  ${dsSwordWidgetHTML()}
  <div class="btn-row mt8"><button class="btn f1" onclick="qRoll(5,'Dancing Sword Attack')">🎲 Roll ATK (+5)</button><button class="btn f1" onclick="diceRoll(1,6,2,'Dancing Sword Damage (1d6+2)')">🎲 Roll Dmg (1d6+2)</button></div>
</div>
<div class="card"><div class="ctitle">Weapons</div>
  ${CHAR.weapons.map(w=>`<div class="item-row"><span class="item-icon">⚔️</span><div style="flex:1"><div class="item-name">${w.name}</div><div class="item-desc2">ATK ${fmtMod(w.atk)} · ${w.dmg}</div><div class="item-desc2 ital">${w.notes}</div></div><button class="btn" style="padding:5px 10px;font-size:10px" onclick="qRoll(${w.atk},'ATK: ${w.name}')">🎲 Atk</button></div>`).join('')}
</div>
<div class="card"><div class="ctitle">Proficiencies & Passive Values</div>
  <div class="ts c2">
    ${[['Armor','Light, Medium, Shields'],['Weapons','Simple, Martial'],['Tools',"Harmonica, Thieves' Tools"],['Passive Perception',10+skillVal('Perception')],['Passive Insight',10+skillVal('Insight')],['Passive Investigation',10+skillVal('Investigation')]].map(([l,v])=>`<div class="row jb" style="padding:4px 0;border-bottom:1px solid var(--border)"><span>${l}</span><strong>${v}</strong></div>`).join('')}
  </div>
</div>`;
}

function varaHTML(){
  return`
<div class="sec-title">🪄 Vara del Juglar</div>
<div class="vara-hero">
  <div class="vara-icon" style="position:relative;z-index:1">🎪</div>
  <div class="vara-name" style="position:relative;z-index:1">Vara del Juglar</div>
  <div class="vara-sub" style="position:relative;z-index:1">Magic Staff · Rare · Requires Attunement (Bard)</div>
  <div class="muted ts" style="margin-top:12px;font-style:italic;line-height:1.6;position:relative;z-index:1">"Ancient carved wooden staff decorated with colorful clan cloth strips. Gifted to Folk by a northern clan elder who recognized his bardic nature."</div>
</div>
<div class="card" style="border-color:var(--copper);background:linear-gradient(135deg,var(--card),#1a1208)">
  <div class="ctitle" style="color:var(--copper)">⚡ Authority — Free Command</div>
  <div class="c2 ts mb8">Once per Long Rest, cast <em>Command</em> without a spell slot. If delivered as a <strong class="gold">rhyming verse</strong>, affects one additional creature.</div>
  <div class="tc ${S.varaCmd?'muted':'success-c'} ts mb8">${S.varaCmd?'✓ Used — restores on Long Rest':'✦ Available'}</div>
  <button class="btn${S.varaCmd?'':' pri'} full" onclick="useVaraCmd()" ${S.varaCmd?'disabled':''}>${S.varaCmd?'Already Used Today':'⚡ Use Free Command'}</button>
</div>
<div class="card"><div class="ctitle">Staff Effects</div>
  <div class="vara-eff"><div class="vara-eff-name">🔮 ARCANE FOCUS (+1 DC & ATK)</div><div class="vara-eff-desc">Included in Folk's values: DC 16, ATK +8.</div></div>
  <div class="vara-eff"><div class="vara-eff-name">🎭 ELOQUENCE — 1d4 to CHA checks while rhyming</div><div class="vara-eff-desc">Add 1d4 to Persuasion, Deception, Performance, Intimidation checks when speaking in rhyme.</div><div class="btn-row mt8"><button class="btn" style="font-size:10px;padding:5px 12px" onclick="diceRoll(1,4,${skillVal('Persuasion')},'Eloquence: Persuasion + 1d4');showSection('dice')">🎲 Persuasion+d4</button><button class="btn" style="font-size:10px;padding:5px 12px" onclick="diceRoll(1,4,${skillVal('Deception')},'Eloquence: Deception + 1d4');showSection('dice')">🎲 Deception+d4</button></div></div>
  <div class="vara-eff"><div class="vara-eff-name">⚔️ BITE — 1d6 extra damage (verbal rhyme)</div><div class="vara-eff-desc">Once per turn, if a damaging spell uses verbal rhyme as component, add 1d6 extra damage.</div><button class="btn mt8" style="font-size:10px;padding:5px 12px" onclick="diceRoll(1,6,0,'Bite — Extra Damage');showSection('dice')">🎲 Roll 1d6 Bite</button></div>
  <div class="vara-eff"><div class="vara-eff-name">👑 AUTHORITY — Free Command</div><div class="vara-eff-desc">Free Command 1×/long rest. Command as verse: +1 creature.</div></div>
</div>
<div class="card magic"><div class="ctitle" style="color:#b090f0">Lore</div><div class="c2 ts" style="line-height:1.7;font-style:italic">Ten years of slavery in Panelia's northern ruins, with only a harmonica. Escaped using bardic powers. Found shelter with a northern clan whose elder recognized his nature and gifted him this ancient staff — decorated with the clan's colors. Proof Folk is no longer alone.</div></div>`;
}

function conditionsHTML(){
  const allConds=Object.entries(CONDITIONS_DB);
  const spd=effectiveSpeed();
  const{str:autoStr,dex:autoDex}=autoFailSaves();
  return`
<div class="sec-title">💀 Status & Conditions</div>
${condEffectsBoxHTML()}
<div class="card${S.conds.length>0?' danger':''}">
  <div class="ctitle">Active Conditions</div>
  ${S.conds.length===0?'<div class="muted ts tc" style="padding:12px 0">✓ No active conditions</div>':
    S.conds.map(n=>{const c=CONDITIONS_DB[n]||{icon:'❓',color:'#aaa',desc:''};return`<div class="feat-card" style="border-left-color:${c.color};margin-bottom:8px"><div class="row jb"><div class="feat-name" style="color:${c.color}">${c.icon} ${n}</div><button class="btn dan" style="padding:3px 10px;font-size:10px" onclick="toggleCond('${n}')">✕ Remove</button></div><div class="feat-desc">${c.desc}</div></div>`;}).join('')}
</div>
<div class="card" style="${spd<CHAR.baseSpeed?'border-color:'+(spd===0?'var(--danger)':'var(--warn)'):''}">
  <div class="ctitle">Effective Speed</div>
  <div style="text-align:center;padding:10px 0">
    <div class="cinzel" style="font-size:38px;font-weight:700;color:${spd===0?'var(--danger)':spd<CHAR.baseSpeed?'var(--warn)':'var(--success)'}">${spd} ft</div>
    <div class="muted ts">${spd===0?'⛔ Cannot move':spd<CHAR.baseSpeed?`⚠ Reduced from ${CHAR.baseSpeed} ft`:`✓ Full speed`}</div>
  </div>
</div>
${autoStr||autoDex?`<div class="card danger"><div class="ctitle" style="color:var(--danger)">Automatic Save Failures</div>${autoStr?'<div class="feat-card" style="border-left-color:var(--danger)"><div class="feat-name" style="color:var(--danger)">STR Saving Throws — AUTO-FAIL</div></div>':''}${autoDex?'<div class="feat-card" style="border-left-color:var(--danger)"><div class="feat-name" style="color:var(--danger)">DEX Saving Throws — AUTO-FAIL</div></div>':''}</div>`:''}
<div class="card"><div class="ctitle">Exhaustion Level · ${S.exhaustion}/6</div>
  <div class="row" style="gap:12px;align-items:center">
    <button class="ab d" onclick="adjExhaustion(-1)" style="max-width:50px">−</button>
    <div style="flex:1;text-align:center"><div class="cinzel" style="font-size:32px;font-weight:700;color:${S.exhaustion>0?'var(--danger)':'var(--success)'}">${S.exhaustion}</div><div class="muted ts">${EXHAUST_DESC[S.exhaustion]}</div></div>
    <button class="ab" onclick="adjExhaustion(1)" style="max-width:50px;border-color:var(--warn);color:var(--warn)">+</button>
  </div>
</div>
<div class="card"><div class="ctitle">Add / Remove Condition</div>
  <div style="display:flex;flex-wrap:wrap">${allConds.map(([name,c])=>{const on=S.conds.includes(name);return`<span class="cond-chip ${on?'on':'off'}" onclick="toggleCond('${name}')">${c.icon} ${name}${on?' ✕':''}</span>`;}).join('')}</div>
</div>
<div class="card"><div class="ctitle">Conditions Reference</div>
  ${allConds.map(([name,c])=>`<div class="feat-card" style="border-left-color:${c.color}"><div class="feat-name" style="color:${c.color}">${c.icon} ${name}</div><div class="feat-desc">${c.desc}</div>${c.effects.length>0?`<div style="margin-top:6px;display:flex;flex-wrap:wrap;gap:4px">${c.effects.map(e=>`<span class="cond-fx-badge ${e.type==='disadv'?'disadv':e.type==='adv'?'adv':e.type==='zero'?'zero':'auto'}">${e.text}</span>`).join('')}</div>`:''}</div>`).join('')}
</div>`;
}

function notesHTML(){
  const tabs=[['session','📓 Session'],['npcs','🧙 NPCs'],['missions','⚔️ Missions'],['panelia','⛓️ Panelia'],['clan','🏕️ Clan']];
  return`
<div class="sec-title">📝 Campaign Notes</div>
<div class="note-tabs">${tabs.map(([k,l])=>`<span class="note-tab${curNoteTab===k?' on':''}" onclick="setNoteTab('${k}')">${l}</span>`).join('')}</div>
<div class="card"><textarea id="note-ta" style="min-height:280px;font-size:15px;line-height:1.7" placeholder="Write your notes here...">${S.notes[curNoteTab]||''}</textarea><button class="btn pri full mt8" onclick="saveNote()">💾 Save Note</button></div>
<div class="card magic"><div class="ctitle" style="color:#b090f0">Folk's Background</div>
  <div class="c2 ts" style="line-height:1.7"><strong class="copper">Origin:</strong> Dandia — itinerant musician.<br><strong class="copper">Arrest:</strong> Unjustly jailed for a ruby theft at a Gremmory event. No trial.<br><strong class="copper">Slavery:</strong> Shipped to Panelia. Ten years in the northern ruins.<br><strong class="copper">Awakening:</strong> Harmonica hypnotized guards. Escaped with verbal Command.<br><strong class="copper">Clan:</strong> Elder recognized bardic nature → shelter + Vara del Juglar.<br><strong class="copper">Character:</strong> Silent · Melancholic · Protective · Hardened · Mentally resilient.</div>
</div>`;
}

function diceHTML(){
  const disadv=hasAttackDisadv();const advAtk=hasAttackAdv();
  const atk20badge=disadv&&!advAtk?`<span class="rb-badge dis">DISADV</span>`:advAtk&&!disadv?`<span class="rb-badge adv">ADV</span>`:'';
  const advBtns=[['normal','Normal',''],['adv','Advantage','suc'],['dis','Disadvantage','dan']];
  return`
<div class="sec-title">🎲 Dice Assistant</div>
<div class="dice-result">${lastDiceHTML()}</div>
${(disadv||advAtk)?`<div class="${disadv&&!advAtk?'disadv-warning':'adv-note'}">${disadv&&!advAtk?'⚠️ Active condition: DISADVANTAGE auto-applied to attack rolls':'✦ Active condition: ADVANTAGE auto-applied to attack rolls'}<br><span style="opacity:.7;font-size:10px">Override manually with the mode buttons below</span></div>`:''}
<div class="card" style="padding:10px"><div class="ctitle">d20 Mode (Override)</div>
  <div class="btn-row">${advBtns.map(([m,l,cl])=>`<button class="btn ${cl} f1${advMode===m?' gld':''}" onclick="setAdvMode('${m}')">${l}</button>`).join('')}</div>
</div>
<div class="card"><div class="ctitle">Attacks & Spells</div>
  <div class="roll-grid">
    <div class="roll-btn" onclick="qRoll(${CHAR.atkBonus},'Spell Attack')">${atk20badge}<span class="rb-name">⚡ Spell Attack</span><span class="rb-dice">1d20 +${CHAR.atkBonus}</span></div>
    <div class="roll-btn" onclick="qRoll(5,'Dancing Sword ATK')">${atk20badge}<span class="rb-name">🌀 Dancing Sword</span><span class="rb-dice">1d20 +5 · 1d6+2 piercing</span></div>
    <div class="roll-btn" onclick="diceRoll(2,4,0,'Vicious Mockery (2d4)')"><span class="rb-name">😈 Vicious Mockery</span><span class="rb-dice">2d4 psychic · DC${CHAR.DC} WIS</span></div>
    <div class="roll-btn" onclick="diceRoll(3,6,0,'Dissonant Whispers (3d6)')"><span class="rb-name">💨 Dissonant Whispers</span><span class="rb-dice">3d6 psychic · DC${CHAR.DC} WIS</span></div>
    <div class="roll-btn" onclick="diceRoll(1,4,4,'Healing Word (1d4+4)')"><span class="rb-name">💚 Healing Word</span><span class="rb-dice">1d4+4 healing</span></div>
    <div class="roll-btn" onclick="diceRoll(1,6,2,'Dancing Sword Damage (1d6+2)')"><span class="rb-name">⚔️ DS Damage</span><span class="rb-dice">1d6+2 piercing</span></div>
    <div class="roll-btn" onclick="diceRoll(1,8,0,'Bardic Inspiration (d8)')"><span class="rb-name">♪ Bardic Inspiration</span><span class="rb-dice">1d8</span></div>
    <div class="roll-btn" onclick="diceRoll(1,6,0,'Bite — Vara Extra Dmg')"><span class="rb-name">⚡ Bite (Vara)</span><span class="rb-dice">1d6 extra (rhyme)</span></div>
    <div class="roll-btn" onclick="diceRoll(1,4,0,'Eloquence (Vara)')"><span class="rb-name">🎭 Eloquence (Vara)</span><span class="rb-dice">1d4 CHA check</span></div>
    <div class="roll-btn" onclick="diceRoll(1,8,2,'Hit Die (1d8+2)')"><span class="rb-name">💊 Hit Die</span><span class="rb-dice">1d8+2 (CON)</span></div>
  </div>
</div>
<div class="card"><div class="ctitle">Saving Throws</div>
  <div class="roll-grid">${Object.entries(CHAR.savingThrows).map(([ab,p])=>{const v=saveVal(ab);const{str,dex}=autoFailSaves();const fail=(ab==='STR'&&str)||(ab==='DEX'&&dex);return`<div class="roll-btn" onclick="qRollFree(${v},'${ab} Save')">${fail?'<span class="rb-badge dis">AUTO-FAIL</span>':''}<span class="rb-name">${p?'★ ':''} ${ab} Save</span><span class="rb-dice">1d20 ${fmtMod(v)}${p?' (prof.)':''}</span></div>`}).join('')}</div>
</div>
<div class="card"><div class="ctitle">Ability Checks</div>
  <div class="roll-grid">${['Deception','Persuasion','Performance','Perception','Stealth','Insight','Athletics','Arcana','Sleight of Hand','Nature'].map(sk=>`<div class="roll-btn" onclick="qRollFree(${skillVal(sk)},'${sk} Check')"><span class="rb-name">${sk}</span><span class="rb-dice">1d20 ${fmtMod(skillVal(sk))}</span></div>`).join('')}</div>
</div>
<div class="card"><div class="ctitle">Basic Dice</div>
  <div class="roll-grid">${[4,6,8,10,12,20].map(d=>`<div class="roll-btn" onclick="diceRoll(1,${d},0,'d${d}')"><span class="rb-name">d${d}</span><span class="rb-dice">1d${d}</span></div>`).join('')}
    <div class="roll-btn" onclick="qRoll(${CHAR.ini},'Initiative')">${atk20badge}<span class="rb-name">⚡ Initiative</span><span class="rb-dice">1d20 +${CHAR.ini}</span></div>
    <div class="roll-btn" onclick="diceRoll(1,100,0,'d100 Percentile')"><span class="rb-name">💯 d100</span><span class="rb-dice">Percentile roll</span></div>
    <div class="roll-btn" onclick="diceRoll(4,6,0,'4d6 — Stat roll')"><span class="rb-name">📊 4d6</span><span class="rb-dice">Generate stat</span></div>
    <div class="roll-btn" onclick="diceRoll(2,20,0,'2d20')"><span class="rb-name">🎲🎲 2d20</span><span class="rb-dice">Manual adv/dis</span></div>
  </div>
</div>
<div class="card"><div class="ctitle">Roll History</div>
  ${S.diceLog.length===0?'<div class="muted ts tc" style="padding:8px">No rolls yet</div>':S.diceLog.slice(0,12).map(r=>`<div class="row jb" style="padding:5px 0;border-bottom:1px solid var(--border);font-size:13px"><span class="c2">${r.label}</span><div class="row" style="gap:8px"><span class="muted txs">${r.bd}</span><strong class="cinzel gold">${r.total}</strong></div></div>`).join('')}
</div>`;
}

