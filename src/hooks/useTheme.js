import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'vanishchat-theme'

function getSystemTheme() {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function applyTheme(theme) {
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const stored = getStoredTheme()
    if (stored === 'dark' || stored === 'light') return stored
    return 'system'
  })

  useEffect(() => {
    if (theme === 'system') {
      applyTheme(getSystemTheme())
    } else {
      applyTheme(theme)
    }
  }, [theme])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (theme === 'system') {
        applyTheme(getSystemTheme())
      }
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme])

  const setThemeValue = useCallback((value) => {
    setTheme(value)
    try {
      if (value === 'system') {
        localStorage.removeItem(STORAGE_KEY)
      } else {
        localStorage.setItem(STORAGE_KEY, value)
      }
    } catch {
      // ignore
    }
  }, [])

  const toggle = useCallback(() => {
    setThemeValue(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setThemeValue])

  return { theme, setTheme: setThemeValue, toggle, isDark: theme === 'dark' || (theme === 'system' && getSystemTheme() === 'dark') }
}
