import { useState, useRef } from "react";

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
    <div className="flex-none w-72 md:w-80 group">
      {/* Card with unique shape using clip-path / border-radius trick */}
      <div
        className="relative overflow-hidden bg-white shadow-md transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1"
        style={{
          borderRadius: isEven
            ? "1.5rem 1.5rem 1.5rem 0"
            : "1.5rem 1.5rem 0 1.5rem",
        }}
      >
        {/* Image area */}
        <div className="relative h-44 bg-gray-200 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
        </div>

        {/* Date + See more row */}
        <div className="flex items-center justify-between px-4 pt-3 pb-1">
          <span className="text-xs text-gray-400 font-medium tracking-wide">
            {project.date}
          </span>
          <button
            className="text-xs font-semibold bg-gray-900 text-white px-3 py-1.5 rounded-full 
                       hover:bg-red-600 transition-colors duration-300 cursor-pointer whitespace-nowrap"
          >
            See more
          </button>
        </div>

        {/* Text content */}
        <div className="px-4 pt-1 pb-5">
          <h3 className="font-bold text-gray-900 text-base leading-snug mb-1.5 group-hover:text-red-600 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
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
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
    setTimeout(updateScrollState, 350);
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
    setTimeout(updateScrollState, 350);
  };

  return (
    <section className="bg-gray-100 px-4 md:px-12 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          {/* ── LEFT INTRO CARD ── */}
          <div
            className="flex-none w-full md:w-72 bg-gray-200 flex flex-col justify-between p-8"
            style={{
              borderRadius: "1.5rem 1.5rem 0 1.5rem",
              minHeight: "420px",
            }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-5">
                Pekerjaan
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Tumbuhkan Bisnis dan Konten Anda melalui Layanan, Platform, dan
                Konektivitas Digital Saham.
              </p>
            </div>

            {/* Bottom: link + arrows */}
            <div className="flex items-end justify-between mt-8">
              <a
                href="#"
                className="text-sm font-semibold text-gray-700 hover:text-red-600 transition-colors duration-300 underline underline-offset-4"
              >
                Baca Selengkapnya
              </a>

              {/* Navigation arrows */}
              <div className="flex gap-2">
                <button
                  onClick={scrollLeft}
                  disabled={!canScrollLeft}
                  className={`w-11 h-11 rounded-xl border-2 flex items-center justify-center font-bold text-lg
                    transition-all duration-300 cursor-pointer
                    ${
                      canScrollLeft
                        ? "border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
                        : "border-gray-300 text-gray-300 cursor-not-allowed"
                    }`}
                  aria-label="Scroll kiri"
                >
                  ‹
                </button>
                <button
                  onClick={scrollRight}
                  disabled={!canScrollRight}
                  className={`w-11 h-11 rounded-xl border-2 flex items-center justify-center font-bold text-lg
                    transition-all duration-300 cursor-pointer
                    ${
                      canScrollRight
                        ? "border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
                        : "border-gray-300 text-gray-300 cursor-not-allowed"
                    }`}
                  aria-label="Scroll kanan"
                >
                  ›
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT SCROLLABLE PROJECT LIST ── */}
          <div className="flex-1 min-w-0 overflow-hidden relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-6 bg-linear-to-r from-gray-100 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-10 bg-linear-to-l from-gray-100 to-transparent z-10 pointer-events-none" />

            <div
              ref={scrollRef}
              onScroll={updateScrollState}
              className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {/* Hide webkit scrollbar via inline style trick */}
              <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
              `}</style>

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

export default Listproyek;
