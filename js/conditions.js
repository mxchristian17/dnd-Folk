// ─── CONDITION EFFECTS ENGINE ─────────
const CONDITIONS_DB={
  'Blinded':{icon:'🌑',color:'#888',desc:"Can't see. Your attack rolls have DISADVANTAGE. Attacks against you have ADVANTAGE.",
    effects:[{on:'your_attacks',type:'disadv',text:'DISADV on your attacks'},{on:'attacks_vs_you',type:'adv',text:'ADV on attacks vs you'}]},
  'Charmed':{icon:'💫',color:'#c080e0',desc:"Can't attack the charmer. Charmer has ADV on CHA checks against you.",
    effects:[{on:'roleplay',type:'warn',text:"Can't attack charmer"}]},
  'Deafened':{icon:'🔇',color:'#888',desc:"Can't hear. Auto-fail checks requiring hearing.",
    effects:[{on:'checks',type:'warn',text:'Auto-fail hearing checks'}]},
  'Exhausted':{icon:'😫',color:'#c0802c',desc:'See exhaustion level tracker.',effects:[]},
  'Frightened':{icon:'😱',color:'#c04040',desc:'DISADV on attacks & checks while source in sight. Cannot move closer to source.',
    effects:[{on:'your_attacks',type:'disadv',text:'DISADV attacks & checks (source visible)'},{on:'movement',type:'warn',text:"Can't move toward source"}]},
  'Grappled':{icon:'🤜',color:'#808040',desc:'Speed is 0.',
    effects:[{on:'speed',type:'zero',text:'Speed 0'}]},
  'Incapacitated':{icon:'😶',color:'#888',desc:"Can't take actions or reactions.",
    effects:[{on:'actions',type:'zero',text:'No actions or reactions'}]},
  'Invisible':{icon:'👻',color:'#80c0ff',desc:"Can't be seen. Your attack rolls have ADVANTAGE. Attacks vs you have DISADVANTAGE.",
    effects:[{on:'your_attacks',type:'adv',text:'ADV on your attacks'},{on:'attacks_vs_you',type:'disadv',text:'DISADV on attacks vs you'}]},
  'Paralyzed':{icon:'⚡',color:'#c0c040',desc:'Incapacitated. Speed 0. Auto-fail STR & DEX saves. Attacks vs you have ADV. Melee hits within 5 ft are crits.',
    effects:[{on:'speed',type:'zero',text:'Speed 0'},{on:'saves',type:'zero',text:'Auto-fail STR & DEX saves'},{on:'attacks_vs_you',type:'adv',text:'ADV on attacks vs you + crits in 5 ft'},{on:'actions',type:'zero',text:'Incapacitated'}]},
  'Petrified':{icon:'🗿',color:'#a0a0a0',desc:'Stone. Incapacitated. Speed 0. Resistance all damage.',
    effects:[{on:'speed',type:'zero',text:'Speed 0'},{on:'actions',type:'zero',text:'Incapacitated'},{on:'defense',type:'adv',text:'Resistance to all damage'}]},
  'Poisoned':{icon:'☠️',color:'#40c040',desc:'DISADV on attack rolls and ability checks.',
    effects:[{on:'your_attacks',type:'disadv',text:'DISADV on attacks & ability checks'}]},
  'Prone':{icon:'🔽',color:'#a08040',desc:'Crawling only (half speed). Melee attacks vs you have ADV. Ranged attacks vs you have DISADV. Your attacks have DISADV.',
    effects:[{on:'speed',type:'disadv',text:'Crawl only (½ speed)'},{on:'your_attacks',type:'disadv',text:'DISADV on your attacks'},{on:'attacks_vs_you',type:'warn',text:'Melee ADV · Ranged DISADV vs you'}]},
  'Restrained':{icon:'⛓️',color:'#c08040',desc:'Speed 0. Attacks vs you ADV. Your attacks DISADV. DEX saves DISADV.',
    effects:[{on:'speed',type:'zero',text:'Speed 0'},{on:'your_attacks',type:'disadv',text:'DISADV on your attacks'},{on:'attacks_vs_you',type:'adv',text:'ADV on attacks vs you'},{on:'saves',type:'disadv',text:'DISADV on DEX saves'}]},
  'Stunned':{icon:'💥',color:'#c0a040',desc:'Incapacitated. Cannot move. Auto-fail STR & DEX saves. Attacks vs you have ADV.',
    effects:[{on:'speed',type:'zero',text:'Speed 0'},{on:'actions',type:'zero',text:'Incapacitated'},{on:'saves',type:'zero',text:'Auto-fail STR & DEX saves'},{on:'attacks_vs_you',type:'adv',text:'ADV on attacks vs you'}]},
  'Unconscious':{icon:'💤',color:'#6060a0',desc:'Incapacitated. Speed 0. Auto-fail STR & DEX saves. Attacks ADV. Melee crits within 5 ft. You are Prone.',
    effects:[{on:'speed',type:'zero',text:'Speed 0'},{on:'actions',type:'zero',text:'Incapacitated'},{on:'saves',type:'zero',text:'Auto-fail STR & DEX saves'},{on:'attacks_vs_you',type:'adv',text:'ADV + crits in 5 ft vs you'}]},
};

const EXHAUST_DESC=['No exhaustion','Disadvantage on ability checks','Speed halved','Disadv. on attacks & saves','Max HP halved','Speed reduced to 5 ft','💀 Dead'];

