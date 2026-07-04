import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import * as THREE from "three";
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer.js";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

/**
 * The Lab — academic / research editorial portfolio.
 * Faithful port of the Resugo "lab-research" template (paper-and-ink palette,
 * crimson accent, Instrument Serif display type, grid-paper hero with a 3D card
 * stack, recognitions marquee, metrics grid, work ledger, research list,
 * experience timeline, foundation, statement and contact) — adapted to plain JS
 * and populated with Hasti Vakani's real content.
 */

/* ────────────────────────────────────────────────────────────────────────
   CONTENT — edit your details here.
   NOTE: email + social links below are placeholders. Replace them with your
   real handles before deploying.
   ──────────────────────────────────────────────────────────────────────── */
const DATA = {
  name: "Hasti Vakani",
  field: "Computer Science",
  heroEyebrow: "Portfolio · 2026",
  heroTagline: "Engineer by training. Builder by habit.",
  headline: "Spectral signatures, neural nets, and shipped products.",
  about:
    "B.Tech in Computer Science & Engineering from CHARUSAT (CGPA 8.40), co-founder of Byteosaurus, managing partner at UniMisk ERP Solutions, and an AI project trainee at the Physical Research Laboratory. I publish peer-reviewed ML research — plant-disease spectroscopy, anomaly detection, forecasting — and ship B2B/B2C SaaS products used by hundreds of people.",
  gpa: "8.40",
  availability: "B.Tech graduate — open to research & software roles.",

  // Real contact details (from CV hyperlinks).
  email: "hasti.vakani9104@gmail.com",
  phone: "+91 93746 15759",
  links: [
    { label: "GitHub", url: "https://github.com/Hasti004" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/hasti-vakani9104" },
    { label: "Google Scholar", url: "https://scholar.google.co.in/citations?hl=en&user=X67WAiYAAAAJ" },
    { label: "ORCID", url: "https://orcid.org/0009-0006-5905-1007" },
    { label: "Portfolio", url: "https://hastivakani.com" },
  ],
};

// Research — peer-reviewed journals first, then conference papers.
export const PAPERS = [
  {
    title:
      "Plant Disease Classification with Spectral Signature Taxonomy and Analysis Software (SSTAS)",
    status: "Journal · Accepted",
    authors: "H. Jayswal, H. Desai, H. Vakani, M. Mistry, N. Dubey, et al.",
    venue: "Software Impacts (Web of Science ESCI · IF 1.3 · Q3) · 2025",
    year: "2025",
    abstract:
      "A spectroscopy-based technique for detecting non-visible plant diseases. Using spectral signatures (400–1000 nm) collected over 15 months at Anand Agriculture University and the CHARUSAT Space Research Centre, the SSTAS software with a Deep-Spectro model outperformed traditional visual methods on mango disease detection.",
    url: "https://authors.elsevier.com/sd/article/S2665963825000041",
  },
  {
    title:
      "Symptom-Based Early Detection and Classification of Plant Diseases Using AI-Driven CNN+KNN Fusion Software (ACKFS)",
    status: "Journal · Published",
    authors: "H. Jayswal, H. Desai, H. Vakani, M. Mistry, N. Dubey",
    venue: "Software Impacts, Elsevier (IF 1.5 · Q2) · 2025",
    year: "2025",
    abstract:
      "ACKFS integrates CNN and KNN across a four-phase pipeline, reaching 94.56% and 87.52% accuracy on two datasets — demonstrating effective CNN–KNN fusion for real-time plant-disease detection on smart devices.",
    url: "https://doi.org/10.1016/j.simpa.2025.100755",
  },
  {
    title:
      "Spectral Analysis of Lime Leaves: Advancing Lyme Disease Detection Using Machine Learning and Spectrometry",
    status: "Conference",
    authors: "A. Nath, H. Vakani, H. Jayswal, N. Dubey, et al.",
    venue: "3rd World Conference on Information Systems for Business Management (WCISBM), Springer · Bangkok · Sept 2024",
    year: "2024",
    abstract:
      "Hybrid LSTM, RNN and BiLSTM networks combined with SVM, KNN and XGBoost classifiers applied to lime-leaf spectrometry data, achieving up to 98.6% precision.",
    url: "https://drive.google.com/file/d/1lOCyKHfuw1ffLmGR_-38QNtgoqzC8gYs/view?usp=drive_link",
  },
  {
    title: "Obesity Level Prediction Using Machine Learning",
    status: "Conference",
    authors: "H. Vakani, M. Mistry, N. Sharma, H. Jayswal, et al.",
    venue: "10th Intl. Congress on ICT (ICICT 2025), Springer · London · Feb 2025",
    year: "2025",
    abstract:
      "A stacking ensemble of Random Forest, Gradient Boosting, SVM and Neural Networks predicting obesity levels, reaching 96.69% accuracy across diverse population datasets.",
    url: "https://drive.google.com/file/d/1iZTdFtRRlPspZ4Zs2IeMnuaK4pEwugng/view?usp=drive_link",
  },
  {
    title: "Automated Detection of Potholes Using Deep Learning",
    status: "Conference",
    authors: "M. Mistry, H. Vakani, M. Patel, H. Jayswal, et al.",
    venue: "10th Intl. Congress on ICT (ICICT 2025), Springer · London · Feb 2025",
    year: "2025",
    abstract:
      "EfficientNetB0 for road-surface monitoring, trained on 400 annotated images under diverse conditions and reaching 91.91% validation accuracy.",
    url: "https://drive.google.com/file/d/1ME4uwQfUke4F6BPUvxJfyBvvPnBp7wV8/view?usp=drive_link",
  },
  {
    title: "Anomaly Detection in Industrial Machines Using Echo State Networks",
    status: "Conference · Accepted",
    authors: "M. Patel, M. Mistry, H. Vakani, S. Patel, et al.",
    venue: "Intl. Conference on ICT for Sustainable Development (ICT4SD), Springer · Goa · July 2025",
    year: "2025",
    abstract:
      "Echo State Networks for detecting anomalies in industrial machinery from time-series sensor data — modelling temporal dependencies with high accuracy and lower computational overhead than traditional RNNs.",
    url: "https://docs.google.com/document/d/1Hl_Pn-rhUKT45wC0_RG7IbtWYWqZZQ8p/edit",
  },
  {
    title: "Predictive Analysis of Apple Stock Trends Using LSTM Models",
    status: "Conference · Submitted",
    authors: "N. Sharma, H. Vakani, M. Mistry, H. Jayswal, et al.",
    venue: "5th Intl. Conference on Computer Technology, Management & Applications (CTMA 2025), Springer · Pune · 2025",
    year: "2025",
    abstract:
      "Logistic Regression, XGBoost, Neural Networks, RNN, LSTM and ARIMA applied to 2014–2024 Apple stock data, reaching 96.50% accuracy with LSTM.",
    url: "https://drive.google.com/file/d/1G1qd0T1BkEx7Vu3qoSPsJaytSL9DPeU8/view?usp=drive_link",
  },
];

const PROJECTS = [
  {
    title: "Vibrant Gujarat — Forest Dept. Digital Initiatives",
    category: "Web · Kiosks · Analytics",
    description:
      "Visitor-facing websites and interactive stall experiences for the Gujarat Forest Department across two Vibrant Gujarat conferences — the Oath Kiosk (1,200+ visitors) and the Rashi Tree experience (1,500+ visitors), plus a footfall-counter analytics solution.",
    url: "https://oathkiosk.amitfibredecor.com/",
  },
  {
    title: "PesoWise — Expense & Petty-Cash SaaS",
    category: "React · Supabase · Gemini",
    description:
      "Role-based expense-management platform with submissions, approvals, reimbursements and report drill-downs, used by 500+ users. Supabase/PostgreSQL schemas with RLS and Gemini-powered natural-language expense parsing.",
    url: "https://pesowise.unimisk.com/",
  },
  {
    title: "ResuGo — Resume & Career Platform",
    category: "Web · Career",
    description:
      "A resume-building platform that turns user-entered education, skills and projects into recruiter-friendly resumes and portfolio websites, with guided editing flows.",
    url: "https://resugo.byteosaurus.com/",
  },
  {
    title: "ServiceWise — Fleet & Transport Ops SaaS",
    category: "React · Supabase",
    description:
      "Vehicle, driver, booking and service-management workflows with role-aware fleet status, vehicle allocation, payments, compliance and operational dashboards.",
    url: "https://servicewise.unimisk.com/",
  },
  {
    title: "Ops Central — Inventory & Warehouse Platform",
    category: "System Design · Barcode",
    description:
      "Inventory workflow covering stock check-in/out, product-image verification, and barcode generation and scanning, with warehouse-to-bin hierarchies and multi-organisation access separation.",
    url: "https://ops-central.unimisk.com/",
  },
  {
    title: "ScoreWise — AI GRE Essay Practice",
    category: "React · Node · NLP",
    description:
      "Full-stack GRE AWA practice platform with random topic generation, a live timer, typing metrics and AI feedback, plus grammar modules and performance dashboards.",
    url: "https://scorewise.byteosaurus.com/",
  },
  {
    title: "TaskFlow — B2B Task Management",
    category: "Web · Productivity",
    description:
      "A B2B task-management app for creating, prioritising and tracking work across pending, active and completed stages, with deadlines and structured visibility.",
    url: "https://taskflow.unimisk.com/",
  },
  {
    title: "Kidzopedia — Learning Platform for Children",
    category: "Web · EdTech",
    description:
      "A child-friendly learning platform presenting educational topics through structured, engaging content with age-appropriate, intuitive interface design.",
    url: "https://kidzopedia.byteosaurus.com/",
  },
  {
    title: "Anathema — Multiplayer Word Game",
    category: "Web Game · Real-Time",
    description:
      "A social taboo-style word-guessing game with secret words, restricted clues, team rounds and competitive scoring — Pass & Play and live two-device gameplay.",
    url: "https://anathema.byteosaurus.com/",
  },
  {
    title: "MemeClash — Multiplayer Party Game",
    category: "React · Game UI",
    description:
      "A browser-based multiplayer party game with lobbies, host-only room controls and a motion-rich cyberpunk-comic visual system.",
    url: "https://memeclash.vercel.app/",
  },
  {
    title: "Headless Shopify Storefront",
    category: "React · TS · Shopify",
    description:
      "A custom React storefront connected to Shopify for product, collection, cart, wishlist and checkout — with route-based collection resolution and Shopify-hosted checkout.",
  },
  {
    title: "Nal Sarovar Wetland Restoration Analysis",
    category: "Remote Sensing · GEE",
    description:
      "Land-cover and ecological trend analysis for the Nal Sarovar wetland restoration initiative using satellite imagery and historical data in Google Earth Engine.",
  },
  {
    title: "DonateNow — Blood Donation App",
    category: "MongoDB · React · Node",
    description:
      "A full-stack blood-donation app with JWT authentication, SMS notifications and user/admin dashboards.",
    url: "https://github.com/Mithil1105/BloodDonation",
  },
  {
    title: "Secret Language of Birds",
    category: "IoT · Raspberry Pi",
    description:
      "An interactive Raspberry Pi bird-call exhibit synchronising LED and sound, installed at the Nal Sarovar, Thol Lake and Kevdi bird sanctuaries for visitor education.",
  },
  {
    title: "Obesity Predictor",
    category: "Flask · Python · ML",
    description:
      "A web interface for real-time obesity-level prediction backed by a research machine-learning API, enabling live public demonstration of the model.",
    url: "https://github.com/Hasti004/Obesity_Predictor",
  },
  {
    title: "Brandz App",
    category: "Flutter · Firebase",
    description:
      "A festival poster-making app for businesses with real-time template previews and Firebase-backed secure storage and authentication.",
  },
];

export const EXPERIENCE = [
  {
    role: "Managing Partner",
    company: "UniMisk ERP Solutions — Ahmedabad",
    dates: "Present",
    description:
      "Lead a B2B ERP & business-automation company delivering Tally Prime implementation, customisation, cloud deployment and integrations, and drive development of SaaS/AI tools including PesoWise, ServiceWise, TaskFlow and Ops Central.",
  },
  {
    role: "Co-Founder",
    company: "Byteosaurus — B2C Technology",
    dates: "Present",
    description:
      "Co-founded a consumer-tech venture; lead product strategy, UX direction and end-to-end delivery of products including ResuGo, Kidzopedia, Anathema and MemeClash.",
  },
  {
    role: "Project Trainee — AI for Atmospheric Data Systems",
    company: "Physical Research Laboratory (PRL) — Ahmedabad",
    dates: "Sept 2025 – Present",
    description:
      "Build ML models (SVM, Random Forest, LSTM) for weather-pattern prediction from multi-station IoT and satellite data, and real-time anomaly-detection dashboards for temperature, humidity and UV indices.",
  },
  {
    role: "ML & Application Development Intern",
    company: "Hidden Brains — Ahmedabad",
    dates: "May 2024 – June 2025",
    description:
      "Built Python ML pipelines (NumPy, pandas, scikit-learn, TensorFlow) including a geospatial landslide-detection model at 85%+ accuracy, and enhanced the Clean Rides Flutter app with secure auth and a Firebase real-time backend.",
  },
  {
    role: "Research Intern — Spectrometry & ML",
    company: "CHARUSAT Space Research Center — Anand",
    dates: "May 2024 – June 2024",
    description:
      "Researched lime-disease classification from spectrometry data using hybrid LSTM/RNN/BiLSTM models with SVM, KNN and XGBoost, achieving 98.6% precision.",
  },
  {
    role: "Part-Time Intern",
    company: "Amit Fibre Decor — Ahmedabad",
    dates: "May 2022 – Oct 2024",
    description:
      "Designed professional presentations for INDEXTb and Vibrant Gujarat initiatives and supported creative-design and delivery workflows for large-scale exhibition projects.",
  },
];

export const EDUCATION = [
  {
    degree: "B.Tech, Computer Science & Engineering",
    name: "CHARUSAT — Anand, India · CGPA 8.40/10",
    dates: "Sept 2022 – May 2026",
  },
  {
    degree: "High School (Science)",
    name: "St. Xavier's High School, Loyola Hall — Ahmedabad · 99.03 percentile",
    dates: "Graduated 2022",
  },
];

export const CERTIFICATIONS = [
  { title: "Google UI/UX Design", issuer: "Google", year: "2025" },
  { title: "Java Programming", issuer: "", year: "2024" },
  { title: "Fundamentals of Linux", issuer: "", year: "2024" },
  { title: "Python Programming", issuer: "", year: "2025" },
  { title: "Graphic Designing", issuer: "", year: "2023" },
];

const AWARDS = [
  "State-Level Gymnastics Champion — National School Games",
  "Joint President — CHARUSAT Economic Club",
  "Core Team — AWS Cloud Student Club",
  "Board Member — Rotaract Club",
];

// Grouped skills (rendered as labelled tag clusters in the Foundation aside).
export const SKILLS = [
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "C/C++", "C#", "Java", "SQL", "Dart"] },
  { group: "Web & App", items: ["React.js", "Node.js", "Express.js", "Flutter", "Tailwind CSS", "REST APIs", "Shopify API"] },
  { group: "Data & Backend", items: ["PostgreSQL", "Supabase", "MongoDB", "Firebase", "Edge Functions", "RLS"] },
  { group: "AI / ML", items: ["TensorFlow", "Keras", "scikit-learn", "NumPy", "pandas", "OpenCV", "NLP", "Gemini API", "Earth Engine"] },
  { group: "DevOps", items: ["Docker", "Coolify", "Linux", "Nginx", "Git/GitHub"] },
  { group: "IoT & Design", items: ["Arduino", "Raspberry Pi", "Figma", "Canva", "Unity", "UI/UX"] },
];

