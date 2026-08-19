import { motion } from 'framer-motion'

export default function SectionHead({ kicker, title, desc, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className={`max-w-[640px] mb-14 ${className}`}
    >
      <span className="font-mono-ui text-[12.5px] uppercase tracking-[0.12em] block mb-[14px] grad-text">
        {kicker}
      </span>
      <h2 className="font-display font-bold mb-4 grad-text" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>
        {title}
      </h2>
      {desc && <p className="text-[16px] leading-[1.7]" style={{ color: 'var(--text-muted)' }}>{desc}</p>}
    </motion.div>
  )
}
