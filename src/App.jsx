import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   GLOBAL STYLES (injected once)
───────────────────────────────────────────── */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --red:    #D0292A;
      --black:  #0E0E0E;
      --gray-0: #F4F4F2;
      --gray-1: #E8E8E5;
      --gray-2: #D2D2CE;
      --gray-3: #9A9A96;
      --gray-4: #5A5A56;
      --white:  #FFFFFF;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--gray-0);
      font-family: 'DM Sans', sans-serif;
      color: var(--black);
      -webkit-font-smoothing: antialiased;
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(1.04); }
      to   { opacity: 1; transform: scale(1); }
    }

    .anim-slide-up  { animation: slideUp  0.6s cubic-bezier(.22,.68,0,1.2) both; }
    .anim-fade-in   { animation: fadeIn   0.5s ease both; }
    .anim-scale-in  { animation: scaleIn  0.7s cubic-bezier(.22,.68,0,1.1) both; }

    .delay-1 { animation-delay: 0.05s; }
    .delay-2 { animation-delay: 0.12s; }
    .delay-3 { animation-delay: 0.20s; }
    .delay-4 { animation-delay: 0.30s; }

    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }

    .slide-img {
      transition: opacity 0.55s ease, transform 0.65s cubic-bezier(.22,.68,0,1.1);
    }
  `}</style>
);

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 2.5rem",
        height: "68px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(244,244,242,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--gray-2)" : "none",
        transition: "background 0.4s, border-bottom 0.4s",
      }}
    >
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.35rem",
          fontWeight: 700,
          letterSpacing: "0.04em",
        }}
      >
        PT STR
      </span>
      <nav style={{ display: "flex", gap: "2rem" }}>
        {["Beranda", "Tentang", "Proyek", "Kontak"].map((l) => (
          <a
            key={l}
            href="#"
            style={{
              fontSize: "0.8rem",
              fontWeight: 500,
              color: "var(--gray-4)",
              textDecoration: "none",
              letterSpacing: "0.06em",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "var(--black)")}
            onMouseLeave={(e) => (e.target.style.color = "var(--gray-4)")}
          >
            {l}
          </a>
        ))}
      </nav>
    </header>
  );
}

/* ─────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────── */
function Hero() {
  const slides = [
    {
      image: "/assets/kapal1.jpg",
      tag: "#DesigningYourVision",
      title: "Designing Your",
      highlight: "Dream Space",
      desc: "Wujudkan Konsep dan Perencanaan Bangunan Anda melalui Desain Arsitektur, Perhitungan Struktur, dan Konsultasi Teknis Profesional.",
    },
    {
      image: "/assets/kapal2.jpg",
      tag: "#BuildingWithPrecision",
      title: "Building with",
      highlight: "Smart Plan",
      desc: "Solusi konstruksi modern dan inovatif untuk masa depan yang lebih baik dan berkelanjutan.",
    },
    {
      image: "/assets/kapal3.jpg",
      tag: "#ConstructingSustainableValue",
      title: "Constructing",
      highlight: "Long-Term Value",
      desc: "Kualitas dan presisi dalam setiap proyek konstruksi yang kami kerjakan bersama.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (dir) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + slides.length) % slides.length);
    setAnimKey((k) => k + 1);
  };

  const left = slides[current];
  const right = slides[(current - 1 + slides.length) % slides.length];

  return (
    <section
      style={{
        paddingTop: "96px",
        paddingBottom: "0",
        background: "var(--gray-0)",
      }}
    >
      <div
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "2rem 2rem 0" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.25rem",
          }}
          className="hero-grid"
        >
          <style>{`
            @media (min-width: 768px) {
              .hero-grid { grid-template-columns: 2fr 1fr !important; }
            }
          `}</style>

          {/* LEFT */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              key={animKey + "-img"}
              style={{
                position: "relative",
                borderRadius: "1.5rem 1.5rem 0 0",
                overflow: "hidden",
                height: "clamp(220px, 38vw, 420px)",
              }}
              className="anim-scale-in"
            >
              <img
                src={left.image}
                alt={left.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                className="slide-img"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 60%, transparent 100%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "clamp(1.25rem,3vw,2.5rem)",
                }}
              >
                <p
                  key={animKey + "-tag"}
                  className="anim-slide-up delay-1"
                  style={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "clamp(0.7rem,1.5vw,0.95rem)",
                    marginBottom: "0.4rem",
                    letterSpacing: "0.04em",
                  }}
                >
                  {left.tag}
                </p>
                <h1
                  key={animKey + "-title"}
                  className="anim-slide-up delay-2"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "#fff",
                    fontSize: "clamp(1.6rem,4vw,3.2rem)",
                    fontWeight: 700,
                    lineHeight: 1.15,
                  }}
                >
                  {left.title}
                </h1>
              </div>
            </div>

            <div
              style={{
                background:
                  "linear-gradient(160deg, var(--gray-1) 0%, var(--gray-0) 100%)",
                borderRadius: "0 0 1.5rem 1.5rem",
                padding: "clamp(1.25rem,3vw,2.5rem)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "clamp(130px,18vw,230px)",
                borderTop: "1px solid var(--gray-2)",
              }}
            >
              <h2
                key={animKey + "-highlight"}
                className="anim-slide-up delay-2"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2rem,6vw,5rem)",
                  fontWeight: 700,
                  lineHeight: 1.05,
                  color: "var(--black)",
                }}
              >
                {left.highlight}
              </h2>
              <div
                key={animKey + "-desc"}
                className="anim-slide-up delay-3"
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: "1.5rem",
                  marginTop: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <p
                  style={{
                    color: "var(--gray-4)",
                    fontSize: "clamp(0.75rem,1.4vw,0.875rem)",
                    maxWidth: "400px",
                    lineHeight: 1.65,
                  }}
                >
                  {left.desc}
                </p>
                <button
                  style={{
                    background: "var(--black)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "999px",
                    padding: "0.6rem 1.5rem",
                    fontSize: "0.78rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    letterSpacing: "0.05em",
                    transition: "background 0.25s, transform 0.2s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "var(--red)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "var(--black)";
                  }}
                >
                  Explore Now
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            <div
              key={animKey + "-right-img"}
              style={{
                position: "relative",
                borderRadius: "1.5rem",
                overflow: "hidden",
                flex: "1",
                minHeight: "clamp(180px,28vw,320px)",
              }}
              className="anim-scale-in delay-1"
            >
              <img
                src={right.image}
                alt="preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  filter: "brightness(0.88)",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  background: "rgba(0,0,0,0.45)",
                  backdropFilter: "blur(8px)",
                  color: "#fff",
                  borderRadius: "999px",
                  padding: "0.25rem 0.8rem",
                  fontSize: "0.72rem",
                  fontWeight: 500,
                }}
              >
                {current + 1} / {slides.length}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              {[
                { label: "‹", dir: -1 },
                { label: "›", dir: 1 },
              ].map(({ label, dir }) => (
                <button
                  key={label}
                  onClick={() => go(dir)}
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    border: "1.5px solid var(--gray-2)",
                    background: "var(--white)",
                    fontSize: "1.3rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.22s",
                    color: "var(--black)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--black)";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = "var(--black)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--white)";
                    e.currentTarget.style.color = "var(--black)";
                    e.currentTarget.style.borderColor = "var(--gray-2)";
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            <div
              style={{
                background: "var(--white)",
                borderRadius: "1.5rem",
                padding: "1.4rem 1.6rem",
                boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
              }}
            >
              <h3
                style={{
                  fontWeight: 600,
                  fontSize: "0.88rem",
                  marginBottom: "1rem",
                  letterSpacing: "0.02em",
                }}
              >
                Discover Our Company
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0",
                }}
              >
                {[
                  "PT STR untuk Indonesia",
                  "Sejarah PT STR",
                  "PT Surya Tripta Rekayasa",
                  "Laporan",
                  "Berita dan Agenda",
                ].map((item, i, arr) => (
                  <li
                    key={item}
                    style={{
                      padding: "0.6rem 0",
                      borderBottom:
                        i < arr.length - 1 ? "1px solid var(--gray-1)" : "none",
                      fontSize: "0.8rem",
                      color: "var(--gray-4)",
                      cursor: "pointer",
                      transition: "color 0.2s, padding-left 0.2s",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--red)";
                      e.currentTarget.style.paddingLeft = "0.4rem";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--gray-4)";
                      e.currentTarget.style.paddingLeft = "0";
                    }}
                  >
                    <span style={{ fontSize: "0.5rem", opacity: 0.4 }}>●</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   HIGHLIGHT SECTION
───────────────────────────────────────────── */
function Highlight() {
  const highlights = [
    {
      image: "/assets/highlight1.jpg",
      title: "PT Surya Tripta Rekayasa",
      desc: "Tumbuhkan Bisnis dan Konten Anda melalui Layanan, Platform, dan Konektivitas Digital Saham.",
      activeTitle: "PT Surya Tripta Rekayasa",
      activeDesc:
        "Tumbuhkan Bisnis dan Konten Anda melalui Layanan, Platform, dan Konektivitas Digital Saham.",
    },
    {
      image: "/assets/highlight2.jpg",
      title: "Surya Tripta untuk Indonesia",
      desc: "Tumbuhkan Bisnis dan Konten Anda melalui Layanan, Platform, dan Konektivitas Digital Saham.",
      activeTitle: "Surya Tripta untuk Indonesia",
      activeDesc:
        "Tumbuhkan Bisnis dan Konten Anda melalui Layanan, Platform, dan Konektivitas Digital Saham.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const fn = () => {
      const next = window.scrollY > 500 ? 1 : 0;
      setActiveIndex((prev) => {
        if (prev !== next) setAnimKey((k) => k + 1);
        return next;
      });
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const current = highlights[activeIndex];

  const handleClick = (index) => {
    setActiveIndex(index);
    setAnimKey((k) => k + 1);
  };

  return (
    <section style={{ background: "var(--gray-0)", padding: "5rem 2rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          style={{
            borderRadius: "2rem",
            overflow: "hidden",
            background: "var(--gray-1)",
            display: "grid",
            gridTemplateColumns: "1fr",
          }}
          className="highlight-grid"
        >
          <style>{`
            @media (min-width: 768px) {
              .highlight-grid { grid-template-columns: 1fr 1fr !important; }
            }
          `}</style>

          <div
            style={{
              position: "relative",
              minHeight: "clamp(280px,40vw,520px)",
            }}
          >
            <img
              key={animKey}
              src={current.image}
              alt={current.title}
              className="anim-scale-in"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                position: "absolute",
                inset: 0,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, transparent 55%, var(--gray-1) 100%)",
              }}
            />
          </div>

          <div
            style={{
              padding: "clamp(2rem,4vw,4rem)",
              display: "flex",
              flexDirection: "column",
              gap: "2.5rem",
            }}
          >
            <div key={animKey} className="anim-slide-up">
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.6rem,3vw,2.8rem)",
                  fontWeight: 700,
                  marginBottom: "0.9rem",
                  lineHeight: 1.2,
                }}
              >
                {current.title}
              </h2>
              <p
                style={{
                  color: "var(--gray-4)",
                  fontSize: "0.875rem",
                  lineHeight: 1.75,
                  maxWidth: "400px",
                }}
              >
                {current.desc}
              </p>
            </div>

            <div style={{ position: "relative", paddingLeft: "1.25rem" }}>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "2px",
                  background: "var(--gray-2)",
                  borderRadius: "2px",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: activeIndex === 0 ? "0%" : "50%",
                  height: "50%",
                  width: "2px",
                  background: "var(--red)",
                  transition: "top 0.4s cubic-bezier(.22,.68,0,1.2)",
                  borderRadius: "2px",
                }}
              />
              {highlights.map((item, i) => (
                <div
                  key={i}
                  onClick={() => handleClick(i)}
                  style={{
                    padding: "1rem 0",
                    cursor: "pointer",
                    transition: "opacity 0.3s",
                    opacity: activeIndex === i ? 1 : 0.5,
                  }}
                  onMouseEnter={(e) => {
                    if (activeIndex !== i)
                      e.currentTarget.style.opacity = "0.75";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity =
                      activeIndex === i ? "1" : "0.5";
                  }}
                >
                  <h3
                    style={{
                      fontSize: "clamp(1rem,2vw,1.2rem)",
                      fontWeight: 600,
                      color: activeIndex === i ? "var(--red)" : "var(--gray-3)",
                      transition: "color 0.3s",
                      marginBottom: "0.35rem",
                    }}
                  >
                    {item.activeTitle}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      lineHeight: 1.7,
                      color:
                        activeIndex === i ? "var(--gray-4)" : "var(--gray-2)",
                      transition: "color 0.3s",
                      maxWidth: "380px",
                    }}
                  >
                    {item.activeDesc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   HISTORY SECTION
───────────────────────────────────────────── */
function History() {
  const histories = [
    {
      year: "2024",
      title: "Surya Tripta untuk Indonesia",
      desc: "Tumbuhkan Bisnis dan Konten Anda melalui Layanan, Platform, dan Konektivitas Digital Saham.",
      project: "Rest Area Betjam 1A",
      projectDesc:
        "Tumbuhkan Bisnis dan Konten Anda melalui Layanan, Platform, dan Konektivitas Digital Saham.",
      images: ["/assets/history1.jpg", "/assets/history2.jpg"],
    },
    {
      year: "2025",
      title: "Surya Tripta untuk Indonesia",
      desc: "Tumbuhkan Bisnis dan Konten Anda melalui Layanan, Platform, dan Konektivitas Digital Saham.",
      project: "Rest Area Betjam 1B",
      projectDesc:
        "Tumbuhkan Bisnis dan Konten Anda melalui Layanan, Platform, dan Konektivitas Digital Saham.",
      images: ["/assets/history3.jpg", "/assets/history4.jpg"],
    },
  ];

  const [yearIndex, setYearIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const current = histories[yearIndex];

  const nextImage = () => {
    setImageIndex((p) => (p + 1) % current.images.length);
    setAnimKey((k) => k + 1);
  };
  const prevImage = () => {
    setImageIndex(
      (p) => (p - 1 + current.images.length) % current.images.length,
    );
    setAnimKey((k) => k + 1);
  };
  const changeYear = (index) => {
    setYearIndex(index);
    setImageIndex(0);
    setAnimKey((k) => k + 1);
  };

  const timelineItems = ["Start", "2024", "2025", "2026", "Next"];

  return (
    <section style={{ background: "var(--gray-0)", padding: "4rem 2rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }}
          className="history-grid"
        >
          <style>{`
            @media (min-width: 768px) {
              .history-grid { grid-template-columns: 1fr 1fr !important; }
            }
          `}</style>

          {/* LEFT */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div key={animKey + "-text"} className="anim-slide-up">
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2rem,4vw,3.6rem)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  marginBottom: "1rem",
                }}
              >
                {current.title}
              </h2>
              <p
                style={{
                  color: "var(--gray-4)",
                  fontSize: "0.875rem",
                  lineHeight: 1.75,
                  maxWidth: "420px",
                }}
              >
                {current.desc}
              </p>
            </div>

            <div
              style={{
                borderRadius: "1.5rem",
                padding: "1.8rem",
                background:
                  "linear-gradient(135deg, var(--gray-3) 0%, var(--gray-2) 60%, var(--gray-1) 100%)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-40px",
                  right: "-40px",
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.12)",
                }}
              />
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "1.15rem",
                  marginBottom: "0.6rem",
                  color: "var(--black)",
                }}
              >
                {current.project}
              </h3>
              <p
                style={{
                  fontSize: "0.82rem",
                  lineHeight: 1.7,
                  color: "var(--black)",
                  opacity: 0.75,
                }}
              >
                {current.projectDesc}
              </p>
              <div
                style={{ display: "flex", gap: "0.6rem", marginTop: "1.5rem" }}
              >
                {[
                  { label: "‹", fn: prevImage },
                  { label: "›", fn: nextImage },
                ].map(({ label, fn }) => (
                  <button
                    key={label}
                    onClick={fn}
                    style={{
                      border: "1.5px solid rgba(0,0,0,0.2)",
                      background: "rgba(255,255,255,0.35)",
                      borderRadius: "10px",
                      width: "40px",
                      height: "40px",
                      fontSize: "1.2rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.22s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(255,255,255,0.6)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(255,255,255,0.35)")
                    }
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div
              key={animKey + "-img"}
              style={{ borderRadius: "1.5rem", overflow: "hidden", flex: 1 }}
              className="anim-scale-in"
            >
              <img
                src={current.images[imageIndex]}
                alt={current.project}
                style={{
                  width: "100%",
                  height: "clamp(240px,30vw,380px)",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                justifyContent: "flex-end",
              }}
            >
              {current.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  onClick={() => {
                    setImageIndex(i);
                    setAnimKey((k) => k + 1);
                  }}
                  style={{
                    width: imageIndex === i ? "64px" : "80px",
                    height: imageIndex === i ? "64px" : "80px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    cursor: "pointer",
                    opacity: imageIndex === i ? 0.55 : 1,
                    transition: "all 0.3s",
                    outline:
                      imageIndex === i
                        ? "2px solid var(--red)"
                        : "2px solid transparent",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* TIMELINE */}
        <div style={{ marginTop: "4rem", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: 0,
              right: 0,
              height: "1.5px",
              background: "var(--gray-2)",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              position: "relative",
            }}
          >
            {timelineItems.map((label, i) => {
              const isYear = i === 1 || i === 2;
              const active = i - 1 === yearIndex;
              return (
                <div
                  key={label}
                  onClick={() => {
                    if (isYear) changeYear(i - 1);
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: isYear ? "pointer" : "default",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      border: active
                        ? "2.5px solid var(--red)"
                        : "2px solid var(--gray-3)",
                      background: active ? "var(--white)" : "var(--gray-3)",
                      transition: "all 0.35s",
                      boxShadow: active
                        ? "0 0 0 4px rgba(208,41,42,0.15)"
                        : "none",
                    }}
                  />
                  <span
                    style={{
                      marginTop: "0.7rem",
                      fontSize: "0.75rem",
                      fontWeight: active ? 600 : 400,
                      color: active ? "var(--red)" : "var(--gray-4)",
                      transition: "color 0.3s",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   LIST PROYEK SECTION
───────────────────────────────────────────── */
const projects = [
  {
    image: "/assets/gp1.jpg",
    date: "04 Desember 2024",
    title: "Rest Area Betjam 1A",
    desc: "Pembangunan fasilitas rest area modern dengan konsep hijau dan berkelanjutan di jalur tol Betjam segmen A.",
  },
  {
    image: "/assets/gp2.jpg",
    date: "04 Desember 2024",
    title: "Rest Area Betjam 1B",
    desc: "Pengembangan kawasan rest area terpadu dengan fasilitas UMKM lokal dan area parkir berkapasitas besar.",
  },
  {
    image: "/assets/gp3.jpg",
    date: "15 Januari 2025",
    title: "Jembatan Layang Suramadu",
    desc: "Proyek peningkatan struktur jembatan layang dengan teknologi terkini untuk meningkatkan kapasitas lalu lintas.",
  },
  {
    image: "/assets/gp4.jpg",
    date: "22 Februari 2025",
    title: "Gedung Perkantoran Delta",
    desc: "Konstruksi gedung perkantoran 12 lantai dengan desain ramah lingkungan dan sistem energi surya terintegrasi.",
  },
  {
    image: "/assets/gp5.jpg",
    date: "10 Maret 2025",
    title: "Pelabuhan Kalimas Timur",
    desc: "Revitalisasi fasilitas pelabuhan untuk mendukung peningkatan kapasitas bongkar muat peti kemas nasional.",
  },
  {
    image: "/assets/gp6.jpg",
    date: "28 Maret 2025",
    title: "Rusunawa Benowo",
    desc: "Pembangunan rumah susun sederhana sewa bagi masyarakat berpenghasilan rendah dengan fasilitas lengkap.",
  },
  {
    image: "/assets/gp7.jpg",
    date: "05 April 2025",
    title: "Sistem Drainase Kota Malang",
    desc: "Peningkatan jaringan drainase perkotaan untuk mengatasi banjir dan genangan air di pusat kota Malang.",
  },
  {
    image: "/assets/gp8.jpg",
    date: "18 April 2025",
    title: "Terminal Bus Terpadu Madura",
    desc: "Pembangunan terminal bus modern berkonsep transit hub dengan integrasi moda transportasi umum.",
  },
  {
    image: "/assets/gp9.jpg",
    date: "02 Mei 2025",
    title: "SPAM Regional Pasuruan",
    desc: "Pengembangan sistem penyediaan air minum regional untuk melayani kebutuhan masyarakat Pasuruan Raya.",
  },
  {
    image: "/assets/gp10.jpg",
    date: "20 Mei 2025",
    title: "Tol Akses Pelabuhan Tanjung Perak",
    desc: "Konstruksi jalan tol akses khusus pelabuhan untuk memperlancar arus distribusi logistik nasional.",
  },
];

function ProjectCard({ project, index }) {
  const isEven = index % 2 === 0;
  return (
    <div style={{ flexShrink: 0, width: "clamp(260px, 22vw, 300px)" }}>
      <div
        className="project-card"
        style={{
          background: "var(--white)",
          boxShadow: "0 2px 18px rgba(0,0,0,0.07)",
          overflow: "hidden",
          transition:
            "transform 0.4s cubic-bezier(.22,.68,0,1.2), box-shadow 0.4s",
          borderRadius: isEven
            ? "1.5rem 1.5rem 1.5rem 0"
            : "1.5rem 1.5rem 0 1.5rem",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,0.13)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 18px rgba(0,0,0,0.07)";
        }}
      >
        <div
          style={{
            position: "relative",
            height: "168px",
            overflow: "hidden",
            background: "var(--gray-1)",
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.6s ease",
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.12) 0%, transparent 60%)",
            }}
          />
        </div>
        <div
          style={{
            padding: "0.9rem 1.1rem 0.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "0.68rem",
              color: "var(--gray-3)",
              letterSpacing: "0.04em",
              fontWeight: 500,
            }}
          >
            {project.date}
          </span>
          <button
            style={{
              fontSize: "0.68rem",
              fontWeight: 600,
              background: "var(--black)",
              color: "#fff",
              border: "none",
              borderRadius: "999px",
              padding: "0.3rem 0.85rem",
              cursor: "pointer",
              transition: "background 0.25s",
            }}
            onMouseEnter={(e) => (e.target.style.background = "var(--red)")}
            onMouseLeave={(e) => (e.target.style.background = "var(--black)")}
          >
            See more
          </button>
        </div>
        <div style={{ padding: "0.4rem 1.1rem 1.3rem" }}>
          <h4
            style={{
              fontWeight: 700,
              fontSize: "0.9rem",
              lineHeight: 1.35,
              marginBottom: "0.45rem",
              color: "var(--black)",
              transition: "color 0.25s",
            }}
          >
            {project.title}
          </h4>
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--gray-3)",
              lineHeight: 1.65,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

function Listproyek() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const SCROLL_AMOUNT = 320;

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
    setTimeout(updateScrollState, 380);
  };
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
    setTimeout(updateScrollState, 380);
  };

  return (
    <section style={{ background: "var(--gray-0)", padding: "4rem 2rem 5rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          className="listproyek-outer"
          style={{ display: "flex", gap: "1.5rem" }}
        >
          <style>{`
            .listproyek-outer { flex-direction: column; }
            @media (min-width: 768px) {
              .listproyek-outer { flex-direction: row; align-items: stretch; }
              .listproyek-intro { width: clamp(240px, 26vw, 300px) !important; }
            }
          `}</style>

          {/* Intro card */}
          <div
            className="listproyek-intro"
            style={{
              width: "100%",
              flexShrink: 0,
              background: "var(--gray-1)",
              borderRadius: "1.5rem 1.5rem 0 1.5rem",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "420px",
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2rem,3.5vw,3rem)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  marginBottom: "1rem",
                }}
              >
                Pekerjaan
              </h2>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "var(--gray-4)",
                  lineHeight: 1.75,
                }}
              >
                Tumbuhkan Bisnis dan Konten Anda melalui Layanan, Platform, dan
                Konektivitas Digital Saham.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <a
                href="#"
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "var(--gray-4)",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "var(--red)")}
                onMouseLeave={(e) => (e.target.style.color = "var(--gray-4)")}
              >
                Baca Selengkapnya
              </a>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {[
                  { label: "‹", fn: scrollLeft, active: canScrollLeft },
                  { label: "›", fn: scrollRight, active: canScrollRight },
                ].map(({ label, fn, active }) => (
                  <button
                    key={label}
                    onClick={fn}
                    disabled={!active}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      border: `1.5px solid ${active ? "var(--gray-4)" : "var(--gray-2)"}`,
                      background: "transparent",
                      color: active ? "var(--black)" : "var(--gray-2)",
                      fontSize: "1.2rem",
                      cursor: active ? "pointer" : "not-allowed",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.22s",
                    }}
                    onMouseEnter={(e) => {
                      if (active) {
                        e.currentTarget.style.background = "var(--black)";
                        e.currentTarget.style.color = "#fff";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = active
                        ? "var(--black)"
                        : "var(--gray-2)";
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Scrollable list */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "24px",
                background:
                  "linear-gradient(to right, var(--gray-0), transparent)",
                zIndex: 10,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: "40px",
                background:
                  "linear-gradient(to left, var(--gray-0), transparent)",
                zIndex: 10,
                pointerEvents: "none",
              }}
            />
            <div
              ref={scrollRef}
              onScroll={updateScrollState}
              className="no-scrollbar"
              style={{
                display: "flex",
                gap: "1.1rem",
                overflowX: "auto",
                overflowY: "hidden",
                paddingBottom: "1rem",
                scrollBehavior: "smooth",
                alignItems: "stretch",
                touchAction: "pan-x",
              }}
            >
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER SECTION
───────────────────────────────────────────── */
function Footer() {
  const navLinks = [
    "PT STR untuk Indonesia",
    "Sejarah PT STR",
    "PT Surya Tripta Rekayasa",
    "Laporan",
    "Berita dan Agenda",
    "Hubungi Kami",
    "Peta Situs",
  ];

  const berita = [
    {
      tag: "Artikel",
      date: "04-12-2024",
      title: "Rest Area Betjam 1A Resmi Beroperasi",
      desc: "Fasilitas rest area modern dengan konsep hijau dan berkelanjutan.",
    },
    {
      tag: "Proyek",
      date: "15-01-2025",
      title: "Jembatan Layang Suramadu Tahap II",
      desc: "Peningkatan struktur jembatan dengan teknologi terkini.",
    },
  ];

  const socials = [
    { label: "f", href: "#" },
    { label: "in", href: "#" },
    { label: "ig", href: "#" },
    { label: "yt", href: "#" },
  ];

  return (
    <footer style={{ background: "var(--black)", color: "#fff", padding: "0" }}>
      {/* Top notch — menyambung dari section sebelumnya */}
      <div
        style={{
          background: "var(--gray-0)",
          borderRadius: "0 0 2rem 2rem",
          height: "2rem",
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "3rem 2rem 2rem",
        }}
      >
        <style>{`
          .footer-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          @media (min-width: 768px) {
            .footer-grid {
              grid-template-columns: 1.2fr 1fr 1.1fr;
              gap: 3rem;
            }
          }
          .footer-divider {
            border: none;
            border-top: 1px solid rgba(255,255,255,0.1);
            margin: 2.5rem 0 1.5rem;
          }
          .footer-bottom {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            align-items: flex-start;
          }
          @media (min-width: 768px) {
            .footer-bottom {
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
            }
          }
        `}</style>

        <div className="footer-grid">
          {/* COL 1 — Brand + alamat + sosial */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  color: "#fff",
                }}
              >
                PT STR
              </span>
              <p
                style={{
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.4)",
                  marginTop: "0.15rem",
                  letterSpacing: "0.08em",
                }}
              >
                PT Surya Tripta Rekayasa
              </p>
            </div>

            <p
              style={{
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.75,
                maxWidth: "300px",
              }}
            >
              Kawasan Industri Surabaya, Jl. Rungkut Industri Raya No. 10,
              Surabaya, Jawa Timur 60293, Indonesia.
            </p>

            <div
              style={{
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 2,
              }}
            >
              <div>Phone: (031) 123 4567</div>
              <div>Fax: (031) 765 4321</div>
              <div>Email: info@ptsurya.co.id</div>
            </div>

            {/* Sosial media */}
            <div style={{ display: "flex", gap: "0.6rem" }}>
              {socials.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: "1.5px solid rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    transition:
                      "border-color 0.2s, color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--red)";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.background = "var(--red)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* COL 2 — Navigasi */}
          <div>
            <h4
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.35)",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              Navigasi
            </h4>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {navLinks.map((item, i, arr) => (
                <li
                  key={item}
                  style={{
                    padding: "0.55rem 0",
                    borderBottom:
                      i < arr.length - 1
                        ? "1px solid rgba(255,255,255,0.07)"
                        : "none",
                  }}
                >
                  <a
                    href="#"
                    style={{
                      fontSize: "0.82rem",
                      color: "rgba(255,255,255,0.6)",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      transition: "color 0.2s, padding-left 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.paddingLeft = "0.4rem";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                      e.currentTarget.style.paddingLeft = "0";
                    }}
                  >
                    <span style={{ fontSize: "0.4rem", opacity: 0.4 }}>●</span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3 — Berita terkini */}
          <div>
            <h4
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.35)",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              Berita Terkini
            </h4>
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: "1.25rem",
                border: "1px solid rgba(255,255,255,0.08)",
                overflow: "hidden",
              }}
            >
              {berita.map((item, i, arr) => (
                <div
                  key={i}
                  style={{
                    padding: "1rem 1.25rem",
                    borderBottom:
                      i < arr.length - 1
                        ? "1px solid rgba(255,255,255,0.07)"
                        : "none",
                    display: "flex",
                    gap: "0.9rem",
                    alignItems: "flex-start",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.06)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      flexShrink: 0,
                      borderRadius: "10px",
                      background: "rgba(208,41,42,0.18)",
                      border: "1px solid rgba(208,41,42,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "14px",
                        height: "14px",
                        borderRadius: "3px",
                        background: "var(--red)",
                        opacity: 0.9,
                      }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        alignItems: "center",
                        marginBottom: "0.3rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.62rem",
                          fontWeight: 600,
                          color: "var(--red)",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                        }}
                      >
                        {item.tag}
                      </span>
                      <span
                        style={{
                          fontSize: "0.62rem",
                          color: "rgba(255,255,255,0.3)",
                        }}
                      >
                        {item.date}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "#fff",
                        lineHeight: 1.35,
                        marginBottom: "0.25rem",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.title}
                    </p>
                    <p
                      style={{
                        fontSize: "0.72rem",
                        color: "rgba(255,255,255,0.4)",
                        lineHeight: 1.55,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
              <div
                style={{
                  padding: "0.75rem 1.25rem",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <a
                  href="#"
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--red)",
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.opacity = "0.75")}
                  onMouseLeave={(e) => (e.target.style.opacity = "1")}
                >
                  Lihat semua berita →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <hr className="footer-divider" />
        <div className="footer-bottom">
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>
            © 2025 PT Surya Tripta Rekayasa. All Rights Reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Kebijakan Privasi", "Syarat & Ketentuan"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.3)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#fff")}
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(255,255,255,0.3)")
                }
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <main>
        <Hero />
        <Highlight />
        <History />
        <Listproyek />
      </main>
      <Footer />
    </>
  );
}
