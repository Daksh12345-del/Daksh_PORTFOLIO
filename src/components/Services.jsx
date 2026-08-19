import { motion } from 'framer-motion'
import SectionHead from './SectionHead.jsx'
import { ServiceIcons } from './Icons.jsx'

const SERVICES = [
  {
    icon: ServiceIcons.code,
    title: 'Full-Stack Development',
    desc: 'End-to-end web apps — from database schema to deployed UI — built with React, Python, and modern cloud tooling.',
  },
  {
    icon: ServiceIcons.grid,
    title: 'Client Websites',
    desc: 'Responsive, production-ready websites for real businesses and organizations, from real estate to education to NGOs.',
  },
  {
    icon: ServiceIcons.pulse,
    title: 'Automation & Testing',
    desc: 'CI/CD pipelines and automation testing setups that catch issues early and keep deployments smooth.',
  },
  {
    icon: ServiceIcons.clock,
    title: 'Cloud & Deployment',
    desc: 'AWS-backed deployments and cloud fundamentals — compute, storage, networking, and security done right.',
  },
]

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-[120px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <SectionHead
          kicker="Services"
          title="What I do."
          desc="From client websites to internal automation tooling — here's where I focus my time."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass px-6 py-7"
            >
              <div className="w-[46px] h-[46px] rounded-[13px] flex items-center justify-center grad-bg mb-[18px]">
                {s.icon}
              </div>
              <div className="text-[17px] font-semibold mb-[10px]">{s.title}</div>
              <div className="text-[13.8px] leading-[1.7]" style={{ color: 'var(--text-muted)' }}>{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
