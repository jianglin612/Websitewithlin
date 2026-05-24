import React from 'react';

export default function Methodology() {
  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-8 py-12 sm:py-20">
      <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">Linea Ventures · Portfolio</p>
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
        Methodology
      </h1>
      <p className="text-lg sm:text-xl italic text-white/50 mb-12">
        How we pulled data and scored portfolio companies.
      </p>

      <div className="space-y-10">
        {/* Data Collection */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Data Collection</h2>
          <div className="space-y-3 text-white/70 leading-relaxed">
            <p>
              Company data was aggregated from multiple sources: official VC firm portfolio pages, Crunchbase, PitchBook, and web research.
              For each company, we captured: founding stage, website, one-line description, known investors, and funding history.
            </p>
            <p>
              The dataset includes <strong>310+ companies</strong> across all partner VC firms. Companies with actively managed websites and recent funding activity received complete profiles; others have minimal data where publicly available.
            </p>
          </div>
        </section>

        {/* Scoring Dimensions */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Scoring Dimensions</h2>
          <p className="text-white/70 mb-6">
            For thesis-aligned companies at Seed/Series A, we score across five dimensions (1–5 scale):
          </p>
          <div className="space-y-4">
            <div className="border border-white/10 rounded-lg p-4 bg-white/5">
              <h3 className="font-bold text-white mb-2">Market</h3>
              <p className="text-white/60 text-sm">
                Addressable market size, growth trajectory, and competitive intensity. Vertical AGI plays typically have large TAMs ($1B+) but well-defined niches.
              </p>
            </div>
            <div className="border border-white/10 rounded-lg p-4 bg-white/5">
              <h3 className="font-bold text-white mb-2">Team</h3>
              <p className="text-white/60 text-sm">
                Founder experience, domain expertise, and execution track record. Deep domain knowledge critical for vertical AI.
              </p>
            </div>
            <div className="border border-white/10 rounded-lg p-4 bg-white/5">
              <h3 className="font-bold text-white mb-2">Product</h3>
              <p className="text-white/60 text-sm">
                Technical sophistication, differentiation, and product-market fit evidence. AI-native solutions should show strong moats.
              </p>
            </div>
            <div className="border border-white/10 rounded-lg p-4 bg-white/5">
              <h3 className="font-bold text-white mb-2">GTM (Go-To-Market)</h3>
              <p className="text-white/60 text-sm">
                Sales motion, channel strategy, and ability to reach customers at scale. Usage-based pricing models are preferred.
              </p>
            </div>
            <div className="border border-white/10 rounded-lg p-4 bg-white/5">
              <h3 className="font-bold text-white mb-2">AI-Native</h3>
              <p className="text-white/60 text-sm">
                How core is AI to the product? True agentic behavior and decision-making, not just ML features bolted on.
              </p>
            </div>
          </div>
        </section>

        {/* Fit Criteria */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Linea Fit Criteria</h2>
          <div className="space-y-3 text-white/70 leading-relaxed">
            <p>
              <strong className="text-white">✦ Linea Fit:</strong> Companies marked as "Linea Fit" are at Seed or Series A stage AND align with our vertical AGI thesis (agentic B2B software replacing knowledge workers, outcome/usage pricing, $500K–$10M ARR sweet spot).
            </p>
            <p>
              <strong className="text-white">◦ Too Late:</strong> Companies with strong thesis alignment but already at Series B or later. These represent excellent businesses that are outside our check size and ownership target.
            </p>
            <p>
              <strong className="text-white">No Badge:</strong> Companies without strong thesis alignment, early stage or not. Valuable portfolio companies but not core to our vertical AGI bet.
            </p>
          </div>
        </section>

        {/* Data Limitations */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Data Limitations</h2>
          <div className="space-y-3 text-white/70 leading-relaxed">
            <p>
              Not all companies have complete information. Early-stage stealth startups may lack public websites or detailed funding data.
              Scores are estimates based on publicly available information and may not reflect recent pivots or undisclosed funding.
            </p>
            <p>
              This portfolio view is a snapshot. Company stages, products, and strategic positioning evolve; data is current as of mid-2026.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
