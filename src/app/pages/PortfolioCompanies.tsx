import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

// ─── Types ───────────────────────────────────────────────────────────────────

type Company = {
  name: string;
  description: string;
  website: string;
  stage: string;
  investors: string[];
  scores: {
    market: number;      // 1–5
    team: number;        // 1–5
    product: number;     // 1–5
    gtm: number;         // 1–5
    aiNative: number;    // 1–5  (how AI-native / agentic)
  };
  lineaFit: boolean;     // true only if Seed/Series A AND thesis match
  lineaReason?: string;  // why it's a fit
  tooLate?: boolean;     // good thesis fit but already past Series B
  source: string;        // which VC firm it came from
};

// ─── Data ─────────────────────────────────────────────────────────────────────
// Linea thesis: vertical AGI / agentic B2B software, outcome/usage pricing,
// $500K–$10M ARR sweet spot, knowledge-work verticals replacing headcount.

const companies: Company[] = [
  // ── FULLY SCORED COMPANIES (from research) ─────────────────────────────────

  // ── Cambrian Ventures ──────────────────────────────────────────────────────
  {
    name: 'OatFi',
    website: 'https://www.oatfi.com',
    description: 'Embedded BNPL and working capital infrastructure for SMBs via fintech platforms.',
    stage: 'Series A',
    investors: ['QED Investors', 'White Star Capital', 'Portage Ventures', 'Cambrian Ventures', 'Fin VC'],
    scores: { market: 4, team: 3, product: 3, gtm: 3, aiNative: 2 },
    lineaFit: false,
    source: 'Cambrian Ventures',
  },
  {
    name: 'Every',
    website: 'https://www.every.io',
    description: 'All-in-one back-office platform for startups: banking, payroll, bookkeeping, and tax.',
    stage: 'Seed',
    investors: ['Cambrian Ventures', 'a16z'],
    scores: { market: 4, team: 4, product: 4, gtm: 3, aiNative: 3 },
    lineaFit: true,
    lineaReason: 'Seed stage. Sells the outcome (your entire back-office done), not a seat. Replacing headcount in finance ops — classic vertical AGI pattern.',
    source: 'Cambrian Ventures',
  },
  {
    name: 'Keep',
    website: 'https://www.trykeep.com',
    description: 'Canadian all-in-one corporate credit card and business banking platform for SMBs.',
    stage: 'Series A',
    investors: ['Tribe Capital', 'Cambrian Ventures', 'Liquid 2', 'Rebel Fund'],
    scores: { market: 3, team: 3, product: 3, gtm: 3, aiNative: 2 },
    lineaFit: false,
    source: 'Cambrian Ventures',
  },
  {
    name: 'Salsa',
    website: 'https://www.salsa.dev',
    description: 'Embedded payroll infrastructure API for platforms to offer payroll to their users.',
    stage: 'Seed',
    investors: ['Cambrian Ventures'],
    scores: { market: 4, team: 3, product: 3, gtm: 3, aiNative: 2 },
    lineaFit: false,
    source: 'Cambrian Ventures',
  },

  // ── Swift Ventures ─────────────────────────────────────────────────────────
  {
    name: 'Arize AI',
    website: 'https://arize.com',
    description: 'AI observability and LLM evaluation platform for teams deploying models in production.',
    stage: 'Series C',
    investors: ['Adams Street Partners', 'Battery Ventures', 'Foundation Capital', 'TCV', 'Swift Ventures', 'Microsoft M12'],
    scores: { market: 5, team: 5, product: 5, gtm: 4, aiNative: 5 },
    lineaFit: false,
    tooLate: true,
    lineaReason: 'Strong thesis fit — core AI infra, usage-priced — but at Series C, too late for Linea.',
    source: 'Swift Ventures',
  },
  {
    name: 'SafelyYou',
    website: 'https://safelyyou.com',
    description: 'AI computer vision platform that detects and prevents falls in senior care facilities.',
    stage: 'Series C',
    investors: ['Touring Capital', 'Foundation Capital', 'Omega Healthcare', 'Founders Fund', 'Swift Ventures', 'Samsung Next'],
    scores: { market: 4, team: 4, product: 4, gtm: 4, aiNative: 4 },
    lineaFit: false,
    tooLate: true,
    lineaReason: 'Strong thesis fit — vertical AGI for healthcare, outcome pricing — but at Series C, too late for Linea.',
    source: 'Swift Ventures',
  },
  {
    name: 'Dash Bio',
    website: 'https://dashbio.com',
    description: 'Tech-enabled drug development platform accelerating bioanalysis workflows.',
    stage: 'Series A',
    investors: ['Swift Ventures', 'The Aligned Fund', 'Freestyle Capital'],
    scores: { market: 4, team: 4, product: 3, gtm: 3, aiNative: 3 },
    lineaFit: false,
    source: 'Swift Ventures',
  },
  {
    name: 'Flyr Labs',
    website: 'https://flyrlabs.com',
    description: 'AI-powered revenue operating system for airlines and travel companies.',
    stage: 'Series C',
    investors: ['Swift Ventures', 'Intel Capital', 'Kinnevik'],
    scores: { market: 4, team: 4, product: 4, gtm: 3, aiNative: 4 },
    lineaFit: false,
    tooLate: true,
    lineaReason: 'Good thesis fit — outcome pricing, vertical AI — but at Series C, too late for Linea.',
    source: 'Swift Ventures',
  },
  {
    name: 'Gray Matter Robotics',
    website: 'https://www.graymatter-robotics.com',
    description: 'Autonomous robotic systems for surface finishing and manufacturing operations.',
    stage: 'Series B',
    investors: ['Swift Ventures', 'GreatPoint Ventures', 'Alven'],
    scores: { market: 4, team: 4, product: 4, gtm: 3, aiNative: 4 },
    lineaFit: false,
    source: 'Swift Ventures',
  },

  // ── Graph Ventures ─────────────────────────────────────────────────────────
  {
    name: 'BetterUp',
    website: 'https://betterup.com',
    description: 'AI-powered professional coaching and mental fitness platform for enterprise employees.',
    stage: 'Late Stage',
    investors: ['Lightspeed', 'Salesforce Ventures', 'Plus Capital', 'Graph Ventures'],
    scores: { market: 5, team: 5, product: 4, gtm: 4, aiNative: 4 },
    lineaFit: false,
    tooLate: true,
    lineaReason: 'Strong thesis fit — outcome-priced coaching, AI at scale — but late stage, well past Linea\'s sweet spot.',
    source: 'Graph Ventures',
  },
  {
    name: 'Earnin',
    website: 'https://earnin.com',
    description: 'Earned wage access app letting workers get paid before payday with no mandatory fees.',
    stage: 'Series C',
    investors: ['Andreessen Horowitz', 'DST Global', 'Spark Capital', 'Matrix Partners', 'Graph Ventures'],
    scores: { market: 4, team: 3, product: 3, gtm: 4, aiNative: 2 },
    lineaFit: false,
    source: 'Graph Ventures',
  },
  {
    name: 'Field AI',
    website: 'https://field-ai.com',
    description: 'Autonomous AI robots for industrial inspection and operations in unstructured environments.',
    stage: 'Series B',
    investors: ['Koch Disruptive Technologies', 'Graph Ventures'],
    scores: { market: 4, team: 5, product: 4, gtm: 3, aiNative: 5 },
    lineaFit: false,
    tooLate: true,
    lineaReason: 'Good thesis fit — autonomous agents, vertical AI — but at Series B, at the edge of Linea\'s range.',
    source: 'Graph Ventures',
  },
  {
    name: 'TrueLayer',
    website: 'https://truelayer.com',
    description: 'Open banking payments network enabling instant bank-to-bank payments across Europe.',
    stage: 'Series E',
    investors: ['Stripe', 'Tiger Global', 'Addition', 'Graph Ventures'],
    scores: { market: 4, team: 4, product: 4, gtm: 4, aiNative: 2 },
    lineaFit: false,
    source: 'Graph Ventures',
  },
  {
    name: 'Robinhood',
    website: 'https://robinhood.com',
    description: 'Commission-free retail investing and crypto trading platform.',
    stage: 'Public (NASDAQ: HOOD)',
    investors: ['Andreessen Horowitz', 'Sequoia', 'NEA', 'Graph Ventures'],
    scores: { market: 5, team: 4, product: 4, gtm: 5, aiNative: 2 },
    lineaFit: false,
    source: 'Graph Ventures',
  },

  // ── Seven Stars ────────────────────────────────────────────────────────────
  {
    name: 'Tavus',
    website: 'https://tavus.io',
    description: 'Conversational AI video platform that creates lifelike digital twin avatars and real-time AI humans.',
    stage: 'Series B',
    investors: ['CRV', 'Scale Venture Partners', 'Sequoia', 'Y Combinator', 'Seven Stars', 'GTMfund'],
    scores: { market: 5, team: 5, product: 5, gtm: 4, aiNative: 5 },
    lineaFit: false,
    tooLate: true,
    lineaReason: 'Strong thesis fit — AI-native, usage-priced — but at Series B, too late for Linea.',
    source: 'Seven Stars',
  },
  {
    name: 'Corgi',
    website: 'https://corgi.ins',
    description: 'First AI-native insurance carrier underwriting policies autonomously end-to-end.',
    stage: 'Seed',
    investors: ['Seven Stars'],
    scores: { market: 5, team: 4, product: 4, gtm: 3, aiNative: 5 },
    lineaFit: true,
    lineaReason: 'Seed stage. Full vertical AGI for insurance — AI replaces underwriters, charges on outcomes (premiums), huge TAM.',
    source: 'Seven Stars',
  },
  {
    name: 'Doctronic',
    website: 'https://doctronic.com',
    description: '24/7 AI doctor providing medical consultations and triage at scale.',
    stage: 'Seed',
    investors: ['Seven Stars'],
    scores: { market: 5, team: 4, product: 4, gtm: 3, aiNative: 5 },
    lineaFit: true,
    lineaReason: 'Seed stage. Vertical AGI for healthcare — AI replaces the first consultation, outcome-based, enormous market.',
    source: 'Seven Stars',
  },
  {
    name: 'Keychain',
    website: 'https://keychain.com',
    description: 'AI-powered supply chain platform connecting CPG brands with contract manufacturers.',
    stage: 'Seed',
    investors: ['Seven Stars', 'Commerce Ventures'],
    scores: { market: 4, team: 3, product: 3, gtm: 3, aiNative: 3 },
    lineaFit: false,
    source: 'Seven Stars',
  },

  // ── Commerce Ventures ──────────────────────────────────────────────────────
  {
    name: 'Marqeta',
    website: 'https://marqeta.com',
    description: 'Modern card issuing platform and payment infrastructure for fintech and enterprise.',
    stage: 'Public (NASDAQ: MQ)',
    investors: ['Visa', 'Goldman Sachs', 'Commerce Ventures', 'Granite Ventures'],
    scores: { market: 5, team: 4, product: 5, gtm: 5, aiNative: 2 },
    lineaFit: false,
    source: 'Commerce Ventures',
  },
  {
    name: 'Socure',
    website: 'https://socure.com',
    description: 'AI-powered identity verification and fraud prevention platform for financial services.',
    stage: 'Series E',
    investors: ['Accel', 'Commerce Ventures', 'Tiger Global', 'Scale Venture Partners'],
    scores: { market: 5, team: 5, product: 5, gtm: 4, aiNative: 4 },
    lineaFit: false,
    tooLate: true,
    lineaReason: 'Strong thesis fit — AI replacing KYC teams, usage-based — but at Series E, far too late for Linea.',
    source: 'Commerce Ventures',
  },
  {
    name: 'Vestwell',
    website: 'https://vestwell.com',
    description: 'Digital retirement plan administration platform replacing traditional recordkeeping.',
    stage: 'Series D',
    investors: ['Goldman Sachs', 'Commerce Ventures', 'Broadridge', 'Franklin Templeton'],
    scores: { market: 4, team: 4, product: 4, gtm: 4, aiNative: 3 },
    lineaFit: false,
    tooLate: true,
    lineaReason: 'Good thesis fit — services-as-software, replacing admins — but at Series D, too late for Linea.',
    source: 'Commerce Ventures',
  },
  {
    name: 'Mudflap',
    website: 'https://mudflap.com',
    description: 'Fuel savings and financial platform for independent truck drivers and small fleets.',
    stage: 'Series B',
    investors: ['Commerce Ventures', 'Andreessen Horowitz', 'Tiger Global'],
    scores: { market: 4, team: 4, product: 4, gtm: 4, aiNative: 2 },
    lineaFit: false,
    source: 'Commerce Ventures',
  },
  {
    name: 'Inbox Health',
    website: 'https://inboxhealth.com',
    description: 'Patient billing communication platform reducing collection costs for medical practices.',
    stage: 'Series A',
    investors: ['Commerce Ventures', 'Sonar Capital', 'Bessemer'],
    scores: { market: 4, team: 4, product: 4, gtm: 3, aiNative: 3 },
    lineaFit: true,
    lineaReason: 'Series A. Outcome-priced (% of collections), AI replacing billing staff, vertical software with a clear ROI.',
    source: 'Commerce Ventures',
  },
  {
    name: 'Zeal',
    website: 'https://zeal.com',
    description: 'Embedded payroll infrastructure API for platforms to offer white-label payroll.',
    stage: 'Series A',
    investors: ['Commerce Ventures', 'Spark Capital', 'Homebrew'],
    scores: { market: 4, team: 3, product: 3, gtm: 3, aiNative: 2 },
    lineaFit: false,
    source: 'Commerce Ventures',
  },

  // ── Umami Capital (AngelList syndicate) ────────────────────────────────────
  {
    name: 'OpenAI',
    website: 'https://openai.com',
    description: 'Leading AI research lab building foundational models and the ChatGPT platform.',
    stage: 'Late Stage',
    investors: ['Microsoft', 'Thrive Capital', 'Khosla Ventures', 'Tiger Global', 'Umami Capital'],
    scores: { market: 5, team: 5, product: 5, gtm: 5, aiNative: 5 },
    lineaFit: false,
    source: 'Umami Capital',
  },
  {
    name: 'Groq',
    website: 'https://groq.com',
    description: 'Ultra-fast AI inference chip and cloud platform, purpose-built for LLM speed.',
    stage: 'Series D',
    investors: ['BlackRock', 'Neuberger Berman', 'Samsung', 'Umami Capital'],
    scores: { market: 5, team: 5, product: 5, gtm: 4, aiNative: 5 },
    lineaFit: false,
    source: 'Umami Capital',
  },
  {
    name: 'Brex',
    website: 'https://brex.com',
    description: 'AI-powered spend management platform: corporate cards, expense, and travel for startups.',
    stage: 'Late Stage',
    investors: ['Y Combinator', 'Peter Thiel', 'Kleiner Perkins', 'Greenoaks', 'Umami Capital'],
    scores: { market: 5, team: 5, product: 5, gtm: 5, aiNative: 3 },
    lineaFit: false,
    source: 'Umami Capital',
  },
  {
    name: 'Databricks',
    website: 'https://databricks.com',
    description: 'Unified data analytics and AI platform built on Apache Spark and the Lakehouse architecture.',
    stage: 'Late Stage',
    investors: ['Andreessen Horowitz', 'Coatue', 'Franklin Templeton', 'Umami Capital'],
    scores: { market: 5, team: 5, product: 5, gtm: 5, aiNative: 5 },
    lineaFit: false,
    source: 'Umami Capital',
  },

  // ── GTMfund ────────────────────────────────────────────────────────────────
  {
    name: 'Mutiny',
    website: 'https://mutinyhq.com',
    description: 'AI agent that personalizes B2B websites and generates pipeline for target accounts.',
    stage: 'Series B',
    investors: ['Tiger Global', 'Insight Partners', 'Sequoia', 'Cowboy Ventures', 'GTMfund'],
    scores: { market: 4, team: 5, product: 4, gtm: 5, aiNative: 4 },
    lineaFit: false,
    tooLate: true,
    lineaReason: 'Good thesis fit — AI replacing demand gen, outcome-priced — but at Series B, too late for Linea.',
    source: 'GTMfund',
  },
  {
    name: 'Vanta',
    website: 'https://vanta.com',
    description: 'Trust management platform automating security compliance (SOC 2, ISO 27001, HIPAA).',
    stage: 'Series C',
    investors: ['Sequoia', 'Y Combinator', 'Craft Ventures', 'Goldman Sachs', 'GTMfund'],
    scores: { market: 5, team: 5, product: 5, gtm: 5, aiNative: 4 },
    lineaFit: false,
    tooLate: true,
    lineaReason: 'Strong thesis fit — replaces compliance teams, usage-based — but at Series C ($2.45B), far too late for Linea.',
    source: 'GTMfund',
  },
  {
    name: 'Weaviate',
    website: 'https://weaviate.io',
    description: 'Open-source AI-native vector database powering semantic search and agent memory.',
    stage: 'Series B',
    investors: ['Index Ventures', 'Battery Ventures', 'NEA', 'GTMfund'],
    scores: { market: 5, team: 4, product: 5, gtm: 4, aiNative: 5 },
    lineaFit: false,
    tooLate: true,
    lineaReason: 'Strong thesis fit — AI infra, usage-priced — but at Series B, too late for Linea.',
    source: 'GTMfund',
  },
  {
    name: 'Writer',
    website: 'https://writer.com',
    description: 'Full-stack enterprise AI platform for deploying agentic AI applications across business workflows.',
    stage: 'Series C',
    investors: ['Premji Invest', 'Radical Ventures', 'ICONIQ Growth', 'Salesforce Ventures', 'GTMfund'],
    scores: { market: 5, team: 5, product: 5, gtm: 5, aiNative: 5 },
    lineaFit: false,
    tooLate: true,
    lineaReason: 'Perfect thesis fit — $47M ARR, 194% growth, enterprise agentic AI — but at Series C, too late for Linea.',
    source: 'GTMfund',
  },
  {
    name: 'Gorgias',
    website: 'https://gorgias.com',
    description: 'AI customer support helpdesk automating 60%+ of tickets for ecommerce brands.',
    stage: 'Series C',
    investors: ['SaaStr', 'Alven', 'Shopify', 'Sapphire', 'CRV', 'GTMfund'],
    scores: { market: 4, team: 4, product: 4, gtm: 5, aiNative: 4 },
    lineaFit: false,
    tooLate: true,
    lineaReason: 'Strong thesis fit — AI replacing support agents, outcome-priced — but at Series C, too late for Linea.',
    source: 'GTMfund',
  },
  {
    name: 'Pocus',
    website: 'https://pocus.com',
    description: 'Product-led sales platform turning usage signals into revenue opportunities for GTM teams.',
    stage: 'Series A',
    investors: ['Coatue', 'First Round Capital', 'GTMfund'],
    scores: { market: 4, team: 4, product: 4, gtm: 4, aiNative: 3 },
    lineaFit: false,
    source: 'GTMfund',
  },

  // ── Sonar Capital ──────────────────────────────────────────────────────────
  {
    name: 'Healtharc',
    website: 'https://healtharc.com',
    description: 'Remote patient monitoring platform delivering virtual care everywhere for chronic conditions.',
    stage: 'Seed',
    investors: ['Sonar Capital'],
    scores: { market: 4, team: 3, product: 3, gtm: 2, aiNative: 3 },
    lineaFit: false,
    source: 'Sonar Capital',
  },
  {
    name: 'SuiteOp',
    website: 'https://suiteop.com',
    description: 'All-in-one operations and hospitality management platform for short-term rental operators.',
    stage: 'Seed',
    investors: ['Sonar Capital'],
    scores: { market: 3, team: 3, product: 3, gtm: 3, aiNative: 2 },
    lineaFit: false,
    source: 'Sonar Capital',
  },
  {
    name: 'SmartBarrel',
    website: 'https://smartbarrel.io',
    description: 'AI-powered workforce tracking and clock-in/out platform built for construction sites.',
    stage: 'Seed',
    investors: ['Sonar Capital'],
    scores: { market: 4, team: 3, product: 3, gtm: 3, aiNative: 3 },
    lineaFit: false,
    source: 'Sonar Capital',
  },

  // ── Zeno Ventures ──────────────────────────────────────────────────────────
  {
    name: 'Applied Intuition',
    website: 'https://appliedintuition.com',
    description: 'Toolchain and autonomy stack helping automakers and defense build intelligent vehicles.',
    stage: 'Series F',
    investors: ['BlackRock', 'Kleiner Perkins', 'Fidelity', 'Lux Capital', 'Zeno Ventures', 'Liquid 2'],
    scores: { market: 5, team: 5, product: 5, gtm: 5, aiNative: 5 },
    lineaFit: false,
    source: 'Zeno Ventures',
  },
  {
    name: 'Mercury',
    website: 'https://mercury.com',
    description: 'Banking and financial stack built for startups: checking, savings, cards, and venture debt.',
    stage: 'Series D',
    investors: ['TCV', 'Sequoia', 'Andreessen Horowitz', 'Coatue', 'Zeno Ventures', 'Liquid 2'],
    scores: { market: 5, team: 5, product: 5, gtm: 5, aiNative: 3 },
    lineaFit: false,
    source: 'Zeno Ventures',
  },
  {
    name: 'BioRender',
    website: 'https://biorender.com',
    description: 'Scientific illustration platform with 50K+ icons letting researchers create figures in minutes.',
    stage: 'Growth Stage',
    investors: ['Dimension', 'Sequoia', 'Liquid 2 Ventures', 'Fortius', 'Zeno Ventures'],
    scores: { market: 4, team: 4, product: 5, gtm: 4, aiNative: 3 },
    lineaFit: false,
    source: 'Zeno Ventures',
  },
  {
    name: 'Standard Bots',
    website: 'https://standardbots.com',
    description: 'Affordable, AI-powered industrial robot arm for small manufacturers with no coding required.',
    stage: 'Series A',
    investors: ['Zeno Ventures'],
    scores: { market: 4, team: 4, product: 4, gtm: 3, aiNative: 4 },
    lineaFit: false,
    source: 'Zeno Ventures',
  },
  {
    name: 'Heart Aerospace',
    website: 'https://heartaerospace.com',
    description: 'Electric regional aircraft maker targeting short-haul routes with 30–50 seat planes.',
    stage: 'Series B',
    investors: ['Bill Gates', 'United Airlines', 'Mesa Air', 'Zeno Ventures'],
    scores: { market: 4, team: 4, product: 3, gtm: 3, aiNative: 2 },
    lineaFit: false,
    source: 'Zeno Ventures',
  },

  // ── The Aligned Fund ──────────────────────────────────────────────────────
  {
    name: 'Calendly',
    website: 'https://calendly.com',
    description: 'Scheduling automation platform eliminating back-and-forth for meetings and appointments.',
    stage: 'Series B',
    investors: ['OpenView', 'ICONIQ Capital', 'Atlanta Ventures', 'The Aligned Fund'],
    scores: { market: 5, team: 4, product: 5, gtm: 5, aiNative: 2 },
    lineaFit: false,
    source: 'The Aligned Fund',
  },
  {
    name: 'Loopio',
    website: 'https://loopio.com',
    description: 'RFP and proposal response software automating the content library and collaboration.',
    stage: 'Growth Stage',
    investors: ['OpenView', 'The Aligned Fund'],
    scores: { market: 3, team: 3, product: 4, gtm: 3, aiNative: 3 },
    lineaFit: false,
    source: 'The Aligned Fund',
  },
  {
    name: 'Cinder',
    website: 'https://cinder.co',
    description: 'Trust & safety infrastructure platform for online platforms to moderate content at scale.',
    stage: 'Seed',
    investors: ['The Aligned Fund'],
    scores: { market: 4, team: 4, product: 4, gtm: 3, aiNative: 4 },
    lineaFit: true,
    lineaReason: 'Seed stage. AI replaces trust & safety teams, outcome-priced on violations prevented — vertical AGI for platform ops.',
    source: 'The Aligned Fund',
  },

  // ── Liquid 2 ───────────────────────────────────────────────────────────────
  {
    name: 'Rippling',
    website: 'https://rippling.com',
    description: 'Unified HR, IT, and finance platform managing employees, devices, and payroll in one system.',
    stage: 'Series G',
    investors: ['Founders Fund', 'Sequoia', 'Kleiner Perkins', 'Coatue', 'Liquid 2'],
    scores: { market: 5, team: 5, product: 5, gtm: 5, aiNative: 3 },
    lineaFit: false,
    source: 'Liquid 2',
  },
  {
    name: 'Anduril',
    website: 'https://anduril.com',
    description: 'Defense technology company building autonomous weapons systems and Lattice AI for the US military.',
    stage: 'Series F',
    investors: ['Founders Fund', 'Andreessen Horowitz', 'Valor Equity', 'Liquid 2'],
    scores: { market: 5, team: 5, product: 5, gtm: 5, aiNative: 5 },
    lineaFit: false,
    source: 'Liquid 2',
  },
  {
    name: 'Jasper',
    website: 'https://jasper.ai',
    description: 'AI marketing copilot for enterprise teams to create on-brand content across all channels.',
    stage: 'Series A',
    investors: ['Coatue', 'Insight Partners', 'Bessemer', 'Liquid 2'],
    scores: { market: 4, team: 4, product: 4, gtm: 4, aiNative: 4 },
    lineaFit: true,
    lineaReason: 'Series A. AI replacing marketing writers and agencies, outcome-priced on content volume — vertical AGI for marketing.',
    source: 'Liquid 2',
  },
  {
    name: 'Astranis',
    website: 'https://astranis.com',
    description: 'Micro geostationary satellites providing affordable broadband internet to underserved regions.',
    stage: 'Series C',
    investors: ['Andreessen Horowitz', 'Founders Fund', 'Liquid 2'],
    scores: { market: 4, team: 5, product: 4, gtm: 3, aiNative: 2 },
    lineaFit: false,
    source: 'Liquid 2',
  },

  // ── Sugar Free Capital ─────────────────────────────────────────────────────
  {
    name: 'PLCs.ai',
    website: 'https://plcs.ai',
    description: 'AI agent that reads and writes industrial PLC code, automating factory automation programming.',
    stage: 'Seed',
    investors: ['Sugar Free Capital'],
    scores: { market: 5, team: 4, product: 4, gtm: 3, aiNative: 5 },
    lineaFit: true,
    lineaReason: 'Seed stage. Vertical AGI for industrial engineering — replaces PLC programmers entirely, usage-priced, enormous industrial TAM.',
    source: 'Sugar Free Capital',
  },
  {
    name: 'Illumix',
    website: 'https://illumix.com',
    description: 'AR-powered enterprise training platform delivering immersive hands-on workforce learning.',
    stage: 'Series A',
    investors: ['Sugar Free Capital', 'Comcast Ventures'],
    scores: { market: 4, team: 3, product: 3, gtm: 3, aiNative: 3 },
    lineaFit: false,
    source: 'Sugar Free Capital',
  },
  {
    name: 'Amplemarket',
    website: 'https://amplemarket.com',
    description: 'AI-powered sales assistant automating outbound prospecting, sequencing, and LinkedIn outreach.',
    stage: 'Series A',
    investors: ['Sugar Free Capital', 'Bessemer', 'Comcast Ventures'],
    scores: { market: 4, team: 4, product: 4, gtm: 4, aiNative: 4 },
    lineaFit: true,
    lineaReason: 'Series A. AI SDR replacing headcount in outbound sales, outcome-priced on meetings booked — vertical AGI for revenue ops.',
    source: 'Sugar Free Capital',
  },

  // ── AGI House ─────────────────────────────────────────────────────────────
  {
    name: 'Pika Labs',
    website: 'https://pika.art',
    description: 'AI video generation platform that creates and edits videos from text and image prompts.',
    stage: 'Series B',
    investors: ['Spark Capital', 'Lightspeed', 'Greycroft', 'Nat Friedman', 'Elad Gil', 'AGI House'],
    scores: { market: 5, team: 5, product: 5, gtm: 4, aiNative: 5 },
    lineaFit: false,
    source: 'AGI House',
  },

  // ── New companies from expanded portfolio research ─────────────────────────

  // Liquid 2 Ventures new entries
  {
    name: 'Medallion',
    website: 'https://medallion.co',
    description: 'AI-powered platform automating healthcare provider credentialing, enrollment, and compliance workflows.',
    stage: 'Series D',
    investors: ['Acrew Capital', 'Sequoia Capital'],
    scores: { market: 4, team: 4, product: 5, gtm: 3, aiNative: 4 },
    lineaFit: false,
    tooLate: true,
    lineaReason: 'True AGI replacing manual healthcare back-office work, AI-native from inception, but Series D stage is too late for Linea.',
    source: 'Liquid 2',
  },
  {
    name: 'Clipboard Health',
    website: 'https://www.clipboardhealth.com',
    description: 'Marketplace matching nurses and healthcare workers with shift openings at facilities, reducing staffing friction.',
    stage: 'Series C+',
    investors: ['Sequoia Capital', 'IVP'],
    scores: { market: 4, team: 3, product: 4, gtm: 4, aiNative: 2 },
    lineaFit: false,
    tooLate: true,
    lineaReason: 'Vertical staffing marketplace with strong unit economics, but Series C+ and not sufficiently AI-native.',
    source: 'Liquid 2',
  },

  // GTMfund new entries
  {
    name: 'BaseRock AI',
    website: 'https://www.baserock.ai',
    description: 'Agentic QA platform automating unit, integration, and functional testing for dev teams.',
    stage: 'Seed',
    investors: ['8VC', 'Correlation Ventures'],
    scores: { market: 4, team: 4, product: 4, gtm: 3, aiNative: 4 },
    lineaFit: true,
    lineaReason: 'Seed stage. Vertical AGI replacing QA knowledge workers; outcome-proxied via reduced time-to-release and 40% productivity gains.',
    source: 'GTMfund',
  },
  {
    name: 'Ona',
    website: 'https://ona.com',
    description: 'AI software engineer replacing developer tasks across repos with fully sandboxed cloud environment agents.',
    stage: 'Series A',
    investors: ['General Catalyst', 'Vertex Ventures'],
    scores: { market: 5, team: 4, product: 4, gtm: 3, aiNative: 4 },
    lineaFit: true,
    lineaReason: 'Series A. Vertical AGI for developers replacing core engineering tasks, AI-native agents, perfect thesis fit.',
    source: 'GTMfund',
  },

  // Commerce Ventures new entries
  {
    name: 'Gridspace',
    website: 'https://gridspace.com',
    description: 'Conversational AI voice agents for contact center automation and speech analytics.',
    stage: 'Series A',
    investors: ['Commerce Ventures', 'USAA Ventures'],
    scores: { market: 4, team: 4, product: 4, gtm: 3, aiNative: 5 },
    lineaFit: true,
    lineaReason: 'Series A. Agentic AI replacing human contact center agents, outcome-priced model, B2B vertical.',
    source: 'Commerce Ventures',
  },
  {
    name: 'Lendflow',
    website: 'https://www.lendflow.com',
    description: 'Embedded lending infrastructure platform with AI-driven automation for loan underwriting and approval.',
    stage: 'Series A',
    investors: ['Underscore VC', 'Frontier Ventures'],
    scores: { market: 4, team: 3, product: 4, gtm: 3, aiNative: 3 },
    lineaFit: true,
    lineaReason: 'Series A. Embedded finance infrastructure with AI automation; B2B SaaS platform replacing manual lending workflows.',
    source: 'Commerce Ventures',
  },

  // Swift Ventures new entries
  {
    name: 'Pickaxe',
    website: 'https://pickaxe.co',
    description: 'No-code AI agent builder for consultants and agencies to create, deploy, and monetize GPT-like tools.',
    stage: 'Seed',
    investors: ['Spero Ventures', 'Swift Ventures'],
    scores: { market: 3, team: 3, product: 4, gtm: 3, aiNative: 4 },
    lineaFit: true,
    lineaReason: 'Seed stage. B2B vertical positioning for consultants/agencies, outcome-adjacent via end-user monetization/subscription infrastructure.',
    source: 'Swift Ventures',
  },

  // ── MINIMAL DATA ENTRIES (name, stage if known, source) ────────────────────

  // Cambrian Ventures
  { name: 'Anatomy', website: 'https://anatomy.com', description: 'Medical education platform providing digital pathology and anatomy learning resources for healthcare professionals.', stage: 'Series A', investors: [], source: 'Cambrian Ventures' },
  { name: 'LightSpun', website: 'https://www.lightspun.com', description: 'AI-powered solar energy optimization platform for residential rooftop systems.', stage: 'Seed', investors: [], source: 'Cambrian Ventures' },
  { name: 'Oyster', website: 'https://www.oyster.com', description: 'Global payroll and HR platform for remote teams with integrated benefits and compliance.', stage: 'Series B', investors: [], source: 'Cambrian Ventures' },
  { name: 'Paid', website: 'https://paid.com', description: 'AI-powered invoicing and payment management platform for SMBs.', stage: '', investors: [], source: 'Cambrian Ventures' },

  // Commerce Ventures
  { name: 'ACQ', website: '', description: 'Pre-seed to Series A investment firm for tech founders', stage: 'Seed', investors: [], source: 'Commerce Ventures' },
  { name: 'Astrada', website: 'https://astrada.co', description: 'Data layer for autonomous finance providing real-time visibility on business spend through a single API', stage: 'Seed', investors: [], source: 'Commerce Ventures' },
  { name: 'Authentic Insurance', website: '', description: 'Captive insurance platform for SaaS communities', stage: 'Series A', investors: [], source: 'Commerce Ventures' },
  { name: 'Baton Systems', website: '', description: 'Post-trade clearing and settlement via blockchain', stage: 'Series A', investors: [], source: 'Commerce Ventures' },
  { name: 'Bill.com', website: 'https://bill.com', description: 'SMB accounts payable and receivable automation platform', stage: 'Public', investors: [], source: 'Commerce Ventures' },
  { name: 'BillGo', website: 'https://billgo.com', description: 'Real-time bill payment and subscription management platform for financial institutions and consumers', stage: 'Series C', investors: [], source: 'Commerce Ventures' },
  { name: 'Bloom', website: '', description: 'Growth-stage flexible capital for e-commerce businesses', stage: 'Series A', investors: [], source: 'Commerce Ventures' },
  { name: 'Bloom Credit', website: '', description: 'Credit data infrastructure and inclusive credit experiences', stage: 'Series A', investors: [], source: 'Commerce Ventures' },
  { name: 'Builder.io', website: 'https://www.builder.io', description: 'Design-to-code solutions and visual CMS with AI-powered copilot for frontend development', stage: 'Series B', investors: [], source: 'Commerce Ventures' },
  { name: 'Bumped', website: 'https://www.bumped.com', description: 'Stock rewards platform giving users fractional shares as shopping rewards', stage: 'Series A', investors: [], source: 'Commerce Ventures' },
  { name: 'Canary Technologies', website: '', description: 'Hotel guest management and digital operations platform', stage: 'Series D', investors: [], source: 'Commerce Ventures' },
  { name: 'Candex', website: '', description: 'Procurement and vendor management platform', stage: 'Series C', investors: [], source: 'Commerce Ventures' },
  { name: 'Card91', website: '', description: 'Payment issuance platform-as-a-service for cards', stage: 'Seed', investors: [], source: 'Commerce Ventures' },
  { name: 'Cardless', website: '', description: 'Embedded credit card platform for co-branded cards', stage: 'Series C', investors: [], source: 'Commerce Ventures' },
  { name: 'CardNow', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Carefull', website: '', description: 'AI fraud prevention platform for senior citizens', stage: 'Series A', investors: [], source: 'Commerce Ventures' },
  { name: 'Casap', website: '', description: 'AI-powered dispute resolution and chargeback automation', stage: 'Series A', investors: [], source: 'Commerce Ventures' },
  { name: 'Clara', website: '', description: 'Latin American corporate spend management and payments', stage: 'Series B', investors: [], source: 'Commerce Ventures' },
  { name: 'Class8', website: '', description: 'AI fleet optimization and load matching for trucking', stage: 'Series A', investors: [], source: 'Commerce Ventures' },
  { name: 'ClickSwitch', website: '', description: 'Digital account switching platform for financial institutions', stage: 'Acquired', investors: [], source: 'Commerce Ventures' },
  { name: 'CNote', website: '', description: 'ESG impact investing platform for underserved communities', stage: 'Series A', investors: [], source: 'Commerce Ventures' },
  { name: 'Constrafor', website: '', description: 'Construction finance and procurement automation', stage: 'Series A', investors: [], source: 'Commerce Ventures' },
  { name: 'ControlHub', website: '', description: 'Procurement automation and spend management software', stage: 'Seed', investors: [], source: 'Commerce Ventures' },
  { name: 'Covr', website: '', description: 'Digital life insurance with white-label software', stage: 'Series B', investors: [], source: 'Commerce Ventures' },
  { name: 'Cylindo', website: '', description: '3D product visualization platform (acquired by Chaos)', stage: 'Acquired', investors: [], source: 'Commerce Ventures' },
  { name: 'Duplo', website: '', description: 'B2B payments and expense management for Nigeria', stage: 'Seed', investors: [], source: 'Commerce Ventures' },
  { name: 'EnFi', website: '', description: 'AI credit analysis agents for commercial lending', stage: 'Series A', investors: [], source: 'Commerce Ventures' },
  { name: 'Estimote', website: '', description: 'Indoor location tracking and asset tracking IoT', stage: 'Series A', investors: [], source: 'Commerce Ventures' },
  { name: 'Extend', website: '', description: 'Virtual card and expense management platform', stage: 'Series B', investors: [], source: 'Commerce Ventures' },
  { name: 'FI Navigator', website: '', description: 'Financial institution data analytics and peer research', stage: 'Series B', investors: [], source: 'Commerce Ventures' },
  { name: 'Finaloop', website: '', description: 'Real-time ecommerce accounting and bookkeeping platform', stage: 'Series A', investors: [], source: 'Commerce Ventures' },
  { name: 'Flextract', website: '', description: 'AI-driven financial document data extraction platform', stage: 'Pre-Seed', investors: [], source: 'Commerce Ventures' },
  { name: 'Flipside Crypto', website: '', description: 'Crypto analytics and intelligence platform', stage: 'Series A', investors: [], source: 'Commerce Ventures' },
  { name: 'Flueid', website: '', description: 'Real estate title verification and insurability platform', stage: 'Series B', investors: [], source: 'Commerce Ventures' },
  { name: 'Fountain', website: '', description: 'Web3 access management and talent hiring platform', stage: 'Seed', investors: [], source: 'Commerce Ventures' },
  { name: 'FWD', website: '', description: 'Pan-Asian life and health insurance provider', stage: 'Public', investors: [], source: 'Commerce Ventures' },
  { name: 'Greenboard', website: '', description: 'AI-native financial compliance and operations platform', stage: 'Series A', investors: [], source: 'Commerce Ventures' },
  { name: 'GrowCredit', website: '', description: 'Credit building through subscription payment reporting', stage: 'Series A', investors: [], source: 'Commerce Ventures' },
  { name: 'Hamsa', website: '', description: 'Unified ledger and tokenization infrastructure platform', stage: 'Series A', investors: [], source: 'Commerce Ventures' },
  { name: 'Harvest', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'HMB', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Instock', website: '', description: 'E-commerce fulfillment automation with robotics', stage: 'Seed', investors: [], source: 'Commerce Ventures' },
  { name: 'Interchecks', website: '', description: 'B2B2C instant payments and payout infrastructure', stage: 'Series B', investors: [], source: 'Commerce Ventures' },
  { name: 'Inter-Stellar', website: '', description: 'Blockchain-based international payments infrastructure', stage: 'Series A', investors: [], source: 'Commerce Ventures' },
  { name: 'Knight FinTech', website: '', description: 'Digital lending platform for banks and NBFCs', stage: 'Series A', investors: [], source: 'Commerce Ventures' },
  { name: 'Ledgible', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Liberate', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Linqia', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Love Local', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'M10', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Marpipe', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Me&U', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Mishipay', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Monark Markets', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Mulberry', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Neural Payments', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Ovation CXM', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'PayAmigo', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Paystand', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Pensa', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Pesto', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Portless', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Precision GX', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Prime Trust', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Purple Dot', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Qualtik', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Quest Analytics', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Radius', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Rally', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Resolve Pay', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'RetailNext', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Saving Star', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Session', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Simon Data', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Snapsheet', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Steady App', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Tabs', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Theatro', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Treinta', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Tulip', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Unison', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Updater', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Vitable Health', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Volition Beauty', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Weather Promise', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },
  { name: 'Zentist', website: '', description: '', stage: '', investors: [], source: 'Commerce Ventures' },

  // Graph Ventures
  { name: 'Abhi', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Aperture Data', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Applied Carbon', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'BigBox', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Bizzy', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Blue Apron', website: 'https://www.blueapron.com', description: 'Meal kit delivery service providing pre-portioned ingredients and recipes for home cooking', stage: 'Public', investors: [], source: 'Graph Ventures' },
  { name: 'Circuit and Chisel', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Clearspace', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Clubhouse', website: 'https://www.clubhouse.com', description: 'Audio social networking platform for live conversations and events', stage: 'Series B', investors: [], source: 'Graph Ventures' },
  { name: 'Cube Exchange', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Cut and Dry', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Dapper Labs', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Disclo', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Dub', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Enjoei', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Fakespot', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Finesse', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Formally', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Hang', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Hashdex', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Helpful', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Hinge', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Hoodline', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Houseparty', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Hydra', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Ipsy', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Kelvin', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Keyway', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Kinara', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Koltin', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Lava', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Lever', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'LingoKids', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Loft', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Matchday', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Meliuz', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Metadata', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'MileIQ', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'NAS Academy', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Nayapay', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Neuroclues', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Niche', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Opencare', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Papaya Payments', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Particle', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'PicsArt', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Pillar', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Pomelo', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Porch', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Quinto Andar', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Regent', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Returnly', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'RideOS', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'SageCare', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Saildrone', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Sailplan', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Scan', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Scenario', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'School AI', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Serve Robotics', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Skyroot', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Somos Internet', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Spell', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Sway', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Tavrn', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Very Good Security', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'VivaReal', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Wirestock', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'XY AI Labs', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Yummy', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Zeplin', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },
  { name: 'Ziina', website: '', description: '', stage: '', investors: [], source: 'Graph Ventures' },

  // GTMfund
  { name: 'Alt', website: 'https://www.alt.xyz', description: 'Sports trading card marketplace for buying, selling, and securely storing authenticated trading cards', stage: 'Series B', investors: [], source: 'GTMfund' },
  { name: 'Altostra', website: 'https://www.altostra.com', description: 'Cloud infrastructure design and deployment platform using preferred language and templates', stage: 'Seed', investors: [], source: 'GTMfund' },
  { name: 'Amper', website: '', description: 'AI-powered acoustic environment intelligence and monitoring platform', stage: 'Series A', investors: [], source: 'GTMfund' },
  { name: 'Armada', website: '', description: 'Computing infrastructure for AI processing, connectivity, and data management in remote environments', stage: 'Series B', investors: [], source: 'GTMfund' },
  { name: 'Arrows', website: 'https://arrows.to', description: 'Collaborative onboarding checklist for high-touch customer success', stage: 'Series A', investors: [], source: 'GTMfund' },
  { name: 'Atlan', website: 'https://atlan.com', description: 'Modern data collaboration workspace for governance and discovery', stage: 'Series C', investors: [], source: 'GTMfund' },
  { name: 'Avarra', website: '', description: '', stage: '', investors: [], source: 'GTMfund' },
  { name: 'BlockSpaces', website: '', description: '', stage: '', investors: [], source: 'GTMfund' },
  { name: 'BlueCargo', website: '', description: '', stage: '', investors: [], source: 'GTMfund' },
  { name: 'BurnRate', website: '', description: '', stage: '', investors: [], source: 'GTMfund' },
  { name: 'Cabal', website: '', description: '', stage: '', investors: [], source: 'GTMfund' },
  { name: 'CaptivateIQ', website: '', description: '', stage: '', investors: [], source: 'GTMfund' },
  { name: 'Catalyst', website: '', description: '', stage: '', investors: [], source: 'GTMfund' },
  { name: 'Channel99', website: '', description: '', stage: '', investors: [], source: 'GTMfund' },
  { name: 'Charma', website: '', description: '', stage: '', investors: [], source: 'GTMfund' },
  { name: 'Clarisights', website: '', description: '', stage: '', investors: [], source: 'GTMfund' },
  { name: 'CloseFactor', website: 'https://closefactor.com', description: 'GTM operating system for revenue teams automating sales processes', stage: 'Series A', investors: [], source: 'GTMfund' },
  { name: 'Closinglock', website: 'https://www.closinglock.com', description: 'Secure platform for protecting and streamlining real estate closing transactions', stage: 'Series B', investors: [], source: 'GTMfund' },
  { name: 'Coffee', website: '', description: '', stage: '', investors: [], source: 'GTMfund' },
  { name: 'Continual', website: '', description: 'AI/data warehouse platform for machine learning and data operations', stage: 'Series A', investors: [], source: 'GTMfund' },
  { name: 'ControlRooms', website: 'https://controlrooms.ai', description: 'AI-assisted troubleshooting solutions for heavy industries', stage: 'Series A', investors: [], source: 'GTMfund' },
  { name: 'Cube', website: '', description: 'Spreadsheet-native FP&A platform for financial planning and analysis', stage: 'Series B', investors: [], source: 'GTMfund' },
  { name: 'Demostack', website: 'https://www.demostack.com', description: 'SaaS demo platform for creating, delivering, and analyzing customer demos', stage: 'Series B', investors: [], source: 'GTMfund' },
  { name: 'Document Crunch', website: 'https://www.documentcrunch.com', description: 'AI-powered document compliance platform for construction', stage: 'Series B', investors: [], source: 'GTMfund' },
  { name: 'Equi', website: 'https://www.equi.com', description: 'SEC-registered investment advisor for absolute return investment vehicles', stage: 'Series A', investors: [], source: 'GTMfund' },
  { name: 'Esper', website: '', description: 'Cloud-based application deployment and device management platform', stage: 'Series C', investors: [], source: 'GTMfund' },
  { name: 'ethos', website: 'https://www.ethos.com', description: 'Life insurance technology platform making coverage affordable and accessible', stage: 'Public', investors: [], source: 'GTMfund' },
  { name: 'Fastbreak', website: '', description: 'AI-driven sports operations software for scheduling and competition management', stage: 'Series A', investors: [], source: 'GTMfund' },
  { name: 'Fireside', website: '', description: 'Podcasting platform for live audio conversations between creators and audiences', stage: 'Series A', investors: [], source: 'GTMfund' },
  { name: 'Fleet', website: '', description: 'Mobility-as-a-Service software for enterprise transportation', stage: 'Seed', investors: [], source: 'GTMfund' },
  { name: 'Gaiia', website: 'https://gaiia.com', description: 'AI-native operating system for Communications Service Providers', stage: 'Series B', investors: [], source: 'GTMfund' },
  { name: 'Gantry.io', website: 'https://gantry.io', description: 'Tools for managing machine learning systems and monitoring', stage: 'Seed', investors: [], source: 'GTMfund' },
  { name: 'Gitpod', website: 'https://gitpod.io', description: 'Cloud development environments for collaborative coding', stage: 'Series A', investors: [], source: 'GTMfund' },
  { name: 'Groundswell', website: 'https://www.groundswell.io', description: 'All-in-one CSR platform for corporate social responsibility and giving', stage: 'Seed', investors: [], source: 'GTMfund' },
  { name: 'GrowerIQ', website: '', description: 'Cannabis seed-to-sale tracking platform integrating facility systems', stage: 'Seed', investors: [], source: 'GTMfund' },
  { name: 'Houseware', website: '', description: 'SaaS revenue optimization platform using data insights', stage: 'Seed', investors: [], source: 'GTMfund' },
  { name: 'Iconic Air', website: 'https://www.iconicair.io', description: 'Carbon accounting platform for energy-intensive industries', stage: 'Seed', investors: [], source: 'GTMfund' },
  { name: 'iLife', website: 'https://ilife.tech', description: 'Life insurance selling and buying platform for intermediaries', stage: 'Series A', investors: [], source: 'GTMfund' },
  { name: 'Involve', website: 'https://involve.me', description: 'Funnel builder for converting online visitors into qualified leads', stage: 'Seed', investors: [], source: 'GTMfund' },
  { name: 'Journey', website: '', description: 'Mental health platform supporting users in managing well-being', stage: 'Series A', investors: [], source: 'GTMfund' },
  { name: 'Kibsi', website: '', description: 'No-code computer vision platform for building AI applications', stage: 'Seed', investors: [], source: 'GTMfund' },
  { name: 'Lang.ai', website: 'https://lang.ai', description: 'Language understanding platform automating tagging for support conversations', stage: 'Series A', investors: [], source: 'GTMfund' },
  { name: 'LexCheck', website: 'https://lexcheck.com', description: 'Contract analytics software for automated contract review', stage: 'Series A', investors: [], source: 'GTMfund' },
  { name: 'LightUp', website: '', description: 'Data quality platform detecting erroneous or out-of-date data', stage: 'Series A', investors: [], source: 'GTMfund' },
  { name: 'LUK', website: 'https://www.luk.org', description: 'Fintech-enabled B2B marketplace for the creative industry', stage: 'Post-Seed', investors: [], source: 'GTMfund' },
  { name: 'Magic', website: 'https://magic.dev', description: 'Generative AI coding platform for software development automation', stage: 'Series B', investors: [], source: 'GTMfund' },
  { name: 'Magical', website: 'https://www.getmagical.com', description: 'Agentic AI platform automating complex workflows in one week', stage: 'Series A', investors: [], source: 'GTMfund' },
  { name: 'Maker.ai', website: '', description: 'AI content generation platform creating written and visual content at scale', stage: 'Series A', investors: [], source: 'GTMfund' },
  { name: 'Mathison', website: '', description: 'Online job board platform for diversity hiring', stage: 'Series A', investors: [], source: 'GTMfund' },
  { name: 'Matik', website: '', description: 'Platform generating personalized customer presentations with customized data', stage: 'Series A', investors: [], source: 'GTMfund' },
  { name: 'MonetizeNow', website: 'https://monetizenow.io', description: 'Rules engine and interface for managing subscriptions and usage-based pricing', stage: 'Seed', investors: [], source: 'GTMfund' },
  { name: 'Noibu', website: 'https://noibu.com', description: 'Platform detecting issues in web and mobile applications to improve customer experience', stage: 'Seed', investors: [], source: 'GTMfund' },
  { name: 'Obvio', website: '', description: 'AI-powered traffic safety solution using solar-powered monitoring cameras', stage: 'Series A', investors: [], source: 'GTMfund' },
  { name: 'Owner', website: '', description: '', stage: '', investors: [], source: 'GTMfund' },
  { name: 'OwnID', website: '', description: 'Passwordless authentication using biometrics for FaceID and TouchID', stage: 'Seed', investors: [], source: 'GTMfund' },
  { name: 'Particl', website: 'https://particl.com', description: 'Competitor insights platform for e-commerce optimization', stage: 'Series A', investors: [], source: 'GTMfund' },
  { name: 'Patch', website: '', description: 'Climate tech infrastructure platform for carbon removal and offsetting', stage: 'Series B', investors: [], source: 'GTMfund' },
  { name: 'PepperContent', website: 'https://www.peppercontent.io', description: 'AI-powered content creation and marketing solution', stage: 'Series A', investors: [], source: 'GTMfund' },
  { name: 'Primer', website: '', description: 'AI-based text summarization and contextualization software', stage: 'Series D', investors: [], source: 'GTMfund' },
  { name: 'Privacy Dynamics', website: '', description: 'Data anonymization and de-identification tool for safe data access', stage: 'Seed', investors: [], source: 'GTMfund' },
  { name: 'Regrello', website: 'https://www.regrello.com', description: 'Workflow automation and debugging platform for teams', stage: 'Series A', investors: [], source: 'GTMfund' },
  { name: 'RepVue', website: 'https://www.repvue.com', description: 'Crowdsourced ratings and career development platform for sales professionals', stage: 'Seed', investors: [], source: 'GTMfund' },
  { name: 'Revefi', website: 'https://www.revefi.com', description: 'AI data engineering company for maximizing ROI from data warehouse tools', stage: 'Series A', investors: [], source: 'GTMfund' },
  { name: 'Roam', website: '', description: 'Virtual collaboration platform for distributed work environments', stage: 'Series A', investors: [], source: 'GTMfund' },
  { name: 'SecurityPal', website: '', description: 'Assurance Management Platform automating and scaling trust with AI agents', stage: 'Series A', investors: [], source: 'GTMfund' },
  { name: 'Seso', website: 'https://sesolabor.com', description: 'AI-powered workforce platform for the agriculture industry', stage: 'Series A', investors: [], source: 'GTMfund' },
  { name: 'Simplified', website: '', description: 'All-in-one AI-powered app for design, video editing, copywriting, and social media', stage: 'Seed', investors: [], source: 'GTMfund' },
  { name: 'Sofy', website: 'https://sofy.ai', description: 'No-code test automation platform for end-to-end mobile app testing', stage: 'Seed', investors: [], source: 'GTMfund' },
  { name: 'Sora', website: '', description: 'Low-code intelligent workflow automation and data integration tool', stage: 'Seed', investors: [], source: 'GTMfund' },
  { name: 'Stotles', website: 'https://www.stotles.com', description: 'Cloud-based platform for procurement management and government contract sourcing', stage: 'Series A', investors: [], source: 'GTMfund' },
  { name: 'Tactic', website: '', description: 'Cryptocurrency accounting software for tracking digital assets', stage: 'Series Seed', investors: [], source: 'GTMfund' },
  { name: 'TestBox', website: 'https://www.testbox.com', description: 'AI-powered demo environment creation platform for software sales', stage: 'Series B', investors: [], source: 'GTMfund' },
  { name: 'Trustlayer', website: 'https://www.trustlayer.io', description: 'Automating insurance verification with machine learning and AI', stage: 'Series A', investors: [], source: 'GTMfund' },
  { name: 'Trustpage', website: '', description: 'AI-assisted trust centers for sharing security and privacy information', stage: 'Seed', investors: [], source: 'GTMfund' },
  { name: 'Tuvis', website: 'https://tuvis.com', description: 'Enterprise instant messaging platform for secure and compliant communication', stage: 'Series B', investors: [], source: 'GTMfund' },
  { name: 'Village', website: 'https://www.villageglobal.com', description: 'Early-stage venture capital firm investing in pre-seed and seed startups', stage: 'VC Firm', investors: [], source: 'GTMfund' },
  { name: 'Vividly', website: '', description: 'Trade promotion management platform for consumer-packaged goods optimization', stage: 'Series B', investors: [], source: 'GTMfund' },

  // Liquid 2
  { name: 'Airbyte', website: 'https://airbyte.com', description: 'Data integration platform for moving data between sources and destinations', stage: 'Series B', investors: [], source: 'Liquid 2' },
  { name: 'Astra', website: '', description: 'Aerospace company developing fully reusable satellite launch vehicles', stage: 'Series C', investors: [], source: 'Liquid 2' },
  { name: 'Bearflag', website: '', description: 'AgTech robotics platform for autonomous agricultural equipment', stage: 'Seed', investors: [], source: 'Liquid 2' },
  { name: 'Blockdaemon', website: '', description: 'Institutional gateway to Web3 securing digital assets for exchanges and custodians', stage: 'Series C', investors: [], source: 'Liquid 2' },
  { name: 'Brat', website: '', description: 'Digital production company creating video content for Gen Z audiences', stage: 'Series B', investors: [], source: 'Liquid 2' },
  { name: 'Cloud9', website: '', description: 'Professional esports organization for multi-game competition and events', stage: 'Series B', investors: [], source: 'Liquid 2' },
  { name: 'Enode', website: '', description: 'API platform enabling connection of energy devices for smart energy management', stage: 'Series A', investors: [], source: 'Liquid 2' },
  { name: 'GitLab', website: 'https://gitlab.com', description: 'DevOps platform for source code management, CI/CD, and collaboration', stage: 'Public', investors: [], source: 'Liquid 2' },
  { name: 'Handle', website: '', description: '', stage: '', investors: [], source: 'Liquid 2' },
  { name: 'Human Interest', website: 'https://humaninterest.com', description: '401(k) provider for small and medium-sized businesses', stage: 'Series E', investors: [], source: 'Liquid 2' },
  { name: 'Instawork', website: 'https://www.instawork.com', description: 'On-demand staffing platform connecting gig workers with hospitality businesses', stage: 'Series D', investors: [], source: 'Liquid 2' },
  { name: 'Modern Treasury', website: 'https://www.moderntreasury.com', description: 'Payment operations platform for simplifying business payments', stage: 'Series C', investors: [], source: 'Liquid 2' },
  { name: 'Newfront', website: 'https://newfront.com', description: 'Insurance broker platform using AI for coverage optimization', stage: 'Series D', investors: [], source: 'Liquid 2' },
  { name: 'Noya', website: '', description: 'Carbon capture and climate tech company', stage: 'Series A', investors: [], source: 'Liquid 2' },
  { name: 'Photoroom', website: 'https://photoroom.com', description: 'AI image editor for product photography and visual content creation', stage: 'Series B', investors: [], source: 'Liquid 2' },
  { name: 'Rappi', website: 'https://rappi.com', description: 'On-demand delivery and e-commerce platform for meals, groceries, and goods', stage: 'Series F', investors: [], source: 'Liquid 2' },
  { name: 'Remote', website: 'https://remote.com', description: 'Employment, payroll, and HR platform for distributed businesses', stage: 'Series C', investors: [], source: 'Liquid 2' },
  { name: 'Retool', website: 'https://retool.com', description: 'Low-code platform for building internal tools and dashboards', stage: 'Series C', investors: [], source: 'Liquid 2' },
  { name: 'Solugen', website: 'https://solugen.com', description: 'Sustainable chemical manufacturing using AI and automation', stage: 'Series D', investors: [], source: 'Liquid 2' },
  { name: 'Stoke Space', website: 'https://www.stokespace.com', description: 'Aerospace company developing fully reusable Nova launch vehicle', stage: 'Series D', investors: [], source: 'Liquid 2' },
  { name: 'Vetcove', website: 'https://vetcove.com', description: 'B2B veterinary marketplace for supply comparison and purchasing', stage: 'Series B', investors: [], source: 'Liquid 2' },
  { name: 'Whatnot', website: 'https://whatnot.com', description: 'Livestream shopping platform for buying and selling collectibles', stage: 'Series F', investors: [], source: 'Liquid 2' },

  // Seven Stars
  { name: 'AIUC', website: 'https://aiuc.com', description: 'AI agent certification and insurance platform combining audits, standards, and coverage for enterprise AI adoption.', stage: 'Seed', investors: [], source: 'Seven Stars' },
  { name: 'Dialogue AI', website: 'https://dialogueai.com', description: 'AI-native market research platform with live conversational AI interviewer for enterprise research.', stage: 'Seed', investors: [], source: 'Seven Stars' },
  { name: 'Longeye', website: 'https://www.longeye.com', description: 'AI-powered investigation platform for law enforcement that analyzes digital evidence at scale.', stage: 'Seed', investors: [], source: 'Seven Stars' },
  { name: 'Origin Lab', website: 'https://www.originlab.com', description: 'Scientific graphing and data analysis software for researchers and engineers.', stage: '', investors: [], source: 'Seven Stars' },
  { name: 'Pomo', website: 'https://pomo.ai', description: 'AI marketing intelligence platform automating decision-dense marketing functions and campaign execution.', stage: 'Seed', investors: [], source: 'Seven Stars' },
  { name: 'Sage Care', website: 'https://www.sage.care', description: 'AI-powered care navigation system providing intelligent triage and specialist matching for healthcare.', stage: 'Seed', investors: [], source: 'Seven Stars' },
  { name: 'Voya Energy', website: 'https://www.voya.energy', description: 'Metal fuel technology company converting recycled metals into clean, distributed energy without grid dependence.', stage: 'Seed', investors: [], source: 'Seven Stars' },

  // Sugar Free Capital
  { name: 'Avibra', website: 'https://www.avibra.com', description: 'Benefits, perks and rewards platform for hourly and part-time workers providing financial, insurance, and wellness benefits.', stage: 'Series B', investors: [], source: 'Sugar Free Capital' },
  { name: 'CreativeMode', website: 'https://creativemode.co', description: 'No-code platform for creating Minecraft mods using AI.', stage: 'Seed', investors: [], source: 'Sugar Free Capital' },
  { name: 'Curbio', website: 'https://curbio.com', description: 'Pre-sale home renovation platform with fix-now, pay-at-closing model for real estate agents.', stage: 'Series B', investors: [], source: 'Sugar Free Capital' },
  { name: 'Deepnight', website: 'https://deepnight.com', description: 'AI-powered digital night vision technology for autonomous vehicles, surveillance, and defense.', stage: 'Seed', investors: [], source: 'Sugar Free Capital' },
  { name: 'Juno', website: 'https://www.yourjuno.co', description: 'Financial education app for women and non-binary individuals teaching personal finance and investment strategies.', stage: 'Seed', investors: [], source: 'Sugar Free Capital' },
  { name: 'Nurx', website: 'https://www.nurx.com', description: 'Telemedicine platform providing birth control, sexual health, mental health, and weight loss services online.', stage: 'Series C', investors: [], source: 'Sugar Free Capital' },
  { name: 'OfferUp', website: 'https://offerup.com', description: 'Mobile-first C2C marketplace for buying and selling used goods locally.', stage: '', investors: [], source: 'Sugar Free Capital' },
  { name: 'Papa', website: 'https://www.papa.com', description: 'On-demand companion care platform connecting seniors with caregivers for social support and light assistance.', stage: '', investors: [], source: 'Sugar Free Capital' },
  { name: 'SevenRooms', website: 'https://sevenrooms.com', description: 'Hospitality CRM and operations platform for restaurants and hotels managing reservations, marketing, and guest experiences.', stage: '', investors: [], source: 'Sugar Free Capital' },
  { name: 'Smarty', website: 'https://www.smarty.com', description: 'Address verification and validation APIs for USPS and international addresses.', stage: '', investors: [], source: 'Sugar Free Capital' },

  // Swift Ventures
  { name: 'Ambidextrous', website: 'https://ambidextrous.ai', description: 'AI agent platform for creating custom business automation workflows.', stage: '', investors: [], source: 'Swift Ventures' },
  { name: 'Bluefish', website: 'https://bluefish.com', description: 'Computer vision platform for industrial inspection and quality assurance.', stage: '', investors: [], source: 'Swift Ventures' },
  { name: 'BranchLab', website: 'https://branchlab.io', description: 'AI platform for analyzing customer data and generating automated business insights.', stage: 'Seed', investors: [], source: 'Swift Ventures' },
  { name: 'Capsule', website: 'https://capsule.com', description: 'CRM platform for sales teams with AI-powered lead scoring and engagement.', stage: '', investors: [], source: 'Swift Ventures' },
  { name: 'Coval', website: 'https://coval.so', description: 'Code generation and testing platform powered by AI for software development.', stage: '', investors: [], source: 'Swift Ventures' },
  { name: 'Deepdub', website: 'https://deepdub.ai', description: 'AI dubbing and localization platform preserving original actor voices across 65+ languages.', stage: 'Series A', investors: [], source: 'Swift Ventures' },
  { name: 'Donobu', website: 'https://donobu.jp', description: 'Japanese AI assistant and chatbot platform for business automation.', stage: '', investors: [], source: 'Swift Ventures' },
  { name: 'Eko', website: 'https://www.ekohealth.com', description: 'Digital therapeutics platform using AI for personalized health coaching.', stage: '', investors: [], source: 'Swift Ventures' },
  { name: 'Entrupy', website: 'https://entrupy.com', description: 'AI-powered authentication platform for detecting counterfeit luxury goods.', stage: 'Series B', investors: [], source: 'Swift Ventures' },
  { name: 'Estuary', website: 'https://estuary.dev', description: 'Data integration and streaming platform for real-time data pipelines.', stage: 'Series B', investors: [], source: 'Swift Ventures' },
  { name: 'Green Zuru', website: 'https://www.greenzuru.com', description: 'Sustainable materials marketplace connecting suppliers with eco-friendly product manufacturers.', stage: '', investors: [], source: 'Swift Ventures' },
  { name: 'Hipp Health', website: 'https://hiphealth.com', description: 'Mental health platform offering therapy and psychiatric services via telehealth.', stage: '', investors: [], source: 'Swift Ventures' },
  { name: 'Hone', website: 'https://honehq.com', description: 'Sales training and coaching platform using AI for personalized learning.', stage: '', investors: [], source: 'Swift Ventures' },
  { name: 'Human Signal', website: 'https://humansignal.com', description: 'Data labeling and annotation platform for ML training with human feedback loop.', stage: 'Series A', investors: [], source: 'Swift Ventures' },
  { name: 'Jacobi', website: 'https://jacobi.ai', description: 'AI agent platform for customer service and support automation.', stage: '', investors: [], source: 'Swift Ventures' },
  { name: 'LanceDB', website: 'https://lancedb.com', description: 'Vector database optimized for AI and machine learning applications.', stage: 'Seed', investors: [], source: 'Swift Ventures' },
  { name: 'Latch Bio', website: 'https://latchbio.com', description: 'Bioinformatics platform for genomic data analysis and molecular biology research.', stage: 'Series A', investors: [], source: 'Swift Ventures' },
  { name: 'Metal', website: 'https://www.metal.com', description: 'Infrastructure platform for AI and ML operations at scale.', stage: '', investors: [], source: 'Swift Ventures' },
  { name: 'Mindee', website: 'https://mindee.com', description: 'Document parsing and data extraction platform powered by computer vision and AI.', stage: 'Series A', investors: [], source: 'Swift Ventures' },
  { name: 'Retrorate', website: 'https://retrorate.com', description: 'Retroactive pricing and revenue optimization platform for SaaS companies.', stage: '', investors: [], source: 'Swift Ventures' },
  { name: 'Rill', website: 'https://rilldata.com', description: 'Modern BI and metrics platform with natural language interface and AI agents.', stage: 'Series A', investors: [], source: 'Swift Ventures' },
  { name: 'Sidekick', website: 'https://sidekickapp.com', description: 'AI personal assistant and knowledge management platform for teams.', stage: '', investors: [], source: 'Swift Ventures' },
  { name: 'Sieve', website: 'https://sieve.ai', description: 'AI video processing and manipulation APIs for developers.', stage: 'Seed', investors: [], source: 'Swift Ventures' },
  { name: 'Superhuman', website: 'https://superhuman.com', description: 'AI-powered email client designed for speed and productivity.', stage: 'Series B', investors: [], source: 'Swift Ventures' },
  { name: 'Tubi TV', website: 'https://tubitv.com', description: 'Free ad-supported streaming service with AI-powered content recommendations.', stage: '', investors: [], source: 'Swift Ventures' },
  { name: 'Two Fifty Seven', website: 'https://257.ai', description: 'AI-powered enterprise software and workflow automation platform.', stage: '', investors: [], source: 'Swift Ventures' },
  { name: 'Universal AGI', website: 'https://universalagi.com', description: 'AI research and development company focused on artificial general intelligence.', stage: '', investors: [], source: 'Swift Ventures' },
  { name: 'Wetravel', website: 'https://wetravelhq.com', description: 'Travel platform with AI-powered itinerary planning and booking.', stage: '', investors: [], source: 'Swift Ventures' },
  { name: 'Wingspan', website: 'https://wingspan.app', description: 'Payroll and HR platform for freelancers and contractors.', stage: 'Series B', investors: [], source: 'Swift Ventures' },

  // The Aligned Fund
  { name: 'Joyful Health', website: 'https://www.joyfulhealth.com', description: 'AI-powered healthcare revenue recovery platform helping providers recover unpaid insurance claims.', stage: 'Series A', investors: [], source: 'The Aligned Fund' },

  // Umami Capital
  { name: 'Deel', website: 'https://deel.com', description: '', stage: 'Late Stage', investors: [], source: 'Umami Capital' },
  { name: 'Discord', website: 'https://discord.com', description: '', stage: 'Late Stage', investors: [], source: 'Umami Capital' },
  { name: 'SpaceX', website: 'https://spacex.com', description: '', stage: 'Late Stage', investors: [], source: 'Umami Capital' },

  // AGI House
];

// ─── UI helpers ──────────────────────────────────────────────────────────────

function ScoreDot({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${i < value ? 'bg-white/70' : 'bg-white/15'}`}
        />
      ))}
    </div>
  );
}

function ScoreRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-white/40 text-xs w-16 shrink-0">{label}</span>
      <ScoreDot value={value} />
    </div>
  );
}

function CompanyCard({ company }: { company: Company }) {
  const borderClass = company.lineaFit
    ? 'border-emerald-500/30 bg-emerald-950/20'
    : company.tooLate
    ? 'border-amber-500/15 bg-white/[0.02]'
    : 'border-white/10 bg-white/[0.03]';

  return (
    <div className={`relative rounded-lg border p-5 flex flex-col gap-4 transition-colors ${borderClass}`}>
      {/* Badge */}
      {company.lineaFit && (
        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-400/80 bg-emerald-900/40 border border-emerald-500/20 rounded-full px-2 py-0.5">
            Linea Fit
          </span>
        </div>
      )}
      {company.tooLate && (
        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-bold tracking-widest uppercase text-amber-400/60 bg-amber-900/20 border border-amber-500/15 rounded-full px-2 py-0.5">
            Too Late
          </span>
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-start gap-2 pr-16">
          {company.website ? (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-bold text-base hover:text-white/80 transition-colors"
            >
              {company.name} ↗
            </a>
          ) : (
            <span className="text-white font-bold text-base">{company.name}</span>
          )}
        </div>
        {company.description && (
          <p className="text-white/50 text-sm leading-relaxed mt-1">{company.description}</p>
        )}
      </div>

      {/* Stage + Source VC + Investors */}
      <div className="flex flex-col gap-1.5">
        {company.stage && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-widest uppercase text-white/30">Stage</span>
            <span className="text-xs text-white/60 bg-white/8 border border-white/10 rounded px-2 py-0.5">{company.stage}</span>
          </div>
        )}
        {/* Always show source VC firm + other investors */}
        <div className="flex flex-wrap gap-1">
          <span key="source" className="text-[11px] text-white/40 bg-white/10 border border-white/15 rounded px-1.5 py-0.5 font-medium">
            {company.source}
          </span>
          {company.investors.map((inv) => (
            <span key={inv} className="text-[11px] text-white/30 bg-white/5 border border-white/8 rounded px-1.5 py-0.5">
              {inv}
            </span>
          ))}
        </div>
      </div>

      {/* Scores */}
      {company.scores && (
        <div className="flex flex-col gap-1.5 pt-1 border-t border-white/8">
          <ScoreRow label="Market" value={company.scores.market} />
          <ScoreRow label="Team" value={company.scores.team} />
          <ScoreRow label="Product" value={company.scores.product} />
          <ScoreRow label="GTM" value={company.scores.gtm} />
          <ScoreRow label="AI-Native" value={company.scores.aiNative} />
        </div>
      )}

      {/* Reason note */}
      {company.lineaFit && company.lineaReason && (
        <div className="border-t border-emerald-500/15 pt-3">
          <p className="text-emerald-400/70 text-xs leading-relaxed italic">{company.lineaReason}</p>
        </div>
      )}
      {company.tooLate && company.lineaReason && (
        <div className="border-t border-amber-500/10 pt-3">
          <p className="text-amber-400/50 text-xs leading-relaxed italic">{company.lineaReason}</p>
        </div>
      )}
    </div>
  );
}

const ALL_SOURCES = ['All', ...Array.from(new Set(companies.map((c) => c.source)))];

export default function PortfolioCompanies() {
  const location = useLocation();
  const [filter, setFilter] = useState<'all' | 'fit' | 'late'>('all');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [stageFilter, setStageFilter] = useState('All');

  // Pre-filter by ?source= query param (set when navigating from Network page)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const src = params.get('source');
    if (src && companies.map(c => c.source).includes(src)) {
      setSourceFilter(src);
    }
  }, [location.search]);

  // Normalize stages: Seed/Series Seed → Seed, Public/Late Stage → Public
  const normalizeStage = (stage: string): string => {
    if (!stage) return '';
    const lower = stage.toLowerCase();
    if (lower === 'seed' || lower === 'series seed' || lower === 'pre-seed') return 'Seed';
    if (lower === 'public' || lower === 'late stage') return 'Public';
    return stage;
  };

  // Get all unique normalized stages from companies
  const allStages = Array.from(
    new Set(companies.map(c => normalizeStage(c.stage)).filter(Boolean))
  ).sort((a, b) => {
    const order = ['Seed', 'Series A', 'Series B', 'Series C', 'Series D', 'Series E', 'Series F', 'Growth Stage', 'Public', 'VC Firm', 'Post-Seed'];
    return order.indexOf(a) - order.indexOf(b);
  });

  const visible = companies.filter((c) => {
    if (filter === 'fit' && !c.lineaFit) return false;
    if (filter === 'late' && !c.tooLate) return false;
    if (sourceFilter !== 'All' && c.source !== sourceFilter) return false;
    if (stageFilter !== 'All' && normalizeStage(c.stage) !== stageFilter) return false;
    return true;
  });

  const fitCount = companies.filter((c) => c.lineaFit).length;
  const lateCount = companies.filter((c) => c.tooLate).length;

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-8 py-12 sm:py-20">
      <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">Linea Ventures · Network</p>
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
        Portfolio Companies
      </h1>
      <div className="flex items-start justify-between gap-4 mb-10 sm:mb-12">
        <p className="text-lg sm:text-xl italic text-white/50">
          Companies backed by our network partners — scored and filtered for Linea fit.
        </p>
        <Link
          to="/methodology"
          className="inline-flex items-center gap-1 text-xs text-white/40 hover:text-white/60 transition-colors whitespace-nowrap flex-shrink-0 mt-1"
        >
          Scoring methodology →
        </Link>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col gap-3 mb-10">
        <div className="flex flex-wrap items-center gap-2 justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`text-xs font-medium px-3 py-1.5 rounded border transition-colors ${
                filter === 'all'
                  ? 'bg-white/15 border-white/30 text-white'
                  : 'bg-transparent border-white/15 text-white/40 hover:text-white/70'
              }`}
            >
              All ({companies.length})
            </button>
            <button
              onClick={() => setFilter('fit')}
              className={`text-xs font-medium px-3 py-1.5 rounded border transition-colors ${
                filter === 'fit'
                  ? 'bg-emerald-900/50 border-emerald-500/40 text-emerald-300'
                  : 'bg-transparent border-white/15 text-white/40 hover:text-white/70'
              }`}
            >
              ✦ Linea Fit ({fitCount})
            </button>
            <button
              onClick={() => setFilter('late')}
              className={`text-xs font-medium px-3 py-1.5 rounded border transition-colors ${
                filter === 'late'
                  ? 'bg-amber-900/40 border-amber-500/30 text-amber-300'
                  : 'bg-transparent border-white/15 text-white/40 hover:text-white/70'
              }`}
            >
              ◦ Too Late ({lateCount})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="stage-select" className="text-xs text-white/40 font-medium">
              Stage:
            </label>
            <select
              id="stage-select"
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="text-xs px-2.5 py-1 rounded border bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/30 transition-colors focus:outline-none focus:border-white/50"
            >
              <option value="All">All stages</option>
              {allStages.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 border-t border-white/10 pt-3">
          <span className="text-xs text-white/40 font-medium self-center">VC Firm:</span>
          <button
            onClick={() => setSourceFilter('All')}
            className={`text-xs px-2.5 py-1 rounded border transition-colors ${
              sourceFilter === 'All'
                ? 'bg-white/15 border-white/30 text-white'
                : 'bg-transparent border-white/10 text-white/30 hover:text-white/60'
            }`}
          >
            All
          </button>
          {ALL_SOURCES.filter(src => src !== 'All').map((src) => (
            <button
              key={src}
              onClick={() => setSourceFilter(src)}
              className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                sourceFilter === src
                  ? 'bg-white/15 border-white/30 text-white'
                  : 'bg-transparent border-white/10 text-white/30 hover:text-white/60'
              }`}
            >
              {src}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((company) => (
          <CompanyCard key={`${company.name}-${company.source}`} company={company} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="text-white/30 text-sm text-center py-16">No companies match this filter.</p>
      )}
    </div>
  );
}
