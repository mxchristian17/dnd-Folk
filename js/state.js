// ─── STATE ────────────────────────────
const DEF={
  hp:{current:59,max:59,temp:0},
  slots:{1:{u:0,m:4},2:{u:0,m:3},3:{u:0,m:3},4:{u:0,m:2}},
  bi:{used:0,max:4},
  varaCmd:false,conc:null,conds:[],exhaustion:0,
  ds:{s:0,f:0},acts:{a:false,b:false,r:false},
  notes:{session:'',npcs:'',missions:'',panelia:'',clan:''},
  gold:{gp:0,sp:0,cp:0},
  diceLog:[],customSpells:[],
  dancingSword:{hovering:false,attacks:0,attuned:true},
};

let S={};
function loadS(){
  try{const raw=localStorage.getItem('folk_v4');S=raw?JSON.parse(raw):{}}catch(e){S={}}
  S.hp={...DEF.hp,...(S.hp||{})};
  S.slots=S.slots||{};[1,2,3,4].forEach(l=>{S.slots[l]={...DEF.slots[l],...(S.slots[l]||{})}});
  S.bi={...DEF.bi,...(S.bi||{})};
  S.varaCmd=S.varaCmd??false;S.conc=S.conc??null;
  S.conds=Array.isArray(S.conds)?S.conds:[];
  S.exhaustion=S.exhaustion??0;S.ds={...DEF.ds,...(S.ds||{})};
  S.acts={...DEF.acts,...(S.acts||{})};
  S.notes={...DEF.notes,...(S.notes||{})};
  S.gold={...DEF.gold,...(S.gold||{})};
  S.diceLog=Array.isArray(S.diceLog)?S.diceLog:[];
  S.customSpells=Array.isArray(S.customSpells)?S.customSpells:[];
  S.dancingSword={...DEF.dancingSword,...(S.dancingSword||{})};
}
function save(){try{localStorage.setItem('folk_v4',JSON.stringify(S))}catch(e){}}

