export default function StatusBadge({ status, label }) {
  const variants = {
    connected: { dot: 'bg-emerald-400', ring: 'border-emerald-400/30', text: 'text-emerald-400', bg: 'bg-emerald-500/8' },
    connecting: { dot: 'bg-amber-400 motion-safe:animate-pulse-soft', ring: 'border-amber-400/30', text: 'text-amber-400', bg: 'bg-amber-500/8' },
    disconnected: { dot: 'bg-red-400', ring: 'border-red-400/30', text: 'text-red-400', bg: 'bg-red-500/8' },
    waiting: { dot: 'bg-slate-500 motion-safe:animate-pulse-soft', ring: 'border-slate-500/30', text: 'text-slate-400', bg: 'bg-slate-500/8' },
    online: { dot: 'bg-emerald-400', ring: 'border-emerald-400/30', text: 'text-emerald-400', bg: 'bg-emerald-500/8' },
    offline: { dot: 'bg-slate-500', ring: 'border-slate-500/30', text: 'text-slate-400', bg: 'bg-slate-500/8' },
  }

  const v = variants[status] || variants.offline

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${v.bg} ${v.text} ${v.ring} border backdrop-blur-sm`}>
      <span className="relative flex h-1.5 w-1.5">
        {(status === 'connected' || status === 'online') && (
          <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 motion-safe:animate-pulse-ring ${v.dot}`} />
        )}
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${v.dot}`} />
      </span>
      {label}
    </span>
  )
}
