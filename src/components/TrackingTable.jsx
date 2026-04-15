import { useEffect, useMemo, useState } from 'react'

const EVENTS_ENDPOINT = import.meta.env.VITE_TRACKING_EVENTS_ENDPOINT || '/api/events/recent?limit=300'

function formatDate(ts) {
  if (!ts) return '-'
  const d = new Date(ts)
  if (Number.isNaN(d.getTime())) return ts
  return d.toLocaleString('pt-BR', { hour12: false })
}

function getDedupKey(event) {
  if (event?.transaction_id) return `txn:${event.transaction_id}`
  if (event?.order_id) return `ord:${event.order_id}`
  if (event?.event_id) return `evt:${event.event_id}`
  return null
}

function computeRows(events) {
  const countByKey = new Map()
  for (const e of events) {
    const key = getDedupKey(e)
    if (!key) continue
    countByKey.set(key, (countByKey.get(key) || 0) + 1)
  }

  return events.map((event) => {
    const dedupKey = getDedupKey(event)
    const duplicates = dedupKey ? (countByKey.get(dedupKey) || 0) : 0
    const isDuplicate = duplicates > 1

    return {
      ...event,
      dedupKey,
      duplicates,
      isDuplicate,
      validationOk: event.payload_validation_ok !== false,
    }
  })
}

