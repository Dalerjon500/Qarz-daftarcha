import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import useProjects from "../../hooks/useProjects";
import type { TechIcons } from "./WithoutBackend";
import {
  SiBootstrap,
  SiCss3,
  SiFigma,
  SiFirebase,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

function WithBackend() {
  const { projects, loading } = useProjects();

  const techIcons: TechIcons = {
    react: <SiReact />,
    typescript: <SiTypescript />,
    bootstrap: <SiBootstrap />,
    figma: <SiFigma />,
    css: <SiCss3 />,
    javascript: <SiJavascript />,
    tailwind: <SiTailwindcss />,
    firebase: <SiFirebase />,
  };

  if (loading) {
    return <div className="without-backend-container">Loading ..</div>;
  }

  return (
    <div className="without-backend-container">
      <div className="projects-grid">
        {projects.map((project) => {
          const screenshotUrl = `https://api.microlink.io/?url=${project.demoLink}&screenshot=true&meta=false&embed=screenshot.url`;

          return (
            <div key={project.id} className="project-card">
              {/* Card Glow Effects */}
              <div className="card-glow-1"></div>
              <div className="card-glow-2"></div>

              {/* Project Image */}
              <div className="card-image-container">
              <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                <img src={screenshotUrl} alt={project.title} className="card-image" />
              </a>

                {/* Overlay va tech stack */}
                <div className="image-gradient"></div>
                <div className="tech-stack-project">
                  {project.technologies.map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className="tech-item-project"
                      style={{ animationDelay: `${techIndex * 0.1}s` }}
                    >
                      <div className="tech-icon-project">
                        {techIcons[tech.toLowerCase()] || <SiReact />}
                      </div>
                      <span className="tech-name-project">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Content */}
              <div className="card-content">
                <div className="card-header">
                  <div className="title-section">
                    <h3 className="project-title">{project.title}</h3>
                  </div>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="card-actions">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-btn github-btn magnetic"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaGithub />
                      <span>Source Code</span>
                    </a>
                  )}
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-btn live-btn magnetic"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaExternalLinkAlt />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>

              {/* Border */}
              <div className="interactive-border"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WithBackend;
