import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHead from './SectionHead.jsx'
import { CloseIcon } from './Icons.jsx'

const CERTIFICATIONS = [
  { name: 'IT Trainee Internship Certificate', org: 'BLS International', tag: 'Intern', image: '/certificates/bls-internship-certificate.jpg' },
  { name: 'AWS Cloud Foundations', org: 'Amazon Web Services', tag: 'Cloud', image: '/certificates/aws-cloud-foundations.jpg' },
  { name: 'Data Analytics Job Simulation', org: 'Deloitte (Forage)', tag: 'Data', image: '/certificates/deloitte-data-analytics.jpg' },
  { name: 'Software Engineering Virtual Experience', org: 'JPMorgan Chase (Forage)', tag: 'SWE', image: '/certificates/jpmorgan-swe-simulation.jpg' },
  { name: 'C++ STL Certification', org: 'CodeChef', tag: 'DSA', image: '/certificates/codechef-cpp-stl.jpg' },
  { name: 'React.js Unfiltered', org: 'AIALCHEMIST · Unstop', tag: 'Frontend', image: '/certificates/unstop-react.jpg' },
  { name: 'Build an AI Chatbot with Python & DeepSeek', org: 'SkillEcted', tag: 'AI/Python', image: '/certificates/deepseek-python.jpg' },
  { name: 'Blockchain Certification', org: 'Verified Course', tag: 'Blockchain', image: null },
]

const OPEN_SOURCE = [
  { name: 'GSSoC \u201925', desc: 'Open Source Contributor — GirlScript Summer of Code', image: '/certificates/gssoc-2025.jpg' },
  { name: 'Hacktoberfest \u201925', desc: 'Open Source Contributor — code & documentation PRs', image: null },
]

function Badge({ name, org, tag, delay, image, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      onClick={() => image && onOpen({ name, org, image })}
      className="glass px-5 py-4 flex items-center gap-4"
      style={{ cursor: image ? 'pointer' : 'default' }}
    >
      <div className="w-11 h-11 rounded-[12px] flex items-center justify-center grad-bg shrink-0 font-display font-bold text-white text-[13px]">
        {tag}
      </div>
      <div className="flex-1">
        <div className="text-[14.5px] font-semibold leading-snug">{name}</div>
        <div className="text-[12.5px]" style={{ color: 'var(--text-muted)' }}>{org}</div>
      </div>
      {image && (
        <span className="text-[12px] font-mono-ui shrink-0" style={{ color: 'var(--accent2)' }}>View</span>
      )}
    </motion.div>
  )
}

function CertModal({ cert, onClose }) {
  if (!cert) return null
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
        style={{ background: 'rgba(6,8,14,0.8)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-strong w-full max-w-[720px] rounded-[22px] overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <div>
              <div className="text-[15px] font-semibold">{cert.name}</div>
              <div className="text-[12.5px]" style={{ color: 'var(--text-muted)' }}>{cert.org}</div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="w-9 h-9 rounded-full flex items-center justify-center border shrink-0"
              style={{ borderColor: 'var(--border)' }}
            >
              <CloseIcon />
            </button>
          </div>
          <img src={cert.image} alt={cert.name} className="w-full h-auto" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Testimonials() {
  const [active, setActive] = useState(null)

  return (
    <section id="certifications" className="relative py-24 md:py-[120px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <SectionHead
          kicker="Certifications & Open Source"
          title="Always learning, always shipping."
          desc="A mix of cloud, DSA, and industry-simulation certifications, plus active contributions to global open-source programs. Click any card to view the certificate."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px] mb-[54px]">
          {CERTIFICATIONS.map((c, i) => (
            <Badge key={c.name} {...c} delay={i * 0.06} onOpen={setActive} />
          ))}
        </div>

        <div className="text-[13px] font-mono-ui uppercase tracking-[0.08em] mb-[18px]" style={{ color: 'var(--text-faint)' }}>
          Open Source
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
          {OPEN_SOURCE.map((o, i) => (
            <motion.div
              key={o.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              onClick={() => o.image && setActive({ name: o.name, org: 'Open Source', image: o.image })}
              className="glass p-6"
              style={{ cursor: o.image ? 'pointer' : 'default' }}
            >
              <div className="text-[17px] font-semibold mb-1.5">{o.name}</div>
              <div className="text-[13.8px] leading-[1.7]" style={{ color: 'var(--text-muted)' }}>{o.desc}</div>
              {o.image && (
                <span className="text-[12px] font-mono-ui mt-2 inline-block" style={{ color: 'var(--accent2)' }}>View badge</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      <CertModal cert={active} onClose={() => setActive(null)} />
    </section>
  )
}
