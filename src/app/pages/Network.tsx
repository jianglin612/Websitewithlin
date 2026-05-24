import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Company names that exist in the /portfolio-companies page data.
// Keeps Network.tsx self-contained without a circular import.
const KNOWN_COMPANIES = new Set([
  'OatFi', 'Every', 'Keep', 'Salsa',
  'Arize AI', 'SafelyYou', 'Dash Bio', 'Flyr Labs', 'Gray Matter Robotics',
  'BetterUp', 'Earnin', 'Field AI', 'TrueLayer', 'Robinhood',
  'Tavus', 'Corgi', 'Doctronic', 'Keychain',
  'Marqeta', 'Socure', 'Vestwell', 'Mudflap', 'Inbox Health', 'Zeal',
  'OpenAI', 'Groq', 'Brex', 'Databricks',
  'Mutiny', 'Vanta', 'Weaviate', 'Writer', 'Gorgias', 'Pocus',
  'Healtharc', 'SuiteOp', 'SmartBarrel',
  'Applied Intuition', 'Mercury', 'BioRender', 'Standard Bots', 'Heart Aerospace',
  'Calendly', 'Loopio', 'Cinder',
  'Rippling', 'Anduril', 'Jasper', 'Astranis',
  'PLCs.ai', 'Illumix', 'Amplemarket',
  'Pika Labs',
  // New companies from expanded research
  'Medallion', 'Clipboard Health', 'BaseRock AI', 'Ona', 'Gridspace', 'Lendflow', 'Pickaxe',
]);

// Map each org name as it appears in the Person data to the `source` string
// used in PortfolioCompanies, so the filter query param aligns correctly.
const ORG_TO_SOURCE: Record<string, string> = {
  'Cambrian Ventures': 'Cambrian Ventures',
  'Swift Ventures': 'Swift Ventures',
  'Graph Ventures': 'Graph Ventures',
  'Seven Stars': 'Seven Stars',
  'Commerce Ventures': 'Commerce Ventures',
  'Umami Capital': 'Umami Capital',
  'GTM Fund': 'GTMfund',
  'Sonar Capital': 'Sonar Capital',
  'Zeno Ventures': 'Zeno Ventures',
  'The Aligned Fund': 'The Aligned Fund',
  'Liquid 2': 'Liquid 2',
  'Sugar Free Capital': 'Sugar Free Capital',
  'AGI House': 'AGI House',
};

type Person = {
  name: string;
  org: string;
  linkedin?: string;
  website?: string;
  portfolio?: string[];
};

