import { motion } from 'framer-motion'
import SectionHead from './SectionHead.jsx'

const TIMELINE = [
  {
    period: '2024 — 2028',
    role: 'B.Tech, Computer Science & Engineering',
    org: 'ABES Engineering College, AKTU, Ghaziabad',
    desc: 'Currently pursuing — building full-stack projects, contributing to open source, and interning alongside coursework.',
  },
  {
    period: '2024',
    role: 'Class 12',
    org: 'Modern Convent School, Dwarka, New Delhi',
    desc: '85.2%',
  },
  {
    period: '2022',
    role: 'Class 10',
    org: 'Modern Convent School, Dwarka, New Delhi',
    desc: '89.8%',
  },
]

export default function Education() {
  return (
    <section id="education" className="relative py-24 md:py-[120px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <SectionHead kicker="Education" title="Where it started." />
        <div className="relative pl-[34px]">
          <div
            className="absolute left-[6px] top-1.5 bottom-1.5 w-[1.5px] opacity-35"
            style={{ background: 'linear-gradient(var(--accent1), var(--accent2))' }}
          />
          {TIMELINE.map((h, i) => (
            <motion.div
              key={h.role}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative pb-[46px] last:pb-0"
            >
              <div
                className="absolute -left-[34px] top-1 w-[13px] h-[13px] rounded-full grad-bg"
                style={{ boxShadow: '0 0 0 4px var(--bg), 0 0 0 5px var(--border)' }}
              />
              <div className="font-mono-ui text-[12.5px] mb-1.5" style={{ color: 'var(--accent2)' }}>{h.period}</div>
              <div className="text-[19px] font-semibold">{h.role}</div>
              <div className="text-[14px] mb-3" style={{ color: 'var(--text-muted)' }}>{h.org}</div>
              <p className="text-[14.5px] leading-[1.75] max-w-[640px]" style={{ color: 'var(--text-muted)' }}>{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
