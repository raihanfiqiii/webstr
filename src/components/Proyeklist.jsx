import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --red:     #D0292A;
      --blue:    #1156A8;
      --blue-dk: #0A3E7C;
      --blue-lt: #1A6EC8;
      --black:   #0E0E0E;
      --gray-0:  #F4F4F2;
      --gray-1:  #E8E8E5;
      --gray-2:  #D2D2CE;
      --gray-3:  #9A9A96;
      --gray-4:  #5A5A56;
      --white:   #FFFFFF;
    }
    html { scroll-behavior: smooth; }
    body {
      background: var(--gray-0);
      font-family: 'DM Sans', sans-serif;
      color: var(--black);
      -webkit-font-smoothing: antialiased;
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.45; transform: scale(0.7); }
    }
    .pl-anim-up   { animation: slideUp 0.55s cubic-bezier(.22,.68,0,1.2) both; }
    .pl-anim-fade { animation: fadeIn  0.4s ease both; }

    /* Filter select */
    .filter-select {
      appearance: none;
      background: var(--white);
      border: 1.5px solid var(--gray-2);
      border-radius: 10px;
      padding: 0.6rem 2.5rem 0.6rem 1rem;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.82rem;
      color: var(--black);
      cursor: pointer;
      transition: border-color 0.2s, box-shadow 0.2s;
      width: 100%;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239A9A96' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 1rem center;
    }
    .filter-select:focus {
      outline: none;
      border-color: var(--blue);
      box-shadow: 0 0 0 3px rgba(17,86,168,0.12);
    }
    .filter-select:hover { border-color: var(--gray-3); }

    /* Project card */
    .pl-card {
      cursor: pointer;
      border-radius: 1.25rem;
      overflow: hidden;
      position: relative;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      transition: transform 0.38s cubic-bezier(.22,.68,0,1.2), box-shadow 0.35s;
      background: #111;
    }
    .pl-card:hover {
      transform: translateY(-6px) scale(1.01);
      box-shadow: 0 16px 44px rgba(0,0,0,0.2);
    }
    .pl-card:hover .pl-card-img { transform: scale(1.06); }
    .pl-card-img {
      width: 100%; height: 100%;
      object-fit: cover; display: block;
      transition: transform 0.65s cubic-bezier(.22,.68,0,1.1);
      opacity: 0.88;
    }

    /* Empty state */
    .pl-empty {
      grid-column: 1 / -1;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      padding: 5rem 2rem;
      color: var(--gray-3); text-align: center;
    }

    /* Responsive grid */
    .pl-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.1rem;
    }
    @media (max-width: 1100px) { .pl-grid { grid-template-columns: repeat(3, 1fr); } }
    @media (max-width: 767px) {
      .pl-grid { grid-template-columns: repeat(2, 1fr); gap: 0.9rem; }
      .filter-row { flex-direction: column !important; }
      .filter-item { width: 100% !important; max-width: 100% !important; }
      .pl-nav-desktop { display: none !important; }
      .pl-hero-title { font-size: clamp(2rem,8vw,3rem) !important; }
      .filter-actions { margin-left: 0 !important; width: 100%; justify-content: space-between; }
    }
    @media (max-width: 480px) { .pl-grid { grid-template-columns: 1fr 1fr; gap: 0.75rem; } }
  `}</style>
);

/* ─────────────────────────────────────────────
   ALL PROJECTS DATA — 10 proyek
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
   NAVBAR
───────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

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
        padding: "0 clamp(1.25rem,4vw,2.5rem)",
        height: "68px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(10,62,124,0.95)",
        //background: scrolled ? "rgba(10,62,124,0.95)" : "rgba(10,62,124,0.75)",
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
        className="pl-nav-desktop"
        style={{
          display: "flex",
          gap: "clamp(1rem,2.5vw,2rem)",
          alignItems: "center",
        }}
      >
        {["Beranda", "Profile", "Proyek", "Tentang"].map((l) => (
          <span
            key={l}
            onClick={() => {
              if (l === "Beranda") navigate("/");
              if (l === "Profile") navigate("/profile");
              if (l === "Proyek") navigate("/proyek");
            }}
            style={{
              fontSize: "0.78rem",
              fontWeight: 500,
              color: l === "Proyek" ? "#fff" : "rgba(255,255,255,0.7)",
              letterSpacing: "0.06em",
              cursor: "pointer",
              transition: "color 0.2s",
              textDecoration: l === "Proyek" ? "underline" : "none",
              textUnderlineOffset: "3px",
            }}
            onMouseEnter={(e) => (e.target.style.color = "var(--black)")}
            onMouseLeave={(e) =>
              (e.target.style.color =
                l === "Proyek" ? "#fff" : "rgba(255,255,255,0.7)")
            }
          >
            {l}
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
    <footer
      style={{
        background: /*"rgba(10, 62, 124, 0.95)"*/ "var(--black)",
        color: "#fff",
        padding: "0",
      }}
    >
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
            display: grid; grid-template-columns: 1fr; gap: 2.5rem;
          }
          @media (min-width: 768px) {
            .footer-grid { grid-template-columns: 1.2fr 1fr 1.1fr; gap: 3rem; }
          }
          .footer-divider { border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 2.5rem 0 1.5rem; }
          .footer-bottom { display: flex; flex-direction: column; gap: 0.75rem; align-items: flex-start; }
          @media (min-width: 768px) {
            .footer-bottom { flex-direction: row; justify-content: space-between; align-items: center; }
          }
        `}</style>

        <div className="footer-grid">
          {/* COL 1 */}
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
              <div>Fax: (031) 765 4321</div>
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

          {/* COL 2 */}
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

          {/* COL 3 */}
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
   STATUS BADGE
