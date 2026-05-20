import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 40
const COLORS_LIGHT = ['rgba(5,150,105,0.12)', 'rgba(5,150,105,0.06)', 'rgba(16,185,129,0.08)']
const COLORS_DARK = ['rgba(52,211,153,0.15)', 'rgba(52,211,153,0.08)', 'rgba(110,231,183,0.10)']

export default function Particles({ className = '', density = PARTICLE_COUNT }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let particles = []
    let mouse = { x: -1000, y: -1000 }

    function resize() {
      canvas.width = canvas.parentElement.offsetWidth
      canvas.height = canvas.parentElement.offsetHeight
    }

    function createParticles() {
      const isDark = document.documentElement.classList.contains('dark')
      const colors = isDark ? COLORS_DARK : COLORS_LIGHT
      return Array.from({ length: density }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
      }))
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          p.vx -= dx * 0.0003
          p.vy -= dy * 0.0003
        }

        p.vx = Math.max(-1, Math.min(1, p.vx))
        p.vy = Math.max(-1, Math.min(1, p.vy))

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
      }

      ctx.globalAlpha = 0.06
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            const isDark = document.documentElement.classList.contains('dark')
            ctx.strokeStyle = isDark ? 'rgba(52,211,153,0.08)' : 'rgba(5,150,105,0.06)'
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1

      animRef.current = requestAnimationFrame(draw)
    }

    resize()
    particles = createParticles()

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const handleResize = () => {
      resize()
      particles = createParticles()
    }

    window.addEventListener('resize', handleResize)
    canvas.addEventListener('mousemove', handleMouse)
    draw()

    return () => {
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouse)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [density])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  )
}
