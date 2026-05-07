import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import PoliticianCard from '../components/PoliticianCard'
import { searchPoliticians } from '../api/services'

export default function Search() {
  const [params, setParams] = useSearchParams()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState('')

  const doSearch = async ({ name, location }) => {
    setLoading(true)
    setError('')
    setSearched(true)
    try {
      const { data } = await searchPoliticians({ name, location })
      setResults(data.results || [])
      // Update URL params
      const p = {}
      if (name) p.name = name
      if (location) p.location = location
      setParams(p)
    } catch (err) {
      setError('Search failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Run search on mount if URL has params
  useEffect(() => {
    const name = params.get('name') || ''
    const location = params.get('location') || ''
    if (name || location) doSearch({ name, location })
  }, [])

  const SkeletonCard = () => (
    <div className="card p-5">
      <div className="flex gap-4">
        <div className="w-14 h-14 shimmer flex-shrink-0" />
        <div className="flex-1 space-y-2.5">
          <div className="h-4 shimmer w-3/4" />
          <div className="h-3 shimmer w-1/2" />
          <div className="h-3 shimmer w-2/5" />
        </div>
      </div>
    </div>
  )

  return (
    <main className="min-h-screen pt-16 pb-24">
      <div className="max-w-5xl mx-auto px-6 pt-14">
        {/* Header */}
        <div className="mb-10 fade-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold/60" />
            <span className="section-label">Politician Directory</span>
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-parchment">
            Search Politicians
          </h1>
          <p className="text-slate-portal text-sm font-body mt-2">
            Find your representative by name or constituency.
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-10 fade-up" style={{ animationDelay: '0.05s' }}>
          <SearchBar
            onSearch={doSearch}
            loading={loading}
            initialName={params.get('name') || ''}
            initialLocation={params.get('location') || ''}
          />
        </div>

        {/* Error */}
        {error && (
          <div className="border border-red-500/30 bg-red-500/8 px-4 py-3 text-red-400 text-sm font-body mb-6">
            {error}
          </div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Results */}
        {!loading && searched && (
          <>
            <div className="flex items-center justify-between mb-5">
              <span className="text-slate-portal text-sm font-body">
                {results.length === 0
                  ? 'No politicians found.'
                  : `${results.length} result${results.length !== 1 ? 's' : ''} found`}
              </span>
              <div className="h-px flex-1 bg-white/6 mx-4" />
            </div>

            {results.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((p, i) => (
                  <div key={p._id} className="fade-up" style={{ animationDelay: `${i * 0.04}s` }}>
                    <PoliticianCard politician={p} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border border-white/6">
                <div className="font-display text-5xl text-gold/10 mb-4">∅</div>
                <p className="text-slate-portal font-body text-sm">
                  No politicians match your search.
                </p>
                <p className="text-slate-portal/60 font-body text-xs mt-1">
                  Try different keywords or browse all.
                </p>
                <button
                  onClick={() => doSearch({ name: '', location: '' })}
                  className="btn-outline px-6 py-2 text-xs mt-6"
                >
                  Browse All
                </button>
              </div>
            )}
          </>
        )}

        {/* Initial state */}
        {!loading && !searched && (
          <div className="text-center py-20 border border-white/6 border-dashed">
            <div className="w-12 h-12 border border-gold/20 flex items-center justify-center mx-auto mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold/40">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <p className="text-slate-portal font-body text-sm">
              Enter a name or location to search
            </p>
            <button
              onClick={() => doSearch({ name: '', location: '' })}
              className="btn-outline px-6 py-2 text-xs mt-4"
            >
              Show All Politicians
            </button>
          </div>
        )}
      </div>
    </main>
  )
}