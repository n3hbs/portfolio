import { useState } from 'react'
import {
  Mail,
  Send,
  Check,
  Copy,
  AlertCircle,
  File,
  CheckCircle2,
  Minus,
  Square,
  X,
  Phone,
  ExternalLink,
} from 'lucide-react'
import { Facebook } from '../components/common/Icons'

export default function Contact() {
  const recipientEmail = 'bhnsgrl20@gmail.com'
  const dummyFacebook = {
    label: 'facebook.com/bhencyris.sagaral',
    url: 'https://facebook.com',
  }
  const dummyPhone = '+63 912 345 6789'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [responseStatus, setResponseStatus] = useState(null) // null | '200' | '422'
  const [copiedItem, setCopiedItem] = useState(null) // 'email' | 'phone' | null

  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) {
      errs.name = 'The name field is required.'
    } else if (formData.name.trim().length < 2) {
      errs.name = 'The name must be at least 2 characters.'
    }

    if (!formData.email.trim()) {
      errs.email = 'The email field is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'The email must be a valid email address.'
    }

    if (!formData.message.trim()) {
      errs.message = 'The message field is required.'
    } else if (formData.message.trim().length < 10) {
      errs.message = 'The message must be at least 10 characters.'
    }

    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
    if (responseStatus) {
      setResponseStatus(null)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setResponseStatus('422')
      return
    }

    setIsSubmitting(true)
    setResponseStatus(null)

    // Simulate controller execution delay
    setTimeout(() => {
      setIsSubmitting(false)
      setResponseStatus('200')

      // Construct mailto link and trigger email client
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`)
      const body = encodeURIComponent(
        `Hello Bhencyris,\n\n${formData.message}\n\n---\nSender: ${formData.name}\nEmail: ${formData.email}`
      )
      const mailtoUrl = `mailto:${recipientEmail}?subject=${subject}&body=${body}`

      window.location.href = mailtoUrl
    }, 700)
  }

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text)
    setCopiedItem(key)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' })
    setErrors({})
    setResponseStatus(null)
  }

  return (
    <section id="contact" className="py-10 px-4 text-left">
      {/* Eyebrow Label matching Hero & Projects */}
      <span className="text-sm font-semibold tracking-wider text-zinc-500 uppercase">
        Route::post('/contact')
      </span>

      {/* Main Section Heading matching Projects */}
      <h2 className="text-3xl font-bold tracking-tight text-zinc-100 mt-1 mb-3">
        Contact
      </h2>

      {/* Body text matching Bio */}
      <p className="text-base sm:text-md text-zinc-400 leading-relaxed max-w-2xl mb-8">
        Have an inquiry, project proposal, or looking to collaborate? Dispatch a message
        directly or connect through my communication channels.
      </p>

      {/* Direct Contact Channels (Email, Facebook, Phone) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {/* 1. Email */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-4 flex flex-col justify-between hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase flex items-center gap-1.5">
              <Mail size={14} className="text-blue-500" />
              <span>Email</span>
            </span>
            <button
              type="button"
              onClick={() => copyToClipboard(recipientEmail, 'email')}
              className="text-zinc-500 hover:text-zinc-200 transition-colors cursor-pointer p-0.5"
              title="Copy email"
            >
              {copiedItem === 'email' ? (
                <Check size={14} className="text-emerald-400" />
              ) : (
                <Copy size={14} />
              )}
            </button>
          </div>
          <a
            href={`mailto:${recipientEmail}`}
            className="text-xs font-medium text-zinc-100 hover:text-blue-400 transition-colors truncate"
            title={recipientEmail}
          >
            {recipientEmail}
          </a>
        </div>

        {/* 2. Facebook */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-4 flex flex-col justify-between hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase flex items-center gap-1.5">
              <Facebook size={14} className="text-blue-500" />
              <span>Facebook</span>
            </span>
            <a
              href={dummyFacebook.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-zinc-200 transition-colors cursor-pointer p-0.5"
              title="Visit Facebook profile"
            >
              <ExternalLink size={14} />
            </a>
          </div>
          <a
            href={dummyFacebook.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-zinc-100 hover:text-blue-400 transition-colors truncate"
            title={dummyFacebook.label}
          >
            {dummyFacebook.label}
          </a>
        </div>

        {/* 3. Contact Number */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-4 flex flex-col justify-between hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase flex items-center gap-1.5">
              <Phone size={14} className="text-blue-500" />
              <span>Contact No.</span>
            </span>
            <button
              type="button"
              onClick={() => copyToClipboard(dummyPhone, 'phone')}
              className="text-zinc-500 hover:text-zinc-200 transition-colors cursor-pointer p-0.5"
              title="Copy phone number"
            >
              {copiedItem === 'phone' ? (
                <Check size={14} className="text-emerald-400" />
              ) : (
                <Copy size={14} />
              )}
            </button>
          </div>
          <a
            href={`tel:${dummyPhone.replace(/\s+/g, '')}`}
            className="text-xs font-medium text-zinc-100 hover:text-blue-400 transition-colors truncate"
          >
            {dummyPhone}
          </a>
        </div>
      </div>

      {/* Windows & Laravel Container */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shadow-2xl transition-all duration-300">
        {/* Row 1: Windows Title Bar */}
        <div className="flex items-center justify-between h-9 px-3 bg-zinc-950 border-b border-zinc-800 select-none">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            {/* Clean Windows title bar */}
          </div>

          {/* Windows Window Caption Controls (Minimize, Maximize, Close) */}
          <div className="flex items-center -mr-3">
            <button
              type="button"
              className="w-11 h-9 flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
              title="Minimize"
              aria-label="Minimize"
            >
              <Minus size={13} />
            </button>
            <button
              type="button"
              className="w-11 h-9 flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
              title="Maximize"
              aria-label="Maximize"
            >
              <Square size={11} />
            </button>
            <button
              type="button"
              className="w-11 h-9 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-red-600 transition-colors"
              title="Close"
              aria-label="Close"
            >
              <X size={13} />
            </button>
          </div>
        </div>

        {/* Row 2: Sub-header / File Bar (matching screenshot with ContactController.php) */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-zinc-950/60 border-b border-zinc-800 select-none">
          <div className="flex items-center gap-2.5 text-xs text-zinc-300">
            <File size={14} className="text-zinc-400" />
            <span>ContactController.php</span>
          </div>
          <span className="text-xs text-zinc-500 hidden sm:inline">
            App\Http\Controllers
          </span>
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-7 bg-zinc-950/80">
          {/* Laravel Route Indicator Banner */}
          <div className="mb-6 pb-4 border-b border-zinc-800/80 text-xs text-zinc-400 flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 rounded-sm bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold uppercase">
              POST
            </span>
            <span className="text-xs text-zinc-200">/api/v1/contact</span>
            <span className="text-zinc-500 hidden sm:inline">·········</span>
            <span className="text-xs text-zinc-400">
              App\Http\Controllers\<span className="text-blue-400">ContactController</span>@send
            </span>
          </div>

          {/* Laravel 422 Error Banner if applicable */}
          {responseStatus === '422' && (
            <div className="mb-5 p-3 rounded-sm bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-start gap-2">
              <AlertCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">
                  HTTP 422 Unprocessable Content
                </span>
                <span className="text-xs text-red-400">
                  Validation failed on $request-&gt;validate(). Please correct the errors below.
                </span>
              </div>
            </div>
          )}

          {/* Laravel 200 Success Response Panel */}
          {responseStatus === '200' ? (
            <div className="p-5 rounded-sm bg-zinc-900 border border-zinc-800 text-xs animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 size={16} />
                  <span>HTTP 200 OK — Mail Dispatched</span>
                </div>
                <span className="text-xs text-zinc-500">
                  Handler: ContactController@send
                </span>
              </div>
              <pre className="text-zinc-300 bg-zinc-950 p-3.5 rounded-sm border border-zinc-800 text-xs overflow-x-auto leading-relaxed">
{`{
  "status": 200,
  "message": "Mail successfully queued and dispatched to ${recipientEmail}",
  "controller": "App\\\\Http\\\\Controllers\\\\ContactController",
  "payload": {
    "sender": "${formData.name}",
    "reply_to": "${formData.email}"
  }
}`}
              </pre>
              <p className="mt-3 text-zinc-400 text-xs leading-relaxed">
                Your default email client has been launched with the pre-filled message.
                If it didn't open automatically, you can directly email{' '}
                <span className="text-blue-400 font-bold">{recipientEmail}</span>.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-zinc-100 bg-zinc-800 hover:bg-zinc-700 rounded-sm transition-colors cursor-pointer"
                >
                  <Mail size={13} />
                  <span>Reopen Email Client</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-zinc-400 hover:text-zinc-100 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded-sm transition-colors cursor-pointer"
                >
                  <span>Send Another Message</span>
                </button>
              </div>
            </div>
          ) : (
            /* The Interactive Form */
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Name field */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-medium text-zinc-300 mb-1.5"
                >
                  <span className="text-blue-500">$request</span>
                  <span className="text-zinc-500">-&gt;</span>
                  <span className="text-zinc-100 font-bold">name</span>
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe / Acme Corp"
                  className={`w-full px-3 py-2 text-xs font-medium rounded-sm bg-zinc-900 border transition-colors text-zinc-100 placeholder:text-zinc-500 focus:outline-none ${
                    errors.name
                      ? 'border-red-500 focus:border-red-400'
                      : 'border-zinc-800 focus:border-blue-500'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email field */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-medium text-zinc-300 mb-1.5"
                >
                  <span className="text-blue-500">$request</span>
                  <span className="text-zinc-500">-&gt;</span>
                  <span className="text-zinc-100 font-bold">email</span>
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@example.com"
                  className={`w-full px-3 py-2 text-xs font-medium rounded-sm bg-zinc-900 border transition-colors text-zinc-100 placeholder:text-zinc-500 focus:outline-none ${
                    errors.email
                      ? 'border-red-500 focus:border-red-400'
                      : 'border-zinc-800 focus:border-blue-500'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message field */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium text-zinc-300 mb-1.5"
                >
                  <span className="text-blue-500">$request</span>
                  <span className="text-zinc-500">-&gt;</span>
                  <span className="text-zinc-100 font-bold">message</span>
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, idea, or questions..."
                  className={`w-full px-3 py-2 text-xs font-medium rounded-sm bg-zinc-900 border transition-colors text-zinc-100 placeholder:text-zinc-500 focus:outline-none resize-none ${
                    errors.message
                      ? 'border-red-500 focus:border-red-400'
                      : 'border-zinc-800 focus:border-blue-500'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Form Action Controls */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <span className="text-xs text-zinc-500">
                  Target: Mail::to('{recipientEmail}')
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-sm bg-blue-500 hover:bg-blue-600 active:scale-95 disabled:opacity-60 text-xs font-bold text-zinc-100 tracking-tight shadow-lg shadow-blue-500/10 transition-all duration-200 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Executing Controller...</span>
                    </>
                  ) : (
                    <>
                      <span>dispatch(new SendMail())</span>
                      <Send size={13} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
