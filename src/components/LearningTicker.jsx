const ITEMS = ['📚 Currently learning: Advanced DSA', '🖥️ Operating Systems', '⚡ Always building something new']

export default function LearningTicker() {
  // Exactly two copies of the set, paired with a 0% ↔ -50% keyframe,
  // so the strip loops seamlessly with no jump or pause — flows continuously.
  const loopItems = [...ITEMS, ...ITEMS]
  return (
    <div className="relative overflow-hidden py-3" style={{ background: 'var(--bg-soft)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="flex gap-10 whitespace-nowrap animate-ticker w-max">
        {loopItems.map((item, i) => (
          <span key={i} className="font-mono-ui text-[13px] shrink-0" style={{ color: 'var(--text-muted)' }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
