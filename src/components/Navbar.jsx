import { useState, useEffect } from 'react';
import { scrollToOffer } from './shared';
import { trackEvent } from '../lib/metaTracking';

export default function Navbar() {
    const [visible, setVisible] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setVisible(window.scrollY > 600);
            if (window.scrollY <= 600) setMenuOpen(false);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleCTA = () => {
        setMenuOpen(false);
        trackEvent('InitiateCheckout', { currency: 'BRL', value: 497, placement: 'navbar' });
        scrollToOffer();
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[998] transition-all duration-300 ${
                visible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
            style={{ background: 'rgba(11, 14, 20, 0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
            {/* Main bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
                <span className="text-lg font-extrabold text-white">
                    Fast<span className="text-primary">Fix</span>
                    <span className="text-[10px] text-gray-400 ml-1.5 uppercase tracking-widest font-semibold hidden sm:inline">Academy</span>
                </span>

                {/* Desktop links */}
                <div className="hidden sm:flex items-center gap-6 text-sm">
                    <a href="#steps" className="text-gray-400 hover:text-white transition-colors">Módulos</a>
                    <a href="#pricing-anchor" className="text-gray-400 hover:text-white transition-colors">Preço</a>
                    <button
                        type="button"
                        onClick={handleCTA}
                        className="bg-primary hover:bg-primary-hover text-white font-bold px-4 py-1.5 rounded-lg transition-all cursor-pointer text-sm"
                    >
                        Garantir vaga
                    </button>
                </div>

                {/* Mobile: CTA + hamburger */}
                <div className="flex sm:hidden items-center gap-2">
                    <button
                        type="button"
                        onClick={handleCTA}
                        className="bg-primary hover:bg-primary-hover text-white font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer text-xs"
                    >
                        Garantir vaga
                    </button>
                    <button
                        type="button"
                        onClick={() => setMenuOpen(o => !o)}
                        className="p-1.5 text-white rounded-md hover:bg-white/10 transition-colors cursor-pointer"
                        aria-label="Menu"
                    >
                        {menuOpen ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile dropdown */}
            {menuOpen && (
                <div className="sm:hidden border-t border-white/10 px-4 py-4 flex flex-col gap-4" style={{ background: 'rgba(11, 14, 20, 0.97)' }}>
                    <a
                        href="#steps"
                        onClick={() => setMenuOpen(false)}
                        className="text-gray-300 hover:text-white transition-colors text-sm font-semibold"
                    >
                        Módulos
                    </a>
                    <a
                        href="#pricing-anchor"
                        onClick={() => setMenuOpen(false)}
                        className="text-gray-300 hover:text-white transition-colors text-sm font-semibold"
                    >
                        Preço
                    </a>
                </div>
            )}
        </nav>
    );
}
