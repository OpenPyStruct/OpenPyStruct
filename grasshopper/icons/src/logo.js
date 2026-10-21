'use strict';
/* The OpenPyStruct logo: a fish-belly girder (deep at midspan, shallow at the supports, the shape
 * an optimizer converges to under a central load) meshed into finite elements, on a dark tile.
 * Drawn in a 128-unit box, separate from the 24-unit icon engine in ops-vec.js: this is brand art
 * for the Yak page, the README and the org avatar, not a component glyph. Pure function of nothing,
 * so every run emits byte-identical output. emit.js writes it to ../package/.
 */
const XL = 24, XR = 104, TOP = 54, BAYS = 8;
const bot = x => 64 + 24 * Math.sin(Math.PI * (x - XL) / (XR - XL));   // lower chord: 64 at the supports, 88 at midspan
const n = v => v.toFixed(1);

const THEMES = {
  dark:  { tile0: '#2d353e', tile1: '#0f1317', sheen: .10, rim: '#fff', rimOp: .08, load: '#f6cf72',
           steel: ['#f6cf72', '#d89a24', '#9a6a12'], web: '#14181c', webOp: .5, edge: '#14181c', edgeOp: .55,
           node: '#fff6dc', nodeLine: '#14181c', nodeLineOp: .6, chord: '#fff6dc', chordOp: .75, support: '#cfd5db' },
  light: { tile0: '#ffffff', tile1: '#e9ecef', sheen: 0, rim: '#14181c', rimOp: .12, load: '#b5821f',
           steel: ['#f2c25a', '#d08f1c', '#8a5c0e'], web: '#3a2a08', webOp: .55, edge: '#3a2a08', edgeOp: .7,
           node: '#ffffff', nodeLine: '#3a2a08', nodeLineOp: .8, chord: '#fff6dc', chordOp: .8, support: '#6b7580' }
};

function svg(theme = 'dark') {
  const T = THEMES[theme];
  if (!T) throw new Error('logo: unknown theme ' + theme);
  const xs = Array.from({ length: BAYS + 1 }, (_, i) => XL + (XR - XL) * i / BAYS);
  const edge = Array.from({ length: 49 }, (_, i) => XL + (XR - XL) * i / 48);
  const body = 'M' + n(XL) + ' ' + TOP + ' L' + n(XR) + ' ' + TOP + ' L' +
    edge.slice().reverse().map(x => n(x) + ' ' + n(bot(x))).join(' L') + 'Z';

  // Warren pattern: verticals at every node, diagonals alternating so the members read as a truss.
  let web = '';
  xs.forEach((x, i) => {
    web += `<line x1="${n(x)}" y1="${TOP}" x2="${n(x)}" y2="${n(bot(x))}"/>`;
    if (i < BAYS) {
      const x2 = xs[i + 1];
      web += i % 2 === 0
        ? `<line x1="${n(x)}" y1="${TOP}" x2="${n(x2)}" y2="${n(bot(x2))}"/>`
        : `<line x1="${n(x)}" y1="${n(bot(x))}" x2="${n(x2)}" y2="${TOP}"/>`;
    }
  });
  const nodes = xs.map(x => `<circle cx="${n(x)}" cy="${TOP}" r="2.2"/><circle cx="${n(x)}" cy="${n(bot(x))}" r="2.2"/>`).join('');

  // Uniform load: five arrows onto the top chord.
  const load = Array.from({ length: 5 }, (_, i) => {
    const x = XL + 8 + (XR - XL - 16) * i / 4;
    return `<path d="M${n(x)} 22V42"/><path d="M${n(x - 4)} 37.5L${n(x)} 43L${n(x + 4)} 37.5" />`;
  }).join('');

  // Pin (left) and roller (right), apex on the lower chord's end, each on a ground plate.
  const G = 79;
  const pin = `<path d="M${XL} 66L${XL - 7.5} ${G}H${XL + 7.5}Z" fill="${T.support}"/><path d="M${XL - 11} ${G}H${XL + 11}"/>`;
  const roller = `<path d="M${XR} 66L${XR - 7.5} ${G - 5}H${XR + 7.5}Z" fill="${T.support}"/>` +
    `<circle cx="${XR - 3.6}" cy="${G - 2.4}" r="2.4" fill="${T.support}" stroke="none"/><circle cx="${XR + 3.6}" cy="${G - 2.4}" r="2.4" fill="${T.support}" stroke="none"/>` +
    `<path d="M${XR - 11} ${G}H${XR + 11}"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
<defs>
<linearGradient id="tile" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${T.tile0}"/><stop offset="1" stop-color="${T.tile1}"/></linearGradient>
<linearGradient id="steel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${T.steel[0]}"/><stop offset=".55" stop-color="${T.steel[1]}"/><stop offset="1" stop-color="${T.steel[2]}"/></linearGradient>
<linearGradient id="sheen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="${T.sheen}"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient>
<clipPath id="girder"><path d="${body}"/></clipPath>
</defs>
<rect width="128" height="128" rx="28" fill="url(#tile)"/>
<rect width="128" height="128" rx="28" fill="url(#sheen)"/>
<rect x=".75" y=".75" width="126.5" height="126.5" rx="27.25" fill="none" stroke="${T.rim}" stroke-opacity="${T.rimOp}" stroke-width="1.5"/>
<g transform="translate(0 7)">
<g fill="none" stroke="${T.load}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${load}</g>
<path d="${body}" fill="url(#steel)"/>
<g clip-path="url(#girder)" stroke="${T.web}" stroke-opacity="${T.webOp}" stroke-width="1.1" fill="none">${web}</g>
<path d="${body}" fill="none" stroke="${T.edge}" stroke-opacity="${T.edgeOp}" stroke-width="1.2" stroke-linejoin="round"/>
<g fill="${T.node}" stroke="${T.nodeLine}" stroke-opacity="${T.nodeLineOp}" stroke-width=".8">${nodes}</g>
<path d="M${XL} ${TOP}H${XR}" stroke="${T.chord}" stroke-opacity="${T.chordOp}" stroke-width="2" stroke-linecap="round"/>
<g stroke="${T.support}" stroke-width="2.4" stroke-linecap="round">${pin}${roller}</g>
</g>
</svg>
`;
}

module.exports = { svg, THEMES };
