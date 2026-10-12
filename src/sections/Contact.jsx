import { useState, useEffect } from "react";
import {
  Mail,
  Send,
  AlertCircle,
  File,
  CheckCircle2,
  Minus,
  Square,
  X,
  ArrowUpRight,
} from "lucide-react";
import { Messenger, Whatsapp, Github } from "../components/common/Icons";

export default function Contact() {
  const baseUrl = (
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    ""
  ).replace(/\/+$/, "");
  const recipientEmail =
    import.meta.env.VITE_RECIPIENT_EMAIL || "bhnsgrl20@gmail.com";
  const messengerUrl =
    import.meta.env.VITE_MESSENGER_URL ||
    "https://m.me/bhencyrisjohn.sagaral";
  const githubUrl =
    import.meta.env.VITE_GITHUB_URL || "https://github.com/n3hbs";
  const phoneNumber =
    import.meta.env.VITE_PHONE_NUMBER || "+63 939 7000 577";
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null); // null | '200' | '422' | '500'
  const [generalError, setGeneralError] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  // Auto-dismiss floating error toast after 6 seconds
  useEffect(() => {
    if (responseStatus && responseStatus !== "200") {
      const timer = setTimeout(() => {
        setResponseStatus(null);
        setGeneralError(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [responseStatus]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = "The name field is required.";
    } else if (formData.name.trim().length < 2) {
      errs.name = "The name must be at least 2 characters.";
    }

    if (!formData.email.trim()) {
      errs.email = "The email field is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "The email must be a valid email address.";
    }

    if (!formData.message.trim()) {
      errs.message = "The message field is required.";
    } else if (formData.message.trim().length < 10) {
      errs.message = "The message must be at least 10 characters.";
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (responseStatus) {
      setResponseStatus(null);
      setGeneralError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setResponseStatus("422");
      return;
    }

    setIsSubmitting(true);
    setResponseStatus(null);
    setGeneralError(null);

    try {
      let res = await fetch(`${baseUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Fallback for route without /api prefix
      if (res.status === 404) {
        const altRes = await fetch(`${baseUrl}/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (altRes.ok || altRes.status === 422) {
          res = altRes;
        }
      }

      let data;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (res.ok) {
        setApiResponse(
          data || {
            status: 200,
            message: `Mail successfully dispatched to ${recipientEmail}`,
            controller: "App\\Http\\Controllers\\ContactController",
            payload: {
              sender: formData.name,
              reply_to: formData.email,
            },
          },
        );
        setResponseStatus("200");
      } else if (res.status === 422) {
        setResponseStatus("422");
        if (data?.errors) {
          const backendErrors = {};
          for (const key of Object.keys(data.errors)) {
            backendErrors[key] = Array.isArray(data.errors[key])
              ? data.errors[key][0]
              : data.errors[key];
          }
          setErrors(backendErrors);
        }
      } else {
        setGeneralError(
          data?.message ||
            `Laravel backend responded with HTTP ${res.status}. Ensure Route::post('/contact') is registered.`,
        );
        setResponseStatus(String(res.status));
      }
    } catch {
      setGeneralError(
        `Connection Error: Unable to reach Laravel backend at ${baseUrl}. Ensure your server is running.`,
      );
      setResponseStatus("500");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
    setResponseStatus(null);
    setGeneralError(null);
    setApiResponse(null);
  };

  return (
    <section id="contact" className="py-10 px-4 text-left">
      {/* Floating Error Toast Notification (Upper Right of Viewport) */}
      {responseStatus && responseStatus !== "200" && (
        <aside
          role="alert"
          aria-live="assertive"
          className="fixed top-5 right-5 sm:top-6 sm:right-6 z-50 max-w-sm sm:max-w-md w-[calc(100vw-2.5rem)] sm:w-auto p-4 rounded-sm bg-red-950/50 border border-red-800/60 shadow-2xl backdrop-blur-md text-xs animate-float-in"
        >
          <div className="flex items-start gap-3">
            <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1 pr-1">
              <span className="font-bold text-red-300 text-xs block">
                {responseStatus === "422"
                  ? "HTTP 422 Unprocessable Content"
                  : `HTTP ${responseStatus} Error`}
              </span>
              <p className="text-xs text-red-400 mt-0.5 leading-relaxed">
                {generalError ||
                  "Validation failed on $request->validate(). Please correct the errors below."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setResponseStatus(null);
                setGeneralError(null);
              }}
              aria-label="Dismiss error notification"
              className="text-red-400/70 hover:text-red-200 transition-colors p-1 -mr-1 -mt-1 rounded-sm cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>
        </aside>
      )}

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
        Have an inquiry, project proposal, or looking to collaborate? Dispatch a
        message directly or connect through my communication channels.
      </p>

      {/* Direct Contact Channels (Email, Messenger, WhatsApp, GitHub) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* 1. Email */}
        <a
          href={`mailto:${recipientEmail}`}
          className="bg-zinc-900 border border-zinc-800 rounded-sm p-3.5 flex items-center justify-between hover:border-zinc-700 hover:bg-zinc-800/40 transition-all duration-200 group"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <span className="text-blue-500 group-hover:text-blue-400 transition-colors shrink-0">
              <Mail size={24} />
            </span>
            <div className="min-w-0 text-left">
              <div className="text-sm font-semibold text-zinc-200 group-hover:text-zinc-100 transition-colors">
                Email
              </div>
              <div className="text-xs text-zinc-500 font-mono truncate group-hover:text-zinc-400 transition-colors">
                {recipientEmail}
              </div>
            </div>
          </div>
          <div className="text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2">
            <ArrowUpRight size={14} />
          </div>
        </a>

        {/* 2. Messenger */}
        <a
          href={messengerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-zinc-900 border border-zinc-800 rounded-sm p-3.5 flex items-center justify-between hover:border-zinc-700 hover:bg-zinc-800/40 transition-all duration-200 group"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <span className="text-blue-500 group-hover:text-blue-400 transition-colors shrink-0">
              <Messenger size={24} />
            </span>
            <div className="min-w-0 text-left">
              <div className="text-sm font-semibold text-zinc-200 group-hover:text-zinc-100 transition-colors">
                Messenger
              </div>
              <div className="text-xs text-zinc-500 font-mono truncate group-hover:text-zinc-400 transition-colors">
                Chat on Facebook
              </div>
            </div>
          </div>
          <div className="text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2">
            <ArrowUpRight size={14} />
          </div>
        </a>

        {/* 3. WhatsApp */}
        <a
          href={`https://wa.me/${cleanPhone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-zinc-900 border border-zinc-800 rounded-sm p-3.5 flex items-center justify-between hover:border-zinc-700 hover:bg-zinc-800/40 transition-all duration-200 group"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <span className="text-blue-500 group-hover:text-blue-400 transition-colors shrink-0">
              <Whatsapp size={24} />
            </span>
            <div className="min-w-0 text-left">
              <div className="text-sm font-semibold text-zinc-200 group-hover:text-zinc-100 transition-colors">
                WhatsApp
              </div>
              <div className="text-xs text-zinc-500 font-mono truncate group-hover:text-zinc-400 transition-colors">
                Message directly
              </div>
            </div>
          </div>
          <div className="text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2">
            <ArrowUpRight size={14} />
          </div>
        </a>

        {/* 4. GitHub */}
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-zinc-900 border border-zinc-800 rounded-sm p-3.5 flex items-center justify-between hover:border-zinc-700 hover:bg-zinc-800/40 transition-all duration-200 group"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <span className="text-blue-500 group-hover:text-blue-400 transition-colors shrink-0">
              <Github size={24} />
            </span>
            <div className="min-w-0 text-left">
              <div className="text-sm font-semibold text-zinc-200 group-hover:text-zinc-100 transition-colors">
                GitHub
              </div>
              <div className="text-xs text-zinc-500 font-mono truncate group-hover:text-zinc-400 transition-colors">
                @n3hbs
              </div>
            </div>
          </div>
          <div className="text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2">
            <ArrowUpRight size={14} />
          </div>
        </a>
      </div>

      {/* Windows & Laravel Container */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shadow-2xl transition-all duration-300">
        {/* Row 1: Windows Title Bar */}
        <div className="flex items-center justify-between h-9 px-3 bg-zinc-950 border-b border-zinc-800 select-none">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            {/* Clean Windows title bar */}
          </div>

          {/* Windows Window Caption Controls (Minimize, Maximize, Close - No hover highlight) */}
          <div className="flex items-center -mr-3">
            <button
              type="button"
              className="w-11 h-9 flex items-center justify-center text-zinc-500 cursor-default select-none"
              title="Minimize"
              aria-label="Minimize"
            >
              <Minus size={13} />
            </button>
            <button
              type="button"
              className="w-11 h-9 flex items-center justify-center text-zinc-500 cursor-default select-none"
              title="Maximize"
              aria-label="Maximize"
            >
              <Square size={11} />
            </button>
            <button
              type="button"
              className="w-11 h-9 flex items-center justify-center text-zinc-500 cursor-default select-none"
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
            <span className="text-xs text-zinc-200">/api/email/send</span>
          </div>

          {/* Laravel 200 Success Response Panel */}
          {responseStatus === "200" ? (
            <div className="p-5 rounded-sm bg-zinc-900 border border-zinc-800 text-xs animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 size={16} />
                  <span>HTTP 200 OK — Mail Dispatched</span>
                </div>
              </div>
              <pre className="text-zinc-300 bg-zinc-950 p-3.5 rounded-sm border border-zinc-800 text-xs overflow-x-auto leading-relaxed font-mono">
                {JSON.stringify(
                  apiResponse || {
                    status: 200,
                    message: `Mail successfully dispatched to ${recipientEmail}`,
                    controller: "App\\Http\\Controllers\\ContactController",
                    payload: {
                      sender: formData.name,
                      reply_to: formData.email,
                    },
                  },
                  null,
                  2,
                )}
              </pre>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-100 bg-zinc-800 hover:bg-zinc-700 rounded-sm transition-colors cursor-pointer"
                >
                  <Send size={13} />
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
                  className="block text-sm font-medium text-zinc-300 mb-1.5"
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
                  placeholder="e.g. John Doe"
                  className={`w-full px-3 py-2 text-xs font-medium rounded-sm bg-zinc-900 border transition-colors text-zinc-100 placeholder:text-zinc-500 focus:outline-none ${
                    errors.name
                      ? "border-red-500 focus:border-red-400"
                      : "border-zinc-800 focus:border-blue-500"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Email field */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-zinc-300 mb-1.5"
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
                      ? "border-red-500 focus:border-red-400"
                      : "border-zinc-800 focus:border-blue-500"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Message field */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-zinc-300 mb-1.5"
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
                      ? "border-red-500 focus:border-red-400"
                      : "border-zinc-800 focus:border-blue-500"
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Form Action Controls */}
              <div className="pt-2 flex items-center justify-start">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-sm bg-blue-500 hover:bg-blue-600 active:scale-95 disabled:opacity-60 text-xs font-bold text-zinc-100 tracking-tight shadow-lg shadow-blue-500/10 transition-all duration-200 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending Message...</span>
                      <span className="text-blue-100 font-mono font-normal text-xs opacity-80">
                        (dispatching...)
                      </span>
                    </>
                  ) : (
                    <>
                      <Send size={13} />
                      <span>Send Message</span>
                      <span className="px-1.5 py-0.5 rounded-sm bg-blue-600/70 border border-blue-400/30 text-blue-100 font-mono font-normal text-xs">
                        Mail::send()
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
