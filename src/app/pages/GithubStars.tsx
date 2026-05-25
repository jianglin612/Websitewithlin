import React, { useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = 'AI Infrastructure' | 'AI Agents' | 'Dev Tools' | 'Data Engineering' | 'MLOps' | 'Observability' | 'Cloud/Infra' | 'Web3/Blockchain';

type Project = {
  name: string;
  repo: string;           // e.g. "langchain-ai/langchain"
  website?: string;
  description: string;
  category: Category;
  stars: number;          // total stars (static, update periodically)
  starsLastMonth: number; // approximate 30-day delta
  hasCompany: boolean;
  companyName?: string;
  companyStage?: string;  // Seed / Series A / Series B / etc.
  companyWebsite?: string;
  categoryWeight: number; // 1–5: how investable is this category
  notes?: string;
};

// ─── Category config ──────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<Category, string> = {
  'AI Infrastructure': 'text-emerald-400 bg-emerald-900/30 border-emerald-500/20',
  'AI Agents':         'text-sky-400 bg-sky-900/30 border-sky-500/20',
  'Dev Tools':         'text-violet-400 bg-violet-900/30 border-violet-500/20',
  'Data Engineering':  'text-amber-400 bg-amber-900/30 border-amber-500/20',
  'MLOps':             'text-pink-400 bg-pink-900/30 border-pink-500/20',
  'Observability':     'text-cyan-400 bg-cyan-900/30 border-cyan-500/20',
  'Cloud/Infra':       'text-orange-400 bg-orange-900/30 border-orange-500/20',
  'Web3/Blockchain':   'text-indigo-400 bg-indigo-900/30 border-indigo-500/20',
};

// ─── Data ─────────────────────────────────────────────────────────────────────
// Stars and growth are approximate as of mid-2026. Update periodically.
// categoryWeight: AI Infra=5, AI Agents=4, Data=3, Dev Tools=2

