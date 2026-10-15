import React from 'react';
import { Trophy, Users, Shield, ArrowRight, Calendar, Star, CheckCircle2, Award, ChevronRight, MapPin, Activity, Sparkles, Video, MessageCircle } from 'lucide-react';
import { Player, GalleryItem, NewsItem, MatchItem, AcademyType } from '../types';
import { AlumniSection } from '../components/AlumniSection';
import { CoachesSection } from '../components/CoachesSection';
import { MapSection } from '../components/MapSection';
import { LiveScoreCard } from '../components/LiveScoreCard';

interface HomeProps {
  setCurrentTab: (tab: string) => void;
  setActiveAcademy: (academy: AcademyType) => void;
  openRegistration: () => void;
  players: Player[];
  gallery: GalleryItem[];
  news: NewsItem[];
  matches: MatchItem[];
  onOpenLightbox: (item: GalleryItem) => void;
}

export const Home: React.FC<HomeProps> = ({
  setCurrentTab,
  setActiveAcademy,
  openRegistration,
  players,
  gallery,
  news,
  matches,
  onOpenLightbox
}) => {
  const activeNews = news.slice(0, 3);
  const teaserGallery = gallery.slice(0, 3);

  const coachWhatsAppUrl = `https://wa.me/2348029745452?text=${encodeURIComponent(
    'Hello Head Coach Farouk Yusuf, I would like to inquire about Fackson Football Academy trials and training (Tuesday, Thursday & Saturday morning 6:45 AM – 11:00 AM) at Meiran Field Estate, Alagbado.'
  )}`;

  return (
    <div style={{ background: '#000000', color: '#fff' }}>
      {/* 1. HERO BANNER — Real Team Photo Background & Reduced Text so Photo is Visible */}
      <section style={{
        position: 'relative',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        borderBottom: '2px solid rgba(255,208,0,0.25)',
        background: '#040604'
      }}>
        {/* Visible Background Team Photo */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('/images/team-photo.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 28%',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.6) saturate(1.15)', // Reduced darkening so players are clearly visible
          transform: 'scale(1.02)'
        }} />

        {/* Subtle Pitch-Black Vignette Overlay (Leaves center-top clear for the photo) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.95) 100%)'
        }} />

        {/* Ambient Bottom Highlight Bar */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #4ade80 0%, var(--color-gold-primary) 50%, #fb7185 100%)'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '4rem 1.5rem 3.5rem' }}>
          <div style={{ maxWidth: '720px' }}>
            {/* Dual Logo Pill Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(5, 10, 6, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,208,0,0.3)',
              borderRadius: '60px',
              padding: '4px 14px 4px 5px',
              marginBottom: '1.25rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.6)'
            }}>
              <img
                src="/logos/fackson-next-pro.jpg"
                alt="Next Pro"
                style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #4ade80' }}
              />
              <img
                src="/logos/fackson-angels.jpg"
                alt="Angels"
                style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #fb7185' }}
              />
              <span style={{ fontSize: '0.74rem', color: 'var(--color-gold-primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Fackson Next Pro &bull; Angels &bull; Est. 1998
              </span>
            </div>

            {/* Original Hero Headline — Compact Size */}
            <h1 style={{
              fontSize: 'clamp(1.75rem, 3.8vw, 2.75rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: '0.85rem',
              letterSpacing: '-0.02em',
              textShadow: '0 2px 18px rgba(0,0,0,0.95)'
            }}>
              CRAFTING CHAMPIONS IN <span className="text-gradient-gold">MEN &amp; WOMEN'S</span> FOOTBALL
            </h1>

            {/* Compact Subtitle */}
            <p style={{
              fontSize: 'clamp(0.88rem, 1.5vw, 1.05rem)',
              color: '#e2e8f0',
              lineHeight: 1.6,
              marginBottom: '1.75rem',
              maxWidth: '600px',
              textShadow: '0 1px 12px rgba(0,0,0,0.95)'
            }}>
              Fackson Next Pro (Men) &amp; Fackson Angels (Women). Grassroots football academy delivering elite technical coaching, character development, and professional European pathways at Meiran Field Estate, Alagbado.
            </p>

            {/* Primary CTAs: Register for Trials & View Fixtures & WhatsApp */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', alignItems: 'center' }}>
              <button
                className="btn btn-gold btn-sm"
                onClick={() => setCurrentTab('join')}
                style={{ padding: '0.75rem 1.75rem', fontSize: '0.9rem', fontWeight: 800 }}
              >
                <span>Register for Trials</span>
                <ArrowRight size={16} />
              </button>

              <button
                className="btn btn-outline btn-sm"
                onClick={() => setCurrentTab('matches')}
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.9rem',
                  borderColor: 'rgba(255,255,255,0.25)',
                  background: 'rgba(0,0,0,0.4)',
                  backdropFilter: 'blur(8px)'
                }}
              >
                <Calendar size={16} color="var(--color-gold-primary)" />
                <span>View Fixtures</span>
              </button>
              <a
                href={coachWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm"
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.9rem',
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  color: '#fff',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderRadius: '50px',
                  fontWeight: 800,
                  boxShadow: '0 4px 16px rgba(37,211,102,0.4)'
                }}
              >
                <MessageCircle size={16} />
                <span>WhatsApp Coach</span>
              </a>


            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE ACADEMY PILLARS STRIP — 4 Value Cards */}
      <section style={{
        background: '#070907',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '2.5rem 0'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem'
          }}>
            {[
              {
                icon: <Trophy size={24} color="var(--color-gold-primary)" />,
                title: 'Elite Coaching',
                desc: 'Led by Coach Farouk Yusuf "Ajobi" since 1998 with UEFA-influenced grassroots methodologies.',
                border: 'rgba(255, 208, 0, 0.3)'
              },
              {
                icon: <MapPin size={24} color="#4ade80" />,
                title: 'Meiran Field Estate Grounds',
                desc: 'Dedicated home pitch at Meiran Field Estate, Alagbado. Training: Tuesday, Thursday & Saturday (Morning 6:45 AM – 11:00 AM).',
                border: 'rgba(74, 222, 128, 0.3)'
              },
              {
                icon: <Award size={24} color="#38bdf8" />,
                title: 'European Scout Pathway',
                desc: 'Direct transfers into European leagues (Slovenia PrvaLiga) & Nigerian National Youth teams.',
                border: 'rgba(56, 189, 248, 0.3)'
              },
              {
                icon: <Activity size={24} color="#fb7185" />,
                title: 'Live Mobile Updates',
                desc: 'Real-time pitchside match scores, announcement marquee ticker, and instant coach contact.',
                border: 'rgba(251, 113, 133, 0.3)'
              }
            ].map(pillar => (
              <div
                key={pillar.title}
                style={{
                  background: '#0a0d0a',
                  border: `1px solid ${pillar.border}`,
                  borderRadius: '14px',
                  padding: '1.5rem',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <div style={{ marginBottom: '0.85rem' }}>{pillar.icon}</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', marginBottom: '0.35rem' }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SQUADS HIGHLIGHT — Quick preview of divisions (U-10 through Senior) */}
      <section style={{ padding: '4rem 0 3.5rem', background: '#030503' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2.5rem'
          }}>
            <div>
              <span className="section-tag">Active Squad Divisions</span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900 }}>
                MEN &amp; WOMEN ROSTER TIERS
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', maxWidth: '600px', margin: 0 }}>
                From our foundational grassroot Under-10 prospects to professional Senior squads competing in State and National tournaments.
              </p>
            </div>

            <button
              className="btn btn-outline btn-sm"
              onClick={() => setCurrentTab('squads')}
              style={{ borderColor: 'var(--color-gold-primary)', color: 'var(--color-gold-primary)' }}
            >
              <span>Explore All Squads</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Division Tiers Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '1.25rem'
          }}>
            {[
              { tier: 'Under 10 (U-10)', ages: 'Ages 7–10', focus: 'Ball Mastery & Fun Drills', badge: 'Next Pro & Angels', color: '#4ade80' },
              { tier: 'Under 13 (U-13)', ages: 'Ages 11–13', focus: 'Tactical Awareness & Passing', badge: 'Next Pro & Angels', color: 'var(--color-gold-primary)' },
              { tier: 'Under 15 (U-15)', ages: 'Ages 14–15', focus: 'Position Clinics & Strength', badge: 'Next Pro & Angels', color: '#38bdf8' },
              { tier: 'Under 17 (U-17)', ages: 'Ages 16–17', focus: 'Competitive Match Play', badge: 'Next Pro & Angels', color: '#a78bfa' },
              { tier: 'Senior / Free Age', ages: 'Ages 18+', focus: 'Professional & League Squads', badge: 'Next Pro & Angels', color: '#fb7185' }
            ].map(div => (
              <div
                key={div.tier}
                onClick={() => setCurrentTab('squads')}
                style={{
                  background: '#080c08',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transition: 'transform 0.25s ease, border-color 0.25s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                className="division-tier-card"
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: div.color
                }} />

                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  color: div.color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {div.badge}
                </span>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', margin: '0.5rem 0 0.25rem' }}>
                  {div.tier}
                </h3>

                <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, marginBottom: '0.75rem' }}>
                  {div.ages}
                </div>

                <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.4, margin: 0 }}>
                  {div.focus}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ALUMNI & SCOUTING SHOWCASE — Real European Players */}
      <AlumniSection onNavigate={setCurrentTab} />

      {/* 4b. COACHING TEAM SECTION */}
      <CoachesSection />

      {/* 5. GALLERY TEASER */}
      <section style={{ padding: '3.5rem 0', background: '#050705', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div>
              <span className="section-tag">Visual Archives</span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900 }}>
                TRAINING &amp; MATCHDAY MOMENTS
              </h2>
            </div>

            <button
              className="btn btn-outline btn-sm"
              onClick={() => setCurrentTab('gallery')}
              style={{ borderColor: 'rgba(255,255,255,0.2)' }}
            >
              <span>View Full Gallery</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {teaserGallery.map(item => (
              <div
                key={item._id}
                onClick={() => onOpenLightbox(item)}
                style={{
                  position: 'relative',
                  height: '240px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
                className="gallery-teaser-item"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.25rem'
                }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--color-gold-primary)', textTransform: 'uppercase' }}>
                    {item.category?.toUpperCase() || 'PITCHSIDE'}
                  </span>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#fff' }}>
                    {item.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LATEST ACADEMY NEWS & ANNOUNCEMENTS */}
      <section style={{ padding: '3.5rem 0', background: '#000000' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div>
              <span className="section-tag">Academy Announcements</span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900 }}>
                LATEST PITCHSIDE NEWS
              </h2>
            </div>

            <button
              className="btn btn-outline btn-sm"
              onClick={() => setCurrentTab('news')}
            >
              <span>View All News</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {activeNews.map(item => (
              <div
                key={item._id}
                style={{
                  background: '#080a08',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{
                      background: 'rgba(255,208,0,0.12)',
                      color: 'var(--color-gold-primary)',
                      padding: '2px 8px',
                      borderRadius: '50px',
                      fontSize: '0.7rem',
                      fontWeight: 700
                    }}>
                      {item.category?.toUpperCase() || 'ANNOUNCEMENT'}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', lineHeight: 1.35, marginBottom: '0.5rem' }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                    {item.summary || item.content.slice(0, 110) + '...'}
                  </p>
                </div>

                <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <button
                    onClick={() => setCurrentTab('news')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-gold-primary)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    <span>Read Full Story</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. MEIRAN FIELD ESTATE FACILITY & LOCATION MAP */}
      <MapSection />

      <style>{`
        .division-tier-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 208, 0, 0.35) !important;
        }
        .gallery-teaser-item:hover img {
          transform: scale(1.06);
        }
      `}</style>
    </div>
  );
};

// Also export as HomePage for consistency
export const HomePage = Home;
