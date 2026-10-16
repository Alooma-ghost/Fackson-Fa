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

  // Merge live matches and news into ticker items
  const matchItems = matches.slice(0, 3).map(m => {
    const isLive = m.status === 'live';
    const isFt = m.status === 'completed';
    return {
      text: isFt 
        ? `🏁 FT: ${m.homeTeam} ${m.homeScore ?? 0} - ${m.awayScore ?? 0} ${m.awayTeam} (${m.competition || 'Match'})`
        : isLive
        ? `🔴 LIVE: ${m.homeTeam} ${m.homeScore ?? 0} - ${m.awayScore ?? 0} ${m.awayTeam}`
        : `⚽ FIXTURE: ${m.homeTeam} vs ${m.awayTeam} • ${m.date} @ ${m.time} (${m.venue || 'Meiran Field'})`,
      tag: isLive ? 'LIVE' : isFt ? 'RESULT' : 'FIXTURE',
      isAction: false,
      tab: 'matches'
    };
  });

  const newsItems = news.slice(0, 6).map(n => ({
    text: `📰 ${n.title}`,
    tag: n.category === 'match_fixture' ? 'FIXTURE' : (n.academy === 'angels' ? 'ANGELS' : 'NEXT PRO'),
    isAction: false,
    tab: 'news'
  }));

  const dynamicItems = [...matchItems, ...newsItems];
  const allItems = dynamicItems.length > 0 ? [...dynamicItems, ...defaultTickerItems] : defaultTickerItems;

  if (minimized) {
    return (
      <button 
        onClick={() => setMinimized(false)}
        className="ticker-minimized-pill"
        title="Show Academy Live Ticker"
      >
        <Flame size={14} />
        <span>Updates</span>
      </button>
    );
  }

  return (
    <div className="news-ticker-container">
      {/* Ticker Lead Badge */}
      <div className="ticker-lead-badge">
        <Flame size={14} className="ticker-lead-icon" />
        <span className="ticker-lead-text-desktop">LATEST UPDATES</span>
        <span className="ticker-lead-text-mobile">LIVE</span>
      </div>

      {/* Marquee Ticker Track */}
      <div className="ticker-viewport">
        <div className="ticker-track">
          {allItems.map((item, idx) => (
            <span 
              key={idx}
              onClick={() => {
                if (item.isAction) openRegistration();
                else if (onOpenNews) onOpenNews((item as any).tab || 'news');
              }}
              className="ticker-item"
            >
              <span className="ticker-item-tag">
                {item.tag}
              </span>
              <span className="ticker-item-hover ticker-item-title">
                {item.text}
              </span>
              <span className="ticker-item-dot">&bull;</span>
            </span>
          ))}
        </div>
      </div>

      {/* Action / Dismiss */}
      <div className="ticker-actions">
        <button 
          onClick={openRegistration}
          className="ticker-register-btn"
        >
          <span>Trials</span>
          <ChevronRight size={13} />
        </button>

        <button 
          onClick={() => setMinimized(true)}
          className="ticker-close-btn"
          title="Minimize Ticker"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
