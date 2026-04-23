import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const notifications = [
    { name: 'Marcos', city: 'Campinas', state: 'SP' },
    { name: 'Patricia', city: 'Recife', state: 'PE' },
    { name: 'Andre', city: 'Goiania', state: 'GO' },
    { name: 'Leandro', city: 'Curitiba', state: 'PR' },
    { name: 'Bruna', city: 'Manaus', state: 'AM' },
    { name: 'Felipe', city: 'Belo Horizonte', state: 'MG' },
    { name: 'Camila', city: 'Fortaleza', state: 'CE' },
    { name: 'Joao', city: 'Cuiaba', state: 'MT' },
    { name: 'Rafael', city: 'Porto Alegre', state: 'RS' },
    { name: 'Vanessa', city: 'Belem', state: 'PA' },
    { name: 'Gustavo', city: 'Santos', state: 'SP' },
    { name: 'Aline', city: 'Salvador', state: 'BA' },
    { name: 'Diego', city: 'Campo Grande', state: 'MS' },
    { name: 'Mateus', city: 'Joinville', state: 'SC' },
    { name: 'Erica', city: 'Palmas', state: 'TO' },
    { name: 'Tiago', city: 'Ribeirao Preto', state: 'SP' },
    { name: 'Luciana', city: 'Natal', state: 'RN' },
    { name: 'Caio', city: 'Brasilia', state: 'DF' },
    { name: 'Renata', city: 'Londrina', state: 'PR' },
    { name: 'Wesley', city: 'Rio Branco', state: 'AC' },
    { name: 'Douglas', city: 'Sao Jose dos Campos', state: 'SP' },
    { name: 'Juliana', city: 'Maceio', state: 'AL' },
    { name: 'Robson', city: 'Anapolis', state: 'GO' },
    { name: 'Fernanda', city: 'Florianopolis', state: 'SC' },
    { name: 'Igor', city: 'Macapa', state: 'AP' },
    { name: 'Henrique', city: 'Rio de Janeiro', state: 'RJ' },
    { name: 'Tatiane', city: 'Aracaju', state: 'SE' },
    { name: 'Vinicius', city: 'Dourados', state: 'MS' },
    { name: 'Samuel', city: 'Caxias do Sul', state: 'RS' },
    { name: 'Nayara', city: 'Porto Velho', state: 'RO' },
];

const avatarColors = [
    ['#FF6B00', '#FF8C42'],
    ['#7C3AED', '#A78BFA'],
    ['#059669', '#34D399'],
    ['#2563EB', '#60A5FA'],
    ['#DC2626', '#F87171'],
    ['#D97706', '#FCD34D'],
];

function getNextIndex(current) {
    if (notifications.length <= 1) return 0;
    let next = current;
    while (next === current) next = Math.floor(Math.random() * notifications.length);
    return next;
}

export default function EbookNotifications() {
    const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * notifications.length));
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(100);

    const VISIBLE_MS = 5000;

    useEffect(() => {
        let hideTimeout, nextTimeout, progressInterval;
        let current = currentIndex;

        const runCycle = () => {
            setProgress(100);
            setIsVisible(true);

            const start = Date.now();
            progressInterval = window.setInterval(() => {
                const elapsed = Date.now() - start;
                setProgress(Math.max(0, 100 - (elapsed / VISIBLE_MS) * 100));
            }, 50);

            const nextDelay = 18000 + Math.floor(Math.random() * 12000);

            hideTimeout = window.setTimeout(() => {
                clearInterval(progressInterval);
                setIsVisible(false);
                nextTimeout = window.setTimeout(() => {
                    current = getNextIndex(current);
                    setCurrentIndex(current);
                    runCycle();
                }, nextDelay);
            }, VISIBLE_MS);
        };

        nextTimeout = window.setTimeout(runCycle, 10000);

        return () => {
            clearTimeout(hideTimeout);
            clearTimeout(nextTimeout);
            clearInterval(progressInterval);
        };
    }, []);

    const item = notifications[currentIndex];
    const initial = item.name[0].toUpperCase();
    const colorIndex = item.name.charCodeAt(0) % avatarColors.length;
    const [from, to] = avatarColors[colorIndex];

    const toast = (
        <aside aria-live="polite" className={`purchase-toast ${isVisible ? 'is-visible' : ''}`}>
            {/* Top accent line */}
            <div className="purchase-toast__accent" />

            <div className="purchase-toast__body">
                {/* Avatar */}
                <div
                    className="purchase-toast__avatar"
                    style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
                    aria-hidden="true"
                >
                    {initial}
                    <span className="purchase-toast__live-dot" />
                </div>

                {/* Content */}
                <div className="purchase-toast__content">
                    <p className="purchase-toast__label">Nova compra</p>
                    <p className="purchase-toast__name">
                        <strong>{item.name}</strong>
                        <span className="purchase-toast__location"> · {item.city}, {item.state}</span>
                    </p>
                    <p className="purchase-toast__sub">acabou de garantir o eBook Flash64 ✓</p>
                </div>
            </div>

            {/* Progress bar */}
            <div className="purchase-toast__progress-track">
                <div className="purchase-toast__progress-bar" style={{ width: `${progress}%` }} />
            </div>
        </aside>
    );

    return createPortal(toast, document.body);
}
