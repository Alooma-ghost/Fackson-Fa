import React, { useState } from 'react';
import { Bell, Flame, ChevronRight, X, Calendar, Trophy, Sparkles } from 'lucide-react';
import { NewsItem, MatchItem } from '../types';

interface NewsTickerProps {
  news: NewsItem[];
  matches?: MatchItem[];
  onOpenNews?: (tab: string) => void;
  openRegistration: () => void;
}

export const NewsTicker: React.FC<NewsTickerProps> = ({
  news,
  matches = [],
  onOpenNews,
  openRegistration
}) => {
  const [minimized, setMinimized] = useState(false);

  const defaultTickerItems = [
    { text: '⚽ Fackson Next Pro U-15 & U-17 Open Screening Trials ongoing at Meiran Field Estate - Ojokoro Housing Estate Field, Meiran Alagbado.', tag: 'TRIALS', isAction: true },
    { text: '🏆 Fackson Angels U-15 crowned Lagos Youth Champions after 3-1 victory in state finals!', tag: 'MATCH RESULT', isAction: false },
    { text: '🌍 European Scouting Delegations arriving this month from Belgium & Portugal.', tag: 'PRO SCOUTING', isAction: false },
    { text: '⭐ Academy Graduate Tunde Bakare scores match-winner in Belgian Challenger Pro League.', tag: 'ALUMNI', isAction: false },
    { text: '📝 Early registration open for Under 10, Under 13, Under 15, Under 17 & Senior Free Age squads.', tag: 'ENROLLMENT', isAction: true }
  ];

  // Merge live news into ticker items if available
  const dynamicItems = news.length > 0 
    ? news.slice(0, 5).map(n => ({
        text: `📰 ${n.title} - ${n.excerpt.substring(0, 75)}...`,
        tag: n.academy === 'angels' ? 'ANGELS' : 'NEXT PRO',
        isAction: false
      }))
    : defaultTickerItems;

  const allItems = [...dynamicItems, ...defaultTickerItems];

  if (minimized) {
    return (
      <button 
        onClick={() => setMinimized(false)}
        style={{
          position: 'fixed',
          bottom: '12px',
          right: '16px',
          zIndex: 9999,
          background: 'var(--color-gold-primary)',
          color: '#000',
          border: 'none',
          borderRadius: '50px',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          cursor: 'pointer',
          fontWeight: 700,
          fontSize: '0.8rem'
        }}
        title="Show Academy Live Ticker"
      >
        <Flame size={16} />
        <span>Live Updates</span>
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      background: 'rgba(5, 18, 13, 0.96)',
      backdropFilter: 'blur(10px)',
      borderTop: '2px solid var(--color-gold-primary)',
      boxShadow: '0 -4px 25px rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      height: '44px',
      overflow: 'hidden'
    }}>
      {/* Ticker Lead Badge */}
      <div style={{
        background: 'linear-gradient(135deg, #ffd000 0%, #e6a800 100%)',
        color: '#051810',
        padding: '0 16px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontWeight: 800,
        fontSize: '0.78rem',
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
        flexShrink: 0,
        boxShadow: '4px 0 12px rgba(0,0,0,0.3)',
        zIndex: 2
      }}>
        <Flame size={16} />
        <span style={{ display: 'inline' }}>LATEST UPDATES</span>
      </div>

      {/* Marquee Ticker Track */}
      <div 
        style={{
          flex: 1,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          position: 'relative',
          padding: '0 12px'
        }}
      >
        <div className="ticker-track">
          {allItems.map((item, idx) => (
            <span 
              key={idx}
              onClick={() => {
                if (item.isAction) openRegistration();
                else if (onOpenNews) onOpenNews('news');
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginRight: '36px',
                color: '#e2e8f0',
                fontSize: '0.86rem',
                cursor: 'pointer'
              }}
            >
              <span style={{
                background: 'rgba(255, 208, 0, 0.15)',
                color: 'var(--color-gold-primary)',
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 208, 0, 0.3)'
              }}>
                {item.tag}
              </span>
              <span className="ticker-item-hover" style={{ fontWeight: 500 }}>
                {item.text}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.2)', marginLeft: '12px' }}>&bull;</span>
            </span>
          ))}
        </div>
      </div>

      {/* Action / Dismiss */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '0 12px',
        flexShrink: 0,
        background: 'rgba(5, 18, 13, 0.96)',
        zIndex: 2,
        borderLeft: '1px solid rgba(255,255,255,0.1)'
      }}>
        <button 
          onClick={openRegistration}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-gold-primary)',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            padding: '4px 8px'
          }}
        >
          <span>Register</span>
          <ChevronRight size={14} />
        </button>

        <button 
          onClick={() => setMinimized(true)}
          style={{
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center'
          }}
          title="Minimize Ticker"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
};
