import "./App.css";
import Hero from "./sections/Hero.jsx";
import Bio from "./sections/Bio.jsx";
import Projects from "./sections/Projects.jsx";
import Contact from "./sections/Contact.jsx";
import { Analytics } from "@vercel/analytics/react";
function App() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Analytics />
      <main className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-16">
        <Hero />
        <hr className="border-t border-zinc-800 my-10 sm:my-12" />
        <Bio />
        <hr className="border-t border-zinc-800 my-10 sm:my-12" />
        <Projects />
        <hr className="border-t border-zinc-800 my-10 sm:my-12" />
        <Contact />
      </main>
    </div>
  );
}

export default App;
