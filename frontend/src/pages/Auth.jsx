import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signup, login } from '../api/services'

export default function Auth() {
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [form, setForm] = useState({ username: '', password: '', role: 'user' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('portalUser')) navigate('/')
  }, [])

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.username.trim() || !form.password.trim()) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    try {
      const fn = mode === 'signup' ? signup : login
      const payload = mode === 'signup'
        ? { username: form.username, password: form.password, role: form.role }
        : { username: form.username, password: form.password }

      const { data } = await fn(payload)
      localStorage.setItem('portalUser', JSON.stringify({ ...data.user, token: data.token }))

      if (data.user.role === 'politician') {
        navigate('/create-profile')
      } else {
        navigate('/search')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen pt-16 flex items-center justify-center px-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-1/4 top-1/3 w-96 h-96 bg-gold/4 rounded-full blur-3xl" />
        <div className="absolute right-1/4 bottom-1/3 w-64 h-64 bg-gold/3 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md fade-up">
        {/* Header */}
        <div className="text-center mb-3">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-8 bg-gold/40" />
            <span className="section-label text-[10px]">Transparency Portal</span>
            <div className="h-px w-8 bg-gold/40" />
          </div>
          <h1 className="font-display font-bold text-3xl text-parchment">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-slate-portal text-sm font-body mt-2">
            {mode === 'login'
              ? 'Sign in to access your account'
              : 'Join the transparency movement'}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex border border-white/10 mb-8">
          {['login', 'signup'].map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError('') }}
              className={`flex-1 py-2.5 text-sm font-body font-medium tracking-wide transition-all duration-200 ${
                mode === m
                  ? 'bg-gold text-ink'
                  : 'text-slate-portal hover:text-parchment'
              }`}
            >
              {m === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="section-label text-[10px] block mb-2">Username</label>
            <input
              name="username"
              type="text"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
              className="input-field"
            />
          </div>

          <div>
            <label className="section-label text-[10px] block mb-2">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              className="input-field"
            />
          </div>

          {mode === 'signup' && (
            <div>
              <label className="section-label text-[10px] block mb-2">Account Type</label>
              <div className="flex gap-3">
                {[
                  { value: 'user', label: 'Citizen', desc: 'Search & view profiles' },
                  { value: 'politician', label: 'Politician', desc: 'Create your profile' },
                ].map((r) => (
                  <label
                    key={r.value}
                    className={`flex-1 border p-3 cursor-pointer transition-all duration-200 ${
                      form.role === r.value
                        ? 'border-gold/60 bg-gold/8'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={r.value}
                      checked={form.role === r.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-3 h-3 border flex items-center justify-center ${form.role === r.value ? 'border-gold' : 'border-white/30'}`}>
                        {form.role === r.value && <div className="w-1.5 h-1.5 bg-gold" />}
                      </div>
                      <span className={`text-sm font-body font-medium ${form.role === r.value ? 'text-gold' : 'text-parchment/80'}`}>
                        {r.label}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-portal ml-5">{r.desc}</p>
                  </label>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="border border-red-500/30 bg-red-500/8 px-4 py-3 text-red-400 text-sm font-body">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 text-sm mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                {mode === 'login' ? 'Signing in…' : 'Creating account…'}
              </span>
            ) : (
              mode === 'login' ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        <p className="text-center text-slate-portal text-xs font-body mt-6">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }}
            className="text-gold hover:text-gold-light transition-colors duration-200"
          >
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </main>
  )
}