import { useEffect, useRef } from 'react'

// Persistent desktop wallpaper — particle text that stays put until covered
// by windows. Only reacts when the cursor hovers over it; never auto-hides.
export default function ParticleName({ text = 'DAKSH SINGHAL' }) {
  const canvasRef = useRef(null)
  const pointerRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let w, h

    function resize() {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
      buildMask()
    }

    let maskData = null
    let maskW = 0, maskH = 0

    function buildMask() {
      const fontSize = Math.min(w / (6.5 + text.length * 0.15), 135)
      const off = document.createElement('canvas')
      off.width = w
      off.height = h
      const octx = off.getContext('2d')
      octx.font = `800 ${fontSize}px Arial`
      octx.textAlign = 'center'
      octx.textBaseline = 'middle'
      octx.fillStyle = '#fff'
      octx.fillText(text.toUpperCase(), w / 2, h / 2)
      maskData = octx.getImageData(0, 0, w, h).data
      maskW = w
      maskH = h
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      pointerRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    window.addEventListener('mousemove', onMove)

    function draw() {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#0a0c14'
      ctx.fillRect(0, 0, w, h)

      const cursor = pointerRef.current
      const cursorRadius = 130

      const step = 5
      for (let y = 0; y < maskH; y += step) {
        for (let x = 0; x < maskW; x += step) {
          const idx = (y * maskW + x) * 4
          if (maskData[idx + 3] > 100) {
            let dx = x, dy = y
            let color = '#22d3ee'
            let size = 1.6

            const cdx = x - cursor.x
            const cdy = y - cursor.y
            const cdist = Math.sqrt(cdx * cdx + cdy * cdy)
            if (cdist < cursorRadius) {
              const s = 1 - cdist / cursorRadius
              const ang = Math.atan2(cdy, cdx)
              dx += Math.cos(ang) * s * 24
              dy += Math.sin(ang) * s * 24
              color = '#ffd166'
              size = 1.6 + s * 1.6
            }

            ctx.fillStyle = Math.random() > 0.996 ? '#ff5fa2' : color
            ctx.fillRect(dx, dy, size, size)
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [text])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
