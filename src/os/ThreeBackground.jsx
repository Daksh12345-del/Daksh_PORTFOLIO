import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Lightweight rotating particle-grid backdrop for the Projects page.
export default function ThreeBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const width = mount.clientWidth
    const height = mount.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
    camera.position.z = 14

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    // Particle grid
    const count = 700
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const cyan = new THREE.Color('#22d3ee')
    const pink = new THREE.Color('#ff5fa2')

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14
      const c = Math.random() > 0.85 ? pink : cyan
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    let raf
    function animate() {
      points.rotation.y += 0.0009
      points.rotation.x += 0.0003
      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    animate()

    function onResize() {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" />
}
