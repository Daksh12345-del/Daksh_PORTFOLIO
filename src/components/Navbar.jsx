import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SunMoonIcon, MenuIcon, CloseIcon } from './Icons.jsx'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#education', label: 'Education' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#client-work', label: 'Client Work' },
  { href: '#services', label: 'Services' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#github', label: 'GitHub' },
  { href: '#contact', label: 'Contact' },
]

const SHORTCUTS = {
  h: '#hero',
  a: '#about',
  s: '#skills',
  p: '#projects',
  e: '#experience',
  c: '#contact',
  t: '#certifications',
}

const EGG_EMOJIS = ['🎉', '⚡', '🚀', '✨', '💜', '🎊']

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [egg, setEgg] = useState(false)
  const [shortcutHint, setShortcutHint] = useState(false)
  const clickCountRef = useRef(0)
  const lastClickRef = useRef(0)
  const leaderRef = useRef(false)
  const leaderTimeoutRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const hasSeenHint = sessionStorage.getItem('kbdHintShown')
    if (!hasSeenHint) {
      const t = setTimeout(() => {
        setShortcutHint(true)
        sessionStorage.setItem('kbdHintShown', '1')
        setTimeout(() => setShortcutHint(false), 4500)
      }, 3000)
      return () => clearTimeout(t)
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (ev) => {
      const tag = document.activeElement?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      const key = ev.key.toLowerCase()

      if (key === 'g') {
        leaderRef.current = true
        clearTimeout(leaderTimeoutRef.current)
        leaderTimeoutRef.current = setTimeout(() => { leaderRef.current = false }, 700)
        return
      }
      if (leaderRef.current && SHORTCUTS[key]) {
        leaderRef.current = false
        const el = document.querySelector(SHORTCUTS[key])
        el?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const handleLogoClick = (e) => {
    const now = Date.now()
    if (now - lastClickRef.current > 1200) clickCountRef.current = 0
    clickCountRef.current += 1
    lastClickRef.current = now
    if (clickCountRef.current >= 5) {
      e.preventDefault()
      clickCountRef.current = 0
      setEgg(true)
    }
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100]" style={{ padding: scrolled ? '10px 0' : '16px 0', transition: 'padding .35s ease' }}>
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="glass flex items-center justify-between px-[22px] py-3">
            <a href="#hero" onClick={handleLogoClick} className="font-display font-bold text-[19px]">
              daksh<span className="grad-text">.dev</span>
            </a>

            <div className="hidden lg:flex items-center gap-[20px]">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-[13.5px] relative py-1 group"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {l.label}
                  <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 grad-bg transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                aria-label="Toggle light and dark theme"
                className="w-[38px] h-[38px] rounded-full flex items-center justify-center border transition-transform hover:scale-110 hover:rotate-[8deg]"
                style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
              >
                <SunMoonIcon isDark={theme === 'dark'} />
              </button>
              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                className="lg:hidden w-[38px] h-[38px] rounded-full flex items-center justify-center border"
                style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-7"
            style={{ background: 'var(--bg)' }}
          >
            <button
              onClick={closeMenu}
              className="absolute top-[26px] right-[26px] w-[38px] h-[38px] rounded-full flex items-center justify-center border"
              style={{ borderColor: 'var(--border)' }}
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
            {LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={closeMenu}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="font-display font-semibold text-[22px]"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {shortcutHint && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[86px] left-1/2 -translate-x-1/2 z-[150] glass px-5 py-3 text-[12.5px] font-mono-ui hidden lg:block"
            style={{ color: 'var(--text-muted)' }}
          >
            💡 tip: press <strong style={{ color: 'var(--accent2)' }}>g</strong> then a letter (p, e, s, c) to jump around
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {egg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-6"
            style={{ background: 'rgba(6,8,14,0.85)' }}
            onClick={() => setEgg(false)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="glass-strong p-10 text-center max-w-[420px] relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {EGG_EMOJIS.map((e, i) => (
                <motion.span
                  key={i}
                  className="absolute text-[28px]"
                  style={{ left: `${10 + i * 15}%`, top: '-10%' }}
                  initial={{ y: -40, opacity: 0, rotate: 0 }}
                  animate={{ y: 320, opacity: [0, 1, 1, 0], rotate: 360 }}
                  transition={{ duration: 2.2, delay: i * 0.08, ease: 'easeIn' }}
                >
                  {e}
                </motion.span>
              ))}
              <div className="text-[42px] mb-3">🥚</div>
              <div className="font-display font-bold text-[20px] mb-2">You found the easter egg!</div>
              <p className="text-[14px] mb-5" style={{ color: 'var(--text-muted)' }}>
                5 clicks on the logo — that's the kind of curiosity I like to see. Try the keyboard shortcut{' '}
                <span className="font-mono-ui" style={{ color: 'var(--accent2)' }}>g</span> +{' '}
                <span className="font-mono-ui" style={{ color: 'var(--accent2)' }}>p</span> next.
              </p>
              <button
                onClick={() => setEgg(false)}
                className="btn-primary px-6 py-2.5 rounded-xl font-semibold text-[13.5px]"
              >
                Nice!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
