import { useState, useEffect, useCallback } from 'react'
import './App.css'
import { supabase } from './lib/supabase'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || ''

function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [authError, setAuthError] = useState('')
  const [submissions, setSubmissions] = useState([])
  const [telemetry, setTelemetry] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = useCallback((e) => {
    e.preventDefault()
    if (ADMIN_PASSWORD && passwordInput === ADMIN_PASSWORD) {
      setAuthenticated(true)
      setAuthError('')
    } else if (!ADMIN_PASSWORD) {
      setAuthenticated(true)
      setAuthError('')
    } else {
      setAuthError('Senha incorreta')
    }
  }, [passwordInput])

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const { data: submissionsData, error: submissionsError } = await supabase
        .from('waitlist_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (submissionsError) throw submissionsError

      const { data: telemetryData, error: telemetryError } = await supabase
        .from('telemetry_events')
        .select('event_type')

      if (telemetryError) throw telemetryError

      const eventCounts = {}
      if (telemetryData) {
        telemetryData.forEach(event => {
          eventCounts[event.event_type] = (eventCounts[event.event_type] || 0) + 1
        })
      }

      setSubmissions(submissionsData || [])
      setTelemetry({ eventCounts, totalEvents: telemetryData?.length || 0 })
    } catch (err) {
      setError(`Failed to load data: ${err.message}`)
      setSubmissions([])
      setTelemetry(null)
    } finally {
      setLoading(false)
    }
  }, [])

  const exportCSV = useCallback(() => {
    if (!submissions.length) return
    const headers = ['Name', 'Email', 'Role', 'Challenge', 'Source', 'Date', 'Activation Status']
    const rows = submissions.map(s => [
      s.name || '',
      s.email || '',
      s.role || '',
      s.challenge || '',
      s.source || '',
      s.date || '',
      s.activation_status || ''
    ].map(v => `"${v.replace(/"/g, '""')}"`).join(','))
    const csv = [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `submissions-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }, [submissions])

  useEffect(() => {
    if (authenticated) fetchData()
  }, [authenticated, fetchData])

  if (!authenticated) {
    return (
      <div className="login-page">
        <div className="login-card">
          <h1>Admin — cltxpj.app.br</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Senha de acesso"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              autoFocus
            />
            <button type="submit">Entrar</button>
            {authError && <p className="error">{authError}</p>}
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Dashboard — cltxpj.app.br</h1>
        <button className="btn-export" onClick={exportCSV} disabled={!submissions.length}>
          Exportar CSV
        </button>
      </header>

      {error && <div className="alert alert-error">{error}</div>}
      {loading && <div className="loading">Carregando dados...</div>}

      {telemetry && (
        <section className="stats-section">
          <h2>Resumo de Eventos</h2>
          <div className="stats-grid">
            {Object.entries(telemetry.eventCounts || {}).map(([type, count]) => (
              <div key={type} className="stat-card">
                <span className="stat-value">{count}</span>
                <span className="stat-label">{type}</span>
              </div>
            ))}
            <div className="stat-card">
              <span className="stat-value">{submissions.length}</span>
              <span className="stat-label">Total Submissões</span>
            </div>
          </div>
        </section>
      )}

      <section className="submissions-section">
        <h2>Submissões da Waitlist</h2>
        {!loading && !submissions.length && (
          <p className="empty-state">Nenhuma submissão encontrada.</p>
        )}
        {submissions.length > 0 && (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Perfil</th>
                  <th>Desafio</th>
                  <th>Origem</th>
                  <th>Data</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s, i) => (
                  <tr key={s.id || i}>
                    <td>{s.name || '—'}</td>
                    <td>{s.email || '—'}</td>
                    <td>{s.role || '—'}</td>
                    <td className="cell-challenge">{s.challenge || '—'}</td>
                    <td>{s.source || '—'}</td>
                    <td>{s.date ? new Date(s.date).toLocaleDateString('pt-BR') : '—'}</td>
                    <td>
                      <span className={`status-badge status-${(s.activation_status || 'unknown').toLowerCase()}`}>
                        {s.activation_status || 'unknown'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}

export default App
