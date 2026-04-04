import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.45; transform: scale(0.7); }
    }
    .anim-slide-up { animation: slideUp  0.65s cubic-bezier(.22,.68,0,1.2) both; }
    .anim-fade-in  { animation: fadeIn   0.5s ease both; }
    .anim-scale-in { animation: scaleIn  0.7s cubic-bezier(.22,.68,0,1.1) both; }
    .d1 { animation-delay: 0.05s; }
    .d2 { animation-delay: 0.15s; }
    .d3 { animation-delay: 0.26s; }
    .d4 { animation-delay: 0.38s; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
    .data-row:hover { background: rgba(17,86,168,0.04) !important; }
    .rel-card { transition: transform 0.38s cubic-bezier(.22,.68,0,1.2), box-shadow 0.35s; }
    .rel-card:hover { transform: translateY(-8px) scale(1.01); box-shadow: 0 20px 48px rgba(0,0,0,0.22); }

    /* Responsive */
    @media (max-width: 767px) {
      .related-grid   { grid-template-columns: 1fr !important; gap: 1.2rem !important; }
      .hero-title-row { flex-direction: column !important; gap: 1rem !important; }
      .pd-nav-desktop { display: none !important; }
    }
    @media (min-width: 480px) and (max-width: 767px) {
      .related-grid { grid-template-columns: repeat(2, 1fr) !important; }
    }
  `}</style>
);

/* ─────────────────────────────────────────────
   ALL PROJECTS DATA — 10 proyek
───────────────────────────────────────────── */
const allProjects = [
  {
    id: 1,
    slug: "rest-area-betjam-1a",
    status: "Proyek Berlangsung",
    category: "KONSTRUKSI · REST AREA",
    title: "Rest Area Betjam 1A",
    shortDesc:
      "Pembangunan fasilitas rest area modern dengan konsep hijau dan berkelanjutan di jalur tol Betjam segmen A, dirancang untuk melayani pengguna jalan tol dengan standar internasional.",
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
    category: "KONSTRUKSI · REST AREA",
    title: "Rest Area Betjam 1B",
    shortDesc:
      "Pengembangan kawasan rest area terpadu dengan fasilitas UMKM lokal dan area parkir berkapasitas besar di segmen B jalur tol Betung–Jambi.",
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
    category: "KONSTRUKSI · JALAN & JEMBATAN",
    title: "Jembatan Layang Suramadu",
    shortDesc:
      "Proyek peningkatan struktur jembatan layang dengan teknologi terkini untuk meningkatkan kapasitas lalu lintas dan keamanan pengguna jalan di kawasan Suramadu.",
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
    category: "INVESTASI · GEDUNG",
    title: "Gedung Perkantoran Delta",
    shortDesc:
      "Konstruksi gedung perkantoran 12 lantai dengan desain ramah lingkungan dan sistem energi surya terintegrasi di kawasan bisnis Sidoarjo.",
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
    category: "KONSTRUKSI · PELABUHAN",
    title: "Pelabuhan Kalimas Timur",
    shortDesc:
      "Revitalisasi fasilitas pelabuhan untuk mendukung peningkatan kapasitas bongkar muat peti kemas nasional di Pelabuhan Kalimas, Surabaya.",
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
    category: "INVESTASI · GEDUNG",
    title: "Rusunawa Benowo",
    shortDesc:
      "Pembangunan rumah susun sederhana sewa bagi masyarakat berpenghasilan rendah dengan fasilitas lengkap di kawasan Benowo, Surabaya.",
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
    category: "KONSTRUKSI · DRAINASE",
    title: "Sistem Drainase Kota Malang",
    shortDesc:
      "Peningkatan jaringan drainase perkotaan untuk mengatasi banjir dan genangan air di pusat kota Malang dengan sistem terintegrasi berbasis teknologi sensor.",
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
    category: "KONSTRUKSI · TRANSPORTASI",
    title: "Terminal Bus Terpadu Madura",
    shortDesc:
      "Pembangunan terminal bus modern berkonsep transit hub dengan integrasi moda transportasi umum di Pulau Madura untuk meningkatkan konektivitas antar wilayah.",
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
    category: "KONSTRUKSI · AIR BERSIH",
    title: "SPAM Regional Pasuruan",
    shortDesc:
      "Pengembangan sistem penyediaan air minum regional untuk melayani kebutuhan air bersih masyarakat Pasuruan Raya dengan jaringan distribusi modern.",
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
    category: "KONSTRUKSI · JALAN TOL",
    title: "Tol Akses Pelabuhan Tanjung Perak",
    shortDesc:
      "Konstruksi jalan tol akses khusus pelabuhan untuk memperlancar arus distribusi logistik nasional dan mengurangi kepadatan di jalan arteri sekitar Tanjung Perak.",
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
   NAVBAR  ✅ warna diperbaiki, logo navigable
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
        // ✅ Tidak transparan di atas hero biru — pakai semi-opaque agar teks tetap terbaca
        background: scrolled ? "rgba(10,62,124,0.95)" : "rgba(10,62,124,0.75)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
        transition: "background 0.4s",
      }}
    >
      {/* ✅ Logo navigable ke home */}
      <span
        onClick={() => navigate("/")}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.35rem",
          fontWeight: 700,
          letterSpacing: "0.04em",
          color: "#fff", // ✅ putih karena background biru
          cursor: "pointer",
        }}
      >
        PT STR
      </span>

      <nav
        className="pd-nav-desktop"
        style={{
          display: "flex",
          gap: "clamp(1rem,2.5vw,2rem)",
          alignItems: "center",
        }}
      >
        {["Beranda", "Tentang", "Proyek", "Kontak"].map((l) => (
          <span
            key={l}
            onClick={() => {
              if (l === "Beranda") navigate("/");
              if (l === "Proyek") navigate("/proyek"); // ✅ navigasi ke list proyek
            }}
            style={{
              fontSize: "0.78rem",
              fontWeight: 500,
              // ✅ warna putih karena header di atas background biru
              color: l === "Proyek" ? "#fff" : "rgba(255,255,255,0.7)",
              letterSpacing: "0.06em",
              cursor: "pointer",
              transition: "color 0.2s",
              textDecoration: l === "Proyek" ? "underline" : "none",
              textUnderlineOffset: "3px",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#fff")}
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
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  return (
    <footer
      style={{
        background: "var(--black)",
        color: "rgba(255,255,255,0.55)",
        padding: "3rem clamp(1.25rem,4vw,2.5rem) 2rem",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "2rem",
            paddingBottom: "2.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "0.75rem",
              }}
            >
              PT STR
            </p>
            <p
              style={{
                fontSize: "0.78rem",
                lineHeight: 1.75,
                maxWidth: "220px",
              }}
            >
              PT Surya Tripta Rekayasa — membangun Indonesia dengan kualitas dan
              integritas.
            </p>
          </div>
          {[
            {
              title: "Layanan",
              items: [
                "Konstruksi",
                "Desain Arsitektur",
                "Konsultasi Teknis",
                "Manajemen Proyek",
              ],
            },
            {
              title: "Perusahaan",
              items: ["Tentang Kami", "Sejarah", "Tim Kami", "Karir"],
            },
            {
              title: "Kontak",
              items: [
                "Surabaya, Jawa Timur",
                "+62 31 xxx xxxx",
                "info@ptstr.co.id",
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <p
                style={{
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "0.78rem",
                  marginBottom: "0.9rem",
                  letterSpacing: "0.06em",
                }}
              >
                {col.title.toUpperCase()}
              </p>
              {col.items.map((item) => (
                <p
                  key={item}
                  style={{
                    fontSize: "0.78rem",
                    marginBottom: "0.5rem",
                    lineHeight: 1.6,
                  }}
                >
                  {item}
                </p>
              ))}
            </div>
          ))}
        </div>
        <p
          style={{
            marginTop: "1.5rem",
            fontSize: "0.72rem",
            textAlign: "center",
            letterSpacing: "0.04em",
          }}
        >
          © {new Date().getFullYear()} PT Surya Tripta Rekayasa. All rights
          reserved.
        </p>
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
        gap: "0.4rem",
        background: isActive ? "rgba(17,86,168,0.12)" : "rgba(16,153,96,0.12)",
        color: isActive ? "var(--blue)" : "#109960",
        border: `1px solid ${isActive ? "rgba(17,86,168,0.25)" : "rgba(16,153,96,0.25)"}`,
        borderRadius: "999px",
        padding: "0.3rem 0.9rem",
        fontSize: "0.72rem",
        fontWeight: 600,
        letterSpacing: "0.04em",
      }}
    >
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: isActive ? "var(--blue)" : "#109960",
          animation: isActive ? "pulse 1.8s ease-in-out infinite" : "none",
          display: "inline-block",
        }}
      />
      {status}
    </span>
  );
}

/* ─────────────────────────────────────────────
   HERO SLIDER  ✅ breadcrumb dengan link /proyek
───────────────────────────────────────────── */
function HeroSlider({ project }) {
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const images = project.images;

  useEffect(() => {
    setIdx(0);
    setAnimKey((k) => k + 1);
  }, [project.slug]);

  const go = (dir) => {
    setIdx((p) => (p + dir + images.length) % images.length);
    setAnimKey((k) => k + 1);
  };

  // ✅ Breadcrumb: Beranda › Proyek › Nama Proyek
  const breadcrumbs = [
    { label: "Beranda", action: () => navigate("/") },
    { label: "Proyek", action: () => navigate("/proyek") },
    { label: project.title, action: null },
  ];

  return (
    <div style={{ background: "var(--blue)", position: "relative" }}>
      <div
        style={{
          background:
            "linear-gradient(160deg, var(--blue-dk) 0%, var(--blue) 100%)",
          padding: "7rem clamp(1.25rem,5vw,3rem) 3rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {[
          { top: "-80px", right: "-80px", size: "340px", opacity: "0.08" },
          { top: "20px", right: "60px", size: "180px", opacity: "0.06" },
        ].map((c, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: c.top,
              right: c.right,
              width: c.size,
              height: c.size,
              borderRadius: "50%",
              border: `1px solid rgba(255,255,255,${c.opacity})`,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* ✅ Breadcrumb dengan 3 level */}
        <div
          className="anim-fade-in"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.55)",
            marginBottom: "1.25rem",
            flexWrap: "wrap",
          }}
        >
          {breadcrumbs.map((crumb, i) => (
            <span
              key={i}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <span
                onClick={crumb.action || undefined}
                style={{
                  color:
                    i < breadcrumbs.length - 1
                      ? "rgba(255,255,255,0.55)"
                      : "rgba(255,255,255,0.9)",
                  cursor: crumb.action ? "pointer" : "default",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (crumb.action) e.target.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  if (crumb.action)
                    e.target.style.color = "rgba(255,255,255,0.55)";
                }}
              >
                {crumb.label}
              </span>
              {i < breadcrumbs.length - 1 && (
                <span style={{ opacity: 0.4 }}>›</span>
              )}
            </span>
          ))}
        </div>

        {/* Title + badge */}
        <div
          className="hero-title-row"
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <p
              className="anim-slide-up d1"
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: "0.72rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                marginBottom: "0.6rem",
                textTransform: "uppercase",
              }}
            >
              {project.category}
            </p>
            <h1
              className="anim-slide-up d2"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "#fff",
                fontSize: "clamp(1.8rem,4.5vw,3.2rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                maxWidth: "680px",
              }}
            >
              {project.title}
            </h1>
          </div>
          <div className="anim-slide-up d2" style={{ paddingTop: "0.5rem" }}>
            <StatusBadge status={project.status} />
          </div>
        </div>
      </div>

      {/* Image slider */}
      <div
        style={{
          position: "relative",
          height: "clamp(240px,42vw,520px)",
          overflow: "hidden",
          background: "#000",
        }}
      >
        <img
          key={animKey}
          src={images[idx]}
          alt={project.title}
          className="anim-scale-in"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            opacity: 0.88,
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
              "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />

        {images.length > 1 &&
          [
            { dir: -1, side: "left" },
            { dir: 1, side: "right" },
          ].map(({ dir, side }) => (
            <button
              key={side}
              onClick={() => go(dir)}
              style={{
                position: "absolute",
                [side]: "clamp(0.75rem,2vw,1.5rem)",
                top: "50%",
                transform: "translateY(-50%)",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff",
                fontSize: "1.2rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.25s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.38)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.2)")
              }
            >
              {dir === -1 ? "‹" : "›"}
            </button>
          ))}

        {images.length > 1 && (
          <div
            style={{
              position: "absolute",
              bottom: "1.25rem",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "0.5rem",
            }}
          >
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIdx(i);
                  setAnimKey((k) => k + 1);
                }}
                style={{
                  width: i === idx ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "999px",
                  background: i === idx ? "#fff" : "rgba(255,255,255,0.4)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.35s cubic-bezier(.22,.68,0,1.2)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DETAIL CONTENT
───────────────────────────────────────────── */
function DetailContent({ project }) {
  return (
    <section
      style={{
        background: "var(--white)",
        padding: "clamp(2rem,5vw,4rem) clamp(1.25rem,5vw,3rem)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <p
          className="anim-slide-up"
          style={{
            fontSize: "clamp(0.875rem,1.8vw,1rem)",
            color: "var(--gray-4)",
            lineHeight: 1.8,
            maxWidth: "720px",
            marginBottom: "3rem",
            fontStyle: "italic",
          }}
        >
          {project.shortDesc}
        </p>

        <div className="anim-slide-up d1">
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.6rem,3vw,2.2rem)",
              fontWeight: 700,
              marginBottom: "1.5rem",
              color: "var(--black)",
            }}
          >
            Data Proyek
          </h2>

          <div
            style={{
              borderRadius: "1rem",
              overflow: "hidden",
              border: "1px solid var(--gray-1)",
              boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.5fr",
                background: "var(--blue)",
                padding: "0.9rem 1.5rem",
              }}
            >
              {["URAIAN", "KETERANGAN"].map((h) => (
                <span
                  key={h}
                  style={{
                    color: "#fff",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                  }}
                >
                  {h}
                </span>
              ))}
            </div>

            {project.data.map((row, i) => (
              <div
                key={i}
                className="data-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1.5fr",
                  padding: "0.9rem 1.5rem",
                  borderBottom:
                    i < project.data.length - 1
                      ? "1px solid var(--gray-1)"
                      : "none",
                  transition: "background 0.2s",
                  background:
                    i % 2 === 0 ? "var(--white)" : "rgba(244,244,242,0.6)",
                }}
              >
                <span
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--gray-4)",
                    fontWeight: 400,
                  }}
                >
                  {row.label}
                </span>
                <span
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--black)",
                    fontWeight: 500,
                  }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   RELATED PROJECTS
───────────────────────────────────────────── */
function RelatedProjects({ currentSlug }) {
  const navigate = useNavigate();
  const related = allProjects.filter((p) => p.slug !== currentSlug).slice(0, 3);

  const handleSelect = (slug) => {
    navigate(`/proyek/${slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const statusColor = (status) =>
    status === "Proyek Selesai" ? "#4AE8A0" : "#60C8FF";

  return (
    <section
      style={{
        background:
          "linear-gradient(160deg, var(--blue-dk) 0%, var(--blue) 100%)",
        padding: "clamp(3rem,6vw,5rem) clamp(1.25rem,5vw,3rem)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            marginBottom: "2.5rem",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255,255,255,0.2)",
            }}
          />
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#fff",
              fontSize: "clamp(1.4rem,3vw,2rem)",
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            Proyek Lainnya
          </h2>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255,255,255,0.2)",
            }}
          />
        </div>

        <div
          className="related-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
        >
          {related.map((project) => (
            <div
              key={project.id}
              className="rel-card"
              onClick={() => handleSelect(project.slug)}
              style={{
                borderRadius: "1.25rem",
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
                boxShadow: "0 8px 28px rgba(0,0,0,0.18)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "clamp(160px,22vw,240px)",
                }}
              >
                <img
                  src={project.images[0]}
                  alt={project.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.6s ease",
                  }}
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
                      "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Status badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "0.9rem",
                    left: "0.9rem",
                    background: "rgba(255,255,255,0.18)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    borderRadius: "999px",
                    padding: "0.25rem 0.8rem",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    color: "#fff",
                    letterSpacing: "0.04em",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                  }}
                >
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: statusColor(project.status),
                      display: "inline-block",
                    }}
                  />
                  {project.status}
                </div>

                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "1rem 1.1rem 1.1rem",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color: "#fff",
                      fontSize: "clamp(1rem,2vw,1.25rem)",
                      fontWeight: 700,
                      lineHeight: 1.2,
                      marginBottom: "0.35rem",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.65rem",
                      color: "rgba(255,255,255,0.65)",
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {project.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Tombol lihat semua proyek */}
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <button
            onClick={() => navigate("/proyek")}
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
              borderRadius: "999px",
              padding: "0.7rem 2rem",
              fontSize: "0.82rem",
              fontWeight: 500,
              cursor: "pointer",
              letterSpacing: "0.05em",
              transition: "background 0.25s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.22)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.12)")
            }
          >
            Lihat Semua Proyek →
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ROOT — useParams()
───────────────────────────────────────────── */
export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const project = allProjects.find((p) => p.slug === slug);

  useEffect(() => {
    if (!project) navigate("/", { replace: true });
  }, [project, navigate]);

  if (!project) return null;

  return (
    <>
      <GlobalStyle />
      <Navbar />
      <main style={{ paddingTop: "0" }}>
        <HeroSlider project={project} />
        <DetailContent project={project} />
        <RelatedProjects currentSlug={slug} />
      </main>
      <Footer />
    </>
  );
}
