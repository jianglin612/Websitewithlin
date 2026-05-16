function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold text-white/80 mt-14 mb-4" style={{ letterSpacing: '-0.01em' }}>
      {children}
    </h2>
  );
}

function Blockquote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-8 pl-6 border-l-4 border-white/30 text-xl italic text-white/60 leading-relaxed">
      {children}
    </blockquote>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return <li className="text-white/70 leading-relaxed">{children}</li>;
}

export default function WhatWeLookFor() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-20">
      <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">Linea Ventures · How We Invest</p>
      <h1 className="text-5xl font-extrabold tracking-tight text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
        What We Look For
      </h1>
      <p className="text-xl italic text-white/50 mb-12">
        Three things have to be true before we write a check. We try to be honest about the rest.
      </p>

      <p className="text-white/70 leading-relaxed mb-5">
        We invest in vertical agentic startups and dev tools / infrastructure. We don't do follow-ons, so the first check has to count. Here's our rubric.
      </p>

      <H2>1. A great founder</H2>
      <p className="text-white/70 leading-relaxed mb-4">
        Most of our return comes from one variable: the person we backed. The product changes. The market changes. The founder is the constant. We're looking for:
      </p>
      <ul className="space-y-3 mb-6 pl-5 list-disc marker:text-white/30">
        <Li><strong className="text-white/90">World-class at the thing they're doing, with a real insight.</strong> Not just experienced — the best person in the room about this specific problem, with a point of view that's non-obvious and probably contrarian. If we ask them why now and they recite a deck slide, that's a no.</Li>
        <Li><strong className="text-white/90">Someone we'd actually want to work for.</strong> The simplest test we have. If after an hour we'd quit our current job to join them, that's signal. If we wouldn't, no one else will either — and you can't build a company without recruits.</Li>
        <Li><strong className="text-white/90">Magnetic to talent more senior than they are.</strong> The best early-stage founders punch above their weight on hiring. We want to see VPs from Stripe, Ramp, or Anduril taking a meeting — and saying yes.</Li>
        <Li><strong className="text-white/90">Strategic thinker who's done hard things before.</strong> Founders who were a GM, a 0→1 PM, an early operator at a top-tier company, or who built and sold something earlier in their career. Someone who has owned outcomes, not just tasks. Pattern: they've shipped at least one ambitious thing before this one.</Li>
        <Li><strong className="text-white/90">Can compress complexity into a plan.</strong> Can take a messy, multi-year roadmap and explain the next 90 days in a way that makes you feel like it's already done. Founders who can't do this don't ship; they perform.</Li>
      </ul>

      <Blockquote>If we can't tell within 45 minutes whether this person is a generational founder, the answer is usually no. The best ones reveal themselves quickly.</Blockquote>

      <H2>2. Strong product-market fit with a clear path to scale</H2>
      <p className="text-white/70 leading-relaxed mb-4">
        We don't do pre-revenue concept bets. We invest after the product is working — but before the round becomes a competitive bidding process.
      </p>
      <ul className="space-y-3 mb-6 pl-5 list-disc marker:text-white/30">
        <Li><strong className="text-white/90">$500K–$10M in ARR.</strong> Far enough along that the market has voted, early enough that the round isn't a beauty contest yet.</Li>
        <Li><strong className="text-white/90">A repeatable sales motion.</strong> Not the founder's friends, not warm intros from the seed investor. We want to see two AEs, neither of whom is the CEO, closing deals on a defined playbook. If the founder is the only one who can sell, the company can't scale.</Li>
        <Li><strong className="text-white/90">A clearly defined ICP they can qualify in 5 minutes.</strong> Vague ICPs ("mid-market companies that want to be more efficient") are a tell. Sharp ICPs ("Series B–D e-commerce brands doing $50M–$500M in GMV with multi-state nexus") are what we want — they predict CAC, they predict messaging, they predict the next 18 months.</Li>
        <Li><strong className="text-white/90">The product is the #1 or #2 thing the ICP asks to buy.</strong> If your product is on the budget line below "more headcount," you'll get cut in the next downturn. If it's the line item that prevents headcount, you'll be funded forever.</Li>
        <Li><strong className="text-white/90">Priced on results or usage, not seats.</strong> Strongly preferred but not required. Outcome pricing is the cleanest tell that the founder understands what they actually do for customers.</Li>
        <Li><strong className="text-white/90">ACV × potential customers × close rate &gt; $1B.</strong> Simple back-of-the-envelope check. If the math doesn't work at plausible assumptions, the company is too small for the fund — or the founder is undersizing the ambition.</Li>
      </ul>

      <H2>3. The rest of the picture</H2>
      <p className="text-white/70 leading-relaxed mb-4">Stuff that's nice to have. We don't gate on these, but they sway us at the margin.</p>
      <ul className="space-y-3 mb-6 pl-5 list-disc marker:text-white/30">
        <Li><strong className="text-white/90">A tier-1 lead is likely.</strong> We don't fetishize logos, but as a solo GP, knowing the next round is more or less de-risked matters. Picky VCs are good signaling, full stop.</Li>
        <Li><strong className="text-white/90">3–9 months from the next round.</strong> Our sweet spot. Enough runway that we can spend real time with the founder before the round opens. Not so close that we're just filling allocation in a hot deal.</Li>
        <Li><strong className="text-white/90">Founder is putting their own money in.</strong> We've never regretted backing a founder who was a meaningful personal LP in their own company. We've occasionally regretted backing one who wasn't. Skin in the game is real.</Li>
        <Li><strong className="text-white/90">They move fast.</strong> The best founders we back ship something every week, talk to customers every day, and rewrite the roadmap whenever new data comes in. Velocity is a discipline, not a personality trait — and founders who have it consistently beat smarter founders who don't.</Li>
      </ul>

      <Blockquote>Two out of three of these isn't enough. We need all three before we write the check — and we'd rather pass than convince ourselves into something.</Blockquote>
    </div>
  );
}
