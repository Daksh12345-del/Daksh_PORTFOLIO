import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import ParticleTitle from './ParticleTitle.jsx'

function ParticleBackground() {
  const canvasRef = useRef(null)
  const heroRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const hero = canvas.parentElement
    let w, h, particles = []
    let mouse = { x: -999, y: -999 }
    let raf

    function isDark() {
      return !document.documentElement.classList.contains('light')
    }

    function resize() {
      w = canvas.width = hero.offsetWidth
      h = canvas.height = hero.offsetHeight
      const count = Math.min(70, Math.floor((w * h) / 18000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }))
    }

    function onMove(e) {
      const rect = hero.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    function onLeave() {
      mouse.x = -999
      mouse.y = -999
    }

    function tick() {
      ctx.clearRect(0, 0, w, h)
      const c1 = isDark() ? '255,178,56' : '201,122,27'
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          p.x += dx / dist * 0.6
          p.y += dy / dist * 0.6
        }
      })
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 130) {
            ctx.strokeStyle = `rgba(${c1},${(1 - d / 130) * 0.22})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${c1},0.55)`
        ctx.fill()
      })
      raf = requestAnimationFrame(tick)
    }

    resize()
    tick()
    window.addEventListener('resize', resize)
    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
}

const STATS = [
  { value: '8', label: 'Projects built' },
  { value: '6', label: 'Live client websites' },
  { value: '10+', label: 'Certifications earned' },
  { value: '2', label: 'Open-source programs' },
]

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <ParticleBackground />
      <div className="relative z-[2] max-w-[1180px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-2"
        >
          <ParticleTitle text="DAKSH SINGHAL" className="h-[80px] sm:h-[120px] md:h-[150px]" />
          <div
            className="font-mono-ui text-[12px] sm:text-[13.5px] tracking-[0.18em] uppercase -mt-1 sm:-mt-2"
            style={{ color: 'var(--text-muted)' }}
          >
            Full-Stack Developer · B.Tech CSE · New Delhi, India
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 font-mono-ui text-[12.5px] px-[14px] py-[7px] rounded-full mb-[26px] border"
          style={{ color: 'var(--accent2)', background: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <span className="w-[7px] h-[7px] rounded-full bg-green-400 animate-pulse2" style={{ boxShadow: '0 0 8px #4ade80' }} />
          Open to internships & freelance work — 2026
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-bold leading-[1.05] max-w-[900px]"
          style={{ fontSize: 'clamp(38px, 6.2vw, 78px)' }}
        >
          I build <span className="grad-text">full-stack products</span> people actually use.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[18px] leading-[1.7] max-w-[560px] my-[26px]"
          style={{ color: 'var(--text-muted)' }}
        >
          I'm Daksh Singhal — a Full Stack Developer and Computer Science undergraduate in New Delhi. I turn
          ideas into scalable, user-focused web apps using React, Node.js, and PostgreSQL — most recently as
          an IT Trainee at BLS International.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex gap-4 flex-wrap"
        >
          <a href="#projects" className="btn-primary inline-flex items-center gap-2 px-[26px] py-[13px] rounded-xl font-semibold text-[14.5px] transition-transform hover:-translate-y-1">
            View my work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-[26px] py-[13px] rounded-xl font-semibold text-[14.5px] border transition-transform hover:-translate-y-1"
            style={{ borderColor: 'var(--border)' }}
          >
            Get in touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex gap-[44px] flex-wrap mt-[74px]"
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <b className="font-display block text-[30px] grad-text">{s.value}</b>
              <span className="text-[13px]" style={{ color: 'var(--text-muted)' }}>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
