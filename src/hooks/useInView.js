import { useEffect, useRef, useState } from 'react'

export function useInView({ threshold = 0.15, rootMargin = '0px 0px -80px 0px', triggerOnce = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (triggerOnce) observer.unobserve(el)
        } else if (!triggerOnce) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce])

  return [ref, inView]
}

export function useStaggerInView({ threshold, rootMargin, triggerOnce } = {}) {
  const [ref, inView] = useInView({ threshold, rootMargin, triggerOnce })
  const getStaggerDelay = (index, base = 80) =>
    inView ? { animationDelay: `${index * base}ms`, animationFillMode: 'both' } : { opacity: 0 }
  return [ref, inView, getStaggerDelay]
}