const partners: Person[] = [
  {
    name: 'Rex Salisbury',
    org: 'Cambrian Ventures',
    linkedin: 'https://www.linkedin.com/in/rexsalisbury',
    website: 'https://www.cambrian.vc',
    portfolio: ['OatFi', 'Every', 'Anatomy', 'LightSpun', 'Keep', 'Oyster', 'Salsa', 'Paid'],
  },
  {
    name: 'Brett Wilson',
    org: 'Swift Ventures',
    linkedin: 'https://www.linkedin.com/in/bjwilson',
    website: 'https://www.swift.vc',
    portfolio: ['Arize AI', 'Superhuman', 'SafelyYou', 'Dash Bio', 'Gray Matter Robotics', 'Flyr Labs', 'Eko', 'Estuary', 'Hone', 'LanceDB', 'Universal AGI', 'Coval', 'Latch Bio', 'Sieve', 'Wingspan'],
  },
  {
    name: 'Brian Truong',
    org: 'Graph Ventures',
    linkedin: 'https://www.linkedin.com/in/truongbrian/',
    website: 'https://www.graphventures.com',
    portfolio: ['BetterUp', 'Robinhood', 'Dapper Labs', 'Earnin', 'Envoy', 'PicsArt', 'Serve Robotics', 'Clubhouse', 'Saildrone', 'Field AI', 'TrueLayer', 'Zeplin', 'Papaya Payments', 'Hinge', 'Wealthfront'],
  },
  {
    name: 'Christian Vela',
    org: 'Collective150',
    linkedin: 'https://www.linkedin.com/in/christian-vela/',
    website: 'https://www.collective150.com',
    portfolio: [],
  },
  {
    name: 'Steven Lee',
    org: 'Seven Stars',
    linkedin: 'https://www.linkedin.com/in/stevenlee6',
    website: 'https://www.sevenstars.vc',
    portfolio: ['Tavus', 'Corgi', 'AIUC', 'Doctronic', 'Keychain', 'Dialogue AI', 'Longeye', 'Origin Lab', 'Pomo', 'Sage Care', 'Voya Energy'],
  },
  {
    name: 'Paul Jun',
    org: 'Depth VC',
    linkedin: 'https://www.linkedin.com/in/pauljun/',
    portfolio: ['Dealops', 'Town.com', 'Paragon'],
  },
  {
    name: 'Rocky Yu',
    org: 'AGI House',
    linkedin: 'https://www.linkedin.com/in/rockyyu/',
    website: 'https://www.agihouse.org',
    portfolio: ['Pika Labs'],
  },
  {
    name: 'Vivek Krishnamurthy',
    org: 'Commerce Ventures',
    linkedin: 'https://www.linkedin.com/in/vivekkri/',
    website: 'https://commerce.vc',
    portfolio: ['Bill.com', 'Marqeta', 'Forter', 'Socure', 'MX', 'Vestwell', 'Kin', 'Bureau', 'Mudflap', 'Lithic', 'Narvar', 'Moov', 'Karat', 'Autobooks', 'Canopy Servicing', 'Inbox Health', 'Zeal', 'Crossmint'],
  },
  {
    name: 'Grace Gong',
    org: 'Smart Venture Podcast',
    linkedin: 'https://www.linkedin.com/in/gracegong/',
    website: 'https://svppro.com',
    portfolio: [],
  },
  {
    name: 'Alexa Binns',
    org: 'Swimming with Allocators',
    linkedin: 'https://www.linkedin.com/in/alexabinns/',
    website: 'https://swimmingwithallocators.com',
    portfolio: [],
  },
  {
    name: 'James Lu Morrissey',
    org: 'Umami Capital',
    linkedin: 'https://www.linkedin.com/in/jameslmorrissey',
    website: 'https://venture.angellist.com/umami-capital/syndicate',
    portfolio: ['SpaceX', 'Stripe', 'OpenAI', 'Groq', 'Discord', 'Brex', 'Databricks', 'Deel'],
  },
  {
    name: 'Juan Abundes',
    org: 'Alto Capital',
    linkedin: 'https://www.linkedin.com/in/juan-manuel-abundes/',
    portfolio: [],
  },
  {
    name: 'Paul Irving',
    org: 'GTM Fund',
    linkedin: 'https://www.linkedin.com/in/paulirving',
    website: 'https://www.gtmfund.com',
    portfolio: ['Mutiny', 'Vanta', 'Weaviate', 'Writer', 'Gorgias', 'Crossbeam', 'OfferFit', 'Capchase', 'Census', 'Northbeam', 'Pocus', 'Spekit', 'Tavus', 'Workramp', 'UserEvidence', 'Pavilion'],
  },
  {
    name: 'Tejinder Gill',
    org: 'Sonar Capital',
    linkedin: 'https://www.linkedin.com/in/tejinder-gill-416a2b80/',
    website: 'https://sonarcapital.com',
    portfolio: ['Healtharc', 'SuiteOp', 'SmartBarrel'],
  },
  {
    name: 'Jake Jolis',
    org: 'Zeno Ventures',
    linkedin: 'https://www.linkedin.com/in/jakejolis',
    website: 'https://www.zenopartners.com',
    portfolio: ['Applied Intuition', 'Mercury', 'BioRender', 'Standard Bots', 'Heart Aerospace', 'Mighty Buildings', 'Pump.co', 'Aella', 'Earth AI', 'Corvus Robotics', 'Angström AI', 'Beyond Aero', 'Granza Bio', 'Rain Neuromorphics'],
  },
];

