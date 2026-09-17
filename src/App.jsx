import './App.css'
import Hero from './sections/Hero.jsx'
import Bio from './sections/Bio.jsx'

function App() {

  return (
    <div className="min-h-screen bg-zinc-950">
      <main className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-16">
        <Hero />
        <hr className="border-t border-zinc-800 my-10 sm:my-12" />
        <Bio />
      </main>
    </div>
  )
}

export default App
