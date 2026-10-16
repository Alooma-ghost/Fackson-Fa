import React from 'react';
import { Shield, MapPin, Clock, ArrowRight, Activity } from 'lucide-react';
import { MatchItem } from '../types';
import { getMediaUrl } from '../services/api';

interface LiveScoreCardProps {
  onViewMatches?: () => void;
  matches?: MatchItem[];
}

export const LiveScoreCard: React.FC<LiveScoreCardProps> = ({ onViewMatches, matches }) => {
  // If there's an active live match from props, use it, otherwise show the official academy fixture snapshot
  const fallbackMatch: MatchItem = {
    _id: 'live-snapshot-1',
    homeTeam: 'Fackson Next Pro',
    awayTeam: 'Lagos City All-Stars',
    homeLogo: '/logos/fackson-next-pro.jpg',
    awayLogo: '',
    homeScore: 2,
    awayScore: 1,
    status: 'live',
    date: 'Today',
    time: "68' 2nd Half",
    venue: 'Meiran Field Estate, Alagbado',
    competition: 'Lagos State Elite Grassroots League',
    gameType: '11 v 11',
    academy: 'next_pro',
    category: 'u17',
    scorers: ["Papa Daniel 24'", "Lawal Seun 58'", "K. Adeleke 41' (Pen)"]
  };

  const liveMatch = matches?.find(m => m.status === 'live') || fallbackMatch;

  const isHomeFackson = (liveMatch.homeTeam || '').toLowerCase().includes('fackson');
  const isAwayFackson = (liveMatch.awayTeam || '').toLowerCase().includes('fackson');

  const homeLogoSrc = liveMatch.homeLogo
    ? getMediaUrl(liveMatch.homeLogo)
    : isHomeFackson
      ? (liveMatch.academy === 'angels' ? '/logos/fackson-angels.jpg' : '/logos/fackson-next-pro.jpg')
      : '';

  const awayLogoSrc = liveMatch.awayLogo
    ? getMediaUrl(liveMatch.awayLogo)
    : isAwayFackson
      ? (liveMatch.academy === 'angels' ? '/logos/fackson-angels.jpg' : '/logos/fackson-next-pro.jpg')
      : '';

  return (
    <div className="live-score-card">
      {/* Top Ambient Glow Bar */}
      <div className="live-score-strip" />

      {/* Header Bar */}
      <div className="live-score-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
          <span className="live-score-badge-live">
            <span style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#ef4444',
              boxShadow: '0 0 6px #ef4444',
              animation: 'pulse 1.5s infinite',
              flexShrink: 0
            }} />
            PITCHSIDE LIVE
          </span>
          <span className="live-score-time-indicator">
            {liveMatch.time || "68' 2nd Half"}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
          <span className="live-score-competition-label" title={liveMatch.competition}>
            {liveMatch.competition}
          </span>
          <span className="game-type-chip" style={{ fontSize: '0.62rem', padding: '1px 6px', whiteSpace: 'nowrap' }}>
            ⚽ {liveMatch.gameType || '11 v 11'}
          </span>
        </div>
      </div>

      {/* Scoreboard Row */}
      <div className="live-score-matchup">
        {/* Home Team */}
        <div className="live-score-team">
          {homeLogoSrc ? (
            <img
              src={homeLogoSrc}
              alt={liveMatch.homeTeam}
              className="live-score-crest-img"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (isHomeFackson) {
                  const fallback = liveMatch.academy === 'angels' ? '/logos/fackson-angels.jpg' : '/logos/fackson-next-pro.jpg';
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
          <div className="live-score-crest-placeholder" style={{ display: homeLogoSrc ? 'none' : 'flex' }}>
            <Shield size={16} color={isHomeFackson ? 'var(--color-gold-primary)' : '#94a3b8'} />
          </div>

          <div className="live-score-team-info">
            <div className="live-score-team-name" title={liveMatch.homeTeam}>
              {liveMatch.homeTeam}
            </div>
            <div
              className="live-score-team-role"
              style={{ color: isHomeFackson ? '#4ade80' : '#94a3b8' }}
            >
              {isHomeFackson 
                ? (liveMatch.academy === 'angels' ? 'FACKSON ANGELS' : 'NEXT PRO')
                : 'HOME CLUB'}
            </div>
          </div>
        </div>

        {/* Big Score Digits Box */}
        <div className="live-score-digits-box">
          <span className="live-score-digit-home">
            {liveMatch.homeScore ?? 0}
          </span>
          <span className="live-score-colon">:</span>
          <span className="live-score-digit-away">
            {liveMatch.awayScore ?? 0}
          </span>
        </div>

        {/* Away Team */}
        <div className="live-score-team away">
          <div className="live-score-team-info">
            <div className="live-score-team-name" title={liveMatch.awayTeam}>
              {liveMatch.awayTeam}
            </div>
            <div 
              className="live-score-team-role"
              style={{ color: isAwayFackson ? '#4ade80' : '#94a3b8' }}
            >
              {isAwayFackson 
                ? (liveMatch.academy === 'angels' ? 'FACKSON ANGELS' : 'NEXT PRO')
                : 'VISITOR'}
            </div>
          </div>
          {awayLogoSrc ? (
            <img 
              src={awayLogoSrc}
              alt={liveMatch.awayTeam}
              className="live-score-crest-img"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (isAwayFackson) {
                  const fallback = liveMatch.academy === 'angels' ? '/logos/fackson-angels.jpg' : '/logos/fackson-next-pro.jpg';
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
          <div className="live-score-crest-placeholder" style={{ display: awayLogoSrc ? 'none' : 'flex' }}>
            <Shield size={16} color={isAwayFackson ? 'var(--color-gold-primary)' : '#94a3b8'} />
          </div>
        </div>
      </div>

      {/* Scorers Strip (if any) */}
      {liveMatch.scorers && liveMatch.scorers.length > 0 && (
        <div className="live-score-scorers-bar">
          <span style={{ color: 'var(--color-gold-primary)', fontWeight: 800 }}>⚽ Scorers:</span>
          <span>{liveMatch.scorers.join(' • ')}</span>
        </div>
      )}

      {/* Venue & Link Strip */}
      <div className="live-score-footer">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          color: '#cbd5e1',
          minWidth: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          <MapPin size={12} color="#4ade80" style={{ flexShrink: 0 }} />
          <span style={{ color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {liveMatch.venue || 'Meiran Field Estate, Alagbado'}
          </span>
        </div>

        {onViewMatches && (
          <button
            onClick={onViewMatches}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-gold-primary)',
              fontSize: '0.7rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              padding: 0,
              flexShrink: 0
            }}
          >
            <span>Match Center</span>
            <ArrowRight size={11} />
          </button>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};
