import { motion } from 'framer-motion'

const FACTS = [
  { k: 'Based in', v: 'New Delhi, IN' },
  { k: 'Education', v: 'B.Tech CSE, ABES Engg. College' },
  { k: 'Recent role', v: 'IT Trainee @ BLS International' },
  { k: 'Focus', v: 'Full-Stack + Automation' },
]

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-[120px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-full max-w-[340px] aspect-square mx-auto">
              <div className="absolute inset-0 rounded-[40%_60%_55%_45%/45%_40%_60%_55%] opacity-20 blur-md grad-bg animate-blobmove" />
              <div className="glass-strong absolute inset-4 rounded-[32px] overflow-hidden">
                <img src="/profile.jpg" alt="Daksh Singhal" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-[14px] mt-7">
              {FACTS.map((f) => (
                <div key={f.k} className="glass px-4 py-[14px]">
                  <div className="text-[12px] font-mono-ui uppercase tracking-[0.08em] mb-1" style={{ color: 'var(--text-faint)' }}>
                    {f.k}
                  </div>
                  <div className="text-[14.5px] font-semibold">{f.v}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="font-mono-ui text-[12.5px] uppercase tracking-[0.12em] block mb-[14px]" style={{ color: 'var(--accent2)' }}>
              About
            </span>
            <h2 className="font-display font-bold mb-4 grad-text" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>
              Building software that makes a real difference.
            </h2>
            <div className="space-y-[18px] text-[16px] leading-[1.85]" style={{ color: 'var(--text-muted)' }}>
              <p>
                Hi, I'm <strong style={{ color: 'var(--text)' }}>Daksh Singhal</strong>, a Full Stack Developer
                and Computer Science undergraduate passionate about creating software that makes a real
                difference. I love transforming ideas into scalable, user-focused web applications using
                modern technologies like React.js, Python, PostgreSQL, and cloud services.
              </p>
              <p>
                Over the past couple of years I've built{' '}
                <strong style={{ color: 'var(--text)' }}>SaaS platforms, client websites, and automation
                tooling</strong> — including GradeWallah, GreenPrint, and testing/automation solutions
                developed during my internship at BLS International.
              </p>
              <p>
                Whether it's improving student productivity, simplifying business operations, or solving
                everyday challenges through technology, I enjoy building products that people genuinely
                find useful.
              </p>
            </div>
            <a href="#contact" className="btn-primary inline-flex items-center gap-2 px-[26px] py-[13px] rounded-xl font-semibold text-[14.5px] mt-2 transition-transform hover:-translate-y-1">
              Let's talk about your project
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
