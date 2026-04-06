import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const komisarisData = [
  {
    id: "dk1",
    name: "Hadi Surya Wibawanto",
    jabatan: "Komisaris Utama",
    image: "/assets/dk1.jpg",
    backgrounds: [
      { label: "S1 Teknik Sipil", detail: "ITN Malang" },
      { label: "S2 Teknik Sipil Terapan", detail: "Universitas Brawijaya" },
      { label: "S3 Teknik Sipil Terapan", detail: "ITS Surabaya" },
      { label: "Best Structure Engineer", detail: "se-Malang Raya tahun 2026" },
    ],
  },
  {
    id: "dk2",
    name: "Azzura Yunita",
    jabatan: "Komisaris",
    image: "/assets/dk2.jpg",
    backgrounds: [
      { label: "S1 Manajemen Bisnis", detail: "Universitas Airlangga" },
      { label: "S2 Manajemen Keuangan", detail: "Universitas Indonesia" },
      { label: "Certified Risk Manager", detail: "GRMI 2019" },
    ],
  },
  {
    id: "dk3",
    name: "Irasiqin Wibawanto",
    jabatan: "Komisaris Independen",
    image: "/assets/dk3.jpg",
    backgrounds: [
      { label: "S1 Hukum Bisnis", detail: "Universitas Gadjah Mada" },
      { label: "S2 Hukum Internasional", detail: "Universitas Indonesia" },
      { label: "Certified Corporate Governance", detail: "IICG 2020" },
    ],
  },
];

const direksiData = [
  {
    id: "dd1",
    name: "Aji Prasetyanti",
    jabatan: "Direktur Utama",
    image: "/assets/dd1.jpg",
    backgrounds: [
      { label: "S1 Teknik Industri", detail: "ITS Surabaya" },
      { label: "S2 MBA", detail: "Universitas Indonesia" },
      { label: "20+ Tahun Pengalaman", detail: "di bidang konstruksi & EPC" },
    ],
  },
  {
    id: "dd2",
    name: "G. Aji Sentosa",
    jabatan: "Direktur Operasi I",
    image: "/assets/dd2.jpg",
    backgrounds: [
      { label: "S1 Teknik Sipil", detail: "Universitas Brawijaya" },
      { label: "S2 Manajemen Proyek", detail: "ITS Surabaya" },
      { label: "PMP Certified", detail: "PMI International 2015" },
    ],
  },
  {
    id: "dd3",
    name: "Aditya Novendra Jaya",
    jabatan: "Direktur Operasi III",
    image: "/assets/dd3.jpg",
    backgrounds: [
      { label: "S1 Teknik Mesin", detail: "Universitas Diponegoro" },
      { label: "S2 Teknik Industri", detail: "ITS Surabaya" },
      { label: "15+ Tahun Pengalaman", detail: "di bidang manufaktur" },
    ],
  },
  {
    id: "dd4",
    name: "Dadan Hikmat Ramdhani",
    jabatan: "Direktur Keuangan & Manajemen Risiko",
    image: "/assets/dd4.jpg",
    backgrounds: [
      { label: "S1 Akuntansi", detail: "Universitas Padjadjaran" },
      { label: "S2 Keuangan", detail: "Universitas Indonesia" },
      { label: "CFA & CPA Certified", detail: "2017 & 2018" },
    ],
  },
  {
    id: "dd5",
    name: "Sari Dewi Puspita",
    jabatan: "Direktur SDM & Umum",
    image: "/assets/dd5.jpg",
    backgrounds: [
      { label: "S1 Psikologi", detail: "Universitas Airlangga" },
      { label: "S2 MSDM", detail: "Universitas Gadjah Mada" },
      { label: "CHRP Certified", detail: "BNSP 2019" },
    ],
  },
];

