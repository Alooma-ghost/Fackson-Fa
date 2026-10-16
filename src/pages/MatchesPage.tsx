import React, { useState } from 'react';
import { MatchItem, AcademyType, AgeCategory } from '../types';
import { Calendar, Trophy, Shield, MapPin, Clock, Award, Star, Activity, CheckCircle, Flag } from 'lucide-react';
import { LiveScoreCard } from '../components/LiveScoreCard';
import { getMediaUrl } from '../services/api';

interface MatchesPageProps {
  matches: MatchItem[];
  openRegistration: () => void;
}

export const MatchesPage: React.FC<MatchesPageProps> = ({ matches, openRegistration }) => {
  const [filterType, setFilterType] = useState<'all' | 'live' | 'upcoming' | 'completed'>('all');
  const [academyFilter, setAcademyFilter] = useState<'all' | AcademyType>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | AgeCategory>('all');

  // Fallback demo fixtures if database has sparse records
  const allMatches: MatchItem[] = matches.length > 0 ? matches : [
    {
      _id: 'm-live',
      homeTeam: 'Fackson Next Pro',
      awayTeam: 'Lagos City All-Stars',
      homeScore: 2,
      awayScore: 1,
      status: 'live',
      date: 'Today',
      time: '68\' 2nd Half',
      venue: 'Meiran Field Estate, Alagbado',
      competition: 'Lagos State Elite Grassroots League',
      academy: 'next_pro',
      category: 'free_age',
      scorers: ['Papa Daniel 24\'', 'Lawal Seun 58\'', 'K. Adeleke 41\' (Pen)']
    },
    {
      _id: 'm-up-1',
      homeTeam: 'Fackson Angels',
      awayTeam: 'Ikeja Queens FC',
      homeScore: undefined,
      awayScore: undefined,
      status: 'upcoming',
      date: 'Saturday, Oct 18, 2026',
      time: '10:00 AM',
      venue: 'Meiran Field Estate Pitch 1, Alagbado',
      competition: 'Lagos State Women Cup — Group Stage',
      academy: 'angels',
      category: 'u17'
    },
    {
      _id: 'm-up-2',
      homeTeam: 'Fackson Next Pro U-15',
      awayTeam: 'Ogun Youth FA',
      homeScore: undefined,
      awayScore: undefined,
      status: 'upcoming',
      date: 'Sunday, Oct 19, 2026',
      time: '2:30 PM',
      venue: 'Meiran Field Estate Stadium, Alagbado',
      competition: 'South-West Grassroots Cup',
      academy: 'next_pro',
      category: 'u15'
    },
    {
      _id: 'm-up-3',
      homeTeam: 'Agege Warriors',
      awayTeam: 'Fackson Next Pro U-13',
      homeScore: undefined,
      awayScore: undefined,
      status: 'upcoming',
      date: 'Wednesday, Oct 22, 2026',
      time: '4:00 PM',
      venue: 'Agege Township Stadium, Lagos',
      competition: 'Lagos Junior Youth League',
      academy: 'next_pro',
      category: 'u13'
    },
    {
      _id: 'm-res-1',
      homeTeam: 'Fackson Next Pro',
      awayTeam: 'Alagbado United',
      homeScore: 3,
      awayScore: 0,
      status: 'completed',
      date: 'Oct 8, 2026',
      time: 'FT',
      venue: 'Meiran Field Estate, Alagbado',
      competition: 'Lagos State FA Pre-Season Cup',
      academy: 'next_pro',
      category: 'free_age',
      scorers: ['Papa Daniel 12\', 64\'', 'O. Ibrahim 82\'']
    },
    {
      _id: 'm-res-2',
      homeTeam: 'Fackson Angels U-17',
      awayTeam: 'Surulere Diamond Ladies',
      homeScore: 2,
      awayScore: 0,
      status: 'completed',
      date: 'Oct 3, 2026',
      time: 'FT',
      venue: 'Meiran Field Estate, Alagbado',
      competition: 'Youth Invitational Cup',
      academy: 'angels',
      category: 'u17',
      scorers: ['Shuaib Fatimo 31\', 55\'']
    }
  ];

  const filteredMatches = allMatches.filter(m => {
    if (filterType !== 'all' && m.status !== filterType) return false;
    if (academyFilter !== 'all' && m.academy !== academyFilter) return false;
    if (categoryFilter !== 'all' && m.category !== categoryFilter) return false;
    return true;
  });

  const liveMatches = allMatches.filter(m => m.status === 'live');
  const upcomingMatches = allMatches.filter(m => m.status === 'upcoming');
  const completedMatches = allMatches.filter(m => m.status === 'completed');

  return (
    <div style={{ background: '#000000', minHeight: '100vh', paddingBottom: '6rem' }}>
      {/* Header Banner */}
      <section style={{
        background: 'linear-gradient(180deg, rgba(8, 14, 9, 0.95) 0%, #000000 100%)',
        borderBottom: '1px solid rgba(255, 208, 0, 0.2)',
        padding: '3.5rem 0 2.5rem'
      }}>
        <div className="container">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 208, 0, 0.12)',
            border: '1px solid rgba(255, 208, 0, 0.35)',
            borderRadius: '50px',
            padding: '4px 14px',
            marginBottom: '1rem'
          }}>
            <Activity size={13} color="var(--color-gold-primary)" />
            <span style={{
              fontSize: '0.74rem',
              fontWeight: 800,
              color: 'var(--color-gold-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>
              Pitchside Match Center
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 1.15,
            marginBottom: '0.75rem'
          }}>
            MATCHES &amp; <span className="text-gradient-gold">FIXTURES</span>
          </h1>
          <p style={{
            color: '#94a3b8',
            fontSize: '0.95rem',
            maxWidth: '650px',
            lineHeight: 1.6
          }}>
            Follow live scores, tournament schedules, kickoff countdowns, and historical results across Fackson Next Pro (Male) and Fackson Angels (Female) at Meiran Field Estate - Ojokoro Housing Estate Field, Meiran Alagbado and away venues.
          </p>
        </div>
      </section>

      {/* 1. ACTIVE LIVE MATCH SNAPSHOT (If Any) */}
      <section style={{ padding: '2.5rem 0 1.5rem' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, rgba(12, 18, 12, 0.9) 0%, rgba(5, 7, 5, 0.95) 100%)',
            border: '1px solid rgba(255, 208, 0, 0.35)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 16px 48px rgba(0,0,0,0.8)',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: '1px solid rgba(239, 68, 68, 0.5)',
                  color: '#f87171',
                  borderRadius: '50px',
                  padding: '4px 12px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  textTransform: 'uppercase'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', animation: 'pulse 1.5s infinite' }} />
                  ACTIVE MATCHDAY SCOREBOARD
                </span>
                <span style={{ color: 'var(--color-gold-primary)', fontSize: '0.82rem', fontWeight: 700 }}>
                  Meiran Field Estate Pitch 1
                </span>
              </div>

              <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>
                Official Grassroots League Snapshot
              </span>
            </div>

            <LiveScoreCard matches={matches} />
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section style={{ padding: '0.5rem 0 2rem' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            background: '#090c09',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '0.75rem 1.25rem'
          }}>
            {/* Status Pills */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'All Matches' },
                { id: 'live', label: 'Live Now' },
                { id: 'upcoming', label: 'Upcoming Fixtures' },
                { id: 'completed', label: 'Recent Results' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id as any)}
                  style={{
                    background: filterType === tab.id ? 'var(--color-gold-primary)' : 'rgba(255,255,255,0.05)',
                    color: filterType === tab.id ? '#000' : '#cbd5e1',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '6px 14px',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Academy & Category Selectors */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <select
                value={academyFilter}
                onChange={e => setAcademyFilter(e.target.value as any)}
                style={{
                  background: '#050705',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  fontSize: '0.78rem'
                }}
              >
                <option value="all">All Academies</option>
                <option value="next_pro">Fackson Next Pro (Male)</option>
                <option value="angels">Fackson Angels (Female)</option>
              </select>

              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value as any)}
                style={{
                  background: '#050705',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  fontSize: '0.78rem'
                }}
              >
                <option value="all">All Divisions</option>
                <option value="u10">Under 10</option>
                <option value="u13">Under 13</option>
                <option value="u15">Under 15</option>
                <option value="u17">Under 17</option>
                <option value="free_age">Senior (Free Age)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Matches Grid List */}
      <section style={{ padding: '1rem 0' }}>
        <div className="container">
          {filteredMatches.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 1.5rem',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '20px',
              border: '1px dashed rgba(255, 208, 0, 0.3)'
            }}>
              <Calendar size={48} style={{ color: 'var(--color-gold-primary)', margin: '0 auto 1rem', opacity: 0.7 }} />
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: '#fff' }}>No Fixtures Found</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '460px', margin: '0 auto' }}>
                No matches match the selected criteria. Change your filters or check back shortly for updated match announcements.
              </p>
            </div>
          ) : (
            <div className="match-grid-large">
              {filteredMatches.map(m => {
                const homeLogoSrc = getMediaUrl(
                  m.homeLogo || (m.academy === 'angels' ? '/logos/fackson-angels.jpg' : '/logos/fackson-next-pro.jpg'),
                  m.academy === 'angels' ? '/logos/fackson-angels.jpg' : '/logos/fackson-next-pro.jpg'
                );
                const isHomeMeiran = (m.venue || '').toLowerCase().includes('meiran');

                return (
                  <div key={m._id} className="match-card-large">
                    {/* Top Accent Strip */}
                    <div className={`match-card-large-strip ${m.status}`} />

                    {/* Match Meta Header */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      marginBottom: '0.75rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{
                          color: 'var(--color-gold-primary)',
                          fontWeight: 800,
                          fontSize: '0.8rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em'
                        }}>
                          {m.competition || 'Youth Elite Championship'}
                        </span>
                        <span className="game-type-chip">
                          ⚽ {m.gameType || '11 v 11'}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span className="badge badge-navy" style={{ fontSize: '0.7rem' }}>
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
                          padding: '3px 10px',
                          borderRadius: '50px',
                          fontWeight: 800,
                          fontSize: '0.7rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em'
                        }}>
                          {m.status === 'live' ? '🔴 Live In Play' : m.status === 'completed' ? 'Full Time' : 'Upcoming'}
                        </span>
                      </div>
                    </div>

                    {/* Big Teams & Score Showcase */}
                    <div className="match-teams-showcase">
                      {/* Home Team */}
                      <div className="team-box">
                        <div className="team-crest-wrapper">
                          <img 
                            src={homeLogoSrc}
                            alt={m.homeTeam}
                            className="team-crest-img"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              const fallback = m.academy === 'angels' ? '/logos/fackson-angels.jpg' : '/logos/fackson-next-pro.jpg';
                              if (!target.src.includes(fallback)) target.src = fallback;
                            }}
                          />
                        </div>
                        <div className="team-title-large">
                          {m.homeTeam}
                        </div>
                        <span className={`badge ${m.academy === 'angels' ? 'badge-gold' : 'badge-green'}`} style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                          {m.academy === 'angels' ? 'Angels Squad' : 'Next Pro Squad'}
                        </span>
                      </div>

                      {/* Center Board (Score / VS / Kickoff) */}
                      <div className="match-center-board">
                        {m.status === 'completed' ? (
                          <>
                            <div className="score-badge-large">
                              {m.homeScore ?? 0} : {m.awayScore ?? 0}
                            </div>
                            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#4ade80', letterSpacing: '0.06em', marginTop: '6px' }}>
                              FINAL SCORE
                            </span>
                            <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>
                              {m.date}
                            </span>
                          </>
                        ) : m.status === 'live' ? (
                          <>
                            <div className="score-badge-large" style={{ color: '#ef4444', borderColor: '#ef4444' }}>
                              {m.homeScore ?? 0} : {m.awayScore ?? 0}
                            </div>
                            <span style={{
                              fontSize: '0.72rem',
                              fontWeight: 800,
                              color: '#ef4444',
                              letterSpacing: '0.06em',
                              marginTop: '6px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}>
                              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', animation: 'pulse 1.5s infinite' }} />
                              LIVE &bull; {m.time}
                            </span>
                          </>
                        ) : (
                          <>
                            <div className="vs-badge-large">VS</div>
                            <div style={{
                              marginTop: '0.5rem',
                              color: 'var(--color-gold-primary)',
                              fontWeight: 800,
                              fontSize: '0.98rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}>
                              <Clock size={14} />
                              {m.time}
                            </div>
                            <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Calendar size={13} />
                              {m.date}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Away Team */}
                      <div className="team-box">
                        <div className="team-crest-wrapper">
                          {m.awayLogo ? (
                            <img 
                              src={getMediaUrl(m.awayLogo)}
                              alt={m.awayTeam}
                              className="team-crest-img"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                if (target.nextElementSibling) {
                                  (target.nextElementSibling as HTMLElement).style.display = 'flex';
                                }
                              }}
                            />
                          ) : null}
                          <div style={{
                            display: m.awayLogo ? 'none' : 'flex',
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            background: '#131e2b',
                            border: '1px solid rgba(255, 208, 0, 0.4)',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Shield size={30} color="var(--color-gold-primary)" />
                          </div>
                        </div>
                        <div className="team-title-large">
                          {m.awayTeam}
                        </div>
                        <span className="badge badge-navy" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                          Opponent
                        </span>
                      </div>
                    </div>

                    {/* Scorers List (if any) */}
                    {m.scorers && m.scorers.length > 0 && (
                      <div style={{
                        padding: '0.55rem 0.85rem',
                        background: 'rgba(0,0,0,0.5)',
                        borderRadius: '10px',
                        border: '1px solid rgba(255,255,255,0.06)',
                        fontSize: '0.76rem',
                        color: '#cbd5e1',
                        marginBottom: '0.65rem'
                      }}>
                        <strong style={{ color: 'var(--color-gold-primary)' }}>⚽ Scorers: </strong>
                        {m.scorers.join(' • ')}
                      </div>
                    )}

                    {/* Prominent Match Venue & Location Palette */}
                    <div className="match-venue-card">
                      <div style={{
                        background: 'rgba(74, 222, 128, 0.15)',
                        border: '1px solid rgba(74, 222, 128, 0.4)',
                        borderRadius: '8px',
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <MapPin size={18} color="#4ade80" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.5rem',
                          marginBottom: '2px'
                        }}>
                          <span style={{
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            color: '#4ade80',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>
                            Match Venue &amp; Pitch
                          </span>
                          <span style={{
                            fontSize: '0.68rem',
                            color: isHomeMeiran ? 'var(--color-gold-primary)' : '#94a3b8',
                            fontWeight: 700
                          }}>
                            {isHomeMeiran ? '🏟️ Home Ground' : '📍 Away Stadium'}
                          </span>
                        </div>
                        <p style={{
                          color: '#ffffff',
                          fontSize: '0.88rem',
                          fontWeight: 600,
                          lineHeight: 1.35,
                          margin: 0
                        }}>
                          {m.venue || 'Meiran Field Estate - Ojokoro Housing Estate Field, Meiran Alagbado'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// Also export as FixturesPage for backward compatibility
export const FixturesPage = MatchesPage;
