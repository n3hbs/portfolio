import { useState } from "react";
import { projects } from "../data/projects";
import { ExternalLink, ChevronDown } from "lucide-react";
import { Github } from "../components/common/Icons";

function ProjectCard({ project }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all duration-300 ease-out flex flex-col justify-between">
      {/* 1. Flush image at top: no margin or bezel */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-950 border-b border-zinc-800">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-950 text-zinc-600 text-xs font-mono">
            No preview available
          </div>
        )}

        {/* Hover overlay button to visit site with smooth fade & slide */}
        {project.demoUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-100 text-zinc-950 text-xs font-bold font-mono shadow-xl hover:bg-white hover:scale-105 active:scale-95 transition-all duration-200 ease-out transform translate-y-2 group-hover:translate-y-0"
            >
              <span>Visit Site</span>
              <ExternalLink size={13} />
            </a>
          </div>
        )}
      </div>

      {/* 2. Container body */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Project Name (H3) */}
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-100 group-hover:text-blue-500 transition-colors duration-200">
            {project.title}
          </h3>

          {/* Description Dropdown with smooth height & opacity expansion */}
          {project.description && (
            <div className="mt-2.5">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors duration-200 cursor-pointer select-none"
                aria-expanded={isOpen}
              >
                <span>{isOpen ? "Hide description" : "View description"}</span>
                <ChevronDown
                  size={14}
                  className={`text-zinc-500 transition-transform duration-300 ease-in-out ${
                    isOpen ? "rotate-180 text-blue-400" : ""
                  }`}
                />
              </button>

              {/* Smooth Grid Accordion */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100 mt-2"
                    : "grid-rows-[0fr] opacity-0 pointer-events-none mt-0"
                }`}
              >
                <div className="overflow-hidden">
                  <hr className="border-t border-zinc-800/80 my-2.5" />
                  <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Separator Line between Name/Description and Tech Stack */}
          <hr className="border-t border-zinc-800/80 my-3.5" />

          {/* Tech Stack */}
          <div>
            <span className="block text-xs font-semibold tracking-wider text-zinc-500 uppercase font-mono mb-2">
              Tech Stack
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-medium text-zinc-300 bg-zinc-950 border border-zinc-800 rounded-sm hover:border-zinc-700 hover:text-zinc-100 transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Links: GitHub Code & Demo */}
        <div className="flex items-center gap-4 pt-4 border-t border-zinc-800/80 mt-5">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-zinc-100 flex items-center gap-1.5 text-xs font-medium transition-all duration-200 ease-out hover:-translate-y-0.5"
          >
            <Github size={15} />
            <span>Code</span>
          </a>
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-400 flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5 ml-auto"
          >
            <ExternalLink size={15} />
            <span>Demo</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-10 px-4 text-left">
      <span className="text-sm font-semibold tracking-wider text-zinc-500 uppercase">
        Route::get('/projects')
      </span>
      <h2 className="text-3xl font-bold tracking-tight text-zinc-100 mt-1 mb-8">
        Projects
      </h2>

      {/* Grid configured so 2 projects fit in 1 row on desktop/tablet */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id || project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
