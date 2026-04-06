import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   ALL PROJECTS DATA
───────────────────────────────────────────── */
export const allProjects = [
  {
    id: 1,
    slug: "rest-area-betjam-1a",
    status: "Proyek Berlangsung",
    kategori: "Konstruksi",
    jenis: "Rest Area",
    category: "KONSTRUKSI · REST AREA",
    title: "Rest Area Betjam 1A",
    date: "04 Desember 2024",
    shortDesc:
      "Pembangunan fasilitas rest area modern dengan konsep hijau dan berkelanjutan di jalur tol Betjam segmen A.",
    images: ["/assets/gp1.jpg", "/assets/kapal1.jpg"],
    data: [
      { label: "Jenis Proyek", value: "Jalan & Jembatan" },
      { label: "Status Proyek", value: "Proyek Berlangsung" },
      { label: "Panjang Main Road", value: "14,69 Km" },
      { label: "Masa Pengerjaan", value: "2024 – Sekarang" },
      { label: "Nilai Proyek", value: "Rp. 2,18 Triliun" },
      { label: "Lokasi", value: "Sumatera Selatan" },
      { label: "Pemberi Tugas", value: "PT Hutama Karya (Persero)" },
      { label: "Konsultan", value: "PT Virama Karya" },
    ],
  },
  {
    id: 2,
    slug: "rest-area-betjam-1b",
    status: "Proyek Selesai",
    kategori: "Konstruksi",
    jenis: "Rest Area",
    category: "KONSTRUKSI · REST AREA",
    title: "Rest Area Betjam 1B",
    date: "04 Desember 2024",
    shortDesc:
      "Pengembangan kawasan rest area terpadu dengan fasilitas UMKM lokal dan area parkir berkapasitas besar.",
    images: ["/assets/gp2.jpg", "/assets/kapal2.jpg"],
    data: [
      { label: "Jenis Proyek", value: "Jalan & Jembatan" },
      { label: "Status Proyek", value: "Proyek Selesai" },
      { label: "Luas Area", value: "8,4 Ha" },
      { label: "Masa Pengerjaan", value: "2022 – 2024" },
      { label: "Nilai Proyek", value: "Rp. 1,74 Triliun" },
      { label: "Lokasi", value: "Sumatera Selatan" },
      { label: "Pemberi Tugas", value: "PT Hutama Karya (Persero)" },
      { label: "Kapasitas Parkir", value: "450 Kendaraan" },
    ],
  },
  {
    id: 3,
    slug: "jembatan-layang-suramadu",
    status: "Proyek Berlangsung",
    kategori: "Konstruksi",
    jenis: "Jalan & Jembatan",
    category: "KONSTRUKSI · JALAN & JEMBATAN",
    title: "Jembatan Layang Suramadu",
    date: "15 Januari 2025",
    shortDesc:
      "Proyek peningkatan struktur jembatan layang dengan teknologi terkini untuk meningkatkan kapasitas lalu lintas.",
    images: ["/assets/gp3.jpg", "/assets/kapal3.jpg"],
    data: [
      { label: "Jenis Proyek", value: "Jembatan" },
      { label: "Status Proyek", value: "Proyek Berlangsung" },
      { label: "Panjang Span", value: "5,4 Km" },
      { label: "Lebar Jembatan", value: "2 × 15 Meter" },
      { label: "Masa Pengerjaan", value: "2025 – Sekarang" },
      { label: "Nilai Proyek", value: "Rp. 3,50 Triliun" },
      { label: "Lokasi", value: "Jawa Timur" },
      { label: "Pemberi Tugas", value: "Kementerian PUPR" },
    ],
  },
  {
    id: 4,
    slug: "gedung-perkantoran-delta",
    status: "Proyek Berlangsung",
    kategori: "Investasi",
    jenis: "Infrastruktur Lainnya",
    category: "INVESTASI · GEDUNG",
    title: "Gedung Perkantoran Delta",
    date: "22 Februari 2025",
    shortDesc:
      "Konstruksi gedung perkantoran 12 lantai dengan desain ramah lingkungan dan sistem energi surya terintegrasi.",
    images: ["/assets/gp4.jpg", "/assets/highlight1.jpg"],
    data: [
      { label: "Jenis Proyek", value: "Gedung & Bangunan" },
      { label: "Status Proyek", value: "Proyek Berlangsung" },
      { label: "Jumlah Lantai", value: "12 Lantai" },
      { label: "Luas Bangunan", value: "24.600 m²" },
      { label: "Masa Pengerjaan", value: "2025 – Sekarang" },
      { label: "Nilai Proyek", value: "Rp. 890 Miliar" },
      { label: "Lokasi", value: "Sidoarjo, Jawa Timur" },
      { label: "Pemberi Tugas", value: "PT Delta Artha Bahari" },
    ],
  },
  {
    id: 5,
    slug: "pelabuhan-kalimas-timur",
    status: "Proyek Selesai",
    kategori: "Konstruksi",
    jenis: "Infrastruktur Lainnya",
    category: "KONSTRUKSI · PELABUHAN",
    title: "Pelabuhan Kalimas Timur",
    date: "10 Maret 2025",
    shortDesc:
      "Revitalisasi fasilitas pelabuhan untuk mendukung peningkatan kapasitas bongkar muat peti kemas nasional.",
    images: ["/assets/gp5.jpg", "/assets/highlight2.jpg"],
    data: [
      { label: "Jenis Proyek", value: "Pelabuhan" },
      { label: "Status Proyek", value: "Proyek Selesai" },
      { label: "Kapasitas", value: "50.000 TEUs/tahun" },
      { label: "Panjang Dermaga", value: "320 Meter" },
      { label: "Masa Pengerjaan", value: "2023 – 2025" },
      { label: "Nilai Proyek", value: "Rp. 1,12 Triliun" },
      { label: "Lokasi", value: "Surabaya, Jawa Timur" },
      { label: "Pemberi Tugas", value: "PT Pelindo III (Persero)" },
    ],
  },
  {
    id: 6,
    slug: "rusunawa-benowo",
    status: "Proyek Selesai",
    kategori: "Investasi",
    jenis: "Infrastruktur Lainnya",
    category: "INVESTASI · GEDUNG",
    title: "Rusunawa Benowo",
    date: "28 Maret 2025",
    shortDesc:
      "Pembangunan rumah susun sederhana sewa bagi masyarakat berpenghasilan rendah dengan fasilitas lengkap.",
    images: ["/assets/gp6.jpg", "/assets/history1.jpg"],
    data: [
      { label: "Jenis Proyek", value: "Gedung & Bangunan" },
      { label: "Status Proyek", value: "Proyek Selesai" },
      { label: "Jumlah Unit", value: "298 Unit" },
      { label: "Jumlah Tower", value: "3 Tower" },
      { label: "Masa Pengerjaan", value: "2023 – 2024" },
      { label: "Nilai Proyek", value: "Rp. 412 Miliar" },
      { label: "Lokasi", value: "Surabaya, Jawa Timur" },
      { label: "Pemberi Tugas", value: "Pemerintah Kota Surabaya" },
    ],
  },
  {
    id: 7,
    slug: "drainase-kota-malang",
    status: "Proyek Berlangsung",
    kategori: "Konstruksi",
    jenis: "Infrastruktur Lainnya",
    category: "KONSTRUKSI · DRAINASE",
    title: "Sistem Drainase Kota Malang",
    date: "05 April 2025",
    shortDesc:
      "Peningkatan jaringan drainase perkotaan untuk mengatasi banjir dan genangan air di pusat kota Malang.",
    images: ["/assets/gp7.jpg", "/assets/history2.jpg"],
    data: [
      { label: "Jenis Proyek", value: "Infrastruktur Air" },
      { label: "Status Proyek", value: "Proyek Berlangsung" },
      { label: "Panjang Saluran", value: "38,7 Km" },
      { label: "Kapasitas Tampung", value: "1.200 m³/detik" },
      { label: "Masa Pengerjaan", value: "2025 – Sekarang" },
      { label: "Nilai Proyek", value: "Rp. 675 Miliar" },
      { label: "Lokasi", value: "Malang, Jawa Timur" },
      { label: "Pemberi Tugas", value: "Pemerintah Kota Malang" },
    ],
  },
  {
    id: 8,
    slug: "terminal-bus-madura",
    status: "Proyek Berlangsung",
    kategori: "Konstruksi",
    jenis: "Infrastruktur Lainnya",
    category: "KONSTRUKSI · TRANSPORTASI",
    title: "Terminal Bus Terpadu Madura",
    date: "18 April 2025",
    shortDesc:
      "Pembangunan terminal bus modern berkonsep transit hub dengan integrasi moda transportasi umum.",
    images: ["/assets/gp8.jpg", "/assets/history3.jpg"],
    data: [
      { label: "Jenis Proyek", value: "Terminal & Transportasi" },
      { label: "Status Proyek", value: "Proyek Berlangsung" },
      { label: "Luas Lahan", value: "6,2 Ha" },
      { label: "Kapasitas Bus", value: "120 Bus/jam" },
      { label: "Masa Pengerjaan", value: "2024 – Sekarang" },
      { label: "Nilai Proyek", value: "Rp. 543 Miliar" },
      { label: "Lokasi", value: "Bangkalan, Madura" },
      { label: "Pemberi Tugas", value: "Kementerian Perhubungan" },
    ],
  },
  {
    id: 9,
    slug: "spam-regional-pasuruan",
    status: "Proyek Selesai",
    kategori: "Konstruksi",
    jenis: "Infrastruktur Lainnya",
    category: "KONSTRUKSI · AIR BERSIH",
    title: "SPAM Regional Pasuruan",
    date: "02 Mei 2025",
    shortDesc:
      "Pengembangan sistem penyediaan air minum regional untuk melayani kebutuhan masyarakat Pasuruan Raya.",
    images: ["/assets/gp9.jpg", "/assets/history4.jpg"],
    data: [
      { label: "Jenis Proyek", value: "Air Minum & Sanitasi" },
      { label: "Status Proyek", value: "Proyek Selesai" },
      { label: "Kapasitas Produksi", value: "800 Liter/detik" },
      { label: "Panjang Jaringan", value: "52 Km" },
      { label: "Masa Pengerjaan", value: "2022 – 2024" },
      { label: "Nilai Proyek", value: "Rp. 328 Miliar" },
      { label: "Lokasi", value: "Pasuruan, Jawa Timur" },
      { label: "Pemberi Tugas", value: "BPPW Jawa Timur" },
    ],
  },
  {
    id: 10,
    slug: "tol-akses-tanjung-perak",
    status: "Proyek Berlangsung",
    kategori: "Konstruksi",
    jenis: "Jalan & Jembatan",
    category: "KONSTRUKSI · JALAN TOL",
    title: "Tol Akses Pelabuhan Tanjung Perak",
    date: "20 Mei 2025",
    shortDesc:
      "Konstruksi jalan tol akses khusus pelabuhan untuk memperlancar arus distribusi logistik nasional.",
    images: ["/assets/gp10.jpg", "/assets/kapal1.jpg"],
    data: [
      { label: "Jenis Proyek", value: "Jalan Tol" },
      { label: "Status Proyek", value: "Proyek Berlangsung" },
      { label: "Panjang Tol", value: "9,07 Km" },
      { label: "Jumlah Lajur", value: "2 × 3 Lajur" },
      { label: "Masa Pengerjaan", value: "2024 – Sekarang" },
      { label: "Nilai Proyek", value: "Rp. 4,76 Triliun" },
      { label: "Lokasi", value: "Surabaya, Jawa Timur" },
      { label: "Pemberi Tugas", value: "PT Jasa Marga (Persero)" },
    ],
  },
];

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
//           className="pl-hide-mobile"
//         >
//           Surya Tripta Rekayasa
//         </span>
//       </div>

