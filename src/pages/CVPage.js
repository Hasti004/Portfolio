import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { C, STYLE, EXPERIENCE, EDUCATION, SKILLS, PAPERS } from "./LabResearch";
import resumePDF from "../assets/resume.pdf";
import SEO from "../components/SEO";

const CV_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "url": "https://hastivakani.tech/cv",
      "name": "Hasti Vakani — CV | ML Researcher & Founder",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://hastivakani.tech" },
          { "@type": "ListItem", "position": 2, "name": "CV", "item": "https://hastivakani.tech/cv" }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Hasti Vakani's educational background?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hasti Vakani holds a B.Tech in Computer Science & Engineering from CHARUSAT University with a CGPA of 8.40/10."
          }
        },
        {
          "@type": "Question",
          "name": "How many peer-reviewed papers has Hasti Vakani published?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hasti Vakani has authored 7 peer-reviewed papers published in Elsevier and Springer, focusing on plant-disease detection, anomaly detection, and predictive modeling."
          }
        },
        {
          "@type": "Question",
          "name": "What companies has Hasti Vakani co-founded?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hasti Vakani is the co-founder of Byteosaurus, a career and resume platform, and managing partner of UniMisk ERP Solutions, a B2B SaaS platform for enterprise resource planning."
          }
        },
        {
          "@type": "Question",
          "name": "What are Hasti Vakani's research areas?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hasti Vakani's research focuses on plant-disease spectroscopy, anomaly detection in industrial machines, predictive modeling, and AI-driven image classification using CNNs and deep learning."
          }
        }
      ]
    }
  ]
};

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6 },
};

function SectionLabel({ children }) {
  return (
    <p className="lr-label mb-8" style={{ color: C.muted }}>
      {children}
    </p>
  );
}

function Divider() {
  return <div className="border-t my-16" style={{ borderColor: C.border }} />;
}

