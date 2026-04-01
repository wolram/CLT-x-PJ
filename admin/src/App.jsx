import { useState, useEffect, useCallback } from 'react'
import './App.css'
import {
  adminLogin,
  adminGetSubmissions,
  adminUpdateSubmissionStatus,
  adminGetTelemetrySummary,
} from '../../js/api-client.js'

const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || ''
const STATUS_OPTIONS = ['pending', 'contacted', 'scheduled', 'onboarded', 'not_interested']

function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [authError, setAuthError] = useState('')
  const [submissions, setSubmissions] = useState([])
  const [telemetry, setTelemetry] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [updating, setUpdating] = useState({})
  const [authHeader, setAuthHeader] = useState('')

  const handleLogin = useCallback((e) => {
    e.preventDefault()
    setAuthError('')
    
    const username = usernameInput || ADMIN_USERNAME
    const password = passwordInput || ADMIN_PASSWORD
    
    if (!password && !ADMIN_PASSWORD) {
      setAuthError('Password required')
      return
    }

    const { authHeader: header } = adminLogin(username, password)
    setAuthHeader(header)
    setAuthenticated(true)
  }, [usernameInput, passwordInput])

  const fetchData = useCallback(async () => {
    if (!authHeader) return
    
    setLoading(true)
    setError('')
    try {
      const submissionsData = await adminGetSubmissions(authHeader)
      const telemetryData = await adminGetTelemetrySummary(authHeader)

      setSubmissions(submissionsData || [])
      setTelemetry(telemetryData || { eventCounts: {}, totalEvents: 0 })
    } catch (err) {
      setError(`Failed to load data: ${err.message}`)
      setSubmissions([])
      setTelemetry(null)
    } finally {
      setLoading(false)
    }
  }, [authHeader])

  const exportCSV = useCallback(() => {
    if (!submissions.length) return
    const headers = ['Name', 'Email', 'Role', 'Challenge', 'Source', 'Date', 'Activation Status']
    const rows = submissions.map(s => [
      s.name || '',
      s.email || '',
      s.role || '',
      s.challenge || '',
      s.source || '',
      s.created_at || '',
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

  const updateStatus = useCallback(async (id, newStatus) => {
    setUpdating(prev => ({ ...prev, [id]: true }))
    try {
      await adminUpdateSubmissionStatus(authHeader, id, newStatus)
      setSubmissions(prev => prev.map(s => 
        s.id === id ? { ...s, activation_status: newStatus } : s
      ))
    } catch (err) {
      setError(`Failed to update status: ${err.message}`)
    } finally {
      setUpdating(prev => ({ ...prev, [id]: false }))
    }
  }, [authHeader])

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
              type="text"
              placeholder="Username"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              autoFocus
            />
            <input
              type="password"
              placeholder="Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
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
                    <td>{s.created_at ? new Date(s.created_at).toLocaleDateString('pt-BR') : '—'}</td>
                    <td>
                      <select
                        className={`status-select status-${(s.activation_status || 'unknown').toLowerCase()}`}
                        value={s.activation_status || 'pending'}
                        onChange={(e) => updateStatus(s.id, e.target.value)}
                        disabled={updating[s.id]}
                      >
                        {STATUS_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>
                            {opt.replace('_', ' ')}
                          </option>
                        ))}
                      </select>
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