//       <nav
//         className="pl-nav-items"
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
//               color: label === "Proyek" ? "#fff" : "rgba(255,255,255,0.62)",
//               cursor: path ? "pointer" : "default",
//               transition: "color 0.2s",
//               borderBottom:
//                 label === "Proyek"
//                   ? "1.5px solid rgba(255,255,255,0.5)"
//                   : "none",
//               paddingBottom: "2px",
//             }}
//             onMouseEnter={(e) => {
//               if (path) e.currentTarget.style.color = "#fff";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.color =
//                 label === "Proyek" ? "#fff" : "rgba(255,255,255,0.62)";
//             }}
//           >
//             {label}
//           </span>
//         ))}
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
                color: label === "Proyek" ? "#fff" : "rgba(255,255,255,0.62)",
                cursor: "pointer",
                transition: "color 0.2s",
                paddingBottom: "2px",
                borderBottom:
                  label === "Proyek"
                    ? "1.5px solid rgba(255,255,255,0.5)"
                    : "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color =
                  label === "Proyek" ? "#fff" : "rgba(255,255,255,0.62)";
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
          .pl-footer-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
          @media (min-width: 768px) { .pl-footer-grid { grid-template-columns: 1.4fr 1fr 1.2fr; gap: 3.5rem; } }
          .pl-footer-divider { border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 2.5rem 0 1.75rem; }
          .pl-footer-bottom { display: flex; flex-direction: column; gap: 0.75rem; align-items: flex-start; }
          @media (min-width: 768px) { .pl-footer-bottom { flex-direction: row; justify-content: space-between; align-items: center; } }
        `}</style>

        {/* Brand strip */}
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

        <div className="pl-footer-grid">
          {/* COL 1 */}
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
                ["T", "(031) 123 4567"],
                ["F", "(031) 765 4321"],
                ["E", "info@ptsurya.co.id"],
              ].map(([k, v]) => (
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
          {/* COL 2 */}
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
          {/* COL 3 */}
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

        <hr className="pl-footer-divider" />
        <div className="pl-footer-bottom">
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
   STATUS BADGE — menggunakan visual language App.jsx
───────────────────────────────────────────── */
function StatusBadge({ status }) {
  const isActive = status === "Proyek Berlangsung";
  return (
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
          background: isActive ? "#60C8FF" : "#4AE8A0",
          display: "inline-block",
          animation: isActive ? "pl-pulse 1.8s ease-in-out infinite" : "none",
          flexShrink: 0,
        }}
      />
      {status}
    </span>
  );
}

/* ─────────────────────────────────────────────
   PROJECT CARD — mengadopsi card style App.jsx
───────────────────────────────────────────── */
function ProjectCard({ project, animDelay = 0 }) {
  const navigate = useNavigate();

  return (
    <div
      className="pl-card anim-slide-up"
      style={{
        animationDelay: `${animDelay}s`,
        aspectRatio: "3 / 4",
        cursor: "pointer",
      }}
      onClick={() => navigate(`/proyek/${project.slug}`)}
    >
      <img
        src={project.images[0]}
        alt={project.title}
        className="pl-card-img"
        style={{ position: "absolute", inset: 0 }}
        onError={(e) => {
          e.target.style.background = "var(--blue-dk)";
          e.target.style.display = "block";
        }}
      />
      {/* Multi-layer gradient — App.jsx style */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(8,12,18,0.88) 0%, rgba(8,12,18,0.2) 55%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
      {/* Blue stripe accent — App.jsx style */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "3px",
          height: "35%",
          background: "var(--blue-lt)",
          pointerEvents: "none",
        }}
      />
      {/* Status badge — top left */}
      <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
        <StatusBadge status={project.status} />
      </div>
      {/* Corner accent — App.jsx style */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "36px",
          height: "36px",
          borderTop: "2px solid rgba(255,255,255,0.15)",
          borderLeft: "2px solid rgba(255,255,255,0.15)",
          pointerEvents: "none",
        }}
      />
      {/* Content bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "1.25rem 1.1rem 1.25rem",
        }}
      >
        <p
          style={{
            fontSize: "0.58rem",
            color: "rgba(255,255,255,0.45)",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "0.4rem",
          }}
        >
          {project.category}
        </p>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "#fff",
            fontSize: "clamp(0.95rem,1.8vw,1.2rem)",
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: "0.5rem",
          }}
        >
          {project.title}
        </h3>
        {/* "Detail" button — App.jsx style */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "0.6rem",
            fontWeight: 600,
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Lihat Detail <span style={{ opacity: 0.7 }}>→</span>
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FILTER BAR — menggunakan App.jsx design language
───────────────────────────────────────────── */
function FilterBar({ filters, setFilters, total, filtered }) {
  const filterOptions = {
    kategori: ["Semua", "Konstruksi", "Investasi"],
    jenis: ["Semua", "Jalan & Jembatan", "Rest Area", "Infrastruktur Lainnya"],
    status: ["Semua", "Proyek Berlangsung", "Proyek Selesai"],
  };
  const labels = {
    kategori: "Kategori",
    jenis: "Jenis Proyek",
    status: "Status",
  };
  const hasFilter = filters.kategori || filters.jenis || filters.status;

  return (
    <div
      style={{
        background: "var(--white)",
        borderBottom: "1px solid var(--gray-1)",
        padding: "1.1rem clamp(1.25rem,5vw,3rem)",
        position: "sticky",
        top: "68px",
        zIndex: 90,
        boxShadow: "0 2px 24px rgba(8,12,18,0.06)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          className="pl-filter-row"
          style={{
            display: "flex",
            gap: "0.85rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Section label style prefix */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              flexShrink: 0,
              paddingRight: "0.85rem",
              borderRight: "1px solid var(--gray-2)",
            }}
            className="pl-filter-label-col"
          >
            <span
              style={{
                display: "inline-block",
                width: "18px",
                height: "1.5px",
                background: "var(--blue)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "0.62rem",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--blue)",
                whiteSpace: "nowrap",
              }}
            >
              Filter
            </span>
          </div>

          {/* Selects */}
          {Object.keys(filterOptions).map((key) => (
            <div
              key={key}
              className="pl-filter-item"
              style={{ flex: "1", minWidth: "140px", maxWidth: "220px" }}
            >
              <label
                style={{
                  display: "block",
                  fontSize: "0.58rem",
                  fontWeight: 600,
                  color: "var(--gray-3)",
                  letterSpacing: "0.1em",
                  marginBottom: "0.3rem",
                  textTransform: "uppercase",
                }}
              >
                {labels[key]}
              </label>
              <select
                className="pl-filter-select"
                value={filters[key]}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, [key]: e.target.value }))
                }
              >
                {filterOptions[key].map((opt) => (
                  <option key={opt} value={opt === "Semua" ? "" : opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* Right side: count + reset */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginLeft: "auto",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--gray-3)",
                whiteSpace: "nowrap",
              }}
            >
              <strong
                style={{
                  color: "var(--blue)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {filtered}
              </strong>
              <span style={{ opacity: 0.6 }}> / {total} proyek</span>
            </span>
            {hasFilter && (
              <button
                onClick={() =>
                  setFilters({ kategori: "", jenis: "", status: "" })
                }
                style={{
                  background: "transparent",
                  border: "1.5px solid var(--gray-2)",
                  borderRadius: "3px",
                  padding: "0.4rem 0.85rem",
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  color: "var(--gray-4)",
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  transition: "border-color 0.2s, color 0.2s",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--red)";
                  e.currentTarget.style.color = "var(--red)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--gray-2)";
                  e.currentTarget.style.color = "var(--gray-4)";
                }}
              >
                <span>✕</span> Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO HEADER — mengadopsi pattern Hero App.jsx
───────────────────────────────────────────── */
function HeroHeader() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, rgba(10,62,124,0.97) 0%, rgba(8,12,18,0.96) 100%)",
        padding: "calc(68px + 4rem) clamp(1.25rem,5vw,3rem) 3.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Blue stripe accent kiri — App.jsx style */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "3px",
          height: "100%",
          background: "linear-gradient(to bottom, var(--blue-lt), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Decorative circles */}
      {[
        { t: "-100px", r: "-100px", s: "400px", o: "0.05" },
        { t: "30px", r: "80px", s: "200px", o: "0.04" },
        { t: "60%", r: "-60px", s: "260px", o: "0.03" },
      ].map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: c.t,
            right: c.r,
            width: c.s,
            height: c.s,
            borderRadius: "50%",
            border: `1px solid rgba(255,255,255,${c.o})`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Corner bracket accent */}
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
        {/* Breadcrumb */}
        <div
          className="anim-fade-in"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.72rem",
            color: "rgba(255,255,255,0.4)",
            marginBottom: "1.5rem",
            letterSpacing: "0.06em",
          }}
        >
          <span
            onClick={() => navigate("/")}
            style={{ cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.target.style.color = "#fff")}
            onMouseLeave={(e) =>
              (e.target.style.color = "rgba(255,255,255,0.4)")
            }
          >
            Beranda
          </span>
          <span style={{ opacity: 0.35 }}>›</span>
          <span style={{ color: "rgba(255,255,255,0.75)" }}>Proyek</span>
        </div>

        {/* Section label — App.jsx pattern */}
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
          className="anim-slide-up d1"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "#fff",
            fontSize: "clamp(2.4rem,5vw,4rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            maxWidth: "640px",
            fontStyle: "italic",
            letterSpacing: "-0.01em",
            marginBottom: "0.85rem",
          }}
        >
          Portofolio Proyek Kami
        </h1>

        <p
          className="anim-slide-up d2"
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "clamp(0.82rem,1.5vw,0.92rem)",
            lineHeight: 1.8,
            maxWidth: "500px",
            fontWeight: 300,
          }}
        >
          Kumpulan proyek konstruksi dan infrastruktur yang telah dan sedang
          kami kerjakan untuk Indonesia.
        </p>

        {/* Stats bar mini — identik dengan App.jsx stats bar */}
        <div
          className="anim-slide-up d3"
          style={{
            display: "flex",
            gap: "clamp(1.5rem,4vw,3rem)",
            marginTop: "2.5rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            flexWrap: "wrap",
          }}
        >
          {[
            { num: "10+", label: "Total Proyek" },
            { num: "5", label: "Proyek Aktif" },
            { num: "Rp 15T+", label: "Nilai Proyek" },
            { num: "4", label: "Provinsi" },
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
                  color: "#fff",
                  fontSize: "clamp(1.6rem,3vw,2.2rem)",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {s.num}
              </span>
              <span
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "0.62rem",
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
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function ProyekList() {
  const [filters, setFilters] = useState({
    kategori: "",
    jenis: "",
    status: "",
  });
  const [animKey, setAnimKey] = useState(0);
  const prevFilters = useRef(filters);

  useEffect(() => {
    if (JSON.stringify(prevFilters.current) !== JSON.stringify(filters)) {
      setAnimKey((k) => k + 1);
      prevFilters.current = filters;
    }
  }, [filters]);

  const filtered = allProjects.filter((p) => {
    if (filters.kategori && p.kategori !== filters.kategori) return false;
    if (filters.jenis && p.jenis !== filters.jenis) return false;
    if (filters.status && p.status !== filters.status) return false;
    return true;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --blue:    #1156A8;
          --blue-dk: #0A3E7C;
          --blue-lt: #1A6EC8;
          --blue-xs: #E8F0FA;
          --red:     #C8251F;
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
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes pl-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.65); }
        }
        .anim-slide-up  { animation: slideUp  0.7s cubic-bezier(.22,.68,0,1.2) both; }
        .anim-fade-in   { animation: fadeIn   0.55s ease both; }
        .anim-scale-in  { animation: scaleIn  0.75s cubic-bezier(.22,.68,0,1.1) both; }
        .d1 { animation-delay: 0.06s; }
        .d2 { animation-delay: 0.14s; }
        .d3 { animation-delay: 0.24s; }
        .d4 { animation-delay: 0.36s; }

        /* Project card */
        .pl-card {
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 4px 24px rgba(8,12,18,0.12);
          transition: transform 0.38s cubic-bezier(.22,.68,0,1.2), box-shadow 0.35s;
          background: var(--black);
        }
        .pl-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 52px rgba(8,12,18,0.2);
        }
        .pl-card:hover .pl-card-img { transform: scale(1.06); }
        .pl-card-img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform 0.65s cubic-bezier(.22,.68,0,1.1);
          opacity: 0.88;
        }

        /* Filter select — App.jsx ghost button style */
        .pl-filter-select {
          appearance: none;
          background: var(--white);
          border: 1.5px solid var(--gray-2);
          border-radius: 4px;
          padding: 0.48rem 2.2rem 0.48rem 0.9rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          color: var(--black);
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7' viewBox='0 0 10 7'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%239A9A96' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.85rem center;
        }
        .pl-filter-select:focus {
          outline: none;
          border-color: var(--blue);
          box-shadow: 0 0 0 3px rgba(17,86,168,0.1);
        }
        .pl-filter-select:hover { border-color: var(--gray-3); }

        /* Responsive grid */
        .pl-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.1rem;
        }
        @media (max-width: 1100px) { .pl-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 767px)  {
          .pl-grid { grid-template-columns: repeat(2, 1fr); gap: 0.85rem; }
          .pl-filter-row { flex-direction: column !important; }
          .pl-filter-item { width: 100% !important; max-width: 100% !important; }
          .pl-nav-items { display: none !important; }
          .pl-hide-mobile { display: none !important; }
          .pl-filter-label-col { display: none !important; }
        }
        @media (max-width: 480px) { .pl-grid { grid-template-columns: 1fr 1fr; gap: 0.75rem; } }

        /* Empty state */
        .pl-empty {
          grid-column: 1 / -1;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 6rem 2rem;
          color: var(--gray-3); text-align: center;
        }
      `}</style>

      <Navbar />
      <main>
        <HeroHeader />
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          total={allProjects.length}
          filtered={filtered.length}
        />

        <section
          style={{
            padding: "3rem clamp(1.25rem,5vw,3rem) 6rem",
            maxWidth: "1280px",
            margin: "0 auto",
          }}
        >
          {/* Section label above grid */}
          <div style={{ marginBottom: "2rem" }}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--blue)",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "24px",
                  height: "1.5px",
                  background: "var(--blue)",
                }}
              />
              Portofolio
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="pl-empty">
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "8px",
                  background: "var(--gray-1)",
                  border: "1px solid var(--gray-2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.6rem",
                  marginBottom: "1.5rem",
                }}
              >
                🔍
              </div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "var(--black)",
                  marginBottom: "0.5rem",
                }}
              >
                Tidak ada proyek ditemukan
              </p>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "var(--gray-3)",
                  lineHeight: 1.7,
                }}
              >
                Coba ubah atau reset filter di atas
              </p>
            </div>
          ) : (
            <div key={animKey} className="pl-grid">
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  animDelay={Math.min(i * 0.06, 0.4)}
                />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
