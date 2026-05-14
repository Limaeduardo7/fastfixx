import { useState, useEffect } from 'react';
import { scrollToOffer } from './shared';
import { trackEvent } from '../lib/metaTracking';

const navLinks = [
    { label: 'O Curso', href: '#steps' },
    { label: 'Instrutor', href: '#instructor' },
    { label: 'Bônus', href: '#bonus' },
    { label: 'Preço', href: '#pricing-anchor' },
];

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
        trackEvent('InitiateCheckout', { currency: 'BRL', value: 397, placement: 'navbar' });
        scrollToOffer();
    };

    const closeMenu = () => setMenuOpen(false);

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
                <a href="#hero" className="text-lg font-extrabold text-white">
                    Fast<span className="text-primary">Fix</span>
                    <span className="text-[10px] text-gray-400 ml-1.5 uppercase tracking-widest font-semibold hidden sm:inline">Academy</span>
                </a>

                {/* Desktop links */}
                <div className="hidden lg:flex items-center gap-5 text-sm">
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} className="text-gray-400 hover:text-white transition-colors">
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="/flash64"
                        className="flex items-center gap-1.5 text-orange-400 hover:text-orange-300 transition-colors font-semibold"
                    >
                        Flash64
                        <span className="text-[9px] bg-orange-500/20 text-orange-400 border border-orange-500/30 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wide">eBook</span>
                    </a>
                    <button
                        type="button"
                        onClick={handleCTA}
                        className="bg-primary hover:bg-primary-hover text-white font-bold px-4 py-1.5 rounded-lg transition-all cursor-pointer text-sm"
                    >
                        Comprar agora
                    </button>
                </div>

                {/* Mobile: CTA + hamburger */}
                <div className="flex lg:hidden items-center gap-2">
                    <button
                        type="button"
                        onClick={handleCTA}
                        className="bg-primary hover:bg-primary-hover text-white font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer text-xs"
                    >
                        Comprar agora
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
                <div className="lg:hidden border-t border-white/10 px-4 py-4 flex flex-col gap-1" style={{ background: 'rgba(11, 14, 20, 0.97)' }}>
                    {navLinks.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={closeMenu}
                            className="text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm font-semibold px-3 py-2.5 rounded-lg"
                        >
                            {link.label}
                        </a>
                    ))}
                    <div className="my-1 border-t border-white/10" />
                    <a
                        href="/flash64"
                        onClick={closeMenu}
                        className="flex items-center gap-2 text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 transition-colors text-sm font-bold px-3 py-2.5 rounded-lg"
                    >
                        Flash64 — eBook
                        <span className="text-[9px] bg-orange-500/20 border border-orange-500/30 px-1.5 py-0.5 rounded-full uppercase tracking-wide">novo</span>
                    </a>
                </div>
            )}
        </nav>
    );
}