/* ─────────────────────────────────────────────
   MEMBER CARD — selaras dengan card-hover App.jsx
───────────────────────────────────────────── */
function MemberCard({ member }) {
  const [showBg, setShowBg] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
        cursor: "pointer",
      }}
      onClick={() => setShowBg((v) => !v)}
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && setShowBg((v) => !v)
      }
      tabIndex={0}
      role="button"
      aria-label={`Lihat background ${member.name}`}
    >
      {/* Photo Wrapper */}
      <div
        className="member-photo-wrap"
        style={{
          position: "relative",
          width: "100%",
          borderRadius: "8px",
          overflow: "hidden",
          aspectRatio: "3/4",
          background: "var(--gray-1)",
          outline: showBg ? "2px solid var(--blue)" : "2px solid transparent",
          outlineOffset: "2px",
          transition: "outline-color 0.3s, box-shadow 0.35s",
          boxShadow: showBg
            ? "0 12px 40px rgba(17,86,168,0.18)"
            : "0 2px 16px rgba(8,12,18,0.08)",
        }}
      >
        <style>{`
          .member-photo-wrap:hover .member-photo {
            transform: scale(1.06) !important;
          }
          .member-photo-wrap:focus-within .member-photo {
            transform: scale(1.06) !important;
          }
          .member-photo-wrap:hover {
            box-shadow: 0 16px 48px rgba(8,12,18,0.14) !important;
          }
        `}</style>

        {/* Photo */}
        <img
          src={member.image}
          alt={member.name}
          className="member-photo"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            display: "block",
            transition: "transform 0.55s cubic-bezier(.22,.68,0,1.1)",
            transform: "scale(1)",
          }}
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentElement.style.background =
              "linear-gradient(135deg, #EAEAE7 0%, #D4D4D0 100%)";
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(8,12,18,0.55) 0%, transparent 55%)",
            transition: "opacity 0.3s",
            opacity: showBg ? 0 : 1,
          }}
        />

        {/* Hint label bottom */}
        <div
          style={{
            position: "absolute",
            bottom: "0.85rem",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: showBg ? 0 : 1,
            transition: "opacity 0.25s",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontSize: "0.58rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              background: "rgba(8,12,18,0.45)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "3px",
              padding: "0.2rem 0.65rem",
            }}
          >
            Lihat Background
          </span>
        </div>

        {/* Blue stripe accent top-left (App.jsx style) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "3px",
            height: "35%",
            background: "var(--blue-lt)",
            opacity: showBg ? 0 : 1,
            transition: "opacity 0.3s",
          }}
        />

        {/* Background Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(160deg, rgba(10,62,124,0.97) 0%, rgba(8,12,18,0.95) 100%)",
            backdropFilter: "blur(2px)",
            opacity: showBg ? 1 : 0,
            transition: "opacity 0.38s ease",
            pointerEvents: showBg ? "all" : "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "1.5rem 1.25rem",
          }}
        >
          {/* Header label */}
          <p
            style={{
              fontSize: "0.58rem",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "16px",
                height: "1.5px",
                background: "var(--blue-lt)",
              }}
            />
            Backgrounds
          </p>

          <ul style={{ listStyle: "none" }}>
            {member.backgrounds.map((bg, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.05rem",
                  paddingLeft: "0.75rem",
                  borderLeft: "2px solid rgba(255,255,255,0.18)",
                  marginBottom:
                    i < member.backgrounds.length - 1 ? "0.65rem" : 0,
                  opacity: showBg ? 1 : 0,
                  transform: showBg ? "translateX(0)" : "translateX(-10px)",
                  transition: `opacity 0.35s ease ${0.07 * i + 0.1}s, transform 0.35s ease ${0.07 * i + 0.1}s`,
                }}
              >
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    color: "#fff",
                    lineHeight: 1.35,
                  }}
                >
                  {bg.label}
                </span>
                <span
                  style={{
                    fontSize: "0.6rem",
                    color: "rgba(255,255,255,0.45)",
                    fontStyle: "italic",
                  }}
                >
                  {bg.detail}
                </span>
              </li>
            ))}
          </ul>

          {/* Close hint */}
          <div
            style={{
              marginTop: "1.25rem",
              paddingTop: "0.75rem",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.58rem",
              color: "rgba(255,255,255,0.28)",
              letterSpacing: "0.08em",
              opacity: showBg ? 1 : 0,
              transition: "opacity 0.4s ease 0.32s",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "12px",
                height: "12px",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: "2px",
                textAlign: "center",
                lineHeight: "10px",
                fontSize: "0.5rem",
              }}
            >
              ×
            </span>
            Klik untuk tutup
          </div>
        </div>
      </div>

      {/* Name & Jabatan */}
      <div style={{ textAlign: "center", paddingBottom: "0.25rem" }}>
        <p
          style={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "var(--black)",
            lineHeight: 1.3,
            marginBottom: "0.25rem",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {member.name}
        </p>
        <p
          style={{
            fontSize: "0.68rem",
            color: "var(--blue)",
            fontWeight: 500,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {member.jabatan}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION BLOCK
───────────────────────────────────────────── */
function BoardSection({ title, members, columns }) {
  return (
    <div style={{ marginBottom: "5rem" }}>
      {/* Section header — identik dengan App.jsx */}
      <div style={{ marginBottom: "2rem" }}>
        <span
          className="section-label"
          style={{ marginBottom: "0.6rem", display: "flex" }}
        >
          Manajemen
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.25rem",
          }}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
              fontWeight: 700,
              color: "var(--black)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </h2>
          {/* Ruled line accent */}
          <div
            style={{
              flex: 1,
              maxWidth: "120px",
              height: "1px",
              background: "var(--gray-2)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, var(--blue), transparent)",
                animation:
                  "lineGrow 1.2s cubic-bezier(.22,.68,0,1.2) 0.3s both",
              }}
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div
        className={`board-grid board-grid-${columns}`}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: "clamp(0.75rem, 2vw, 1.5rem)",
        }}
      >
        <style>{`
          @media (max-width: 1024px) {
            .board-grid-5 { grid-template-columns: repeat(3, 1fr) !important; }
            .board-grid-3 { grid-template-columns: repeat(3, 1fr) !important; }
          }
          @media (max-width: 640px) {
            .board-grid-5 { grid-template-columns: repeat(2, 1fr) !important; }
            .board-grid-3 { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 400px) {
            .board-grid-5, .board-grid-3 { grid-template-columns: 1fr !important; }
          }
        `}</style>
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   NAVBAR — identik dengan App.jsx
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
//               color: label === "Profile" ? "#fff" : "rgba(255,255,255,0.62)",
//               cursor: path ? "pointer" : "default",
//               transition: "color 0.2s",
//               position: "relative",
//               paddingBottom: "2px",
//               borderBottom:
//                 label === "Profile"
//                   ? "1.5px solid rgba(255,255,255,0.5)"
//                   : "none",
//             }}
//             onMouseEnter={(e) => {
//               if (path) e.currentTarget.style.color = "#fff";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.color =
//                 label === "Profile" ? "#fff" : "rgba(255,255,255,0.62)";
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
                color: label === "Profile" ? "#fff" : "rgba(255,255,255,0.62)",
                cursor: "pointer",
                transition: "color 0.2s",
                paddingBottom: "2px",
                borderBottom:
                  label === "Profile"
                    ? "1.5px solid rgba(255,255,255,0.5)"
                    : "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color =
                  label === "Profile" ? "#fff" : "rgba(255,255,255,0.62)";
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
   FOOTER — identik dengan App.jsx
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
          .fp-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
          @media (min-width: 768px) {
            .fp-grid { grid-template-columns: 1.4fr 1fr 1.2fr; gap: 3.5rem; }
          }
          .fp-divider { border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 2.5rem 0 1.75rem; }
          .fp-bottom { display: flex; flex-direction: column; gap: 0.75rem; align-items: flex-start; }
          @media (min-width: 768px) {
            .fp-bottom { flex-direction: row; justify-content: space-between; align-items: center; }
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

        <div className="fp-grid">
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
              {[
                { k: "T", v: "(031) 123 4567" },
                { k: "F", v: "(031) 765 4321" },
                { k: "E", v: "info@ptsurya.co.id" },
              ].map(({ k, v }) => (
                <div key={k} style={{ display: "flex", gap: "0.6rem" }}>
                  <span
                    style={{ color: "rgba(255,255,255,0.3)", width: "16px" }}
                  >
                    {k}
                  </span>
                  <span>{v}</span>
                </div>
              ))}
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
            <div style={{ display: "flex", flexDirection: "column" }}>
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

        <hr className="fp-divider" />
        <div className="fp-bottom">
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
   MAIN PROFILE PAGE
───────────────────────────────────────────── */
export default function Profile() {
  return (
    <>
      <Navbar />
      <main
        style={{
          paddingTop: "68px",
          background: "var(--gray-0)",
          minHeight: "100vh",
        }}
      >
        {/* ── Page Header — selaras dengan hero App.jsx ── */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(10,62,124,0.97) 0%, rgba(8,12,18,0.96) 100%)",
            padding: "4rem clamp(1.25rem, 4vw, 2.5rem) 3.5rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Blue geometric accent kiri — identik App.jsx */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "3px",
              height: "100%",
              background:
                "linear-gradient(to bottom, var(--blue-lt), transparent)",
              pointerEvents: "none",
            }}
          />

          {/* Decorative circles */}
          <div
            style={{
              position: "absolute",
              right: "-100px",
              top: "-100px",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.05)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "60px",
              top: "-160px",
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.04)",
              pointerEvents: "none",
            }}
          />
          {/* Corner bracket accent — App.jsx style */}
          <div
            style={{
              position: "absolute",
              bottom: "1.5rem",
              right: "2rem",
              width: "40px",
              height: "40px",
              borderBottom: "2px solid rgba(255,255,255,0.1)",
              borderRight: "2px solid rgba(255,255,255,0.1)",
              pointerEvents: "none",
            }}
          />

          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            {/* Section label */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                marginBottom: "0.8rem",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "24px",
                  height: "1.5px",
                  background: "var(--blue-lt)",
                }}
              />
              <p
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--blue-lt)",
                }}
              >
                PT Surya Tripta Rekayasa
              </p>
            </div>

            <h1
              className="anim-slide-up"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.05,
                marginBottom: "0.85rem",
                letterSpacing: "-0.01em",
                fontStyle: "italic",
              }}
            >
              Profil Manajemen
            </h1>

            <p
              className="anim-slide-up d2"
              style={{
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.5)",
                maxWidth: "520px",
                lineHeight: 1.8,
                fontWeight: 300,
              }}
            >
              Dipimpin oleh para profesional berpengalaman yang berkomitmen
              membangun PT STR menjadi perusahaan konstruksi terkemuka di
              Indonesia.
            </p>

            {/* Stats bar mini — konsisten dengan stats bar Hero */}
            <div
              style={{
                display: "flex",
                gap: "2.5rem",
                marginTop: "2.5rem",
                paddingTop: "2rem",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                flexWrap: "wrap",
              }}
            >
              {[
                { num: "8", label: "Anggota Board" },
                { num: "3", label: "Komisaris" },
                { num: "5", label: "Direksi" },
                { num: "15+", label: "Tahun Pengalaman Rata-rata" },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.2rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                      fontWeight: 700,
                      color: "#fff",
                      lineHeight: 1,
                    }}
                  >
                    {s.num}
                  </span>
                  <span
                    style={{
                      fontSize: "0.6rem",
                      color: "rgba(255,255,255,0.4)",
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
        </div>

        {/* ── Content ── */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "4rem clamp(1.25rem, 4vw, 2.5rem) 5rem",
          }}
        >
          {/* Tag chips keunggulan — App.jsx style */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              marginBottom: "4rem",
              paddingBottom: "3rem",
              borderBottom: "1px solid var(--gray-1)",
            }}
          >
            {[
              "Profesional Berpengalaman",
              "Tata Kelola Baik",
              "Rekam Jejak Terbukti",
              "Sertifikasi Internasional",
            ].map((tag) => (
              <span key={tag} className="tag-chip">
                {tag}
              </span>
            ))}
          </div>

          <BoardSection
            title="Dewan Komisaris"
            members={komisarisData}
            columns={3}
          />
          <BoardSection
            title="Dewan Direksi"
            members={direksiData}
            columns={5}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
