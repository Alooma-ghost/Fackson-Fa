import React from 'react';
import { Award, Shield, Star, Users, CheckCircle, ArrowRight, MessageCircle, Calendar, Trophy, MapPin } from 'lucide-react';

interface CoachesSectionProps {
  openRegistration?: () => void;
}

const CEO_WHATSAPP = 'https://wa.me/2348029745452?text=' + encodeURIComponent(
  'Hello, I would like to inquire about Fackson Football Academy trials, enrollment, and training schedule at Meiran Field Estate - Ojokoro Housing Estate Field, Meiran Alagbado.'
);

const COACH_WHATSAPP = 'https://wa.me/2348173496343?text=' + encodeURIComponent(
  'Hello Coach, I would like to inquire about Fackson Football Academy trials, enrollment, and training schedule at Meiran Field Estate - Ojokoro Housing Estate Field, Meiran Alagbado.'
);

// Keep alias for backward compatibility
const HEAD_COACH_WHATSAPP = CEO_WHATSAPP;

const THREE_COACHES = [
  {
    name: 'Coach Atere Ganiyu',
    role: 'Assistant Coach',
    license: 'Licensed Academy Coach',
    focus: 'Senior & youth tactical setup, match strategy & squad discipline',
    theme: '#4ade80',
    photoUrl: '/images/coach-atere.png',
    initials: 'AG',
  },
  {
    name: 'Coach Fasoranti Busayo',
    role: 'Assistant Coach',
    license: 'Youth Technical Specialist',
    focus: 'Youth technical fundamentals, agility drills & tactical awareness',
    theme: '#ffd000',
    photoUrl: '/images/coach-busayo.jpg',
    initials: 'FB',
  },
  {
    name: 'Coach Ahmed Sambo',
    role: 'Assistant Coach',
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
      className="coaches-section"
      style={{
        background: 'var(--bg-surface-1, #060a06)',
        padding: '4.5rem 0',
        position: 'relative',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)'
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
          <h2 style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.7rem)', fontWeight: 800, color: 'var(--color-cream, #fff)', marginBottom: '0.45rem', letterSpacing: '-0.01em' }}>
            ACADEMY COACHING STAFF
          </h2>
          <p style={{ color: 'var(--color-cream-subtle, #94a3b8)', fontSize: '0.86rem', maxWidth: '580px', margin: '0 auto', lineHeight: 1.55 }}>
            Licensed coaches and dedicated technical trainers committed to developing Nigeria's next generation of football talent at Meiran Field Estate, Alagbado.
          </p>
        </div>

        {/* HEAD COACH — Prominent Featured Master Card */}
        <div className="head-coach-master-card">
          {/* Portrait photo column */}
          <div className="head-coach-photo-wrapper">
            <img
              src="/images/coach-head.jpg"
              alt="Coach Farouk Yusuf"
              className="head-coach-photo-img"
            />
            {/* Visual gradient overlay for seamless card blend */}
            <div className="head-coach-photo-overlay" />

            {/* Founder badge */}
            <div className="head-coach-founder-badge">
              <Star size={13} fill="var(--color-gold-primary)" color="var(--color-gold-primary)" />
              <span>FOUNDER &amp; HEAD COACH</span>
            </div>

            {/* Bottom photo tag */}
            <div className="head-coach-experience-tag">
              <Trophy size={14} color="#4ade80" />
              <span>26+ Years NFF Grassroots Leadership</span>
            </div>
          </div>

          {/* Coach Details column */}
          <div className="head-coach-content">
            <div className="head-coach-badge-row">
              <Shield size={14} color="var(--color-gold-primary)" />
              <span style={{ fontSize: '0.74rem', color: 'var(--color-gold-primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Technical Director • NFF Licensed
              </span>
            </div>

            <h3 className="head-coach-name">
              Coach Farouk Yusuf
            </h3>
            <p className="head-coach-title">
              <span>"Ajobi"</span>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>•</span>
              <span style={{ color: '#cbd5e1' }}>Academy Founder &amp; Chief Tactician</span>
            </p>

            {/* Structured Stats Grid */}
            <div className="head-coach-stats-grid">
              <div className="head-coach-stat-pill">
                <span className="head-coach-stat-val">26+ Years</span>
                <span className="head-coach-stat-lbl">Grassroots Excellence</span>
              </div>
              <div className="head-coach-stat-pill">
                <span className="head-coach-stat-val">Est. 1998</span>
                <span className="head-coach-stat-lbl">Alagbado, Lagos</span>
              </div>
              <div className="head-coach-stat-pill">
                <span className="head-coach-stat-val">Europe Pathway</span>
                <span className="head-coach-stat-lbl">Slovenia 1st Tier &amp; Beyond</span>
              </div>
              <div className="head-coach-stat-pill">
                <span className="head-coach-stat-val">National Teams</span>
                <span className="head-coach-stat-lbl">Nigeria U17 / U20 Mentorship</span>
              </div>
            </div>

            <p className="head-coach-bio">
              Founded Fackson Nextpro Football Academy in 1998 at Alagbado, Lagos. Over 26 years of dedicated football mentorship, developing players from foundational technique to professional contracts across European top tiers (Slovenia PrvaLiga) and Nigerian national selections.
            </p>

            {/* Training Schedule Callout */}
            <div className="head-coach-schedule-box">
              <Calendar size={18} color="#4ade80" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#ffffff' }}>U10–U15 (Male & Female):</strong>
                <span style={{ color: '#4ade80' }}> Mon–Fri: 4:00 PM – 6:00 PM</span> · <span style={{ color: '#a7f3d0' }}>Sat–Sun: 11:00 AM – 2:00 PM</span>
                <div style={{ fontSize: '0.74rem', color: '#cbd5e1', marginTop: '3px' }}>
                  <strong style={{ color: '#ffffff' }}>Free Age (Male & Female):</strong>
                  <span style={{ color: '#ffd000' }}> Mon–Fri: 6:45 AM – 11:00 AM</span>
                </div>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '2px' }}>
                  <MapPin size={12} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '4px' }} />
                  Meiran Field Estate - Ojokoro Housing Estate Field, Meiran Alagbado
                </div>
              </div>
            </div>

            {/* Direct Contact CTAs */}
            <div className="head-coach-actions">
              <a
                href={CEO_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="head-coach-wa-btn-1"
                id="head-coach-wa-1"
              >
                <MessageCircle size={16} />
                <span>0802 974 5452 (CEO)</span>
              </a>

              <a
                href={COACH_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="head-coach-wa-btn-2"
                id="head-coach-wa-2"
              >
                <MessageCircle size={16} />
                <span>0817 349 6343 (Coach)</span>
              </a>

              {openRegistration && (
                <button
                  onClick={openRegistration}
                  className="btn btn-gold btn-sm"
                  style={{ padding: '12px 22px', fontSize: '0.86rem', fontWeight: 800 }}
                  id="head-coach-trial-btn"
                >
                  <span>Book Trial Assessment</span>
                  <ArrowRight size={15} />
                </button>
              )}
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
              U10–U15: Mon–Fri 4–6 PM, Sat–Sun 11 AM–2 PM | Free-Age: Mon–Fri 6:45–11 AM — Meiran Field Estate - Ojokoro Housing Estate Field, Meiran Alagbado
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
