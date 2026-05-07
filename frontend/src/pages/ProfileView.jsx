import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getPoliticianById } from '../api/services'

const initials = (name) =>
  name?.split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase() || '??'

const ListSection = ({ icon, title, items, emptyMsg }) => (
  <div>

    <div className="flex items-center gap-3 mb-4">
      <span className="text-gold">{icon}</span>

      <h3 className="font-display font-semibold text-parchment text-base">
        {title}
      </h3>

      <div className="h-px flex-1 bg-white/6" />

      <span className="font-mono text-gold/40 text-xs">
        {items.length}
      </span>
    </div>

    {items.length > 0 ? (

      <ul className="space-y-2">

        {items.map((item, i) => (

          <li
            key={i}
            className="flex items-start gap-3 text-sm font-body text-parchment/80"
          >

            <span className="text-gold/40 font-mono text-xs mt-0.5 flex-shrink-0 w-4">
              {String(i + 1).padStart(2, '0')}
            </span>

            <span className="leading-relaxed">
              {item}
            </span>

          </li>
        ))}

      </ul>

    ) : (

      <p className="text-slate-portal/60 text-sm font-body italic">
        {emptyMsg}
      </p>

    )}

  </div>
)

export default function ProfileView() {

  const { id } = useParams()

  const navigate = useNavigate()

  const [politician, setPolitician] = useState(null)

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState('')

  useEffect(() => {

    getPoliticianById(id)
      .then(({ data }) => setPolitician(data.politician))
      .catch(() =>
        setError('Politician not found or an error occurred.')
      )
      .finally(() => setLoading(false))

  }, [id])

  if (loading) {

    return (
      <main className="min-h-screen pt-16 flex items-center justify-center">

        <div className="text-center">

          <div className="w-8 h-8 border border-gold/30 border-t-gold animate-spin mx-auto mb-4" />

          <p className="text-slate-portal text-sm font-body">
            Loading profile…
          </p>

        </div>

      </main>
    )
  }

  if (error || !politician) {

    return (
      <main className="min-h-screen pt-16 flex items-center justify-center">

        <div className="text-center">

          <div className="font-display text-6xl text-gold/10 mb-4">
            404
          </div>

          <p className="text-slate-portal font-body text-sm mb-6">
            {error || 'Profile not found.'}
          </p>

          <Link
            to="/search"
            className="btn-outline px-6 py-2 text-sm"
          >
            ← Back to Search
          </Link>

        </div>

      </main>
    )
  }

  const {
    name,
    party,
    location,
    promises = [],
    achievements = [],
    contact = {},
    image,
    slogan,
    partySymbol,
    politicalHistory = [],
  } = politician

  return (
    <main className="min-h-screen pt-16 pb-24">

      {/* Hero */}
      <div className="border-b border-white/8 bg-ink-light/50">

        <div className="max-w-5xl mx-auto px-6 pt-14 pb-10">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-portal hover:text-parchment text-xs font-body transition-colors duration-200 mb-8"
          >

            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>

            Back to results

          </button>

          <div className="flex flex-col sm:flex-row gap-6 items-start fade-up">

            {/* Profile Image */}
            <div className="relative flex flex-col items-center flex-shrink-0">

              {image ? (

                <img
                  src={image}
                  alt={name}
                  className="w-28 h-28 rounded-full object-cover border-2 border-gold/30"
                />

              ) : (

                <div className="w-28 h-28 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center">

                  <span className="font-display font-bold text-gold text-3xl">
                    {initials(name)}
                  </span>

                </div>
              )}

              {/* Party Logo */}
              {partySymbol && (

                <img
                  src={partySymbol}
                  alt="party"
                  className="w-12 h-12 rounded-full object-cover absolute bottom-10 -right-1 border-4 border-black shadow-lg"
                />

              )}

              {/* Running Slogan */}
              {slogan && (
                <div className="w-52 overflow-hidden border border-gold/20 bg-gold/10 rounded-lg mt-5">

                  <div className="whitespace-nowrap animate-marquee py-2 px-3 text-gold font-semibold text-xs">
                    ★ {slogan} ★ {slogan} ★ {slogan} ★
                  </div>

                </div>
              )}

            </div>

            {/* Main Identity */}
            <div className="flex-1">

              <span className="section-label text-[10px]">
                Politician Profile
              </span>

              <h1 className="font-display font-black text-4xl text-parchment mt-2">
                {name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mt-4">

                <span className="font-mono text-gold text-sm border border-gold/20 px-3 py-1">
                  {party}
                </span>

                <div className="flex items-center gap-2 text-slate-portal text-sm">

                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>

                  {location}

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-6 pt-10">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Main Content */}
          <div className="md:col-span-2 space-y-10">

            {/* Political Timeline */}
            <section>

              <div className="flex items-center gap-3 mb-1">

                <h2 className="font-display text-l text-parchment">
                  Political Journey
                </h2>

                <div className="h-px flex-1 bg-white/10" />

              </div>

              {politicalHistory.length > 0 ? (

                <div className="space-y-6 border-l border-gold/20 pl-6 ml-2">

                  {politicalHistory.map((item, index) => (

                    <div
                      key={index}
                      className="relative"
                    >

                      <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-gold border border-black" />

                      <p className="text-gold font-mono text-sm mb-1">
                        {item.year}
                      </p>

                      <h3 className="text-parchment font-semibold text-lg">
                        {item.title}
                      </h3>

                      <p className="text-slate-portal text-sm mt-1 leading-relaxed">
                        {item.description}
                      </p>

                    </div>
                  ))}

                </div>

              ) : (

                <p className="text-slate-portal/60 italic text-sm">
                  No political history available.
                </p>

              )}

            </section>

            <div className="h-px bg-white/6" />

            {/* Promises */}
            <ListSection
              icon="✓"
              title="Promises"
              items={promises}
              emptyMsg="No promises listed yet."
            />

            <div className="h-px bg-white/6" />

            {/* Achievements */}
            <ListSection
              icon="🏆"
              title="Achievements"
              items={achievements}
              emptyMsg="No achievements listed yet."
            />

          </div>

          {/* Sidebar */}
          <div>

            <div className="card p-5 sticky top-24">

              <h3 className="section-label text-[10px] mb-4">
                Contact Information
              </h3>

              <div className="space-y-4">

                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="block text-sm text-parchment hover:text-gold"
                  >
                    📧 {contact.email}
                  </a>
                )}

                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="block text-sm text-parchment hover:text-gold"
                  >
                    📞 {contact.phone}
                  </a>
                )}

                {contact.website && (
                  <a
                    href={contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-parchment hover:text-gold"
                  >
                    🌐 Official Website
                  </a>
                )}

              </div>

              <div className="mt-6 pt-5 border-t border-white/6">

                <p className="text-[10px] font-mono text-slate-portal/40 leading-relaxed">

                  Last updated:
                  {' '}

                  {new Date(
                    politician.updatedAt
                  ).toLocaleDateString(
                    'en-IN',
                    {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    }
                  )}

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  )
}