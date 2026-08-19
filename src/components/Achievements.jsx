import { motion } from 'framer-motion'
import SectionHead from './SectionHead.jsx'
import { ServiceIcons } from './Icons.jsx'

const ACHIEVEMENTS = [
  {
    icon: ServiceIcons.pulse,
    title: 'Internship Impact',
    desc: 'Delivered a production visa appointment portal in 2 months at BLS International — multi-step flows, admin tooling, API integration, and automated testing, solo.',
  },
  {
    icon: ServiceIcons.code,
    title: 'Independent Delivery',
    desc: 'Shipped multiple full-stack applications solo — each with functional backends, databases, and live production deployments.',
  },
  {
    icon: ServiceIcons.grid,
    title: 'E-Cell Competition',
    desc: 'Participated in an E-Cell competition, demonstrating entrepreneurial thinking and problem-solving under real constraints.',
  },
  {
    icon: ServiceIcons.clock,
    title: 'Open Source, Twice Over',
    desc: 'Selected as a contributor for both GirlScript Summer of Code 2025 and Hacktoberfest 2025 — two global open-source programs in the same year.',
  },
]

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-24 md:py-[120px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <SectionHead
          kicker="Achievements"
          title="Moments worth mentioning."
          desc="A few milestones that stood out along the way."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass px-6 py-7"
            >
              <div className="w-[46px] h-[46px] rounded-[13px] flex items-center justify-center grad-bg mb-[18px]">
                {a.icon}
              </div>
              <div className="text-[17px] font-semibold mb-[10px]">{a.title}</div>
              <div className="text-[13.8px] leading-[1.7]" style={{ color: 'var(--text-muted)' }}>{a.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
