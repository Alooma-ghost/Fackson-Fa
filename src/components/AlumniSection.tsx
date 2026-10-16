import React, { useState, useEffect, useCallback } from 'react';
import { Award, Globe, Shield, Star, ArrowRight, X, ZoomIn } from 'lucide-react';

const alumni = [
  {
    id: 'papa',
    name: 'Papa Mustapha Daniel',
    role: 'Midfielder / Forward',
    photoUrl: '/images/alumni/papa-daniel.jpg',
    galleryImages: [
      '/images/alumni/papa-daniel.jpg',
      '/images/gallery/papa-national-team.jpg',
      '/images/gallery/papa-celje-strike.jpg'
    ],
    headline: 'NK Celje (Slovenia) & Nigerian Super Eagles',
    story:
      'Nurtured through our foundational grassroots academy at Meiran Field Estate, Alagbado. Developed elite tactical vision and physical stamina before securing a landmark professional transfer to the Slovenian PrvaLiga with NK Celje. He achieved a major milestone in 2025 by earning his senior international debut with the Nigerian Super Eagles.',
    tags: [
      { label: 'NK Celje (Slovenia 🇸🇮)', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)' },
      { label: 'Super Eagles Debut 2025 🇳🇬', color: '#4ade80', bg: 'rgba(74, 222, 128, 0.12)' },
      { label: 'Slovenian PrvaLiga Pro', color: '#ffd000', bg: 'rgba(255, 208, 0, 0.12)' }
    ],
    highlights: [
      'Graduated through Fackson Next Pro grassroots system',
      'Signed first-team professional contract with NK Celje in Slovenia',
      'Selected for Nigerian Home-Based Super Eagles squad (2025)',
      'Earned senior international debut for Nigeria'
    ]
  },
  {
    id: 'lawal',
    name: 'Lawal Oluwaseun',
    role: 'Midfielder / Left Winger',
    photoUrl: '/images/alumni/lawal-seun.jpg',
    headline: 'FC Koper (Slovenia) & Nigerian U-20',
    story:
      'Honed his electric pace, technical dribbling, and disciplined pressing system under Coach Farouk Yusuf at Fackson Next Pro. Progressed through grassroots scouting showcases to sign in the Slovenian PrvaLiga with FC Koper, earning call-up honors to the Nigerian U-20 National Team.',
    tags: [
      { label: 'FC Koper (Slovenia 🇸🇮)', color: '#ffd000', bg: 'rgba(255, 208, 0, 0.12)' },
      { label: 'Nigeria U-20 National Team 🇳🇬', color: '#4ade80', bg: 'rgba(74, 222, 128, 0.12)' },
      { label: 'European League Competitor', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)' }
    ],
    highlights: [
      'Trained and developed at Fackson Next Pro, Meiran Field Estate',
      'Secured European professional transfer to FC Koper (Slovenia)',
      'Selected for the Nigerian Under-20 National Team squad',
      'Regular competitor in top-tier European professional league'
    ]
  },
  {
    id: 'fatimo',
    name: 'Shuaib Fatimo',
    role: 'Forward / Defender (#22)',
    photoUrl: '/images/alumni/shuaib-fatimo.jpg',
    galleryImages: [
      '/images/alumni/shuaib-fatimo.jpg',
      '/images/gallery/fatimo-shuaib-flamingos-team.jpg',
      '/images/gallery/fatimo-shuaib-match-action.jpg',
      '/images/gallery/fatimo-shuaib-training.jpg'
    ],
    headline: 'FIFA U-17 World Cup 2025 & Flamingos',
    story:
      'A pioneer prodigy developed through Fackson Angels Female Academy. Demonstrating remarkable defensive grit and attacking versatility, she was named to the Nigerian U-17 National Team (Flamingos) for the FIFA U-17 World Cup Morocco 2025 while starring for Honey Badgers in the Nigerian Women Football League (NWFL).',
    tags: [
      { label: 'FIFA U-17 World Cup Morocco 🇲🇦', color: '#fb7185', bg: 'rgba(251, 113, 133, 0.12)' },
      { label: 'Nigeria Flamingos U-17 🇳🇬', color: '#4ade80', bg: 'rgba(74, 222, 128, 0.12)' },
      { label: 'NWFL Standout Player', color: '#ffd000', bg: 'rgba(255, 208, 0, 0.12)' }
    ],
    highlights: [
      'Pioneer star trained at Fackson Angels Female Academy',
      'Selected for Nigeria Flamingos (U-17 Women National Team)',
      'Official squad member for FIFA U-17 Women World Cup Morocco 2025',
      'Active standout competitor in Nigerian Women Football League (NWFL)'
    ]
  },
  {
    id: 'segun',
    name: 'Segun Oduduwa',
    role: 'Central Defender (#6)',
    photoUrl: '/images/alumni/segun-oduduwa.jpg',
    headline: 'Olympic Bronze Medalist & Africa Champion',
    story:
      'One of the foundational alumni of Fackson Next Pro Football Academy. After developing his defensive commanding presence under Coach Farouk Yusuf, he anchored the Nigerian U-23 national defense to win the Africa U-23 Cup of Nations and captured the Olympic Bronze Medal at the Rio 2016 Olympics in Brazil.',
    tags: [
      { label: 'Rio 2016 Olympic Bronze 🥉', color: '#ffd000', bg: 'rgba(255, 208, 0, 0.12)' },
      { label: 'Africa U-23 Champion 🏆', color: '#4ade80', bg: 'rgba(74, 222, 128, 0.12)' },
      { label: 'International & European Pro', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)' }
    ],
    highlights: [
      'Pioneer academy graduate of Fackson Nextpro Football Academy',
      'Won the Olympic Bronze Medal with Nigeria at Rio 2016 Olympic Games',
      'Crowned Champion of Africa at the Africa U-23 Cup of Nations',
      'Over a decade of top-flight domestic and foreign professional career'
    ]
  },
  {
    id: 'rasheed',
    name: 'Rasheed Ibrahim Akanbi',
    role: 'Forward',
    photoUrl: '/images/alumni/rasheed-akanbi.jpg',
    galleryImages: [
      '/images/alumni/rasheed-akanbi.jpg',
      '/images/gallery/rasheed-akanbi-boluspor.jpg',
      '/images/gallery/rasheed-akanbi-action.jpg',
      '/images/gallery/rasheed-akanbi-sheriff.jpg',
      '/images/gallery/rasheed-akanbi-ronaldo.jpg'
    ],
    headline: 'Boluspor (Turkey TFF 1. Lig) · ex-Sheriff Tiraspol',
    story:
      'Born 9 May 1999, Rasheed Ibrahim Akanbi is a Nigerian professional footballer who plays as a forward. A proud product of Fackson Football Academy\'s grassroots system, he rose from our pitches at Meiran Field Estate to professional football. On 22 June 2022, he signed with FC Sheriff Tiraspol in the Moldovan Super Liga, competing in the UEFA Champions League. After his contract expired, he signed a two-year deal with Boluspor in Turkey\'s TFF 1. Lig on 14 July 2025.',
    tags: [
      { label: 'Boluspor · TFF 1. Lig 🇹🇷', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.12)' },
      { label: 'ex-Sheriff Tiraspol 🇲🇩', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)' },
      { label: 'UEFA Champions League', color: '#ffd000', bg: 'rgba(255, 208, 0, 0.12)' }
    ],
    highlights: [
      'Developed through Fackson Football Academy grassroots programme at Meiran Field Estate',
      'Signed for FC Sheriff Tiraspol (Moldova) on 22 June 2022 — UEFA Champions League competitor',
      'Signed a 2-year professional contract with Boluspor (Turkey TFF 1. Lig) on 14 July 2025',
      'Photographed alongside Cristiano Ronaldo — a testament to his European journey'
    ]
  }
];

