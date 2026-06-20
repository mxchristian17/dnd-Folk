// ─── BARD FEATURES ────────────────────
const BARD_FEATS = [
  {
    name: 'Bardic Inspiration',
    lv: 1,
    desc: 'Bonus Action: grant a Bardic Inspiration die to a creature within 60 ft.',
    long_desc: 'You can supernaturally inspire others through words, music, or dance. This inspiration is represented by your Bardic Inspiration die, which is a d6. As a Bonus Action, you can inspire another creature within 60 feet of yourself who can see or hear you. That creature gains one of your Bardic Inspiration dice. A creature can have only one Bardic Inspiration die at a time. Once within the next hour when the creature fails a D20 Test, the creature can roll the Bardic Inspiration die and add the number rolled to the d20, potentially turning the failure into a success. The die is then expended. You can confer Bardic Inspiration a number of times equal to your Charisma modifier (minimum once), and you regain all expended uses when you finish a Long Rest. The Bardic Inspiration die becomes a d8 at level 5, a d10 at level 10, and a d12 at level 15.'
  },

  {
    name: 'Spellcasting',
    lv: 1,
    desc: 'Cast Bard spells using Charisma.',
    long_desc: 'You have learned to cast spells through artistic expression. Charisma is your spellcasting ability for your Bard spells. You prepare spells from the Bard spell list, can cast Ritual spells that have the Ritual tag, and use the Bard spellcasting table to determine spell slots. You can use a Musical Instrument as a Spellcasting Focus for your Bard spells.'
  },

  {
    name: 'Expertise',
    lv: 2,
    desc: 'Choose two skill proficiencies and double your proficiency bonus.',
    long_desc: 'You gain Expertise in two of your skill proficiencies of your choice. Whenever you make an ability check using either of those proficiencies, your Proficiency Bonus is doubled for that check. At Bard level 9, you gain Expertise in two additional skill proficiencies of your choice.'
  },

  {
    name: 'Jack of All Trades',
    lv: 2,
    desc: 'Add half your proficiency bonus to checks using skills you lack proficiency in.',
    long_desc: 'You can add half your Proficiency Bonus, rounded down, to any ability check you make that uses a skill proficiency you lack and that does not otherwise use your Proficiency Bonus.'
  },

  {
    name: 'College of Valor',
    lv: 3,
    desc: 'Join the College of Valor.',
    long_desc: 'Bards of the College of Valor preserve the memory of great heroes and inspire others to reach similar heights. Upon joining this college, you gain the Martial Training and Combat Inspiration features. Additional subclass features are gained at higher Bard levels.'
  },

  {
    name: 'Martial Training',
    lv: 3,
    desc: 'Gain proficiency with Martial Weapons, Medium Armor, and Shields.',
    long_desc: 'You gain proficiency with Martial Weapons and training with Medium Armor and Shields. In addition, you can use a Simple or Martial Weapon as a Spellcasting Focus for your Bard spells.'
  },

  {
    name: 'Combat Inspiration',
    lv: 3,
    desc: 'Bardic Inspiration can increase damage or improve defense.',
    long_desc: 'A creature that has one of your Bardic Inspiration dice can use it in special ways. Defense: when the creature is hit by an attack roll, it can use its Reaction to roll the Bardic Inspiration die and add the result to its Armor Class against that attack, potentially causing the attack to miss. Offense: immediately after the creature hits with an attack roll, it can roll the Bardic Inspiration die and add the result to the attack damage.'
  },

  {
    name: 'Ability Score Improvement',
    lv: 4,
    desc: 'Gain an Ability Score Improvement feat or another qualifying feat.',
    long_desc: 'You gain the Ability Score Improvement feat or another feat for which you qualify. This feature represents growth through experience and training and is gained multiple times as you advance in the Bard class.'
  },

  {
    name: 'Font of Inspiration',
    lv: 5,
    desc: 'Recover Bardic Inspiration on a Short or Long Rest.',
    long_desc: 'You now regain all expended uses of Bardic Inspiration whenever you finish a Short Rest or a Long Rest. Additionally, you can expend a spell slot with no action required to regain one expended use of Bardic Inspiration.'
  },

  {
    name: 'Extra Attack',
    lv: 6,
    desc: 'Attack twice whenever you take the Attack action.',
    long_desc: 'You can attack twice instead of once whenever you take the Attack action on your turn. Moreover, you can replace one of those attacks with the casting of a Bard cantrip that has a casting time of one action.'
  },

  {
    name: 'Countercharm',
    lv: 7,
    desc: 'Reaction: reroll failed saves against Charmed or Frightened.',
    long_desc: 'You can use musical notes or words of power to interfere with harmful mental effects. When you or a creature within 30 feet of you fails a saving throw against an effect that applies the Charmed or Frightened condition, you can use your Reaction to cause that saving throw to be rerolled. The new roll is made with Advantage.'
  },

  {
    name: 'Ability Score Improvement',
    lv: 8,
    desc: 'Gain an Ability Score Improvement feat or another qualifying feat.',
    long_desc: 'You gain the Ability Score Improvement feat or another feat for which you qualify. This is the second Ability Score Improvement available to a Bard before level 10.'
  },

  {
    name: 'War Caster',
    lv: 8,
    desc: 'Advantage on Concentration saves and enhanced spellcasting in combat.',
    long_desc: 'You gain Advantage on Constitution saving throws that you make to maintain Concentration on a spell. You can perform the Somatic components of spells even when you have weapons or a shield in one or both hands. In addition, when a creature provokes an Opportunity Attack from you, you can cast a spell that has a casting time of one action and targets only that creature instead of making a weapon attack.'
  }
];

