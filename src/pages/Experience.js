import './Experience.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBriefcase,
    faTrophy,
    faCertificate
} from '@fortawesome/free-solid-svg-icons';

function Experience() {
    const experiences = {
        internships: [
            {
                title: "Application Development Intern",
                company: "Hidden Brains",
                location: "Ahmedabad, India",
                period: "May 2024 - June 2024",
                points: [
                    "Enhanced the 'Clean Rides' app by implementing secure user authentication",
                    "Optimized booking workflows for improved user experience",
                    "Improved app efficiency by integrating Flutter best practices",
                    "Implemented Firebase for real-time database synchronization"
                ]
            },
            {
                title: "Part-Time Intern",
                company: "Amit Fiber Decor",
                location: "Ahmedabad, India",
                period: "May 2022 - October 2024",
                points: [
                    "Contributed creative presentation designs for prominent projects like INDEXTb and Vibrant Gujarat",
                    "Improved the quality and efficiency of the team's workflow",
                    "Created key designs for corporate events",
                    "Enhanced visual appeal and effectiveness of various presentations"
                ]
            }
        ],
        achievements: [
            {
                title: "State-Level Gymnastics Champion",
                organization: "National School Games",
                points: [
                    "Represented Gujarat in the National School Games",
                    "Served as a judge for regional gymnastics competitions"
                ]
            },
            {
                title: "Joint President",
                organization: "CHARUSAT Economic Club",
                points: [
                    "Organized seminars and promoted financial literacy across the university",
                    "Led club initiatives and member engagement activities"
                ]
            },
            {
                title: "Core Team Member",
                organization: "AWS Cloud Student Club",
                points: [
                    "Facilitated workshops on cloud computing",
                    "Contributed as a content writer for the club"
                ]
            },
            {
                title: "Board Member",
                organization: "Rotaract Club",
                points: [
                    "Actively volunteered in community drives",
                    "Coordinated school visits to promote social responsibility"
                ]
            }
        ],
        certifications: [
            {
                name: "Google UI/UX Design",
                year: "2024"
            },
            {
                name: "Java Programming",
                year: "2024"
            },
            {
                name: "Fundamentals of Linux",
                year: "2024"
            },
            {
                name: "Python Programming",
                year: "2024"
            },
            {
                name: "Graphic Designing",
                year: "2023"
            }
        ]
    };

    return (
        <div className="experience">
            <h1>Experience</h1>

            <div className="experience-section">
                <h2>
                    <FontAwesomeIcon icon={faBriefcase} className="section-icon" />
                    Professional Experience
                </h2>
                <div className="experience-grid">
                    {experiences.internships.map((exp, index) => (
                        <div className="experience-card" key={index}>
                            <div className="card-header">
                                <h3>{exp.title}</h3>
                                <span className="period">{exp.period}</span>
                            </div>
                            <h4>{exp.company}</h4>
                            <p className="location">{exp.location}</p>
                            <ul>
                                {exp.points.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="experience-section">
                <h2>
                    <FontAwesomeIcon icon={faTrophy} className="section-icon" />
                    Achievements & Leadership
                </h2>
                <div className="experience-grid">
                    {experiences.achievements.map((achievement, index) => (
                        <div className="experience-card" key={index}>
                            <div className="card-header">
                                <h3>{achievement.title}</h3>
                            </div>
                            <h4>{achievement.organization}</h4>
                            <ul>
                                {achievement.points.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="experience-section">
                <h2>
                    <FontAwesomeIcon icon={faCertificate} className="section-icon" />
                    Certifications
                </h2>
                <div className="certifications-grid">
                    {experiences.certifications.map((cert, index) => (
                        <div className="certification-card" key={index}>
                            <h3>{cert.name}</h3>
                            <span className="year">{cert.year}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Experience; 