───────────────────────────────────────────── */
function StatusBadge({ status }) {
  const isActive = status === "Proyek Berlangsung";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        background: "rgba(255,255,255,0.18)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.3)",
        borderRadius: "999px",
        padding: "0.22rem 0.75rem",
        fontSize: "0.64rem",
        fontWeight: 600,
        color: "#fff",
        letterSpacing: "0.03em",
      }}
    >
      <span
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: isActive ? "#60C8FF" : "#4AE8A0",
          display: "inline-block",
          animation: isActive ? "pulse 1.8s ease-in-out infinite" : "none",
        }}
      />
      {status}
    </span>
  );
}

/* ─────────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────────── */
function ProjectCard({ project, animDelay = 0 }) {
  const navigate = useNavigate();
  return (
    <div
      className="pl-card pl-anim-up"
      style={{ animationDelay: `${animDelay}s`, aspectRatio: "3 / 4" }}
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
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "absolute", top: "0.85rem", left: "0.85rem" }}>
        <StatusBadge status={project.status} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "1rem 1rem 1.1rem",
        }}
      >
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "#fff",
            fontSize: "clamp(0.95rem,1.8vw,1.2rem)",
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: "0.4rem",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontSize: "0.6rem",
            color: "rgba(255,255,255,0.6)",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {project.category}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FILTER BAR
