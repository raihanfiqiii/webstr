import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProjectDetail from "./components/Proyekdetail";
import ProyekList from "./components/Proyeklist";
import Profile from "./components/Profile";

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --blue:    #1156A8;
      --blue-dk: #0A3E7C;
      --blue-lt: #1A6EC8;
      --blue-xs: #E8F0FA;
      --red:     #C8251F;
      --gold:    #B89A5A;
      --black:   #080C12;
      --gray-0:  #F5F5F3;
      --gray-1:  #EAEAE7;
      --gray-2:  #D4D4D0;
      --gray-3:  #9A9A96;
      --gray-4:  #5C5C58;
      --white:   #FFFFFF;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--gray-0);
      font-family: 'DM Sans', sans-serif;
      color: var(--black);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* ── Keyframes ── */
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(1.05); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes lineGrow {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-8px); }
    }

    @keyframes slideFromRight {
      from { opacity: 0; transform: translateX(40px) scale(1.02); }
      to   { opacity: 1; transform: translateX(0) scale(1); }
    }
    
    @keyframes slideFromLeft {
      from { opacity: 0; transform: translateX(-40px) scale(1.02); }
      to   { opacity: 1; transform: translateX(0) scale(1); }
    }

    @keyframes slideInFromRight {
      from { transform: translateX(100%); }
      to   { transform: translateX(0); }
    }
    @keyframes slideInFromLeft {
      from { transform: translateX(-100%); }
      to   { transform: translateX(0); }
    }
    @keyframes slideOutToLeft {
      from { transform: translateX(0); }
      to   { transform: translateX(-100%); }
    }
    @keyframes slideOutToRight {
      from { transform: translateX(0); }
      to   { transform: translateX(100%); }
    }
    @keyframes textFadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .slide-in-right  { animation: slideInFromRight 0.55s cubic-bezier(.32,.72,0,1) both; }
    .slide-in-left   { animation: slideInFromLeft  0.55s cubic-bezier(.32,.72,0,1) both; }
    .slide-out-left  { animation: slideOutToLeft   0.55s cubic-bezier(.32,.72,0,1) both; }
    .slide-out-right { animation: slideOutToRight  0.55s cubic-bezier(.32,.72,0,1) both; }
    .text-fade-in    { animation: textFadeIn 0.45s ease both; }
    
    .slide-from-right { animation: slideFromRight 0.55s cubic-bezier(.22,.68,0,1.15) both; }
    .slide-from-left  { animation: slideFromLeft  0.55s cubic-bezier(.22,.68,0,1.15) both; }

    .anim-slide-up  { animation: slideUp  0.7s cubic-bezier(.22,.68,0,1.2) both; }
    .anim-fade-in   { animation: fadeIn   0.55s ease both; }
    .anim-scale-in  { animation: scaleIn  0.75s cubic-bezier(.22,.68,0,1.1) both; }

    .d1 { animation-delay: 0.06s; }
    .d2 { animation-delay: 0.14s; }
    .d3 { animation-delay: 0.24s; }
    .d4 { animation-delay: 0.36s; }
    .d5 { animation-delay: 0.48s; }

    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }

    /* ── Tag / label chip ── */
    .tag-chip {
      display: inline-flex; align-items: center; gap: 0.35rem;
      padding: 0.22rem 0.75rem;
      border-radius: 999px;
      font-size: 0.62rem; font-weight: 600;
      letter-spacing: 0.1em; text-transform: uppercase;
      border: 1px solid rgba(17,86,168,0.25);
      background: rgba(17,86,168,0.07);
      color: var(--blue);
    }

    /* ── Stat number shimmer ── */
    .stat-shimmer {
      background: linear-gradient(90deg, var(--blue-dk), var(--blue-lt), var(--blue-dk));
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 3s linear infinite;
    }

    /* ── Section label ── */
    .section-label {
      font-size: 0.65rem; font-weight: 600;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: var(--blue); display: flex; align-items: center; gap: 0.6rem;
    }
    .section-label::before {
      content: '';
      display: inline-block; width: 24px; height: 1.5px;
      background: var(--blue);
    }

    /* ── Divider line ── */
    .ruled-line {
      height: 1px; background: var(--gray-2);
      position: relative; overflow: hidden;
    }
    .ruled-line::after {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(90deg, var(--blue), transparent);
      transform: scaleX(0); transform-origin: left;
      animation: lineGrow 1.2s cubic-bezier(.22,.68,0,1.2) 0.3s both;
    }

    /* ── Hover card lift ── */
    .card-hover {
      transition: transform 0.38s cubic-bezier(.22,.68,0,1.2),
                  box-shadow 0.38s ease;
    }
    .card-hover:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 52px rgba(8,12,18,0.14);
    }

    /* ── Button base ── */
    .btn-primary {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 0.7rem 1.75rem;
      background: var(--blue); color: #fff;
      border: none; border-radius: 4px;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.8rem; font-weight: 600;
      letter-spacing: 0.06em; text-transform: uppercase;
      cursor: pointer;
      transition: background 0.25s, transform 0.18s;
      position: relative; overflow: hidden;
    }
    .btn-primary::after {
      content: '';
      position: absolute; inset: 0;
      background: rgba(255,255,255,0.08);
      opacity: 0; transition: opacity 0.25s;
    }
    .btn-primary:hover { background: var(--blue-dk); transform: translateY(-1px); }
    .btn-primary:hover::after { opacity: 1; }

    .hamburger-btn {
  display: none !important;
}
@media (max-width: 767px) {
  .hamburger-btn {
    display: flex !important;
  }
}

    .btn-ghost {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 0.65rem 1.5rem;
      background: transparent;
      border: 1.5px solid var(--gray-2);
      border-radius: 4px;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.78rem; font-weight: 500;
      letter-spacing: 0.05em; color: var(--black);
      cursor: pointer;
      transition: border-color 0.25s, color 0.25s, background 0.25s;
    }
    .btn-ghost:hover {
      border-color: var(--blue); color: var(--blue);
      background: var(--blue-xs);
    }

    /* ── Responsive helpers ── */
    @media (max-width: 767px) {
      .hero-grid      { grid-template-columns: 1fr !important; }
      .highlight-grid { grid-template-columns: 1fr !important; }
      .history-grid   { grid-template-columns: 1fr !important; }
      .footer-grid    { grid-template-columns: 1fr !important; }
      .listproyek-outer { flex-direction: column !important; }
      .hide-mobile    { display: none !important; }
      .nav-items      { display: none !important; }
    }
  `}</style>
);

/* ─────────────────────────────────────────────
   NAVBAR — preserved, polished
───────────────────────────────────────────── */
// function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fn = () => setScrolled(window.scrollY > 24);
//     window.addEventListener("scroll", fn, { passive: true });
//     return () => window.removeEventListener("scroll", fn);
//   }, []);

//   return (
//     <header
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         right: 0,
//         zIndex: 200,
//         height: "68px",
//         display: "flex",
//         alignItems: "center",
//         padding: "0 clamp(1.25rem,4vw,2.5rem)",
//         justifyContent: "space-between",
//         background: scrolled ? "rgba(8,12,18,0.92)" : "rgba(10,62,124,0.95)",
//         backdropFilter: "blur(20px)",
//         borderBottom: scrolled
//           ? "1px solid rgba(255,255,255,0.08)"
//           : "1px solid rgba(255,255,255,0.12)",
//         transition: "background 0.45s, border-bottom 0.45s",
//       }}
//     >
//       {/* Logo */}
//       <div
//         onClick={() => navigate("/")}
//         style={{
//           display: "flex",
//           alignItems: "baseline",
//           gap: "0.6rem",
//           cursor: "pointer",
//         }}
//       >
//         <span
//           style={{
//             fontFamily: "'Cormorant Garamond', serif",
//             fontSize: "1.5rem",
//             fontWeight: 700,
//             letterSpacing: "0.05em",
//             color: "#fff",
//             lineHeight: 1,
//           }}
//         >
//           PT STR
//         </span>
//         <span
//           style={{
//             fontSize: "0.58rem",
//             fontWeight: 500,
//             letterSpacing: "0.14em",
//             textTransform: "uppercase",
//             color: "rgba(255,255,255,0.45)",
//             paddingBottom: "2px",
//           }}
//           className="hide-mobile"
//         >
//           Surya Tripta Rekayasa
//         </span>
//       </div>

//       {/* Nav items */}
//       <nav
//         className="nav-items"
//         style={{
//           display: "flex",
//           gap: "clamp(1.25rem,2.5vw,2.25rem)",
//           alignItems: "center",
//         }}
//       >
//         {[
//           { label: "Beranda", path: "/" },
//           { label: "Profile", path: "/profile" },
//           { label: "Proyek", path: "/proyek" },
//           { label: "Tentang", path: null },
//         ].map(({ label, path }) => (
//           <span
//             key={label}
//             onClick={() => path && navigate(path)}
//             style={{
//               fontSize: "0.75rem",
//               fontWeight: 500,
//               letterSpacing: "0.07em",
//               textTransform: "uppercase",
//               color: label === "Beranda" ? "#fff" : "rgba(255,255,255,0.62)",
//               cursor: path ? "pointer" : "default",
//               transition: "color 0.2s",
//               position: "relative",
//               paddingBottom: "2px",
//             }}
//             onMouseEnter={(e) => {
//               if (path) e.currentTarget.style.color = "#fff";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.color =
//                 label === "Beranda" ? "#fff" : "rgba(255,255,255,0.62)";
//             }}
//           >
//             {label}
//           </span>
//         ))}

//         {/* CTA button */}
//         <button
//           style={{
//             background: "var(--red)",
//             color: "#fff",
//             border: "none",
//             borderRadius: "3px",
//             padding: "0.48rem 1.25rem",
//             fontSize: "0.72rem",
//             fontWeight: 600,
//             letterSpacing: "0.08em",
//             textTransform: "uppercase",
//             cursor: "pointer",
//             transition: "background 0.22s, transform 0.18s",
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.background = "#a01c17";
//             e.currentTarget.style.transform = "translateY(-1px)";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.background = "var(--red)";
//             e.currentTarget.style.transform = "none";
//           }}
//         >
//           Hubungi Kami
//         </button>
//       </nav>
//     </header>
//   );
// }

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Tutup menu saat scroll
  useEffect(() => {
    if (!menuOpen) return;
    const fn = () => setMenuOpen(false);
    window.addEventListener("scroll", fn, { passive: true, once: true });
    return () => window.removeEventListener("scroll", fn);
  }, [menuOpen]);

  const navItems = [
    { label: "Beranda", path: "/" },
    { label: "Profile", path: "/profile" },
    { label: "Proyek", path: "/proyek" },
  ];

  const handleNav = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const contactOptions = [
    {
      label: "WhatsApp",
      sub: "+62 852-8298-2056",
      href: "https://wa.me/6285282982056",
      color: "#25D366",
      bg: "rgba(37,211,102,0.07)",
      border: "rgba(37,211,102,0.18)",
      iconBg: "rgba(37,211,102,0.12)",
      iconBorder: "rgba(37,211,102,0.25)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
            fill="#25D366"
          />
        </svg>
      ),
    },
    {
      label: "Instagram",
      sub: "@suryatriptarekayasa",
      href: "https://instagram.com/suryatriptarekayasa",
      color: "#E1306C",
      bg: "rgba(225,48,108,0.07)",
      border: "rgba(225,48,108,0.18)",
      iconBg: "rgba(225,48,108,0.10)",
      iconBorder: "rgba(225,48,108,0.22)",
      icon: (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
            fill="#E1306C"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          height: "68px",
          display: "flex",
          alignItems: "center",
          padding: "0 clamp(1.25rem,4vw,2.5rem)",
          justifyContent: "space-between",
          background: scrolled ? "rgba(8,12,18,0.92)" : "rgba(10,62,124,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(255,255,255,0.12)",
          transition: "background 0.45s, border-bottom 0.45s",
        }}
      >
        {/* Logo */}
        <div
          onClick={() => handleNav("/")}
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "0.6rem",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              color: "#fff",
              lineHeight: 1,
            }}
          >
            PT STR
          </span>
          <span
            style={{
              fontSize: "0.58rem",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              paddingBottom: "2px",
            }}
            className="hide-mobile"
          >
            Surya Tripta Rekayasa
          </span>
        </div>

        {/* Nav items — desktop */}
        <nav
          className="nav-items"
          style={{
            display: "flex",
            gap: "clamp(1.25rem,2.5vw,2.25rem)",
            alignItems: "center",
          }}
        >
          {navItems.map(({ label, path }) => (
            <span
              key={label}
              onClick={() => handleNav(path)}
              style={{
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: label === "Beranda" ? "#fff" : "rgba(255,255,255,0.62)",
                cursor: "pointer",
                transition: "color 0.2s",
                paddingBottom: "2px",
                borderBottom:
                  label === "Beranda"
                    ? "1.5px solid rgba(255,255,255,0.5)"
                    : "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color =
                  label === "Beranda" ? "#fff" : "rgba(255,255,255,0.62)";
              }}
            >
              {label}
            </span>
          ))}
          <button
            style={{
              background: "var(--red)",
              color: "#fff",
              border: "none",
              borderRadius: "3px",
              padding: "0.48rem 1.25rem",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "background 0.22s, transform 0.18s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#a01c17";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--red)";
              e.currentTarget.style.transform = "none";
            }}
          >
            Hubungi Kami
          </button>
        </nav>

        {/* Hamburger button — mobile only */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          style={{
            display: "none",
            flexDirection: "column",
            gap: "5px",
            cursor: "pointer",
            background: "none",
            border: "none",
            padding: "8px",
            borderRadius: "4px",
            transition: "background 0.2s",
          }}
          className="hamburger-btn"
        >
          <span
            style={{
              display: "block",
              width: "22px",
              height: "1.5px",
              background: "#fff",
              borderRadius: "2px",
              transition: "all 0.38s cubic-bezier(.22,.68,0,1.2)",
              transformOrigin: "center",
              transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: "22px",
              height: "1.5px",
              background: "#fff",
              borderRadius: "2px",
              transition: "all 0.38s cubic-bezier(.22,.68,0,1.2)",
              opacity: menuOpen ? 0 : 1,
              transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
            }}
          />
          <span
            style={{
              display: "block",
              width: "22px",
              height: "1.5px",
              background: "#fff",
              borderRadius: "2px",
              transition: "all 0.38s cubic-bezier(.22,.68,0,1.2)",
              transformOrigin: "center",
              transform: menuOpen
                ? "translateY(-6.5px) rotate(-45deg)"
                : "none",
            }}
          />
        </button>
      </header>

      {/* Mobile menu overlay */}
      <div
        style={{
          position: "fixed",
          top: "68px",
          left: 0,
          right: 0,
          zIndex: 199,
          background: "rgba(8,12,18,0.97)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          transformOrigin: "top",
          transform: menuOpen ? "scaleY(1)" : "scaleY(0)",
          opacity: menuOpen ? 1 : 0,
          transition:
            "transform 0.42s cubic-bezier(.22,.68,0,1.15), opacity 0.32s ease",
          pointerEvents: menuOpen ? "auto" : "none",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "1.5rem 2rem 2rem" }}>
          {navItems.map(({ label, path }, i) => (
            <div
              key={label}
              onClick={() => handleNav(path)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1.1rem 0",
                borderBottom:
                  i < navItems.length - 1
                    ? "1px solid rgba(255,255,255,0.06)"
                    : "none",
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.7";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}
              >
                <span
                  style={{
                    fontSize: "0.55rem",
                    color: "rgba(255,255,255,0.22)",
                    letterSpacing: "0.1em",
                    fontWeight: 500,
                    width: "18px",
                  }}
                >
                  0{i + 1}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.88)",
                    letterSpacing: "0.04em",
                    transition: "color 0.2s",
                  }}
                >
                  {label}
                </span>
              </div>
              <span
                style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.2)" }}
              >
                →
              </span>
            </div>
          ))}

          {/* Footer dalam menu */}
          <div
            style={{
              marginTop: "1.75rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: "0.08em",
                }}
              >
                PT Surya Tripta Rekayasa
              </p>
              <p
                style={{
                  fontSize: "0.58rem",
                  color: "rgba(255,255,255,0.15)",
                  marginTop: "0.2rem",
                  letterSpacing: "0.08em",
                }}
              >
                Surabaya, Jawa Timur
              </p>
            </div>
            <button
              style={{
                background: "var(--red)",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "0.72rem 1.75rem",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "background 0.22s",
                flex: 1,
                maxWidth: "200px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#a01c17";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--red)";
              }}
            >
              Hubungi Kami
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   HERO — editorial split-layout dengan stats bar
───────────────────────────────────────────── */
function Hero() {
  const slides = [
    {
      image: "/assets/kapal1.jpg",
      tag: "Desain & Arsitektur",
      title: "Designing Your",
      highlight: "Dream Space",
      desc: "Wujudkan Konsep dan Perencanaan Bangunan Anda melalui Desain Arsitektur, Perhitungan Struktur, dan Konsultasi Teknis Profesional.",
    },
    {
      image: "/assets/kapal2.jpg",
      tag: "Konstruksi Modern",
      title: "Building with",
      highlight: "Smart Plan",
      desc: "Solusi konstruksi modern dan inovatif untuk masa depan yang lebih baik dan berkelanjutan.",
    },
    {
      image: "/assets/kapal3.jpg",
      tag: "Nilai Berkelanjutan",
      title: "Constructing",
      highlight: "Long-Term Value",
      desc: "Kualitas dan presisi dalam setiap proyek konstruksi yang kami kerjakan bersama.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null); // indeks gambar sebelumnya
  const [dir, setDir] = useState(1); // 1 = next, -1 = prev
  const [textKey, setTextKey] = useState(0); // hanya untuk re-trigger teks
  const [sliding, setSliding] = useState(false);

  const go = (direction) => {
    if (sliding) return; // cegah double-click saat animasi
    setSliding(true);
    setDir(direction);
    setPrev(current);
    setCurrent((c) => (c + direction + slides.length) % slides.length);
    setTextKey((k) => k + 1);
    setTimeout(() => {
      setPrev(null);
      setSliding(false);
    }, 560); // sesuai durasi animasi
  };

  const left = slides[current];
  const right = slides[(current - 1 + slides.length) % slides.length];
  const prevSlide = prev !== null ? slides[prev] : null;

  const stats = [
    { num: "15+", label: "Tahun Pengalaman" },
    { num: "Rp 15T+", label: "Nilai Proyek" },
    { num: "10+", label: "Proyek Aktif" },
    { num: "200+", label: "Tim Profesional" },
  ];

  // class slide masuk: arah next → dari kanan, arah prev → dari kiri
  const slideInClass = dir === 1 ? "img-slide-in-right" : "img-slide-in-left";

  return (
    <section
      style={{
        paddingTop: "68px",
        background: "var(--gray-0)",
        position: "relative",
      }}
    >
      {/* Accent kiri */}
      <div
        style={{
          position: "absolute",
          top: "68px",
          left: 0,
          width: "3px",
          height: "clamp(120px,20vw,220px)",
          background: "linear-gradient(to bottom, var(--blue), transparent)",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "2.5rem 2rem 0",
        }}
      >
        <div className="anim-fade-in" style={{ marginBottom: "1.5rem" }}>
          <span className="section-label">Solusi Konstruksi Terpercaya</span>
        </div>

        <div
          className="hero-grid anim-fade-in"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "1.5rem",
          }}
        >
          {/* ── LEFT ── */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* ── Gambar utama: dua layer, tidak pakai key ── */}
            {/* ── Gambar utama: carousel dua layer ── */}
            <div
              style={{
                position: "relative",
                borderRadius: "8px 8px 0 0",
                overflow: "hidden",
                height: "clamp(240px, 34vw, 440px)",
              }}
            >
              {/* Gambar LAMA — keluar */}
              {prevSlide && (
                <img
                  key={"prev-left-" + prev}
                  src={prevSlide.image}
                  alt=""
                  className={dir === 1 ? "slide-out-left" : "slide-out-right"}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 1,
                  }}
                />
              )}

              {/* Gambar BARU — masuk */}
              <img
                key={"cur-left-" + current}
                src={left.image}
                alt={left.title}
                className={
                  prev !== null
                    ? dir === 1
                      ? "slide-in-right"
                      : "slide-in-left"
                    : ""
                }
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  zIndex: 2,
                }}
              />

              {/* Gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 3,
                  background:
                    "linear-gradient(to top, rgba(8,12,18,0.82) 0%, rgba(8,12,18,0.2) 55%, transparent 100%)",
                }}
              />

              {/* Tag badge */}
              <div
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  left: "1.25rem",
                  zIndex: 4,
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.28rem 0.85rem",
                    borderRadius: "3px",
                    background: "rgba(17,86,168,0.75)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    fontSize: "0.62rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#fff",
                  }}
                >
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: "#60C8FF",
                      display: "inline-block",
                    }}
                  />
                  {left.tag}
                </span>
              </div>

              {/* Teks bawah */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "clamp(1.25rem,3vw,2.25rem)",
                  zIndex: 4,
                }}
              >
                <p
                  key={textKey + "-counter"}
                  className="text-fade-in"
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "clamp(0.68rem,1.2vw,0.82rem)",
                    marginBottom: "0.3rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  {current + 1} — {slides.length}
                </p>
                <h1
                  key={textKey + "-title"}
                  className="text-fade-in"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "#fff",
                    fontSize: "clamp(2rem,5vw,4.5rem)",
                    fontWeight: 300,
                    lineHeight: 1.05,
                    fontStyle: "italic",
                    letterSpacing: "-0.01em",
                    animationDelay: "0.07s",
                  }}
                >
                  {left.title}
                </h1>
              </div>

              {/* Corner accent */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  zIndex: 4,
                  width: "48px",
                  height: "48px",
                  borderTop: "2px solid rgba(255,255,255,0.2)",
                  borderLeft: "2px solid rgba(255,255,255,0.2)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Text bar */}
            <div
              style={{
                background: "#fff",
                borderRadius: "0 0 8px 8px",
                padding: "clamp(1.25rem,3vw,2rem) clamp(1.25rem,3vw,2.25rem)",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                borderTop: "3px solid var(--blue)",
              }}
            >
              <h2
                key={textKey + "-highlight"}
                className="text-fade-in"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.4rem,5vw,5.5rem)",
                  fontWeight: 700,
                  lineHeight: 0.95,
                  color: "var(--black)",
                  letterSpacing: "-0.02em",
                }}
              >
                {left.highlight}
              </h2>

              <div
                key={textKey + "-desc"}
                className="text-fade-in"
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: "1.5rem",
                  flexWrap: "wrap",
                  animationDelay: "0.1s",
                }}
              >
                <p
                  style={{
                    color: "var(--gray-4)",
                    fontSize: "clamp(0.78rem,1.4vw,0.88rem)",
                    maxWidth: "440px",
                    lineHeight: 1.75,
                    fontWeight: 300,
                  }}
                >
                  {left.desc}
                </p>
                <div style={{ display: "flex", gap: "0.65rem", flexShrink: 0 }}>
                  <button className="btn-primary">
                    Explore Now <span style={{ fontSize: "0.9rem" }}>↗</span>
                  </button>
                  <button className="btn-ghost">Portofolio</button>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT — gambar preview, sama tekniknya ── */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div
              style={{
                position: "relative",
                borderRadius: "8px",
                overflow: "hidden",
                flex: "1",
                minHeight: "clamp(180px,26vw,320px)",
              }}
            >
              {/* Gambar LAMA — keluar, arah sama */}
              {prevSlide && (
                <img
                  key={"prev-right-" + prev}
                  src={slides[(prev - 1 + slides.length) % slides.length].image}
                  alt=""
                  className={dir === 1 ? "slide-out-left" : "slide-out-right"}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "brightness(0.72) saturate(1.1)",
                    zIndex: 1,
                  }}
                />
              )}

              {/* Gambar BARU — masuk, arah sama */}
              <img
                key={"cur-right-" + current}
                src={right.image}
                alt="preview"
                className={
                  prev !== null
                    ? dir === 1
                      ? "slide-in-right"
                      : "slide-in-left"
                    : ""
                }
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.72) saturate(1.1)",
                  zIndex: 2,
                }}
              />

              {/* Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 3,
                  background:
                    "linear-gradient(135deg, rgba(17,86,168,0.35) 0%, transparent 60%)",
                }}
              />

              {/* Tombol navigasi */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  right: "1rem",
                  display: "flex",
                  gap: "0.4rem",
                  zIndex: 4,
                }}
              >
                {[
                  { label: "‹", direction: -1 },
                  { label: "›", direction: 1 },
                ].map(({ label, direction }) => (
                  <button
                    key={label}
                    onClick={() => go(direction)}
                    disabled={sliding}
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "3px",
                      border: "1px solid rgba(255,255,255,0.4)",
                      background: "rgba(8,12,18,0.5)",
                      backdropFilter: "blur(8px)",
                      color: "#fff",
                      fontSize: "1rem",
                      cursor: sliding ? "default" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (!sliding)
                        e.currentTarget.style.background = "var(--blue)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(8,12,18,0.5)";
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Judul slide kanan */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  left: "1rem",
                  zIndex: 4,
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "clamp(0.95rem,1.8vw,1.25rem)",
                  fontWeight: 600,
                  fontStyle: "italic",
                  textShadow: "0 2px 12px rgba(0,0,0,0.4)",
                }}
              >
                {right.title}
              </div>

              {/* Blue stripe */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 4,
                  width: "3px",
                  height: "40%",
                  background: "var(--blue-lt)",
                }}
              />
            </div>

            {/* Discover card — tidak berubah, tidak perlu key */}
            <div
              style={{
                background: "var(--white)",
                borderRadius: "8px",
                padding: "1.35rem 1.5rem",
                boxShadow: "0 2px 16px rgba(8,12,18,0.06)",
                border: "1px solid var(--gray-1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    letterSpacing: "0.01em",
                    color: "var(--black)",
                  }}
                >
                  Discover Our Company
                </h3>
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--blue)",
                    boxShadow: "0 0 0 3px rgba(17,86,168,0.18)",
                  }}
                />
              </div>
              <ul style={{ listStyle: "none" }}>
                {[
                  "PT STR untuk Indonesia",
                  "Sejarah PT STR",
                  "PT Surya Tripta Rekayasa",
                  "Laporan Tahunan",
                  "Berita dan Agenda",
                ].map((item, i, arr) => (
                  <li
                    key={item}
                    style={{
                      padding: "0.52rem 0",
                      borderBottom:
                        i < arr.length - 1 ? "1px solid var(--gray-1)" : "none",
                      fontSize: "0.78rem",
                      color: "var(--gray-4)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--blue)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--gray-4)";
                    }}
                  >
                    <span>{item}</span>
                    <span style={{ fontSize: "0.7rem", opacity: 0.4 }}>→</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className="anim-slide-up d4"
          style={{
            margin: "2rem 0 0",
            padding: "1.75rem 2rem",
            background: "var(--blue-dk)",
            borderRadius: "8px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "2rem",
              right: "2rem",
              height: "1px",
              background: "rgba(255,255,255,0.1)",
            }}
          />
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
                borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none",
                paddingLeft: i > 0 ? "1.5rem" : "0",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.5rem,2.5vw,2rem)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                {s.num}
              </span>
              <span
                style={{
                  fontSize: "0.62rem",
                  color: "rgba(255,255,255,0.5)",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   HIGHLIGHT SECTION — dengan editorial split
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
    window.addEventListener("scroll", fn, { passive: true });
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
        {/* Section header */}
        <div
          style={{
            marginBottom: "2.5rem",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div>
            <span
              className="section-label"
              style={{ marginBottom: "0.6rem", display: "flex" }}
            >
              Tentang Kami
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.8rem,3.5vw,3rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                color: "var(--black)",
              }}
            >
              Visi & Keunggulan
            </h2>
          </div>
          <div
            className="ruled-line hide-mobile"
            style={{ width: "120px", alignSelf: "center" }}
          />
        </div>

        <div
          className="highlight-grid"
          style={{
            borderRadius: "8px",
            overflow: "hidden",
            background: "var(--white)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            boxShadow: "0 4px 32px rgba(8,12,18,0.08)",
            border: "1px solid var(--gray-1)",
          }}
        >
          {/* Image side */}
          <div
            style={{
              position: "relative",
              minHeight: "clamp(280px,30vw,520px)",
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
                  "linear-gradient(to right, transparent 50%, var(--white) 100%)",
              }}
            />
            {/* Blue corner bracket */}
            <div
              style={{
                position: "absolute",
                bottom: "1.5rem",
                left: "1.5rem",
                width: "40px",
                height: "40px",
                borderBottom: "2px solid var(--blue)",
                borderLeft: "2px solid var(--blue)",
              }}
            />
          </div>

          {/* Content side */}
          <div
            style={{
              padding: "clamp(2rem,4vw,3.5rem)",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              borderLeft: "1px solid var(--gray-1)",
            }}
          >
            <div key={animKey} className="anim-slide-up">
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.4rem,2.5vw,2.4rem)",
                  fontWeight: 700,
                  marginBottom: "0.8rem",
                  lineHeight: 1.15,
                  color: "var(--black)",
                }}
              >
                {current.title}
              </h3>
              <p
                style={{
                  color: "var(--gray-4)",
                  fontSize: "0.85rem",
                  lineHeight: 1.8,
                  maxWidth: "400px",
                }}
              >
                {current.desc}
              </p>
            </div>

            {/* Selector */}
            <div style={{ position: "relative", paddingLeft: "1.25rem" }}>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "1.5px",
                  background: "var(--gray-2)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: activeIndex === 0 ? "0%" : "50%",
                  height: "50%",
                  width: "2px",
                  background: "var(--blue)",
                  transition: "top 0.45s cubic-bezier(.22,.68,0,1.2)",
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
                    opacity: activeIndex === i ? 1 : 0.45,
                  }}
                  onMouseEnter={(e) => {
                    if (activeIndex !== i)
                      e.currentTarget.style.opacity = "0.7";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity =
                      activeIndex === i ? "1" : "0.45";
                  }}
                >
                  <h4
                    style={{
                      fontSize: "clamp(0.9rem,1.8vw,1.1rem)",
                      fontWeight: 600,
                      color:
                        activeIndex === i ? "var(--blue)" : "var(--gray-3)",
                      transition: "color 0.3s",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {item.activeTitle}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.78rem",
                      lineHeight: 1.7,
                      color:
                        activeIndex === i ? "var(--gray-4)" : "var(--gray-2)",
                      transition: "color 0.3s",
                      maxWidth: "360px",
                    }}
                  >
                    {item.activeDesc}
                  </p>
                </div>
              ))}
            </div>

            {/* Keunggulan chips */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {["ISO 9001", "BUJK Besar", "SBU Konstruksi", "25+ Klien"].map(
                (tag) => (
                  <span key={tag} className="tag-chip">
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   HISTORY SECTION — timeline yang diperkuat
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

  const timelineItems = ["Awal", "2024", "2025", "2026", "Berikutnya"];

  return (
    <section style={{ background: "#fff", padding: "5rem 2rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ marginBottom: "3rem" }}>
          <span
            className="section-label"
            style={{ marginBottom: "0.6rem", display: "flex" }}
          >
            Rekam Jejak
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem,3.5vw,3rem)",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            Sejarah & Pencapaian
          </h2>
        </div>

        <div
          className="history-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3.5rem",
            alignItems: "start",
          }}
        >
          {/* LEFT */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}
          >
            <div key={animKey + "-text"} className="anim-slide-up">
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.8rem,3.5vw,3rem)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  marginBottom: "0.75rem",
                  color: "var(--black)",
                }}
              >
                {current.title}
              </h3>
              <p
                style={{
                  color: "var(--gray-4)",
                  fontSize: "0.85rem",
                  lineHeight: 1.8,
                  maxWidth: "420px",
                }}
              >
                {current.desc}
              </p>
            </div>

            {/* Project card */}
            <div
              style={{
                borderRadius: "8px",
                padding: "1.75rem",
                background:
                  "linear-gradient(135deg, var(--blue-dk) 0%, var(--blue) 100%)",
                position: "relative",
                overflow: "hidden",
                color: "#fff",
              }}
            >
              {/* Decorative circle */}
              <div
                style={{
                  position: "absolute",
                  top: "-50px",
                  right: "-50px",
                  width: "140px",
                  height: "140px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.1)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "60px",
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.08)",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  marginBottom: "1rem",
                  background: "rgba(255,255,255,0.12)",
                  borderRadius: "3px",
                  padding: "0.2rem 0.65rem",
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Proyek Unggulan {current.year}
              </div>
              <h4
                style={{
                  fontWeight: 700,
                  fontSize: "1.15rem",
                  marginBottom: "0.6rem",
                }}
              >
                {current.project}
              </h4>
              <p style={{ fontSize: "0.82rem", lineHeight: 1.7, opacity: 0.8 }}>
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
                      border: "1px solid rgba(255,255,255,0.3)",
                      background: "rgba(255,255,255,0.12)",
                      borderRadius: "3px",
                      width: "38px",
                      height: "38px",
                      fontSize: "1.1rem",
                      cursor: "pointer",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(255,255,255,0.25)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(255,255,255,0.12)")
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
              className="anim-scale-in"
              style={{ borderRadius: "8px", overflow: "hidden" }}
            >
              <img
                src={current.images[imageIndex]}
                alt={current.project}
                style={{
                  width: "100%",
                  height: "clamp(200px,24vw,300px)",
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
                <div
                  key={i}
                  onClick={() => {
                    setImageIndex(i);
                    setAnimKey((k) => k + 1);
                  }}
                  style={{
                    width: imageIndex === i ? "68px" : "80px",
                    height: imageIndex === i ? "68px" : "80px",
                    borderRadius: "6px",
                    overflow: "hidden",
                    cursor: "pointer",
                    outline:
                      imageIndex === i
                        ? "2px solid var(--blue)"
                        : "2px solid transparent",
                    outlineOffset: "2px",
                    opacity: imageIndex === i ? 0.6 : 1,
                    transition: "all 0.3s",
                  }}
                >
                  <img
                    src={img}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Timeline ── */}
        <div style={{ marginTop: "4rem" }}>
          <div style={{ position: "relative" }}>
            {/* Line */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: 0,
                right: 0,
                height: "1px",
                background: "var(--gray-2)",
              }}
            />
            {/* Active line */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: 0,
                height: "1px",
                width: yearIndex === 0 ? "20%" : "40%",
                background: "var(--blue)",
                transition: "width 0.45s cubic-bezier(.22,.68,0,1.2)",
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
                          ? "2px solid var(--blue)"
                          : "2px solid var(--gray-2)",
                        background: active ? "var(--blue)" : "var(--white)",
                        transition: "all 0.35s",
                        boxShadow: active
                          ? "0 0 0 4px rgba(17,86,168,0.15)"
                          : "none",
                      }}
                    />
                    <span
                      style={{
                        marginTop: "0.7rem",
                        fontSize: "0.72rem",
                        fontWeight: active ? 600 : 400,
                        color: active ? "var(--blue)" : "var(--gray-3)",
                        transition: "color 0.3s",
                        letterSpacing: "0.05em",
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
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   LIST PROYEK SECTION — tetap, dengan polish
───────────────────────────────────────────── */
const projects = [
  {
    slug: "rest-area-betjam-1a",
    image: "/assets/gp1.jpg",
    date: "04 Des 2024",
    title: "Rest Area Betjam 1A",
    desc: "Pembangunan fasilitas rest area modern dengan konsep hijau dan berkelanjutan di jalur tol Betjam segmen A.",
  },
  {
    slug: "rest-area-betjam-1b",
    image: "/assets/gp2.jpg",
    date: "04 Des 2024",
    title: "Rest Area Betjam 1B",
    desc: "Pengembangan kawasan rest area terpadu dengan fasilitas UMKM lokal dan area parkir berkapasitas besar.",
  },
  {
    slug: "jembatan-layang-suramadu",
    image: "/assets/gp3.jpg",
    date: "15 Jan 2025",
    title: "Jembatan Layang Suramadu",
    desc: "Proyek peningkatan struktur jembatan layang dengan teknologi terkini untuk meningkatkan kapasitas lalu lintas.",
  },
  {
    slug: "gedung-perkantoran-delta",
    image: "/assets/gp4.jpg",
    date: "22 Feb 2025",
    title: "Gedung Perkantoran Delta",
    desc: "Konstruksi gedung perkantoran 12 lantai dengan desain ramah lingkungan dan sistem energi surya terintegrasi.",
  },
  {
    slug: "pelabuhan-kalimas-timur",
    image: "/assets/gp5.jpg",
    date: "10 Mar 2025",
    title: "Pelabuhan Kalimas Timur",
    desc: "Revitalisasi fasilitas pelabuhan untuk mendukung peningkatan kapasitas bongkar muat peti kemas nasional.",
  },
  {
    slug: "rusunawa-benowo",
    image: "/assets/gp6.jpg",
    date: "28 Mar 2025",
    title: "Rusunawa Benowo",
    desc: "Pembangunan rumah susun sederhana sewa bagi masyarakat berpenghasilan rendah dengan fasilitas lengkap.",
  },
  {
    slug: "drainase-kota-malang",
    image: "/assets/gp7.jpg",
    date: "05 Apr 2025",
    title: "Sistem Drainase Kota Malang",
    desc: "Peningkatan jaringan drainase perkotaan untuk mengatasi banjir dan genangan air di pusat kota Malang.",
  },
  {
    slug: "terminal-bus-madura",
    image: "/assets/gp8.jpg",
    date: "18 Apr 2025",
    title: "Terminal Bus Terpadu Madura",
    desc: "Pembangunan terminal bus modern berkonsep transit hub dengan integrasi moda transportasi umum.",
  },
  {
    slug: "spam-regional-pasuruan",
    image: "/assets/gp9.jpg",
    date: "02 Mei 2025",
    title: "SPAM Regional Pasuruan",
    desc: "Pengembangan sistem penyediaan air minum regional untuk melayani kebutuhan masyarakat Pasuruan Raya.",
  },
  {
    slug: "tol-akses-tanjung-perak",
    image: "/assets/gp10.jpg",
    date: "20 Mei 2025",
    title: "Tol Akses Pelabuhan Tanjung Perak",
    desc: "Konstruksi jalan tol akses khusus pelabuhan untuk memperlancar arus distribusi logistik nasional.",
  },
];

function ProjectCard({ project, index }) {
  const navigate = useNavigate();
  const isEven = index % 2 === 0;

  const handleNavigate = () => navigate(`/proyek/${project.slug}`);

  return (
    <div style={{ flexShrink: 0, width: "clamp(260px, 22vw, 288px)" }}>
      <div
        className="card-hover"
        onClick={handleNavigate}
        style={{
          background: "var(--white)",
          boxShadow: "0 2px 16px rgba(8,12,18,0.07)",
          overflow: "hidden",
          cursor: "pointer",
          borderRadius: isEven ? "8px 8px 8px 0" : "8px 8px 0 8px",
          border: "1px solid var(--gray-1)",
        }}
      >
        {/* Image */}
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
              transition: "transform 0.65s cubic-bezier(.22,.68,0,1.1)",
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
                "linear-gradient(to top, rgba(8,12,18,0.15) 0%, transparent 60%)",
            }}
          />
          {/* Blue accent strip */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: "var(--blue)",
              opacity: 0,
              transition: "opacity 0.25s",
            }}
            className="img-accent"
          />
        </div>

        {/* Meta row */}
        <div
          style={{
            padding: "0.85rem 1.1rem 0.4rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "0.62rem",
              color: "var(--gray-3)",
              letterSpacing: "0.06em",
              fontWeight: 500,
              textTransform: "uppercase",
            }}
          >
            {project.date}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNavigate();
            }}
            style={{
              fontSize: "0.62rem",
              fontWeight: 600,
              background: "var(--blue)",
              color: "#fff",
              border: "none",
              borderRadius: "3px",
              padding: "0.28rem 0.8rem",
              cursor: "pointer",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              transition: "background 0.22s",
            }}
            onMouseEnter={(e) => (e.target.style.background = "var(--blue-dk)")}
            onMouseLeave={(e) => (e.target.style.background = "var(--blue)")}
          >
            Detail
          </button>
        </div>

        {/* Text */}
        <div style={{ padding: "0.3rem 1.1rem 1.25rem" }}>
          <h4
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: "1.05rem",
              lineHeight: 1.3,
              marginBottom: "0.4rem",
              color: "var(--black)",
            }}
          >
            {project.title}
          </h4>
          <p
            style={{
              fontSize: "0.73rem",
              color: "var(--gray-3)",
              lineHeight: 1.65,
              display: "-webkit-box",
              WebkitLineClamp: 2,
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
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const SCROLL_AMOUNT = 300;

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
    <section style={{ background: "var(--gray-0)", padding: "5rem 2rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <span
            className="section-label"
            style={{ marginBottom: "0.6rem", display: "flex" }}
          >
            Portofolio
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.8rem,3.5vw,3rem)",
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              Proyek Pilihan
            </h2>
            <span
              onClick={() => navigate("/proyek")}
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--blue)",
                textDecoration: "none",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.65")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Lihat Semua <span>→</span>
            </span>
          </div>
        </div>

        <div
          className="listproyek-outer"
          style={{ display: "flex", gap: "1.5rem" }}
        >
          <style>{`
            .listproyek-outer { flex-direction: column; }
            @media (min-width: 768px) {
              .listproyek-outer { flex-direction: row; align-items: flex-start; }
              .listproyek-intro { width: clamp(230px, 24vw, 280px) !important; }
            }
          `}</style>

          {/* Intro card */}
          <div
            className="listproyek-intro"
            style={{
              width: "100%",
              flexShrink: 0,
              background: "var(--blue-dk)",
              borderRadius: "8px 8px 0 8px",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              color: "#fff",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* BG decorative */}
            <div
              style={{
                position: "absolute",
                top: "-60px",
                right: "-60px",
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.08)",
                pointerEvents: "none",
              }}
            />

            <div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.8rem,3vw,2.6rem)",
                  fontWeight: 700,
                  lineHeight: 1.05,
                  marginBottom: "0.75rem",
                }}
              >
                Pekerjaan Kami
              </h2>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.75,
                }}
              >
                Konstruksi, infrastruktur, dan konsultasi teknis untuk Indonesia
                yang lebih baik.
              </p>
            </div>

            {/* Mini stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem",
                padding: "1rem 0",
                borderTop: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {[
                { n: "10+", l: "Proyek" },
                { n: "Rp 15T", l: "Nilai" },
              ].map((s) => (
                <div key={s.l}>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    {s.n}
                  </p>
                  <p
                    style={{
                      fontSize: "0.62rem",
                      color: "rgba(255,255,255,0.45)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.l}
                  </p>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                onClick={() => navigate("/proyek")}
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                  cursor: "pointer",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#fff")}
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(255,255,255,0.7)")
                }
              >
                Semua Proyek
              </span>
              <div style={{ display: "flex", gap: "0.4rem" }}>
                {[
                  { label: "‹", fn: scrollLeft, active: canScrollLeft },
                  { label: "›", fn: scrollRight, active: canScrollRight },
                ].map(({ label, fn, active }) => (
                  <button
                    key={label}
                    onClick={fn}
                    disabled={!active}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "3px",
                      border: `1px solid ${active ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.12)"}`,
                      background: "rgba(255,255,255,0.08)",
                      color: active ? "#fff" : "rgba(255,255,255,0.25)",
                      fontSize: "1.1rem",
                      cursor: active ? "pointer" : "not-allowed",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (active)
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.18)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.08)";
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
                right: 0,
                top: 0,
                bottom: 0,
                width: "48px",
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
                gap: "1rem",
                overflowX: "auto",
                overflowY: "hidden",
                paddingBottom: "1rem",
                paddingTop: "0.25rem",
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
   SERVICES STRIP — tambahan premium
