import { useState, useEffect } from "react";

function Highlight() {
  const highlights = [
    {
      image: "/assets/highlight1.jpg",
      title: "Surya Tripta untuk Indonesia",
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

  // Scroll detection (simple version)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 400) {
        setActiveIndex(1);
      } else {
        setActiveIndex(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const current = highlights[activeIndex];

  return (
    <div className="bg-gray-100 px-4 md:px-12 pt-15 pb-15">
      <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden bg-gray-200">
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          {/* LEFT IMAGE */}
          <div className="relative h-75 md:h-125">
            <img
              src={current.image}
              className="w-full h-full object-cover transition-all duration-700"
            />

            {/* GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-gray-200"></div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="p-6 md:p-12 flex flex-col gap-6">
            {/* TITLE */}
            <div>
              <h1 className="text-2xl md:text-4xl font-bold mb-3">
                {current.title}
              </h1>

              <p className="text-gray-600 text-sm md:text-base max-w-md">
                {current.desc}
              </p>
            </div>

            {/* SELECTOR LIST */}
            <div className="relative mt-6">
              {/* Vertical line */}
              <div className="absolute left-2 top-0 h-full w-0.5 bg-gray-300"></div>

              {highlights.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className="cursor-pointer pl-6 mb-6 relative"
                >
                  {/* Active red line */}
                  {activeIndex === index && (
                    <div className="absolute left-2 top-0 h-full w-0.5 bg-red-500 transition-all duration-300"></div>
                  )}

                  <h2
                    className={`font-semibold text-lg md:text-xl ${
                      activeIndex === index ? "text-red-500" : "text-gray-400"
                    }`}
                  >
                    {item.activeTitle}
                  </h2>

                  <p
                    className={`text-sm mt-1 max-w-md ${
                      activeIndex === index ? "text-gray-700" : "text-gray-400"
                    }`}
                  >
                    {item.activeDesc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Highlight;
