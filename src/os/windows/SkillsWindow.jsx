const GROUPS = [
  { title: 'LANGUAGES', items: ['JavaScript', 'C++', 'HTML5', 'CSS3', 'SQL'] },
  { title: 'FRAMEWORKS / LIBRARIES', items: ['React.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'Framer Motion'] },
  { title: 'DATABASES & CLOUD', items: ['PostgreSQL', 'Supabase', 'AWS', 'Vercel'] },
  { title: 'TOOLS', items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Selenium'] },
]

export default function SkillsWindow() {
  return (
    <div className="p-6 font-mono-ui max-h-[420px] overflow-auto">
      {GROUPS.map((g) => (
        <div key={g.title} className="mb-6 last:mb-0">
          <div className="text-[11px] tracking-[0.08em] mb-2.5" style={{ color: 'var(--os-accent2)' }}>{g.title}</div>
          <div className="flex flex-wrap gap-2">
            {g.items.map((s) => (
              <span
                key={s}
                className="text-[12.5px] px-3 py-1.5 rounded-[7px]"
                style={{ border: '1px solid var(--os-border)', color: 'var(--os-text)' }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
