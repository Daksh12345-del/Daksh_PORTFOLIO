export default function AboutWindow() {
  return (
    <div className="p-6 font-mono-ui text-[13.5px] leading-[1.85] max-h-[420px] overflow-auto" style={{ color: 'var(--os-text-dim)' }}>
      <div className="text-[22px] font-display font-bold mb-4" style={{ color: 'var(--os-text)' }}>Daksh Singhal</div>

      <p className="mb-4">
        <span style={{ color: 'var(--os-accent)' }}>{'> '}</span>
        Full Stack Developer and Computer Science undergraduate passionate about building software
        that makes a real difference — scalable, user-focused web apps using React.js, Node.js,
        PostgreSQL, and cloud services.
      </p>

      <p className="mb-4">
        <span style={{ color: 'var(--os-accent)' }}>{'> '}</span>
        B.Tech CSE, ABES Engineering College (AKTU), 2024 — 2028. Built SaaS platforms, client
        websites, and automation tooling — GradeWallah, GreenPrint, Sarvpratham, Prime Builders,
        and testing infrastructure at BLS International.
      </p>

      <p className="mb-4">
        <span style={{ color: 'var(--os-accent)' }}>{'> '}</span>
        Open source contributor — GSSoC 2025 &amp; Hacktoberfest 2025. AWS Cloud Foundations certified.
      </p>

      <p>
        <span style={{ color: 'var(--os-accent)' }}>{'> '}</span>
        Open to internships &amp; freelance work. Type{' '}
        <span style={{ color: 'var(--os-accent)' }}>open contact</span> in the terminal.
      </p>
    </div>
  )
}
