// ─── SPELLS ───────────────────────────
const SPELLS_DB={
  'Vicious Mockery':{
    lv:0,school:'Enchantment',ct:'1 Action',range:'60 ft',comp:'V',dur:'Instantaneous',conc:false,dmg:'1d6 psychic',save:'WIS',tags:['damage','control'],
    desc:'WIS save DC 16 or take 1d6 psychic damage and have disadvantage on its next attack roll before the end of its next turn.',
    'desc-spa':'Salva de SAB CD 16 o sufre 1d6 daño psíquico y tiene desventaja en su próximo ataque antes del final de su siguiente turno.',
    upc:'2d6 (lv5) · 3d6 (lv11) · 4d6 (lv17)',
    long_desc: `You unleash a string of insults laced with subtle enchantments at one creature you can see or hear within range. The target must succeed on a Wisdom saving throw or take 1d6 Psychic damage and have Disadvantage on the next attack roll it makes before the end of its next turn.
Cantrip Upgrade. The damage increases by 1d6 when you reach levels 5 (2d6), 11 (3d6), and 17 (4d6).`,
    long_desc_spa: `Desatas una serie de insultos impregnados de sutiles encantamientos a una criatura que puedas ver u oír dentro del alcance. El objetivo debe tener éxito en una tirada de salvación de Sabiduría o sufrir 1d6 de daño psíquico y tener desventaja en la próxima tirada de ataque que realice antes del final de su siguiente turno.
Mejora de truco. El daño aumenta en 1d6 cuando alcanzas los niveles 5 (2d6), 11 (3d6) y 17 (4d6).`
  },
  'Mage Hand':{
    lv:0,school:'Conjuration',ct:'1 Action',range:'30 ft',comp:'V, S',dur:'1 minute',conc:false,tags:['utility'],
    desc:'Spectral floating hand. Manipulate objects up to 10 lbs, open unlocked containers/doors, pour vials. Magic action to control and move up to 30 ft. Cannot attack or activate magic items.',
    'desc-spa':'Mano flotante espectral. Manipula objetos de hasta 10 lb, abre contenedores o puertas sin cerrojo y vierte viales. Acción Mágica para controlarla y moverla hasta 30 pies. No puede atacar ni activar objetos mágicos.',
    upc:'',
    long_desc: `A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration. The hand vanishes if it is ever more than 30 feet away from you or if you cast this spell again.
When you cast the spell, you can use the hand to manipulate an object, open an unlocked door or container, stow or retrieve an item from an open container, or pour the contents out of a vial.
As a Magic action on your later turns, you can control the hand thus again. As part of that action, you can move the hand up to 30 feet.
The hand can’t attack, activate magic items, or carry more than 10 pounds.`,
    long_desc_spa: `Una mano espectral y flotante aparece en un punto que elijas dentro del alcance. La mano dura por la duración del conjuro. La mano se desvanece si alguna vez está a más de 30 pies de ti o si vuelves a lanzar este conjuro.
Cuando lanzas el conjuro, puedes usar la mano para manipular un objeto, abrir una puerta o contenedor sin cerrojo, guardar o recuperar un objeto de un contenedor abierto, o verter el contenido de un vial.
Como una acción Mágica en tus turnos posteriores, puedes controlar la mano de esta manera nuevamente. Como parte de esa acción, puedes mover la mano hasta 30 pies.
La mano no puede atacar, activar objetos mágicos ni cargar más de 10 libras.`
  },
  'Minor Illusion':{
    lv:0,school:'Illusion',ct:'1 Action',range:'30 ft',comp:'S, M',dur:'1 minute',conc:false,tags:['utility'],
    desc:'Create a sound or image (5 ft cube). Study action with INT check DC 13 to identify as illusory.',
    'desc-spa':'Crea un sonido o una imagen (cubo de 5 pies). Acción de Estudio con prueba de INT CD 13 para identificarlo como una ilusión.',
    upc:'',
    long_desc: `You create a sound or an image of an object within range that lasts for the duration. See the descriptions below for the effects of each. The illusion ends if you cast this spell again.
If a creature takes a Study action to examine the sound or image, the creature can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the illusion becomes faint to the creature.
Sound. If you create a sound, its volume can range from a whisper to a scream. It can be your voice, someone else’s voice, a lion’s roar, a beating of drums, or any other sound you choose. The sound continues unabated throughout the duration, or you can make discrete sounds at different times before the spell ends.
Image. If you create an image of an object—such as a chair, muddy footprints, or a small chest—it must be no larger than a 5-foot Cube. The image can’t create sound, light, smell, or any other sensory effect. Physical interaction with the image reveals it to be an illusion, since things can pass through it.`,
    long_desc_spa: `Creas un sonido o la imagen de un objeto dentro del alcance que dura por la duración del conjuro. Consulta las descripciones a continuación para conocer los efectos de cada uno. La ilusión termina si vuelves a lanzar este conjuro.
Si una criatura realiza una acción de Estudio para examinar el sonido o la imagen, puede determinar que se trata de una ilusión con una prueba exitosa de Inteligencia (Investigación) contra la CD de salvación de tus conjuros. Si una criatura discierne la ilusión por lo que es, la ilusión se vuelve tenue para ella.
Sonido. Si creas un sonido, su volumen puede variar desde un susurro hasta un grito. Puede ser tu voz, la voz de otra persona, el rugido de un león, el batir de tambores o cualquier otro sonido que elijas. El sonido continúa inalterado durante toda la duración, o puedes hacer sonidos discretos en diferentes momentos antes de que termine el conjuro.
Imagen. Si creas la imagen de un objeto—como una silla, huellas embarradas o un cofre pequeño—este no debe ser más grande que un cubo de 5 pies. La imagen no puede crear sonido, luz, olor ni ningún otro efecto sensorial. La interacción física con la imagen revela que es una ilusión, ya que las cosas pueden pasar a través de ella.`
  },
  'Command':{
    lv:1,school:'Enchantment',ct:'1 Action',range:'60 ft',comp:'V',dur:'Instantaneous',conc:false,save:'WIS',tags:['control'],special:'⚡ VARA: Free use 1×/Long Rest. +1 creature if command is a rhyme.',
    desc:'One-word command to a creature. WIS save DC 16 or follow it on its next turn (Options: Approach, Drop, Flee, Grovel, Halt).',
    'desc-spa':'Orden de una sola palabra a una criatura. Salva de SAB CD 16 o la cumple en su siguiente turno (Opciones: Aproximarse, Soltar, Huir, Postrarse, Detenerse).',
    upc:'+1 creature per slot level above 1st',
    long_desc: `You speak a one-word command to a creature you can see within range. The target must succeed on a Wisdom saving throw or follow the command on its next turn. Choose the command from these options:
Approach. The target moves toward you by the shortest and most direct route, ending its turn if it moves within 5 feet of you.
Drop. The target drops whatever it is holding and then ends its turn.
Flee. The target spends its turn moving away from you by the fastest available means.
Grovel. The target has the Prone condition and then ends its turn.
Halt. On its turn, the target doesn’t move and takes no action or Bonus Action.
Using a Higher-Level Spell Slot. You can affect one additional creature for each spell slot level above 1.`,
    long_desc_spa: `Dices una orden de una sola palabra a una criatura que puedas ver dentro del alcance. El objetivo debe tener éxito en una tirada de salvación de Sabiduría o cumplir la orden en su siguiente turno. Elige la orden de entre estas opciones:
Aproximarse. El objetivo se mueve hacia ti por la ruta más corta y directa, terminando su turno si se mueve a menos de 5 pies de ti.
Soltar. El objetivo suelta lo que sea que esté sosteniendo y luego termina su turno.
Huir. El objetivo pasa su turno alejándose de ti por los medios más rápidos disponibles.
Postrarse. El objetivo adquiere la condición de Derribado y luego termina su turno.
Detenerse. En su turno, el objetivo no se mueve y no realiza ninguna acción ni Acción de Bonificación.
Uso de un espacio de conjuro de nivel superior. Puedes afectar a una criatura adicional por cada nivel de espacio de conjuro por encima del 1.º.`
  },
  'Healing Word':{
    lv:1,school:'Abjuration',ct:'1 Bonus Action',range:'60 ft',comp:'V',dur:'Instantaneous',conc:false,dmg:'2d4+4 healing',tags:['healing'],
    desc:'A creature regains 2d4+4 HP. Cast as Bonus Action.',
    'desc-spa':'Una criatura recupera 2d4+4 PG. Se lanza como Acción de Bonificación.',
    upc:'+2d4 per slot level above 1st',
    long_desc: `A creature of your choice that you can see within range regains Hit Points equal to 2d4 plus your spellcasting ability modifier.
Using a Higher-Level Spell Slot. The healing increases by 2d4 for each spell slot level above 1.`,
    long_desc_spa: `Una criatura de tu elección que puedas ver dentro del alcance recupera puntos de golpe equivalentes a 2d4 más tu modificador de característica para lanzar conjuros.
Uso de un espacio de conjuro de nivel superior. La curación aumenta en 2d4 por cada nivel de espacio de conjuro por encima del 1.º.`
  },
  'Heroism':{
    lv:1,school:'Enchantment',ct:'1 Action',range:'Touch',comp:'V, S',dur:'Conc., 1 minute',conc:true,tags:['support'],
    desc:'Target immune to Frightened + gains 4 temp HP at start of each of its turns.',
    'desc-spa':'El objetivo es inmune a la condición de Asustado + gana 4 PG temporales al inicio de cada uno de sus turnos.',
    upc:'+1 creature per slot level above 1st',
    long_desc: `A willing creature you touch is imbued with bravery. Until the spell ends, the creature is immune to the Frightened condition and gains Temporary Hit Points equal to your spellcasting ability modifier at the start of each of its turns.
Using a Higher-Level Spell Slot. You can target one additional creature for each spell slot level above 1.`,
    long_desc_spa: `Una criatura voluntaria que toques se imbuye de valentía. Hasta que termine el conjuro, la criatura es inmune a la condición de Asustado y gana puntos de golpe temporales equivalentes a tu modificador de característica para lanzar conjuros al comienzo de cada uno de sus turnos.
Uso de un espacio de conjuro de nivel superior. Puedes elegir como objetivo a una criatura adicional por cada nivel de espacio de conjuro por encima del 1.º.`
  },
  'Dissonant Whispers':{
    lv:1,school:'Enchantment',ct:'1 Action',range:'60 ft',comp:'V',dur:'Instantaneous',conc:false,dmg:'3d6 psychic',save:'WIS',tags:['damage','control'],
    desc:'WIS save DC 16 or take 3d6 psychic damage and use Reaction to flee at full speed. Half damage on success.',
    'desc-spa':'Salva de SAB CD 16 o sufre 3d6 daño psíquico y debe usar su Reacción inmediatamente para huir a velocidad máxima. Mitad de daño si la supera.',
    upc:'+1d6 per slot level above 1st',
    long_desc: `One creature of your choice that you can see within range hears a discordant melody in its mind. The target makes a Wisdom saving throw. On a failed save, it takes 3d6 Psychic damage and must immediately use its Reaction, if available, to move as far away from you as it can, using the safest route. On a successful save, the target takes half as much damage only.
Using a Higher-Level Spell Slot. The damage increases by 1d6 for each spell slot level above 1.`,
    long_desc_spa: `Una criatura de tu elección que puedas ver dentro del alcance escucha una melodía discordante en su mente. El objetivo realiza una tirada de salvación de Sabiduría. Si falla la salvación, sufre 3d6 de daño psíquico y debe usar inmediatamente su reacción, si está disponible, para alejarse de ti lo más que pueda, utilizando la ruta más segura. Si tiene éxito en la salvación, el objetivo sufre solo la mitad de daño.
Uso de un espacio de conjuro de nivel superior. El daño aumenta en 1d6 por cada nivel de espacio de conjuro por encima del 1.º.`
  },
  'Suggestion':{
    lv:2,school:'Enchantment',ct:'1 Action',range:'30 ft',comp:'V, M',dur:'Conc., 8 hours',conc:true,save:'WIS',tags:['control','roleplay'],
    desc:'Reasonable suggestion (max 25 words). WIS save DC 16 or Charmed and pursues suggestion to the best of its ability. Ends if damaged.',
    'desc-spa':'Sugerencia razonable (máx 25 palabras). Salva de SAB CD 16 o queda Encantado y cumple la sugerencia lo mejor que pueda. Termina si sufre daño.',
    upc:'',
    long_desc: `You suggest a course of activity—described in no more than 25 words—to one creature you can see within range that can hear and understand you. The suggestion must sound achievable and not involve anything that would obviously deal damage to the target or its allies. For example, you could say, “Fetch the key to the cult’s treasure vault, and give the key to me.” Or you could say, “Stop fighting, leave this library peacefully, and don’t return.”
The target must succeed on a Wisdom saving throw or have the Charmed condition for the duration or until you or your allies deal damage to the target. The Charmed target pursues the suggestion to the best of its ability. The suggested activity can continue for the entire duration, but if the suggested activity can be completed in a shorter time, the spell ends for the target upon completing it.`,
    long_desc_spa: `Sugeres un curso de acción—descrito en no más de 25 palabras—a una criatura que puedas ver dentro del alcance y que pueda escucharte y entenderte. La sugerencia debe sonar realizable y no involucrar nada que obviamente cause daño al objetivo o a sus aliados. Por ejemplo, podrías decir: "Trae la llave de la bóveda del tesoro del culto y dámela". O podrías decir: "Deja de luchar, sal de esta biblioteca pacíficamente y no regreses".
El objetivo debe tener éxito en una tirada de salvación de Sabiduría o adquirir la condición de Encantado durante la duración o hasta que tú o tus aliados le causen daño. El objetivo encantado sigue la sugerencia lo mejor que puede. La actividad sugerida puede continuar durante toda la duración, pero si se puede completar en menos tiempo, el conjuro termina para el objetivo al completarla.`
  },
  'Hold Person':{
    lv:2,school:'Enchantment',ct:'1 Action',range:'60 ft',comp:'V, S, M',dur:'Conc., 1 minute',conc:true,save:'WIS',tags:['control'],
    desc:'Humanoid paralyzed. WIS save DC 16 or Paralyzed. Repeat save each turn. Attacks ADV; melee hits in 5 ft are crits.',
    'desc-spa':'Humanoide paralizado. Salva de SAB CD 16 o queda Paralizado. Repite la salva al final de cada uno de sus turnos. Ataques con VENTAJA; impactos cuerpo a cuerpo a menos de 5 pies son críticos.',
    upc:'+1 creature per slot level above 2nd',
    long_desc: `Choose a Humanoid that you can see within range. The target must succeed on a Wisdom saving throw or have the Paralyzed condition for the duration. At the end of each of its turns, the target repeats the save, ending the spell on itself on a success.
Using a Higher-Level Spell Slot. You can target one additional Humanoid for each spell slot level above 2.`,
    long_desc_spa: `Elige a un humanoide que puedas ver dentro del alcance. El objetivo debe tener éxito en una tirada de salvación de Sabiduría o adquirir la condición de Paralizado durante la duración. Al final de cada uno de sus turnos, el objetivo repite la salvación, terminando el conjuro sobre sí mismo si tiene éxito.
Uso de un espacio de conjuro de nivel superior. Puedes elegir como objetivo a un humanoide adicional por cada nivel de espacio de conjuro por encima del 2.º.`
  },
  'Hypnotic Pattern':{
    lv:3,school:'Illusion',ct:'1 Action',range:'120 ft',comp:'S, M',dur:'Conc., 1 minute',conc:true,save:'WIS',tags:['control','aoe'],
    desc:'30 ft cube of colors. WIS save DC 16 or Charmed (Incapacitated, speed 0). Ends on damage or if shaken.',
    'desc-spa':'Cubo de colores de 30 pies. Salva de SAB CD 16 o queda Encantado (Incapacitado, velocidad 0). Termina si sufre daño o si alguien usa una acción para sacudirlo.',
    upc:'',
    long_desc: `You create a twisting pattern of colors in a 30-foot Cube within range. The pattern appears for a moment and vanishes. Each creature in the area who can see the pattern must succeed on a Wisdom saving throw or have the Charmed condition for the duration. While Charmed, the creature has the Incapacitated condition and a Speed of 0.
The spell ends for an affected creature if it takes any damage or if someone else uses an action to shake the creature out of its stupor.`,
    long_desc_spa: `Creas un patrón entrelazado de colores en un cubo de 30 pies dentro del alcance. El patrón aparece por un momento y se desvanece. Cada criatura en el área que pueda ver el patrón debe tener éxito en una tirada de salvación de Sabiduría o adquirir la condición de Encantado durante la duración. Mientras está encantada, la criatura tiene la condición de Incapacitado y una velocidad de 0.
El conjuro termina para una criatura afectada si sufre algún daño o si otra persona usa una acción para sacudir a la criatura de su estupor.`
  },
  'Counterspell':{
    lv:3,school:'Abjuration',ct:'1 Reaction',range:'60 ft',comp:'S',dur:'Instantaneous',conc:false,save:'CON',tags:['reaction'],special:'🔮 Magical Secrets · War Caster: use as Opportunity Attack',
    desc:'Interrupt spellcasting. Caster makes CON save DC 16. On fail, spell dissipates, action is wasted, but slot is not expended.',
    'desc-spa':'Interrumpe el lanzamiento de un conjuro. El lanzador hace una salva de CON CD 16. Si falla, el conjuro se disipa y la acción se desperdicia, pero su espacio de conjuro no se gasta.',
    upc:'',
    long_desc: `You attempt to interrupt a creature in the process of casting a spell. The creature makes a Constitution saving throw. On a failed save, the spell dissipates with no effect, and the action, Bonus Action, or Reaction used to cast it is wasted. If that spell was cast with a spell slot, the slot isn’t expended.`,
    long_desc_spa: `Intentas interrumpir a una criatura en el proceso de lanzar un conjuro. La criatura realiza una tirada de salvación de Constitución. Si falla la salvación, el conjuro se disipa sin efecto, y la acción, acción de bonificación o reacción utilizada para lanzarlo se desperdicia. Si ese conjuro fue lanzado con un espacio de conjuro, el espacio no se gasta.`
  },
  'Dispel Magic':{
    lv:3,school:'Abjuration',ct:'1 Action',range:'120 ft',comp:'V, S',dur:'Instantaneous',conc:false,tags:['utility'],special:'🔮 Magical Secrets',
    desc:'End any spell lv3 or lower on target. For lv4+: spellcasting ability check DC 10 + spell level.',
    'desc-spa':'Termina cualquier conjuro de nivel 3 o inferior en el objetivo. Para nivel 4 o superior: prueba de característica usando tu aptitud mágica con CD 10 + nivel del conjuro.',
    upc:'Auto-ends a spell if its level is equal to or less than the slot used.',
    long_desc: `Choose one creature, object, or magical effect within range. Any ongoing spell of level 3 or lower on the target ends. For each ongoing spell of level 4 or higher on the target, make an ability check using your spellcasting ability (DC 10 plus that spell’s level). On a successful check, the spell ends.
Using a Higher-Level Spell Slot. You automatically end a spell on the target if the spell’s level is equal to or less than the level of the spell slot you use.`,
    long_desc_spa: `Elige una criatura, objeto o efecto mágico dentro del alcance. Cualquier conjuro activo de nivel 3 o inferior en el objetivo termina. Para cada conjuro activo de nivel 4 o superior en el objetivo, realiza una prueba de característica usando tu aptitud mágica (CD 10 más el nivel de ese conjuro). Si tienes éxito en la prueba, el conjuro termina.
Uso de un espacio de conjuro de nivel superior. Terminas automáticamente un conjuro en el objetivo si el nivel del conjuro es igual o inferior al nivel del espacio de conjuro que utilices.`
  },
};