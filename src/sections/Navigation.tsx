import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Perfil", href: "#perfil" },
  { label: "Cotizar", href: "#cotizar" },
  { label: "Proceso", href: "#proceso" },
  { label: "Software", href: "#software" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(11,15,23,0.92)] backdrop-blur-xl border-b border-[#1E2D3D]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-[1280px] mx-auto px-6 lg:px-[6vw] h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2 group">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              className="text-[#1793D1]"
            >
              <path
                d="M11 2C9.5 5 7 8.5 7 12c0 2.5 1.5 4.5 4 6.5C13.5 16.5 15 14.5 15 12c0-3.5-2.5-7-4-10z"
                fill="currentColor"
              />
              <path
                d="M8.5 12.5c.3 1.2 1.2 2.8 2.5 4.5 1.3-1.7 2.2-3.3 2.5-4.5H8.5z"
                fill="#0B0F17"
              />
            </svg>
            <span className="font-mono font-semibold text-base tracking-tight">
              <span className="text-[#E2E8F0]">Bit</span>
              <span className="text-[#1793D1]">Criollo</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-mono text-sm text-[#94A3B8] hover:text-[#E2E8F0] transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#1793D1] transition-all duration-200 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="https://wa.me/5356418463?text=Hola%20BitCriollo%2C%20tengo%20un%20problema%20con%20mi%20equipo"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-2 bg-[#1793D1] text-[#0B0F17] font-semibold text-sm px-5 py-2.5 rounded-md hover:brightness-110 hover:-translate-y-0.5 hover:shadow-glow transition-all duration-200"
          >
            Escríbeme
          </a>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[#1793D1] border border-[#1E2D3D] rounded-md"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[999] lg:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
        <aside
          className={`absolute right-0 top-0 bottom-0 w-[280px] bg-[#121820] border-l border-[#1E2D3D] p-6 pt-20 transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block font-mono text-base text-[#94A3B8] hover:text-[#E2E8F0] py-2 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="https://wa.me/5356418463?text=Hola%20BitCriollo%2C%20tengo%20un%20problema%20con%20mi%20equipo"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block text-center bg-[#1793D1] text-[#0B0F17] font-semibold text-sm px-5 py-3 rounded-md"
          >
            Escríbeme por WhatsApp
          </a>
        </aside>
      </div>
    </>
  );
}
