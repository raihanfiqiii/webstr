import { useState } from "react";
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
   MEMBER CARD
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
        style={{
          position: "relative",
          width: "100%",
          borderRadius: "1rem",
          overflow: "hidden",
          aspectRatio: "3/4",
          background: "var(--gray-1)",
          outline: showBg
            ? "2px solid rgba(10,62,124,0.5)"
            : "2px solid transparent",
          transition: "outline-color 0.3s",
        }}
        className="member-photo-wrap"
      >
        <style>{`
          .member-photo-wrap:hover .member-photo {
            transform: scale(1.07) !important;
          }
          .member-photo-wrap:focus-within .member-photo {
            transform: scale(1.07) !important;
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
              "linear-gradient(135deg, #e8e8e5 0%, #d2d2ce 100%)";
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)",
            transition: "opacity 0.3s",
          }}
        />

        {/* Background Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(160deg, rgba(10,62,124,0.95) 0%, rgba(14,14,14,0.92) 100%)",
            backdropFilter: "blur(2px)",
            opacity: showBg ? 1 : 0,
            transition: "opacity 0.38s ease",
            pointerEvents: showBg ? "all" : "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "1.25rem",
            gap: "0",
          }}
        >
          <p
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "0.75rem",
            }}
          >
            Backgrounds
          </p>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {member.backgrounds.map((bg, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.05rem",
                  paddingLeft: "0.75rem",
                  borderLeft: "2px solid rgba(255,255,255,0.25)",
                  opacity: showBg ? 1 : 0,
                  transform: showBg ? "translateX(0)" : "translateX(-8px)",
                  transition: `opacity 0.35s ease ${0.06 * i + 0.1}s, transform 0.35s ease ${0.06 * i + 0.1}s`,
                }}
              >
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    color: "#fff",
                    lineHeight: 1.3,
                  }}
                >
                  {bg.label}
                </span>
                <span
                  style={{
                    fontSize: "0.62rem",
                    color: "rgba(255,255,255,0.55)",
                    fontStyle: "italic",
                  }}
                >
                  [{bg.detail}]
                </span>
              </li>
            ))}
          </ul>
          <div
            style={{
              marginTop: "1rem",
              fontSize: "0.62rem",
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.06em",
              opacity: showBg ? 1 : 0,
              transition: "opacity 0.4s ease 0.3s",
            }}
          >
            More info →
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
            marginBottom: "0.2rem",
          }}
        >
          {member.name}
        </p>
        <p
          style={{
            fontSize: "0.72rem",
            color: "rgba(10,62,124,0.85)",
            fontWeight: 500,
            letterSpacing: "0.01em",
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
    <div style={{ marginBottom: "4rem" }}>
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            width: "4px",
            height: "2rem",
            background: "rgba(10,62,124,0.85)",
            borderRadius: "2px",
            flexShrink: 0,
          }}
        />
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            fontWeight: 700,
            color: "var(--black)",
            letterSpacing: "0.02em",
          }}
        >
          {title}
        </h2>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: "clamp(0.75rem, 2vw, 1.5rem)",
        }}
        className={`board-grid board-grid-${columns}`}
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
   NAVBAR (copy dari App.jsx)
───────────────────────────────────────────── */
function Navbar() {
  const navigate = useNavigate();
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 clamp(1.25rem,4vw,2.5rem)",
        height: "68px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(10,62,124,0.95)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
        transition: "background 0.4s",
      }}
    >
      <span
        onClick={() => navigate("/")}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.35rem",
          fontWeight: 700,
          letterSpacing: "0.04em",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        PT STR
      </span>
      <nav
        style={{
          display: "flex",
          gap: "clamp(1rem,2.5vw,2rem)",
          alignItems: "center",
        }}
      >
        {[
          { label: "Beranda", path: "/" },
          { label: "Profile", path: "/profile" },
          { label: "Proyek", path: "/proyek" },
          { label: "Tentang", path: null },
        ].map(({ label, path }) => (
          <span
            key={label}
            onClick={() => path && navigate(path)}
            style={{
              fontSize: "0.78rem",
              fontWeight: label === "Profil" ? 600 : 500,
              color: label === "Profil" ? "rgba(255,255,255,0.85)" : "#fff",
              letterSpacing: "0.06em",
              cursor: path ? "pointer" : "default",
              transition: "color 0.2s",
              textUnderlineOffset: "3px",
              textDecoration: label === "Profile" ? "underline" : "none",
              textDecorationColor:
                label === "Profile" ? "rgba(255,255,255,0.4)" : "transparent",
            }}
            onMouseEnter={(e) =>
              (e.target.style.color = "rgba(255,255,255,0.7)")
            }
            onMouseLeave={(e) =>
              (e.target.style.color =
                label === "Profile" ? "rgba(255,255,255,0.85)" : "#fff")
            }
          >
            {label}
          </span>
        ))}
        <button
          style={{
            background: "rgba(255,255,255,0.15)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "999px",
            padding: "0.45rem 1.2rem",
            fontSize: "0.75rem",
            fontWeight: 500,
            cursor: "pointer",
            letterSpacing: "0.04em",
            transition: "background 0.25s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.25)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.15)")
          }
        >
          Hubungi Kami
        </button>
      </nav>
    </header>
  );
}

/* ─────────────────────────────────────────────
   FOOTER (ringkas, sesuai App.jsx)
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
  const socials = [
    { label: "f", href: "#" },
    { label: "in", href: "#" },
    { label: "ig", href: "#" },
    { label: "yt", href: "#" },
  ];
  return (
    <footer style={{ background: "var(--black)", color: "#fff", padding: "0" }}>
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
          .fp-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
          @media (min-width: 768px) { .fp-grid { grid-template-columns: 1.2fr 1fr; gap: 3rem; } }
          .fp-divider { border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 2.5rem 0 1.5rem; }
          .fp-bottom { display: flex; flex-direction: column; gap: 0.75rem; align-items: flex-start; }
          @media (min-width: 768px) { .fp-bottom { flex-direction: row; justify-content: space-between; align-items: center; } }
        `}</style>
        <div className="fp-grid">
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
                  color: "rgba(255,255,255,0.7)",
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
                color: "rgba(255,255,255,0.85)",
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
                color: "rgba(255,255,255,0.85)",
                lineHeight: 2,
              }}
            >
              <div>Phone: (031) 123 4567</div>
              <div>Email: info@ptsurya.co.id</div>
            </div>
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
          <div>
            <h4
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.85)",
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
                        ? "1px solid rgba(255,255,255,0.1)"
                        : "none",
                  }}
                >
                  <a
                    href="#"
                    style={{
                      fontSize: "0.82rem",
                      color: "rgba(255,255,255,0.85)",
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
                      e.currentTarget.style.color = "rgba(255,255,255,0.85)";
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
        </div>
        <hr className="fp-divider" />
        <div className="fp-bottom">
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
        {/* Page Header */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(10,62,124,0.97) 0%, rgba(14,14,14,0.95) 100%)",
            padding: "3.5rem clamp(1.25rem, 4vw, 2.5rem) 3rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative circle */}
          <div
            style={{
              position: "absolute",
              right: "-80px",
              top: "-80px",
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.06)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "-20px",
              top: "-120px",
              width: "480px",
              height: "480px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.04)",
              pointerEvents: "none",
            }}
          />

          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                marginBottom: "0.6rem",
              }}
            >
              PT Surya Tripta Rekayasa
            </p>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.1,
                marginBottom: "0.75rem",
              }}
            >
              Profil Manajemen
            </h1>
            <p
              style={{
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.55)",
                maxWidth: "520px",
                lineHeight: 1.7,
              }}
            >
              Dipimpin oleh para profesional berpengalaman yang berkomitmen
              membangun PT STR menjadi perusahaan konstruksi terkemuka di
              Indonesia.
            </p>
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "3rem clamp(1.25rem, 4vw, 2.5rem) 4rem",
          }}
        >
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
