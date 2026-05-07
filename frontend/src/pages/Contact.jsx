import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="pt-44 md:pt-40 min-h-screen bg-gray-100">
      <div className="bg-gov-blue border-b-2 border-saffron">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-white font-body">
          <Link to="/" className="opacity-60 hover:opacity-100">Home</Link>
          <span className="opacity-40">›</span>
          <span>Contact Us</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="gov-card">
              <div className="section-heading">✉️ Send Us a Message</div>
              <div className="p-5">
                {submitted ? (
                  <div className="bg-green-50 border border-green-300 p-6 text-center">
                    <div className="text-4xl mb-3">✅</div>
                    <p className="font-semibold text-green-800 font-body mb-1">Your message has been submitted successfully.</p>
                    <p className="text-sm text-green-700 font-body">We will respond to your query within 3–5 working days.</p>
                    <button onClick={() => { setSubmitted(false); setForm({ name:'', email:'', subject:'', message:'' }) }}
                      className="btn-primary text-xs py-1.5 mt-4">Submit Another Query</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-body font-semibold text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                        <input name="name" type="text" placeholder="Enter your full name" value={form.name} onChange={handleChange} required className="input-field"/>
                      </div>
                      <div>
                        <label className="block text-sm font-body font-semibold text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                        <input name="email" type="email" placeholder="Enter your email" value={form.email} onChange={handleChange} required className="input-field"/>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-body font-semibold text-gray-700 mb-1">Subject <span className="text-red-500">*</span></label>
                      <select name="subject" value={form.subject} onChange={handleChange} required className="input-field">
                        <option value="">-- Select Subject --</option>
                        <option>Technical Issue / Bug Report</option>
                        <option>Profile Registration Help</option>
                        <option>Data Correction Request</option>
                        <option>RTI Related Query</option>
                        <option>General Enquiry</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-body font-semibold text-gray-700 mb-1">Message <span className="text-red-500">*</span></label>
                      <textarea name="message" rows={5} placeholder="Describe your query in detail..." value={form.message} onChange={handleChange} required className="input-field resize-none"/>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 px-3 py-2 text-xs font-body text-yellow-800">
                      ⚠️ For RTI related queries, please visit the <Link to="/rti" className="underline">RTI section</Link>. Response time: 3–5 working days.
                    </div>
                    <div className="flex gap-3">
                      <button type="submit" className="btn-primary">Submit Message</button>
                      <button type="reset" onClick={() => setForm({ name:'', email:'', subject:'', message:'' })} className="btn-outline">Reset</button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-4">
            <div className="gov-card">
              <div className="section-heading">📍 Office Address</div>
              <div className="p-4 text-sm font-body text-gray-700 space-y-2 leading-relaxed">
                <p className="font-semibold text-gov-blue">Ministry of Parliamentary Affairs</p>
                <p>Parliament House Annexe,<br/>New Delhi – 110 001<br/>India</p>
              </div>
            </div>

            <div className="gov-card">
              <div className="section-heading">📞 Contact Details</div>
              <div className="p-4 text-sm font-body text-gray-700 space-y-3">
                {[
                  { icon: '📞', label: 'Helpline (Toll Free)', val: '1800-111-0000' },
                  { icon: '📞', label: 'Office', val: '+91-11-2301 7823' },
                  { icon: '📠', label: 'Fax', val: '+91-11-2301 7800' },
                  { icon: '📧', label: 'General', val: 'info@transparency.gov.in' },
                  { icon: '📧', label: 'Technical', val: 'tech@transparency.gov.in' },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-2 pb-2 border-b border-gray-100 last:border-0 last:pb-0">
                    <span className="flex-shrink-0">{c.icon}</span>
                    <div>
                      <div className="text-xs text-gray-400 uppercase font-semibold">{c.label}</div>
                      <div className="text-gov-blue">{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="gov-card">
              <div className="section-heading">🕐 Office Hours</div>
              <div className="p-4 text-xs font-body text-gray-600 space-y-1">
                <p><strong>Monday – Friday:</strong> 9:00 AM – 6:00 PM</p>
                <p><strong>Saturday:</strong> 9:00 AM – 1:00 PM</p>
                <p className="text-red-500 mt-2">Closed on Sundays & Public Holidays</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}