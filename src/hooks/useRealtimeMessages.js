import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'

const MESSAGE_TTL_MS = 60 * 1000
const FILTER_INTERVAL_MS = 5000

function isFresh(msg) {
  const created = new Date(msg.created_at).getTime()
  if (Number.isNaN(created)) return true
  return Date.now() - created < MESSAGE_TTL_MS
}

export function useRealtimeMessages(chatId) {
  const [messages, setMessages] = useState([])
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(null)
  const channelRef = useRef(null)

  useEffect(() => {
    if (!chatId) return undefined

    let cancelled = false
    setReady(false)
    setError(null)
    setMessages([])

    async function init() {
      const { data, error: fetchError } = await supabase
        .from('messages')
        .select('id, chat_id, content, sender, created_at')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true })
        .limit(200)

      if (cancelled) return

      if (fetchError) {
        setError(fetchError)
      } else if (data) {
        setMessages(data.filter(isFresh))
      }

      const channel = supabase
        .channel('chat:' + chatId)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: 'chat_id=eq.' + chatId,
          },
          (payload) => {
            const incoming = payload.new
            if (!incoming) return
            setMessages((prev) => {
              if (prev.some((m) => m.id === incoming.id)) return prev
              return [...prev, incoming]
            })
          }
        )
        .subscribe((status) => {
          if (cancelled) return
          if (status === 'SUBSCRIBED') {
            setReady(true)
          } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
            setError(new Error('Realtime channel error: ' + status))
          }
        })

      channelRef.current = channel
    }

    init()

    const filterInterval = setInterval(() => {
      setMessages((prev) => {
        const next = prev.filter(isFresh)
        return next.length === prev.length ? prev : next
      })
    }, FILTER_INTERVAL_MS)

    return () => {
      cancelled = true
      clearInterval(filterInterval)
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current)
        channelRef.current = null
      }
      setReady(false)
    }
  }, [chatId])

  const sendMessage = useCallback(
    async (content, sender) => {
      const trimmed = (content ?? '').trim()
      if (!trimmed) throw new Error('Message is empty')
      if (trimmed.length > 1000) throw new Error('Message exceeds 1000 characters')
      if (!chatId) throw new Error('No chat id')
      if (sender !== 'A' && sender !== 'B') throw new Error('Invalid sender')

      const { data, error: insertError } = await supabase
        .from('messages')
        .insert({ chat_id: chatId, content: trimmed, sender })
        .select()
        .single()

      if (insertError) throw insertError

      // Fire-and-forget best-effort cleanup of stale messages for this chat.
      const cutoff = new Date(Date.now() - MESSAGE_TTL_MS).toISOString()
      supabase
        .from('messages')
        .delete()
        .eq('chat_id', chatId)
        .lt('created_at', cutoff)
        .then(({ error: deleteError }) => {
          if (deleteError) {
            console.warn('[useRealtimeMessages] stale cleanup failed', deleteError)
          }
        })

      return data
    },
    [chatId]
  )

  return { messages, sendMessage, ready, error }
}
