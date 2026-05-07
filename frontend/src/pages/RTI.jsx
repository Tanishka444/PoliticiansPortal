import { Link } from 'react-router-dom'

export default function RTI() {
  return (
    <main className="pt-44 md:pt-40 min-h-screen bg-gray-100">
      <div className="bg-gov-blue border-b-2 border-saffron">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-white font-body">
          <Link to="/" className="opacity-60 hover:opacity-100">Home</Link>
          <span className="opacity-40">›</span>
          <span>RTI – Right to Information</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-5">
            <div className="gov-card">
              <div className="section-heading">⚖️ Right to Information Act, 2005</div>
              <div className="p-5 text-sm font-body text-gray-700 space-y-3 leading-relaxed">
                <p>Under the <strong>Right to Information Act, 2005</strong>, every citizen of India has the right to seek information from any public authority. This portal, being a public transparency initiative, is subject to the provisions of the RTI Act.</p>
                <p>You may file an RTI application to seek information regarding the functioning, policies, and data maintained by this portal.</p>
              </div>
            </div>

            <div className="gov-card">
              <div className="section-heading">👤 Public Information Officers (PIO)</div>
              <div className="p-4">
                <table className="w-full text-sm font-body">
                  <thead>
                    <tr className="bg-gov-blue text-white text-xs uppercase tracking-wide">
                      <th className="text-left px-4 py-2.5">Designation</th>
                      <th className="text-left px-4 py-2.5">Name</th>
                      <th className="text-left px-4 py-2.5">Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { role: 'Public Information Officer', name: 'Shri A.K. Sharma', contact: 'pio@transparency.gov.in' },
                      { role: 'First Appellate Authority', name: 'Smt. R. Verma (Jt. Secretary)', contact: 'faa@transparency.gov.in' },
                    ].map((row, i) => (
                      <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <td className="px-4 py-3 text-gov-blue font-medium">{row.role}</td>
                        <td className="px-4 py-3">{row.name}</td>
                        <td className="px-4 py-3 text-gov-blue">{row.contact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="gov-card">
              <div className="section-heading">📋 How to File an RTI</div>
              <ol className="divide-y divide-gray-100">
                {[
                  'Download the RTI Application Form from the Downloads section.',
                  'Fill in your personal details and clearly state the information sought.',
                  'Pay the application fee of ₹10 (by IPO / DD / Cash).',
                  'Submit the application to the Public Information Officer by post or in person.',
                  'You will receive a response within 30 days of receipt of application.',
                  'In case of non-response or unsatisfactory reply, file an appeal with the First Appellate Authority.',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 px-5 py-3 text-sm font-body text-gray-700">
                    <span className="bg-gov-blue text-white text-xs font-mono w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="space-y-4">
            <div className="gov-card bg-orange-50 border-orange-200">
              <div className="section-heading bg-saffron-dark">📥 RTI Resources</div>
              <ul className="divide-y divide-orange-100">
                {[
                  'RTI Application Template',
                  'RTI Act 2005 (Full Text)',
                  'Appeal Form Template',
                  'Fee Payment Procedure',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 px-4 py-2.5 text-sm font-body text-orange-800 hover:bg-orange-100 cursor-pointer">
                    <span>📄</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="gov-card">
              <div className="section-heading">🔗 Useful Links</div>
              <ul className="divide-y divide-gray-100">
                <li><a href="https://rtionline.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 text-sm font-body text-gov-blue hover:bg-blue-50"><span className="text-saffron">▸</span> RTI Online Portal</a></li>
                <li><Link to="/downloads" className="flex items-center gap-2 px-4 py-2.5 text-sm font-body text-gov-blue hover:bg-blue-50"><span className="text-saffron">▸</span> Downloads</Link></li>
                <li><Link to="/contact" className="flex items-center gap-2 px-4 py-2.5 text-sm font-body text-gov-blue hover:bg-blue-50"><span className="text-saffron">▸</span> Contact Us</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}