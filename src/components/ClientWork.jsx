import { motion } from 'framer-motion'
import SectionHead from './SectionHead.jsx'

const CLIENTS = [
  {
    name: 'Auravie',
    industry: 'Perfume Brand',
    desc: 'Managed the developer team building Auravie\u2019s digital presence, while also supporting financial planning and marketing-decision discussions for the brand. Issues were worked through directly with the client rather than escalated.',
  },
  {
    name: 'ResonCare',
    industry: 'Health Brand',
    desc: 'Led development work for ResonCare through a digital agency, coordinating the developer team and contributing to financial and marketing decisions alongside the client, resolving issues through open discussion as they came up.',
  },
]

function ClientCard({ c, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay }}
      whileHover={{ y: -5 }}
      className="glass p-[30px] flex flex-col gap-4"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-[13px] grad-bg flex items-center justify-center font-display font-bold text-white text-[16px] shrink-0">
          {c.name.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <div className="text-[18px] font-semibold leading-tight">{c.name}</div>
          <div className="text-[12.5px] font-mono-ui" style={{ color: 'var(--accent2)' }}>{c.industry}</div>
        </div>
      </div>
      <p className="text-[14.5px] leading-[1.7]" style={{ color: 'var(--text-muted)' }}>{c.desc}</p>
    </motion.div>
  )
}

export default function ClientWork() {
  return (
    <section id="client-work" className="relative py-24 md:py-[120px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <SectionHead
          kicker="Client Work"
          title="Brands I've built for."
          desc="Through agency work, I've owned developer coordination and financial/marketing decisions for the following client brands."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[22px]">
          {CLIENTS.map((c, i) => (
            <ClientCard key={c.name} c={c} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
