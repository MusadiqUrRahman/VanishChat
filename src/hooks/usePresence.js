import { useEffect, useRef, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function usePresence(chatId, onConnectionStatus, onPresenceChange) {
  const [sender, setSender] = useState(null)
  const [blocked, setBlocked] = useState(false)
  const [ready, setReady] = useState(false)
  const keyRef = useRef(null)
  const channelRef = useRef(null)

  if (keyRef.current === null) {
    keyRef.current =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2) + '-' + Date.now().toString(36)
  }

  const handlePresence = useCallback((channel) => {
    const state = channel.presenceState()
    const entries = []
    for (const key of Object.keys(state)) {
      const metas = state[key]
      if (!metas || metas.length === 0) continue
      let joinedAt = null
      for (const m of metas) {
        const t = m && m.joined_at ? m.joined_at : null
        if (t && (joinedAt === null || t < joinedAt)) {
          joinedAt = t
        }
      }
      entries.push({ key, joined_at: joinedAt || '' })
    }
    entries.sort((a, b) => {
      if (a.joined_at < b.joined_at) return -1
      if (a.joined_at > b.joined_at) return 1
      if (a.key < b.key) return -1
      if (a.key > b.key) return 1
      return 0
    })
    const myKey = keyRef.current
    const idx = entries.findIndex((e) => e.key === myKey)

    if (idx === 0) {
      setSender('A')
      setBlocked(false)
    } else if (idx === 1) {
      setSender('B')
      setBlocked(false)
    } else if (idx >= 2) {
      setSender(null)
      setBlocked(true)
    }

    const otherCount = entries.length - 1
    onPresenceChange?.(otherCount > 0)
  }, [onPresenceChange])

  useEffect(() => {
    if (!chatId) return undefined

    let cancelled = false
    let tracked = false
    setSender(null)
    setBlocked(false)
    setReady(false)
    onConnectionStatus?.('CONNECTING')

    const myKey = keyRef.current

    const channel = supabase.channel('presence:' + chatId, {
      config: { presence: { key: myKey } },
    })

    channel
      .on('presence', { event: 'sync' }, () => {
        if (cancelled) return
        handlePresence(channel)
        setReady(true)
      })
      .subscribe(async (status) => {
        if (cancelled) return
        onConnectionStatus?.(status)
        if (status === 'SUBSCRIBED' && !tracked) {
          tracked = true
          try {
            await channel.track({ joined_at: new Date().toISOString() })
          } catch {
            // ignore
          }
          handlePresence(channel)
        }
      })

    channelRef.current = channel

    return () => {
      cancelled = true
      if (channelRef.current) {
        try {
          channelRef.current.untrack()
        } catch {
          // ignore
        }
        supabase.removeChannel(channelRef.current)
        channelRef.current = null
      }
      setReady(false)
      onConnectionStatus?.('CLOSED')
    }
  }, [chatId, onConnectionStatus, handlePresence])

  return { sender, blocked, ready }
}
