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
          <div className="space-y-6">
            <div className="border border-white/10 rounded-lg p-5 bg-white/5">
              <h3 className="font-bold text-white mb-3 text-lg">Market (1–5)</h3>
              <p className="text-white/60 text-sm mb-3">
                Addressable market size, growth trajectory, and competitive intensity. Vertical AGI plays typically have large TAMs ($1B+) but well-defined niches.
              </p>
              <ul className="text-white/50 text-sm space-y-1">
                <li><strong>5:</strong> Massive TAM ($5B+), clear vertical, high growth (>20% YoY), defensible position</li>
                <li><strong>4:</strong> Large TAM ($1–5B), growing vertical, good differentiation</li>
                <li><strong>3:</strong> Moderate TAM ($500M–1B), emerging or niche, some competition</li>
                <li><strong>2:</strong> Small TAM ($100–500M), mature or saturated, tough competition</li>
                <li><strong>1:</strong> Tiny TAM, commodity market, commoditized</li>
              </ul>
            </div>

            <div className="border border-white/10 rounded-lg p-5 bg-white/5">
              <h3 className="font-bold text-white mb-3 text-lg">Team (1–5)</h3>
              <p className="text-white/60 text-sm mb-3">
                Founder experience, domain expertise, execution track record, and ability to attract talent. Deep domain knowledge is critical for vertical AI.
              </p>
              <ul className="text-white/50 text-sm space-y-1">
                <li><strong>5:</strong> Founded or led similar companies; domain expert with 10+ years; strong execution history</li>
                <li><strong>4:</strong> Worked in the space, understands pain points, credible track record</li>
                <li><strong>3:</strong> Some relevant experience, learns quickly, reasonable pedigree</li>
                <li><strong>2:</strong> Limited domain experience, unproven execution, questionable fit</li>
                <li><strong>1:</strong> No relevant background, execution concerns, turnover issues</li>
              </ul>
            </div>

            <div className="border border-white/10 rounded-lg p-5 bg-white/5">
              <h3 className="font-bold text-white mb-3 text-lg">Product (1–5)</h3>
              <p className="text-white/60 text-sm mb-3">
                Technical sophistication, differentiation, moat strength, and evidence of product-market fit. AI-native solutions should show clear competitive advantages.
              </p>
              <ul className="text-white/50 text-sm space-y-1">
                <li><strong>5:</strong> Proprietary AI/algorithms, strong moat, clear PMF, customers willing to pay premium</li>
                <li><strong>4:</strong> Differentiated tech, defensible position, strong usage metrics</li>
                <li><strong>3:</strong> Solid product, some differentiation, moderate traction</li>
                <li><strong>2:</strong> Me-too product, weak moat, unclear differentiation</li>
                <li><strong>1:</strong> Commodity product, no moat, poor UX, feature parity with incumbents</li>
              </ul>
            </div>

            <div className="border border-white/10 rounded-lg p-5 bg-white/5">
              <h3 className="font-bold text-white mb-3 text-lg">GTM (Go-To-Market) (1–5)</h3>
              <p className="text-white/60 text-sm mb-3">
                Sales motion, channel strategy, customer acquisition efficiency, and ability to scale. Usage-based pricing models are preferred over seat-based.
              </p>
              <ul className="text-white/50 text-sm space-y-1">
                <li><strong>5:</strong> Efficient CAC (CAC payback &lt;12 months), viral or PLG, usage-based pricing, strong retention</li>
                <li><strong>4:</strong> Efficient direct sales, good channel fit, scalable model, &lt;20% churn</li>
                <li><strong>3:</strong> Reasonable CAC, multiple channels, moderate unit economics</li>
                <li><strong>2:</strong> Expensive CAC, limited channels, challenged unit economics</li>
                <li><strong>1:</strong> Broken CAC, no clear go-to-market, high churn, unsustainable growth</li>
              </ul>
            </div>

            <div className="border border-white/10 rounded-lg p-5 bg-white/5">
              <h3 className="font-bold text-white mb-3 text-lg">AI-Native (1–5)</h3>
              <p className="text-white/60 text-sm mb-3">
                How core is AI to the product's value prop? True agentic behavior and autonomous decision-making, not just ML features bolted on top.
              </p>
              <ul className="text-white/50 text-sm space-y-1">
                <li><strong>5:</strong> AI/agents are the core product; replaces human work entirely; autonomous decision-making</li>
                <li><strong>4:</strong> AI is primary value; significant automation; user oversight needed</li>
                <li><strong>3:</strong> AI is meaningful but not core; enhances human workflow; ML-assisted decision support</li>
                <li><strong>2:</strong> AI is secondary; mainly optimization or data processing; traditional software with ML</li>
                <li><strong>1:</strong> Minimal AI; could work without it; feature, not differentiator</li>
              </ul>
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
