import { useState, useRef, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import BootScreen from './os/BootScreen.jsx'
import ParticleName from './os/ParticleName.jsx'
import TopBar from './os/TopBar.jsx'
import Dock from './os/Dock.jsx'
import Window from './os/Window.jsx'
import TerminalWindow from './os/windows/TerminalWindow.jsx'
import AboutWindow from './os/windows/AboutWindow.jsx'
import SkillsWindow from './os/windows/SkillsWindow.jsx'
import ProjectsWindow from './os/windows/ProjectsWindow.jsx'
import ResumeWindow from './os/windows/ResumeWindow.jsx'
import AgentWindow from './os/windows/AgentWindow.jsx'
import ContactWindow from './os/windows/ContactWindow.jsx'
import BrowserWindow from './os/windows/BrowserWindow.jsx'

// Positions are percentages of viewport (w%, h%) so windows spread across
// the FULL screen instead of clustering in one corner.
const WINDOW_DEFS = {
  terminal: { title: 'terminal — daksh.sh', width: 440, height: 420, xPct: 0.04, yPct: 0.12 },
  about: { title: 'about.md', width: 460, height: 380, xPct: 0.30, yPct: 0.10 },
  skills: { title: 'skills.json', width: 400, height: 460, xPct: 0.05, yPct: 0.50 },
  projects: { title: 'projects.exe', width: 600, height: 520, xPct: 0.34, yPct: 0.42 },
  resume: { title: 'resume.pdf', width: 460, height: 480, xPct: 0.58, yPct: 0.08 },
  agent: { title: 'daksh.agent — live', width: 440, height: 500, xPct: 0.60, yPct: 0.46 },
  contact: { title: 'contact.sh', width: 400, height: 460, xPct: 0.68, yPct: 0.14 },
  browser: { title: 'daksh.dev — browser', width: 720, height: 560, xPct: 0.14, yPct: 0.08 },
}

function WindowContent({ id, onOpen, onNameChange }) {
  switch (id) {
    case 'terminal': return <TerminalWindow onOpen={onOpen} onNameChange={onNameChange} />
    case 'about': return <AboutWindow />
    case 'skills': return <SkillsWindow />
    case 'projects': return <ProjectsWindow />
    case 'resume': return <ResumeWindow />
    case 'agent': return <AgentWindow onOpen={onOpen} onNameChange={onNameChange} />
    case 'contact': return <ContactWindow />
    case 'browser': return <BrowserWindow />
    default: return null
  }
}

export default function OsApp() {
  const [booted, setBooted] = useState(false)
  const [order, setOrder] = useState([])
  const [wallpaperName, setWallpaperName] = useState('DAKSH SINGHAL')
  const [viewport, setViewport] = useState({ w: typeof window !== 'undefined' ? window.innerWidth : 1280, h: typeof window !== 'undefined' ? window.innerHeight : 800 })
  const deskRef = useRef(null)

  useEffect(() => {
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const openWindow = (id) => {
    if (!WINDOW_DEFS[id]) return
    setOrder((prev) => (prev.includes(id) ? [...prev.filter((x) => x !== id), id] : [...prev, id]))
  }
  const closeWindow = (id) => setOrder((prev) => prev.filter((x) => x !== id))
  const focusWindow = (id) => setOrder((prev) => (prev[prev.length - 1] === id ? prev : [...prev.filter((x) => x !== id), id]))

  const isMobile = viewport.w < 640

  return (
    <div className="os-root min-h-screen relative overflow-hidden" ref={deskRef}>
      {!booted && <BootScreen onDone={() => setBooted(true)} />}
      {booted && (
        <>
          <TopBar />
          <div className="absolute inset-0 pt-[70px] pb-[110px]">
            <ParticleName text={wallpaperName} />
            <AnimatePresence>
              {order.map((id, i) => {
                const def = WINDOW_DEFS[id]
                const effWidth = isMobile ? Math.min(def.width, viewport.w - 32) : def.width
                const stagger = i * 26 // slight cascade so repeated opens don't sit exactly on top of each other
                const rawX = isMobile ? 16 : def.xPct * viewport.w + stagger
                const rawY = def.yPct * viewport.h + stagger
                const maxX = Math.max(16, viewport.w - effWidth - 16)
                const maxY = Math.max(16, viewport.h - def.height - 130)
                const effX = isMobile ? 16 : Math.min(rawX, maxX)
                const effY = Math.min(rawY, maxY)
                return (
                  <Window
                    key={id}
                    id={id}
                    title={def.title}
                    x={effX}
                    y={effY}
                    width={effWidth}
                    zIndex={100 + i}
                    onClose={closeWindow}
                    onFocus={focusWindow}
                    dragConstraintsRef={deskRef}
                  >
                    <WindowContent id={id} onOpen={openWindow} onNameChange={setWallpaperName} />
                  </Window>
                )
              })}
            </AnimatePresence>
          </div>
          <Dock openIds={order} onOpen={openWindow} />
        </>
      )}
    </div>
  )
}