───────────────────────────────────────────── */
function ServicesStrip() {
  const services = [
    {
      icon: "◈",
      title: "Desain Arsitektur",
      desc: "Perencanaan bangunan dengan pendekatan estetika dan fungsionalitas tinggi.",
    },
    {
      icon: "⬡",
      title: "Konsultasi Struktur",
      desc: "Analisis dan perhitungan struktur dengan teknologi rekayasa mutakhir.",
    },
    {
      icon: "◇",
      title: "Manajemen Proyek",
      desc: "Pengawasan proyek terstruktur dari perencanaan hingga serah terima.",
    },
    {
      icon: "○",
      title: "Konstruksi & Build",
      desc: "Pelaksanaan konstruksi dengan standar keamanan dan kualitas internasional.",
    },
  ];

  return (
    <section
      style={{
        background: "var(--white)",
        padding: "5rem 2rem",
        borderTop: "1px solid var(--gray-1)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ marginBottom: "3rem" }}>
          <span
            className="section-label"
            style={{ marginBottom: "0.6rem", display: "flex" }}
          >
            Layanan Kami
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem,3.5vw,3rem)",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            Kompetensi Utama
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1px",
            background: "var(--gray-1)",
            border: "1px solid var(--gray-1)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          {services.map((s, i) => (
            <div
              key={i}
              className="card-hover"
              style={{
                background: "var(--white)",
                padding: "2rem 1.75rem",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  fontSize: "1.4rem",
                  color: "var(--blue)",
                  marginBottom: "1rem",
                  lineHeight: 1,
                }}
              >
                {s.icon}
              </div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  marginBottom: "0.6rem",
                  color: "var(--black)",
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontSize: "0.78rem",
                  color: "var(--gray-4)",
                  lineHeight: 1.75,
                }}
              >
                {s.desc}
              </p>
              <div
                style={{
                  marginTop: "1.25rem",
                  fontSize: "0.65rem",
                  color: "var(--blue)",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                Selengkapnya <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER — premium dark
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
      {/* Transition notch */}
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
          padding: "4rem 2rem 2.5rem",
        }}
      >
        <style>{`
          .footer-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
          @media (min-width: 768px) {
            .footer-grid { grid-template-columns: 1.4fr 1fr 1.2fr; gap: 3.5rem; }
          }
          .footer-divider {
            border: none;
            border-top: 1px solid rgba(255,255,255,0.08);
            margin: 2.5rem 0 1.75rem;
          }
          .footer-bottom {
            display: flex; flex-direction: column;
            gap: 0.75rem; align-items: flex-start;
          }
          @media (min-width: 768px) {
            .footer-bottom { flex-direction: row; justify-content: space-between; align-items: center; }
          }
        `}</style>

        {/* Top brand strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "3rem",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            marginBottom: "3rem",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                color: "#fff",
                display: "block",
              }}
            >
              PT STR
            </span>
            <p
              style={{
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Surya Tripta Rekayasa
            </p>
          </div>
          <p
            style={{
              fontSize: "0.82rem",
              color: "rgba(255,255,255,0.45)",
              maxWidth: "380px",
              lineHeight: 1.75,
              fontStyle: "italic",
            }}
          >
            "Membangun Indonesia dengan kualitas, presisi, dan integritas yang
            tidak pernah berkompromi."
          </p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {socials.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "3px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  transition: "border-color 0.2s, color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--blue-lt)";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.background = "var(--blue)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-grid">
          {/* COL 1 — Info */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.62rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                  marginBottom: "0.75rem",
                }}
              >
                Kantor Pusat
              </p>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.85,
                }}
              >
                Kawasan Industri Surabaya
                <br />
                Jl. Rungkut Industri Raya No. 10
                <br />
                Surabaya, Jawa Timur 60293
              </p>
            </div>
            <div
              style={{
                fontSize: "0.78rem",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 2.2,
              }}
            >
              <div style={{ display: "flex", gap: "0.6rem" }}>
                <span style={{ color: "rgba(255,255,255,0.3)", width: "16px" }}>
                  T
                </span>
                <span>(031) 123 4567</span>
              </div>
              <div style={{ display: "flex", gap: "0.6rem" }}>
                <span style={{ color: "rgba(255,255,255,0.3)", width: "16px" }}>
                  F
                </span>
                <span>(031) 765 4321</span>
              </div>
              <div style={{ display: "flex", gap: "0.6rem" }}>
                <span style={{ color: "rgba(255,255,255,0.3)", width: "16px" }}>
                  E
                </span>
                <span>info@ptsurya.co.id</span>
              </div>
            </div>
          </div>

          {/* COL 2 — Nav */}
          <div>
            <p
              style={{
                fontSize: "0.62rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: "1.25rem",
              }}
            >
              Navigasi
            </p>
            <ul style={{ listStyle: "none" }}>
              {navLinks.map((item, i, arr) => (
                <li
                  key={item}
                  style={{
                    padding: "0.52rem 0",
                    borderBottom:
                      i < arr.length - 1
                        ? "1px solid rgba(255,255,255,0.06)"
                        : "none",
                  }}
                >
                  <a
                    href="#"
                    style={{
                      fontSize: "0.8rem",
                      color: "rgba(255,255,255,0.6)",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
                    }
                  >
                    {item}
                    <span style={{ fontSize: "0.6rem", opacity: 0.3 }}>→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3 — Berita */}
          <div>
            <p
              style={{
                fontSize: "0.62rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: "1.25rem",
              }}
            >
              Berita Terkini
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {berita.map((item, i, arr) => (
                <div
                  key={i}
                  style={{
                    padding: "1rem 0",
                    borderBottom:
                      i < arr.length - 1
                        ? "1px solid rgba(255,255,255,0.06)"
                        : "none",
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      marginBottom: "0.4rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.58rem",
                        fontWeight: 600,
                        color: "var(--blue-lt)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.tag}
                    </span>
                    <span
                      style={{
                        fontSize: "0.58rem",
                        color: "rgba(255,255,255,0.25)",
                      }}
                    >
                      {item.date}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.85)",
                      lineHeight: 1.4,
                      marginBottom: "0.3rem",
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{
                      fontSize: "0.7rem",
                      color: "rgba(255,255,255,0.38)",
                      lineHeight: 1.55,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
            <a
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                marginTop: "1rem",
                fontSize: "0.68rem",
                fontWeight: 600,
                color: "var(--blue-lt)",
                textDecoration: "none",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")}
            >
              Semua Berita →
            </a>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <p
            style={{
              fontSize: "0.72rem",
              color: "rgba(255,255,255,0.22)",
              letterSpacing: "0.04em",
            }}
          >
            © {new Date().getFullYear()} PT Surya Tripta Rekayasa. All Rights
            Reserved.
          </p>
          <div style={{ display: "flex", gap: "2rem" }}>
            {["Kebijakan Privasi", "Syarat & Ketentuan"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.22)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "rgba(255,255,255,0.65)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(255,255,255,0.22)")
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
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <main>
                <Hero />
                <Highlight />
                <ServicesStrip />
                <History />
                <Listproyek />
              </main>
              <Footer />
            </>
          }
        />
        <Route path="/proyek" element={<ProyekList />} />
        <Route path="/proyek/:slug" element={<ProjectDetail />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}
