import { useState } from "react";

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

  const current = histories[yearIndex];

  const nextImage = () => {
    setImageIndex((prev) =>
      prev === current.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setImageIndex((prev) =>
      prev === 0 ? current.images.length - 1 : prev - 1,
    );
  };

  const changeYear = (index) => {
    setYearIndex(index);
    setImageIndex(0);
  };

  return (
    <div className="bg-gray-100 px-4 md:px-12 py-12">
      <div className="max-w-7xl mx-auto">
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div className="flex flex-col justify-center gap-6">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              {current.title}
            </h1>

            <p className="text-gray-600 max-w-md leading-relaxed">
              {current.desc}
            </p>

            {/* PROJECT CARD */}
            <div className="rounded-3xl p-6 bg-linear-to-r from-gray-500 via-gray-300 to-gray-100 text-black">
              <h2 className="font-bold text-xl mb-2">{current.project}</h2>
              <p className="text-sm leading-relaxed text-black">
                {current.projectDesc}
              </p>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={prevImage}
                  className="border px-4 py-2 rounded-xl bg-white/20 hover:bg-white/40"
                >
                  {"<"}
                </button>
                <button
                  onClick={nextImage}
                  className="border px-4 py-2 rounded-xl bg-white/20 hover:bg-white/40"
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-4">
            <div className="rounded-3xl overflow-hidden w-full">
              <img
                src={current.images[imageIndex]}
                className="w-full h-55 md:h-70 lg:h-80 object-cover transition-all duration-500"
              />
            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-3 justify-end items-end">
              {current.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setImageIndex(i)}
                  className={`object-cover rounded-xl cursor-pointer transition-all duration-300 ${
                    imageIndex === i ? "w-16 h-16 opacity-70" : "w-20 h-20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* TIMELINE */}
        <div className="mt-16">
          <div className="relative flex justify-between items-center">
            {/* LINE */}
            <div className="absolute top-1/5 left-0 w-full h-0.5 bg-black transform -translate-y-1/2"></div>

            {["Start", "2024", "2025", "2026", "Next"].map((label, index) => {
              const active = index - 1 === yearIndex;

              return (
                <div
                  key={index}
                  onClick={() => {
                    if (index === 1) changeYear(0);
                    if (index === 2) changeYear(1);
                  }}
                  className="flex flex-col items-center relative z-10 cursor-pointer"
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${
                      active
                        ? "border-red-500 bg-white"
                        : "bg-black border-black"
                    }`}
                  ></div>

                  <span className="mt-3 text-sm">{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
