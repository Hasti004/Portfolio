import './Resume.css';
import resumePDF from '../assets/resume.pdf'; // You'll need to add your PDF file here

function Resume() {
    return (
        <div className="resume">
            <h1>My Resume</h1>
            <div className="resume-container">
                <div className="pdf-viewer">
                    <iframe
                        src={resumePDF}
                        title="Resume"
                        width="100%"
                        height="800px"
                    />
                </div>
                <div className="download-section">
                    <a href={resumePDF} download className="download-button">
                        Download Resume
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Resume; 