import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './Home.css';

// Using a placeholder avatar from UI Faces
const profileImg = "https://i.pravatar.cc/300";

function Home() {
    return (
        <div className="home">
            <div className="animated-background">
                {[...Array(50)].map((_, i) => (
                    <div key={i} className="star" style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`
                    }} />
                ))}
            </div>
            <div className="hero-container">
                <motion.div 
                    className="hero-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="hero-text">
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Hi there, I'm Hasti Vakani
                        </motion.h1>
                        <motion.div
                            className="rotating-titles"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <TypeAnimation
                                sequence={[
                                    'Designer', 2000,
                                    'Machine Learning Enthusiast', 2000,
                                    'UI/UX Explorer', 2000,
                                    'Research-Oriented', 2000,
                                    'Creative Thinker', 2000,
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            />
                        </motion.div>
                        <motion.div 
                            className="social-icons"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                                <FaGithub />
                            </a>
                            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin />
                            </a>
                            <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
                                <FaTwitter />
                            </a>
                        </motion.div>
                    </div>
                    <motion.div 
                        className="hero-image"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className="image-container">
                            <img src="/path/to/your/image.jpg" alt="Hasti Vakani" />
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            <section className="highlights">
                <h2>Highlights</h2>
                <div className="highlights-grid">
                    <div className="highlight-card">
                        <h3>Academic Excellence</h3>
                        <p>GPA: 8.4/10.0 at CHARUSAT University</p>
                    </div>
                    <div className="highlight-card">
                        <h3>Technical Skills</h3>
                        <p>Proficient in multiple programming languages and modern development tools</p>
                    </div>
                    <div className="highlight-card">
                        <h3>Leadership</h3>
                        <p>Founder of CHARUSAT Economic Club and active member of multiple technical communities</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home; 