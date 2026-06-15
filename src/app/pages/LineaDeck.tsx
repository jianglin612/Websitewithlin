import React, { useState } from 'react';

function LineaDeckContent() {
  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12 sm:py-20">
      <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">Linea Ventures · Fund Overview</p>
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
        Linea Ventures Fund I
      </h1>
      <p className="text-lg sm:text-xl italic text-white/50 mb-12">
        A line of thinking or lineage. Co-investing in vertical AI breakouts with the world's top emerging managers.
      </p>

      {/* Section: The Fund */}
      <section className="mb-16 sm:mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Why Linea?</h2>
        <div className="bg-white/5 border border-white/10 rounded-lg p-8">
          <p className="text-white/80 mb-6 leading-relaxed">
            I spent ten years at F-Prime, Trinity, and Olive watching the same pattern repeat. The best early-stage deals rarely were discovered by the big funds — they came from the angels, operators, and most of all from emerging managers. The big funds eventually called us asking who was seeing the new AI breakouts consistently. The answer was always the same names.
          </p>
          <p className="text-white/80 mb-6 leading-relaxed">
            I started Linea Ventures to put thirty of those names inside one fund — sharing carry, aligned with the same outcome. Linea writes $500K-$1.5M coinvestments into agentic platforms and dev tools in partnership with the 30 top emerging venture capital managers.
          </p>
          <p className="text-white/80 leading-relaxed">
            I'm committing $1M of my own capital — five times what's typical. Not because anyone asked. Because I'd rather own a meaningful piece of $20M and pick well than ride along inside a $300M fund I don't control. The next five years of vertical AI will be the most concentrated wealth-creation window in our generation. I want to spend it building something I can defend.
          </p>
        </div>
      </section>

      {/* Section: Fund Stats */}
      <section className="mb-16 sm:mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Fund Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <p className="text-4xl sm:text-5xl font-extrabold text-emerald-400 mb-2">$20M</p>
            <p className="text-white/60 text-sm">Fund Size</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <p className="text-4xl sm:text-5xl font-extrabold text-emerald-400 mb-2">$500K–$1.5M</p>
            <p className="text-white/60 text-sm">Investment Sizes</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <p className="text-4xl sm:text-5xl font-extrabold text-emerald-400 mb-2">$500K–$10M ARR</p>
            <p className="text-white/60 text-sm">Target Stage</p>
          </div>
        </div>
      </section>

      {/* Section: Investment Philosophy */}
      <section className="mb-16 sm:mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Investment Thesis</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Vertical AI vs. SaaS Generation</h3>
            <p className="text-white/70 mb-4">Vertical AI companies could become 10x larger than the previous SaaS generation. While traditional SaaS captured 2–3% of revenue, AI-native companies are capturing 15–40% of revenue through:</p>
            <ul className="space-y-2 text-white/70">
              <li>• LLM Assisted Tasks</li>
              <li>• AI Content Generation</li>
              <li>• AI-coded Applications</li>
              <li>• Fully Autonomous Agents</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Core Focus Areas</h3>
            <ul className="space-y-2 text-white/70">
              <li>• <span className="text-emerald-400">Vertical Agentic Platforms</span> - AI-powered solutions in specific verticals</li>
              <li>• <span className="text-emerald-400">Dev Tools + Infrastructure</span> - Tools to build AI applications</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section: Why We Win */}
      <section className="mb-16 sm:mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Our Differentiation</h2>
        <div className="space-y-6">
          <div className="border-l-2 border-emerald-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-2">A. Aligning the Network</h3>
            <p className="text-white/70">Create a network of 30 emerging managers, sharing deals, network, and economics with 20% of fund-level carry.</p>
          </div>
          <div className="border-l-2 border-emerald-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-2">B. Picking from Massive Volumes</h3>
            <p className="text-white/70">See 200+ companies for each investment made. Use the network to see over 15,000 startups annually.</p>
          </div>
          <div className="border-l-2 border-emerald-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-2">C. Winning Outside the Process</h3>
            <p className="text-white/70">Win deals with flexibility, speed, and early access. Invest in companies before formal rounds come together.</p>
          </div>
          <div className="border-l-2 border-emerald-500 pl-6">
            <h3 className="text-lg font-semibold text-white mb-2">D. Delivering Outsized Value</h3>
            <p className="text-white/70">Network of operators to assist companies. Become the go-to source for founders to get help whenever needed.</p>
          </div>
        </div>
      </section>

      {/* Section: Track Record */}
      <section className="mb-16 sm:mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Track Record</h2>
        <div className="bg-white/5 border border-white/10 rounded-lg p-8 mb-8">
          <p className="text-white/80 mb-6">
            Over the last 10 years, we have consistently backed <span className="text-emerald-400 font-semibold">early-stage breakouts</span> that return funds.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div>
              <p className="text-3xl font-bold text-emerald-400 mb-1">43</p>
              <p className="text-white/60 text-sm">Investments</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-emerald-400 mb-1">4.8x</p>
              <p className="text-white/60 text-sm">Venture MOIC</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-emerald-400 mb-1">8.0x</p>
              <p className="text-white/60 text-sm">Angel MOIC</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">Select Investments</h3>
          <div className="space-y-3">
            {[
              { name: 'Side', return: '7-11x', leads: 'Matrix, Sapphire', detail: '$60M entry valuation, $2.4B latest' },
              { name: 'Squire', return: '6-10x', leads: 'CRV, ICONIQ', detail: '$17M entry valuation, $800M+ latest' },
              { name: 'Weights & Biases', return: '25x', leads: 'CoreWeave (Acq.)', detail: '$10M entry, sold for $1.8B' },
              { name: 'Albert', return: '4-6x', leads: 'Index, Coatue', detail: '$35M to $250M valuation' },
              { name: 'Tavus', return: '4-6x', leads: 'Sequoia, CRV', detail: 'Also $35M to $250M valuation' },
            ].map((inv) => (
              <div key={inv.name} className="border-b border-white/10 pb-3">
                <div className="flex items-start justify-between mb-1">
                  <span className="font-semibold text-white">{inv.name}</span>
                  <span className="text-emerald-400 font-semibold">{inv.return}</span>
                </div>
                <p className="text-xs text-white/40 mb-1">{inv.leads}</p>
                <p className="text-sm text-white/60">{inv.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Fund Terms */}
      <section className="mb-16 sm:mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Fund Terms</h2>
        <div className="bg-white/5 border border-white/10 rounded-lg p-8">
          <div className="space-y-6">
            <div>
              <p className="text-white font-semibold mb-2">2% Management Fee</p>
              <p className="text-white/70">Small additional fund admin cost for Carta and other services</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-2">20% Carry</p>
              <p className="text-white/70">1/5 shared with Emerging Partners</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-2">3-year Investment Period</p>
              <p className="text-white/70">After final close, 10 year life cycle</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-2 text-emerald-400">$1M GP Stake</p>
              <p className="text-white/70">5% of fund, compared to 1% typical</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Contact */}
      <section className="text-center py-12 border-t border-white/10">
        <p className="text-white/60 mb-4">
          Contact us to discuss partnership opportunities
        </p>
        <p className="text-white">
          <a href="mailto:john@lineavc.com" className="text-emerald-400 hover:text-emerald-300 transition-colors">
            john@lineavc.com
          </a>
        </p>
      </section>
    </div>
  );
}

export default function LineaDeck() {
  const [input, setInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  if (unlocked) return <LineaDeckContent />;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input === 'lincap') {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setInput('');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 py-20">
      <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-8">
        Linea Ventures · Fund Overview
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-xs">
        <input
          type="password"
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(false); }}
          placeholder="Enter password"
          autoFocus
          className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white/90 text-sm placeholder:text-white/25 focus:outline-none focus:border-white/50 transition-colors"
        />
        {error && (
          <p className="text-red-400/80 text-xs -mt-1">Incorrect password.</p>
        )}
        <button
          type="submit"
          className="w-full bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-3 text-white/80 hover:text-white text-sm font-medium transition-colors"
        >
          Enter
        </button>
      </form>
    </div>
  );
}
