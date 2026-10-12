import { useState, useEffect, useRef } from 'react'
import { Minus, Square, X, ChevronDown, Send, File } from 'lucide-react'

export default function CodeWindow() {
  const baseUrl = (
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    ''
  ).replace(/\/+$/, '')

  const endpoints = [
    { value: '/api/profile/skills', label: '/api/profile/skills' },
    { value: '/api/profile/specialties', label: '/api/profile/specialties' },
  ]

  const [endpoint, setEndpoint] = useState('/api/profile/skills')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const [responseMeta, setResponseMeta] = useState({
    status: 'Ready',
    time: '0ms',
    contentType: 'application/json',
    poweredBy: 'Laravel 11 / PHP 8.2',
  })
  const [responseData, setResponseData] = useState({
    message: 'Select an endpoint and hit execute to learn more about me...',
  })
  const [fetchTrigger, setFetchTrigger] = useState(0)

  useEffect(() => {
    if (fetchTrigger === 0) return

    let ignore = false
    const fetchFromBackend = async () => {
      const startTime = performance.now()

      try {
        const reqUrl = baseUrl ? `${baseUrl}${endpoint}` : endpoint
        let res = await fetch(reqUrl, {
          headers: { Accept: 'application/json' },
        })

        // Fallback for route registered without /api prefix
        if (res.status === 404 && endpoint.startsWith('/api/')) {
          const directEndpoint = endpoint.replace('/api/', '/')
          const altUrl = baseUrl ? `${baseUrl}${directEndpoint}` : directEndpoint
          const altRes = await fetch(altUrl, {
            headers: { Accept: 'application/json' },
          })
          if (altRes.ok) {
            res = altRes
          }
        }

        const duration = Math.max(10, Math.round(performance.now() - startTime))
        const text = await res.text()
        let json
        try {
          json = JSON.parse(text)
        } catch {
          json = text ? { raw: text } : {}
        }

        if (!ignore) {
          setResponseMeta({
            status: `${res.status} ${res.statusText || 'OK'}`,
            time: `${duration}ms`,
            contentType: res.headers.get('content-type') || 'application/json',
            poweredBy: res.headers.get('x-powered-by') || 'Laravel 11 / PHP 8.2',
          })
          setResponseData(json)
        }
      } catch (err) {
        if (!ignore) {
          const duration = Math.max(10, Math.round(performance.now() - startTime))
          setResponseMeta({
            status: 'Connection Error',
            time: `${duration}ms`,
            contentType: 'none',
            poweredBy: 'Laravel Backend (Unreachable)',
          })
          setResponseData({
            error: 'Failed to connect to backend API',
            url: baseUrl ? `${baseUrl}${endpoint}` : endpoint,
            details: String(err),
          })
        }
      }
    }

    fetchFromBackend()
    return () => {
      ignore = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchTrigger, baseUrl])

  const handleEndpointChange = (newEndpoint) => {
    setEndpoint(newEndpoint)
  }

  const handleExecute = () => {
    setFetchTrigger((prev) => prev + 1)
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shadow-2xl transition-all duration-300 w-full">
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

      {/* Row 2: Sub-header / File Bar (matching ContactController.php style) */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-zinc-950/60 border-b border-zinc-800 select-none">
        <div className="flex items-center gap-2.5 text-xs text-zinc-300">
          <File size={14} className="text-zinc-400" />
          <span>ProfileController.php</span>
        </div>
        <span className="text-xs text-zinc-500 hidden sm:inline">
          App\Http\Controllers
        </span>
      </div>

      {/* Row 3: REST API Testing Bar */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-2.5 bg-zinc-950 border-b border-zinc-800 select-none">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          {/* GET Method Badge (Blue) */}
          <span className="px-2.5 py-2 rounded-sm bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold font-mono tracking-wider shrink-0 select-none flex items-center justify-center">
            GET
          </span>

          {/* API URL Dropdown with smooth height & opacity expansion */}
          <div ref={dropdownRef} className="relative flex-1 min-w-0 select-none">
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
              className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-100 text-xs font-mono py-2 pl-3 pr-8 rounded-sm cursor-pointer select-none text-left flex items-center justify-between transition-colors focus:outline-none focus:border-zinc-700"
            >
              <span className="truncate">
                {endpoints.find((ep) => ep.value === endpoint)?.label || endpoint}
              </span>
              <ChevronDown
                size={13}
                className={`absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 transition-transform duration-300 ease-in-out ${
                  isDropdownOpen ? "rotate-180 text-blue-400" : ""
                }`}
              />
            </button>

            {/* Smooth Grid Accordion Dropdown Menu */}
            <div
              className={`absolute left-0 right-0 top-full z-40 grid transition-all duration-300 ease-in-out ${
                isDropdownOpen
                  ? "grid-rows-[1fr] opacity-100 mt-1.5 pointer-events-auto"
                  : "grid-rows-[0fr] opacity-0 pointer-events-none mt-0"
              }`}
            >
              <div className="overflow-hidden rounded-sm bg-zinc-900 border border-zinc-800 shadow-2xl">
                {endpoints.map((ep) => (
                  <button
                    key={ep.value}
                    type="button"
                    onClick={() => {
                      handleEndpointChange(ep.value);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-mono transition-colors flex items-center justify-between cursor-pointer ${
                      endpoint === ep.value
                        ? "bg-blue-500/10 text-blue-400 font-semibold"
                        : "text-zinc-300 hover:bg-zinc-800/80 hover:text-zinc-100"
                    }`}
                  >
                    <span className="truncate">{ep.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Execute Button */}
          <button
            type="button"
            onClick={handleExecute}
            className="px-3.5 py-2 rounded-sm bg-blue-500 hover:bg-blue-600 active:scale-95 text-zinc-100 text-xs font-bold font-mono flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 select-none shadow-md shadow-blue-500/10"
            title="Execute Request to Backend"
          >
            <Send size={11} />
            <span className="hidden sm:inline">Execute</span>
          </button>
        </div>
      </div>

      {/* Content Area: HTTP Response Headers & Scrollable JSON Data */}
      <div className="bg-zinc-950/80 font-mono text-xs sm:text-sm">
        {/* HTTP Response Headers Block (no live indicator, status in blue) */}
        <div className="px-6 sm:px-8 py-3.5 border-b border-zinc-800/80 bg-zinc-950/90 text-xs select-none">
          <div className="flex flex-wrap items-center gap-2 mb-2 text-zinc-400">
            <span className="text-zinc-500">HTTP/1.1</span>
            <span className="font-bold text-blue-400">
              {responseMeta.status}
            </span>
            <span className="text-zinc-400">{responseMeta.time}</span>
          </div>

          <div className="space-y-0.5 text-zinc-400 text-xs">
            <div>
              <span className="text-zinc-500">Content-Type: </span>
              <span className="text-zinc-300">{responseMeta.contentType}</span>
            </div>
            <div>
              <span className="text-zinc-500">X-Powered-By: </span>
              <span className="text-blue-400 font-medium">{responseMeta.poweredBy}</span>
            </div>
          </div>
        </div>

        {/* JSON Payload with Line Numbers - Fixed height, only data scrolls */}
        <div className="px-6 sm:px-8 py-2.5 sm:py-3 h-64 sm:h-72 overflow-y-auto">
          {responseData ? (
            <div className="space-y-1 leading-relaxed font-mono">
              {JSON.stringify(responseData, null, 2)
                .split('\n')
                .map((line, idx) => {
                  const lineNum = String(idx + 1).padStart(2, '0')
                  return (
                    <div key={idx} className="flex items-start">
                      <span className="text-zinc-600 select-none mr-4 text-xs sm:text-sm shrink-0 leading-relaxed">
                        {lineNum}
                      </span>
                      <span className="whitespace-pre-wrap break-words text-xs sm:text-sm flex-1 min-w-0 leading-relaxed">
                        {formatJsonLine(line)}
                      </span>
                    </div>
                  )
                })}
            </div>
          ) : (
            <div className="text-zinc-500 py-2 font-mono text-xs sm:text-sm">No data returned.</div>
          )}
        </div>
      </div>
    </div>
  )
}

function formatValueAndPunct(str) {
  if (!str) return null

  // String literal with optional trailing comma: "..." or "...",
  const strMatch = str.match(/^("(?:\\.|[^"\\])*")(,)?$/)
  if (strMatch) {
    const [, val, comma] = strMatch
    return (
      <>
        <span className="text-[#c89178]">{val}</span>
        {comma && <span className="text-zinc-500">{comma}</span>}
      </>
    )
  }

  // Number, boolean, null with optional comma: 123, true, null,
  const literalMatch = str.match(/^(true|false|null|-?\d+(?:\.\d+)?)(,)?$/)
  if (literalMatch) {
    const [, val, comma] = literalMatch
    return (
      <>
        <span className="text-[#c89178]">{val}</span>
        {comma && <span className="text-zinc-500">{comma}</span>}
      </>
    )
  }

  // Brackets / braces / structure: {, }, [, ], etc.
  return <span className="text-zinc-500">{str}</span>
}

function formatJsonLine(line) {
  // Key-value line: indent + "key": + rest
  const keyMatch = line.match(/^(\s*)("(?:\\.|[^"\\])*")(\s*:\s*)(.*)$/)
  if (keyMatch) {
    const [, indent, key, colon, rest] = keyMatch
    return (
      <>
        <span>{indent}</span>
        <span className="text-[#3b74b6]">{key}</span>
        <span className="text-zinc-500">{colon}</span>
        {formatValueAndPunct(rest)}
      </>
    )
  }

  // Line without key (array item or structural bracket)
  const noKeyMatch = line.match(/^(\s*)(.*)$/)
  if (noKeyMatch) {
    const [, indent, rest] = noKeyMatch
    return (
      <>
        <span>{indent}</span>
        {formatValueAndPunct(rest)}
      </>
    )
  }

  return <span>{line}</span>
}

