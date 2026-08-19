import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SectionHead from './SectionHead.jsx'
import { GithubIcon } from './Icons.jsx'

const USERNAME = 'Daksh12345-del'

const STAT_LABELS = {
  public_repos: 'Public repos',
  followers: 'Followers',
  following: 'Following',
}

export default function GithubActivity() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`https://api.github.com/users/${USERNAME}`)
      .then((res) => {
        if (!res.ok) throw new Error('fail')
        return res.json()
      })
      .then(setData)
      .catch(() => setError(true))
  }, [])

  return (
    <section id="github" className="relative py-24 md:py-[120px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <SectionHead
          kicker="GitHub Activity"
          title="Code, committed."
          desc="A live look at my public GitHub activity — repos, contributions, and everything in between."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="glass p-[26px] md:p-[34px]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-6">
            <div className="flex items-center gap-4">
              {data?.avatar_url && (
                <img src={data.avatar_url} alt="GitHub avatar" className="w-14 h-14 rounded-full border" style={{ borderColor: 'var(--border)' }} />
              )}
              <div>
                <div className="text-[17px] font-semibold">@{USERNAME}</div>
                <div className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
                  {error ? 'Live stats unavailable right now' : data ? 'GitHub profile' : 'Loading...'}
                </div>
              </div>
            </div>
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-[18px] py-[10px] rounded-xl font-semibold text-[13.5px] border shrink-0"
              style={{ borderColor: 'var(--border)' }}
            >
              <GithubIcon /> View profile
            </a>
          </div>

          {!error && (
            <div className="grid grid-cols-3 gap-[14px] mb-7">
              {Object.entries(STAT_LABELS).map(([key, label]) => (
                <div key={key} className="glass px-4 py-[16px] text-center">
                  <div className="font-display font-bold text-[26px]">{data ? data[key] : '—'}</div>
                  <div className="text-[12px] mt-1" style={{ color: 'var(--text-muted)' }}>{label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="rounded-[16px] overflow-hidden" style={{ background: 'var(--bg-soft)' }}>
            <img
              src={`https://ghchart.rshah.org/6c63ff/${USERNAME}`}
              alt="GitHub contribution chart"
              className="w-full block"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
