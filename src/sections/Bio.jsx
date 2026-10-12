import CodeWindow from "../components/common/CodeWindow";
import { Mail, FileText, ArrowUpRight, Download } from "lucide-react";
import { Github, Facebook } from "../components/common/Icons";

function Bio() {
  const email = import.meta.env.VITE_RECIPIENT_EMAIL || "bhnsgrl20@gmail.com";
  const facebookUrl =
    import.meta.env.VITE_FACEBOOK_URL ||
    "https://www.facebook.com/bhencyrisjohn.sagaral";
  const githubUrl =
    import.meta.env.VITE_GITHUB_URL || "https://github.com/n3hbs";
  const cvUrl = import.meta.env.VITE_CV_URL || "/Bhencyris_John_Sagaral_CV.pdf";

  const socialLinks = [
    {
      id: "email",
      label: "Email",
      href: `mailto:${email}`,
      icon: <Mail size={22} />,
      actionIcon: <ArrowUpRight size={14} />,
      isExternal: false,
    },
    {
      id: "facebook",
      label: "Facebook",
      href: facebookUrl,
      icon: <Facebook size={22} />,
      actionIcon: <ArrowUpRight size={14} />,
      isExternal: true,
    },
    {
      id: "github",
      label: "GitHub",
      href: githubUrl,
      icon: <Github size={22} />,
      actionIcon: <ArrowUpRight size={14} />,
      isExternal: true,
    },
    {
      id: "cv",
      label: "CV",
      href: cvUrl,
      icon: <FileText size={22} />,
      actionIcon: <Download size={14} />,
      isExternal: false,
      download: "Bhencyris_John_Sagaral_CV.pdf",
    },
  ];

  return (
    <section id="bio" className="px-4 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start lg:items-stretch">
        {/* Description Paragraph & Connect / CV Section */}
        <div className="lg:col-span-4 flex flex-col justify-between w-full h-full gap-6">
          <p className="text-base sm:text-md text-zinc-400 leading-relaxed">
            Backend Developer specializing in PHP and Laravel, dedicated to
            building secure RESTful APIs, optimized MySQL database
            architectures, and scalable server-side systems. Focused on writing
            clean, maintainable code and solving complex backend challenges.
          </p>

          {/* Email, Facebook, GitHub, and CV Section */}
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 w-full">
              {socialLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  download={item.download || undefined}
                  className="flex items-center justify-between pl-4 pr-3 py-2.5 rounded-sm bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/40 transition-all duration-200 group w-full"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="text-blue-500 group-hover:text-blue-400 transition-colors shrink-0 ml-0.5">
                      {item.icon}
                    </span>
                    <span className="text-xs font-semibold text-zinc-200 group-hover:text-zinc-100 transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <div className="text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2">
                    {item.actionIcon}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Windows Code Container */}
        <div className="lg:col-span-8 w-full">
          <CodeWindow />
        </div>
      </div>
    </section>
  );
}

export default Bio;