// ─── COMPUTED CONDITION EFFECTS ───────
function effectiveSpeed(){
  const c=S.conds;
  if(c.includes('Grappled')||c.includes('Restrained')||c.includes('Paralyzed')||c.includes('Stunned')||c.includes('Unconscious'))return 0;
  let spd=CHAR.baseSpeed;
  if(c.includes('Prone'))spd=Math.floor(spd/2);
  if(S.exhaustion>=5)return 5;
  if(S.exhaustion>=2)spd=Math.floor(spd/2);
  return spd;
}
function hasAttackDisadv(){
  return S.conds.some(c=>['Blinded','Prone','Poisoned','Frightened','Restrained'].includes(c))||S.exhaustion>=3;
}
function hasAttackAdv(){return S.conds.includes('Invisible')}
function attacksVsYouAdv(){return S.conds.some(c=>['Blinded','Prone','Restrained','Paralyzed','Stunned','Unconscious'].includes(c))}
function isIncapacitated(){return S.conds.some(c=>['Incapacitated','Paralyzed','Petrified','Stunned','Unconscious'].includes(c))}
function autoFailSaves(){
  const c=S.conds;
  const str=c.some(x=>['Paralyzed','Stunned','Unconscious'].includes(x));
  const dex=c.some(x=>['Paralyzed','Restrained','Stunned','Unconscious'].includes(x));
  return{str,dex};
}

function getCondEffects(){
  const fx=[];const c=S.conds;
  const spd=effectiveSpeed();
  if(spd!==CHAR.baseSpeed){
    const z=spd===0;
    fx.push({cls:z?'bad':'warn',text:`🏃 Speed: ${spd} ft${z?' (ZERO!)':''}`});
  }
  c.forEach(name=>{
    const cd=CONDITIONS_DB[name];
    if(!cd)return;
    cd.effects.forEach(e=>{
      fx.push({cls:e.type==='disadv'?'bad':e.type==='adv'?'good':e.type==='zero'?'spd':'warn',text:`${cd.icon} ${name}: ${e.text}`});
    });
  });
  if(S.exhaustion>0)fx.push({cls:S.exhaustion>=3?'bad':'warn',text:`😫 Exhaustion ${S.exhaustion}: ${EXHAUST_DESC[S.exhaustion]}`});
  if(hasAttackAdv())fx.push({cls:'good',text:'🎯 ADV on your attacks (Invisible)'});
  return fx;
}

function updateCondBanner(){
  const banner=document.getElementById('cond-banner');
  const inner=document.getElementById('cb-inner');
  const hdrSpd=document.getElementById('hdr-spd');
  if(!banner||!inner)return;
  const fx=getCondEffects();
  const spd=effectiveSpeed();
  if(hdrSpd){
    hdrSpd.textContent=spd+'ft';
    hdrSpd.style.color=spd===0?'var(--danger)':spd<CHAR.baseSpeed?'var(--warn)':'';
  }
  if(fx.length===0){
    banner.classList.remove('active');
    inner.innerHTML='';
    document.documentElement.style.setProperty('--banner-h','0px');
  }else{
    inner.innerHTML='<span class="cb-lbl">⚠ ACTIVE:</span>'+fx.map(f=>`<span class="cb-pill ${f.cls}">${f.text}</span>`).join('');
    banner.classList.add('active');
    requestAnimationFrame(()=>{
      const h=banner.offsetHeight;
      document.documentElement.style.setProperty('--banner-h',h+'px');
    });
  }
}

function condEffectsBoxHTML(){
  const fx=getCondEffects();if(fx.length===0)return'';
  const rows=[];
  const c=S.conds;
  if(isIncapacitated())rows.push({icon:'😶',text:'Incapacitated — no actions or reactions',badge:'INCAP',cls:'auto'});
  if(hasAttackDisadv())rows.push({icon:'🎯',text:'Your attack rolls',badge:'DISADVANTAGE',cls:'disadv'});
  if(hasAttackAdv())rows.push({icon:'🎯',text:'Your attack rolls',badge:'ADVANTAGE',cls:'adv'});
  if(attacksVsYouAdv())rows.push({icon:'🛡️',text:'Attacks against you',badge:'ADVANTAGE',cls:'adv'});
  const {str,dex}=autoFailSaves();
  if(str)rows.push({icon:'💀',text:'STR saving throws',badge:'AUTO-FAIL',cls:'auto'});
  if(dex)rows.push({icon:'💀',text:'DEX saving throws',badge:'AUTO-FAIL',cls:'auto'});
  const spd=effectiveSpeed();
  if(spd!==CHAR.baseSpeed)rows.push({icon:'🏃',text:`Movement speed: ${spd} ft${spd===0?' — CANNOT MOVE':''}`,badge:spd===0?'ZERO':'HALVED',cls:spd===0?'auto':'disadv'});
  if(c.includes('Prone'))rows.push({icon:'🔽',text:'Melee attacks against you: ADV · Ranged vs you: DISADV',badge:'PRONE',cls:'disadv'});
  if(S.exhaustion>=1)rows.push({icon:'😫',text:`Exhaustion ${S.exhaustion}: ${EXHAUST_DESC[S.exhaustion]}`,badge:'EXHAUSTED',cls:S.exhaustion>=3?'auto':'disadv'});
  if(rows.length===0)return'';
  return`<div class="cond-effects-box">
    <div class="cond-effects-title">⚠ ACTIVE CONDITION EFFECTS</div>
    ${rows.map(r=>`<div class="cond-fx-row"><span class="cond-fx-icon">${r.icon}</span><span class="cond-fx-text">${r.text}</span><span class="cond-fx-badge ${r.cls}">${r.badge}</span></div>`).join('')}
  </div>`;
}

