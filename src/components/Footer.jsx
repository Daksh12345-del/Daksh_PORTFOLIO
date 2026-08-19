import { ArrowUpIcon } from './Icons.jsx'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="py-[60px] pb-[30px]" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="flex justify-between items-center flex-wrap gap-6 mb-10">
          <a href="#hero" className="font-display font-bold text-[19px]">
            daksh<span className="grad-text">.dev</span>
          </a>
          <div className="flex gap-[26px] flex-wrap">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-[14px] transition-colors" style={{ color: 'var(--text-muted)' }}>
                {l.label}
              </a>
            ))}
          </div>
          <button
            onClick={scrollTop}
            aria-label="Back to top"
            className="w-[42px] h-[42px] rounded-full flex items-center justify-center border transition-all hover:-translate-y-1"
            style={{ borderColor: 'var(--border)' }}
          >
            <ArrowUpIcon />
          </button>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-3.5 text-[13px]" style={{ color: 'var(--text-faint)' }}>
          <span>© 2026 Daksh Singhal. All rights reserved.</span>
          <span className="font-mono-ui">Built with React · Tailwind CSS · Framer Motion</span>
        </div>
      </div>
    </footer>
  )
}
