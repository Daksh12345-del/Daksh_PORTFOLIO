import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHead from './SectionHead.jsx'
import { ArrowUpRightIcon, CloseIcon } from './Icons.jsx'

export const PROJECTS = [
  {
    index: '01 / Founder Project',
    title: 'GradeWallah',
    image: '/projects/gradewallah.jpg',
    impact: 'All-in-one student platform · CGPA + DSA + leaderboards',
    desc: 'Founded and built GradeWallah — an all-in-one platform for college students to track CGPA/SGPA, prep DSA across LeetCode, Codeforces & GitHub, discover internships & placements, and compare progress on live leaderboards. Backed by a scalable PostgreSQL schema supporting multi-semester academic data.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    stack: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
    features: [
      'CGPA/SGPA calculator with multi-semester academic tracking',
      'DSA prep tracker synced across LeetCode, Codeforces & GitHub',
      'Live leaderboards to compare progress with peers',
      'Internship & placement resource hub',
      'PDF report generation & study recommendations',
      'Secure authentication with responsive dashboards',
    ],
    live: 'https://www.gradewallah.com',
    github: 'https://github.com/Daksh12345-del/GRADEWISE_PROJECT.git',
  },
  {
    index: '02 / Client Project',
    title: 'Sarvpratham Edu Consultants',
    image: '/projects/sarvpratham.jpg',
    impact: '50+ partner colleges, 24hr response',
    desc: 'Solo-developed and deployed a college admission platform for a real client — DU College Predictor, counselling package listings, enquiry management, and WhatsApp-based lead generation, all live in production on a custom domain.',
    tags: ['React', 'Express.js', 'PostgreSQL'],
    stack: ['React.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS', 'WhatsApp API'],
    features: [
      'DU College Predictor (Round 1, category-wise, source-verified)',
      'Counselling package listings across 20+ streams',
      'PostgreSQL schema for enquiry/lead tracking',
      'REST API endpoints for CRUD operations',
      'WhatsApp-based lead generation',
    ],
    live: 'https://www.sarvprathameduconsultants.com',
    github: 'https://github.com/Daksh12345-del/COUNSELLING.git',
  },
  {
    index: '03 / Client Project',
    title: 'Prime Builders',
    image: '/projects/prime-builders.jpg',
    impact: 'Real estate discovery platform',
    desc: 'A full-stack property discovery platform for South West Delhi builder floors — advanced filters by configuration and metro proximity, interactive maps, a lead-capture inquiry engine, and a secure admin dashboard for listings.',
    tags: ['React', 'Tailwind', 'Maps API'],
    stack: ['React', 'Tailwind CSS', 'Node.js', 'Google Maps API', 'Cloudinary'],
    features: [
      'Filter listings by BHK, price & metro proximity',
      'Interactive map view near transit hubs',
      'Lead-capture & loan-eligibility inquiry engine',
      'Admin dashboard for listings & media',
      'WhatsApp-integrated enquiry button',
    ],
    live: 'https://www.primebuilders.co.in',
    github: 'https://github.com/Daksh12345-del/prime_builders.git',
  },
  {
    index: '04 / Client Project',
    title: 'DU College Predictor',
    image: '/projects/du-predictor.jpg',
    impact: 'CUET-based admission predictor',
    desc: 'A CUET UG college & course predictor for Delhi University applicants — enter stream, category, and CUET marks to get a weighted, transparent chance-prediction across DU colleges, verified against source cutoff PDFs.',
    tags: ['JavaScript', 'HTML', 'CSS'],
    stack: ['JavaScript', 'HTML', 'CSS', 'Chart-based scoring logic'],
    features: [
      'Stream, category & course-based CUET input',
      'Best-4-of-5 paper scoring exactly as DU counts',
      'Round 1 category-wise, source-verified cutoff data',
      'Full cutoff list browser',
      'Talk-to-a-counsellor handoff',
    ],
    github: 'https://github.com/Daksh12345-del/COUNSELLING.git',
    live: 'https://sarvprathameduconsultants.com/college-predictor.html',
  },
  {
    index: '05 / Internship',
    title: 'BLS International — Visa Appointment Portal',
    image: '/projects/bls-internship.jpg',
    impact: '3 repos shipped in 2 months',
    desc: 'A multi-step Visa Appointment Portal built solo during my internship — email OTP verification, passport/travel details, document upload with a live checklist, and reference number generation — plus a full Admin Control Panel.',
    tags: ['React', 'Express.js', 'Selenium'],
    stack: ['React.js', 'Express.js', 'PostgreSQL', 'Groq API', 'Selenium', 'Git'],
    features: [
      'Multi-step visa application flow with email OTP verification',
      'Document upload with live checklist & reference number generation',
      'Admin panel: counters, city/country config, time-slot scheduling',
      'Groq API integration for AI-assisted features',
      '7 automated Selenium test cases (login & booking flows)',
    ],
    github: 'https://github.com/Daksh12345-del/BLS_USER_INTERNSHIP.git',
  },
  {
    index: '06 / Academic Tool',
    title: 'ABES SGPA/CGPA Calculator',
    image: '/projects/abes-calculator.jpg',
    impact: 'Live SGPA with PDF export',
    desc: 'A web-based SGPA/CGPA calculator built for ABES Engineering College (AKTU) students — live SGPA with dynamic circular progress, an academic improvement graph, performance insights, and PDF report export.',
    tags: ['JavaScript', 'Chart.js', 'HTML/CSS'],
    stack: ['JavaScript', 'HTML', 'CSS', 'Chart.js', 'Vercel'],
    features: [
      'Live SGPA with dynamic circular progress ring',
      'Semester, group & branch-wise subject selection',
      'Academic improvement graph across semesters',
      'PDF report export',
      'Dark/light mode toggle',
    ],
    live: 'https://abescalculatorautonomous.vercel.app',
    github: 'https://github.com/Daksh12345-del/ABES-SGPA-CALCULATOR-AUTONOMOUS-.git',
  },
  {
    index: '07 / Personal Project',
    title: 'GreenPrint',
    image: '/projects/greenprint.jpg',
    impact: 'Multi-tenant carbon & ESG platform for companies',
    desc: 'A full-stack carbon emissions tracking and ESG reporting platform for companies to monitor, calculate, and report their Scope 1/2 footprint. Role-based multi-tenant architecture (company admin, plant manager, fleet manager) keeps each company\u2019s data fully isolated, with emissions computed from real logged activity using sourced, configurable emission factors (CEA India, UK DEFRA, Ember, US EPA AP-42) — never hardcoded.',
    tags: ['React (Vite)', 'Node.js', 'PostgreSQL'],
    stack: ['React.js (Vite)', 'Node.js', 'Express.js', 'PostgreSQL (Supabase)', 'Jest', 'GitHub Actions', 'Vercel', 'Render'],
    features: [
      'Role-based multi-tenant system with fully isolated company data',
      'Emission calcs from sourced factors (CEA India, DEFRA, Ember, EPA AP-42) instead of hardcoded values',
      'Historical factor versioning — past reports stay locked even if factors update later',
      'IoT device ingestion via authenticated API for sensor/telematics data',
      'Dashboard with KPIs, trend charts, and month-over-month spike alerts',
      'PDF and CSV/Excel report exports, plus a carbon credits tracking module',
      'JWT auth with bcrypt hashing, rate limiting, and full password reset flow',
      'Dark mode, partial Hindi/English localization, and automated production smoke tests via GitHub Actions',
    ],
    live: 'https://greenprint-app.vercel.app',
    github: 'https://github.com/Daksh12345-del/GREEN_PRINT_FRONTEND.git',
    githubBackend: 'https://github.com/Daksh12345-del/GREEN_PRINT_BACKEND.git',
  },
  {
    index: '08 / NGO Client Project',
    title: 'Shri Brij Mohan Gopal Seva Samiti',
    image: '/projects/seva-samiti.jpg',
    impact: 'Bilingual NGO platform',
    desc: 'A bilingual (Hindi/English) website for a registered charitable trust — seva program showcases, a team/office-bearers section, tiered membership plans, and a UPI-integrated donation module.',
    tags: ['React', 'Tailwind', 'UPI Integration'],
    stack: ['React', 'Tailwind CSS', 'UPI/Paytm Integration', 'Vercel'],
    features: [
      'Bilingual (Hindi/English) content throughout',
      'Seva program showcase (food, education, health, events)',
      'Team / office-bearers section',
      'Tiered membership plans with application modal',
      'UPI-integrated donation module',
    ],
    live: 'https://shri-brij-mohan-gopal-seva-samiti.vercel.app',
    github: 'https://github.com/Daksh12345-del/Shri-Brij-Mohan-Gopal-Seva-Samiti.git',
  },
]