export default function TrackingTable() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [eventFilter, setEventFilter] = useState('all')
  const [sourceFilter, setSourceFilter] = useState('all')
  const [dupOnly, setDupOnly] = useState(false)

  async function loadEvents() {
    try {
      setError('')
      const res = await fetch(EVENTS_ENDPOINT, { cache: 'no-store' })
      if (!res.ok) throw new Error(`Falha ao carregar eventos (${res.status})`)
      const data = await res.json()
      const list = Array.isArray(data?.events) ? data.events : []
      setEvents(computeRows(list))
    } catch (err) {
      setError(err.message || 'Erro ao carregar eventos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEvents()
    const timer = setInterval(loadEvents, 30000)
    return () => clearInterval(timer)
  }, [])

  const eventTypes = useMemo(() => {
    return ['all', ...new Set(events.map((e) => e.event_name).filter(Boolean))]
  }, [events])

  const sources = useMemo(() => {
    return ['all', ...new Set(events.map((e) => e.source).filter(Boolean))]
  }, [events])

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()

    return events.filter((e) => {
      if (eventFilter !== 'all' && e.event_name !== eventFilter) return false
      if (sourceFilter !== 'all' && e.source !== sourceFilter) return false
      if (dupOnly && !e.isDuplicate) return false

      if (!query) return true
      const haystack = [e.event_name, e.source, e.event_id, e.order_id, e.transaction_id, e.user_id, e.external_id, e.dedupKey]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return haystack.includes(query)
    })
  }, [events, search, eventFilter, sourceFilter, dupOnly])

  const summary = useMemo(() => {
    const total = events.length
    const duplicates = events.filter((e) => e.isDuplicate).length
    const invalid = events.filter((e) => !e.validationOk).length
    const purchases = events.filter((e) => e.event_name === 'Purchase').length
    return { total, duplicates, invalid, purchases }
  }, [events])

  return (
    <main className="min-h-screen bg-[#0B0E14] text-white px-4 sm:px-6 lg:px-12 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs sm:text-sm uppercase tracking-[0.18em] text-orange-400/90">Tracking Manager</p>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">Hotmart ↔ Meta (CAPI)</h1>
            <p className="text-white/65 mt-2 text-sm">Visão operacional de eventos, validação de payload e deduplicação.</p>
          </div>

          <div className="flex gap-2">
            <button onClick={loadEvents} className="rounded-lg bg-white/10 border border-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/15">
              Atualizar
            </button>
            <a href="/" className="rounded-lg bg-[#FF6B00] px-4 py-2 text-sm font-semibold hover:bg-[#E66000]">
              Voltar ao site
            </a>
          </div>
        </div>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Eventos" value={summary.total} />
          <StatCard label="Purchases" value={summary.purchases} />
          <StatCard label="Duplicados" value={summary.duplicates} danger={summary.duplicates > 0} />
          <StatCard label="Payload inválido" value={summary.invalid} danger={summary.invalid > 0} />
        </section>

        <section className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por event_id, order_id, transaction_id..."
              className="md:col-span-2 rounded-lg bg-black/20 border border-white/15 px-3 py-2 text-sm outline-none focus:border-orange-400"
            />

            <select value={eventFilter} onChange={(e) => setEventFilter(e.target.value)} className="rounded-lg bg-black/20 border border-white/15 px-3 py-2 text-sm">
              {eventTypes.map((type) => (
                <option key={type} value={type}>{type === 'all' ? 'Todos os eventos' : type}</option>
              ))}
            </select>

            <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)} className="rounded-lg bg-black/20 border border-white/15 px-3 py-2 text-sm">
              {sources.map((source) => (
                <option key={source} value={source}>{source === 'all' ? 'Todas as origens' : source}</option>
              ))}
            </select>
          </div>

          <label className="inline-flex items-center gap-2 text-sm text-white/85">
            <input type="checkbox" checked={dupOnly} onChange={(e) => setDupOnly(e.target.checked)} />
            Mostrar somente possíveis duplicados
          </label>
        </section>

        <section className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
          {loading ? (
            <p className="p-6 text-white/70">Carregando eventos...</p>
          ) : error ? (
            <p className="p-6 text-red-300">{error}</p>
          ) : filtered.length === 0 ? (
            <p className="p-6 text-white/70">Nenhum evento encontrado com os filtros atuais.</p>
          ) : (
            <div className="overflow-auto">
              <table className="w-full text-sm min-w-[1100px]">
                <thead className="bg-white/10 text-left">
                  <tr>
                    <Th>Data</Th>
                    <Th>Evento</Th>
                    <Th>Origem</Th>
                    <Th>event_id</Th>
                    <Th>order_id</Th>
                    <Th>transaction_id</Th>
                    <Th>user_id / external_id</Th>
                    <Th>Dedup</Th>
                    <Th>Payload</Th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((e, idx) => (
                    <tr key={`${e.ts}-${e.event_id || idx}`} className="border-t border-white/10 hover:bg-white/[0.04]">
                      <Td>{formatDate(e.ts)}</Td>
                      <Td>{e.event_name || '-'}</Td>
                      <Td>{e.source || '-'}</Td>
                      <Td>{e.event_id || '-'}</Td>
                      <Td>{e.order_id || '-'}</Td>
                      <Td>{e.transaction_id || '-'}</Td>
                      <Td>
                        <div className="space-y-1">
                          <div>{e.user_id || '-'}</div>
                          <div className="text-xs text-white/60">{e.external_id || '-'}</div>
                        </div>
                      </Td>
                      <Td>
                        {e.dedupKey ? (
                          <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs ${e.isDuplicate ? 'text-red-300 border-red-500/50 bg-red-500/10' : 'text-emerald-300 border-emerald-500/40 bg-emerald-500/10'}`}>
                            {e.isDuplicate ? `duplicado (${e.duplicates}x)` : 'ok'}
                          </span>
                        ) : (
                          '-'
                        )}
                      </Td>
                      <Td>
                        <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs ${e.validationOk ? 'text-emerald-300 border-emerald-500/40 bg-emerald-500/10' : 'text-amber-300 border-amber-500/40 bg-amber-500/10'}`}>
                          {e.validationOk ? 'ok' : 'atenção'}
                        </span>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

function StatCard({ label, value, danger = false }) {
  return (
    <div className={`rounded-xl border p-4 ${danger ? 'border-red-500/40 bg-red-500/10' : 'border-white/10 bg-white/5'}`}>
      <p className="text-xs uppercase tracking-wider text-white/70">{label}</p>
      <p className="text-2xl font-extrabold mt-1">{value}</p>
    </div>
  )
}

function Th({ children }) {
  return <th className="px-3 py-2.5 text-white/85 font-semibold">{children}</th>
}

function Td({ children }) {
  return <td className="px-3 py-2.5 align-top text-white/90">{children}</td>
}
