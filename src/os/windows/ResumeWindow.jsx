export default function ResumeWindow() {
  return (
    <div className="p-6 font-mono-ui text-[13px] leading-[1.7] max-h-[440px] overflow-auto" style={{ color: 'var(--os-text-dim)' }}>
      <Section title="SUMMARY">
        Full Stack Developer with production experience across React.js, Node.js/Express.js,
        PostgreSQL, and REST APIs. Shipped a live SaaS platform and client production apps
        end-to-end — frontend, backend, auth, database design, and deployment.
      </Section>

      <Section title="EDUCATION">
        <div className="flex justify-between" style={{ color: 'var(--os-text)' }}>
          <strong>B.Tech CSE — ABES Engineering College (AKTU)</strong>
          <span>2024 – 2028</span>
        </div>
      </Section>

      <Section title="EXPERIENCE">
        <div className="flex justify-between mb-1" style={{ color: 'var(--os-text)' }}>
          <strong>BLS International — IT Trainee</strong>
          <span>Jun – Jul 2026</span>
        </div>
        <p className="mb-3">Solo-built a multi-step Visa Appointment Portal + Admin Control Panel. Groq API integration, 7 automated Selenium tests, 3 repos shipped in 2 months.</p>
        <div className="flex justify-between mb-1" style={{ color: 'var(--os-text)' }}>
          <strong>Digital Agency — Full-Stack Developer</strong>
          <span>Apr – Jul 2026</span>
        </div>
        <p>Managed a developer team across 2 client brand accounts (Auravie, ResonCare) — financial &amp; marketing decisions, client communication.</p>
      </Section>

      <Section title="PROJECTS">
        GradeWallah (SaaS, founder) · Sarvpratham Edu Consultants (client) · Prime Builders (client) ·
        DU College Predictor (client) · GreenPrint (carbon analytics) · ABES SGPA Calculator ·
        Shri Brij Mohan Gopal Seva Samiti (NGO) — details in projects.exe
      </Section>

      <Section title="CERTIFICATIONS">
        AWS Cloud Foundations · Deloitte Data Analytics (Forage) · JPMorgan SWE Simulation (Forage) ·
        CodeChef C++ STL · Unstop React.js · GSSoC 2025 · Hacktoberfest 2025
      </Section>

      <a
        href="/Daksh_Singhal_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2 underline"
        style={{ color: 'var(--os-accent)' }}
      >
        ↓ Download full PDF
      </a>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="mb-5">
      <div className="text-[11px] tracking-[0.08em] mb-1.5" style={{ color: 'var(--os-accent2)' }}>{title}</div>
      <div>{children}</div>
    </div>
  )
}
