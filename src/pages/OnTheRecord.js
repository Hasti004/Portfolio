import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PAPERS, C, STYLE } from "./LabResearch";
import SEO from "../components/SEO";

/**
 * "On the record" — the full research page listing every paper. Linked from the
 * homepage Research section's "Learn more" button. Reuses PAPERS, the colour
 * tokens, and the shared font/style block from LabResearch.
 */
export default function OnTheRecord() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const fade = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.7 },
  };

  const journals = PAPERS.filter((p) => p.status?.toLowerCase().includes("journal"));
  const conferences = PAPERS.filter((p) => !p.status?.toLowerCase().includes("journal"));

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "url": "https://hastivakani.tech/on-the-record",
        "name": `On the Record — ${PAPERS.length} Peer-Reviewed Papers | Hasti Vakani`,
        "description": `${PAPERS.length} peer-reviewed papers across Elsevier and Springer — plant-disease spectroscopy, anomaly detection, and predictive modelling.`,
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://hastivakani.tech" },
            { "@type": "ListItem", "position": 2, "name": "Research", "item": "https://hastivakani.tech/on-the-record" }
          ]
        },
        "hasPart": PAPERS.map(p => ({
          "@type": "ScholarlyArticle",
          "headline": p.title,
          "author": [{ "@type": "Person", "name": "Hasti Vakani", "@id": "https://hastivakani.tech#person" }],
          "datePublished": p.year,
          "inLanguage": "en",
          "publisher": {
            "@type": "Organization",
            "name": p.venue.toLowerCase().includes("elsevier") ? "Elsevier" : "Springer"
          },
          ...(p.url ? { "url": p.url } : {}),
          ...(p.abstract ? { "description": p.abstract } : {})
        }))
      }
    ]
  };

  return (
    <div className="lr-root min-h-screen" style={{ backgroundColor: C.ink, color: C.paper }}>
      <style>{STYLE}</style>
      <SEO
        title={`On the Record — ${PAPERS.length} Peer-Reviewed Papers | Hasti Vakani`}
        description={`Plant-disease spectroscopy, anomaly detection, and predictive modeling. ${PAPERS.length} peer-reviewed papers published in Elsevier and Springer.`}
        canonical="https://hastivakani.tech/on-the-record"
        ogType="article"
        ogImage="https://hastivakani.tech/og-research.png"
        schema={schema}
      />

      {/* Top bar */}
      <header className="sticky top-0 z-50" style={{ backgroundColor: "rgba(20,20,20,0.72)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: `1px solid color-mix(in oklch, var(--lr-paper) 14%, transparent)` }}>
        <div className="mx-auto max-w-[1100px] px-6 lg:px-10 h-16 flex items-center">
          <button onClick={handleBack} className="flex items-center gap-2 group cursor-pointer bg-transparent border-none p-0">
            <span className="lr-mono text-sm" style={{ color: C.paper }}>←</span>
            <span className="lr-serif text-xl uppercase tracking-wide" style={{ color: C.paper }}>Hasti Vakani</span>
          </button>
        </div>
      </header>

      {/* Title */}
      <section className="border-b" style={{ borderColor: "color-mix(in oklch, var(--lr-paper) 12%, transparent)" }}>
        <div className="mx-auto max-w-[1100px] px-6 lg:px-10 pt-20 pb-14">
          <p className="lr-label" style={{ color: C.crimson }}>§ — On the record</p>
          <h1 className="lr-display text-5xl md:text-7xl mt-6">
            On the <span className="lr-display-italic" style={{ color: C.crimson }}>record.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: "color-mix(in oklch, var(--lr-paper) 75%, transparent)" }}>
            {PAPERS.length} peer-reviewed papers across Elsevier and Springer — plant-disease
            spectroscopy, anomaly detection, and predictive modelling.
          </p>
        </div>
      </section>

      {/* Lists */}
      <main className="mx-auto max-w-[1100px] px-6 lg:px-10 py-16 space-y-16">
        {[
          { label: "Journals", list: journals },
          { label: "Conferences", list: conferences },
        ].map(
          (group) =>
            group.list.length > 0 && (
              <section key={group.label}>
                <p className="lr-label mb-6" style={{ color: "color-mix(in oklch, var(--lr-paper) 55%, transparent)" }}>
                  {group.label} — {group.list.length}
                </p>
                <div className="space-y-px border" style={{ backgroundColor: "color-mix(in oklch, var(--lr-paper) 14%, var(--lr-ink))", borderColor: "color-mix(in oklch, var(--lr-paper) 14%, var(--lr-ink))" }}>
                  {group.list.map((p, i) => (
                    <motion.article
                      key={i}
                      {...fade}
                      transition={{ duration: 0.6, delay: Math.min(i, 6) * 0.05 }}
                      className="p-8 md:p-10 grid md:grid-cols-12 gap-6"
                      style={{ backgroundColor: C.ink }}
                    >
                      <div className="md:col-span-3">
                        {p.status && <p className="lr-label" style={{ color: C.crimson }}>{p.status}</p>}
                        {p.year && <p className="lr-mono text-xs mt-2" style={{ color: "color-mix(in oklch, var(--lr-paper) 55%, transparent)" }}>{p.year}</p>}
                      </div>
                      <div className="md:col-span-9">
                        <h2 className="lr-serif text-2xl md:text-3xl leading-tight" style={{ color: C.paper }}>{p.title}</h2>
                        {p.authors && <p className="text-sm mt-3" style={{ color: "color-mix(in oklch, var(--lr-paper) 80%, transparent)" }}>{p.authors}</p>}
                        {p.venue && <p className="text-sm italic mt-1" style={{ color: "color-mix(in oklch, var(--lr-paper) 60%, transparent)" }}>{p.venue}</p>}
                        {p.abstract && (
                          <p className="mt-4 leading-relaxed" style={{ color: "color-mix(in oklch, var(--lr-paper) 72%, transparent)" }}>
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
                              View paper ↗
                            </a>
                          </div>
                        )}
                      </div>
                    </motion.article>
                  ))}
                </div>
              </section>
            )
        )}

      </main>
    </div>
  );
}
