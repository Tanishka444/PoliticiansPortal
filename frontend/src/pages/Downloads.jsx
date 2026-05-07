import { Link } from 'react-router-dom'

const files = [
  { name: 'Politician Registration Form', type: 'PDF', size: '245 KB', date: 'Apr 2025', icon: '📄' },
  { name: 'Citizen User Manual', type: 'PDF', size: '1.2 MB', date: 'Apr 2025', icon: '📘' },
  { name: 'Portal Guidelines & Rules', type: 'PDF', size: '380 KB', date: 'Mar 2025', icon: '📋' },
  { name: 'Data Declaration Format', type: 'DOCX', size: '120 KB', date: 'Mar 2025', icon: '📝' },
  { name: 'RTI Application Template', type: 'PDF', size: '95 KB', date: 'Feb 2025', icon: '📑' },
  { name: 'Transparency Portal Act 2025', type: 'PDF', size: '2.1 MB', date: 'Jan 2025', icon: '⚖️' },
]

export default function Downloads() {
  return (
    <main className="pt-44 md:pt-40 min-h-screen bg-gray-100">
      <div className="bg-gov-blue border-b-2 border-saffron">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-white font-body">
          <Link to="/" className="opacity-60 hover:opacity-100">Home</Link>
          <span className="opacity-40">›</span>
          <span>Downloads</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="gov-card">
              <div className="section-heading">📥 Available Downloads</div>
              <div className="p-4">
                <div className="bg-yellow-50 border border-yellow-200 px-3 py-2 text-xs font-body text-yellow-800 mb-4">
                  ℹ️ All documents are in PDF/DOCX format. You will need Adobe Acrobat Reader or Microsoft Word to open them.
                </div>
                <table className="w-full text-sm font-body">
                  <thead>
                    <tr className="bg-gov-blue text-white text-xs uppercase tracking-wide">
                      <th className="text-left px-4 py-2.5">Document Name</th>
                      <th className="text-center px-3 py-2.5">Type</th>
                      <th className="text-center px-3 py-2.5">Size</th>
                      <th className="text-center px-3 py-2.5">Date</th>
                      <th className="text-center px-3 py-2.5">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((f, i) => (
                      <tr key={i} className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <td className="px-4 py-3 flex items-center gap-2">
                          <span>{f.icon}</span>
                          <span className="text-gov-blue">{f.name}</span>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <span className="gov-badge">{f.type}</span>
                        </td>
                        <td className="px-3 py-3 text-center text-gray-500 text-xs">{f.size}</td>
                        <td className="px-3 py-3 text-center text-gray-500 text-xs">{f.date}</td>
                        <td className="px-3 py-3 text-center">
                          <button className="text-gov-blue hover:underline text-xs font-semibold uppercase">
                            ⬇ Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="gov-card">
              <div className="section-heading">🔗 Quick Links</div>
              <ul className="divide-y divide-gray-100">
                {[
                  { label: 'Home', to: '/' },
                  { label: 'About Portal', to: '/about' },
                  { label: 'RTI', to: '/rti' },
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
            <div className="gov-card">
              <div className="section-heading">⚙️ Software Required</div>
              <div className="p-4 text-xs font-body text-gray-600 space-y-2">
                <p>📄 <a href="https://get.adobe.com/reader/" className="text-gov-blue hover:underline" target="_blank" rel="noopener noreferrer">Adobe Acrobat Reader</a> — for PDF files</p>
                <p>📝 Microsoft Word / LibreOffice — for DOCX files</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}