/* ──────────────────────────────────────────────────────────────────────── */

export const C = {
  paper: "oklch(0.985 0.002 247)",
  ink: "oklch(0.145 0 0)",
  crimson: "oklch(0.48 0.19 25)",
  card: "oklch(1 0 0)",
  secondary: "oklch(0.96 0.003 247)",
  border: "oklch(0.9 0.005 247)",
  muted: "oklch(0.45 0.01 247)",
};

const easing = [0.65, 0, 0.35, 1];

export const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Work+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
.lr-root {
  --lr-paper: oklch(0.985 0.002 247);
  --lr-ink: oklch(0.145 0 0);
  --lr-crimson: oklch(0.48 0.19 25);
  --lr-card: oklch(1 0 0);
  --lr-secondary: oklch(0.96 0.003 247);
  --lr-border: oklch(0.9 0.005 247);
  --lr-muted: oklch(0.45 0.01 247);
  --lr-serif: 'Instrument Serif', Georgia, 'Times New Roman', serif;
  --lr-sans: 'Work Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --lr-mono: 'JetBrains Mono', ui-monospace, monospace;
  background-color: var(--lr-paper);
  color: var(--lr-ink);
  font-family: var(--lr-sans);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
.lr-hero { container-type: inline-size; }
.lr-hero-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; align-items: center; }
.lr-hero-card { display: none; }
@container (min-width: 1024px) {
  .lr-hero-grid { grid-template-columns: 7fr 5fr; }
  .lr-hero-card { display: block; }
}
.lr-root ::selection { background: var(--lr-ink); color: var(--lr-paper); }
.lr-serif { font-family: var(--lr-serif); }
.lr-mono { font-family: var(--lr-mono); }
.lr-display { font-family: var(--lr-serif); font-weight: 400; letter-spacing: -0.025em; line-height: 0.95; }
.lr-display-italic { font-family: var(--lr-serif); font-style: italic; font-weight: 400; letter-spacing: -0.03em; }
.lr-label { font-family: var(--lr-mono); font-size: 0.7rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; }
.lr-grid-paper {
  background-image:
    linear-gradient(to right, oklch(0 0 0 / 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, oklch(0 0 0 / 0.04) 1px, transparent 1px);
  background-size: 48px 48px;
}
.lr-noise::after {
  content: ""; position: absolute; inset: 0; pointer-events: none; opacity: 0.035; mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
}
.lr-link { position: relative; display: inline-block; }
.lr-link::after {
  content: ""; position: absolute; left: 0; bottom: -2px; width: 100%; height: 1px; background: currentColor;
  transform: scaleX(0); transform-origin: right; transition: transform 0.4s cubic-bezier(0.65,0,0.35,1);
}
.lr-link:hover::after { transform: scaleX(1); transform-origin: left; }
.lr-marquee-track { animation: lr-marquee 40s linear infinite; }
@keyframes lr-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.lr-perspective { perspective: 1200px; perspective-origin: 50% 50%; }
.lr-paper-shadow { box-shadow: 0 1px 0 oklch(0 0 0 / 0.04), 0 8px 24px -12px oklch(0 0 0 / 0.08); }
.lr-lift-shadow { box-shadow: 0 20px 40px -20px oklch(0 0 0 / 0.15), 0 8px 16px -8px oklch(0 0 0 / 0.08); }
@media (prefers-reduced-motion: reduce) { .lr-marquee-track { animation: none; } }
`;

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: easing },
};

/** Lightweight 3D-feel hero: the layered "floppy" floating cards with parallax
 *  mouse-tilt. Superseded by the particle-built card (<ParticleField/>); kept
 *  for easy revert. */
// eslint-disable-next-line no-unused-vars
function Hero3D({ name, field, headline }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [12, -12]), { stiffness: 80, damping: 20 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-12, 12]), { stiffness: 80, damping: 20 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduce]);

  const initials = name.trim().charAt(0).toUpperCase() || "A";
  const idCode = `2026.${field.slice(0, 2).toUpperCase() || "CS"}.0481`;

  return (
    <div className="lr-perspective w-full h-full flex items-center justify-center">
      <motion.div
        style={{ rotateX: reduce ? 0 : rx, rotateY: reduce ? 0 : ry, transformStyle: "preserve-3d" }}
        className="relative w-[360px] h-[460px]"
      >
        {/* Back layer — paper */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: easing }}
          style={{ transform: "translateZ(-80px) translateX(40px) translateY(20px) rotate(6deg)", backgroundColor: C.card, borderColor: C.border }}
          className="lr-paper-shadow absolute inset-0 border"
        >
          <div className="lr-mono absolute top-4 left-4 right-4 flex justify-between text-[10px]" style={{ color: C.muted }}>
            <span>arXiv:2026.18472</span>
            <span>cs.LG</span>
          </div>
          <div className="absolute top-12 left-4 right-4">
            <p className="lr-serif text-lg leading-tight">{headline || "Work I'd be proud to defend."}</p>
          </div>
          <div className="absolute bottom-4 left-4 right-4 grid grid-cols-8 gap-px">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="aspect-square" style={{ backgroundColor: C.ink, opacity: 0.04 + (i % 7) * 0.02 }} />
            ))}
          </div>
        </motion.div>

        {/* Mid layer — terminal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: easing }}
          style={{ transform: "translateZ(-20px) translateX(-30px) translateY(-10px) rotate(-3deg)", backgroundColor: C.ink, color: C.paper }}
          className="lr-lift-shadow lr-mono absolute inset-0 text-[11px] p-5"
        >
          <div className="flex gap-1.5 mb-3">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: C.paper, opacity: 0.3 }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: C.paper, opacity: 0.3 }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: C.paper, opacity: 0.3 }} />
          </div>
          <p className="opacity-60">$ python train.py --model deep-spectro</p>
          <p className="opacity-90 mt-1">epoch 12/50 · loss 1.847 · acc 0.731</p>
          <p className="opacity-90">epoch 13/50 · loss 1.792 · acc 0.748</p>
          <p className="opacity-90">epoch 14/50 · loss 1.751 · acc 0.762</p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: reduce ? 1 : [0, 1, 0, 1] }}
            transition={{ duration: 2, delay: 1.5, repeat: reduce ? 0 : Infinity }}
            className="mt-2"
            style={{ color: C.crimson }}
          >
            ✓ new best · saving checkpoint
          </motion.p>
          <div className="absolute bottom-5 left-5 right-5">
            <div className="h-px mb-2" style={{ backgroundColor: C.paper, opacity: 0.2 }} />
            <div className="flex justify-between opacity-50">
              <span>~/research/spectral</span>
              <span>main *</span>
            </div>
          </div>
        </motion.div>

        {/* Front layer — ID card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: easing }}
          style={{ transform: "translateZ(60px) translateX(20px) translateY(40px) rotate(2deg)", backgroundColor: C.card, borderColor: C.border }}
          className="lr-lift-shadow absolute inset-x-8 bottom-0 h-48 border p-5"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="lr-label" style={{ color: C.muted }}>Researcher</p>
              <p className="lr-serif text-2xl mt-1">{name}</p>
            </div>
            <div className="w-10 h-10 flex items-center justify-center lr-serif text-lg" style={{ backgroundColor: C.crimson, color: C.paper }}>
              {initials}
            </div>
          </div>
          <div className="lr-mono mt-4 space-y-1 text-[10px]" style={{ color: C.muted }}>
            <p>ID · {idCode}</p>
            {field && <p>FIELD · {field}</p>}
            <p>STATUS · Open to opportunities</p>
          </div>
          <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end">
            <div className="flex gap-px">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} style={{ width: 1, height: 8 + (i % 4) * 4, backgroundColor: C.ink }} />
              ))}
            </div>
            <span className="lr-mono text-[9px]" style={{ color: C.muted }}>VALID 2026</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/** Draws a compact "Disciplines" collage — fields in italic serif, axis-aligned
 *  (horizontal + a couple vertical), with strong size contrast — onto a 2D canvas,
 *  so its pixels can be sampled into particles. Dark text reads as particles on
 *  the light hero; one crimson diamond is the accent. */
function drawCard(octx, cw, ch) {
  const DW = 420;
  const DH = 380;
  octx.clearRect(0, 0, cw, ch);
  octx.save();
  octx.scale(cw / DW, ch / DH);
  octx.textBaseline = "alphabetic";

  // Tiny header.
  octx.fillStyle = "#9a9a9a";
  octx.font = "10px monospace";
  octx.fillText("DISCIPLINES / 09", 24, 26);

  // Horizontal words [name, size, x, y] — strong size contrast (13–38).
  const horiz = [
    ["Machine learning", 38, 24, 80],
    ["Spectral ML", 34, 24, 150],
    ["Anomaly detection", 16, 24, 186],
    ["SaaS platforms", 22, 24, 214],
    ["Product design", 28, 24, 250],
    ["ERP & automation", 15, 24, 300],
    ["Backend systems", 13, 24, 326],
  ];
  octx.fillStyle = "#181818";
  horiz.forEach(([name, size, x, y]) => {
    octx.font = `italic ${size}px Georgia, 'Times New Roman', serif`;
    octx.fillText(name, x, y);
  });

  // Crimson diamond near "Machine learning".
  octx.save();
  octx.translate(338, 66);
  octx.rotate(Math.PI / 4);
  octx.fillStyle = "#c8132a";
  octx.fillRect(-5, -5, 10, 10);
  octx.restore();

  // Vertical words on the right [name, size, x, yBottom] — read bottom-to-top.
  const vert = [
    ["Applied research", 22, 360, 350],
    ["Full-stack engineering", 15, 392, 350],
  ];
  octx.fillStyle = "#181818";
  vert.forEach(([name, size, x, yB]) => {
    octx.save();
    octx.translate(x, yB);
    octx.rotate(-Math.PI / 2);
    octx.font = `italic ${size}px Georgia, 'Times New Roman', serif`;
    octx.fillText(name, 0, 0);
    octx.restore();
  });

  octx.restore();
}

// ── GPGPU shaders ──────────────────────────────────────────────────────────
// Velocity sim: spring toward home, explode away from the cursor, light jitter.
const VEL_FRAG = `
uniform vec2 uMouse;
uniform vec2 uMouseVel;
uniform sampler2D uHome;
uniform float uRadius;
uniform float uPush;
uniform float uDrag;
uniform float uFriction;
uniform float uBurst;
uniform vec2 uBurstCenter;
uniform float uBurstPower;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec4 home = texture2D(uHome, uv);
  vec4 pos = texture2D(texturePosition, uv);
  vec4 vel = texture2D(textureVelocity, uv);
  if (home.w < 0.5) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); return; }
  vec2 v = vel.xy;
  // cursor scatters a swath of the text as it passes through, also carrying it
  // a little along the cursor's motion.
  if (uMouse.x > -9000.0) {
    vec2 d = pos.xy - uMouse;
    float dist = length(d) + 0.0001;
    if (dist < uRadius) {
      float f = 1.0 - dist / uRadius;
      f = f * f;
      v += uMouseVel * f * uDrag;
      v += (d / dist) * f * uPush;
    }
  }
  // click burst: every particle is kicked outward from the click point, with a
  // per-particle random factor so it explodes organically, then reassembles.
  if (uBurst > 0.001) {
    vec2 bd = pos.xy - uBurstCenter;
    float bl = length(bd) + 0.001;
    float rnd = hash(uv) * 0.7 + 0.6;
    v += (bd / bl) * uBurst * uBurstPower * rnd;
  }
  // NO spring here -> no oscillation/bounce. Friction makes it weighty: particles
  // glide and gradually stop instead of snapping.
  v *= uFriction;
  gl_FragColor = vec4(v, 0.0, 1.0);
}`;

// Position sim: integrate velocity.
const POS_FRAG = `
uniform sampler2D uHome;
uniform float uReturn;
uniform float uTime;
uniform float uAmbient;
void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec4 home = texture2D(uHome, uv);
  vec4 pos = texture2D(texturePosition, uv);
  vec4 vel = texture2D(textureVelocity, uv);
  if (home.w < 0.5) { gl_FragColor = pos; return; }
  // gentle, slow ambient breathing target (bounded -> never drifts away)
  vec2 drift = vec2(
    sin(uTime * 0.35 + home.x * 0.05),
    cos(uTime * 0.30 + home.y * 0.05)
  ) * uAmbient;
  vec2 target = home.xy + drift;
  pos.xy += vel.xy;                               // momentum from the cursor
  // slow exponential ease toward the (breathing) home — approaches, never
  // overshoots, so the ~4–5s return has NO bounce.
  pos.xy += (target - pos.xy) * uReturn;
  gl_FragColor = pos;
}`;

// Render: read each particle's simulated position from the texture, place it.
const RENDER_VERT = `
uniform sampler2D uPosTex;
uniform vec2 uResolution;
uniform float uSize;
attribute vec2 reference;
attribute vec3 aColor;
attribute float aAlive;
varying vec3 vColor;
varying float vAlive;
void main() {
  vec4 p = texture2D(uPosTex, reference);
  vColor = aColor;
  vAlive = aAlive;
  vec2 clip = vec2(p.x / uResolution.x * 2.0 - 1.0, 1.0 - p.y / uResolution.y * 2.0);
  gl_Position = vec4(clip, 0.0, 1.0);
  gl_PointSize = aAlive > 0.5 ? uSize : 0.0;
}`;

const RENDER_FRAG = `
precision highp float;
varying vec3 vColor;
varying float vAlive;
void main() {
  if (vAlive < 0.5) discard;
  gl_FragColor = vec4(vColor, 0.9);
}`;

/**
 * The "floppy" disk rendered out of *lakhs* of particles via a GPU (GPGPU)
 * simulation. The card design is drawn to an offscreen canvas; its dark/colour
 * pixels are sampled into hundreds of thousands of points (bright text is left
 * out so it reads as gaps on the light page). The physics — spring-home,
 * explode-away-from-cursor, drift-back, jitter — runs entirely on the GPU, so it
 * stays smooth at this density. Honors prefers-reduced-motion.
 */
function ParticleField() {
  const mountRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(dpr);
    Object.assign(renderer.domElement.style, { width: "100%", height: "100%", display: "block" });
    mount.appendChild(renderer.domElement);

    const camera = new THREE.Camera(); // shader writes clip-space directly
    const scene = new THREE.Scene();
    const off = document.createElement("canvas");
    const octx = off.getContext("2d", { willReadFrequently: true });

    let W = 0;
    let H = 0;
    let gpu = null;
    let posVar = null;
    let velVar = null;
    let homeTex = null;
    let geom = null;
    let material = null;
    let pointsObj = null;
    const mouse = { x: -9999, y: -9999 };

    const dispose = () => {
      if (pointsObj) { scene.remove(pointsObj); geom.dispose(); material.dispose(); pointsObj = null; }
      if (homeTex) { homeTex.dispose(); homeTex = null; }
      if (gpu) { gpu.dispose(); gpu = null; }
    };

    // (Re)build the whole GPGPU particle system sampled from the card image.
    const build = (w, h) => {
      W = w;
      H = h;
      renderer.setSize(W, H, false);
      dispose();

      // Collage box — deliberately compact & centred (occupies a smaller area),
      // keeping the 420:380 aspect.
      let cardW = Math.min(330, W * 0.72);
      let cardH = (cardW * 380) / 420;
      if (cardH > H * 0.7) {
        cardH = H * 0.7;
        cardW = (cardH * 420) / 380;
      }
      const offX = (W - cardW) / 2;
      const offY = (H - cardH) / 2;

      // High-res draw so we can sample lots of pixels from the text.
      const imgW = 640;
      const imgH = Math.round((imgW * 380) / 420);
      off.width = imgW;
      off.height = imgH;
      drawCard(octx, imgW, imgH);
      const data = octx.getImageData(0, 0, imgW, imgH).data;

      // Collect the "alive" (dark / coloured) pixels — bright text is skipped so
      // it reads as gaps on the light page.
      const hxs = [];
      const cls = [];
      for (let y = 0; y < imgH; y++) {
        for (let x = 0; x < imgW; x++) {
          const p = (y * imgW + x) * 4;
          if (data[p + 3] < 60) continue;
          const r = data[p];
          const g = data[p + 1];
          const b = data[p + 2];
          if ((0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.82) continue;
          hxs.push(offX + (x / imgW) * cardW, offY + (y / imgH) * cardH);
          cls.push(r / 255, g / 255, b / 255);
        }
      }
      const N = hxs.length / 2;
      const texSize = Math.min(768, Math.ceil(Math.sqrt(N)));
      const total = texSize * texSize;

      gpu = new GPUComputationRenderer(texSize, texSize, renderer);
      const dtPos = gpu.createTexture();
      const dtVel = gpu.createTexture();
      const posData = dtPos.image.data;
      const homeData = new Float32Array(total * 4);
      const colorAttr = new Float32Array(total * 3);
      const aliveAttr = new Float32Array(total);
      const refAttr = new Float32Array(total * 2);

      for (let i = 0; i < total; i++) {
        // Map every texel to one alive sample (stride if there are more samples).
        const src = N <= total ? (i < N ? i : -1) : Math.floor((i * N) / total);
        const alive = src >= 0 && src < N;
        const hx = alive ? hxs[src * 2] : -9999;
        const hy = alive ? hxs[src * 2 + 1] : -9999;
        homeData[i * 4] = hx;
        homeData[i * 4 + 1] = hy;
        homeData[i * 4 + 2] = 0;
        homeData[i * 4 + 3] = alive ? 1 : 0;
        posData[i * 4] = hx;
        posData[i * 4 + 1] = hy;
        posData[i * 4 + 2] = 0;
        posData[i * 4 + 3] = 1;
        colorAttr[i * 3] = alive ? cls[src * 3] : 0;
        colorAttr[i * 3 + 1] = alive ? cls[src * 3 + 1] : 0;
        colorAttr[i * 3 + 2] = alive ? cls[src * 3 + 2] : 0;
        aliveAttr[i] = alive ? 1 : 0;
        refAttr[i * 2] = ((i % texSize) + 0.5) / texSize;
        refAttr[i * 2 + 1] = (Math.floor(i / texSize) + 0.5) / texSize;
      }

      homeTex = new THREE.DataTexture(homeData, texSize, texSize, THREE.RGBAFormat, THREE.FloatType);
      homeTex.minFilter = THREE.NearestFilter;
      homeTex.magFilter = THREE.NearestFilter;
      homeTex.needsUpdate = true;

      velVar = gpu.addVariable("textureVelocity", VEL_FRAG, dtVel);
      posVar = gpu.addVariable("texturePosition", POS_FRAG, dtPos);
      gpu.setVariableDependencies(velVar, [posVar, velVar]);
      gpu.setVariableDependencies(posVar, [posVar, velVar]);
      Object.assign(velVar.material.uniforms, {
        uMouse: { value: new THREE.Vector2(-9999, -9999) },
        uMouseVel: { value: new THREE.Vector2(0, 0) },
        uHome: { value: homeTex },
        uRadius: { value: 64 }, // cursor scatters a swath of text as it passes through
        uPush: { value: 6 }, // radial scatter (the text fans apart)
        uDrag: { value: 0.8 }, // also carried along the cursor's motion
        uFriction: { value: 0.85 }, // particles fly out, then halt (no spring => no bounce)
        uBurst: { value: 0 }, // set to 1 on click, decays each frame
        uBurstCenter: { value: new THREE.Vector2(0, 0) },
        uBurstPower: { value: 2.6 }, // click explosion strength
      });
      posVar.material.uniforms.uHome = { value: homeTex };
      posVar.material.uniforms.uReturn = { value: 0.009 }; // very slow ~4–5s reform, overshoot-free
      posVar.material.uniforms.uTime = { value: 0 };
      posVar.material.uniforms.uAmbient = { value: 1.6 }; // subtle slow breathing at rest
      const err = gpu.init();
      if (err) console.error("GPGPU init error:", err);

      geom = new THREE.BufferGeometry();
      geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(total * 3), 3));
      geom.setAttribute("reference", new THREE.BufferAttribute(refAttr, 2));
      geom.setAttribute("aColor", new THREE.BufferAttribute(colorAttr, 3));
      geom.setAttribute("aAlive", new THREE.BufferAttribute(aliveAttr, 1));
      material = new THREE.ShaderMaterial({
        uniforms: {
          uPosTex: { value: null },
          uResolution: { value: new THREE.Vector2(W, H) },
          uSize: { value: 1.3 * dpr },
        },
        vertexShader: RENDER_VERT,
        fragmentShader: RENDER_FRAG,
        transparent: true,
        depthTest: false,
      });
      geom.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 1e6);
      pointsObj = new THREE.Points(geom, material);
      pointsObj.frustumCulled = false;
      scene.add(pointsObj);
    };

    const draw = () => {
      if (!gpu) return;
      material.uniforms.uPosTex.value = gpu.getCurrentRenderTarget(posVar).texture;
      renderer.render(scene, camera);
    };

    const onMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onDown = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      velVar.material.uniforms.uBurstCenter.value.set(e.clientX - rect.left, e.clientY - rect.top);
      velVar.material.uniforms.uBurst.value = 1.0; // click -> explode, then reassemble
    };

    let raf = 0;
    let t = 0;
    let prevMX = -9999;
    let prevMY = -9999;
    const mvel = new THREE.Vector2(0, 0);
    const animate = () => {
      t += 0.016;
      // cursor velocity = the "weight" that carries particles along the path
      if (mouse.x > -9000 && prevMX > -9000) {
        mvel.set(mouse.x - prevMX, mouse.y - prevMY);
      } else {
        mvel.set(0, 0);
      }
      prevMX = mouse.x;
      prevMY = mouse.y;
      velVar.material.uniforms.uMouse.value.set(mouse.x, mouse.y);
      velVar.material.uniforms.uMouseVel.value.copy(mvel);
      const burst = velVar.material.uniforms.uBurst;
      burst.value = burst.value > 0.002 ? burst.value * 0.82 : 0; // decay the click impulse
      posVar.material.uniforms.uTime.value = t;
      gpu.compute();
      draw();
      raf = requestAnimationFrame(animate);
    };

    let iw = mount.clientWidth;
    let ih = mount.clientHeight;
    if (!iw || !ih) { iw = 474; ih = 600; }
    build(iw, ih);
    draw();

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      if (Math.abs(w - W) > 1 || Math.abs(h - H) > 1) { build(w, h); draw(); }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    if (!reduce) {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseout", onLeave);
      renderer.domElement.addEventListener("pointerdown", onDown);
      raf = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      renderer.domElement.removeEventListener("pointerdown", onDown);
      dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [reduce]);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}

/** Fixed top nav — transparent over the hero, blurred paper with a rule once scrolled. */
function LabNav({ name, links }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-500"
      style={
        scrolled
          ? {
              backgroundColor: "rgba(250, 251, 252, 0.72)",
              backdropFilter: "blur(12px) saturate(140%)",
              WebkitBackdropFilter: "blur(12px) saturate(140%)",
              borderBottom: `1px solid ${C.border}`,
            }
          : { backgroundColor: "transparent", borderBottom: "1px solid transparent" }
      }
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="w-2 h-2 rounded-full transition-transform group-hover:scale-150" style={{ backgroundColor: C.crimson }} />
          <span className="lr-serif text-xl tracking-wide">{name}</span>
        </a>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const cls = "px-3 py-2 text-sm transition-colors";
            const sty = { color: "color-mix(in oklch, var(--lr-ink) 70%, transparent)" };
            return l.to ? (
              <Link
                key={l.to}
                to={l.to}
                className={cls}
                style={sty}
                onClick={() => sessionStorage.setItem("homeScrollY", window.scrollY)}
              >
                <span className="lr-link">{l.label}</span>
              </Link>
            ) : (
              <a key={l.href} href={l.href} className={cls} style={sty}>
                <span className="lr-link">{l.label}</span>
              </a>
            );
          })}
        </nav>
        <p className="lr-mono text-xs hidden md:block" style={{ color: C.muted }}>
          N 22.556 · E 72.955
        </p>
      </div>
    </header>
  );
}

const HOMEPAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://hastivakani.com/#profilepage",
      "url": "https://hastivakani.com",
      "name": "Hasti Vakani — ML Researcher, Founder & Software Engineer",
      "mainEntity": { "@id": "https://hastivakani.com#person" }
    },
    {
      "@type": "Person",
      "@id": "https://hastivakani.com#person",
      "name": "Hasti Vakani",
      "givenName": "Hasti",
      "familyName": "Vakani",
      "jobTitle": "Machine Learning Researcher & Founder",
      "email": "hasti.vakani9104@gmail.com",
      "telephone": "+91 93746 15759",
      "url": "https://hastivakani.com",
      "image": "https://hastivakani.com/hv-logo.png",
      "sameAs": [
        "https://github.com/Hasti004",
        "https://www.linkedin.com/in/hasti-vakani9104",
        "https://scholar.google.co.in/citations?hl=en&user=X67WAiYAAAAJ",
        "https://orcid.org/0009-0006-5905-1007"
      ],
      "knowsAbout": [
        "Machine Learning", "Plant Disease Detection", "Spectroscopy",
        "Deep Learning", "Anomaly Detection", "SaaS Development", "UI/UX Design"
      ],
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "CHARUSAT University",
        "url": "https://charusat.ac.in"
      },
      "affiliation": [
        { "@type": "Organization", "name": "Byteosaurus" },
        { "@type": "Organization", "name": "UniMisk ERP Solutions" },
        { "@type": "Organization", "name": "Physical Research Laboratory" }
      ],
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "degree",
        "name": "B.Tech in Computer Science & Engineering",
        "description": "CGPA 8.40/10"
      }
    }
  ]
};

export default function LabResearch() {
  const { name, heroEyebrow, heroTagline, gpa, email, phone, links } = DATA;

  useEffect(() => {
    const savedY = sessionStorage.getItem("homeScrollY");
    if (savedY) {
      sessionStorage.removeItem("homeScrollY");
      requestAnimationFrame(() =>
        requestAnimationFrame(() => window.scrollTo(0, parseInt(savedY, 10)))
      );
    }
  }, []);

  const papers = PAPERS;
  const featured = PROJECTS;
  const marqueeItems = AWARDS.length > 0 ? AWARDS.slice(0, 6) : ["Published research", "Open-source", "Competition wins"];

  const metrics = [
    { n: gpa, l: "CGPA / 10", sub: "CHARUSAT" },
    { n: String(papers.length), l: "Publications", sub: "Journals & conferences" },
    { n: "20+", l: "Projects shipped", sub: "SaaS, research, IoT" },
    { n: String(EXPERIENCE.length), l: "Roles & ventures", sub: "incl. 2 founder roles" },
  ];
  const metricColsClass = "grid-cols-2 sm:grid-cols-4";

  const navLinks = [
    { href: "#research", to: "/on-the-record", label: "Research" },
    { href: "#work", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
    { to: "/cv", label: "CV" },
  ];

  return (
    <div className="lr-root min-h-screen">
      <style>{STYLE}</style>
      <SEO
        title="Hasti Vakani — ML Researcher, Founder & Software Engineer"
        description="ML researcher, founder & software engineer. B.Tech CS (CGPA 8.40), co-founder of Byteosaurus, managing partner at UniMisk ERP Solutions. 7 peer-reviewed papers in Elsevier and Springer."
        canonical="https://hastivakani.com"
        schema={HOMEPAGE_SCHEMA}
      />

      <LabNav name={name} links={navLinks} />

      {/* ── HERO ── */}
      <section id="top" className="lr-hero lr-noise lr-grid-paper relative min-h-screen overflow-hidden scroll-mt-16 -mt-16">
        <div className="lr-hero-grid mx-auto max-w-[1400px] px-6 lg:px-12 pt-32 pb-12 min-h-screen">
          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lr-label flex items-center gap-3"
              style={{ color: C.muted }}
            >
              <span className="w-8 h-px" style={{ backgroundColor: C.muted }} />
              {heroEyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: easing }}
              className="lr-display text-[3.5rem] sm:text-7xl lg:text-[7.5rem] mt-8 leading-[0.92]"
            >
              {name}
            </motion.h1>
            {heroTagline && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: easing }}
                className="lr-display-italic mt-4 text-3xl sm:text-4xl lg:text-5xl"
                style={{ color: C.crimson }}
              >
                {heroTagline}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 max-w-xl"
            >
              <div className="flex flex-wrap gap-3">
                <a
                  href="#research"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-sm transition-colors"
                  style={{ backgroundColor: C.ink, color: C.paper }}
                >
                  Read the research <span className="lr-mono">→</span>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-sm border transition-colors"
                  style={{ borderColor: C.ink }}
                >
                  Get in touch
                </a>
              </div>
              <p className="lr-mono text-xs mt-6" style={{ color: C.muted }}>
                Open to software engineering and ML roles at product-focused companies.
              </p>
            </motion.div>
          </div>

          <div className="lr-hero-card relative h-[500px] lg:h-[600px]">
            <ParticleField />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="lr-mono absolute bottom-8 right-6 lg:right-12 z-10 flex items-center gap-3 text-xs"
          style={{ color: C.muted }}
        >
          Scroll
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="w-px h-8"
            style={{ backgroundColor: C.muted }}
          />
        </motion.div>
      </section>

      {/* ── MARQUEE — recognitions ── */}
      <section className="border-y overflow-hidden" style={{ borderColor: C.border, backgroundColor: C.ink, color: C.paper }}>
        <div className="flex lr-marquee-track whitespace-nowrap py-5">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} className="lr-serif flex items-center gap-12 px-6 text-2xl">
              <span>{item}</span>
              <span style={{ color: C.crimson }}>✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── AT A GLANCE — metrics ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <motion.div {...fade} className="grid md:grid-cols-12 gap-8 mb-16">
            <div className="md:col-span-3">
              <p className="lr-label" style={{ color: C.muted }}>§ 01 — At a glance</p>
            </div>
            <div className="md:col-span-9">
              <h2 className="lr-display text-4xl md:text-6xl">
                Focused work,
                <br />
                <span className="lr-display-italic" style={{ color: C.crimson }}>measured precisely.</span>
              </h2>
            </div>
          </motion.div>

          <div className={`grid ${metricColsClass} gap-px`} style={{ backgroundColor: C.border }}>
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="p-8 group cursor-default"
                style={{ backgroundColor: C.paper }}
              >
                <p className="lr-display text-6xl md:text-7xl transition-colors group-hover:text-[var(--lr-crimson)]">
                  {m.n}
                </p>
                <p className="mt-4 text-sm font-medium">{m.l}</p>
                <p className="lr-mono mt-1 text-xs" style={{ color: C.muted }}>{m.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESEARCH — papers (on a black slab) ── */}
      <section id="research" className="py-24 md:py-32 scroll-mt-16" style={{ backgroundColor: C.ink }}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <motion.div {...fade} className="grid md:grid-cols-12 gap-8 mb-16">
            <div className="md:col-span-3">
              <p className="lr-label" style={{ color: "color-mix(in oklch, var(--lr-paper) 60%, transparent)" }}>§ 02 — Research</p>
            </div>
            <div className="md:col-span-9">
              <h2 className="lr-display text-4xl md:text-6xl" style={{ color: C.paper }}>
                Papers, <span className="lr-display-italic" style={{ color: C.crimson }}>preprints,</span> and ideas.
              </h2>
            </div>
          </motion.div>

          <div className="space-y-px border" style={{ backgroundColor: "color-mix(in oklch, var(--lr-paper) 14%, var(--lr-ink))", borderColor: "color-mix(in oklch, var(--lr-paper) 14%, var(--lr-ink))" }}>
            {papers.slice(0, 3).map((p, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: Math.min(i, 6) * 0.06 }}
                className="p-8 md:p-12 grid md:grid-cols-12 gap-6"
                style={{ backgroundColor: C.ink, color: C.paper }}
              >
                <div className="md:col-span-3">
                  {p.status && <p className="lr-label" style={{ color: C.crimson }}>{p.status}</p>}
                  {p.year && <p className="lr-mono text-xs mt-2" style={{ color: "color-mix(in oklch, var(--lr-paper) 55%, transparent)" }}>{p.year}</p>}
                </div>
                <div className="md:col-span-9">
                  <h3 className="lr-serif text-3xl md:text-4xl leading-tight" style={{ color: C.paper }}>{p.title}</h3>
                  {p.authors && <p className="text-sm mt-3" style={{ color: "color-mix(in oklch, var(--lr-paper) 80%, transparent)" }}>{p.authors}</p>}
                  {p.venue && <p className="text-sm italic mt-1" style={{ color: "color-mix(in oklch, var(--lr-paper) 60%, transparent)" }}>{p.venue}</p>}
                  {p.abstract && (
                    <p className="mt-5 max-w-3xl leading-relaxed" style={{ color: "color-mix(in oklch, var(--lr-paper) 70%, transparent)" }}>
                      {p.abstract}
                    </p>
                  )}
                  {p.url && (
                    <div className="mt-6">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm border px-3 py-1.5 rounded-sm transition-all hover:bg-[var(--lr-paper)] hover:text-[var(--lr-ink)]"
                        style={{ borderColor: "color-mix(in oklch, var(--lr-paper) 30%, transparent)", color: C.paper }}
                      >
                        View ↗
                      </a>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div {...fade} className="mt-10 flex items-center gap-4">
            <Link
              to="/on-the-record"
              className="inline-flex items-center gap-2 text-sm font-medium border px-5 py-3 rounded-sm transition-all hover:bg-[var(--lr-paper)] hover:text-[var(--lr-ink)]"
              style={{ borderColor: "color-mix(in oklch, var(--lr-paper) 35%, transparent)", color: C.paper }}
            >
              Learn more <span className="lr-mono">→</span>
            </Link>
            <span className="lr-mono text-xs" style={{ color: "color-mix(in oklch, var(--lr-paper) 50%, transparent)" }}>
              all {papers.length} papers on the record
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED WORK ── */}
      <section id="work" className="py-24 md:py-32 scroll-mt-16" style={{ backgroundColor: "color-mix(in oklch, var(--lr-secondary) 40%, var(--lr-paper))" }}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <motion.div {...fade} className="grid md:grid-cols-12 gap-8 mb-16">
            <div className="md:col-span-3">
              <p className="lr-label" style={{ color: C.muted }}>§ 03 — Selected work</p>
            </div>
            <div className="md:col-span-9 flex items-end justify-between gap-4">
              <h2 className="lr-display text-4xl md:text-6xl">
                Things that made it to <span className="lr-display-italic">production.</span>
              </h2>
            </div>
          </motion.div>

          <div className="space-y-px border" style={{ backgroundColor: C.border, borderColor: C.border }}>
            {featured.map((item, i) => {
              const Wrap = item.url ? motion.a : motion.div;
              const linkProps = item.url
                ? { href: item.url, target: "_blank", rel: "noopener noreferrer" }
                : {};
              return (
                <Wrap
                  key={i}
                  {...linkProps}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.06 }}
                  className={`p-8 grid md:grid-cols-12 gap-4 group transition-colors ${item.url ? "cursor-pointer" : "cursor-default"}`}
                  style={{ backgroundColor: C.paper }}
                >
                  <div className="md:col-span-7 md:col-start-1">
                    <h3 className="lr-serif text-2xl transition-colors group-hover:text-[var(--lr-crimson)]">{item.title}</h3>
                    {item.description && <p className="text-sm mt-1" style={{ color: C.muted }}>{item.description}</p>}
                  </div>
                  <div className="lr-mono md:col-span-4 text-sm flex md:justify-end" style={{ color: C.muted }}>{item.category}</div>
                  <div
                    className="md:col-span-1 flex md:justify-end items-start text-xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    style={{ color: item.url ? C.ink : "transparent" }}
                  >
                    ↗
                  </div>
                </Wrap>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE — timeline ── */}
      <section id="experience" className="py-24 md:py-32 scroll-mt-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <motion.div {...fade} className="grid md:grid-cols-12 gap-8 mb-12">
            <div className="md:col-span-3">
              <p className="lr-label" style={{ color: C.muted }}>§ 04 — Experience</p>
            </div>
            <div className="md:col-span-9">
              <h2 className="lr-display text-3xl md:text-5xl">
                A timeline of <span className="lr-display-italic">things attempted.</span>
              </h2>
            </div>
          </motion.div>

          <ol className="border-l ml-3" style={{ borderColor: C.border }}>
            {EXPERIENCE.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: Math.min(i, 6) * 0.06 }}
                className="relative pl-8 pb-10 last:pb-0"
              >
                <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: C.crimson }} />
                {item.dates && <p className="lr-mono text-xs" style={{ color: C.muted }}>{item.dates}</p>}
                <h3 className="lr-serif text-2xl mt-1">{item.role}</h3>
                {item.company && (
                  <p className="text-sm font-medium mt-0.5" style={{ color: "color-mix(in oklch, var(--lr-ink) 80%, transparent)" }}>
                    {item.company}
                  </p>
                )}
                {item.description && (
                  <p className="text-sm mt-2 max-w-2xl" style={{ color: C.muted }}>{item.description}</p>
                )}
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── EDUCATION + SKILLS + CERTS + AWARDS ── */}
      <section id="about" className="py-24 md:py-32 scroll-mt-16" style={{ backgroundColor: "color-mix(in oklch, var(--lr-secondary) 40%, var(--lr-paper))" }}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">

          {/* ── About statement ── */}
          <motion.div {...fade} className="mb-20 pb-16 border-b" style={{ borderColor: C.border }}>
            <p className="lr-serif text-2xl md:text-4xl leading-snug mb-8">
              Elsevier on the left. Production servers on the right.<br />
              <span className="lr-display-italic" style={{ color: C.crimson }}>Somewhere in the middle — me.</span>
            </p>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "color-mix(in oklch, var(--lr-ink) 72%, transparent)" }}>
              Computer Science & Engineering graduate from CHARUSAT (B.Tech, 2022–26). Co-founder
              of Byteosaurus and Managing Partner at UniMisk ERP Solutions. My work spans applied ML
              research — seven peer-reviewed papers across Elsevier and Springer in spectroscopy-based
              disease detection, anomaly detection and predictive modelling — and software engineering,
              building SaaS and ERP products for active users.
            </p>
          </motion.div>

          <motion.div {...fade} className="grid md:grid-cols-12 gap-8 mb-12">
            <div className="md:col-span-3">
              <p className="lr-label" style={{ color: C.muted }}>§ 05 — Foundation</p>
            </div>
            <div className="md:col-span-9">
              <h2 className="lr-display text-3xl md:text-5xl">
                Education &amp; <span className="lr-display-italic">credentials.</span>
              </h2>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-12 gap-12">

            {/* Education — order-1 on mobile, left col row 1 on desktop */}
            <div className="md:col-span-7 order-1">
              <p className="lr-label mb-3" style={{ color: C.muted }}>Education</p>
              <div className="space-y-4">
                {EDUCATION.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="border-l-2 pl-4"
                    style={{ borderColor: C.crimson }}
                  >
                    {item.dates && <p className="lr-mono text-xs" style={{ color: C.muted }}>{item.dates}</p>}
                    <p className="lr-serif text-lg mt-0.5">{item.degree}</p>
                    {item.name && <p className="text-sm" style={{ color: C.muted }}>{item.name}</p>}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skills — order-2 on mobile (after Education), right col spanning both rows on desktop */}
            <aside className="md:col-span-5 md:row-span-2 order-2 md:order-3 space-y-6">
              <p className="lr-label" style={{ color: C.muted }}>Skills</p>
              {SKILLS.map((cat) => (
                <div key={cat.group}>
                  <p className="lr-mono text-[10px] tracking-wider uppercase mb-2" style={{ color: C.crimson }}>{cat.group}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((s, i) => (
                      <span key={i} className="lr-mono text-xs border px-2 py-1" style={{ borderColor: C.border }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </aside>

            {/* Achievements — order-3 on mobile (after Skills), left col row 2 on desktop */}
            <div className="md:col-span-7 order-3 md:order-2">
              <p className="lr-label mb-3" style={{ color: C.muted }}>Achievements & leadership</p>
              <ul className="space-y-2">
                {AWARDS.map((item, i) => (
                  <li key={i} className="flex gap-3 text-base">
                    <span className="lr-mono text-xs mt-1.5" style={{ color: C.crimson }}>→</span>
                    <span className="lr-serif text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── STATEMENT ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <motion.div {...fade} className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
              <p className="lr-label" style={{ color: C.muted }}>§ 06 — Statement</p>
            </div>
            <div className="md:col-span-9">
              <p className="lr-serif text-3xl md:text-5xl leading-[1.15] tracking-tight">
                I'm drawn to problems where{" "}
                <span className="lr-display-italic" style={{ color: C.crimson }}>elegant theory</span>{" "}
                meets <span className="lr-display-italic">stubborn engineering.</span> My work tries to live in that tension.
              </p>
              <div className="mt-10 flex items-center gap-4">
                <div className="w-12 h-px" style={{ backgroundColor: C.ink }} />
                <p className="lr-serif italic text-lg">{name}, {new Date().getFullYear()}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="border-t py-24 md:py-32 scroll-mt-16" style={{ borderColor: C.border, backgroundColor: "color-mix(in oklch, var(--lr-secondary) 40%, var(--lr-paper))" }}>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <motion.div {...fade} className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
              <p className="lr-label" style={{ color: C.muted }}>§ 07 — Contact</p>
            </div>
            <div className="md:col-span-9 space-y-8">
              <div>
                <p className="lr-label mb-2" style={{ color: C.muted }}>Direct</p>
                <a href={`mailto:${email}`} className="lr-link lr-serif text-3xl md:text-5xl">
                  {email}
                </a>
              </div>
              {links.length > 0 && (
                <div>
                  <p className="lr-label mb-2" style={{ color: C.muted }}>Find me</p>
                  <ul className="space-y-1.5">
                    {phone && (
                      <li>
                        <a href={`tel:${phone.replace(/\s/g, "")}`} className="lr-link lr-serif text-lg">{phone}</a>
                      </li>
                    )}
                    {links.map((l) => (
                      <li key={l.label}>
                        <a href={l.url} target="_blank" rel="noopener noreferrer" className="lr-link lr-serif text-lg">
                          {l.label} ↗
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t" style={{ borderColor: C.border }}>
        <div className="py-24 px-6 text-center">
          <p className="lr-label mb-10" style={{ color: C.muted }}>§ — That's a wrap</p>
          <p className="lr-serif text-3xl md:text-5xl leading-snug">
            Peer-reviewed by journals.<br />
            Battle-tested by users.<br />
            <span className="lr-display-italic" style={{ color: C.crimson }}>Available for what's next.</span>
          </p>
        </div>
        <div className="border-t" style={{ borderColor: C.border }}>
          <div className="lr-mono mx-auto max-w-[1400px] px-6 lg:px-12 py-5 flex items-center justify-between text-xs" style={{ color: C.muted }}>
            <p>© 2026 {name} — letters &amp; references on request.</p>
            <p>N 22.556 · E 72.955</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
