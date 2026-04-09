import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [fadeOut, setFadeOut] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Start fade out after initial paint + small delay for smoothness
    const raf = requestAnimationFrame(() => {
      const fadeTimer = setTimeout(() => setFadeOut(true), 600);
      const hideTimer = setTimeout(() => setRemoved(true), 1000);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  if (removed) return null;

  return (
    <div className={`ff-loader ${fadeOut ? 'ff-loader--out' : ''}`}>
      <div className="ff-loader__glow" aria-hidden="true" />
      <div className="ff-loader__content">
        <div className="ff-loader__logo">
          <svg viewBox="0 0 24 24" width="40" height="40" fill="none" aria-hidden="true">
            <path
              d="M13 2L4.09 12.96A1 1 0 005 14.5h6.5L10 22l9.91-10.96A1 1 0 0019 9.5H12.5L13 2z"
              fill="#fff"
            />
          </svg>
        </div>
        <div className="ff-loader__brand">
          <span className="ff-loader__brand-text">FLASH 64</span>
          <span className="ff-loader__shimmer" aria-hidden="true" />
        </div>
        <div className="ff-loader__bar">
          <div className="ff-loader__bar-fill" />
        </div>
      </div>

      <style>{`
        .ff-loader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: radial-gradient(ellipse at center, #0a0a14 0%, #050508 70%);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: opacity;
          contain: strict;
        }
        .ff-loader--out {
          opacity: 0;
          pointer-events: none;
        }
        .ff-loader__glow {
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,107,0,0.18) 0%, rgba(255,107,0,0) 60%);
          animation: ff-pulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          filter: blur(20px);
          will-change: transform, opacity;
        }
        .ff-loader__content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
        }
        .ff-loader__logo {
          width: 72px;
          height: 72px;
          border-radius: 20px;
          background: linear-gradient(135deg, #ff6b00 0%, #f59e0b 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.08),
            0 20px 40px -10px rgba(255,107,0,0.5),
            0 0 60px rgba(255,107,0,0.3);
          animation: ff-logoIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          will-change: transform, opacity;
        }
        .ff-loader__brand {
          position: relative;
          overflow: hidden;
          animation: ff-fadeInUp 0.5s 0.1s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        .ff-loader__brand-text {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
          font-size: 0.95rem;
          font-weight: 800;
          letter-spacing: 0.25em;
          color: #fff;
          display: block;
        }
        .ff-loader__shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: ff-shimmer 1.8s linear infinite;
          mix-blend-mode: overlay;
        }
        .ff-loader__bar {
          width: 140px;
          height: 2px;
          border-radius: 999px;
          background: rgba(255,255,255,0.06);
          overflow: hidden;
          animation: ff-fadeInUp 0.5s 0.2s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        .ff-loader__bar-fill {
          height: 100%;
          width: 40%;
          border-radius: 999px;
          background: linear-gradient(90deg, transparent 0%, #ff6b00 50%, transparent 100%);
          animation: ff-slide 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          will-change: transform;
        }
        @keyframes ff-logoIn {
          0%   { opacity: 0; transform: scale(0.7) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes ff-fadeInUp {
          0%   { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes ff-pulse {
          0%, 100% { transform: scale(0.9); opacity: 0.6; }
          50%      { transform: scale(1.1); opacity: 1; }
        }
        @keyframes ff-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes ff-slide {
          0%   { transform: translateX(-120%); }
          100% { transform: translateX(360%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ff-loader__glow,
          .ff-loader__shimmer,
          .ff-loader__bar-fill { animation: none; }
        }
      `}</style>
    </div>
  );
}
