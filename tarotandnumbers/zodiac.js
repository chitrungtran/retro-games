/**
 * Tarot & Numbers - zodiac data (written for this site). ASCII only; glyphs are \u escapes.
 * createZodiac() -> { signs, byId, signFromDate(m, d), relation(a, b), elementMatch(a, b) }
 */
function createZodiac() {
  'use strict';
  var VS = '\ufe0e'; // text presentation, so glyphs do not turn into emoji
  var RAW = [
    ['aries', 'Aries', '\u2648', 'March 21 - April 19', 'Fire', 'Cardinal', 'Mars', 'bold, direct, pioneering', 'Aries charges ahead with courage and honesty. Quick to start and quick to forgive, Aries grows by learning patience.'],
    ['taurus', 'Taurus', '\u2649', 'April 20 - May 20', 'Earth', 'Fixed', 'Venus', 'steady, sensual, loyal', 'Taurus builds slowly and well. Loyal and grounded, it loves comfort and beauty, and grows by welcoming change.'],
    ['gemini', 'Gemini', '\u264a', 'May 21 - June 20', 'Air', 'Mutable', 'Mercury', 'curious, witty, adaptable', 'Gemini collects ideas and people. Clever and lively, it grows by going deep as well as wide.'],
    ['cancer', 'Cancer', '\u264b', 'June 21 - July 22', 'Water', 'Cardinal', 'the Moon', 'caring, intuitive, protective', 'Cancer feels everything and protects its people. Nurturing and loyal, it grows by sharing its needs openly.'],
    ['leo', 'Leo', '\u264c', 'July 23 - August 22', 'Fire', 'Fixed', 'the Sun', 'warm, generous, expressive', 'Leo shines and wants others to shine too. Big-hearted and creative, it grows by leading with humility.'],
    ['virgo', 'Virgo', '\u264d', 'August 23 - September 22', 'Earth', 'Mutable', 'Mercury', 'precise, helpful, thoughtful', 'Virgo improves whatever it touches. Practical and kind, it grows by being as gentle with itself as with others.'],
    ['libra', 'Libra', '\u264e', 'September 23 - October 22', 'Air', 'Cardinal', 'Venus', 'fair, charming, harmonious', 'Libra seeks balance and beauty. Diplomatic and social, it grows by choosing clearly and voicing its own needs.'],
    ['scorpio', 'Scorpio', '\u264f', 'October 23 - November 21', 'Water', 'Fixed', 'Mars and Pluto', 'intense, loyal, perceptive', 'Scorpio sees beneath the surface. Passionate and resilient, it grows by trusting and letting go.'],
    ['sagittarius', 'Sagittarius', '\u2650', 'November 22 - December 21', 'Fire', 'Mutable', 'Jupiter', 'adventurous, honest, optimistic', 'Sagittarius chases meaning and horizons. Free-spirited and funny, it grows by following through.'],
    ['capricorn', 'Capricorn', '\u2651', 'December 22 - January 19', 'Earth', 'Cardinal', 'Saturn', 'ambitious, disciplined, wise', 'Capricorn climbs patiently toward its goals. Responsible and dry-witted, it grows by allowing rest and softness.'],
    ['aquarius', 'Aquarius', '\u2652', 'January 20 - February 18', 'Air', 'Fixed', 'Saturn and Uranus', 'original, independent, humane', 'Aquarius thinks ahead of its time. Inventive and principled, it grows by letting people close.'],
    ['pisces', 'Pisces', '\u2653', 'February 19 - March 20', 'Water', 'Mutable', 'Jupiter and Neptune', 'dreamy, compassionate, artistic', 'Pisces feels the world deeply. Imaginative and kind, it grows by setting healthy boundaries.']
  ];
  var signs = RAW.map(function (r, i) { return { id: r[0], name: r[1], glyph: r[2] + VS, dates: r[3], element: r[4], modality: r[5], ruler: r[6], kw: r[7], text: r[8], index: i }; });
  var byId = {}; signs.forEach(function (s) { byId[s.id] = s; });
  var STARTS = [[3, 21], [4, 20], [5, 21], [6, 21], [7, 23], [8, 23], [9, 23], [10, 23], [11, 22], [12, 22], [1, 20], [2, 19]];
  function signFromDate(m, d) {
    var v = m * 100 + d, pick = 9, best = -1;
    STARTS.forEach(function (s, i) { var x = s[0] * 100 + s[1]; if (x <= v && x > best) { best = x; pick = i; } });
    return signs[pick].id;
  }
  var ASPECTS = [
    { name: 'Same sign', text: 'You mirror each other. Recognition is instant and you share the same strengths, and the same blind spots.' },
    { name: 'Neighbours', text: 'Side-by-side signs have very different styles. There is curiosity and learning here once you stop expecting the other to work like you.' },
    { name: 'Sextile', text: 'An easy, friendly angle. Conversation flows and you enjoy doing things together.' },
    { name: 'Square', text: 'A tense, magnetic angle. Chemistry is real and so is friction; honest negotiation turns it into growth.' },
    { name: 'Trine', text: 'The most harmonious angle. You understand each other naturally; the only risk is getting too comfortable.' },
    { name: 'Quincunx', text: 'An awkward angle. Your needs are genuinely different, so this match works through conscious adjustment and humour.' },
    { name: 'Opposites', text: 'Opposite signs attract strongly. Each has what the other lacks, and balance is the shared lesson.' }
  ];
  var ELEMENTS = {
    'Fire-Fire': 'Two fires: passion, fun and fast decisions. Make room for rest and listening.',
    'Earth-Earth': 'Two earths: loyal, practical and secure. Keep some spontaneity alive.',
    'Air-Air': 'Two airs: endless conversation and shared ideas. Ground plans in action and feelings.',
    'Water-Water': 'Two waters: deep emotional understanding. Protect each other from moods and over-merging.',
    'Air-Fire': 'Air feeds fire: lively, inspiring and social. Both love freedom.',
    'Earth-Water': 'Water nourishes earth: caring, steady and intimate. A naturally supportive pair.',
    'Earth-Fire': 'Fire and earth: drive meets patience. Respect your different speeds.',
    'Fire-Water': 'Fire and water: steamy and emotional. Gentleness keeps it from boiling over.',
    'Air-Earth': 'Air and earth: ideas meet practicality. Value what the other brings rather than trying to change it.',
    'Air-Water': 'Air and water: head meets heart. Say the feelings and feel the words.'
  };
  function relation(a, b) {
    var diff = (byId[b].index - byId[a].index + 12) % 12, k = Math.min(diff, 12 - diff);
    return ASPECTS[k];
  }
  function elementMatch(a, b) {
    var pair = [byId[a].element, byId[b].element].sort().join('-');
    return ELEMENTS[pair];
  }
  return { signs: signs, byId: byId, signFromDate: signFromDate, relation: relation, elementMatch: elementMatch };
}
