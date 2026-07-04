import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faInstagram,
    faGithub,
    faLinkedin,
    faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import {
    faEnvelope,
    faGraduationCap,
    faIdCard
} from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-initials">
                    HV
                </div>
                <div className="footer-social">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" title="GitHub">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href="https://orcid.org" target="_blank" rel="noopener noreferrer" title="ORCID">
                        <FontAwesomeIcon icon={faIdCard} />
                    </a>
                    <a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer" title="Google Scholar">
                        <FontAwesomeIcon icon={faGraduationCap} />
                    </a>
                    <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" title="WhatsApp">
                        <FontAwesomeIcon icon={faWhatsapp} />
                    </a>
                    <a href="mailto:your.email@example.com" title="Email">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 