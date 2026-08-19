import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SectionHead from './SectionHead.jsx'

const SKILL_DATA = [
  { label: 'React', years: 5, group: 0 },
  { label: 'JavaScript', years: 5, group: 0 },
  { label: 'Tailwind CSS', years: 4, group: 0 },
  { label: 'Framer Motion', years: 3, group: 0 },
  { label: 'HTML/CSS', years: 5, group: 0 },
  { label: 'Node.js', years: 4, group: 1 },
  { label: 'Express.js', years: 4, group: 1 },
  { label: 'Python', years: 3, group: 1 },
  { label: 'FastAPI', years: 2, group: 1 },
  { label: 'Java', years: 3, group: 1 },
  { label: 'C++', years: 4, group: 1 },
  { label: 'PostgreSQL', years: 4, group: 2 },
  { label: 'Supabase', years: 3, group: 2 },
  { label: 'Selenium Testing', years: 3, group: 2 },
  { label: 'AWS', years: 4, group: 2 },
  { label: 'Git & GitHub', years: 4, group: 3 },
  { label: 'Postman', years: 3, group: 3 },
]
const GROUP_COLORS = ['255,178,56', '255,122,61', '255,216,102', '237,160,63']

const CHIP_GROUPS = [
  { title: 'Frontend', items: ['React', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'Framer Motion', 'Vite'] },
  { title: 'Backend & Languages', items: ['Node.js', 'Express.js', 'Python', 'FastAPI', 'Java', 'C++', 'REST APIs'] },
  { title: 'Database & Cloud', items: ['PostgreSQL', 'Supabase', 'AWS'] },
  { title: 'Testing & Tools', items: ['Selenium', 'Pytest', 'Git & GitHub', 'Postman', 'VS Code', 'IntelliJ IDEA'] },
]

function SkillGraph() {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const [tooltip, setTooltip] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrapEl = wrapRef.current
    const ctx = canvas.getContext('2d')
    let w, h, nodes = [], raf
    let mouse = { x: -999, y: -999 }

    function layout() {
      w = canvas.width = wrapEl.clientWidth - 28
      h = canvas.height = 440
      const cx = w / 2, cy = h / 2
      nodes = SKILL_DATA.map((d, i) => {
        const angle = (i / SKILL_DATA.length) * Math.PI * 2
        const radius = Math.min(w, h) / 2 - 50
        return {
          ...d,
          x: cx + Math.cos(angle) * radius * (0.55 + Math.random() * 0.35),
          y: cy + Math.sin(angle) * radius * (0.55 + Math.random() * 0.35),
          baseR: 6 + d.years * 1.6,
        }
      })
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      let hovered = null
      nodes.forEach((n) => {
        if (Math.hypot(n.x - mouse.x, n.y - mouse.y) < n.baseR + 6) hovered = n
      })
      if (hovered) {
        setTooltip({ x: hovered.x + 14, y: hovered.y - 10, text: `${hovered.label} — Lvl ${hovered.years}/5` })
      } else {
        setTooltip(null)
      }
    }
    function onLeave() {
      setTooltip(null)
    }

    function tick(t) {
      ctx.clearRect(0, 0, w, h)
      nodes.forEach((n, i) => {
        n.x += Math.sin(t / 2000 + i) * 0.15
        n.y += Math.cos(t / 2200 + i) * 0.15
      })
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          if (a.group === b.group) {
            ctx.strokeStyle = `rgba(${GROUP_COLORS[a.group]},0.28)`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      nodes.forEach((n) => {
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.baseR * 1.6)
        grad.addColorStop(0, `rgba(${GROUP_COLORS[n.group]},0.9)`)
        grad.addColorStop(1, `rgba(${GROUP_COLORS[n.group]},0)`)
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.baseR * 1.6, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.baseR * 0.42, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${GROUP_COLORS[n.group]},1)`
        ctx.fill()
      })
      raf = requestAnimationFrame(tick)
    }

    layout()
    raf = requestAnimationFrame(tick)
    window.addEventListener('resize', layout)
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', layout)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div ref={wrapRef} className="glass p-3.5 relative">
      <canvas ref={canvasRef} className="w-full" style={{ height: 440, borderRadius: 20 }} />
      {tooltip && (
        <div
          className="glass-strong absolute px-3 py-2 rounded-[10px] text-[12.5px] font-mono-ui whitespace-nowrap pointer-events-none z-10"
          style={{ left: tooltip.x, top: tooltip.y, color: 'var(--text)' }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-[120px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <SectionHead
          kicker="Skills"
          title="The stack, mapped as a network."
          desc="Every tool below connects to at least one other — that's deliberate. Node size reflects hands-on proficiency; hover a node for specifics."
        />
        <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <SkillGraph />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-[22px]"
          >
            {CHIP_GROUPS.map((g) => (
              <div key={g.title}>
                <div className="text-[13px] font-mono-ui uppercase tracking-[0.08em] mb-[10px]" style={{ color: 'var(--text-faint)' }}>
                  {g.title}
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <div
                      key={item}
                      className="px-[13px] py-[7px] rounded-full text-[13px] border transition-all hover:-translate-y-0.5"
                      style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
