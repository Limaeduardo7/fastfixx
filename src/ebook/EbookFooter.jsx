const WHATSAPP_URL =
  'https://wa.me/5554981673607?text=Olá! Gostaria de saber mais sobre o eBook Dominando a Flash64.';

export default function EbookFooter() {
  return (
    <footer className="py-16 px-6 lg:px-20 bg-[#07090D] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Column 1 - Brand */}
          <div className="space-y-4">
            <img
              src="/images/Logo-Horizontal---Branco-e-Azul.png"
              alt="FastFix Academy"
              className="h-10"
            />
            <p className="text-gray-500 text-sm">
              Formando especialistas em reparo de placas.
            </p>
          </div>

          {/* Column 2 - Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Links Úteis</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 text-sm hover:text-white transition-colors"
                >
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 text-sm hover:text-white transition-colors"
                >
                  Termos de Uso
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 text-sm hover:text-white transition-colors"
                >
                  Suporte
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
                  className="text-gray-400 text-sm hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-400 text-sm hover:text-white transition-colors"
                >
                  Site principal
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-xs">
            &copy; 2026 Fastfix Academy. Todos os direitos reservados.
          </p>
          <a
            href="https://merakigroup.site"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 text-xs hover:text-primary transition-colors"
          >
            Feito por Meraki Group
          </a>
        </div>
      </div>
    </footer>
  );
}
