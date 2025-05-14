import './Contact.css';

function Contact() {
    return (
        <div className="contact">
            <h1>Contact Me</h1>
            <div className="contact-content">
                <div className="contact-info">
                    <h2>Get in Touch</h2>
                    <p>Feel free to reach out to me for any opportunities or questions.</p>
                    <div className="contact-details">
                        <p>Email: your.email@example.com</p>
                        <p>Location: Your City, Country</p>
                        <div className="social-links">
                            <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
                            <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact; 