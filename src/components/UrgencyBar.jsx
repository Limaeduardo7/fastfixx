import { useState, useEffect } from 'react';
import { Reveal } from './ScrollReveal';
import { Icon, scrollToOffer } from './shared';

export default function UrgencyBar() {
    const [minutes, setMinutes] = useState('15');
    const [seconds, setSeconds] = useState('00');
    const [barClass, setBarClass] = useState('');

    useEffect(() => {
        const STORAGE_KEY = 'fastfix_timer_end';
        const DURATION_MS = 15 * 60 * 1000;

        let endTime = localStorage.getItem(STORAGE_KEY);
        if (!endTime || Number(endTime) < Date.now()) {
            endTime = Date.now() + DURATION_MS;
            localStorage.setItem(STORAGE_KEY, endTime);
        } else {
            endTime = Number(endTime);
        }

        const tick = () => {
            const remaining = endTime - Date.now();
            if (remaining <= 0) {
                setMinutes('00');
                setSeconds('00');
                setBarClass('timer-expired');
                return;
            }
            const mins = Math.floor(remaining / 60000);
            const secs = Math.floor((remaining % 60000) / 1000);
            setMinutes(String(mins).padStart(2, '0'));
            setSeconds(String(secs).padStart(2, '0'));
            if (mins < 2) setBarClass('timer-critical');
            requestAnimationFrame(() => setTimeout(tick, 250));
        };

        tick();
    }, []);

    return (
        <div id="urgency-bar" className={`fixed top-0 left-0 right-0 z-[999] bg-gradient-to-r from-red-700 via-red-600 to-orange-600 text-white py-2.5 px-4 text-center shadow-lg ${barClass}`}>
            <div className="flex items-center justify-center gap-3 text-sm sm:text-base font-bold tracking-wide">
                <Icon name="alertTriangle" />
                <span>🔥 OFERTA EXPIRA EM:</span>
                <div id="countdown-timer" className="flex items-center gap-1 font-mono text-lg sm:text-xl">
                    <span className="bg-white/20 px-2 py-0.5 rounded font-extrabold">{minutes}</span>
                    <span className="animate-pulse">:</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded font-extrabold">{seconds}</span>
                </div>
                <button
                    type="button"
                    onClick={scrollToOffer}
                    className="ml-2 bg-white text-red-700 font-extrabold px-4 py-1 rounded-full text-xs hover:scale-105 transition-transform cursor-pointer"
                >
                    GARANTIR AGORA
                </button>
            </div>
        </div>
    );
}
