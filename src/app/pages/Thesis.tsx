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

export default function Thesis() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-20">
      <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">Linea Ventures · Thesis</p>
      <h1 className="text-5xl font-extrabold tracking-tight text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
        Vertical AGI Is the Next Decade of Software
      </h1>
      <p className="text-xl italic text-white/50 mb-12">
        Every industry gets its own AGI. The winners will charge for outcomes, not seats — and the GTM math gets a lot more interesting.
      </p>

      <p className="text-white/70 leading-relaxed mb-5">
        Software ate the world on a flat $/seat subscription. Agents are about to eat it again — on a different pricing curve, with different go-to-market motions, and with a winner per vertical that looks more like a category utility than a tool. We invest in the founders building those category winners.
      </p>

      <H2>Belief 1: Every vertical gets its AGI.</H2>
      <p className="text-white/70 leading-relaxed mb-4">
        It already happened in software engineering. Cursor, Windsurf, and Claude Code didn't make developers faster — they restructured what an engineer is. The same pattern is playing out across every knowledge-work vertical:
      </p>
      <ul className="space-y-3 mb-6 pl-5 list-disc marker:text-white/30">
        <Li><strong className="text-white/90">Legal:</strong> Harvey is the operating layer for BigLaw. EvenUp writes personal injury demand letters. Both pull work out of humans, not augment them.</Li>
        <Li><strong className="text-white/90">Healthcare:</strong> Abridge is the ambient scribe of record at major health systems. Clinicians don't "use" it — it's the chart.</Li>
        <Li><strong className="text-white/90">Finance / tax ops:</strong> Numeral (portfolio) is the sales tax department for thousands of companies. The work that belonged to a $120K compliance analyst is now an API call.</Li>
        <Li><strong className="text-white/90">Chemistry R&D:</strong> AlbertInvent (portfolio) is the AGI for formulation chemists. You don't hire another PhD — you give them Albert.</Li>
        <Li><strong className="text-white/90">Real estate & local services:</strong> Side and Squire (portfolio) own the back office and the chair. The next move is doing it all agentically.</Li>
      </ul>

      <Blockquote>In five years, every white-collar function will have a clear #1 AGI provider. The question is who, not whether.</Blockquote>

      <H2>Belief 2: The pricing model changed. That changes everything downstream.</H2>
      <p className="text-white/70 leading-relaxed mb-4">
        Classic SaaS captured ~2% of the revenue it touched. Agents charge 15–20% because they're replacing a line item, not augmenting a worker. That re-rates every GTM motion: SMB deals that only worked at $1,200 ACV work at $15K; mid-market deals that topped out at $40K justify field reps at $200K+; enterprise procurement shifts from "what's the budget?" to "what does it replace?"
      </p>
      <p className="text-white/70 leading-relaxed mb-5">
        Companies still pricing per seat in a category where 10 humans became 1 are leaving 5–10x on the table.
      </p>

      <H2>Belief 3: Services are now scalable.</H2>
      <p className="text-white/70 leading-relaxed mb-4">
        For fifty years, services were the bad business — margins capped at 30%, exits at 1–3x revenue. Agents change that. You sell the outcome (the filed return, the resolved ticket, the drafted motion) and scale with compute, not headcount. The strongest companies in our pipeline aren't selling software. They're selling the work — at 70–80% gross margins.
      </p>
      <p className="text-white/70 leading-relaxed mb-5">
        The TAM unlocks too. The market for software that helps lawyers draft briefs is small; the market for getting briefs drafted is enormous. Every "professional services spend" line on a customer's P&L is now reachable by a software company.
      </p>

      <H2>Belief 4: Charge for results. Failing that, usage. Never seats.</H2>
      <p className="text-white/70 leading-relaxed mb-4">We ask one question on every first call: how do you price?</p>
      <ul className="space-y-3 mb-6 pl-5 list-disc marker:text-white/30">
        <Li><strong className="text-white/90">Results-based</strong> — strongest signal. You compound with customer growth and you're impossible to rip out.</Li>
        <Li><strong className="text-white/90">Usage / tokens</strong> — acceptable, especially in infrastructure.</Li>
        <Li><strong className="text-white/90">Per seat</strong> — red flag. If your product eliminates seats, why are you charging by seat?</Li>
      </ul>
      <p className="text-white/70 leading-relaxed mb-5">
        Every Linea check in vertical AGI has been to a company on results or usage pricing. It's the single best predictor of whether a founder understands what they're building.
      </p>

    </div>
  );
}
