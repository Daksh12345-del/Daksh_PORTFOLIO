import { motion } from 'framer-motion'
import SectionHead from './SectionHead.jsx'

const HISTORY = [
  {
    period: 'Jun — Jul 2026',
    role: 'IT Trainee — Full Stack Development',
    org: 'BLS International Services Ltd. · ₹10,000/month stipend',
    desc: 'Solo-built a multi-step Visa Appointment Portal (email OTP verification, document upload with live checklist, reference number generation) plus an Admin Control Panel for counters, scheduling, and appointment tracking. Integrated REST APIs and the Groq API for AI-assisted features, automated 7 Selenium test cases, and shipped across 3 repositories within 2 months.',
  },

  {
    period: 'Apr — Jul 2026',
    role: 'Full-Stack Developer',
    org: 'Digital Agency (Auravie & ResonCare accounts)',
    desc: 'Managed a small developer team across 2 client brand accounts, supporting financial and marketing decisions alongside direct client communication. Also built an AI automation software tool for the agency\u2019s internal workflows. See "Client Work" below for details.',
  },
  {
    period: '2025',
    role: 'Founder',
    org: 'GradeWallah',
    desc: 'Built and launched an academic performance platform for university students — SGPA/CGPA tracking, study resources, and placement discovery — from idea to a live, publicly accessible product.',
  },
  {
    period: '2025',
    role: 'Open Source Contributor',
    org: 'GSSoC \u2019 25 & Hacktoberfest \u201925',
    desc: 'Contributed to open-source projects under GirlScript Summer of Code and Hacktoberfest — resolving issues, submitting pull requests, and improving documentation across repositories.',
  },
]

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-[120px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <SectionHead kicker="Experience" title="Where I've worked." />
        <div className="relative pl-[34px]">
          <div
            className="absolute left-[6px] top-1.5 bottom-1.5 w-[1.5px] opacity-35"
            style={{ background: 'linear-gradient(var(--accent1), var(--accent2))' }}
          />
          {HISTORY.map((h, i) => (
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
