import { supabase } from './supabase'

const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function randomString(len = 6) {
  let out = ''
  const bytes = new Uint32Array(len)
  crypto.getRandomValues(bytes)
  for (let i = 0; i < len; i++) {
    out += CHARSET[bytes[i] % CHARSET.length]
  }
  return out
}

export async function generateChatId() {
  for (let attempt = 0; attempt < 3; attempt++) {
    const id = randomString(6)
    const { data, error } = await supabase
      .from('chats')
      .select('id')
      .eq('id', id)
      .maybeSingle()

    if (error) throw error
    if (!data) {
      return { id, secret: randomString(6) }
    }
  }
  throw new Error('Failed to generate unique chat ID after 3 attempts')
}
