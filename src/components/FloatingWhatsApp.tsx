import React, { useState } from 'react';
import { MessageCircle, X, PhoneCall } from 'lucide-react';

interface FloatingWhatsAppProps {
  primaryPhone?: string;
  secondaryPhone?: string;
  coachPhone?: string;
  headCoachPhone?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  headCoachPhone = '2348029745452',
  coachPhone = '2348173496343',
  primaryPhone,
  secondaryPhone,
}) => {
  const [showTooltip, setShowTooltip] = useState(true);
  const headCoach = headCoachPhone || secondaryPhone || '2348029745452';
  const coach = coachPhone || primaryPhone || '2348173496343';

  const getUrl = (phone: string, role: string) =>
    `https://wa.me/${phone}?text=${encodeURIComponent(
      `Hello ${role}, I would like to inquire about Fackson Football Academy (Next Pro Men / Angels Women) trials and training (Tue, Thu, Sat morning 6:45 AM – 11:00 AM) at Meiran Field Estate, Alagbado.`
    )}`;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '68px', // Sits cleanly above bottom news ticker
        right: '20px',
        zIndex: 900,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        pointerEvents: 'none',
      }}
    >
      {/* Speech Bubble / Contact Card */}
      {showTooltip && (
        <div
          style={{
            pointerEvents: 'auto',
            background: 'rgba(8, 14, 8, 0.96)',
            border: '1px solid rgba(37, 211, 102, 0.45)',
            borderRadius: '16px',
            padding: '12px 14px',
            marginBottom: '10px',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.75), 0 0 20px rgba(37, 211, 102, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '240px',
            animation: 'fadeInUp 0.3s ease-out',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#25D366',
                  boxShadow: '0 0 8px #25D366',
                }}
              />
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.02em' }}>
                Chat on WhatsApp
              </span>
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
              }}
              aria-label="Dismiss tooltip"
            >
              <X size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <a
              href={getUrl(headCoach, 'Head Coach Farouk')}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(37, 211, 102, 0.15)',
                border: '1px solid rgba(37, 211, 102, 0.4)',
                borderRadius: '10px',
                padding: '6px 10px',
                color: '#4ade80',
                textDecoration: 'none',
                fontSize: '0.74rem',
                fontWeight: 700,
                transition: 'all 0.2s ease',
              }}
              className="wa-chip"
            >
              <span>0802 974 5452</span>
              <span style={{ fontSize: '0.65rem', color: '#cbd5e1', fontWeight: 600 }}>Head Coach</span>
            </a>

            <a
              href={getUrl(coach, 'Coach')}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '10px',
                padding: '6px 10px',
                color: '#e2e8f0',
                textDecoration: 'none',
                fontSize: '0.74rem',
                fontWeight: 700,
                transition: 'all 0.2s ease',
              }}
              className="wa-chip"
            >
              <span>0817 349 6343</span>
              <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 600 }}>Coach</span>
            </a>
          </div>
        </div>
      )}

      {/* Pulsing Floating Action Button */}
      <a
        href={getUrl(headCoach, 'Head Coach Farouk')}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          pointerEvents: 'auto',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: '0 10px 28px rgba(37, 211, 102, 0.45)',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          position: 'relative',
        }}
        className="floating-whatsapp-btn"
        title="Chat on WhatsApp: 0802 974 5452 (Head Coach) / 0817 349 6343 (Coach)"
      >
        <MessageCircle size={28} />
        {/* Radar Ring Animation */}
        <span
          style={{
            position: 'absolute',
            inset: '-6px',
            borderRadius: '50%',
            border: '2px solid rgba(37, 211, 102, 0.5)',
            animation: 'radarPulse 2s infinite',
          }}
        />
      </a>

      <style>{`
        @keyframes radarPulse {
          0% { transform: scale(0.95); opacity: 0.8; }
          70% { transform: scale(1.35); opacity: 0; }
          100% { transform: scale(1.35); opacity: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .floating-whatsapp-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 14px 32px rgba(37, 211, 102, 0.6) !important;
        }
        .wa-chip:hover {
          background: rgba(37, 211, 102, 0.3) !important;
          border-color: #25D366 !important;
          transform: translateX(-2px);
        }
      `}</style>
    </div>
  );
};
