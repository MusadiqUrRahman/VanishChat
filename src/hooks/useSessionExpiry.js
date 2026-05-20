import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'

const EXPIRY_MS = 5 * 60 * 1000
const CHECK_INTERVAL_MS = 5000

export function useSessionExpiry(chatId, initialLastActivity, enabled = true) {
  const [lastActivity, setLastActivity] = useState(initialLastActivity || null)
  const [expired, setExpired] = useState(false)
  const expiringRef = useRef(false)
  const lastActivityRef = useRef(initialLastActivity || null)

  // Keep ref in sync with state for the interval to read latest value
  useEffect(() => {
    lastActivityRef.current = lastActivity
  }, [lastActivity])

  // If initial value changes (e.g. when chat validation resolves), seed it
  useEffect(() => {
    if (initialLastActivity && !lastActivity) {
      setLastActivity(initialLastActivity)
    }
  }, [initialLastActivity, lastActivity])

  const runExpiry = useCallback(async () => {
    if (expiringRef.current) return
    expiringRef.current = true
    try {
      await supabase.from('messages').delete().eq('chat_id', chatId)
    } catch (err) {
      console.warn('[useSessionExpiry] failed to delete messages', err)
    }
    try {
      await supabase.from('chats').update({ active: false }).eq('id', chatId)
    } catch (err) {
      console.warn('[useSessionExpiry] failed to deactivate chat', err)
    }
    setExpired(true)
  }, [chatId])

  useEffect(() => {
    if (!enabled || !chatId) return undefined
    if (expired) return undefined

    const interval = setInterval(() => {
      const last = lastActivityRef.current
      if (!last) return
      const lastMs = new Date(last).getTime()
      if (Number.isNaN(lastMs)) return
      if (Date.now() - lastMs >= EXPIRY_MS) {
        runExpiry()
      }
    }, CHECK_INTERVAL_MS)

    return () => clearInterval(interval)
  }, [enabled, chatId, expired, runExpiry])

  const bumpActivity = useCallback(async () => {
    if (!chatId || expiringRef.current || expired) return
    const nowIso = new Date().toISOString()
    // Optimistically update local state so the timer resets immediately
    setLastActivity(nowIso)
    lastActivityRef.current = nowIso
    try {
      const { error } = await supabase
        .from('chats')
        .update({ last_activity: nowIso })
        .eq('id', chatId)
      if (error) {
        console.warn('[useSessionExpiry] bumpActivity failed', error)
      }
    } catch (err) {
      console.warn('[useSessionExpiry] bumpActivity exception', err)
    }
  }, [chatId, expired])

  return { expired, lastActivity, bumpActivity }
}
