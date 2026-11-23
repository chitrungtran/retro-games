/**
 * Tarot & Numbers - the 78-card deck (original English keywords and meanings written for this site).
 * Card ids match the image files: <id>.webp (major-00-fool ... major-21-world, wands-01 ... pentacles-14;
 * 01 = Ace, 02-10 = pips, 11 = Page, 12 = Knight, 13 = Queen, 14 = King).
 * Node: new Function(src + 'return createTarotDeck;')()()
 */
function createTarotDeck() {
  var ROMAN = ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI'];
  var cards = [];
  var MAJOR_SLUGS = [];
  // M(slug, name, upright keywords, reversed keywords, upright meaning, reversed meaning)
  function M(slug, name, ku, kr, mu, mr) {
    var n = MAJOR_SLUGS.length;
    MAJOR_SLUGS.push(slug);
    cards.push({ id: 'major-' + (n < 10 ? '0' : '') + n + '-' + slug, name: name, arcana: 'major', suit: null, rank: n,
      numeral: ROMAN[n], up: ku, rev: kr, upright: mu, reversed: mr });
  }

  M('fool', 'The Fool', 'beginnings, trust, open road', 'recklessness, hesitation, a blind leap',
    'A fresh chapter is opening. You do not need the whole map yet; curiosity and a light step are enough to begin.',
    'Either you are rushing ahead without looking, or fear is keeping you at the edge. Pause, check your footing, then choose.');
  M('magician', 'The Magician', 'skill, focus, making it real', 'scattered effort, trickery, untapped talent',
    'Everything you need is already on the table. Name your intention clearly and put your tools to work.',
    'Your energy is spread too thin, or someone is promising more than they can deliver. Bring your attention back to one aim.');
  M('high-priestess', 'The High Priestess', 'intuition, stillness, hidden knowledge', 'ignored instincts, secrets, inner noise',
    'The answer is quieter than the question. Give yourself silence and notice what you already sense.',
    'You may be talking over your own intuition, or something important has not been said yet. Listen before you act.');
  M('empress', 'The Empress', 'abundance, care, creativity', 'neglect, smothering, creative block',
    'Growth comes through nourishment. Tend your body, your relationships and your projects, and they respond.',
    'You may be giving care to everyone except yourself, or holding on too tightly. Refill your own well first.');
  M('emperor', 'The Emperor', 'structure, authority, steady leadership', 'rigidity, control, shaky foundations',
    'Order serves you now. Set clear rules, keep your word and take responsibility for the shape of things.',
    'Structure has hardened into control, or the foundation is missing. Ask whether your rules still serve their purpose.');
  M('hierophant', 'The Hierophant', 'tradition, learning, shared values', 'questioning rules, dogma, going your own way',
    'There is wisdom in what has been tested. A teacher, a community or a proven method can guide you.',
    'A tradition no longer fits you, or you are following rules without asking why. Respect the lesson, then decide for yourself.');
  M('lovers', 'The Lovers', 'union, alignment, meaningful choice', 'disharmony, mixed values, avoidance',
    'A choice of the heart is before you. Choose what aligns with your values, not only what feels easy.',
    'Something is out of step: between two people, or between what you say and what you do. Honesty restores the balance.');
  M('chariot', 'The Chariot', 'willpower, direction, momentum', 'drifting, conflict within, lost control',
    'Hold the reins firmly and point yourself at the goal. Discipline turns competing forces into forward motion.',
    'You are being pulled in two directions. Decide where you are going before pushing harder.');
  M('strength', 'Strength', 'courage, patience, gentle power', 'self-doubt, frustration, force over grace',
    'Real strength is calm. Meet the wild thing, in you or around you, with steadiness and kindness.',
    'Doubt or impatience is getting the upper hand. Be gentle with yourself; confidence grows back with small wins.');
  M('hermit', 'The Hermit', 'reflection, solitude, inner guidance', 'isolation, withdrawal, avoiding counsel',
    'Step back from the noise. Time alone with your own lantern will show you the next step.',
    'Solitude has turned into hiding. Reach out; a conversation may light the path faster than more thinking.');
  M('wheel-of-fortune', 'Wheel of Fortune', 'cycles, turning point, timing', 'resistance to change, setbacks, repeating patterns',
    'The wheel is turning. Circumstances are shifting, and you can move with the change rather than against it.',
    'A cycle keeps repeating or luck feels stuck. Look at what you can change in your own choices.');
  M('justice', 'Justice', 'fairness, truth, cause and effect', 'imbalance, evasion, unfair outcome',
    'Clarity and honesty decide this. Weigh the facts, own your part and act with integrity.',
    'Something is out of balance or not being told straight. Be honest with yourself about your share.');
  M('hanged-man', 'The Hanged Man', 'pause, surrender, new perspective', 'stalling, resistance, needless sacrifice',
    'Waiting is not wasted time. Let go of forcing the outcome and look at the situation from another angle.',
    'You may be stuck in limbo by your own choice. Decide what you are willing to release, then move.');
  M('death', 'Death', 'endings, transformation, clearing space', 'clinging, fear of change, slow transition',
    'Something is complete. Letting it close makes room for what is ready to begin. This card speaks of change, not literal loss.',
    'You are holding a door shut that wants to close. The ending is easier than the waiting.');
  M('temperance', 'Temperance', 'balance, moderation, healing blend', 'excess, imbalance, impatience',
    'Find the middle way. Patience and a steady mix of opposites bring things into harmony.',
    'Too much of one thing is tipping the scale. Slow down and restore your rhythm.');
  M('devil', 'The Devil', 'attachment, temptation, shadow', 'release, breaking free, facing the habit',
    'Notice what has a hold on you: a habit, a fear, a relationship. The chains are looser than they look.',
    'You are ready to loosen a grip that has held you. Each honest step away from it counts.');
  M('tower', 'The Tower', 'sudden change, revelation, breakthrough', 'averted crisis, fear of upheaval, delayed truth',
    'A false structure is coming down. It may be jolting, but what remains is truer and more solid.',
    'You sense a shake-up coming and are trying to hold it off. Gentle change now may spare a harder one later.');
  M('star', 'The Star', 'hope, renewal, quiet faith', 'discouragement, lost faith, disconnection',
    'After the storm comes clear sky. Healing is under way; trust the slow return of hope.',
    'You may feel the light has gone out. Reconnect with one small thing that still inspires you.');
  M('moon', 'The Moon', 'dreams, uncertainty, the unconscious', 'clearing fog, released fear, truth emerging',
    'Not everything is as it seems. Move carefully, trust your instincts and let feelings settle before deciding.',
    'The fog is lifting. Confusion or fear is easing and you can begin to see the shape of things.');
  M('sun', 'The Sun', 'joy, clarity, vitality', 'dimmed joy, overconfidence, delayed success',
    'Warmth and clarity are with you. This is a time to be seen, to celebrate and to enjoy simple good things.',
    'The light is there but partly clouded. Lower the pressure on yourself and let joy in.');
  M('judgement', 'Judgement', 'awakening, reckoning, calling', 'self-criticism, doubt, ignoring the call',
    'A moment of honest review. Forgive the past, hear what is calling you and answer it.',
    'Harsh self-judgement is keeping you from rising. Learn the lesson and allow yourself a fresh start.');
  M('world', 'The World', 'completion, wholeness, arrival', 'loose ends, unfinished business, delay',
    'A cycle is complete. Recognise how far you have come before stepping into the next journey.',
    'You are close to the finish but something is still open. Tie up the last thread.');

  var SUITS = {
    wands: { name: 'Wands', element: 'Fire', theme: 'drive, creativity and action' },
    cups: { name: 'Cups', element: 'Water', theme: 'feelings, love and intuition' },
    swords: { name: 'Swords', element: 'Air', theme: 'thought, truth and conflict' },
    pentacles: { name: 'Pentacles', element: 'Earth', theme: 'work, money, body and home' }
  };
  var RANKS = ['', 'Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Page', 'Knight', 'Queen', 'King'];
  // S(suit, rank, upright keywords, reversed keywords, upright meaning, reversed meaning)
  function S(suit, rank, ku, kr, mu, mr) {
    cards.push({ id: suit + '-' + (rank < 10 ? '0' : '') + rank, name: RANKS[rank] + ' of ' + SUITS[suit].name,
      arcana: 'minor', suit: suit, rank: rank, numeral: '', up: ku, rev: kr, upright: mu, reversed: mr });
  }

  S('wands', 1, 'spark, inspiration, new venture', 'false start, delay, low energy',
    'A new idea or burst of energy arrives. Act on it while the spark is bright.',
    'The idea is there but the timing or energy is off. Rest, then try again.');
  S('wands', 2, 'planning, vision, first decision', 'fear of the unknown, playing safe, poor planning',
    'You can see the wider horizon. Make a plan and decide where you want to go.',
    'Staying in the comfort zone is limiting you, or the plan needs more thought.');
  S('wands', 3, 'expansion, progress, looking ahead', 'obstacles, slow returns, short sight',
    'Your early efforts are starting to travel. Keep looking ahead; more is on its way.',
    'Things are moving slower than hoped. Adjust the plan rather than giving up.');
  S('wands', 4, 'celebration, home, milestone', 'unsettled home, postponed celebration, transition',
    'A moment to celebrate what has been built, often with people close to you.',
    'Something at home or in a group feels unsettled. Small gestures of welcome help.');
  S('wands', 5, 'competition, friction, sparring', 'avoiding conflict, truce, inner struggle',
    'Many voices are competing. Healthy rivalry can sharpen you if you keep it fair.',
    'You may be avoiding a needed disagreement, or the conflict is now inside you.');
  S('wands', 6, 'recognition, victory, confidence', 'self-doubt, lack of credit, fall from favour',
    'Your work is being noticed. Accept recognition gracefully and keep going.',
    'You are waiting for applause that is not coming. Value your own progress.');
  S('wands', 7, 'standing firm, defence, conviction', 'overwhelm, giving way, exhaustion',
    'You may be challenged, but you hold the higher ground. Stand by what you believe.',
    'Defending everything at once is wearing you out. Choose which battles matter.');
  S('wands', 8, 'speed, news, swift movement', 'delays, frustration, scattered rush',
    'Things are moving fast. Messages, travel or progress arrive quickly; keep up.',
    'Momentum has stalled or everything is happening at once. Slow down to aim well.');
  S('wands', 9, 'resilience, persistence, last stretch', 'fatigue, defensiveness, near giving up',
    'You are tired but close. One more effort, with care for your boundaries, carries you through.',
    'You are running on empty. Ask for help before you burn out.');
  S('wands', 10, 'burden, responsibility, hard work', 'letting go, delegating, collapse under load',
    'You are carrying a lot. Check which loads are truly yours to carry.',
    'It is time to put some of the weight down or share it with others.');
  S('wands', 11, 'enthusiasm, exploration, eager news', 'impatience, half-starts, lack of direction',
    'A curious, adventurous energy invites you to try something new.',
    'Many ideas, little follow-through. Pick one and see it through.');
  S('wands', 12, 'boldness, adventure, passion', 'haste, impulsiveness, scattered energy',
    'Charge ahead with passion and confidence; this is a time to move.',
    'Rushing in without a plan could backfire. Channel the fire before it spreads.');
  S('wands', 13, 'warmth, confidence, magnetism', 'jealousy, insecurity, demanding',
    'Lead with warmth and self-belief. Your energy draws people in.',
    'Insecurity may show up as control or envy. Return to what makes you shine.');
  S('wands', 14, 'vision, leadership, bold decision', 'impatience, domineering, unrealistic plans',
    'Take the lead with a big-picture vision and inspire others to follow.',
    'Great vision needs patience and listening. Do not steamroll the people you lead.');

  S('cups', 1, 'new feeling, open heart, love offered', 'emotional block, holding back, empty cup',
    'Your heart is opening: new love, friendship, compassion or creative joy.',
    'Feelings are blocked or unspoken. Gentle honesty with yourself is the first step.');
  S('cups', 2, 'partnership, mutual respect, connection', 'imbalance, misunderstanding, distance',
    'A bond of equals forms or deepens. Meet the other person halfway.',
    'Something has slipped out of balance between you. Talk before resentment settles in.');
  S('cups', 3, 'friendship, community, celebration', 'gossip, overindulgence, feeling left out',
    'Shared joy and good company lift your spirits. Celebrate with your people.',
    'Social life feels tangled or excessive. Choose company that truly nourishes you.');
  S('cups', 4, 'apathy, contemplation, missed offer', 'renewed interest, saying yes, waking up',
    'Something is being offered, but you are looking elsewhere. Look up and consider it.',
    'You are coming out of a slump and ready to engage again.');
  S('cups', 5, 'regret, loss, grief', 'acceptance, moving on, forgiveness',
    'It is natural to mourn what spilled. Remember that not every cup has fallen.',
    'You are beginning to turn toward what remains and to forgive yourself.');
  S('cups', 6, 'nostalgia, kindness, innocence', 'living in the past, idealising, moving forward',
    'Memories, old friends or simple kindness bring comfort and perspective.',
    'Fond memories can hold you back if you live there. Take the lesson forward.');
  S('cups', 7, 'options, daydreams, illusion', 'clarity, focus, reality check',
    'Many possibilities glitter before you. Not all are real; choose with care.',
    'The fog clears and you can see which option is worth your energy.');
  S('cups', 8, 'walking away, seeking more, letting go', 'fear of leaving, drifting, aimless search',
    'Something no longer fulfils you. It may be time to leave and look for deeper meaning.',
    'You know it is time to go but hesitate, or you keep leaving without knowing why.');
  S('cups', 9, 'contentment, wishes granted, satisfaction', 'smugness, unmet wishes, inner emptiness',
    'A wish is within reach. Enjoy what you have created and feel grateful.',
    'Outer comfort does not equal inner peace. Ask what would truly satisfy you.');
  S('cups', 10, 'harmony, family, lasting happiness', 'broken harmony, unrealistic ideals, distance at home',
    'Emotional fulfilment and harmony at home or among loved ones.',
    'The picture-perfect ideal may be hiding tensions. Real harmony needs honest talk.');
  S('cups', 11, 'sensitivity, curiosity, emotional message', 'immaturity, moodiness, creative block',
    'A gentle message or creative idea arrives. Stay open and playful with your feelings.',
    'Feelings are running the show. Notice them without being ruled by them.');
  S('cups', 12, 'romance, charm, following the heart', 'unrealistic, moody, broken promises',
    'An invitation, a romantic gesture or a creative calling. Follow your heart with grace.',
    'Charm without substance. Check that words and actions match.');
  S('cups', 13, 'compassion, intuition, emotional depth', 'over-giving, dependency, insecurity',
    'Lead with empathy and trust your emotional intelligence.',
    'You may be absorbing everyone else\'s feelings. Protect your own calm.');
  S('cups', 14, 'emotional balance, diplomacy, calm', 'suppressed feelings, manipulation, volatility',
    'Steady and kind, you can hold strong feelings without being swept away.',
    'Feelings pushed down tend to surface sideways. Let them out safely.');

  S('swords', 1, 'clarity, breakthrough, truth', 'confusion, misused words, clouded judgement',
    'A sharp new insight cuts through confusion. Speak and decide with clarity.',
    'Thoughts are muddled or words are cutting the wrong way. Pause before speaking.');
  S('swords', 2, 'stalemate, hard choice, avoidance', 'information overload, indecision, release',
    'You are avoiding a decision to keep the peace. Remove the blindfold and look.',
    'The stalemate is breaking; you are ready to face what you have been avoiding.');
  S('swords', 3, 'heartbreak, sorrow, painful truth', 'healing, release, forgiveness',
    'A painful truth or hurt needs acknowledgement. Feeling it is part of healing.',
    'The wound is beginning to heal. Let yourself release what still stings.');
  S('swords', 4, 'rest, recovery, contemplation', 'restlessness, burnout, returning to action',
    'Rest is required. Step back, recover and let your mind settle.',
    'You have pushed past tiredness, or you are ready to come back after a break.');
  S('swords', 5, 'conflict, hollow win, tension', 'reconciliation, making amends, moving past',
    'Winning at any cost can leave you alone. Ask whether this fight is worth it.',
    'There is a chance to make peace and leave an old quarrel behind.');
  S('swords', 6, 'transition, moving on, calmer waters', 'unfinished business, resistance, stuck in place',
    'You are leaving rough waters for calmer ones. The journey itself brings relief.',
    'Something is holding you back from moving on. Address it so you can go.');
  S('swords', 7, 'strategy, secrecy, going it alone', 'coming clean, conscience, getting caught',
    'Think strategically, but watch for deception, your own or someone else\'s.',
    'Truth wants to come out. Honesty now costs less than secrecy later.');
  S('swords', 8, 'feeling trapped, self-limiting belief, fear', 'release, new perspective, self-acceptance',
    'The trap is mostly in the mind. A single step can loosen it.',
    'You are starting to see the way out. Keep taking it.');
  S('swords', 9, 'anxiety, worry, sleepless nights', 'hope, reaching out, fears fading',
    'Worry is louder at night. Write it down, share it and it shrinks.',
    'The worst of the anxiety is passing. Ask for support if it lingers.');
  S('swords', 10, 'painful ending, rock bottom, release', 'recovery, survival, rising again',
    'A difficult chapter has reached its end. From here the only way is up.',
    'You are getting back on your feet. Leave the old story where it fell.');
  S('swords', 11, 'curiosity, new ideas, alertness', 'gossip, scattered thoughts, all talk',
    'A quick mind and fresh questions. Learn, ask and observe.',
    'Words are moving faster than thought. Check facts before sharing.');
  S('swords', 12, 'ambition, decisive action, drive', 'haste, aggression, no plan',
    'Act decisively and cut through obstacles with focus.',
    'Charging ahead without thinking can hurt people. Slow the blade.');
  S('swords', 13, 'clear boundaries, independence, honesty', 'coldness, bitterness, harsh words',
    'Speak plainly and keep clear boundaries. Experience has made you wise.',
    'Hurt has hardened into coldness. Let truth be kind as well as clear.');
  S('swords', 14, 'intellect, authority, sound judgement', 'manipulation, misuse of power, rigid thinking',
    'Make decisions based on logic, fairness and clear principle.',
    'Cleverness is being used to control. Return to fairness.');

  S('pentacles', 1, 'new opportunity, prosperity, grounded start', 'missed chance, poor planning, lack',
    'A practical opportunity appears: a job, a project, a resource. Plant the seed.',
    'An opportunity is slipping or plans lack grounding. Look at the practical details.');
  S('pentacles', 2, 'balance, juggling, adaptability', 'overwhelm, disorganisation, dropped balls',
    'You are juggling priorities. Stay flexible and keep your rhythm.',
    'Too many balls in the air. Drop or delegate what does not matter.');
  S('pentacles', 3, 'teamwork, craft, collaboration', 'misalignment, poor quality, working alone',
    'Good work grows from cooperation and skill. Share what you know.',
    'The team is out of sync. Clarify roles and standards.');
  S('pentacles', 4, 'security, saving, holding on', 'letting go, generosity, or overspending',
    'Building security is wise, but do not hold so tight that nothing can flow.',
    'Loosen the grip, or check whether money is slipping away too freely.');
  S('pentacles', 5, 'hardship, worry, feeling left out', 'recovery, help found, improvement',
    'A lean time. Help is often nearer than it looks; ask for it.',
    'Things are improving. Accept support and rebuild step by step.');
  S('pentacles', 6, 'generosity, sharing, fair exchange', 'strings attached, imbalance, debt',
    'Give and receive with fairness. Kindness flows both ways.',
    'Notice where giving comes with conditions or where the exchange is unequal.');
  S('pentacles', 7, 'patience, long-term view, assessment', 'impatience, wasted effort, poor returns',
    'Growth takes time. Assess your progress and keep tending the garden.',
    'You may be investing in the wrong place, or expecting results too soon.');
  S('pentacles', 8, 'practice, mastery, diligence', 'perfectionism, boredom, cutting corners',
    'Steady practice builds real skill. Put in the hours.',
    'Either perfectionism is stalling you or attention to detail has slipped.');
  S('pentacles', 9, 'independence, self-reliance, enjoyment', 'overwork, dependence, hollow luxury',
    'You have earned some comfort. Enjoy the fruits of your own effort.',
    'Check whether you are working too hard to enjoy what you have built.');
  S('pentacles', 10, 'legacy, family, lasting wealth', 'family tension, instability, short-term thinking',
    'Long-term security and family ties. Think about what you build for the future.',
    'Old patterns around money or family need attention.');
  S('pentacles', 11, 'learning, ambition, new skill', 'procrastination, lack of focus, slow progress',
    'A promising start in study or work. Be diligent and curious.',
    'Good intentions are not yet matched by steady effort.');
  S('pentacles', 12, 'reliability, routine, persistence', 'stagnation, boredom, stubbornness',
    'Slow and steady wins here. Keep showing up.',
    'Routine has become a rut. Change one small thing.');
  S('pentacles', 13, 'nurturing, practicality, comfort', 'imbalance between work and home, self-neglect',
    'Care for people and practical matters with a warm, grounded hand.',
    'Looking after everything else may be leaving you depleted.');
  S('pentacles', 14, 'abundance, stability, success', 'greed, rigidity, material focus',
    'Material and practical success through steady, wise choices.',
    'Wealth or status may be crowding out what matters most.');

  var byId = {};
  cards.forEach(function (c) { byId[c.id] = c; });
  return { cards: cards, byId: byId, ids: cards.map(function (c) { return c.id; }), SUITS: SUITS };
}
