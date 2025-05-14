import './Research.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFlask,
    faBookOpen,
    faArrowRight,
    faSpinner,
    faExternalLinkAlt,
    faCalendar,
    faLink,
    faBook,
    faGraduationCap
} from '@fortawesome/free-solid-svg-icons';

function Research() {
    const upcomingSubmissions = [
        {
            title: "Signature fraud detection using CNN",
            status: "In Progress"
        },
        {
            title: "Career path prediction using ML",
            status: "In Progress"
        },
        {
            title: "Landslide detection",
            status: "In Progress"
        }
    ];

    const journalPapers = [
        {
            title: "Plant Disease Classification with Spectral Signature Taxonomy and Analysis Software (SSTAS)",
            type: "Journal Paper",
            journal: "Software Impacts",
            year: "2025",
            description: "This research introduces a spectroscopy-based classification technique for detecting non-visible plant diseases. Utilizing spectral signatures (400-1000 nm) collected over 15 months at Anand Agriculture University and Charotar University Space Research Centre, the SSTAS Software with Deep-Spectro model demonstrated superior accuracy in mango disease detection, overcoming limitations of traditional visual-based methods.",
            link: "https://authors.elsevier.com/sd/article/S2665963825000041"
        },
        {
            title: "Symptom-Based Early Detection and Classification of Plant Diseases Using AI-Driven CNN+KNN Fusion Software (ACKFS)",
            type: "Journal Paper",
            journal: "Software Impacts",
            year: "2025",
            description: "This paper introduces ACKFS, integrating CNN and KNN for enhanced plant disease classification. Following a four-phase process, the system achieved remarkable accuracy improvements: 94.56% and 87.52% on two datasets. The research demonstrates the effectiveness of CNN-KNN fusion for real-time disease detection on smart devices, advancing precision agriculture.",
            link: "https://doi.org/10.1016/j.simpa.2025.100755"
        }
    ];

    const conferencePapers = [
        {
            title: "Lime Diseases Classification Using ML and Spectrometry",
            type: "Conference Paper",
            conference: "ISBM 2024 Thailand",
            year: "2024",
            description: "This study explores the classification of lime diseases using advanced machine learning models and spectrometry data. We employed LSTM, RNN, and BiLSTM networks combined with SVM, KNN, and XGBoost classifiers. The LSTM model achieved 99.96% precision, while BiLSTM with classifiers reached up to 99.9816% precision.",
            link: "https://drive.google.com/file/d/1lOCyKHfuw1ffLmGR_-38QNtgoqzC8gYs/view?usp=drive_link"
        },
        {
            title: "Anomaly Detection in Industrial Machines Using Echo State Networks",
            type: "Conference Paper",
            conference: "ICT4SD 2025 Goa",
            year: "2025",
            description: "This paper explores Echo State Networks (ESNs) for detecting anomalies in industrial machinery through time-series sensor data analysis. ESNs offer computational efficiency and effectiveness in modeling temporal dependencies, achieving high accuracy with lower computational overhead compared to traditional RNNs.",
            link: "https://docs.google.com/document/d/1Hl_Pn-rhUKT45wC0_RG7IbtWYWqZZQ8p/edit"
        },
        {
            title: "Obesity Level Prediction Using Machine Learning",
            type: "Conference Paper",
            conference: "ICICT 2025 LONDON",
            year: "2025",
            description: "This research utilizes a stacking ensemble model combining Random Forest, Gradient Boosting, SVM, and Neural Networks to predict obesity levels. The model achieved 96.69% accuracy using diverse population datasets.",
            link: "https://drive.google.com/file/d/1iZTdFtRRlPspZ4Zs2IeMnuaK4pEwugng/view?usp=drive_link"
        },
        {
            title: "Automated Detection of Potholes and Speed Bumps Using Deep Learning",
            type: "Conference Paper",
            conference: "ICICT 2025 LONDON",
            year: "2025",
            description: "This study implements EfficientNetB0 for road surface monitoring, achieving 91.91% validation accuracy. The model was trained on 400 annotated images under diverse conditions.",
            link: "https://drive.google.com/file/d/1ME4uwQfUke4F6BPUvxJfyBvvPnBp7wV8/view?usp=drive_link"
        },
        {
            title: "Predictive Analysis of Apple Stock Market Trends",
            type: "Conference Paper",
            conference: "SmartCom 2025 Pune",
            year: "2025",
            description: "This research analyzes Apple stock market trends using various ML models including Logistic Regression, XGBoost, Neural Networks, RNN, LSTM, and ARIMA. Analyzing data from 2014-2024, the study achieved 96.50% accuracy with LSTM.",
            link: "https://drive.google.com/file/d/1G1qd0T1BkEx7Vu3qoSPsJaytSL9DPeU8/view?usp=drive_link"
        }
    ];

    return (
        <div className="research">
            <h1>
                My Recent <span className="highlight">Research Work</span>
            </h1>

            <div className="research-section">
                <h2>
                    
                    Ongoing Research
                </h2>
                <div className="research-grid">
                    {upcomingSubmissions.map((paper, index) => (
                        <div className="research-card" key={index}>
                            <div className="paper-header">
                                <span className="status-badge">
                                    <FontAwesomeIcon icon={faSpinner} className="spin" />
                                    {paper.status}
                                </span>
                            </div>
                            <h3>{paper.title}</h3>
                        </div>
                    ))}
                </div>
            </div>

            <div className="research-section">
                <h2>
                  
                    Journal Publications
                </h2>
                <div className="research-grid">
                    {journalPapers.map((paper, index) => (
                        <div className="research-card" key={index}>
                            <h3>{paper.title}</h3>
                            <p className="conference-details">Published in <em>{paper.journal}</em></p>
                            <p className="paper-description">{paper.description}</p>
                            <div className="paper-footer">
                                <p className="year">
                                    <FontAwesomeIcon icon={faCalendar} className="icon-small" />
                                    {paper.year}
                                </p>
                                <a href={paper.link} target="_blank" rel="noopener noreferrer" className="paper-link">
                                    <FontAwesomeIcon icon={faLink} /> View Paper
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="research-section">
                <h2>
                   
                    Conference Publications
                </h2>
                <div className="research-grid">
                    {conferencePapers.map((paper, index) => (
                        <div className="research-card" key={index}>
                            <h3>{paper.title}</h3>
                            <p className="conference-details">
                                {paper.title.includes("Anomaly Detection") ? 
                                    "Submitted at " : 
                                    "Presented at "
                                }
                                <em>{paper.conference}</em>
                            </p>
                            <p className="paper-description">{paper.description}</p>
                            <div className="paper-footer">
                                <a href={paper.link} target="_blank" rel="noopener noreferrer" className="paper-link">
                                    <FontAwesomeIcon icon={faLink} /> View Paper
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Research; 