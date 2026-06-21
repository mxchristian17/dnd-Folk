// ─── BARD FEATURES ────────────────────
const BARD_FEATS = [
  {
    name: 'Bardic Inspiration',
    lv: 1,
    desc: 'Bonus Action: grant a Bardic Inspiration die to a creature within 60 ft.',
    long_desc: 'You can supernaturally inspire others through words, music, or dance. This inspiration is represented by your Bardic Inspiration die, which is a d6. As a Bonus Action, you can inspire another creature within 60 feet of yourself who can see or hear you. That creature gains one of your Bardic Inspiration dice. A creature can have only one Bardic Inspiration die at a time. Once within the next hour when the creature fails a D20 Test, the creature can roll the Bardic Inspiration die and add the number rolled to the d20, potentially turning the failure into a success. The die is then expended. You can confer Bardic Inspiration a number of times equal to your Charisma modifier (minimum once), and you regain all expended uses when you finish a Long Rest. The Bardic Inspiration die becomes a d8 at level 5, a d10 at level 10, and a d12 at level 15.',
    long_desc_spa: 'Puedes inspirar a otros de forma sobrenatural mediante palabras, música o danza. Esta inspiración está representada por tu dado de Inspiración Bárdica, que es un d6. Como Acción Adicional, puedes inspirar a otra criatura a 60 pies o menos de ti que pueda verte o escucharte. Esa criatura obtiene uno de tus dados de Inspiración Bárdica. Una criatura solo puede tener un dado de Inspiración Bárdica a la vez. Una vez durante la siguiente hora, cuando la criatura falle una Prueba de d20, puede tirar el dado de Inspiración Bárdica y sumar el número obtenido al d20, pudiendo convertir el fallo en un éxito. El dado se consume entonces. Puedes otorgar Inspiración Bárdica un número de veces igual a tu modificador por Carisma (mínimo una vez), y recuperas todos los usos gastados cuando terminas un Descanso Largo. El dado de Inspiración Bárdica pasa a ser un d8 a nivel 5, un d10 a nivel 10, y un d12 a nivel 15.'
  },

  {
    name: 'Spellcasting',
    lv: 1,
    desc: 'Cast Bard spells using Charisma.',
    long_desc: 'You have learned to cast spells through your bardic arts. See chapter 7 for the rules on spellcasting. The information below details how you use those rules with Bard spells, which appear in the Bard spell list later in the class\'s description.\n\nCantrips. You know two cantrips of your choice from the Bard spell list. Dancing Lights and Vicious Mockery are recommended.\n\nWhenever you gain a Bard level, you can replace one of your cantrips with another cantrip of your choice from the Bard spell list.\n\nWhen you reach Bard levels 4 and 10, you learn another cantrip of your choice from the Bard spell list, as shown in the Cantrips column of the Bard Features table.\n\nSpell Slots. The Bard Features table shows how many spell slots you have to cast your level 1+ spells. You regain all expended slots when you finish a Long Rest.\n\nPrepared Spells of Level 1+. You prepare the list of level 1+ spells that are available for you to cast with this feature. To start, choose four level 1 spells from the Bard spell list. Charm Person, Color Spray, Dissonant Whispers, and Healing Word are recommended.\n\nThe number of spells on your list increases as you gain Bard levels, as shown in the Prepared Spells column of the Bard Features table. Whenever that number increases, choose additional spells from the Bard spell list until the number of spells on your list matches the number on the table. The chosen spells must be of a level for which you have spell slots. For example, if you\'re a level 3 Bard, your list of prepared spells can include six spells of levels 1 and 2 in any combination.\n\nIf another Bard feature gives you spells that you always have prepared, those spells don\'t count against the number of spells you can prepare with this feature, but those spells otherwise count as Bard spells for you.\n\nChanging Your Prepared Spells. Whenever you gain a Bard level, you can replace one spell on your list with another Bard spell for which you have spell slots.\n\nSpellcasting Ability. Charisma is your spellcasting ability for your Bard spells.\n\nSpellcasting Focus. You can use a Musical Instrument as a Spellcasting Focus for your Bard spells.',
    long_desc_spa: 'Has aprendido a lanzar conjuros a través de tus artes bárdicas. Consulta el capítulo 7 para ver las reglas de lanzamiento de conjuros. La siguiente información detalla cómo utilizas esas reglas con los conjuros de Bardo, que aparecen en la lista de conjuros de Bardo más adelante en la descripción de la clase.\n\nTrucos. Conoces dos trucos de tu elección de la lista de conjuros de Bardo. Se recomiendan Luces Danzantes y Burla Cruel.\n\nCada vez que ganas un nivel de Bardo, puedes reemplazar uno de tus trucos por otro truco de tu elección de la lista de conjuros de Bardo.\n\nCuando alcanzas los niveles 4 y 10 de Bardo, aprendes otro truco de tu elección de la lista de conjuros de Bardo, como se muestra en la columna de Trucos de la tabla de Rasgos del Bardo.\n\nEspacios de Conjuro. La tabla de Rasgos del Bardo muestra cuántos espacios de conjuro tienes para lanzar tus conjuros de nivel 1 o superior. Recuperas todos los espacios gastados cuando terminas un Descanso Largo.\n\nConjuros Preparados de Nivel 1+. Preparas la lista de conjuros de nivel 1 o superior que tienes disponibles para lanzar con este rasgo. Para empezar, elige cuatro conjuros de nivel 1 de la lista de conjuros de Bardo. Se recomiendan Hechizar Persona, Rociada de Color, Susurros Discordantes y Palabra Curativa.\n\nEl número de conjuros en tu lista aumenta a medida que ganas niveles de Bardo, como se muestra en la columna de Conjuros Preparados de la tabla de Rasgos del Bardo. Cada vez que ese número aumente, elige conjuros adicionales de la lista de conjuros de Bardo hasta que el número de conjuros de tu lista coincida con el de la tabla. Los conjuros elegidos deben ser de un nivel para el que tengas espacios de conjuro. Por ejemplo, si eres un Bardo de nivel 3, tu lista de conjuros preparados puede incluir seis conjuros de niveles 1 y 2 en cualquier combinación.\n\nSi otro rasgo de Bardo te da conjuros que siempre tienes preparados, esos conjuros no cuentan para el número de conjuros que puedes preparar con este rasgo, pero por lo demás cuentan como conjuros de Bardo para ti.\n\nCambiar tus Conjuros Preparados. Cada vez que ganas un nivel de Bardo, puedes reemplazar un conjuro de tu lista por otro conjuro de Bardo para el que tengas espacios de conjuro.\n\nCaracterística para el Lanzamiento de Conjuros. El Carisma es tu característica para lanzar tus conjuros de Bardo.\n\nCanalizador Mágico. Puedes usar un Instrumento Musical como Canalizador Mágico para tus conjuros de Bardo.'
  },

  {
    name: 'Expertise',
    lv: 2,
    desc: 'Choose two skill proficiencies and double your proficiency bonus.',
    long_desc: 'You gain Expertise (see the rules glossary) in two of your skill proficiencies of your choice. Performance and Persuasion are recommended if you have proficiency in them.\n\nAt Bard level 9, you gain Expertise in two more of your skill proficiencies of your choice.',
    long_desc_spa: 'Ganas Pericia (ver el glosario de reglas) en dos de tus competencias en habilidades de tu elección. Se recomiendan Interpretación y Persuasión si tienes competencia en ellas.\n\nA nivel 9 de Bardo, ganas Pericia en dos más de tus competencias en habilidades de tu elección.'
  },

  {
    name: 'Jack of All Trades',
    lv: 2,
    desc: 'Add half your proficiency bonus to checks using skills you lack proficiency in.',
    long_desc: 'You can add half your Proficiency Bonus (round down) to any ability check you make that uses a skill proficiency you lack and that doesn\'t otherwise use your Proficiency Bonus.\n\nFor example, if you make a Strength (Athletics) check and lack Athletics proficiency, you can add half your Proficiency Bonus to the check.',
    long_desc_spa: 'Puedes añadir la mitad de tu Bonificador por Competencia (redondeando hacia abajo) a cualquier prueba de característica que hagas que use una competencia en habilidad que no tengas y que no use tu Bonificador por Competencia de otra forma.\n\nPor ejemplo, si haces una prueba de Fuerza (Atletismo) y no tienes competencia en Atletismo, puedes añadir la mitad de tu Bonificador por Competencia a la prueba.'
  },

  {
    name: 'Ability Score Improvement',
    lv: 4,
    desc: 'Gain an Ability Score Improvement feat or another qualifying feat.',
    long_desc: 'You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Bard levels 8, 12, and 16.',
    long_desc_spa: 'Obtienes la dote de Mejora de Puntuación de Característica u otra dote de tu elección para la que cumplas los requisitos. Ganas este rasgo de nuevo a los niveles de Bardo 8, 12 y 16.'
  },

  {
    name: 'Martial Training',
    lv: 3,
    desc: 'Gain proficiency with Martial Weapons, Medium Armor, and Shields.',
    long_desc: 'College of Valor Feature\n\nYou gain proficiency with Martial weapons and training with Medium armor and Shields.\n\nIn addition, you can use a Simple or Martial weapon as a Spellcasting Focus to cast spells from your Bard spell list.',
    long_desc_spa: 'Rasgo del Colegio del Valor\n\nObtienes competencia con armas Marciales y entrenamiento con armaduras Medias y Escudos.\n\nAdemás, puedes usar un arma Simple o Marcial como Canalizador Mágico para lanzar conjuros de tu lista de conjuros de Bardo.'
  },

  {
    name: 'Combat Inspiration',
    lv: 3,
    desc: 'Bardic Inspiration can increase damage or improve defense.',
    long_desc: 'College of Valor Feature\n\nYou can use your wit to turn the tide of battle. A creature that has a Bardic Inspiration die from you can use it for one of the following effects.\n\nDefense. When the creature is hit by an attack roll, that creature can use its Reaction to roll the Bardic Inspiration die and add the number rolled to its AC against that attack, potentially causing the attack to miss.\n\nOffense. Immediately after the creature hits a target with an attack roll, the creature can roll the Bardic Inspiration die and add the number rolled to the attack’s damage against the target.',
    long_desc_spa: 'Rasgo del Colegio del Valor\n\nPuedes usar tu ingenio para cambiar el rumbo de la batalla. Una criatura que tenga un dado de Inspiración Bárdica tuyo puede usarlo para uno de los siguientes efectos.\n\nDefensa. Cuando la criatura es impactada por una tirada de ataque, esa criatura puede usar su Reacción para tirar el dado de Inspiración Bárdica y sumar el número obtenido a su CA contra ese ataque, pudiendo hacer que el ataque falle.\n\nAtaque. Inmediatamente después de que la criatura impacte a un objetivo con una tirada de ataque, la criatura puede tirar el dado de Inspiración Bárdica y sumar el número obtenido al daño del ataque contra el objetivo.'
  },

  {
    name: 'Extra Attack',
    lv: 6,
    desc: 'Attack twice whenever you take the Attack action.',
    long_desc: 'College of Valor Feature\n\nYou can attack twice instead of once whenever you take the Attack action on your turn.\n\nIn addition, you can cast one of your cantrips that has a casting time of an action in place of one of those attacks.',
    long_desc_spa: 'Rasgo del Colegio del Valor\n\nPuedes atacar dos veces en lugar de una siempre que realices la acción de Ataque en tu turno.\n\nAdemás, puedes lanzar uno de tus trucos que tenga un tiempo de lanzamiento de una acción en lugar de uno de esos ataques.'
  },

  {
    name: 'Battle Magic',
    lv: 14,
    desc: 'Cast a spell and make a weapon attack as a Bonus Action.',
    long_desc: 'College of Valor Feature\n\nAfter you cast a spell that has a casting time of an action, you can make one attack with a weapon as a Bonus Action.',
    long_desc_spa: 'Rasgo del Colegio del Valor\n\nDespués de lanzar un conjuro que tenga un tiempo de lanzamiento de una acción, puedes realizar un ataque con un arma como Acción Adicional.'
  },

  {
    name: 'Font of Inspiration',
    lv: 5,
    desc: 'Recover Bardic Inspiration on a Short or Long Rest.',
    long_desc: 'You now regain all your expended uses of Bardic Inspiration when you finish a Short or Long Rest.\n\nIn addition, you can expend a spell slot (no action required) to regain one expended use of Bardic Inspiration.',
    long_desc_spa: 'Ahora recuperas todos tus usos gastados de Inspiración Bárdica cuando terminas un Descanso Corto o Largo.\n\nAdemás, puedes gastar un espacio de conjuro (no requiere acción) para recuperar un uso gastado de Inspiración Bárdica.'
  },

  {
    name: 'Countercharm',
    lv: 7,
    desc: 'Reaction: reroll failed saves against Charmed or Frightened.',
    long_desc: 'You can use musical notes or words of power to disrupt mind-influencing effects. If you or a creature within 30 feet of you fails a saving throw against an effect that applies the Charmed or Frightened condition, you can take a Reaction to cause the save to be rerolled, and the new roll has Advantage.',
    long_desc_spa: 'Puedes usar notas musicales o palabras de poder para interrumpir efectos que influyen en la mente. Si tú o una criatura a 30 pies o menos de ti falla una tirada de salvación contra un efecto que aplica la condición de Hechizado o Asustado, puedes usar una Reacción para hacer que se repita la tirada de salvación, y la nueva tirada tiene Ventaja.'
  }
];