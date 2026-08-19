import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SectionHead from './SectionHead.jsx'
import { GithubIcon, LinkedinIcon } from './Icons.jsx'

const EMAIL = 'psinghal651@gmail.com'
const GITHUB_URL = 'https://github.com/Daksh12345-del'
const LINKEDIN_URL = 'https://www.linkedin.com/in/daksh-singhal-178b56282/'

const LINES = [
  { cmd: 'whoami', out: 'Daksh Singhal — Full-Stack Developer, New Delhi' },
  { cmd: 'contact --email', out: EMAIL, href: `mailto:${EMAIL}`, copy: true },
  { cmd: 'contact --github', out: 'github.com/Daksh12345-del', href: GITHUB_URL },
  { cmd: 'contact --linkedin', out: 'linkedin.com/in/daksh-singhal', href: LINKEDIN_URL },
  { cmd: 'resume --download', out: '/Daksh_Singhal_Resume.pdf', href: '/Daksh_Singhal_Resume.pdf', label: 'Daksh_Singhal_Resume.pdf' },
]

function useTypedLines(active) {
  const [rendered, setRendered] = useState([])
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const finishAll = () => {
      setRendered(LINES.map((l) => ({ cmd: l.cmd, showOut: true })))
    }
    window.addEventListener('beforeprint', finishAll)
    const mql = window.matchMedia ? window.matchMedia('print') : null
    const mqlHandler = (e) => { if (e.matches) finishAll() }
    mql?.addEventListener?.('change', mqlHandler)
    return () => {
      window.removeEventListener('beforeprint', finishAll)
      mql?.removeEventListener?.('change', mqlHandler)
    }
  }, [])

  useEffect(() => {
    if (!active) return
    let cancelled = false

    async function run() {
      for (let i = 0; i < LINES.length; i++) {
        const { cmd } = LINES[i]
        for (let c = 1; c <= cmd.length; c++) {
          if (cancelled) return
          await new Promise((r) => setTimeout(r, 22))
          setRendered((prev) => {
            const next = [...prev]
            next[i] = { cmd: cmd.slice(0, c), showOut: false }
            return next
          })
        }
        await new Promise((r) => setTimeout(r, 180))
        if (cancelled) return
        setRendered((prev) => {
          const next = [...prev]
          next[i] = { cmd, showOut: true }
          return next
        })
        await new Promise((r) => setTimeout(r, 260))
      }
    }
    run()
    return () => { cancelled = true }
  }, [active])

  return { rendered, copied, setCopied }
}

export default function Contact() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(false)
  const { rendered, copied, setCopied } = useTypedLines(active)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold: 0.3 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const handleCopy = (e, text) => {
    e.preventDefault()
    navigator.clipboard?.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 md:py-[120px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <SectionHead
          kicker="Contact"
          title="Let's connect."
          desc="Run a command below, or just click through."
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="glass-strong max-w-[640px] rounded-[18px] overflow-hidden"
        >
          {/* fake title bar */}
          <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-soft)' }}>
            <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
            <span className="ml-3 text-[12px] font-mono-ui" style={{ color: 'var(--text-faint)' }}>daksh@portfolio: ~/contact</span>
          </div>

          <div className="p-6 font-mono-ui text-[13.5px] leading-[1.9] min-h-[260px] print:hidden">
            {LINES.map((line, i) => {
              const r = rendered[i]
              if (!r) return null
              return (
                <div key={line.cmd} className="mb-1">
                  <div>
                    <span style={{ color: 'var(--accent2)' }}>➜ </span>
                    <span style={{ color: 'var(--text)' }}>{r.cmd}</span>
                    {!r.showOut && <span className="animate-pulse">▍</span>}
                  </div>
                  {r.showOut && (
                    <div className="pl-4" style={{ color: 'var(--text-muted)' }}>
                      {line.copy ? (
                        <button onClick={(e) => handleCopy(e, line.out)} className="hover:underline" style={{ color: 'var(--accent1)' }}>
                          {copied ? 'copied to clipboard ✓' : line.out}
                        </button>
                      ) : (
                        <a href={line.href} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: 'var(--accent1)' }}>
                          {line.label || line.out}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
            {rendered.length === LINES.length && rendered[LINES.length - 1]?.showOut && (
              <div className="mt-2">
                <span style={{ color: 'var(--accent2)' }}>➜ </span>
                <span className="animate-pulse">▍</span>
              </div>
            )}
          </div>

          {/* Static fallback — always fully rendered, shown only when printing */}
          <div className="hidden print:block p-6 font-mono-ui text-[13.5px] leading-[1.9]">
            {LINES.map((line) => (
              <div key={line.cmd} className="mb-2">
                <div>➜ {line.cmd}</div>
                <div className="pl-4">{line.label || line.out}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-wrap gap-3 mt-6 items-center">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-11 h-11 rounded-[12px] flex items-center justify-center border transition-all hover:-translate-y-1"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <GithubIcon />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-11 h-11 rounded-[12px] flex items-center justify-center border transition-all hover:-translate-y-1"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <LinkedinIcon />
          </a>
          <a
            href="/Daksh_Singhal_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center px-6 h-11 rounded-[12px] font-semibold text-[13.5px] transition-transform hover:-translate-y-1"
          >
            Download Resume
          </a>
          <button
            onClick={() => window.print()}
            className="no-print inline-flex items-center justify-center px-6 h-11 rounded-[12px] font-semibold text-[13.5px] border transition-transform hover:-translate-y-1"
            style={{ borderColor: 'var(--border)' }}
          >
            🖨️ Print this page
          </button>
        </div>

        <div className="flex items-center gap-4 mt-8 glass px-5 py-4 max-w-fit">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://github.com/Daksh12345-del"
            alt="QR code to portfolio"
            className="w-[76px] h-[76px] rounded-[10px]"
            style={{ background: '#fff', padding: 4 }}
          />
          <div>
            <div className="text-[13.5px] font-semibold mb-1">Scan to connect</div>
            <div className="text-[12px]" style={{ color: 'var(--text-muted)' }}>Quick link to my GitHub — handy for business cards & resumes.</div>
          </div>
        </div>
      </div>
    </section>
  )
}
