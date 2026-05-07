import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createOrUpdateProfile, getMyProfile } from '../api/services'

const FIELD_META = {
  name: {
    label: 'Full Name',
    placeholder: 'e.g. Arun Kumar Singh',
    type: 'text',
  },

  party: {
    label: 'Party',
    placeholder: 'e.g. Indian National Congress',
    type: 'text',
  },

  location: {
    label: 'Constituency / Location',
    placeholder: 'e.g. Patna Sahib, Bihar',
    type: 'text',
  },

  image: {
    label: 'Profile Image URL',
    placeholder: 'https://…',
    type: 'url',
  },
}

export default function CreateProfile() {

  const navigate = useNavigate()

  const [user, setUser] = useState(null)

  const [form, setForm] = useState({
    name: '',
    party: '',
    location: '',
    image: '',

    slogan: '',
    partySymbol: '',
    politicalHistory: '',

    promises: '',
    achievements: '',

    contact: {
      email: '',
      phone: '',
      website: '',
    },
  })

  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {

    const stored = localStorage.getItem('portalUser')

    if (!stored) {
      navigate('/auth')
      return
    }

    const u = JSON.parse(stored)

    if (u.role !== 'politician') {
      navigate('/')
      return
    }

    setUser(u)

    getMyProfile()
      .then(({ data }) => {

        if (data.politician) {

          const p = data.politician

          setForm({
            name: p.name || '',
            party: p.party || '',
            location: p.location || '',
            image: p.image || '',

            slogan: p.slogan || '',
            partySymbol: p.partySymbol || '',

            politicalHistory: (p.politicalHistory || [])
              .map(
                (item) =>
                  `${item.year} | ${item.title} | ${item.description}`
              )
              .join('\n'),

            promises: (p.promises || []).join('\n'),

            achievements: (p.achievements || []).join('\n'),

            contact: {
              email: p.contact?.email || '',
              phone: p.contact?.phone || '',
              website: p.contact?.website || '',
            },
          })
        }
      })
      .catch(() => {})
      .finally(() => setFetching(false))

  }, [])

  const handleChange = (e) =>
    setForm((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }))

  const handleContactChange = (e) =>
    setForm((p) => ({
      ...p,
      contact: {
        ...p.contact,
        [e.target.name]: e.target.value,
      },
    }))

  const handleSubmit = async (e) => {

    e.preventDefault()

    setError('')
    setSuccess(false)

    if (!form.name || !form.party || !form.location) {
      setError('Name, party, and location are required.')
      return
    }

    setLoading(true)

    try {

      await createOrUpdateProfile({
        ...form,

        slogan: form.slogan,
        partySymbol: form.partySymbol,
        politicalHistory: form.politicalHistory,

        promises: form.promises,
        achievements: form.achievements,
      })

      setSuccess(true)

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })

    } catch (err) {

      setError(
        err.response?.data?.message ||
        'Failed to save profile.'
      )

    } finally {

      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <main className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border border-gold/30 border-t-gold animate-spin mx-auto mb-4" />
          <p className="text-slate-portal text-sm font-body">
            Loading your profile…
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-16 pb-24">

      <div className="max-w-3xl mx-auto px-6 pt-14">

        {/* Header */}
        <div className="mb-10 fade-up">

          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold/60" />
            <span className="section-label">
              Politician Dashboard
            </span>
          </div>

          <h1 className="font-display font-bold text-3xl text-parchment">
            {success ? 'Profile Updated' : 'Build Your Profile'}
          </h1>

          <p className="text-slate-portal text-sm font-body mt-2">
            This information will be publicly visible to all citizens.
          </p>

        </div>

        {success && (
          <div className="border border-green-500/30 bg-green-500/8 px-5 py-4 mb-8 fade-up flex items-center gap-3">

            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4ade80"
              strokeWidth="2"
            >
              <path d="M20 6L9 17l-5-5"/>
            </svg>

            <span className="text-green-400 text-sm font-body">
              Profile saved successfully!
            </span>

          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-8 fade-up"
        >

          {/* Basic Info */}
          <section>

            <h2 className="font-display font-semibold text-parchment/90 text-lg mb-5 flex items-center gap-3">
              <span className="font-mono text-gold/40 text-sm">
                01
              </span>
              Basic Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {Object.entries(FIELD_META).map(([key, meta]) => (

                <div
                  key={key}
                  className={
                    key === 'name' || key === 'image'
                      ? 'sm:col-span-2'
                      : ''
                  }
                >

                  <label className="section-label text-[10px] block mb-2">
                    {meta.label}
                  </label>

                  <input
                    name={key}
                    type={meta.type}
                    placeholder={meta.placeholder}
                    value={form[key]}
                    onChange={handleChange}
                    className="input-field"
                  />

                </div>
              ))}

            </div>

          </section>

          {/* Party Branding */}
          <section>

            <h2 className="font-display font-semibold text-parchment/90 text-lg mb-5 flex items-center gap-3">
              <span className="font-mono text-gold/40 text-sm">
                02
              </span>
              Party Branding
            </h2>

            <div className="grid grid-cols-1 gap-4">

              <div>

                <label className="section-label text-[10px] block mb-2">
                  Party Slogan
                </label>

                <input
                  name="slogan"
                  type="text"
                  placeholder="Sabka Saath Sabka Vikas"
                  value={form.slogan}
                  onChange={handleChange}
                  className="input-field"
                />

              </div>

              <div>

                <label className="section-label text-[10px] block mb-2">
                  Party Symbol Image URL
                </label>

                <input
                  name="partySymbol"
                  type="url"
                  placeholder="https://example.com/party-logo.png"
                  value={form.partySymbol}
                  onChange={handleChange}
                  className="input-field"
                />

              </div>

            </div>

          </section>

          {/* Promises */}
          <section>

            <h2 className="font-display font-semibold text-parchment/90 text-lg mb-2 flex items-center gap-3">
              <span className="font-mono text-gold/40 text-sm">
                03
              </span>
              Promises
            </h2>

            <p className="text-slate-portal text-xs font-body mb-4">
              Enter one promise per line.
            </p>

            <textarea
              name="promises"
              placeholder={'Build 50 new schools\nImprove road connectivity\nRaise minimum wage…'}
              value={form.promises}
              onChange={handleChange}
              rows={5}
              className="input-field resize-none"
            />

          </section>

          {/* Achievements */}
          <section>

            <h2 className="font-display font-semibold text-parchment/90 text-lg mb-2 flex items-center gap-3">
              <span className="font-mono text-gold/40 text-sm">
                04
              </span>
              Achievements
            </h2>

            <p className="text-slate-portal text-xs font-body mb-4">
              Enter one achievement per line.
            </p>

            <textarea
              name="achievements"
              placeholder={'Inaugurated 12 new hospitals\nSecured ₹500Cr infrastructure grant\nLaunched free WiFi in 200 villages…'}
              value={form.achievements}
              onChange={handleChange}
              rows={5}
              className="input-field resize-none"
            />

          </section>

          {/* Political History */}
          <section>

            <h2 className="font-display font-semibold text-parchment/90 text-lg mb-2 flex items-center gap-3">
              <span className="font-mono text-gold/40 text-sm">
                05
              </span>
              Political Journey Timeline
            </h2>

            <p className="text-slate-portal text-xs font-body mb-4">
              Format:
              YEAR | POSITION | DESCRIPTION
            </p>

            <textarea
              name="politicalHistory"
              placeholder={`2001 | Joined Politics | Started political career\n2008 | MLA | Won first MLA election\n2014 | Minister | Became education minister`}
              value={form.politicalHistory}
              onChange={handleChange}
              rows={8}
              className="input-field resize-none"
            />

          </section>

          {/* Contact */}
          <section>

            <h2 className="font-display font-semibold text-parchment/90 text-lg mb-5 flex items-center gap-3">
              <span className="font-mono text-gold/40 text-sm">
                06
              </span>
              Contact Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              {[
                {
                  name: 'email',
                  label: 'Email',
                  placeholder: 'official@example.com',
                  type: 'email',
                },

                {
                  name: 'phone',
                  label: 'Phone',
                  placeholder: '+91 98765 43210',
                  type: 'text',
                },

                {
                  name: 'website',
                  label: 'Website',
                  placeholder: 'https://example.com',
                  type: 'url',
                },
              ].map((c) => (

                <div key={c.name}>

                  <label className="section-label text-[10px] block mb-2">
                    {c.label}
                  </label>

                  <input
                    name={c.name}
                    type={c.type}
                    placeholder={c.placeholder}
                    value={form.contact[c.name]}
                    onChange={handleContactChange}
                    className="input-field"
                  />

                </div>
              ))}

            </div>

          </section>

          {error && (
            <div className="border border-red-500/30 bg-red-500/8 px-4 py-3 text-red-400 text-sm font-body">
              {error}
            </div>
          )}

          <div className="flex gap-4 pt-2">

            <button
              type="submit"
              disabled={loading}
              className="btn-primary px-10 py-3 text-sm"
            >

              {loading ? (

                <span className="flex items-center gap-2">

                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />

                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>

                  Saving…

                </span>

              ) : 'Save Profile'}

            </button>

            <button
              type="button"
              onClick={() => navigate('/search')}
              className="btn-outline px-8 py-3 text-sm"
            >
              View Search
            </button>

          </div>

        </form>

      </div>

    </main>
  )
}