const projects: Project[] = [

  // ── AI Infrastructure ──────────────────────────────────────────────────────
  {
    name: 'vLLM',
    repo: 'vllm-project/vllm',
    website: 'https://docs.vllm.ai',
    description: 'High-throughput and memory-efficient inference engine for LLMs.',
    category: 'AI Infrastructure',
    stars: 42000,
    starsLastMonth: 3200,
    hasCompany: true,
    companyName: 'vLLM (a16z-backed)',
    companyStage: 'Seed',
    categoryWeight: 5,
    notes: 'Becoming the de-facto inference backend for self-hosted LLMs. High enterprise pull.',
  },
  {
    name: 'Ollama',
    repo: 'ollama/ollama',
    website: 'https://ollama.com',
    description: 'Run large language models locally with a simple CLI and API.',
    category: 'AI Infrastructure',
    stars: 92000,
    starsLastMonth: 5100,
    hasCompany: false,
    categoryWeight: 5,
    notes: 'Massive developer adoption. No clear monetization yet — prime for company formation.',
  },
  {
    name: 'LiteLLM',
    repo: 'BerriAI/litellm',
    website: 'https://litellm.ai',
    description: 'Unified LLM API gateway supporting 100+ models with OpenAI-compatible interface.',
    category: 'AI Infrastructure',
    stars: 14000,
    starsLastMonth: 1100,
    hasCompany: true,
    companyName: 'BerriAI',
    companyStage: 'Seed',
    companyWebsite: 'https://litellm.ai',
    categoryWeight: 5,
    notes: 'Early-stage team. Proxy layer for LLM traffic is critical infrastructure for enterprises.',
  },
  {
    name: 'Qdrant',
    repo: 'qdrant/qdrant',
    website: 'https://qdrant.tech',
    description: 'High-performance vector search engine built in Rust.',
    category: 'AI Infrastructure',
    stars: 21000,
    starsLastMonth: 800,
    hasCompany: true,
    companyName: 'Qdrant',
    companyStage: 'Series A',
    companyWebsite: 'https://qdrant.tech',
    categoryWeight: 5,
    notes: 'Strong Rust-native performance story. Direct competitor to Pinecone with open-source edge.',
  },
  {
    name: 'Weaviate',
    repo: 'weaviate/weaviate',
    website: 'https://weaviate.io',
    description: 'AI-native vector database with built-in ML model integrations.',
    category: 'AI Infrastructure',
    stars: 12000,
    starsLastMonth: 400,
    hasCompany: true,
    companyName: 'Weaviate',
    companyStage: 'Series B',
    companyWebsite: 'https://weaviate.io',
    categoryWeight: 5,
  },

  // ── AI Agents ─────────────────────────────────────────────────────────────
  {
    name: 'LangChain',
    repo: 'langchain-ai/langchain',
    website: 'https://langchain.com',
    description: 'Framework for building LLM-powered applications and agents.',
    category: 'AI Agents',
    stars: 95000,
    starsLastMonth: 1200,
    hasCompany: true,
    companyName: 'LangChain',
    companyStage: 'Series A',
    companyWebsite: 'https://langchain.com',
    categoryWeight: 4,
    notes: 'Dominant framework but facing commoditization pressure. LangSmith tracing product is the real business.',
  },
  {
    name: 'CrewAI',
    repo: 'joaomdmoura/crewAI',
    website: 'https://crewai.com',
    description: 'Multi-agent orchestration framework for role-based AI teams.',
    category: 'AI Agents',
    stars: 24000,
    starsLastMonth: 2100,
    hasCompany: true,
    companyName: 'CrewAI',
    companyStage: 'Seed',
    companyWebsite: 'https://crewai.com',
    categoryWeight: 4,
    notes: 'Fast-growing. Early-stage team building enterprise multi-agent platform. Strong Linea fit signal.',
  },
  {
    name: 'Composio',
    repo: 'ComposioHQ/composio',
    website: 'https://composio.dev',
    description: 'Tool integration platform connecting AI agents to 250+ external apps.',
    category: 'AI Agents',
    stars: 13000,
    starsLastMonth: 1800,
    hasCompany: true,
    companyName: 'Composio',
    companyStage: 'Seed',
    companyWebsite: 'https://composio.dev',
    categoryWeight: 4,
    notes: 'Solves the "last mile" problem for agents — connecting them to real systems. Critical infra.',
  },
  {
    name: 'Mastra',
    repo: 'mastra-ai/mastra',
    website: 'https://mastra.ai',
    description: 'TypeScript-native AI agent framework with built-in memory and workflow primitives.',
    category: 'AI Agents',
    stars: 9000,
    starsLastMonth: 2400,
    hasCompany: true,
    companyName: 'Mastra',
    companyStage: 'Seed',
    companyWebsite: 'https://mastra.ai',
    categoryWeight: 4,
    notes: 'Very fast growth for new entrant. TypeScript-native gives strong developer experience edge.',
  },
  {
    name: 'AutoGPT',
    repo: 'Significant-Gravitas/AutoGPT',
    website: 'https://agpt.co',
    description: 'Autonomous AI agent platform for goal-driven task completion.',
    category: 'AI Agents',
    stars: 168000,
    starsLastMonth: 600,
    hasCompany: false,
    categoryWeight: 4,
    notes: 'Early viral moment has faded. Growth slowing. Still massive mindshare — company formation opportunity?',
  },

  // ── Dev Tools ─────────────────────────────────────────────────────────────
  {
    name: 'OpenHands',
    repo: 'All-Hands-AI/OpenHands',
    website: 'https://www.all-hands.dev',
    description: 'Open-source AI software development agent that writes and runs code autonomously.',
    category: 'Dev Tools',
    stars: 38000,
    starsLastMonth: 3500,
    hasCompany: true,
    companyName: 'All Hands AI',
    companyStage: 'Seed',
    companyWebsite: 'https://www.all-hands.dev',
    categoryWeight: 2,
    notes: 'Fastest growing in dev tools. Competes with Devin. Early team, high velocity.',
  },
  {
    name: 'Zed',
    repo: 'zed-industries/zed',
    website: 'https://zed.dev',
    description: 'High-performance, multiplayer code editor built in Rust with native AI integration.',
    category: 'Dev Tools',
    stars: 52000,
    starsLastMonth: 1400,
    hasCompany: true,
    companyName: 'Zed Industries',
    companyStage: 'Series A',
    companyWebsite: 'https://zed.dev',
    categoryWeight: 2,
    notes: 'Differentiated by performance (Rust + GPU rendering) and multiplayer. Strong Series A momentum.',
  },
  {
    name: 'Aider',
    repo: 'Aider-AI/aider',
    website: 'https://aider.chat',
    description: 'AI pair programming in your terminal — edits code across your entire git repo.',
    category: 'Dev Tools',
    stars: 22000,
    starsLastMonth: 1100,
    hasCompany: false,
    categoryWeight: 2,
    notes: 'Beloved by power users. Solo-maintained — ripe for company formation or acqui-hire.',
  },

  // ── Data Engineering ──────────────────────────────────────────────────────
  {
    name: 'DuckDB',
    repo: 'duckdb/duckdb',
    website: 'https://duckdb.org',
    description: 'In-process OLAP database engine — SQLite for analytics.',
    category: 'Data Engineering',
    stars: 25000,
    starsLastMonth: 900,
    hasCompany: true,
    companyName: 'DuckDB Labs',
    companyStage: 'Seed',
    companyWebsite: 'https://duckdblabs.com',
    categoryWeight: 3,
    notes: 'Fastest-growing data query engine. Embedded model = very sticky. Multiple startups building on top.',
  },
  {
    name: 'Airbyte',
    repo: 'airbytehq/airbyte',
    website: 'https://airbyte.com',
    description: 'Open-source data integration platform for moving data between sources and destinations.',
    category: 'Data Engineering',
    stars: 16000,
    starsLastMonth: 300,
    hasCompany: true,
    companyName: 'Airbyte',
    companyStage: 'Series B',
    companyWebsite: 'https://airbyte.com',
    categoryWeight: 3,
  },
  {
    name: 'Dagster',
    repo: 'dagster-io/dagster',
    website: 'https://dagster.io',
    description: 'Cloud-native data orchestration platform for data pipelines and ML assets.',
    category: 'Data Engineering',
    stars: 12000,
    starsLastMonth: 250,
    hasCompany: true,
    companyName: 'Dagster Labs',
    companyStage: 'Series C',
    companyWebsite: 'https://dagster.io',
    categoryWeight: 3,
  },
  {
    name: 'dbt Core',
    repo: 'dbt-labs/dbt-core',
    website: 'https://getdbt.com',
    description: 'Data transformation framework that brings software engineering practices to analytics.',
    category: 'Data Engineering',
    stars: 9800,
    starsLastMonth: 150,
    hasCompany: true,
    companyName: 'dbt Labs',
    companyStage: 'Series D',
    companyWebsite: 'https://getdbt.com',
    categoryWeight: 3,
    notes: 'Category-defining but growth has plateaued. Series D — too late for Linea.',
  },

  // ── MLOps/Training ────────────────────────────────────────────────────────
  {
    name: 'Ray',
    repo: 'ray-project/ray',
    website: 'https://www.ray.io',
    description: 'Unified framework for scaling AI and Python applications.',
    category: 'MLOps',
    stars: 39000,
    starsLastMonth: 1200,
    hasCompany: true,
    companyName: 'Anyscale',
    companyStage: 'Series C',
    companyWebsite: 'https://www.anyscale.com',
    categoryWeight: 4,
    notes: 'Becoming standard for distributed ML training. Series C company with strong adoption.',
  },
  {
    name: 'Huggingface Datasets',
    repo: 'huggingface/datasets',
    website: 'https://huggingface.co/docs/datasets',
    description: 'Library for easily accessing and sharing datasets for NLP, computer vision, and speech tasks.',
    category: 'MLOps',
    stars: 18500,
    starsLastMonth: 550,
    hasCompany: true,
    companyName: 'Huggingface',
    companyStage: 'Series D',
    categoryWeight: 4,
    notes: 'Part of Huggingface ecosystem. Series D valuation $4.5B.',
  },
  {
    name: 'Axolotl',
    repo: 'axolotl-ai-cloud/axolotl',
    website: 'https://github.com/axolotl-ai-cloud/axolotl',
    description: 'Fine-tuning framework for large language models with simplified config.',
    category: 'MLOps',
    stars: 11500,
    starsLastMonth: 350,
    hasCompany: true,
    companyName: 'Axolotl AI',
    companyStage: 'Seed',
    categoryWeight: 4,
    notes: 'Early-stage team building on open-source. Growing adoption in fine-tuning workflows.',
  },

  // ── Observability ──────────────────────────────────────────────────────────
  {
    name: 'Prometheus',
    repo: 'prometheus/prometheus',
    website: 'https://prometheus.io',
    description: 'Open-source monitoring and alerting toolkit for metrics and time-series data.',
    category: 'Observability',
    stars: 64200,
    starsLastMonth: 1800,
    hasCompany: false,
    categoryWeight: 3,
    notes: 'CNCF graduated project. No single company — foundational infrastructure.',
  },
  {
    name: 'Grafana',
    repo: 'grafana/grafana',
    website: 'https://grafana.com',
    description: 'Visualization platform for time-series data and metrics dashboards.',
    category: 'Observability',
    stars: 68000,
    starsLastMonth: 2000,
    hasCompany: true,
    companyName: 'Grafana Labs',
    companyStage: 'Series E',
    companyWebsite: 'https://grafana.com',
    categoryWeight: 3,
    notes: 'Series E at $9B valuation. Enterprise observability company.',
  },
  {
    name: 'OpenTelemetry',
    repo: 'open-telemetry/opentelemetry',
    website: 'https://opentelemetry.io',
    description: 'Standard for instrumenting code with metrics, logs, and traces.',
    category: 'Observability',
    stars: 3400,
    starsLastMonth: 200,
    hasCompany: false,
    categoryWeight: 3,
    notes: 'CNCF project. Vendor-neutral telemetry standard — critical for observability.',
  },

  // ── Cloud/Infra ───────────────────────────────────────────────────────────
  {
    name: 'Docker',
    repo: 'moby/moby',
    website: 'https://www.docker.com',
    description: 'Containerization platform for building and running applications.',
    category: 'Cloud/Infra',
    stars: 73500,
    starsLastMonth: 2000,
    hasCompany: true,
    companyName: 'Docker Inc',
    companyStage: 'Enterprise',
    companyWebsite: 'https://www.docker.com',
    categoryWeight: 4,
    notes: 'Category-defining. Docker Inc is enterprise unicorn — too late for Linea.',
  },
  {
    name: 'Kubernetes',
    repo: 'kubernetes/kubernetes',
    website: 'https://kubernetes.io',
    description: 'Container orchestration platform for automating deployment and scaling.',
    category: 'Cloud/Infra',
    stars: 122451,
    starsLastMonth: 3500,
    hasCompany: false,
    categoryWeight: 5,
    notes: 'Highest star count. CNCF project. Essential infrastructure for cloud.',
  },
  {
    name: 'Terraform',
    repo: 'hashicorp/terraform',
    website: 'https://www.terraform.io',
    description: 'Infrastructure as Code tool for managing cloud resources declaratively.',
    category: 'Cloud/Infra',
    stars: 48400,
    starsLastMonth: 1400,
    hasCompany: true,
    companyName: 'HashiCorp',
    companyStage: 'Enterprise',
    companyWebsite: 'https://www.hashicorp.com',
    categoryWeight: 4,
    notes: 'Enterprise standard. HashiCorp public company — past Linea stage.',
  },

  // ── Web3/Blockchain ───────────────────────────────────────────────────────
  {
    name: 'Ethers.js',
    repo: 'ethers-io/ethers.js',
    website: 'https://docs.ethers.org',
    description: 'Lightweight library for interacting with Ethereum and EVM-compatible blockchains.',
    category: 'Web3/Blockchain',
    stars: 8662,
    starsLastMonth: 250,
    hasCompany: false,
    categoryWeight: 2,
    notes: 'Community-maintained. Essential for Web3 developers.',
  },
  {
    name: 'Solidity',
    repo: 'ethereum/solidity',
    website: 'https://soliditylang.org',
    description: 'Smart contract programming language for Ethereum virtual machine.',
    category: 'Web3/Blockchain',
    stars: 25600,
    starsLastMonth: 750,
    hasCompany: false,
    categoryWeight: 2,
    notes: 'Ethereum Foundation maintained. Foundational for smart contracts.',
  },
  {
    name: 'Web3.py',
    repo: 'ethereum/web3.py',
    website: 'https://web3py.readthedocs.io',
    description: 'Python library for interacting with Ethereum and Web3 applications.',
    category: 'Web3/Blockchain',
    stars: 5500,
    starsLastMonth: 160,
    hasCompany: false,
    categoryWeight: 2,
    notes: 'Ethereum Foundation project. Python SDK for blockchain interaction.',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function signalScore(p: Project): number {
  const growthBonus = p.starsLastMonth >= 10000 ? 2 : p.starsLastMonth >= 3000 ? 1 : 0;
  return Math.min(7, p.categoryWeight + growthBonus);
}

function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K`;
  return String(n);
}

function formatDelta(n: number): string {
  if (n >= 1000) return `+${(n / 1000).toFixed(1)}K`;
  return `+${n}`;
}

const STAGES = ['All', 'Seed', 'Series A', 'Series B', 'Series B+'];
const CATEGORIES: Category[] = ['AI Infrastructure', 'AI Agents', 'Dev Tools', 'Data Engineering'];

// ─── ProjectCard ──────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  const score = signalScore(project);

  const borderClass =
    score >= 6 ? 'border-emerald-500/40 bg-emerald-950/20' :
    score >= 5 ? 'border-emerald-500/20 bg-emerald-950/10' :
    score >= 4 ? 'border-sky-500/25 bg-sky-950/10' :
    'border-white/10 bg-white/[0.02]';

  const scoreDotClass =
    score >= 6 ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]' :
    score >= 5 ? 'bg-emerald-500/80' :
    score >= 4 ? 'bg-sky-400/80' :
    score >= 3 ? 'bg-amber-400/60' :
    'bg-white/20';

  const scoreLabel =
    score >= 6 ? 'High Signal' :
    score >= 4 ? 'Watch' :
    'Low Signal';

  return (
    <div className={`relative rounded-lg border p-5 flex flex-col gap-4 ${borderClass}`}>
      {/* Score badge */}
      <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
        <span className={`w-2 h-2 rounded-full ${scoreDotClass}`} />
        <span className="text-[10px] text-white/40 font-medium">{scoreLabel}</span>
      </div>

      {/* Header */}
      <div className="pr-20">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <a
            href={`https://github.com/${project.repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-bold text-base hover:text-white/80 transition-colors"
          >
            {project.name} ↗
          </a>
        </div>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[project.category]}`}>
          {project.category}
        </span>
        <p className="text-white/55 text-sm leading-relaxed mt-2">{project.description}</p>
      </div>

      {/* Stars */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-white/70 text-sm">
          <span className="text-amber-400/80">★</span>
          <span className="font-semibold tabular-nums">{formatStars(project.stars)}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-emerald-400/80 font-medium">
          <span>{formatDelta(project.starsLastMonth)}/mo</span>
          <span>↑</span>
        </div>
      </div>

      {/* Company */}
      {project.hasCompany && project.companyName ? (
        <div className="flex flex-wrap items-center gap-2 border-t border-white/8 pt-3">
          <span className="text-[10px] font-bold tracking-widest uppercase text-white/25">Company</span>
          {project.companyWebsite ? (
            <a
              href={project.companyWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/70 hover:text-white transition-colors font-medium"
            >
              {project.companyName} ↗
            </a>
          ) : (
            <span className="text-xs text-white/70 font-medium">{project.companyName}</span>
          )}
          {project.companyStage && (
            <span className="text-[10px] text-white/40 bg-white/8 border border-white/10 rounded px-1.5 py-0.5">
              {project.companyStage}
            </span>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2 border-t border-white/8 pt-3">
          <span className="text-[10px] font-bold tracking-widest uppercase text-white/20">Company</span>
          <span className="text-xs text-white/25 italic">None yet</span>
        </div>
      )}

      {/* Notes */}
      {project.notes && (
        <p className="text-white/40 text-xs leading-relaxed italic border-t border-white/8 pt-3">
          {project.notes}
        </p>
      )}
    </div>
  );
}

// ─── Content ──────────────────────────────────────────────────────────────────

function GithubStarsContent() {
  const [categoryFilter, setCategoryFilter] = useState<Category | 'All'>('All');
  const [hasCompanyFilter, setHasCompanyFilter] = useState(false);
  const [stageFilter, setStageFilter] = useState('All');

  const visible = projects
    .filter((p) => {
      if (categoryFilter !== 'All' && p.category !== categoryFilter) return false;
      if (hasCompanyFilter && !p.hasCompany) return false;
      if (stageFilter !== 'All') {
        if (stageFilter === 'Series B+') {
          const stage = p.companyStage ?? '';
          if (!['Series B', 'Series C', 'Series D', 'Series E', 'Series F', 'Late Stage', 'Public'].includes(stage)) return false;
        } else {
          if (p.companyStage !== stageFilter) return false;
        }
      }
      return true;
    })
    .sort((a, b) => signalScore(b) - signalScore(a));

  const highSignalCount = projects.filter((p) => signalScore(p) >= 6).length;

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-8 py-12 sm:py-20">
      <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">Linea Ventures · Research</p>
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
        GitHub Star Tracker
      </h1>
      <p className="text-lg sm:text-xl italic text-white/50 mb-10 sm:mb-12">
        Open-source projects worth watching — ranked by revenue potential and growth velocity.
      </p>

      {/* Filter bar */}
      <div className="flex flex-col gap-3 mb-10">
        {/* Row 1: category + filters */}
        <div className="flex flex-wrap items-center gap-2 justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategoryFilter('All')}
              className={`text-xs font-medium px-3 py-1.5 rounded border transition-colors ${
                categoryFilter === 'All'
                  ? 'bg-white/15 border-white/30 text-white'
                  : 'bg-transparent border-white/15 text-white/40 hover:text-white/70'
              }`}
            >
              All ({projects.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`text-xs font-medium px-3 py-1.5 rounded border transition-colors ${
                  categoryFilter === cat
                    ? 'bg-white/15 border-white/30 text-white'
                    : 'bg-transparent border-white/15 text-white/40 hover:text-white/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Has Company toggle */}
            <button
              onClick={() => setHasCompanyFilter(!hasCompanyFilter)}
              className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded border transition-colors ${
                hasCompanyFilter
                  ? 'bg-white/15 border-white/30 text-white'
                  : 'bg-transparent border-white/15 text-white/40 hover:text-white/70'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${hasCompanyFilter ? 'bg-emerald-400' : 'bg-white/20'}`} />
              Has Company
            </button>

            {/* Stage dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="stage-select" className="text-xs text-white/40 font-medium">Stage:</label>
              <select
                id="stage-select"
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="text-xs px-2.5 py-1 rounded border bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/30 transition-colors focus:outline-none focus:border-white/50"
              >
                {STAGES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-[11px] text-white/30 border-t border-white/8 pt-3">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />High Signal (score 6–7)</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-sky-400/80" />Watch (score 4–5)</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-white/20" />Low Signal (score 1–3)</span>
          <span className="ml-auto">{highSignalCount} high signal · {visible.length} shown</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((p) => (
          <ProjectCard key={p.repo} project={p} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="text-white/30 text-sm text-center py-16">No projects match this filter.</p>
      )}

      <p className="text-white/20 text-xs text-center mt-12">
        Star counts approximate as of mid-2026. Signal score = category weight + growth bonus.
      </p>
    </div>
  );
}

// ─── Password gate ─────────────────────────────────────────────────────────────

export default function GithubStars() {
  const [input, setInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  if (unlocked) return <GithubStarsContent />;

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
        Linea Ventures · Research
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
