import './Projects.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCode,
    faExternalLinkAlt,
    faGithub
} from '@fortawesome/free-solid-svg-icons';

function Projects() {
    const projects = [
        {
            title: "WhiskWizard",
            description: "A recipe search app that utilizes API integration to suggest recipes based on available ingredients. The app was optimized for quick response time with a robust backend to improve user experience.",
            technologies: ["Android Studio", "Java", "APIs"],
            category: "Mobile Development",
            highlights: [
                "Implemented recipe search functionality",
                "Optimized API response handling",
                "Enhanced user interface design"
            ]
        },
        {
            title: "Obesity Predictor",
            description: "A web-based obesity level prediction tool using machine learning algorithms to predict obesity levels based on user input. Enabled real-time testing and deployment for public access.",
            technologies: ["HTML", "Flask", "Python", "Machine Learning"],
            category: "Web Development & ML",
            highlights: [
                "Developed prediction algorithms",
                "Created intuitive user interface",
                "Implemented real-time predictions"
            ]
        },
        {
            title: "Brandz App",
            description: "A festival poster-making app for businesses to create and share promotional content. Integrated Firebase for secure storage and user authentication, ensuring a seamless experience for both businesses and customers.",
            technologies: ["Flutter", "Dart", "Firebase"],
            category: "Mobile Development",
            highlights: [
                "Implemented secure authentication",
                "Integrated cloud storage",
                "Designed user-friendly interface"
            ]
        }
    ];

    return (
        <div className="projects">
            <h1>
                <FontAwesomeIcon icon={faCode} className="section-icon" />
                Projects
            </h1>
            <div className="projects-grid">
                {projects.map((project, index) => (
                    <div className="project-card" key={index}>
                        <div className="project-content">
                            <div className="project-header">
                                <h2>{project.title}</h2>
                                <span className="project-category">{project.category}</span>
                            </div>
                            <p className="project-description">{project.description}</p>
                            <div className="project-highlights">
                                <h3>Key Features</h3>
                                <ul>
                                    {project.highlights.map((highlight, i) => (
                                        <li key={i}>{highlight}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="project-tech">
                                {project.technologies.map((tech, i) => (
                                    <span key={i} className="tech-tag">{tech}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Projects; 