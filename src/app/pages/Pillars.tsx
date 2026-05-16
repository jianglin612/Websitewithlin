const pillars = [
  {
    letter: 'A.',
    name: 'Align the Network',
    points: [
      'Build a network of emerging managers we trust and want to win with.',
      'Share deals, share networks, share economics — the pie gets bigger when we work together.',
    ],
  },
  {
    letter: 'B.',
    name: 'Volume Improves Selection',
    points: [
      'See 200+ companies for every investment we make.',
      'Tap the network to surface over 15,000 startups a year — selection is a function of top-of-funnel.',
    ],
  },
  {
    letter: 'C.',
    name: 'Win Outside the Process',
    points: [
      'Win deals with flexibility, speed, and early access — not by outbidding the biggest funds.',
      'Invest in companies before a formal round comes together, when conviction matters more than competition.',
    ],
  },
  {
    letter: 'D.',
    name: 'Deliver Outsized Value',
    points: [
      'Build a bench of operators who can actually help portfolio companies ship and sell.',
      'Become the first call when a founder needs an intro, a hire, or a hard answer.',
    ],
  },
];

export default function Pillars() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-20">
      <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">Linea Ventures</p>
      <h1 className="text-5xl font-extrabold tracking-tight text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
        Our Principles
      </h1>
      <p className="text-xl italic text-white/50 mb-16">How we operate. How we win. How we serve founders.</p>

      <div className="divide-y divide-white/10">
        {pillars.map(({ letter, name, points }) => (
          <div key={letter} className="grid gap-12 py-12" style={{ gridTemplateColumns: '220px 1fr' }}>
            <div>
              <div className="text-3xl font-extrabold text-white/40 mb-2">{letter}</div>
              <div className="text-xl font-bold text-white mb-4">{name}</div>
              <div className="text-2xl text-white/30">→</div>
            </div>
            <ul className="space-y-3 mt-1">
              {points.map((p, i) => (
                <li key={i} className="text-white/70 text-base leading-relaxed pl-4 border-l border-white/20">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
