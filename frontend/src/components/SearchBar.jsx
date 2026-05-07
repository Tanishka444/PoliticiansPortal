import { useState } from 'react'

export default function SearchBar({ onSearch, loading }) {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch({ name: name.trim(), location: location.trim() })
  }

  const handleClear = () => {
    setName('')
    setLocation('')
    onSearch({ name: '', location: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by name…"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field pl-10"
          />
        </div>

        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Filter by location…"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input-field pl-10"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary whitespace-nowrap"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                Searching
              </span>
            ) : 'Search'}
          </button>
          {(name || location) && (
            <button
              type="button"
              onClick={handleClear}
              className="btn-outline whitespace-nowrap"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </form>
  )
}