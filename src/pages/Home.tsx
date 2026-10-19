import React, { useState } from 'react';
import { Trophy, Users, Shield, ArrowRight, Calendar, Star, CheckCircle2, Award, ChevronRight, MapPin, Activity, Sparkles, Video, MessageCircle, Clock, Radio } from 'lucide-react';
import { Player, GalleryItem, NewsItem, MatchItem, AcademyType, AgeCategory } from '../types';
import { AlumniSection } from '../components/AlumniSection';
import { CoachesSection } from '../components/CoachesSection';
import { MapSection } from '../components/MapSection';
import { LiveScoreCard } from '../components/LiveScoreCard';
import { getMediaUrl } from '../services/api';

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
  // Demo fallback fixtures if database has sparse records
  const demoFallbackMatches: MatchItem[] = [
    {
      _id: 'home-m-live',
      homeTeam: 'Fackson Next Pro',
      awayTeam: 'Lagos City All-Stars',
      homeScore: 2,
      awayScore: 1,
      status: 'live',
      date: 'Today',
      time: "68' 2nd Half",
      venue: 'Meiran Field Estate, Alagbado',
      competition: 'Lagos State Elite Grassroots League',
      gameType: '11 v 11',
      academy: 'next_pro',
      category: 'free_age',
      scorers: ["Papa Daniel 24'", "Lawal Seun 58'", "K. Adeleke 41' (Pen)"]
    },
    {
      _id: 'home-m-up-1',
      homeTeam: 'Fackson Angels',
      awayTeam: 'Ikeja Queens FC',
      status: 'upcoming',
      date: 'Saturday, Oct 18, 2026',
      time: '10:00 AM',
      venue: 'Meiran Field Estate Pitch 1, Alagbado',
      competition: 'Lagos State Women Cup — Group Stage',
      gameType: '11 v 11',
      academy: 'angels',
      category: 'u17'
    },
    {
      _id: 'home-m-up-2',
      homeTeam: 'Fackson Next Pro U-15',
      awayTeam: 'Ogun Youth FA',
      status: 'upcoming',
      date: 'Sunday, Oct 19, 2026',
      time: '2:30 PM',
      venue: 'Meiran Field Estate Stadium, Alagbado',
      competition: 'South-West Grassroots Cup',
      gameType: '11 v 11',
      academy: 'next_pro',
      category: 'u15'
    },
    {
      _id: 'home-m-up-3',
      homeTeam: 'Agege Warriors',
      awayTeam: 'Fackson Next Pro U-13',
      status: 'upcoming',
      date: 'Wednesday, Oct 22, 2026',
      time: '4:00 PM',
      venue: 'Agege Township Stadium, Lagos',
      competition: 'Lagos Junior Youth League',
      gameType: '11 v 11',
      academy: 'next_pro',
      category: 'u13'
    },
    {
      _id: 'home-m-res-1',
      homeTeam: 'Fackson Next Pro',
      awayTeam: 'Alagbado United',
      homeScore: 3,
      awayScore: 0,
      status: 'completed',
      date: 'Oct 8, 2026',
      time: 'FT',
      venue: 'Meiran Field Estate, Alagbado',
      competition: 'Lagos State FA Pre-Season Cup',
      gameType: '11 v 11',
      academy: 'next_pro',
      category: 'free_age',
      scorers: ["Papa Daniel 12', 64'", "O. Ibrahim 82'"]
    },
    {
      _id: 'home-m-res-2',
      homeTeam: 'Fackson Angels U-17',
      awayTeam: 'Surulere Diamond Ladies',
      homeScore: 2,
      awayScore: 0,
      status: 'completed',
      date: 'Oct 3, 2026',
      time: 'FT',
      venue: 'Meiran Field Estate, Alagbado',
      competition: 'Youth Invitational Cup',
      gameType: '11 v 11',
      academy: 'angels',
      category: 'u17',
      scorers: ["Shuaib Fatimo 31', 55'"]
    }
  ];

  const allHomeMatches: MatchItem[] = matches && matches.length > 0 ? matches : demoFallbackMatches;
  const [matchTab, setMatchTab] = useState<'all' | 'live' | 'upcoming' | 'completed'>('all');
  const [matchAcademyFilter, setMatchAcademyFilter] = useState<'all' | AcademyType>('all');

  const liveMatches = allHomeMatches.filter(m => m.status === 'live');
  const upcomingMatches = allHomeMatches.filter(m => m.status === 'upcoming');
  const completedMatches = allHomeMatches.filter(m => m.status === 'completed');

  const filteredHomeMatches = allHomeMatches.filter(m => {
    if (matchTab !== 'all' && m.status !== matchTab) return false;
    if (matchAcademyFilter !== 'all' && m.academy !== matchAcademyFilter) return false;
    return true;
  });

  // Blend match fixtures into pitchside news feed so fixtures display as news on the website
  const matchNewsTeasers: NewsItem[] = allHomeMatches.slice(0, 2).map(m => {
    const isHomeFackson = (m.homeTeam || '').toLowerCase().includes('fackson');
    const isAwayFackson = (m.awayTeam || '').toLowerCase().includes('fackson');
    const matchType = isHomeFackson ? 'Home Fixture' : isAwayFackson ? 'Away Fixture' : 'Showcase';
    return {
      _id: `home-match-news-${m._id}`,
      title: `MATCH FIXTURE: ${m.homeTeam} vs ${m.awayTeam} (${m.gameType || '11 v 11'})`,
      slug: `match-${m._id}`,
      excerpt: `${matchType} on ${m.date} at ${m.time} WAT • Venue: ${m.venue || 'Meiran Field Estate'} • Format: ${m.gameType || '11 v 11'}`,
      content: `Official Match Bulletin: ${m.homeTeam} vs ${m.awayTeam} at ${m.venue || 'Meiran Field Estate'} on ${m.date} at ${m.time}.`,
      coverImage: (isHomeFackson ? m.homeLogo : m.awayLogo) || m.homeLogo || m.awayLogo || '/logos/fackson-next-pro.jpg',
      category: 'match_fixture',
      academy: m.academy,
      author: 'Fackson FA Match Desk',
      date: m.date,
      featured: true
    };
  });

  const activeNews = [...matchNewsTeasers, ...news].slice(0, 3);
  const teaserGallery = gallery.slice(0, 3);

  const ceoWhatsAppUrl = `https://wa.me/2348029745452?text=${encodeURIComponent(
    'Hello CEO Farouk Yusuf, I would like to inquire about Fackson Football Academy trials and training schedule (U10-U15: Mon-Fri 4:00 PM – 6:00 PM, Sat-Sun 11:00 AM – 2:00 PM; Free-age: Mon-Fri 6:45 AM – 11:00 AM) at Meiran Field Estate - Ojokoro Housing Estate Field, Meiran Alagbado.'
  )}`;

  return (
    <div className="page-wrapper" style={{ background: 'var(--bg-main, #000000)', color: 'var(--color-cream, #fff)' }}>
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
              CRAFTING CHAMPIONS IN <span className="text-gradient-gold">MALE &amp; FEMALE</span> FOOTBALL
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
              Fackson Next Pro (Male) &amp; Fackson Angels (Female). Grassroots football academy delivering elite technical coaching, character development, and professional European pathways at Meiran Field Estate - Ojokoro Housing Estate Field, Meiran Alagbado.
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
                href={ceoWhatsAppUrl}
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
                <span>WhatsApp CEO</span>
              </a>


            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE ACADEMY PILLARS STRIP — 4 Value Cards */}
      <section 
        className="home-pillars-section"
        style={{
          background: 'var(--bg-surface-1, #070907)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '2.5rem 0'
        }}
      >
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
                title: 'Ojokoro Housing Estate Field',
                desc: 'Home pitch at Meiran Field Estate - Ojokoro Housing Estate Field, Meiran Alagbado. Training: U10–U15 (Mon–Fri 4–6 PM, Sat–Sun 11 AM–2 PM) & Free-age (Mon–Fri 6:45–11 AM).',
                border: 'rgba(74, 222, 128, 0.3)'
              },
              {
                icon: <Award size={24} color="#38bdf8" />,
                title: 'European Scout Pathway',
                desc: 'Direct transfers into European leagues (Slovenia PrvaLiga, Turkey TFF 1. Lig) & Nigerian National Youth teams.',
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
                className="home-pillar-card"
                style={{
                  background: 'var(--bg-surface-2, #0a0d0a)',
                  border: `1px solid ${pillar.border}`,
                  borderRadius: '14px',
                  padding: '1.5rem',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <div style={{ marginBottom: '0.85rem' }}>{pillar.icon}</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-cream, #fff)', marginBottom: '0.35rem' }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-cream-subtle, #94a3b8)', lineHeight: 1.5, margin: 0 }}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2.5 PITCHSIDE MATCH CENTER — Live Match Display, Upcoming Fixtures & Match Results */}
      <section 
        className="home-match-center-section"
        style={{
          padding: '3.75rem 0 3.25rem',
          background: 'var(--bg-main, #050505)',
          borderBottom: '1px solid var(--border-subtle)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle ambient pitch background glow */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.08) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 208, 0, 0.07) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Header Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                borderRadius: '50px',
                padding: '4px 14px',
                marginBottom: '0.85rem'
              }}>
                <span style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#ef4444',
                  boxShadow: '0 0 8px #ef4444',
                  animation: 'pulse 1.5s infinite'
                }} />
                <span style={{
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  color: '#f87171',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em'
                }}>
                  Pitchside Match Center
                </span>
              </div>

              <h2 style={{
                fontSize: 'clamp(1.6rem, 3.2vw, 2.5rem)',
                fontWeight: 900,
                color: 'var(--color-cream, #fff)',
                lineHeight: 1.15,
                margin: '0 0 0.5rem'
              }}>
                UPCOMING FIXTURES, RESULTS &amp; <span className="text-gradient-gold">LIVE ACTION</span>
              </h2>
              <p style={{ color: 'var(--color-cream-subtle, #94a3b8)', fontSize: '0.9rem', maxWidth: '640px', margin: 0, lineHeight: 1.5 }}>
                Direct updates for fans, scouts, and parents. Watch live in-play matches, discover upcoming tournament fixtures, and explore final scores at Meiran Field Estate.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                className="btn btn-gold btn-sm"
                onClick={() => setCurrentTab('matches')}
                style={{
                  padding: '0.65rem 1.4rem',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Calendar size={15} />
                <span>Full Match Center</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* 1. Live Match Spotlight (if live match exists or fallback live snapshot) */}
          {liveMatches.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.75rem',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Radio size={16} color="#ef4444" style={{ animation: 'pulse 1.5s infinite' }} />
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#f87171', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Live Match Broadcast Display
                  </span>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  Real-time pitchside action at Meiran Field Estate
                </span>
              </div>
              <LiveScoreCard matches={allHomeMatches} onViewMatches={() => setCurrentTab('matches')} />
            </div>
          )}

          {/* 2. Interactive Navigation Tabs & Academy Filter Pills */}
          <div 
            className="match-center-filter-bar"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              padding: '0.85rem 1.1rem',
              background: 'var(--bg-surface-1, rgba(10, 16, 11, 0.75))',
              border: '1px solid var(--border-subtle)',
              borderRadius: '14px',
              marginBottom: '1.5rem',
              backdropFilter: 'blur(8px)'
            }}
          >
            {/* Status Filter Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: '🔥 All Fixtures', count: allHomeMatches.length },
                { id: 'live', label: '🔴 Live Now', count: liveMatches.length },
                { id: 'upcoming', label: '📅 Upcoming', count: upcomingMatches.length },
                { id: 'completed', label: '🏆 Results (FT)', count: completedMatches.length }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setMatchTab(tab.id as any)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '50px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: matchTab === tab.id
                      ? '1px solid var(--color-gold-primary)'
                      : '1px solid rgba(255,255,255,0.08)',
                    background: matchTab === tab.id
                      ? 'rgba(255, 208, 0, 0.18)'
                      : 'rgba(255, 255, 255, 0.03)',
                    color: matchTab === tab.id ? 'var(--color-gold-primary)' : '#94a3b8'
                  }}
                >
                  {tab.label} <span style={{ opacity: 0.7, fontSize: '0.72rem', marginLeft: '3px' }}>({tab.count})</span>
                </button>
              ))}
            </div>

            {/* Academy Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Roster:</span>
              <button
                onClick={() => setMatchAcademyFilter('all')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: matchAcademyFilter === 'all' ? '1px solid #4ade80' : '1px solid rgba(255,255,255,0.08)',
                  background: matchAcademyFilter === 'all' ? 'rgba(74, 222, 128, 0.15)' : 'transparent',
                  color: matchAcademyFilter === 'all' ? '#4ade80' : '#94a3b8'
                }}
              >
                All
              </button>
              <button
                onClick={() => setMatchAcademyFilter('next_pro')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: matchAcademyFilter === 'next_pro' ? '1px solid #4ade80' : '1px solid rgba(255,255,255,0.08)',
                  background: matchAcademyFilter === 'next_pro' ? 'rgba(74, 222, 128, 0.15)' : 'transparent',
                  color: matchAcademyFilter === 'next_pro' ? '#4ade80' : '#94a3b8'
                }}
              >
                Next Pro (Male)
              </button>
              <button
                onClick={() => setMatchAcademyFilter('angels')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: matchAcademyFilter === 'angels' ? '1px solid #fb7185' : '1px solid rgba(255,255,255,0.08)',
                  background: matchAcademyFilter === 'angels' ? 'rgba(251, 113, 133, 0.15)' : 'transparent',
                  color: matchAcademyFilter === 'angels' ? '#fb7185' : '#94a3b8'
                }}
              >
                Angels (Female)
              </button>
            </div>
          </div>

          {/* 3. Match Cards Showcase Grid */}
          <div className="match-grid-large">
            {filteredHomeMatches.slice(0, 4).map(m => {
              const isHomeFackson = (m.homeTeam || '').toLowerCase().includes('fackson');
              const isAwayFackson = (m.awayTeam || '').toLowerCase().includes('fackson');
              const homeLogoSrc = m.homeLogo
                ? getMediaUrl(m.homeLogo)
                : isHomeFackson
                  ? (m.academy === 'angels' ? '/logos/fackson-angels.jpg' : '/logos/fackson-next-pro.jpg')
                  : '';
              const awayLogoSrc = m.awayLogo
                ? getMediaUrl(m.awayLogo)
                : isAwayFackson
                  ? (m.academy === 'angels' ? '/logos/fackson-angels.jpg' : '/logos/fackson-next-pro.jpg')
                  : '';

              return (
                <div key={m._id} className="match-card-large">
                  {/* Status Strip */}
                  <div className={`match-card-large-strip ${m.status}`} />

                  {/* Top Meta Bar */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.4rem',
                    marginBottom: '0.65rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <span style={{
                        color: 'var(--color-gold-primary)',
                        fontWeight: 800,
                        fontSize: '0.78rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em'
                      }}>
                        {m.competition || 'Youth Elite Championship'}
                      </span>
                      <span className="game-type-chip" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                        ⚽ {m.gameType || '11 v 11'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span className="badge badge-navy" style={{ fontSize: '0.68rem', padding: '2px 6px' }}>
                        {m.category === 'free_age' ? 'Senior' : m.category.toUpperCase()}
                      </span>
                      <span style={{
                        background: m.status === 'live'
                          ? 'rgba(239,68,68,0.2)'
                          : m.status === 'completed'
                          ? 'rgba(34,197,94,0.15)'
                          : 'rgba(255,208,0,0.15)',
                        color: m.status === 'live'
                          ? '#ef4444'
                          : m.status === 'completed'
                          ? '#4ade80'
                          : 'var(--color-gold-primary)',
                        border: '1px solid',
                        borderColor: m.status === 'live'
                          ? 'rgba(239,68,68,0.45)'
                          : m.status === 'completed'
                          ? 'rgba(34,197,94,0.45)'
                          : 'rgba(255,208,0,0.45)',
                        padding: '2px 8px',
                        borderRadius: '50px',
                        fontWeight: 800,
                        fontSize: '0.68rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em'
                      }}>
                        {m.status === 'live' ? '🔴 Live In-Play' : m.status === 'completed' ? 'Full Time' : 'Upcoming'}
                      </span>
                    </div>
                  </div>

                  {/* Team Crests & Scoreboard */}
                  <div className="match-teams-showcase">
                    {/* Home Team */}
                    <div className="team-box">
                      <div className="team-crest-wrapper">
                        {homeLogoSrc ? (
                          <img
                            src={homeLogoSrc}
                            alt={m.homeTeam}
                            className="team-crest-img"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              if (isHomeFackson) {
                                const fallback = m.academy === 'angels' ? '/logos/fackson-angels.jpg' : '/logos/fackson-next-pro.jpg';
                                if (!target.src.includes(fallback)) target.src = fallback;
                              } else {
                                target.style.display = 'none';
                                if (target.nextElementSibling) {
                                  (target.nextElementSibling as HTMLElement).style.display = 'flex';
                                }
                              }
                            }}
                          />
                        ) : null}
                        <div style={{
                          display: homeLogoSrc ? 'none' : 'flex',
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          background: '#131e2b',
                          border: '1px solid rgba(255, 208, 0, 0.4)',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Shield size={24} color={isHomeFackson ? 'var(--color-gold-primary)' : '#94a3b8'} />
                        </div>
                      </div>
                      <div className="team-title-large" style={{ fontSize: '0.82rem' }}>
                        {m.homeTeam}
                      </div>
                      {isHomeFackson ? (
                        <span className={`badge ${m.academy === 'angels' ? 'badge-gold' : 'badge-green'}`} style={{ fontSize: '0.62rem', padding: '1px 6px' }}>
                          {m.academy === 'angels' ? 'Angels' : 'Next Pro'}
                        </span>
                      ) : (
                        <span className="badge badge-navy" style={{ fontSize: '0.62rem', padding: '1px 6px' }}>
                          Home
                        </span>
                      )}
                    </div>

                    {/* Center Score / Kickoff */}
                    <div className="match-center-board">
                      {m.status === 'completed' ? (
                        <>
                          <div className="score-badge-large" style={{ fontSize: '1.4rem', padding: '4px 12px' }}>
                            {m.homeScore ?? 0} : {m.awayScore ?? 0}
                          </div>
                          <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#4ade80', letterSpacing: '0.06em', marginTop: '4px' }}>
                            FINAL SCORE
                          </span>
                          <span style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '2px' }}>
                            {m.date}
                          </span>
                        </>
                      ) : m.status === 'live' ? (
                        <>
                          <div className="score-badge-large live" style={{ fontSize: '1.4rem', padding: '4px 12px', background: 'rgba(239,68,68,0.2)', borderColor: '#ef4444', color: '#fff' }}>
                            {m.homeScore ?? 0} : {m.awayScore ?? 0}
                          </div>
                          <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#ef4444', letterSpacing: '0.06em', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#ef4444', animation: 'pulse 1.5s infinite' }} />
                            {m.time || 'LIVE'}
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="vs-badge" style={{ fontSize: '0.85rem' }}>VS</div>
                          <div className="kickoff-time" style={{ fontSize: '0.85rem', fontWeight: 800, marginTop: '4px' }}>
                            {m.time}
                          </div>
                          <div className="kickoff-date" style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px' }}>
                            {m.date}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Away Team */}
                    <div className="team-box">
                      <div className="team-crest-wrapper">
                        {awayLogoSrc ? (
                          <img
                            src={awayLogoSrc}
                            alt={m.awayTeam}
                            className="team-crest-img"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              if (isAwayFackson) {
                                const fallback = m.academy === 'angels' ? '/logos/fackson-angels.jpg' : '/logos/fackson-next-pro.jpg';
                                if (!target.src.includes(fallback)) target.src = fallback;
                              } else {
                                target.style.display = 'none';
                                if (target.nextElementSibling) {
                                  (target.nextElementSibling as HTMLElement).style.display = 'flex';
                                }
                              }
                            }}
                          />
                        ) : null}
                        <div style={{
                          display: awayLogoSrc ? 'none' : 'flex',
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          background: '#131e2b',
                          border: '1px solid rgba(255, 208, 0, 0.4)',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Shield size={24} color={isAwayFackson ? 'var(--color-gold-primary)' : '#94a3b8'} />
                        </div>
                      </div>
                      <div className="team-title-large" style={{ fontSize: '0.82rem' }}>
                        {m.awayTeam}
                      </div>
                      {isAwayFackson ? (
                        <span className={`badge ${m.academy === 'angels' ? 'badge-gold' : 'badge-green'}`} style={{ fontSize: '0.62rem', padding: '1px 6px' }}>
                          {m.academy === 'angels' ? 'Angels' : 'Next Pro'}
                        </span>
                      ) : (
                        <span className="badge badge-navy" style={{ fontSize: '0.62rem', padding: '1px 6px' }}>
                          Away
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Scorers Strip if completed or live */}
                  {m.scorers && m.scorers.length > 0 && (
                    <div style={{
                      fontSize: '0.72rem',
                      color: '#cbd5e1',
                      padding: '4px 8px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '6px',
                      marginBottom: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      <span style={{ color: 'var(--color-gold-primary)', fontWeight: 800 }}>⚽ Scorers:</span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {m.scorers.join(' • ')}
                      </span>
                    </div>
                  )}

                  {/* Venue & Link Footer */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 'auto',
                    paddingTop: '0.5rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    fontSize: '0.72rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      color: '#94a3b8',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '70%'
                    }}>
                      <MapPin size={13} color="#4ade80" style={{ flexShrink: 0 }} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {m.venue || 'Meiran Field Estate, Alagbado'}
                      </span>
                    </div>

                    <button
                      onClick={() => setCurrentTab('matches')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-gold-primary)',
                        fontWeight: 800,
                        cursor: 'pointer',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                        fontSize: '0.72rem'
                      }}
                    >
                      <span>Match Info</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 4. Bottom Fan Access Bar */}
          <div style={{
            marginTop: '2rem',
            background: 'linear-gradient(135deg, rgba(8, 22, 14, 0.9) 0%, rgba(14, 18, 14, 0.95) 100%)',
            border: '1px solid rgba(255, 208, 0, 0.25)',
            borderRadius: '16px',
            padding: '1.25rem 1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
          }}>
            <div style={{ maxWidth: '600px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <MapPin size={16} color="var(--color-gold-primary)" />
                <span style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem' }}>
                  Matches &amp; Training at Meiran Field Estate
                </span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: 0 }}>
                Meiran Field Estate - Ojokoro Housing Estate Field, Meiran Alagbado, Lagos State. Weekend league fixtures &amp; open scouting showcases.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                className="btn btn-gold btn-sm"
                onClick={() => setCurrentTab('matches')}
                style={{ padding: '0.65rem 1.25rem', fontSize: '0.82rem', fontWeight: 800 }}
              >
                <span>View Full Fixture Schedule</span>
                <ArrowRight size={14} />
              </button>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => setCurrentTab('join')}
                style={{ padding: '0.65rem 1.25rem', fontSize: '0.82rem', borderColor: '#4ade80', color: '#4ade80' }}
              >
                <span>Register for Trials</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SQUADS HIGHLIGHT — Quick preview of divisions (U-10 through Senior) */}
      <section 
        className="home-squads-section"
        style={{ padding: '4rem 0 3.5rem', background: 'var(--bg-surface-1, #030503)' }}
      >
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
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, color: 'var(--color-cream, #fff)' }}>
                MALE &amp; FEMALE ROSTER TIERS
              </h2>
              <p style={{ color: 'var(--color-cream-subtle, #94a3b8)', fontSize: '0.9rem', maxWidth: '600px', margin: 0 }}>
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
                  background: 'var(--bg-surface-2, #080c08)',
                  border: '1px solid var(--border-subtle)',
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

                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-cream, #fff)', margin: '0.5rem 0 0.25rem' }}>
                  {div.tier}
                </h3>

                <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, marginBottom: '0.75rem' }}>
                  {div.ages}
                </div>

                <p style={{ fontSize: '0.8rem', color: 'var(--color-cream-subtle, #cbd5e1)', lineHeight: 1.4, margin: 0 }}>
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
      <section 
        className="home-gallery-section"
        style={{ padding: '3.5rem 0', background: 'var(--bg-main, #050705)', borderTop: '1px solid var(--border-subtle)' }}
      >
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
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: 'var(--color-cream, #fff)' }}>
                TRAINING &amp; MATCHDAY MOMENTS
              </h2>
            </div>

            <button
              className="btn btn-outline btn-sm"
              onClick={() => setCurrentTab('gallery')}
              style={{ borderColor: 'var(--border-subtle)' }}
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
                  border: '1px solid var(--border-subtle)'
                }}
                className="gallery-teaser-item"
              >
                <img
                  src={getMediaUrl(item.imageUrl, '/logos/fackson-next-pro.jpg')}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const fallback = item.academy === 'angels' ? '/logos/fackson-angels.jpg' : '/logos/fackson-next-pro.jpg';
                    if (!target.src.includes(fallback)) {
                      target.src = fallback;
                    }
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
      <section 
        className="home-news-section"
        style={{ padding: '3.5rem 0', background: 'var(--bg-surface-1, #000000)' }}
      >
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
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: 'var(--color-cream, #fff)' }}>
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
                className="home-news-card"
                style={{
                  background: 'var(--bg-surface-2, #080a08)',
                  border: '1px solid var(--border-subtle)',
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

                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-cream, #fff)', lineHeight: 1.35, marginBottom: '0.5rem' }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: '0.82rem', color: 'var(--color-cream-subtle, #94a3b8)', lineHeight: 1.5, margin: 0 }}>
                    {item.summary || item.content.slice(0, 110) + '...'}
                  </p>
                </div>

                <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
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
