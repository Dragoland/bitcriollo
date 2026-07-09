const footerLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Perfil", href: "#perfil" },
  { label: "Cotizar", href: "#cotizar" },
  { label: "Proceso", href: "#proceso" },
  { label: "Software", href: "#software" },
  { label: "Contacto", href: "#contacto" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0B0F17] border-t border-[#1E2D3D]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[6vw] py-12">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <svg
            width="18"
            height="18"
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
          <span className="font-mono font-semibold text-sm">
            <span className="text-[#E2E8F0]">Bit</span>
            <span className="text-[#1793D1]">Criollo</span>
          </span>
        </div>

        {/* Tagline */}
        <p className="text-center text-sm text-[#64748B] font-mono mb-6">
          Hecho con {"</>"} y paciencia &middot; Falcon, Placetas, Villa Clara,
          Cuba
        </p>

        {/* Links */}
        <nav className="flex flex-wrap items-center justify-center gap-6 mb-8">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#94A3B8] hover:text-[#E2E8F0] transition-colors font-mono"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <a
            href="https://wa.me/5356418463"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#64748B] hover:text-[#1793D1] transition-colors"
            aria-label="WhatsApp"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </a>
          <a
            href="https://t.me/diario_del_informatico"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#64748B] hover:text-[#1793D1] transition-colors"
            aria-label="Telegram"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-[#64748B] font-mono opacity-60">
          &copy; 2026 BitCriollo. Software libre cuando se puede.
        </p>
      </div>
    </footer>
  );
}
