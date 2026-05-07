import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { label: 'Home',             to: '/' },
  { label: 'About Portal',     to: '/about' },
  { label: 'Citizen Services', to: '/search' },
  { label: 'Downloads',        to: '/downloads' },
  { label: 'RTI',              to: '/rti' },
  { label: 'Contact Us',       to: '/contact' },
]

export default function Navbar() {
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const stored = localStorage.getItem('portalUser')
    setUser(stored ? JSON.parse(stored) : null)
  }, [location])

  const logout = () => {
    localStorage.removeItem('portalUser')
    setUser(null)
    navigate('/')
  }

  const isActive = (to) => location.pathname === to

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-md">

      {/* ── 1. Tricolour stripe ── */}
      <div className="tricolour-bar" />

      {/* ── 2. Top utility bar ── */}
     <div className="w-full bg-slate-900 text-white text-xs py-2 px-4 flex items-center justify-between">
  <span className="font-body opacity-90">भारत सरकार &nbsp;|&nbsp; Government of India</span>
  <div className="hidden sm:flex items-center gap-4 opacity-80">
    <span>Skip to Main Content</span>
    <span className="opacity-40">|</span>
    <span>Screen Reader</span>
    <span className="opacity-40">|</span>
    <span className="font-bold">A- &nbsp;A&nbsp; A+</span>
  </div>
</div>


      {/* ── 3. Logo / branding band ── */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

          {/* Emblem + Title */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-14 h-14 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="48" fill="#1a3a6e" stroke="#FF9933" strokeWidth="3"/>
                <circle cx="50" cy="50" r="13" fill="none" stroke="#FF9933" strokeWidth="2"/>
                {[...Array(24)].map((_, i) => {
                  const a = (i * 15 * Math.PI) / 180
                  return (
                    <line key={i}
                      x1={50 + 13 * Math.cos(a)} y1={50 + 13 * Math.sin(a)}
                      x2={50 + 24 * Math.cos(a)} y2={50 + 24 * Math.sin(a)}
                      stroke="#FF9933" strokeWidth="1.5"
                    />
                  )
                })}
                <text x="50" y="54" textAnchor="middle" fill="#FF9933" fontSize="10" fontWeight="bold" fontFamily="serif">भारत</text>
              </svg>
            </div>
            <div>
              <div className="font-display font-bold text-gov-blue text-base sm:text-lg leading-tight">
                Politician Transparency Portal
              </div>
              <div className="text-gray-500 text-xs font-body">
                राजनेता पारदर्शिता पोर्टल &nbsp;|&nbsp; Ministry of Parliamentary Affairs
              </div>
            </div>
          </Link>

          {/* Auth controls */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="text-right text-sm font-body">
                  <div className="font-semibold text-gov-blue">{user.username}</div>
                  <div className="text-gray-400 text-xs capitalize">{user.role}</div>
                </div>
                {user.role === 'politician' && (
                  <Link to="/create-profile" className="btn-primary text-xs py-1.5">
                    My Profile
                  </Link>
                )}
                <button onClick={logout} className="btn-outline text-xs py-1.5">
                  Logout
                </button>
              </div>
            ) : (
            <Link 
  to="/auth" 
  className="bg-[#FF9933] hover:bg-[#FFB366] text-white text-xs font-semibold py-1.5 px-4 rounded transition-colors duration-200 inline-block text-center"
> 
  Login / Register 
</Link>

            )}
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden text-gov-blue" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              {menuOpen
                ? <path fillRule="evenodd" clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
                : <path fillRule="evenodd" clipRule="evenodd" d="M3 5a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zm0 7a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zm0 7a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1z"/>
              }
            </svg>
          </button>
        </div>
      </div>

      {/* ── 4. Main navigation bar — matches screenshot exactly ── */}
      <nav className="hidden md:block bg-gov-blue border-b-[3px] border-saffron">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex">
            {NAV_ITEMS.map((item, i) => (
              <li
                key={item.to}
                className={`flex items-stretch ${i < NAV_ITEMS.length - 1 ? 'border-r border-white/20' : ''}`}
              >
                <Link
                  to={item.to}
                  className={`
                    px-6 py-3 text-sm font-body font-medium tracking-wide whitespace-nowrap
                    transition-colors duration-150
                    ${isActive(item.to)
                      ? 'bg-saffron text-white'
                      : 'text-white hover:bg-white/10'
                    }
                  `}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── 5. Mobile dropdown menu ── */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-body border-b border-gray-100 transition-colors
                ${isActive(item.to) ? 'bg-orange-50 text-gov-blue font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              <span className="text-saffron">▸</span>
              {item.label}
            </Link>
          ))}
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
            {user ? (
              <div className="flex items-center justify-between">
                <span className="text-sm font-body text-gov-blue font-semibold">{user.username}</span>
                <button onClick={() => { logout(); setMenuOpen(false) }}
                  className="text-xs text-red-600 font-body font-semibold uppercase">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/auth" onClick={() => setMenuOpen(false)}
                className="block text-center btn-saffron text-xs py-2">
                Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}