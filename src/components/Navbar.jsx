import { useState, useEffect } from "react";

const Navbar = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full fixed top-0 left-0 z-50 flex justify-center transition-all duration-300 ${active ? "py-3" : "py-5"}`}
    >
      {/* Container */}
      <div className="w-[90%] max-w-6xl bg-white border border-gray-300 rounded-full px-6 py-3 flex items-center justify-between shadow-sm">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="logo"
            className="w-10 h-10 object-contain"
          />
          <span className="font-semibold text-sm text-gray-700">
            PT Surya Tripta Rekayasa
          </span>
        </div>

        {/* Menu */}
        <ul className="hidden md:flex items-center gap-10 text-gray-700 font-medium">
          <li className="cursor-pointer hover:text-blue-600">TENTANG STR</li>
          <li className="cursor-pointer hover:text-blue-600">REKAM JEJAK</li>
          <li className="cursor-pointer hover:text-blue-600">PEKERJAAN</li>
          <li className="cursor-pointer hover:text-blue-600">MEDIA CENTER</li>
        </ul>

        {/* Button */}
        <div>
          <button className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition">
            Kontak
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
