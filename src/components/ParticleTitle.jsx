import { useEffect, useRef } from 'react'

function lerp(c1, c2, t) {
  const a = c1.split(',').map(Number)
  const b = c2.split(',').map(Number)
  return `${Math.round(a[0] + (b[0] - a[0]) * t)},${Math.round(a[1] + (b[1] - a[1]) * t)},${Math.round(a[2] + (b[2] - a[2]) * t)}`
}

// Dot-matrix hero name — same technique used on the DAKSH_OS wallpaper,
// tuned to a warm gold → orange gradient with a bright hover halo.
export default function ParticleTitle({ text = 'DAKSH SINGHAL', className = '' }) {
  const canvasRef = useRef(null)
  const pointerRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf, w, h
    let maskData = null, maskW = 0, maskH = 0

    function isDark() {
      return !document.documentElement.classList.contains('light')
    }

    function buildMask() {
      const fontSize = Math.min(h * 0.66, w / (text.length * 0.6))
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

    function resize() {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
      buildMask()
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      pointerRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => { pointerRef.current = { x: -9999, y: -9999 } }
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)

    function draw() {
      if (!maskData) { raf = requestAnimationFrame(draw); return }
      ctx.clearRect(0, 0, w, h)
      const dark = isDark()
      const cursor = pointerRef.current
      const cursorRadius = 110
      const step = 4

      const stopA = dark ? '255,233,168' : '201,122,27'
      const stopB = dark ? '255,178,56' : '212,87,28'
      const stopC = dark ? '255,90,46' : '166,62,18'
      const hoverColor = dark ? '255,244,214' : '120,68,10'

      for (let y = 0; y < maskH; y += step) {
        for (let x = 0; x < maskW; x += step) {
          const idx = (y * maskW + x) * 4
          if (maskData[idx + 3] > 100) {
            let dx = x, dy = y
            const t = maskW ? x / maskW : 0
            let color = t < 0.5 ? lerp(stopA, stopB, t / 0.5) : lerp(stopB, stopC, (t - 0.5) / 0.5)
            let size = 1.7

            const cdx = x - cursor.x
            const cdy = y - cursor.y
            const cdist = Math.sqrt(cdx * cdx + cdy * cdy)
            if (cdist < cursorRadius) {
              const s = 1 - cdist / cursorRadius
              const ang = Math.atan2(cdy, cdx)
              dx += Math.cos(ang) * s * 18
              dy += Math.sin(ang) * s * 18
              color = hoverColor
              size = 1.7 + s * 1.8
            }

            ctx.fillStyle = `rgb(${color})`
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
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [text])

  return <canvas ref={canvasRef} className={`w-full block ${className}`} />
}
