import React from 'react';
import { Shield, MapPin, Clock, ArrowRight, Activity } from 'lucide-react';
import { MatchItem } from '../types';

interface LiveScoreCardProps {
  onViewMatches?: () => void;
  matches?: MatchItem[];
}

export const LiveScoreCard: React.FC<LiveScoreCardProps> = ({ onViewMatches, matches }) => {
  // If there's an active live match from props, use it, otherwise show the official academy fixture snapshot
  const liveMatch = matches?.find(m => m.status === 'live') || {
    id: 'live-snapshot-1',
    homeTeam: 'Fackson Next Pro',
    awayTeam: 'Lagos City All-Stars',
    homeScore: 2,
    awayScore: 1,
    status: 'live' as const,
    date: 'Today',
    time: '68\' 2nd Half',
    venue: 'Meiran Field Estate, Alagbado',
    competition: 'Lagos State Elite Grassroots League',
    academy: 'next_pro' as const,
    scorers: ['Papa Daniel 24\'', 'Lawal Seun 58\'', 'K. Adeleke 41\' (Pen)']
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(10, 14, 10, 0.95) 0%, rgba(5, 7, 5, 0.98) 100%)',
      border: '1px solid rgba(255, 208, 0, 0.35)',
      borderRadius: '16px',
      padding: '1.25rem 1.5rem',
      boxShadow: '0 12px 36px rgba(0, 0, 0, 0.75), 0 0 20px rgba(255, 208, 0, 0.1)',
      position: 'relative',
      overflow: 'hidden',
      maxWidth: '520px',
      width: '100%',
      backdropFilter: 'blur(12px)'
    }}>
      {/* Top Ambient Glow Bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #4ade80, var(--color-gold-primary), #fb7185)'
      }} />

      {/* Header Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '0.85rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            background: 'rgba(239, 68, 68, 0.18)',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            color: '#f87171',
            borderRadius: '50px',
            padding: '3px 10px',
            fontSize: '0.68rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em'
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#ef4444',
              boxShadow: '0 0 8px #ef4444',
              animation: 'pulse 1.5s infinite'
            }} />
            PITCHSIDE LIVE
          </span>
          <span style={{
            color: 'var(--color-gold-primary)',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.04em'
          }}>
            {liveMatch.time || '68\' 2nd Half'}
          </span>
        </div>

        <span style={{
          fontSize: '0.7rem',
          color: '#94a3b8',
          fontWeight: 600,
          textTransform: 'uppercase'
        }}>
          {liveMatch.competition}
        </span>
      </div>

      {/* Scoreboard Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.5rem 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        {/* Home Team */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flex: 1
        }}>
          <img
            src="/logos/fackson-next-pro.jpg"
            alt="Fackson Next Pro"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              border: '2px solid var(--color-gold-primary)',
              objectFit: 'cover'
            }}
          />
          <div>
            <div style={{
              fontSize: '0.92rem',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.15
            }}>
              {liveMatch.homeTeam}
            </div>
            <div style={{
              fontSize: '0.68rem',
              color: '#4ade80',
              fontWeight: 700
            }}>
              HOME • MEIRAN FIELD ESTATE
            </div>
          </div>
        </div>

        {/* Big Score Box */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '10px',
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          margin: '0 0.75rem'
        }}>
          <span style={{
            fontSize: '1.6rem',
            fontWeight: 900,
            color: 'var(--color-gold-primary)',
            fontFamily: 'monospace'
          }}>
            {liveMatch.homeScore ?? 2}
          </span>
          <span style={{ color: '#64748b', fontWeight: 900 }}>:</span>
          <span style={{
            fontSize: '1.6rem',
            fontWeight: 900,
            color: '#ffffff',
            fontFamily: 'monospace'
          }}>
            {liveMatch.awayScore ?? 1}
          </span>
        </div>

        {/* Away Team */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flex: 1,
          justifyContent: 'flex-end',
          textAlign: 'right'
        }}>
          <div>
            <div style={{
              fontSize: '0.92rem',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.15
            }}>
              {liveMatch.awayTeam}
            </div>
            <div style={{
              fontSize: '0.68rem',
              color: '#94a3b8',
              fontWeight: 600
            }}>
              VISITING ACADEMY
            </div>
          </div>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '2px solid #64748b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#cbd5e1',
            fontSize: '0.8rem',
            fontWeight: 800
          }}>
            LCA
          </div>
        </div>
      </div>

      {/* Scorers & Venue Strip */}
      <div style={{
        marginTop: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: '#cbd5e1',
          fontSize: '0.72rem'
        }}>
          <MapPin size={12} color="var(--color-gold-primary)" />
          <span style={{ color: '#94a3b8' }}>Meiran Field Estate, Alagbado</span>
        </div>

        {onViewMatches && (
          <button
            onClick={onViewMatches}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-gold-primary)',
              fontSize: '0.72rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              padding: 0
            }}
          >
            <span>Match Center</span>
            <ArrowRight size={12} />
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