───────────────────────────────────────────── */
function FilterBar({ filters, setFilters, total, filtered }) {
  const filterOptions = {
    kategori: ["Semua", "Konstruksi", "Investasi"],
    jenis: ["Semua", "Jalan & Jembatan", "Rest Area", "Infrastruktur Lainnya"],
    status: ["Semua", "Proyek Berlangsung", "Proyek Selesai"],
  };
  const labels = {
    kategori: "Kategori Proyek",
    jenis: "Jenis Proyek",
    status: "Status Proyek",
  };

  return (
    <div
      style={{
        background: "var(--white)",
        borderBottom: "1px solid var(--gray-1)",
        padding: "1.25rem clamp(1.25rem,5vw,3rem)",
        position: "sticky",
        top: "68px",
        zIndex: 90,
        boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          className="filter-row"
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "flex-end",
            flexWrap: "wrap",
          }}
        >
          {Object.keys(filterOptions).map((key) => (
            <div
              key={key}
              className="filter-item"
              style={{ flex: "1", minWidth: "160px", maxWidth: "240px" }}
            >
              <label
                style={{
                  display: "block",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  color: "var(--gray-4)",
                  letterSpacing: "0.06em",
                  marginBottom: "0.4rem",
                  textTransform: "uppercase",
                }}
              >
                {labels[key]}
              </label>
              <select
                className="filter-select"
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

          <div
            className="filter-actions"
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "1rem",
              marginLeft: "auto",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: "0.78rem",
                color: "var(--gray-3)",
                whiteSpace: "nowrap",
                paddingBottom: "0.45rem",
              }}
            >
              <strong style={{ color: "var(--blue)" }}>{filtered}</strong> /{" "}
              {total} proyek
            </span>
            {(filters.kategori || filters.jenis || filters.status) && (
              <button
                onClick={() =>
                  setFilters({ kategori: "", jenis: "", status: "" })
                }
                style={{
                  background: "transparent",
                  border: "1.5px solid var(--gray-2)",
                  borderRadius: "999px",
                  padding: "0.5rem 1rem",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "var(--gray-4)",
                  cursor: "pointer",
                  transition: "all 0.22s",
                  whiteSpace: "nowrap",
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
                ✕ Reset Filter
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO HEADER
───────────────────────────────────────────── */
function HeroHeader() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        background:
          "linear-gradient(160deg, rgba(10,62,124,0.97) 0%, rgba(14,14,14,0.95) 100%)",
        padding: "7.5rem clamp(1.25rem, 5vw, 3rem) 3.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {[
        { t: "-100px", r: "-100px", s: "400px", o: "0.07" },
        { t: "30px", r: "80px", s: "200px", o: "0.05" },
        { t: "60%", r: "-60px", s: "260px", o: "0.04" },
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

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Breadcrumb */}
        <div
          className="pl-anim-fade"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.5)",
            marginBottom: "1.5rem",
          }}
        >
          <span
            onClick={() => navigate("/")}
            style={{ cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.target.style.color = "#fff")}
            onMouseLeave={(e) =>
              (e.target.style.color = "rgba(255,255,255,0.5)")
            }
          >
            Beranda
          </span>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "rgba(255,255,255,0.85)" }}>Proyek</span>
        </div>

        <p
          className="pl-anim-up"
          style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: "0.72rem",
            fontWeight: 500,
            letterSpacing: "0.12em",
            marginBottom: "0.75rem",
            textTransform: "uppercase",
            animationDelay: "0.05s",
          }}
        >
          PT Surya Tripta Rekayasa
        </p>
        <h1
          className="pl-hero-title pl-anim-up"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "#fff",
            fontSize: "clamp(2.4rem,5vw,4rem)",
            fontWeight: 700,
            lineHeight: 1.08,
            maxWidth: "640px",
            animationDelay: "0.12s",
          }}
        >
          Portofolio Proyek Kami
        </h1>
        <p
          className="pl-anim-up"
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "clamp(0.82rem,1.5vw,0.95rem)",
            lineHeight: 1.75,
            maxWidth: "500px",
            marginTop: "1rem",
            animationDelay: "0.22s",
          }}
        >
          Kumpulan proyek konstruksi dan infrastruktur yang telah dan sedang
          kami kerjakan untuk Indonesia.
        </p>

        <div
          className="pl-anim-up"
          style={{
            display: "flex",
            gap: "clamp(1.5rem,4vw,3rem)",
            marginTop: "2.5rem",
            flexWrap: "wrap",
            animationDelay: "0.3s",
          }}
        >
          {[
            { num: "10+", label: "Total Proyek" },
            { num: "5", label: "Proyek Aktif" },
            { num: "Rp 15T+", label: "Nilai Proyek" },
          ].map((s) => (
            <div key={s.label}>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#fff",
                  fontSize: "clamp(1.6rem,3vw,2.4rem)",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {s.num}
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.72rem",
                  marginTop: "0.3rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE EXPORT
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
      <GlobalStyle />
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
            padding: "2.5rem clamp(1.25rem,5vw,3rem) 5rem",
            maxWidth: "1280px",
            margin: "0 auto",
          }}
        >
          {filtered.length === 0 ? (
            <div className="pl-empty">
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "var(--gray-1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.8rem",
                  marginBottom: "1.25rem",
                }}
              >
                🔍
              </div>
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--gray-4)",
                  marginBottom: "0.5rem",
                }}
              >
                Tidak ada proyek ditemukan
              </p>
              <p style={{ fontSize: "0.82rem", color: "var(--gray-3)" }}>
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
