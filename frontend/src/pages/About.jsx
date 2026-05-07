import { Link } from 'react-router-dom'

export default function About() {
  return (
    <main className="pt-44 md:pt-40 min-h-screen bg-gray-100">
      <div className="bg-gov-blue border-b-2 border-saffron">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-white font-body">
          <Link to="/" className="opacity-60 hover:opacity-100">Home</Link>
          <span className="opacity-40">›</span>
          <span>About Portal</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-5">
            <div className="gov-card">
              <div className="section-heading">📌 About This Portal</div>
              <div className="p-5 text-sm font-body text-gray-700 space-y-3 leading-relaxed">
                <p>The <strong>Politician Transparency Portal</strong> is an initiative by the Ministry of Parliamentary Affairs, Government of India, to promote democratic accountability and transparency among elected representatives.</p>
                <p>This portal provides a single, unified platform where politicians can publish their election promises, achievements, and contact information — making them accessible to every citizen of India.</p>
                <p>Citizens can search, compare, and evaluate their representatives based on self-declared public records, thereby enabling informed participation in the democratic process.</p>
              </div>
            </div>

            <div className="gov-card">
              <div className="section-heading">🎯 Objectives</div>
              <ul className="divide-y divide-gray-100">
                {[
                  'Promote transparency and accountability in elected governance',
                  'Enable citizens to track promises made during elections',
                  'Provide a single searchable database of politician profiles',
                  'Encourage politicians to publicly declare their achievements',
                  'Strengthen democratic participation through informed citizenry',
                ].map((obj, i) => (
                  <li key={i} className="flex items-start gap-3 px-5 py-3 text-sm font-body text-gray-700">
                    <span className="text-india-green font-bold flex-shrink-0">✓</span>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>

            <div className="gov-card">
              <div className="section-heading">🏛️ Nodal Ministry</div>
              <div className="p-5 text-sm font-body text-gray-700 leading-relaxed">
                <p className="font-semibold text-gov-blue mb-1">Ministry of Parliamentary Affairs</p>
                <p>Parliament House Annexe, New Delhi – 110 001</p>
                <p className="mt-2 text-gray-500">Website: <a href="https://mpa.nic.in" className="text-gov-blue hover:underline" target="_blank" rel="noopener noreferrer">mpa.nic.in</a></p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="gov-card">
              <div className="section-heading">🔗 Quick Links</div>
              <ul className="divide-y divide-gray-100">
                {[
                  { label: 'Search Politicians', to: '/search' },
                  { label: 'Register as Politician', to: '/auth' },
                  { label: 'Citizen Login', to: '/auth' },
                  { label: 'RTI Information', to: '/rti' },
                  { label: 'Contact Us', to: '/contact' },
                ].map((l, i) => (
                  <li key={i}>
                    <Link to={l.to} className="flex items-center gap-2 px-4 py-2.5 text-sm font-body text-gov-blue hover:bg-blue-50">
                      <span className="text-saffron">▸</span> {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="gov-card bg-blue-50 border-blue-200">
              <div className="section-heading">📅 Portal Version</div>
              <div className="p-4 text-xs font-body text-gray-600 space-y-1">
                <p><strong>Version:</strong> 1.0.0</p>
                <p><strong>Launched:</strong> April 2025</p>
                <p><strong>Developed by:</strong> NIC, India</p>
                <p><strong>Last Updated:</strong> April 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}