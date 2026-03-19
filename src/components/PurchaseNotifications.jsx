import { useEffect, useState } from 'react';
import { Icon } from './shared';

const notifications = [
    { name: 'Marcos', city: 'Campinas', state: 'SP', region: 'Sudeste' },
    { name: 'Patricia', city: 'Recife', state: 'PE', region: 'Nordeste' },
    { name: 'Andre', city: 'Goiania', state: 'GO', region: 'Centro-Oeste' },
    { name: 'Leandro', city: 'Curitiba', state: 'PR', region: 'Sul' },
    { name: 'Bruna', city: 'Manaus', state: 'AM', region: 'Norte' },
    { name: 'Felipe', city: 'Belo Horizonte', state: 'MG', region: 'Sudeste' },
    { name: 'Camila', city: 'Fortaleza', state: 'CE', region: 'Nordeste' },
    { name: 'Joao', city: 'Cuiaba', state: 'MT', region: 'Centro-Oeste' },
    { name: 'Rafael', city: 'Porto Alegre', state: 'RS', region: 'Sul' },
    { name: 'Vanessa', city: 'Belem', state: 'PA', region: 'Norte' },
    { name: 'Gustavo', city: 'Santos', state: 'SP', region: 'Sudeste' },
    { name: 'Aline', city: 'Salvador', state: 'BA', region: 'Nordeste' },
    { name: 'Diego', city: 'Campo Grande', state: 'MS', region: 'Centro-Oeste' },
    { name: 'Mateus', city: 'Joinville', state: 'SC', region: 'Sul' },
    { name: 'Erica', city: 'Palmas', state: 'TO', region: 'Norte' },
    { name: 'Tiago', city: 'Ribeirao Preto', state: 'SP', region: 'Sudeste' },
    { name: 'Luciana', city: 'Natal', state: 'RN', region: 'Nordeste' },
    { name: 'Caio', city: 'Brasilia', state: 'DF', region: 'Centro-Oeste' },
    { name: 'Renata', city: 'Londrina', state: 'PR', region: 'Sul' },
    { name: 'Wesley', city: 'Rio Branco', state: 'AC', region: 'Norte' },
    { name: 'Douglas', city: 'Sao Jose dos Campos', state: 'SP', region: 'Sudeste' },
    { name: 'Juliana', city: 'Maceio', state: 'AL', region: 'Nordeste' },
    { name: 'Robson', city: 'Anapolis', state: 'GO', region: 'Centro-Oeste' },
    { name: 'Fernanda', city: 'Florianopolis', state: 'SC', region: 'Sul' },
    { name: 'Igor', city: 'Macapa', state: 'AP', region: 'Norte' },
    { name: 'Henrique', city: 'Rio de Janeiro', state: 'RJ', region: 'Sudeste' },
    { name: 'Tatiane', city: 'Aracaju', state: 'SE', region: 'Nordeste' },
    { name: 'Vinicius', city: 'Dourados', state: 'MS', region: 'Centro-Oeste' },
    { name: 'Samuel', city: 'Caxias do Sul', state: 'RS', region: 'Sul' },
    { name: 'Nayara', city: 'Porto Velho', state: 'RO', region: 'Norte' },
];

function getNextIndex(currentIndex) {
    if (notifications.length <= 1) return 0;

    let nextIndex = currentIndex;

    while (nextIndex === currentIndex) {
        nextIndex = Math.floor(Math.random() * notifications.length);
    }

    return nextIndex;
}

export default function PurchaseNotifications() {
    const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * notifications.length));
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let hideTimeout;
        let nextTimeout;
        let current = currentIndex;

        const runCycle = () => {
            setIsVisible(true);

            const visibleFor = 3600 + Math.floor(Math.random() * 2200);
            const nextDelay = 4000 + Math.floor(Math.random() * 7000);

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
        <aside
            aria-live="polite"
            className={`purchase-toast ${isVisible ? 'is-visible' : ''}`}
        >
            <div className="purchase-toast__icon" aria-hidden="true">
                <Icon name="shoppingCart" />
            </div>
            <div className="purchase-toast__content">
                <div className="purchase-toast__eyebrow">
                    <span className="purchase-toast__badge">Nova matricula</span>
                    <span className="purchase-toast__region">{item.region}</span>
                </div>
                <p className="purchase-toast__title">
                    <strong>{item.name}</strong> de {item.city}, {item.state}
                </p>
                <p className="purchase-toast__text">acabou de garantir o FastFix Academy.</p>
            </div>
        </aside>
    );
}
