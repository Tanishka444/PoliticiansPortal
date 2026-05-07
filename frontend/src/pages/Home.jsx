import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const services = [
  { icon: '🔍', title: 'Search Politicians', desc: 'Find your elected representative by name or constituency.', link: '/search' },
  { icon: '📋', title: 'View Profiles', desc: "Read politician's promises, achievements, and contact details.", link: '/search' },
  { icon: '🏛️', title: 'Politician Login', desc: 'Elected officials can manage their transparency profile.', link: '/auth' },
  { icon: '📊', title: 'Track Promises', desc: 'Compare promises vs actual delivery.', link: '/search' },
]

const marqueeItems = [
  'Welcome to the Politician Transparency Portal',
  'Search for your elected representative',
  'Track political promises easily',
  'Promoting democratic accountability',
  'योजना | पारदर्शिता | जवाबदेही',
]

export default function Home() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('portalUser')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  return (
    /* CHANGED: Increased padding and used standard Tailwind values (40 and 48) to prevent header overlap */
    <main className="pt-40 md:pt-48 min-h-screen bg-slate-50">
      {/* 🔔 NOTICE BAR */}
      <div className="bg-gov-blue text-white text-xs flex overflow-hidden">
        <div className="bg-saffron px-4 py-2 font-semibold">NOTICE</div>
        <div className="animate-marquee whitespace-nowrap py-2 px-4">
          {marqueeItems.join(' • ')}
        </div>
      </div>

      {/* 🏆 HERO */}
      <div className="bg-gradient-to-r from-gov-blue to-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Politician Transparency Portal
            </h1>
            <p className="text-sm mb-6 text-white/80">
              Empowering citizens with transparent political information. Welcome to the Politician Transparency Portal. Empowering citizens with transparent political information. Search for your elected representative. Track political promises easily. Promoting democratic accountability. योजना | पारदर्शिता | जवाबदेही.
            </p>
            <div className="flex gap-3">
              <Link to="/search" className="bg-yellow-400 text-black px-6 py-2 rounded font-semibold">
                Search Politicians
              </Link>
              {!user && (
                <Link to="/auth" className="bg-white text-gov-blue px-6 py-2 rounded">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 🧑‍💼 CITIZEN SERVICES */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-xl font-bold text-gov-blue mb-8">
          Citizen Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <Link key={i} to={s.link} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-lg hover:-translate-y-1 transition text-center group" >
              <div className="text-4xl mb-3">{s.icon}</div>
              <h3 className="font-semibold text-gov-blue group-hover:text-orange-500">
                {s.title}
              </h3>
              <p className="text-gray-500 text-sm">{s.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* 🟧 QUICK SERVICES */}
      <div className="max-w-6xl mx-auto px-6 py-12 bg-orange-50 rounded-xl">
        <h2 className="text-xl font-bold text-gov-blue mb-8"> Government Quick Services </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { name: "Voter Services", link: "https://voters.eci.gov.in/" },
            { name: "Aadhaar Services", link: "https://uidai.gov.in/" },
            { name: "DigiLocker", link: "https://www.digilocker.gov.in/" },
            { name: "PMO India", link: "https://www.pmindia.gov.in/" },
          ].map((item, i) => (
            <a key={i} href={item.link} target="_blank" rel="noreferrer" className="bg-white p-6 rounded-xl shadow border hover:shadow-lg hover:-translate-y-1 transition text-center">
              <h4 className="font-semibold text-gov-blue">{item.name}</h4>
              <p className="text-sm text-gray-500 mt-2">Visit portal</p>
            </a>
          ))}
        </div>
      </div>

      {/* 🟩 SCHEMES */}
      <div className="bg-green-50 py-12 mt-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-xl font-bold text-gov-blue mb-8"> Popular Government Schemes </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Ayushman Bharat", link: "https://pmjay.gov.in/" },
              { name: "PM Awas Yojana", link: "https://pmaymis.gov.in/" },
              { name: "Jan Dhan Yojana", link: "https://pmjdy.gov.in/" },
            ].map((s, i) => (
              <a key={i} href={s.link} target="_blank" rel="noreferrer" className="bg-white p-6 rounded-xl shadow border hover:shadow-lg hover:-translate-y-1 transition">
                <h4 className="font-semibold text-gov-blue">{s.name}</h4>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 📢 UPDATES */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-xl font-bold text-gov-blue mb-8"> Latest Political Updates </h2>
        <div className="space-y-4">
          {[
            "🏛️ Parliament reforms discussion ongoing",
            "📊 Digital India expansion announced",
            "🌾 New rural schemes launched",
          ].map((u, i) => (
            <div key={i} className="bg-white p-5 rounded-xl shadow border-l-4 border-orange-400">
              {u}
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gov-blue text-white py-6 text-center text-sm">
        © Government of India Portal | Transparency Initiative
      </footer>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%) }
          100% { transform: translateX(-100%) }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </main>
  )
}