const extendedNetwork: Person[] = [
  {
    name: 'Sheena Jindal',
    org: 'Sugar Free Capital',
    linkedin: 'https://www.linkedin.com/in/sheenajindal/',
    website: 'https://sugarfreecapital.com',
    portfolio: ['PLCs.ai', 'Illumix', 'CreativeMode', 'OfferUp', 'SevenRooms', 'Papa', 'Amplemarket', 'Avibra', 'Juno', 'Curbio', 'Smarty', 'Deepnight'],
  },
  {
    name: 'Loren Straub',
    org: 'Prompted Capital',
    linkedin: 'https://www.linkedin.com/in/lorenstraub/',
    portfolio: [],
  },
  {
    name: 'Ariel Winton-Jones',
    org: 'The Aligned Fund',
    linkedin: 'https://www.linkedin.com/in/arielwintonjones/',
    website: 'https://www.thealignedfund.com',
    portfolio: ['Calendly', 'Loopio', 'Cinder', 'Joyful Health'],
  },
  {
    name: 'Michael Ma',
    org: 'Liquid 2',
    linkedin: 'https://www.linkedin.com/in/michaelma8',
    website: 'https://www.liquid2.vc',
    portfolio: ['Rippling', 'Mercury', 'Applied Intuition', 'Anduril', 'GitLab', 'Retool', 'Astranis', 'Jasper', 'Remote', 'Solugen', 'Stoke Space', 'Athelas', 'Vetcove'],
  },
];

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs text-white/40 hover:text-white/70 border border-white/15 hover:border-white/30 rounded px-2 py-0.5 transition-colors"
    >
      {label}
    </a>
  );
}

function PersonRow({ name, org, linkedin, website, portfolio }: Person) {
  const sourceParam = ORG_TO_SOURCE[org];
  return (
    <div className="py-6 sm:py-8">
      <div className="flex flex-col sm:grid gap-2 sm:gap-12 mb-3" style={{ gridTemplateColumns: '220px 1fr' }}>
        <div>
          <div className="text-white font-bold text-base mb-1">{name}</div>
          <div className="text-white/50 text-sm">{org}</div>
        </div>
        <div className="flex items-center gap-2">
          {linkedin && <ExternalLink href={linkedin} label="LinkedIn" />}
          {website && <ExternalLink href={website} label="Website" />}
        </div>
      </div>
      {portfolio && portfolio.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {portfolio.map((co) => {
            const isKnown = KNOWN_COMPANIES.has(co);
            const to = sourceParam
              ? `/portfolio-companies?source=${encodeURIComponent(sourceParam)}`
              : '/portfolio-companies';
            return isKnown ? (
              <Link
                key={co}
                to={to}
                className="text-xs text-white/55 hover:text-white bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/35 rounded-full px-3 py-1 transition-colors"
                title={`View ${co} on Portfolio Companies page`}
              >
                {co} →
              </Link>
            ) : (
              <span
                key={co}
                className="text-xs text-white/35 bg-white/5 border border-white/10 rounded-full px-3 py-1"
              >
                {co}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

function NetworkContent() {
  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-8 py-12 sm:py-20">
      <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">Linea Ventures · Network</p>
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
        Our Network
      </h1>
      <p className="text-lg sm:text-xl italic text-white/50 mb-8">
        The investors and advisors we work closely with.
      </p>

      <Link
        to="/portfolio-companies"
        className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white border border-white/15 hover:border-white/30 rounded-lg px-4 py-2 mb-12 sm:mb-16 transition-colors"
      >
        View portfolio companies & Linea fit scores →
      </Link>

      <h2 className="text-xl sm:text-2xl font-bold text-white/80 mb-4" style={{ letterSpacing: '-0.01em' }}>
        Partners
      </h2>
      <div className="divide-y divide-white/10 mb-14">
        {partners.map((p) => (
          <PersonRow key={`${p.name}-${p.org}`} {...p} />
        ))}
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-white/80 mb-4" style={{ letterSpacing: '-0.01em' }}>
        Extended Network
      </h2>
      <div className="divide-y divide-white/10">
        {extendedNetwork.map((p) => (
          <PersonRow key={`${p.name}-${p.org}`} {...p} />
        ))}
      </div>
    </div>
  );
}

export default function Network() {
  const [input, setInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  if (unlocked) return <NetworkContent />;

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
        Linea Ventures · Network
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
