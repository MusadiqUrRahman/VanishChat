import { useEffect, useRef } from 'react'

const DEFAULT_TITLE = 'VanishChat — Ephemeral Private Chat'

export function useDocumentTitle(title, unreadCount = 0) {
  const defaultTitleRef = useRef(DEFAULT_TITLE)

  useEffect(() => {
    if (title) {
      if (unreadCount > 0 && document.hidden) {
        document.title = `(${unreadCount}) ${title}`
      } else {
        document.title = title
      }
    }

    return () => {
      document.title = defaultTitleRef.current
    }
  }, [title, unreadCount])

  useEffect(() => {
    const handler = () => {
      if (!document.hidden && title) {
        document.title = title
      }
    }
    document.addEventListener('visibilitychange', handler)
    return () => document.removeEventListener('visibilitychange', handler)
  }, [title])
}