type AlumniPlayer = typeof alumni[0];

interface AlumniSectionProps {
  onNavigate?: (page: string) => void;
}

export const AlumniSection: React.FC<AlumniSectionProps> = ({ onNavigate }) => {
  const [lightbox, setLightbox] = useState<AlumniPlayer | null>(null);
  const [activePhoto, setActivePhoto] = useState<string>('');

  const openLightbox = (player: AlumniPlayer) => {
    setLightbox(player);
    setActivePhoto(player.photoUrl);
  };

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    setActivePhoto('');
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    if (lightbox) {
      document.addEventListener('keydown', handler);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [lightbox, closeLightbox]);

  return (
    <section id="academy-alumni" className="section" style={{ background: '#030603', padding: '5rem 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 3.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 208, 0, 0.12)',
            border: '1px solid rgba(255, 208, 0, 0.35)',
            padding: '5px 16px',
            borderRadius: '50px',
            marginBottom: '1rem'
          }}>
            <Award size={14} color="var(--color-gold-primary)" />
            <span style={{
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-gold-primary)'
            }}>
              Proven Academy Pathways
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 900,
            color: '#fff',
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            OUR ALUMNI — PLAYING IN EUROPE &amp; NATIONAL TEAMS
          </h2>
          <p style={{
            color: '#94a3b8',
            fontSize: '1rem',
            lineHeight: 1.65,
            maxWidth: '680px',
            margin: '0 auto'
          }}>
            From our grassroots training pitches at Meiran Field Estate - Ojokoro Housing Estate Field, Meiran Alagbado to European top divisions, Olympic podiums, and World Cup tournaments. Here are proud graduates of Fackson Football Academy.
          </p>
        </div>

        {/* Bigger Dialight-style Alumni Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '2rem',
          marginBottom: '3.5rem'
        }}>
          {alumni.map((player) => (
            <div
              key={player.id}
              style={{
                background: '#070b07',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 208, 0, 0.22)',
                boxShadow: '0 16px 48px rgba(0,0,0,0.7)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease'
              }}
              className="alumni-card"
            >
              {/* Full-portrait photo — shows entire body with 3/4 aspect ratio */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '3 / 4',
                  background: '#040804',
                  overflow: 'hidden',
                  cursor: 'zoom-in'
                }}
                onClick={() => openLightbox(player)}
                title="Click to view full picture"
              >
                <img
                  src={player.photoUrl}
                  alt={player.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    transition: 'transform 0.4s ease'
                  }}
                  className="alumni-img"
                />

                {/* Zoom hint */}
                <div style={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  background: 'rgba(0,0,0,0.65)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: '#fff',
                  borderRadius: '8px',
                  padding: '5px 10px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  pointerEvents: 'none',
                  zIndex: 2
                }}>
                  <ZoomIn size={13} color="var(--color-gold-primary)" />
                  <span>Full View</span>
                </div>

                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(7, 11, 7, 0.98) 0%, rgba(7, 11, 7, 0.35) 45%, transparent 100%)'
                }} />

                {/* Badge top-left */}
                <div style={{
                  position: 'absolute',
                  top: 14,
                  left: 14,
                  background: 'rgba(4, 8, 4, 0.88)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 208, 0, 0.4)',
                  color: 'var(--color-gold-primary)',
                  padding: '5px 12px',
                  borderRadius: '50px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  zIndex: 2
                }}>
                  <Star size={12} fill="var(--color-gold-primary)" />
                  <span>Fackson FA Graduate</span>
                </div>

                {/* Player Name on overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: 16,
                  left: 20,
                  right: 20,
                  zIndex: 2
                }}>
                  <div style={{
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: '#4ade80',
                    letterSpacing: '0.06em',
                    marginBottom: 4
                  }}>
                    {player.role}
                  </div>
                  <h3 style={{
                    color: '#ffffff',
                    fontSize: '1.45rem',
                    fontWeight: 900,
                    margin: 0,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.2
                  }}>
                    {player.name}
                  </h3>
                </div>
              </div>

              {/* Content Body */}
              <div style={{ padding: '24px 22px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  {/* Headline */}
                  <div style={{
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    color: 'var(--color-gold-primary)',
                    marginBottom: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Globe size={15} color="var(--color-gold-primary)" />
                    <span>{player.headline}</span>
                  </div>

                  {/* Pills / Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1rem' }}>
                    {player.tags.map((t, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '3px 10px',
                          borderRadius: '50px',
                          background: t.bg,
                          color: t.color,
                          border: `1px solid ${t.color}44`
                        }}
                      >
                        {t.label}
                      </span>
                    ))}
                  </div>

                  {/* Story */}
                  <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                    {player.story}
                  </p>

                  {/* Career Milestones */}
                  <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    marginBottom: '1.25rem'
                  }}>
                    <div style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: 'var(--color-gold-primary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '6px'
                    }}>
                      Career Milestones:
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                      {player.highlights.map((h, i) => (
                        <li key={i} style={{ marginBottom: '3px' }}>{h}</li>
                      ))}
                    </ul>
                  </div>

                  {/* View Full Photo Button */}
                  <button
                    onClick={() => setLightbox(player)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <ZoomIn size={14} color="var(--color-gold-primary)" />
                    <span>View Full Picture</span>
                  </button>
                </div>

                {/* Card Footer: Nurtured at Meiran Field Estate */}
                <div style={{
                  marginTop: '1.25rem',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.74rem',
                  color: '#94a3b8'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Shield size={14} color="#4ade80" />
                    <span>Nurtured at Meiran Field Estate</span>
                  </div>
                  <span style={{ fontWeight: 800, color: 'var(--color-gold-primary)' }}>Elite Pathway</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pathway Banner — Just like Dialight FA */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(12, 22, 14, 0.95) 0%, rgba(4, 10, 5, 0.98) 100%)',
          borderRadius: '20px',
          padding: '36px 32px',
          color: '#ffffff',
          border: '1px solid rgba(255, 208, 0, 0.3)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px'
        }}>
          <div style={{ maxWidth: 620 }}>
            <span style={{
              display: 'inline-block',
              background: 'rgba(255, 208, 0, 0.15)',
              border: '1px solid rgba(255, 208, 0, 0.35)',
              color: 'var(--color-gold-primary)',
              fontWeight: 800,
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              padding: '4px 14px',
              borderRadius: '50px',
              marginBottom: '10px'
            }}>
              Join Our Talent Pipeline
            </span>
            <h3 style={{ color: '#fff', fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', fontWeight: 900, margin: '0 0 8px' }}>
              Your Child Could Be Our Next Success Story
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', margin: 0, lineHeight: 1.6 }}>
              Open registration and scouting trials are active for Under-10 to Under-15 (Male &amp; Female) and Free Age (Male &amp; Female) at Meiran Field Estate - Ojokoro Housing Estate Field, Meiran Alagbado.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {onNavigate && (
              <button
                onClick={() => onNavigate('join')}
                className="btn btn-gold btn-md"
                style={{ padding: '12px 22px' }}
              >
                <span>Request Player Trial</span>
                <ArrowRight size={16} />
              </button>
            )}


          </div>
        </div>
      </div>

      <style>{`
        .alumni-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 24px 50px rgba(0, 0, 0, 0.85) !important;
          border-color: var(--color-gold-primary) !important;
        }
        .alumni-card:hover .alumni-img {
          transform: scale(1.04);
        }
      `}</style>

      {/* Full-Screen Lightbox Modal — Dialight Style */}
      {lightbox && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(2, 6, 2, 0.96)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: 18,
              right: 18,
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.22)',
              color: '#fff',
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10001
            }}
            title="Close (Esc)"
          >
            <X size={22} />
          </button>

          {/* Photo + Info Panel */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: 520,
              width: '100%'
            }}
          >
            <div style={{
              position: 'relative',
              width: '100%',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0,0,0,0.85)',
              border: '2px solid rgba(255, 208, 0, 0.3)'
            }}>
              <img
                src={activePhoto || lightbox.photoUrl}
                alt={lightbox.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '65vh',
                  objectFit: 'contain',
                  display: 'block',
                  background: '#040804'
                }}
              />

              {/* Bottom gradient overlay */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(2, 6, 2, 0.97) 0%, rgba(2, 6, 2, 0.3) 65%, transparent 100%)',
                padding: '32px 20px 18px'
              }}>
                <div style={{
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#4ade80',
                  letterSpacing: '0.07em',
                  marginBottom: 3
                }}>
                  {lightbox.role}
                </div>
                <div style={{ color: '#fff', fontSize: '1.65rem', fontWeight: 900 }}>
                  {lightbox.name}
                </div>
                <div style={{ color: 'var(--color-gold-primary)', fontSize: '0.85rem', fontWeight: 700, marginTop: 3 }}>
                  {lightbox.headline}
                </div>
              </div>

              {/* Graduate badge */}
              <div style={{
                position: 'absolute',
                top: 14,
                left: 14,
                background: 'rgba(4, 8, 4, 0.88)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 208, 0, 0.4)',
                color: 'var(--color-gold-primary)',
                padding: '5px 12px',
                borderRadius: '50px',
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: 5
              }}>
                <Star size={12} fill="var(--color-gold-primary)" />
                <span>Fackson FA Graduate</span>
              </div>
            </div>

            {/* Thumbnail switcher if multiple images exist */}
            {lightbox.galleryImages && lightbox.galleryImages.length > 1 && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                marginTop: 14,
                padding: '6px 12px',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: '50px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Photos ({lightbox.galleryImages.length}):
                </span>
                {lightbox.galleryImages.map((imgSrc, idx) => {
                  const isCurrent = (activePhoto || lightbox.photoUrl) === imgSrc;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActivePhoto(imgSrc)}
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: '10px',
                        overflow: 'hidden',
                        padding: 0,
                        border: isCurrent ? '2px solid var(--color-gold-primary)' : '1px solid rgba(255,255,255,0.25)',
                        background: '#000',
                        cursor: 'pointer',
                        transform: isCurrent ? 'scale(1.1)' : 'scale(1)',
                        transition: 'all 0.2s ease',
                        boxShadow: isCurrent ? '0 0 12px rgba(255,208,0,0.5)' : 'none'
                      }}
                      title={`Photo ${idx + 1}`}
                    >
                      <img
                        src={imgSrc}
                        alt={`${lightbox.name} ${idx + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Tag Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14, justifyContent: 'center' }}>
              {lightbox.tags.map((t, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: '50px',
                    background: t.bg,
                    color: t.color,
                    border: `1px solid ${t.color}44`
                  }}
                >
                  {t.label}
                </span>
              ))}
            </div>

            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginTop: 10, textAlign: 'center' }}>
              Press <kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: 4 }}>Esc</kbd> or click outside to close
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
