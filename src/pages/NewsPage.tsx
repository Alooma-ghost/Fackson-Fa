import React, { useState } from 'react';
import { NewsItem, MatchItem, AcademyType } from '../types';
import { Calendar, User, ArrowRight, BookOpen, X, Trophy, MapPin, Clock, Shield, Flag, Activity } from 'lucide-react';
import { getMediaUrl } from '../services/api';

interface NewsPageProps {
  news: NewsItem[];
  openRegistration: () => void;
  matches?: MatchItem[];
  onViewMatches?: () => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ news, openRegistration, matches = [], onViewMatches }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'matches' | 'articles' | 'next_pro' | 'angels'>('all');
  const [activeArticle, setActiveArticle] = useState<NewsItem | null>(null);
  const [activeMatchModal, setActiveMatchModal] = useState<MatchItem | null>(null);

  // Convert matches into news-compatible cards
  const matchNewsItems = matches.map(m => {
    const isHomeFackson = (m.homeTeam || '').toLowerCase().includes('fackson');
    const isAwayFackson = (m.awayTeam || '').toLowerCase().includes('fackson');
    const matchTypeStr = isHomeFackson ? 'Home Match' : isAwayFackson ? 'Away Match' : 'Showcase Match';
    const isCompleted = m.status === 'completed';
    const isLive = m.status === 'live';

    const title = isCompleted
      ? `MATCH RESULT: ${m.homeTeam} ${m.homeScore ?? 0} - ${m.awayScore ?? 0} ${m.awayTeam}`
      : isLive
      ? `🔴 LIVE IN PLAY: ${m.homeTeam} vs ${m.awayTeam}`
      : `MATCH FIXTURE: ${m.homeTeam} vs ${m.awayTeam} (${m.gameType || '11 v 11'})`;

    const excerpt = `${matchTypeStr} • ${m.competition || 'Elite Championship'} • ${m.date} @ ${m.time} WAT • Venue: ${m.venue || 'Meiran Field Estate'}`;
    const coverImage = (isHomeFackson ? m.homeLogo : m.awayLogo) || m.homeLogo || m.awayLogo || (m.academy === 'angels' ? '/logos/fackson-angels.jpg' : '/logos/fackson-next-pro.jpg');

    return {
      _id: `match-news-${m._id}`,
      title,
      slug: `match-${m._id}`,
      excerpt,
      content: `OFFICIAL MATCH BULLETIN\n\n` +
        `• Teams: ${m.homeTeam} vs ${m.awayTeam}\n` +
        `• Fixture Type: ${matchTypeStr}\n` +
        `• Competition: ${m.competition || 'Youth Elite Championship'}\n` +
        `• Game Format: ${m.gameType || '11 v 11'}\n` +
        `• Date: ${m.date}\n` +
        `• Kickoff Time: ${m.time} (WAT)\n` +
        `• Stadium / Venue: ${m.venue || 'Meiran Field Estate - Ojokoro Housing Estate Field, Meiran Alagbado'}\n` +
        `• Squad: ${m.academy === 'angels' ? 'Fackson Angels (Female)' : 'Fackson Next Pro (Male)'} [${m.category.toUpperCase()}]\n` +
        `• Status: ${m.status.toUpperCase()}` +
        (isCompleted ? `\n• Final Score: ${m.homeScore ?? 0} - ${m.awayScore ?? 0}` : '') +
        (m.scorers && m.scorers.length > 0 ? `\n• Scorers: ${m.scorers.join(', ')}` : '') +
        `\n\nAll supporters, parents, scouts, and football enthusiasts are cordially invited to attend and follow our athletes pitchside!`,
      coverImage,
      category: 'match_fixture',
      academy: m.academy,
      author: 'Fackson FA Matchday Desk',
      date: m.date,
      featured: true,
      originalMatch: m
    };
  });

  // Filter regular news
  const filteredArticles = news.filter(n => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'articles') return true;
    if (selectedFilter === 'next_pro') return n.academy === 'next_pro' || n.academy === 'all';
    if (selectedFilter === 'angels') return n.academy === 'angels' || n.academy === 'all';
    return false;
  });

  // Filter match news
  const filteredMatchNews = matchNewsItems.filter(m => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'matches') return true;
    if (selectedFilter === 'next_pro') return m.academy === 'next_pro';
    if (selectedFilter === 'angels') return m.academy === 'angels';
    return false;
  });

  // If "all" or specific academy, merge match bulletins and articles seamlessly
  const combinedFeed = selectedFilter === 'articles' 
    ? filteredArticles 
    : selectedFilter === 'matches' 
    ? filteredMatchNews 
    : [...filteredMatchNews, ...filteredArticles];

  return (
    <div style={{ padding: '4rem 0' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Academy News</span>
          <h1 className="section-title">UPDATES & SCOUTING REPORTS</h1>
          <p className="section-desc">
            Stay current with tournament highlights, recruitment announcements, and academy milestones.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <button
            className={`category-pill ${selectedFilter === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('all')}
          >
            All Updates ({combinedFeed.length})
          </button>
          <button
            className={`category-pill ${selectedFilter === 'matches' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('matches')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Trophy size={13} color="var(--color-gold-primary)" />
            <span>Match Fixtures &amp; Bulletins ({matchNewsItems.length})</span>
          </button>
          <button
            className={`category-pill ${selectedFilter === 'articles' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('articles')}
          >
            Club Articles ({news.length})
          </button>
          <button
            className={`category-pill ${selectedFilter === 'next_pro' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('next_pro')}
          >
            Next Pro (Male)
          </button>
          <button
            className={`category-pill ${selectedFilter === 'angels' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('angels')}
          >
            Angels (Female)
          </button>
        </div>

        {/* Combined News & Match Fixture Feed Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '2rem'
        }}>
          {combinedFeed.map(item => {
            const matchData = (item as any).originalMatch as MatchItem | undefined;

            if (matchData) {
              const isHomeFackson = (matchData.homeTeam || '').toLowerCase().includes('fackson');
              const isAwayFackson = (matchData.awayTeam || '').toLowerCase().includes('fackson');
              const homeLogoSrc = matchData.homeLogo
                ? getMediaUrl(matchData.homeLogo)
                : isHomeFackson
                  ? (matchData.academy === 'angels' ? '/logos/fackson-angels.jpg' : '/logos/fackson-next-pro.jpg')
                  : '';
              const awayLogoSrc = matchData.awayLogo
                ? getMediaUrl(matchData.awayLogo)
                : isAwayFackson
                  ? (matchData.academy === 'angels' ? '/logos/fackson-angels.jpg' : '/logos/fackson-next-pro.jpg')
                  : '';

              return (
                <div 
                  key={item._id} 
                  className="glass-card" 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    border: '1px solid rgba(255, 208, 0, 0.3)',
                    background: 'linear-gradient(180deg, rgba(14, 22, 16, 0.9) 0%, rgba(6, 10, 8, 0.95) 100%)',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {/* Top Match Card Banner Strip */}
                  <div style={{
                    padding: '0.85rem 1rem',
                    background: 'rgba(0, 0, 0, 0.6)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <span className={`badge ${matchData.academy === 'angels' ? 'badge-gold' : 'badge-green'}`} style={{ fontSize: '0.68rem' }}>
                        {matchData.academy === 'angels' ? 'Angels' : 'Next Pro'}
                      </span>
                      <span className="game-type-chip" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
                        ⚽ {matchData.gameType || '11 v 11'}
                      </span>
                    </div>

                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '50px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      background: matchData.status === 'live' ? 'rgba(239, 68, 68, 0.2)' : matchData.status === 'completed' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 208, 0, 0.15)',
                      color: matchData.status === 'live' ? '#ef4444' : matchData.status === 'completed' ? '#4ade80' : 'var(--color-gold-primary)',
                      border: '1px solid',
                      borderColor: matchData.status === 'live' ? 'rgba(239, 68, 68, 0.4)' : matchData.status === 'completed' ? 'rgba(34, 197, 94, 0.4)' : 'rgba(255, 208, 0, 0.3)'
                    }}>
                      {matchData.status === 'live' ? '🔴 LIVE' : matchData.status === 'completed' ? 'FINAL' : 'UPCOMING FIXTURE'}
                    </span>
                  </div>

                  {/* Teams Showcase Box */}
                  <div style={{
                    padding: '1.25rem 1rem',
                    display: 'grid',
                    gridTemplateColumns: '1fr auto 1fr',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
                  }}>
                    {/* Home Team */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.35rem' }}>
                      <div style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        background: '#04120c',
                        border: '2px solid rgba(16, 185, 129, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {homeLogoSrc ? (
                          <img 
                            src={homeLogoSrc} 
                            alt={matchData.homeTeam} 
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/logos/fackson-next-pro.jpg';
                            }}
                          />
                        ) : (
                          <Shield size={26} color="var(--color-gold-primary)" />
                        )}
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
                        {matchData.homeTeam}
                      </span>
                      <span style={{ fontSize: '0.65rem', color: isHomeFackson ? '#4ade80' : '#94a3b8', fontWeight: 700 }}>
                        {isHomeFackson ? 'FACKSON (HOME)' : 'HOST CLUB'}
                      </span>
                    </div>

                    {/* VS / Score */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                      {matchData.status === 'completed' || matchData.status === 'live' ? (
                        <div style={{
                          fontSize: '1.35rem',
                          fontWeight: 900,
                          color: matchData.status === 'live' ? '#ef4444' : 'var(--color-gold-primary)',
                          fontFamily: 'monospace',
                          background: 'rgba(0,0,0,0.5)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '8px',
                          border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                          {matchData.homeScore ?? 0} : {matchData.awayScore ?? 0}
                        </div>
                      ) : (
                        <div style={{
                          fontSize: '0.85rem',
                          fontWeight: 900,
                          color: '#94a3b8',
                          background: 'rgba(255, 255, 255, 0.05)',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '20px'
                        }}>
                          VS
                        </div>
                      )}
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-gold-light)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={11} /> {matchData.time}
                      </div>
                    </div>

                    {/* Away Team */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.35rem' }}>
                      <div style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        background: '#130c1f',
                        border: '2px solid rgba(217, 119, 6, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {awayLogoSrc ? (
                          <img 
                            src={awayLogoSrc} 
                            alt={matchData.awayTeam} 
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/logos/fackson-next-pro.jpg';
                            }}
                          />
                        ) : (
                          <Shield size={26} color="#94a3b8" />
                        )}
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
                        {matchData.awayTeam}
                      </span>
                      <span style={{ fontSize: '0.65rem', color: isAwayFackson ? '#4ade80' : '#94a3b8', fontWeight: 700 }}>
                        {isAwayFackson ? 'FACKSON (AWAY)' : 'VISITING SQUAD'}
                      </span>
                    </div>
                  </div>

                  {/* Body Content & Details */}
                  <div style={{ padding: '1rem 1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--color-gold-primary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                        🏆 {matchData.competition || 'Youth Elite Championship'}
                      </div>
                      <h3 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.3 }}>
                        {item.title}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.35rem', color: '#cbd5e1', fontSize: '0.82rem', marginBottom: '0.85rem' }}>
                        <MapPin size={14} color="#4ade80" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span><strong>Venue:</strong> {matchData.venue || 'Meiran Field Estate'}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#94a3b8', fontSize: '0.78rem', marginBottom: '1rem' }}>
                        <Calendar size={13} />
                        <span>Match Date: <strong>{matchData.date}</strong></span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => setActiveArticle(item as any)}
                        style={{ fontSize: '0.76rem', padding: '0.35rem 0.75rem' }}
                      >
                        <span>Match Details</span>
                        <ArrowRight size={13} />
                      </button>

                      {onViewMatches && (
                        <button 
                          className="btn btn-outline btn-sm"
                          onClick={onViewMatches}
                          style={{ fontSize: '0.76rem', padding: '0.35rem 0.75rem' }}
                        >
                          <Trophy size={13} />
                          <span>Match Center</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            }

            // Regular news article
            return (
              <div key={item._id} className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  height: '220px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  marginBottom: '1.25rem',
                  position: 'relative'
                }}>
                  {item.coverImage && !item.coverImage.includes('training-1.jpg') ? (
                    <img 
                      src={getMediaUrl(item.coverImage)} 
                      alt={item.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        if (target.nextElementSibling) {
                          (target.nextElementSibling as HTMLElement).style.display = 'flex';
                        }
                      }}
                    />
                  ) : null}
                  <div 
                    style={{
                      display: (!item.coverImage || item.coverImage.includes('training-1.jpg')) ? 'flex' : 'none',
                      width: '100%',
                      height: '100%',
                      background: 'radial-gradient(circle at 50% 40%, rgba(255, 208, 0, 0.15) 0%, rgba(10, 15, 20, 0.95) 80%)',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(255, 208, 0, 0.2)'
                    }}
                  >
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'rgba(255, 208, 0, 0.1)',
                      border: '1px solid rgba(255, 208, 0, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.8rem',
                      marginBottom: '0.5rem'
                    }}>
                      📰
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-gold-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Official Dispatch
                    </span>
                  </div>
                  <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <span 
                      className={`badge ${item.academy === 'angels' ? 'badge-gold' : item.academy === 'next_pro' ? 'badge-green' : 'badge-navy'}`}
                    >
                      {item.academy === 'angels' ? 'Angels' : item.academy === 'next_pro' ? 'Next Pro' : 'Academy'}
                    </span>
                    {item.category && (
                      <span 
                        style={{
                          padding: '0.2rem 0.55rem',
                          borderRadius: '999px',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          background: 'rgba(0, 0, 0, 0.75)',
                          color: 'var(--color-gold-primary)',
                          border: '1px solid rgba(255, 208, 0, 0.4)',
                          backdropFilter: 'blur(4px)'
                        }}
                      >
                        {item.category === 'match_fixture' ? '⚽ Fixture' :
                         item.category === 'match_report' ? '🏆 Result' :
                         item.category === 'training' ? '🏃 Training' :
                         item.category === 'alumni' ? '🌟 Alumni' :
                         item.category === 'trials' ? '📋 Trials' : '📢 Announcement'}
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={14} />
                    {item.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <User size={14} />
                    {item.author}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', lineHeight: 1.3 }}>{item.title}</h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.5rem', flex: 1 }}>
                  {item.excerpt}
                </p>

                <button 
                  className="btn btn-outline btn-sm"
                  onClick={() => setActiveArticle(item as any)}
                  style={{ alignSelf: 'flex-start' }}
                >
                  <span>Read Full Story</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Article Reader Modal */}
        {activeArticle && (
          <div className="modal-overlay" onClick={() => setActiveArticle(null)}>
            <div 
              className="modal-content" 
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '750px' }}
            >
              <button className="modal-close-btn" onClick={() => setActiveArticle(null)}>
                <X size={20} />
              </button>

              {activeArticle.coverImage && !activeArticle.coverImage.includes('training-1.jpg') && (
                <div style={{ maxHeight: '350px', overflow: 'hidden', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', textAlign: 'center', background: '#030805' }}>
                  <img 
                    src={getMediaUrl(activeArticle.coverImage)} 
                    alt={activeArticle.title} 
                    style={{ width: '100%', maxHeight: '350px', objectFit: 'contain' }} 
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <span className={`badge ${activeArticle.academy === 'angels' ? 'badge-gold' : activeArticle.academy === 'next_pro' ? 'badge-green' : 'badge-navy'}`}>
                  {activeArticle.academy === 'angels' ? 'Fackson Angels' : activeArticle.academy === 'next_pro' ? 'Fackson Next Pro' : 'All Academy'}
                </span>
                <span style={{ fontSize: '0.82rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Calendar size={13} /> {activeArticle.date}
                </span>
                <span style={{ fontSize: '0.82rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <User size={13} /> By {activeArticle.author}
                </span>
              </div>

              <h2 style={{ fontSize: '1.8rem', marginBottom: '1.25rem', color: '#fff', lineHeight: 1.25 }}>{activeArticle.title}</h2>
              <div style={{ color: '#cbd5e1', fontSize: '1.02rem', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                {activeArticle.content}
              </div>

              <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                {onViewMatches && (
                  <button 
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      setActiveArticle(null);
                      onViewMatches();
                    }}
                  >
                    <Trophy size={14} />
                    <span>View All Fixtures in Match Center</span>
                  </button>
                )}
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setActiveArticle(null);
                    openRegistration();
                  }}
                >
                  <span>Register For Academy Trials</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
