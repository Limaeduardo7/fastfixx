const WHATSAPP_URL =
  'https://wa.me/5554991006375?text=Olá! Gostaria de saber mais sobre o eBook Dominando a Flash64.';

export default function EbookFooter() {
  return (
    <>
      {/* Section divider above footer */}
      <div className="section-divider" />

      <footer className="py-16 px-6 lg:px-20 bg-gradient-to-b from-[#07090D] to-[#050709]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Column 1 - Brand */}
            <div className="space-y-4">
              <img loading="lazy" decoding="async"
                src="/images/Logo-Horizontal---Branco-e-Azul.png"
                alt="FastFix Academy"
                className="h-10"
              />
              <p className="text-gray-500 text-sm">
                Formando <span className="text-primary">especialistas</span> em reparo de placas.
              </p>
            </div>

            {/* Column 2 - Links */}
            <div>
              <h4 className="text-white font-bold mb-4">Navegação</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#hero"
                    className="text-gray-400 text-sm hover:text-cyan-400 transition-colors"
                  >
                    Início
                  </a>
                </li>
                <li>
                  <a
                    href="#topics"
                    className="text-gray-400 text-sm hover:text-violet-400 transition-colors"
                  >
                    Conteúdo
                  </a>
                </li>
                <li>
                  <a
                    href="#offer"
                    className="text-gray-400 text-sm hover:text-primary transition-colors"
                  >
                    Oferta
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 - Contact */}
            <div>
              <h4 className="text-white font-bold mb-4">Contato</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 text-sm hover:text-emerald-400 transition-colors inline-flex items-center gap-2"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-400 text-sm hover:text-primary transition-colors"
                  >
                    Site principal
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Decorative colored dots */}
          <div className="flex items-center justify-center gap-3 mt-12 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="w-2 h-2 rounded-full bg-violet-500" />
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-xs">
              &copy; 2026 Fastfix Academy. Todos os direitos reservados.
            </p>
            <a
              href="https://merakigroup.site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 text-xs hover:text-primary transition-colors"
            >
              Feito por <span className="text-gradient-multi">Meraki Group</span>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
