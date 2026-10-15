import React from 'react';
import { Award, Shield, Star, Users, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';

interface CoachesSectionProps {
  openRegistration?: () => void;
}

const COACH_WHATSAPP = 'https://wa.me/2348173496343?text=' + encodeURIComponent(
  'Hello Coach Farouk, I would like to inquire about Fackson Football Academy trials, enrollment, and training (Tue, Thu, Sat morning 6:45 AM – 11:00 AM) at Meiran Field Estate, Alagbado.'
);

const COACH_WHATSAPP_2 = 'https://wa.me/2348029745452?text=' + encodeURIComponent(
  'Hello Coach, I would like to inquire about Fackson Football Academy trials, enrollment, and training (Tue, Thu, Sat morning 6:45 AM – 11:00 AM) at Meiran Field Estate, Alagbado.'
);

const THREE_COACHES = [
  {
    name: 'Coach Atere Ganiyu',
    role: 'Assistant Coach',
    license: 'Licensed Academy Coach',
    focus: 'Senior & youth tactical setup, match strategy & squad discipline',
    theme: '#4ade80',
    photoUrl: '/images/coach-atere.jpg',
    initials: 'AG',
  },
  {
    name: 'Coach Fasoranti Busayo',
    role: 'Under-15 Coach',
    license: 'Youth Technical Specialist',
    focus: 'Under-15 technical fundamentals, agility drills & tactical awareness',
    theme: '#ffd000',
    photoUrl: '/images/team-photo.jpg',
    initials: 'FB',
  },
  {
    name: 'Coach Ahmed Sambo',
    role: 'Third Assistant Coach',
    license: 'Technical Assistant & Scouting',
    focus: 'Grassroots scout evaluation, positional training & athletic conditioning',
    theme: '#38bdf8',
    photoUrl: '/images/coach-sambo.jpg',
    initials: 'AS',
  },
];

export const CoachesSection: React.FC<CoachesSectionProps> = ({ openRegistration }) => {
  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #020502 0%, #060a06 50%, #020502 100%)',
        padding: '4.5rem 0',
        position: 'relative',
        borderTop: '1px solid rgba(255,208,0,0.15)',
        borderBottom: '1px solid rgba(255,208,0,0.15)'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,208,0,0.1)', border: '1px solid rgba(255,208,0,0.3)',
            padding: '5px 16px', borderRadius: '50px', marginBottom: '0.85rem'
          }}>
            <Users size={14} color="var(--color-gold-primary)" />
            <span style={{ fontSize: '0.76rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-gold-primary)' }}>
              Technical Leadership
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 900, color: '#fff', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            ACADEMY COACHING STAFF
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '620px', margin: '0 auto', lineHeight: 1.6 }}>
            Licensed coaches and dedicated technical trainers committed to developing Nigeria's next generation of football talent at Meiran Field Estate, Alagbado.
          </p>
        </div>

        {/* HEAD COACH — Big Alumni-Style Portrait Card */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div
            style={{
              background: '#070b07',
              borderRadius: '24px',
              border: '1px solid rgba(255,208,0,0.3)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            {/* Portrait photo — tall album style just like alumni */}
            <div
              style={{
                position: 'relative',
                width: 'clamp(200px, 30vw, 320px)',
                minHeight: '420px',
                flexShrink: 0,
                background: '#040804',
                overflow: 'hidden',
              }}
            >
              <img
                src="/images/coach-head.jpg"
                alt="Coach Farouk Yusuf"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  position: 'absolute',
                  inset: 0,
                }}
              />
              {/* Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, rgba(7,11,7,0) 60%, rgba(7,11,7,0.6) 100%)',
              }} />
              {/* Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  background: 'rgba(0,0,0,0.88)',
                  border: '1px solid rgba(255,208,0,0.55)',
                  borderRadius: '50px',
                  padding: '5px 12px',
                  fontSize: '0.68rem',
                  fontWeight: 900,
                  color: 'var(--color-gold-primary)',
                  letterSpacing: '0.04em'
                }}
              >
                ⭐ FOUNDER &amp; CEO
              </div>
            </div>

            {/* Coach Details */}
            <div style={{ flex: '1 1 280px', padding: 'clamp(1.5rem, 3vw, 2.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '0.5rem' }}>
                <Shield size={14} color="var(--color-gold-primary)" />
                <span style={{ fontSize: '0.74rem', color: 'var(--color-gold-primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  NFF Licensed • Grassroots Pioneer
                </span>
              </div>

              <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: '0.2rem' }}>
                Coach Farouk Yusuf
              </h3>
              <p style={{ fontSize: '1rem', color: '#4ade80', fontWeight: 800, marginBottom: '1rem' }}>
                "Ajobi" — Head Coach &amp; Academy Founder
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                {['26+ Years Experience', 'Est. 1998', 'Meiran Field Estate', 'European Transfer Pathway'].map(badge => (
                  <span key={badge} style={{
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '6px', padding: '4px 10px',
                    fontSize: '0.72rem', color: '#cbd5e1', fontWeight: 700
                  }}>
                    {badge}
                  </span>
                ))}
              </div>

              <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '560px' }}>
                Founded Fackson Nextpro Football Academy in 1998 at Alagbado, Lagos. Over 26 years of dedicated grassroots development, producing professionals playing across European first tiers (Slovenia PrvaLiga) and representing the Nigerian national teams.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(255, 208, 0, 0.1)',
                  border: '1px solid rgba(255, 208, 0, 0.3)',
                  color: 'var(--color-gold-primary)',
                  borderRadius: '50px',
                  padding: '8px 18px',
                  fontSize: '0.84rem',
                  fontWeight: 700
                }}>
                  <CheckCircle size={15} color="var(--color-gold-primary)" />
                  <span>Official Head Coach &amp; Technical Director</span>
                </div>
                <a
                  href={COACH_WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    color: '#fff',
                    borderRadius: '50px',
                    padding: '8px 18px',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)'
                  }}
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp: +234 817 349 6343</span>
                </a>
                <a
                  href={COACH_WHATSAPP_2}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(37, 211, 102, 0.12)',
                    border: '1px solid rgba(37, 211, 102, 0.4)',
                    color: '#4ade80',
                    borderRadius: '50px',
                    padding: '8px 18px',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp: +234 802 974 5452</span>
                </a>
                {openRegistration && (
                  <button
                    onClick={openRegistration}
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: '0.84rem', padding: '8px 18px' }}
                  >
                    <span>Register for Assessment</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* THREE COACHES — Individual Photo Cards */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '1.25rem'
          }}>
            <Star size={16} color="var(--color-gold-primary)" />
            <span style={{ fontSize: '0.8rem', color: 'var(--color-gold-primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              On-Pitch Technical Staff
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem'
          }}>
            {THREE_COACHES.map((coach) => (
              <div
                key={coach.name}
                style={{
                  background: '#070b07',
                  borderRadius: '20px',
                  border: `1px solid ${coach.theme}33`,
                  boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.22s ease, box-shadow 0.22s ease',
                }}
                className="coach-card"
              >
                {/* Individual Coach Photo */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '210px',
                  background: '#040804',
                  overflow: 'hidden',
                  flexShrink: 0
                }}>
                  <img
                    src={coach.photoUrl}
                    alt={coach.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 20%',
                    }}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.style.display = 'flex';
                        parent.style.alignItems = 'center';
                        parent.style.justifyContent = 'center';
                        parent.style.background = '#0d1a0d';
                      }
                    }}
                  />
                  {/* Top color bar */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: coach.theme,
                  }} />
                  {/* Bottom gradient overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(7,11,7,0.92) 0%, rgba(7,11,7,0.2) 55%, transparent 100%)'
                  }} />
                  {/* License badge */}
                  <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}>
                    <Award size={11} color={coach.theme} />
                    <span style={{ fontSize: '0.65rem', color: coach.theme, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                      {coach.license}
                    </span>
                  </div>
                </div>

                {/* Card Details */}
                <div style={{ padding: '1rem 1.1rem 1.1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h5 style={{ fontSize: '0.98rem', fontWeight: 900, color: '#fff', margin: '0 0 4px', lineHeight: 1.25 }}>
                      {coach.name}
                    </h5>
                    <p style={{ fontSize: '0.76rem', color: coach.theme, fontWeight: 700, margin: '0 0 8px' }}>
                      {coach.role}
                    </p>
                    <p style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.5, margin: '0 0 0.85rem' }}>
                      {coach.focus}
                    </p>
                  </div>
                  <a
                    href={COACH_WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'rgba(37, 211, 102, 0.1)',
                      border: '1px solid rgba(37, 211, 102, 0.3)',
                      color: '#25D366',
                      borderRadius: '8px',
                      padding: '7px 12px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      transition: 'background 0.2s ease'
                    }}
                  >
                    <MessageCircle size={13} />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Strip */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255,208,0,0.04)',
          border: '1px solid rgba(255,208,0,0.2)',
          borderRadius: '16px',
          padding: '1.25rem 1.75rem'
        }}>
          <div>
            <p style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem', margin: 0 }}>
              Ready to train with our coaches?
            </p>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '4px 0 0' }}>
              Open trials every Monday, Wednesday &amp; Saturday — Meiran Field Estate, Alagbado
            </p>
          </div>
          {openRegistration ? (
            <button
              onClick={openRegistration}
              className="btn btn-gold btn-sm"
              style={{ padding: '8px 18px', fontSize: '0.82rem' }}
            >
              <span>Book a Trial</span>
            </button>
          ) : (
            <span style={{ color: 'var(--color-gold-primary)', fontSize: '0.82rem', fontWeight: 700 }}>
              Meiran Field Estate Ground
            </span>
          )}
        </div>
      </div>
    </section>
  );
};
