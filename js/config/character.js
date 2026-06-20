// ─── STATIC DATA ──────────────────────
const CHAR={name:'Folk',title:'Bard of the College of Valor',race:'Human',level:8,cls:'Bard',sub:'College of Valor',bg:'Criminal',prof:3,maxHP:59,AC:18,DC:16,atkBonus:8,ini:2,baseSpeed:30,hitDie:8,
  scores:{STR:8,DEX:15,CON:14,INT:10,WIS:10,CHA:19},
  savingThrows:{STR:false,DEX:true,CON:false,INT:false,WIS:false,CHA:true},
  skills:{'Acrobatics':{ab:'DEX',p:false,e:false},'Arcana':{ab:'INT',p:false,e:false},'Athletics':{ab:'STR',p:true,e:false},'Deception':{ab:'CHA',p:true,e:true},'History':{ab:'INT',p:false,e:false},'Insight':{ab:'WIS',p:false,e:false},'Intimidation':{ab:'CHA',p:false,e:false},'Investigation':{ab:'INT',p:false,e:false},'Sleight of Hand':{ab:'DEX',p:true,e:false},'Medicine':{ab:'WIS',p:false,e:false},'Nature':{ab:'INT',p:false,e:false},'Perception':{ab:'WIS',p:true,e:true},'Performance':{ab:'CHA',p:true,e:true},'Persuasion':{ab:'CHA',p:true,e:true},'Religion':{ab:'INT',p:false,e:false},'Stealth':{ab:'DEX',p:true,e:false},'Survival':{ab:'WIS',p:false,e:false},'Animal Handling':{ab:'WIS',p:false,e:false}},
  equipment:[{icon:'🛡️',name:'Breastplate',desc:'Base AC 14 + DEX (max +2)'},{icon:'🛡️',name:'Shield',desc:'+2 AC'},{icon:'🪄',name:'Vara del Juglar',desc:'Arcane focus · Rare magic item · Attuned',magic:true},{icon:'🎵',name:'Harmonica',desc:'Bardic instrument — worn around the neck'}],
  weapons:[{name:'Dagger',atk:5,dmg:'1d4+2 piercing',notes:'Light · Finesse · Thrown'},{name:'Short Sword',atk:5,dmg:'1d6+2 piercing',notes:'Light · Finesse'}]
};

function abilMod(s){return Math.floor((s-10)/2)}
function fmtMod(n){return(n>=0?'+':'')+n}
function skillVal(sk){const s=CHAR.skills[sk];if(!s)return 0;const b=abilMod(CHAR.scores[s.ab]);if(s.e)return b+CHAR.prof*2;if(s.p)return b+CHAR.prof;return b+Math.floor(CHAR.prof/2)}
function saveVal(ab){return abilMod(CHAR.scores[ab])+(CHAR.savingThrows[ab]?CHAR.prof:0)}

