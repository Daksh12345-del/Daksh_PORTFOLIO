import { useState, lazy, Suspense } from 'react'
import NavTransition from '../NavTransition.jsx'
import { PROJECTS } from '../../components/Projects.jsx'

const ThreeBackground = lazy(() => import('../ThreeBackground.jsx'))

const NAV = ['about', 'skills', 'projects', 'experience', 'certifications', 'contact']

const SKILL_GROUPS = [
  { title: 'LANGUAGES', items: ['JavaScript', 'C++', 'HTML5', 'CSS3', 'SQL'] },
  { title: 'FRAMEWORKS / LIBRARIES', items: ['React.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'Framer Motion'] },
  { title: 'DATABASES & CLOUD', items: ['PostgreSQL', 'Supabase', 'AWS', 'Vercel'] },
  { title: 'TOOLS', items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Selenium'] },
]

const EXPERIENCE = [
  { period: 'Jun \u2013 Jul 2026', role: 'IT Trainee', org: 'BLS International Services Ltd.', desc: 'Solo-built a Visa Appointment Portal + Admin Panel, Groq API integration, 7 automated Selenium tests, 3 repos in 2 months.' },
  { period: 'Apr \u2013 Jul 2026', role: 'Full-Stack Developer', org: 'Digital Agency (Auravie & ResonCare)', desc: 'Managed a developer team across 2 client brands; financial & marketing decisions; built an internal AI automation tool.' },
  { period: '2025', role: 'Founder', org: 'GradeWallah', desc: 'Founded and built a SaaS platform for SGPA/CGPA tracking and placement resources.' },
  { period: '2025', role: 'Open Source Contributor', org: 'GSSoC \u201925 & Hacktoberfest \u201925', desc: 'Contributed to open-source projects across two global programs in the same year.' },
]

const CERTS = [
  { name: 'AWS Cloud Foundations', image: '/certificates/aws-cloud-foundations.jpg' },
  { name: 'Deloitte Data Analytics', image: '/certificates/deloitte-data-analytics.jpg' },
  { name: 'JPMorgan SWE Simulation', image: '/certificates/jpmorgan-swe-simulation.jpg' },
  { name: 'CodeChef C++ STL', image: '/certificates/codechef-cpp-stl.jpg' },
  { name: 'Unstop React.js', image: '/certificates/unstop-react.jpg' },
  { name: 'BLS Internship Certificate', image: '/certificates/bls-internship-certificate.jpg' },
]

function AboutPage() {
  return (
    <div className="p-8 max-w-[640px] font-mono-ui text-[14px] leading-[1.9]" style={{ color: 'var(--os-text-dim)' }}>
      <div className="text-[26px] font-display font-bold mb-4" style={{ color: 'var(--os-text)' }}>Daksh Singhal</div>
      <p className="mb-4"><span style={{ color: 'var(--os-accent)' }}>{'> '}</span>Full Stack Developer and Computer Science undergraduate passionate about building software that makes a real difference — scalable, user-focused web apps using React.js, Node.js, PostgreSQL, and cloud services.</p>
      <p className="mb-4"><span style={{ color: 'var(--os-accent)' }}>{'> '}</span>B.Tech CSE, ABES Engineering College (AKTU), 2024 — 2028.</p>
      <p><span style={{ color: 'var(--os-accent)' }}>{'> '}</span>Open to internships & freelance work.</p>
    </div>
  )
}

function SkillsPage() {
  return (
    <div className="p-8 font-mono-ui">
      {SKILL_GROUPS.map((g) => (
        <div key={g.title} className="mb-6">
          <div className="text-[11px] tracking-[0.08em] mb-2.5" style={{ color: 'var(--os-accent2)' }}>{g.title}</div>
          <div className="flex flex-wrap gap-2">
            {g.items.map((s) => (
              <span key={s} className="text-[12.5px] px-3 py-1.5 rounded-[7px]" style={{ border: '1px solid var(--os-border)', color: 'var(--os-text)' }}>{s}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ProjectsPage() {
  const [active, setActive] = useState(PROJECTS[0])
  return (
    <div className="flex flex-col md:flex-row h-full font-mono-ui text-[12.5px]">
      <div className="md:w-[220px] shrink-0 overflow-auto p-4">
        {PROJECTS.map((p) => (
          <button
            key={p.title}
            onClick={() => setActive(p)}
            className="block w-full text-left px-3 py-2 rounded-[7px] mb-1 truncate"
            style={{ background: active.title === p.title ? 'var(--os-surface2)' : 'transparent', color: active.title === p.title ? 'var(--os-accent)' : 'var(--os-text-dim)' }}
          >
            {p.title}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-auto p-6">
        {active.image && <img src={active.image} alt={active.title} className="w-full rounded-[8px] mb-4" style={{ maxHeight: 220, objectFit: 'cover' }} />}
        <div className="text-[18px] font-display font-bold mb-1" style={{ color: 'var(--os-text)' }}>{active.title}</div>
        <div className="text-[12px] mb-3" style={{ color: 'var(--os-accent2)' }}>{active.impact}</div>
        <p className="leading-[1.7] mb-4" style={{ color: 'var(--os-text-dim)' }}>{active.desc}</p>
        <div className="flex gap-4">
          {active.live && <a href={active.live} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--os-accent)' }}>Live site ↗</a>}
          {active.github && <a href={active.github} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--os-text-dim)' }}>GitHub ↗</a>}
        </div>
      </div>
    </div>
  )
}

function ExperiencePage() {
  return (
    <div className="p-8 font-mono-ui max-w-[680px]">
      {EXPERIENCE.map((e, i) => (
        <div key={i} className="mb-6 pb-6" style={{ borderBottom: i < EXPERIENCE.length - 1 ? '1px solid var(--os-border)' : 'none' }}>
          <div className="text-[11.5px] mb-1" style={{ color: 'var(--os-accent2)' }}>{e.period}</div>
          <div className="text-[15px] font-semibold" style={{ color: 'var(--os-text)' }}>{e.role}</div>
          <div className="text-[12.5px] mb-2" style={{ color: 'var(--os-text-dim)' }}>{e.org}</div>
          <p className="text-[13px] leading-[1.7]" style={{ color: 'var(--os-text-dim)' }}>{e.desc}</p>
        </div>
      ))}
    </div>
  )
}

function CertificationsPage() {
  const [open, setOpen] = useState(null)
  return (
    <div className="p-8">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {CERTS.map((c) => (
          <button key={c.name} onClick={() => setOpen(c)} className="text-left rounded-[10px] overflow-hidden" style={{ border: '1px solid var(--os-border)' }}>
            <img src={c.image} alt={c.name} className="w-full h-[90px] object-cover" />
            <div className="p-2 text-[11.5px] font-mono-ui" style={{ color: 'var(--os-text-dim)' }}>{c.name}</div>
          </button>
        ))}
      </div>
      {open && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-6" style={{ background: 'rgba(10,12,20,0.85)' }} onClick={() => setOpen(null)}>
          <img src={open.image} alt={open.name} className="max-w-[600px] max-h-[80vh] rounded-[10px]" />
        </div>
      )}
    </div>
  )
}

function ContactPage() {
  return (
    <div className="p-8 font-mono-ui text-[13.5px]" style={{ color: 'var(--os-text-dim)' }}>
      <p className="mb-4">Best way to reach me:</p>
      <div className="flex flex-col gap-2">
        <a href="mailto:psinghal651@gmail.com" className="underline" style={{ color: 'var(--os-accent)' }}>psinghal651@gmail.com</a>
        <a href="https://github.com/Daksh12345-del" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--os-text)' }}>github.com/Daksh12345-del</a>
        <a href="https://www.linkedin.com/in/daksh-singhal-178b56282/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--os-text)' }}>linkedin.com/in/daksh-singhal</a>
      </div>
    </div>
  )
}

const PAGES = {
  about: AboutPage,
  skills: SkillsPage,
  projects: ProjectsPage,
  experience: ExperiencePage,
  certifications: CertificationsPage,
  contact: ContactPage,
}

export default function BrowserWindow() {
  const [active, setActive] = useState('about')
  const [pending, setPending] = useState(null)

  const goTo = (section) => {
    if (section === active || pending) return
    setPending(section)
  }

  const PageComponent = PAGES[active]

  return (
    <div className="flex flex-col h-[480px]">
      {/* fake URL bar */}
      <div className="flex items-center gap-2 px-3 py-2" style={{ borderBottom: '1px solid var(--os-border)', background: 'var(--os-surface2)' }}>
        <span className="text-[11px]" style={{ color: 'var(--os-text-dim)' }}>←</span>
        <span className="text-[11px]" style={{ color: 'var(--os-text-dim)' }}>→</span>
        <div className="flex-1 rounded-full px-3 py-1 text-[11.5px] font-mono-ui truncate" style={{ background: 'var(--os-bg)', color: 'var(--os-text-dim)', border: '1px solid var(--os-border)' }}>
          daksh.dev/{active}
        </div>
      </div>

      {/* internal nav */}
      <div className="flex gap-1 px-3 py-2 overflow-x-auto" style={{ borderBottom: '1px solid var(--os-border)' }}>
        {NAV.map((n) => (
          <button
            key={n}
            onClick={() => goTo(n)}
            className="px-3 py-1.5 rounded-[7px] text-[12px] font-mono-ui whitespace-nowrap"
            style={{
              background: active === n ? 'var(--os-surface2)' : 'transparent',
              color: active === n ? 'var(--os-accent)' : 'var(--os-text-dim)',
            }}
          >
            {n}
          </button>
        ))}
      </div>

      {/* content */}
      <div className="relative flex-1 overflow-auto">
        <Suspense fallback={null}>
          <ThreeBackground />
        </Suspense>
        <div className="relative z-10 h-full">
          <PageComponent />
        </div>
        {pending && (
          <NavTransition
            target={pending}
            onComplete={() => { setActive(pending); setPending(null) }}
          />
        )}
      </div>
    </div>
  )
}