export default function CVPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  return (
    <div className="lr-root min-h-screen" style={{ backgroundColor: C.paper, color: C.ink }}>
      <style>{STYLE}</style>
      <SEO
        title="Hasti Vakani — CV | ML Researcher & Founder"
        description="B.Tech CS (CGPA 8.40), co-founder of Byteosaurus, managing partner at UniMisk ERP Solutions, AI researcher at Physical Research Laboratory."
        canonical="https://hastivakani.tech/cv"
        ogType="profile"
        ogImage="https://hastivakani.tech/og-cv.png"
        schema={CV_SCHEMA}
      />

      {/* ── STICKY HEADER ── */}
      <header
        className="sticky top-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: "rgba(250,251,252,0.82)",
          backdropFilter: "blur(12px) saturate(140%)",
          WebkitBackdropFilter: "blur(12px) saturate(140%)",
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div className="mx-auto max-w-[860px] px-6 lg:px-10 h-16 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 cursor-pointer bg-transparent border-none p-0"
            style={{ color: C.ink }}
          >
            <span className="lr-mono text-sm">←</span>
            <span className="lr-serif text-xl tracking-wide">Hasti Vakani</span>
          </button>
          <div className="flex items-center gap-4">
            <span className="lr-mono text-xs hidden sm:block" style={{ color: C.muted }}>CV · 2026</span>
            <a
              href={resumePDF}
              download="Hasti_Vakani_CV.pdf"
              className="inline-flex items-center gap-2 text-xs font-medium border px-4 py-2 rounded-sm transition-all hover:bg-[var(--lr-ink)] hover:text-[var(--lr-paper)] lr-mono"
              style={{ borderColor: "color-mix(in oklch, var(--lr-ink) 22%, transparent)", color: C.ink }}
            >
              DOWNLOAD PDF <span>↓</span>
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[860px] px-6 lg:px-10 pt-20 pb-32">

        {/* ── NAME ── */}
        <motion.div {...fade} className="mb-16">
          <h1 className="lr-display text-6xl md:text-8xl mb-6">
            Hasti <span className="lr-display-italic" style={{ color: C.crimson }}>Vakani.</span>
          </h1>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm" style={{ color: C.muted }}>
            <span className="lr-mono">hasti.vakani9104@gmail.com</span>
            <span className="lr-mono">+91 93746 15759</span>
            <span className="lr-mono">Anand, Gujarat, India</span>
          </div>
        </motion.div>

        {/* ── PROFILE ── */}
        <motion.div {...fade} className="grid md:grid-cols-12 gap-6 mb-6">
          <div className="md:col-span-3">
            <SectionLabel>§ 01 — Profile</SectionLabel>
          </div>
          <div className="md:col-span-9">
            <p className="text-lg leading-relaxed" style={{ color: "color-mix(in oklch, var(--lr-ink) 78%, transparent)" }}>
              B.Tech in Computer Science & Engineering from CHARUSAT (CGPA 8.40), co-founder of Byteosaurus,
              managing partner at UniMisk ERP Solutions, and an AI project trainee at the Physical
              Research Laboratory. I publish peer-reviewed ML research across plant-disease spectroscopy,
              anomaly detection and predictive modelling, and independently build and ship B2B/B2C SaaS
              products used by hundreds of people.
            </p>
            <p className="lr-serif italic mt-5 text-lg" style={{ color: C.muted }}>
              Engineer by training. Builder by habit.
            </p>
          </div>
        </motion.div>

        <Divider />

        {/* ── EDUCATION ── */}
        <motion.div {...fade}>
          <SectionLabel>§ 02 — Education</SectionLabel>
          <div className="space-y-10">
            {EDUCATION.map((e, i) => (
              <div key={i} className="grid md:grid-cols-12 gap-4">
                <div className="md:col-span-3">
                  <p className="lr-mono text-xs" style={{ color: C.muted }}>{e.dates}</p>
                </div>
                <div className="md:col-span-9">
                  <h3 className="lr-serif text-2xl leading-snug">{e.degree}</h3>
                  <p className="text-sm mt-1" style={{ color: C.muted }}>{e.name}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <Divider />

        {/* ── EXPERIENCE ── */}
        <motion.div {...fade}>
          <SectionLabel>§ 03 — Experience</SectionLabel>
          <div className="space-y-12">
            {EXPERIENCE.map((e, i) => (
              <motion.div
                key={i}
                {...fade}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="grid md:grid-cols-12 gap-4"
              >
                <div className="md:col-span-3">
                  <p className="lr-mono text-xs leading-relaxed" style={{ color: C.muted }}>{e.dates}</p>
                </div>
                <div className="md:col-span-9">
                  <h3 className="lr-serif text-2xl leading-snug">{e.role}</h3>
                  <p className="lr-label mt-1" style={{ color: C.crimson }}>{e.company}</p>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "color-mix(in oklch, var(--lr-ink) 70%, transparent)" }}>
                    {e.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <Divider />

        {/* ── RESEARCH ── */}
        <motion.div {...fade}>
          <SectionLabel>§ 04 — Research & Publications</SectionLabel>
          <div className="space-y-8">
            {PAPERS.map((p, i) => (
              <motion.div
                key={i}
                {...fade}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="grid md:grid-cols-12 gap-4"
              >
                <div className="md:col-span-3">
                  <p className="lr-label text-[0.6rem]" style={{ color: C.crimson }}>{p.status}</p>
                  <p className="lr-mono text-xs mt-1" style={{ color: C.muted }}>{p.year}</p>
                </div>
                <div className="md:col-span-9">
                  <h3 className="lr-serif text-lg leading-snug">{p.title}</h3>
                  <p className="text-xs mt-1" style={{ color: C.muted }}>{p.authors}</p>
                  <p className="text-xs italic mt-0.5" style={{ color: C.muted }}>{p.venue}</p>
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lr-mono text-xs mt-2 inline-block lr-link"
                      style={{ color: C.crimson }}
                    >
                      View ↗
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <Divider />

        {/* ── SKILLS ── */}
        <motion.div {...fade}>
          <SectionLabel>§ 05 — Skills</SectionLabel>
          <div className="space-y-6">
            {SKILLS.map((s, i) => (
              <div key={i} className="grid md:grid-cols-12 gap-4">
                <div className="md:col-span-3">
                  <p className="lr-label text-[0.65rem]" style={{ color: C.muted }}>{s.group}</p>
                </div>
                <div className="md:col-span-9 flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <span
                      key={item}
                      className="lr-mono text-xs px-2.5 py-1 border rounded-sm"
                      style={{ borderColor: C.border, color: "color-mix(in oklch, var(--lr-ink) 75%, transparent)" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </main>
    </div>
  );
}