function ProjectCard({ p, delay, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -6 }}
      className="glass overflow-hidden flex flex-col relative group cursor-pointer"
      onClick={() => onOpen(p)}
    >
      <div className="relative overflow-hidden aspect-[16/9]">
        {p.image ? (
          <img
            src={p.image}
            alt={p.title}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full grad-bg opacity-80 flex items-center justify-center">
            <span className="font-display font-bold text-white text-[15px] tracking-wide">Screenshot coming soon</span>
          </div>
        )}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" style={{ background: 'rgba(10,12,20,0.55)' }}>
          <span className="text-white text-[13.5px] font-semibold border border-white/40 rounded-full px-4 py-2">
            View details
          </span>
        </div>
      </div>
      <div className="p-[26px] flex flex-col gap-3 flex-1">
        <div className="font-mono-ui text-[12px]" style={{ color: 'var(--text-faint)' }}>{p.index}</div>
        <div className="text-[20px] font-semibold">{p.title}</div>
        <div className="text-[13.5px] font-mono-ui" style={{ color: 'var(--accent2)' }}>{p.impact}</div>
        <p className="text-[14px] leading-[1.65] line-clamp-3" style={{ color: 'var(--text-muted)' }}>{p.desc}</p>
        <div className="flex flex-wrap gap-[7px] mt-1">
          {p.tags.map((t) => (
            <span key={t} className="text-[11.5px] font-mono-ui px-[10px] py-1 rounded-full" style={{ background: 'var(--bg-soft)', color: 'var(--text-muted)' }}>
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-5 mt-2">
          {p.live && (
            <a href={p.live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 text-[13.5px] font-semibold">
              Live site
              <ArrowUpRightIcon />
            </a>
          )}
          {p.github && (
            <a href={p.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 text-[13.5px] font-semibold" style={{ color: 'var(--text-muted)' }}>
              GitHub
              <ArrowUpRightIcon />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function ProjectModal({ p, onClose }) {
  if (!p) return null
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-start md:items-center justify-center p-4 md:p-8 overflow-y-auto"
        style={{ background: 'rgba(6,8,14,0.75)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-strong w-full max-w-[720px] my-8 rounded-[22px] overflow-hidden"
        >
          <div className="relative aspect-[16/9]">
            {p.image ? (
              <img src={p.image} alt={p.title} className="w-full h-full object-cover object-top" />
            ) : (
              <div className="w-full h-full grad-bg opacity-80 flex items-center justify-center">
                <span className="font-display font-bold text-white text-[16px]">Screenshot coming soon</span>
              </div>
            )}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center border"
              style={{ background: 'rgba(10,12,20,0.6)', borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}
            >
              <CloseIcon />
            </button>
          </div>
          <div className="p-[30px] md:p-[38px]">
            <div className="font-mono-ui text-[12px] mb-2" style={{ color: 'var(--text-faint)' }}>{p.index}</div>
            <div className="text-[26px] font-display font-bold mb-1.5">{p.title}</div>
            <div className="text-[14px] font-mono-ui mb-4" style={{ color: 'var(--accent2)' }}>{p.impact}</div>
            <p className="text-[15px] leading-[1.75] mb-6" style={{ color: 'var(--text-muted)' }}>{p.desc}</p>

            <div className="text-[12.5px] font-mono-ui uppercase tracking-[0.08em] mb-3" style={{ color: 'var(--text-faint)' }}>Key Features</div>
            <ul className="space-y-2 mb-6">
              {p.features.map((f) => (
                <li key={f} className="text-[14px] leading-[1.6] pl-4 relative" style={{ color: 'var(--text-muted)' }}>
                  <span className="absolute left-0" style={{ color: 'var(--accent2)' }}>·</span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="text-[12.5px] font-mono-ui uppercase tracking-[0.08em] mb-3" style={{ color: 'var(--text-faint)' }}>Tech Stack</div>
            <div className="flex flex-wrap gap-[8px] mb-7">
              {p.stack.map((t) => (
                <span key={t} className="text-[12.5px] font-mono-ui px-[12px] py-[6px] rounded-full" style={{ background: 'var(--bg-soft)', color: 'var(--text)' }}>
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {p.live && (
                <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 px-[22px] py-[11px] rounded-xl font-semibold text-[14px]">
                  View live site <ArrowUpRightIcon />
                </a>
              )}
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-[22px] py-[11px] rounded-xl font-semibold text-[14px] border" style={{ borderColor: 'var(--border)' }}>
                  View GitHub <ArrowUpRightIcon />
                </a>
              )}
              {p.githubBackend && (
                <a href={p.githubBackend} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-[22px] py-[11px] rounded-xl font-semibold text-[14px] border" style={{ borderColor: 'var(--border)' }}>
                  Backend repo <ArrowUpRightIcon />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Projects() {
  const [active, setActive] = useState(null)

  return (
    <section id="projects" className="relative py-24 md:py-[120px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <SectionHead
          kicker="Selected Work"
          title="Projects worth talking about."
          desc="A handful of the products I've taken from first commit to production. Click any card for full functionality & tech stack."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[26px]">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} p={p} delay={(i % 2) * 0.08} onOpen={setActive} />
          ))}
        </div>
      </div>
      <ProjectModal p={active} onClose={() => setActive(null)} />
    </section>
  )
}
