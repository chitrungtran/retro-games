/**
 * Tarot & Numbers - angel number meanings (written for this site). ASCII only.
 * createAngelNumbers() -> { list, get(number), DIGITS, root(number) }
 */
function createAngelNumbers() {
  'use strict';
  var DIGITS = {
    0: { kw: 'potential, wholeness, a clean slate', text: 'Zero is the open circle: pure potential and a reminder that you are part of something larger.' },
    1: { kw: 'new beginnings, intention, self-leadership', text: 'One is the first step. Your thoughts are seeds right now, so plant the ones you want to grow.' },
    2: { kw: 'balance, partnership, trust', text: 'Two is about cooperation and patience. Things are lining up quietly; trust the timing.' },
    3: { kw: 'creativity, expression, support', text: 'Three is joy and self-expression. Speak up, create and accept the help around you.' },
    4: { kw: 'stability, foundations, steady effort', text: 'Four is the builder. Solid, patient work now creates security that lasts.' },
    5: { kw: 'change, freedom, movement', text: 'Five brings change. Loosen your grip and let something new move in.' },
    6: { kw: 'care, home, harmony', text: 'Six is love and responsibility. Bring your care back into balance, including care for yourself.' },
    7: { kw: 'insight, inner wisdom, learning', text: 'Seven is the seeker. Quiet time and honest reflection show you the next step.' },
    8: { kw: 'abundance, personal power, momentum', text: 'Eight is effort turning into results. Own your power and handle it with integrity.' },
    9: { kw: 'completion, release, purpose', text: 'Nine closes a chapter. Let go of what is finished to make room for what matters.' }
  };
  // number, title, keywords, meaning, love, work
  var RAW = [
    ['000', 'A Fresh Start', 'beginnings, wholeness, potential', 'Triple zero wipes the slate clean. Whatever was weighing on you is ready to be released, and you are free to begin again with a clear mind.', 'A good moment to reset patterns and meet love without old baggage.', 'Start the project or plan you keep postponing; the ground is clear.'],
    ['111', 'Your Thoughts Are Taking Shape', 'manifestation, intention, new starts', 'Triple one is a green light for beginnings. Your focus is creative right now, so keep your thoughts on what you want rather than what you fear.', 'Be clear about what you want in a partner and say it out loud.', 'Launch, apply or pitch. Initiative is rewarded.'],
    ['222', 'Trust the Process', 'balance, patience, partnership', 'Triple two asks for patience. What you have planted is growing out of sight, and cooperation will get you further than force.', 'Gentle, steady effort builds trust. Listen as much as you speak.', 'Collaborate. A partnership or a team effort is the key now.'],
    ['333', 'You Are Supported', 'creativity, encouragement, growth', 'Triple three says you are not alone. Encouragement is around you, and your creativity and voice are the tools for the next step.', 'Bring play and honest conversation back into your relationship.', 'Share your ideas; creative work and communication go well.'],
    ['444', 'You Are on Solid Ground', 'protection, stability, hard work', 'Triple four is reassurance. You are on the right track and your steady effort is building something that will hold.', 'Loyalty and reliability matter more than grand gestures now.', 'Keep going with the plan. Structure and discipline pay off.'],
    ['555', 'Change Is Coming Through', 'transformation, freedom, movement', 'Triple five announces change. Something is shifting, and resisting it costs more energy than flowing with it.', 'A relationship may move to a new stage, or you may need more space to breathe.', 'Be open to a new role, method or direction.'],
    ['666', 'Come Back to Balance', 'self-care, harmony, realignment', 'Triple six is not a bad sign. It points to imbalance, usually too much worry about material things, and asks you to return to care, home and heart.', 'Give and receive in equal measure; do not over-give.', 'Step back from overwork and reconnect with why you do it.'],
    ['777', 'You Are in Flow', 'insight, luck, spiritual growth', 'Triple seven confirms you are aligned. Your intuition is sharp and learning comes easily, so trust what you sense.', 'Deep, meaningful connection over surface chemistry.', 'Study, research and strategy go well; trust your analysis.'],
    ['888', 'Abundance in Motion', 'prosperity, reward, momentum', 'Triple eight marks a cycle of reward. Effort you made earlier is coming back to you, so stay grounded and generous.', 'Balance power in the relationship and celebrate what you have built.', 'A strong time for results, negotiation and leadership.'],
    ['999', 'A Chapter Is Closing', 'completion, release, purpose', 'Triple nine says something is complete. Let it go with gratitude so a new cycle aligned with your purpose can begin.', 'Release old hurts or a connection that has run its course.', 'Finish what is nearly done before starting something new.'],
    ['0000', 'Infinite Potential', 'oneness, reset, divine timing', 'Quadruple zero is the strongest reset signal. You stand at the start of a new cycle, connected to everything, with every option open.', 'Begin again with honesty and an open heart.', 'Think big and choose the direction that feels true.'],
    ['1111', 'A Gateway Opens', 'awakening, alignment, new chapter', 'The most famous angel number. 1111 marks a moment of alignment: your thoughts, choices and timing are lining up, so set your intentions deliberately.', 'A meaningful connection or a fresh start in love is possible; know what you want.', 'Begin the bold thing. Doors open when you walk toward them.'],
    ['2222', 'Everything Is Falling into Place', 'harmony, faith, divine timing', 'Quadruple two says the pieces are moving into place. Keep faith, stay kind and let things unfold at their natural pace.', 'Patience and tenderness deepen the bond.', 'Teamwork and diplomacy bring the result you want.'],
    ['3333', 'Speak Your Truth', 'expression, guidance, joy', 'Quadruple three amplifies creative energy and support. You are being nudged to express yourself fully and enjoy the process.', 'Say what you feel; lightness and honesty go together.', 'Creative risks and visible work are favoured.'],
    ['4444', 'Deeply Protected', 'security, guidance, endurance', 'Quadruple four is strong reassurance. You are supported while you build, so keep laying one solid brick at a time.', 'Commitment and stability are the love language now.', 'Long-term plans and systems are worth the effort.'],
    ['5555', 'Major Change', 'breakthrough, freedom, shift', 'Quadruple five signals a big shift. Old routines are making way for something more alive; stay flexible and curious.', 'Expect movement: a new stage, a new person or a new way of relating.', 'A change of role, place or method is near; prepare, do not panic.'],
    ['1010', 'Stay Positive and Keep Going', 'spiritual growth, optimism, focus', '1010 combines new beginnings with infinite potential. Keep your mindset positive and stay focused on growth; you are on a path that is opening up.', 'Bring optimism into love instead of old fears.', 'Keep learning and upgrading your skills.'],
    ['1212', 'Step Out of Your Comfort Zone', 'growth, trust, balance', '1212 pairs the courage of 1 with the trust of 2. Take a step beyond what feels familiar and trust that balance will follow.', 'Meet your partner halfway and invite new experiences together.', 'Say yes to the stretch assignment or the new path.'],
    ['1221', 'Keep the Faith in Your Path', 'optimism, self-belief, harmony', '1221 is a mirror of beginnings and balance. Stay optimistic and keep your thoughts kind, especially toward yourself.', 'Harmony grows when you trust yourself and your partner.', 'Stay steady; your positive attitude attracts support.'],
    ['1234', 'One Step at a Time', 'progress, order, simplicity', '1234 is a simple staircase. Progress is happening in order, step by step; simplify and do the next obvious thing.', 'Let the relationship grow naturally without rushing stages.', 'Break the big goal into small steps and start with step one.'],
    ['1122', 'Plant and Nurture', 'intention, partnership, growth', '1122 moves from new intentions to patient growth. Start what you want and then tend it with care and cooperation.', 'A new connection grows best with patience and kindness.', 'Start the plan, then find the right partner to build it with.'],
    ['1144', 'Build on Your New Beginning', 'intention, foundations, discipline', '1144 joins new starts with solid structure. Your ideas need a practical base, so create the routine that supports them.', 'Show love through consistency.', 'Turn inspiration into a schedule.'],
    ['1313', 'Creative Growth', 'self-expression, change, guidance', '1313 mixes initiative with creative support. You are encouraged to grow by expressing who you really are.', 'Be playful and authentic; it is magnetic.', 'Pitch the creative idea; support is available.'],
    ['2121', 'Trust and Act', 'balance, initiative, optimism', '2121 asks you to balance patience with action. Trust the bigger picture and still take your next step.', 'Mutual effort keeps love healthy.', 'Cooperation plus initiative moves things forward.'],
    ['2020', 'Faith Over Fear', 'trust, clarity, inner peace', '2020 doubles the energy of patience and potential. Things are clearer than they seem; choose faith over worry.', 'Gentle communication heals misunderstandings.', 'Stay calm under pressure; clarity is coming.'],
    ['1001', 'Your Inner Power Is Rising', 'self-trust, renewal, independence', '1001 frames potential with new beginnings on both sides. Trust your own guidance and step into a stronger version of yourself.', 'Love that respects your independence is the right kind.', 'Take the lead on something that matters to you.'],
    ['911', 'Answer Your Calling', 'purpose, endings and beginnings, service', '911 closes one chapter (9) and starts a new one with double initiative (11). It is a call toward your purpose, not an alarm.', 'Let go of what is finished and open to a more meaningful connection.', 'Work that serves others or expresses your purpose is calling you.'],
    ['717', 'You Are on the Right Path', 'wisdom, confidence, encouragement', '717 surrounds new beginnings with insight. Your choices are wise; keep trusting your intuition and keep moving.', 'Trust your instinct about a person or situation.', 'Your research and judgement are sound; act on them.'],
    ['818', 'Abundance Through New Beginnings', 'prosperity, initiative, flow', '818 frames a new start with abundance. A cycle is turning toward reward; keep your intentions clear and generous.', 'Mutual support and generosity strengthen love.', 'A new opportunity can grow into something substantial.'],
    ['101', 'Stay Focused on Growth', 'optimism, beginnings, connection', '101 is a compact reminder to keep a positive focus. New beginnings surround your sense of wholeness.', 'Fresh energy in love, or a hopeful new start.', 'Stay positive and follow through on new plans.']
  ];
  var list = RAW.map(function (r) { return { number: r[0], title: r[1], kw: r[2], text: r[3], love: r[4], work: r[5] }; });
  var byNum = {}; list.forEach(function (x) { byNum[x.number] = x; });
  function root(numStr) {
    var n = String(numStr).split('').reduce(function (a, b) { return a + (+b); }, 0);
    while (n > 9 && n !== 11 && n !== 22 && n !== 33) n = String(n).split('').reduce(function (a, b) { return a + (+b); }, 0);
    return n;
  }
  /** Built-in entry, or a meaning composed from the digits. Returns null for invalid input. */
  function get(numStr) {
    var s = String(numStr == null ? '' : numStr).replace(/\s+/g, '');
    if (!/^\d{1,6}$/.test(s)) return null;
    if (byNum[s]) return { number: s, builtIn: true, title: byNum[s].title, kw: byNum[s].kw, text: byNum[s].text, love: byNum[s].love, work: byNum[s].work, root: root(s) };
    var uniq = s.split('').filter(function (c, i, a) { return a.indexOf(c) === i; });
    if (uniq.length === 1) {
      var dg = DIGITS[uniq[0]];
      return { number: s, builtIn: false, repeating: s.length > 1, title: 'The energy of ' + uniq[0] + (s.length > 1 ? ', amplified' : ''), kw: dg.kw,
        text: dg.text + (s.length > 1 ? ' Seeing it repeated ' + s.length + ' times turns the volume up: this theme deserves your attention now.' : ''), root: root(s), digits: [uniq[0]] };
    }
    return { number: s, builtIn: false, repeating: false, title: 'A blend of ' + uniq.join(', '), kw: uniq.map(function (c) { return DIGITS[c].kw.split(',')[0]; }).join(', '),
      text: 'This number combines the energies below. ' + (uniq.length < s.length ? 'Digits that repeat carry the most weight, and the' : 'The') + ' root number ' + root(s) + ' shows the overall theme.', root: root(s), digits: uniq };
  }
  return { list: list, get: get, DIGITS: DIGITS, root: root };
}
