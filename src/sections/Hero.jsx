
function Hero() {
    const techStack = ['PHP', 'Laravel', 'MySQL', 'React', 'REST APIs'];
    return (
        <section className="flex flex-col items-start justify-start pt-28 pb-8 px-4 text-left">
            <span className="text-sm font-semibold tracking-wider text-zinc-500 uppercase">
                Hi, I'M
            </span>
            {/* Main Single H1 */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-100 mt-2">
                Bhencyris John Sagaral
            </h1>
            {/* Role / Subheading */}
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-blue-500 mt-2">
                Backend Systems
            </h2>
            {/* Tech Stack Badges (Rendered with React .map) */}
            <div className="flex flex-wrap gap-2 mt-6">
                {techStack.map((tech) => (
                    <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium text-zinc-100 bg-zinc-900 border border-zinc-800 rounded-sm"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </section>
    )
}

export default Hero