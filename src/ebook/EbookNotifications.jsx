import { useEffect, useState } from 'react';

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

function getNextIndex(current) {
    if (notifications.length <= 1) return 0;
    let next = current;
    while (next === current) next = Math.floor(Math.random() * notifications.length);
    return next;
}

export default function EbookNotifications() {
    const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * notifications.length));
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let hideTimeout;
        let nextTimeout;
        let current = currentIndex;

        const runCycle = () => {
            setIsVisible(true);
            const visibleFor = 4200 + Math.floor(Math.random() * 2400);
            const nextDelay = 9000 + Math.floor(Math.random() * 10000);

            hideTimeout = window.setTimeout(() => {
                setIsVisible(false);
                nextTimeout = window.setTimeout(() => {
                    current = getNextIndex(current);
                    setCurrentIndex(current);
                    runCycle();
                }, nextDelay);
            }, visibleFor);
        };

        nextTimeout = window.setTimeout(runCycle, 2500);

        return () => {
            window.clearTimeout(hideTimeout);
            window.clearTimeout(nextTimeout);
        };
    }, []);

    const item = notifications[currentIndex];

    return (
        <aside aria-live="polite" className={`purchase-toast ${isVisible ? 'is-visible' : ''}`}>
            <div className="purchase-toast__icon" aria-hidden="true">
                <span dangerouslySetInnerHTML={{ __html: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>` }} />
            </div>
            <div className="purchase-toast__content">
                <div className="purchase-toast__eyebrow">
                    <span className="purchase-toast__badge">Nova compra</span>
                    <span className="purchase-toast__region">eBook</span>
                </div>
                <p className="purchase-toast__title">
                    <strong>{item.name}</strong> de {item.city}, {item.state}
                </p>
                <p className="purchase-toast__text">acabou de garantir o eBook.</p>
            </div>
        </aside>
    );
}
