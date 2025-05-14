import './About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLaptopCode,
    faTools,
    faGraduationCap
} from '@fortawesome/free-solid-svg-icons';

function About() {
    const techStack = [
        {
            name: "Python",
            icon: "devicon-python-plain",
        },
        {
            name: "Java",
            icon: "devicon-java-plain",
        },
        {
            name: "C/C++",
            icon: "devicon-cplusplus-plain",
        },
        {
            name: "Dart",
            icon: "devicon-dart-plain",
        },
        {
            name: "React.js",
            icon: "devicon-react-original",
        },
        {
            name: "Node.js",
            icon: "devicon-nodejs-plain",
        },
        {
            name: "MongoDB",
            icon: "devicon-mongodb-plain",
        },
        {
            name: "Flutter",
            icon: "devicon-flutter-plain",
        },
        {
            name: "Firebase",
            icon: "devicon-firebase-plain",
        },
        {
            name: "Express.js",
            icon: "devicon-express-original",
        }
    ];

    const tools = [
        {
            name: "Android Studio",
            icon: "devicon-android-plain",
        },
        {
            name: "VS Code",
            icon: "devicon-vscode-plain",
        },
        {
            name: "Git/GitHub",
            icon: "devicon-github-original",
        },
        {
            name: "Figma",
            icon: "devicon-figma-plain",
        }
    ];

    return (
        <div className="about">
            <h1>About Me</h1>
            <div className="about-content">
                <div className="bio-section">
                    <h2>Biography</h2>
                    <p>I am a Computer Science and Engineering student at Charotar University of Science and Technology (CHARUSAT), combining technical expertise with creative problem-solving abilities. My academic journey has been focused on building a strong foundation in computer science, software engineering, and data analysis. Beyond academics, I'm a State-Level Gymnastics Champion who represented Gujarat in the National School Games, demonstrating my dedication to excellence in all pursuits.</p>
                </div>

                <div className="education-section">
                    <h2>
                        <FontAwesomeIcon icon={faGraduationCap} className="section-icon" />
                        Education
                    </h2>
                    <div className="education-timeline">
                        <div className="timeline-item">
                            <div className="timeline-dot"></div>
                            <div className="education-card">
                                <h3>B.Tech in Computer Science and Engineering</h3>
                                <h4>Charotar University of Science and Technology (CHARUSAT)</h4>
                                <p className="location">Anand, India</p>
                                <p className="duration">2022 - Present</p>
                                <p className="gpa">CGPA: 8.4/10.0</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-dot"></div>
                            <div className="education-card">
                                <h3>High School</h3>
                                <h4>St. Xavier's High School Loyola Hall</h4>
                                <p className="location">Ahmedabad, India</p>
                                <p className="duration">Graduated May 2022</p>
                                <p className="gpa">Percentile: 99.03</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tech-section">
                    <h2>
                        <FontAwesomeIcon icon={faLaptopCode} className="section-icon" />
                        Professional Skillset
                    </h2>
                    <div className="tech-grid">
                        {techStack.map((tech, index) => (
                            <div className="tech-card" key={index}>
                                <i className={tech.icon}></i>
                                <span>{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="tech-section">
                    <h2>
                        <FontAwesomeIcon icon={faTools} className="section-icon" />
                        Tools & Platforms
                    </h2>
                    <div className="tech-grid">
                        {tools.map((tool, index) => (
                            <div className="tech-card" key={index}>
                                <i className={tool.icon}></i>
                                <span>{tool.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About; 