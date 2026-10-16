import React, { useState } from 'react';
import { Player, AgeCategory, AcademyType } from '../types';
import { Search, Shield, Zap, Target } from 'lucide-react';
import { getMediaUrl } from '../services/api';

interface SquadGridProps {
  players: Player[];
  activeAcademy?: AcademyType;
  selectedCategory?: AgeCategory | 'all';
  onCategoryChange?: (cat: AgeCategory | 'all') => void;
  showFilters?: boolean;
}

export const SquadGrid: React.FC<SquadGridProps> = ({
  players,
  activeAcademy,
  selectedCategory = 'all',
  onCategoryChange,
  showFilters = true
}) => {
  const [internalCategory, setInternalCategory] = useState<AgeCategory | 'all'>(selectedCategory);
  const [searchQuery, setSearchQuery] = useState('');

  const currentCategory = onCategoryChange ? selectedCategory : internalCategory;
  const handleCategorySelect = (cat: AgeCategory | 'all') => {
    if (onCategoryChange) {
      onCategoryChange(cat);
    } else {
      setInternalCategory(cat);
    }
  };

  const filteredPlayers = players.filter(p => {
    // Academy filter
    if (activeAcademy && p.academy !== activeAcademy) return false;
    // Category filter
    if (currentCategory !== 'all' && p.category !== currentCategory) return false;
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.position.toLowerCase().includes(q);
    }
    return true;
  });

  const getCategoryLabel = (cat: AgeCategory) => {
    switch (cat) {
      case 'u10': return 'Under 10 (U-10)';
      case 'u13': return 'Under 13 (U-13)';
      case 'u15': return 'Under 15 (U-15)';
      case 'u17': return 'Under 17 (U-17)';
      case 'free_age': return 'Free Age (Senior)';
    }
  };

  return (
    <div>
      {showFilters && (
        <div style={{ marginBottom: '2.5rem' }}>
          {/* Category Filter Pills */}
          <div className="category-filter">
            <button
              className={`category-pill ${currentCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleCategorySelect('all')}
            >
              All Squads
            </button>
            <button
              className={`category-pill ${currentCategory === 'u10' ? 'active' : ''}`}
              onClick={() => handleCategorySelect('u10')}
            >
              Under 10 (U-10)
            </button>
            <button
              className={`category-pill ${currentCategory === 'u13' ? 'active' : ''}`}
              onClick={() => handleCategorySelect('u13')}
            >
              Under 13 (U-13)
            </button>
            <button
              className={`category-pill ${currentCategory === 'u15' ? 'active' : ''}`}
              onClick={() => handleCategorySelect('u15')}
            >
              Under 15 (U-15)
            </button>
            <button
              className={`category-pill ${currentCategory === 'u17' ? 'active' : ''}`}
              onClick={() => handleCategorySelect('u17')}
            >
              Under 17 (U-17)
            </button>
            <button
              className={`category-pill ${currentCategory === 'free_age' ? 'active' : ''}`}
              onClick={() => handleCategorySelect('free_age')}
            >
              Free Age (Senior)
            </button>
          </div>

          {/* Search bar */}
          <div style={{ maxWidth: '420px', margin: '0 auto', position: 'relative' }}>
            <Search 
              size={18} 
              style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} 
            />
            <input
              type="text"
              placeholder="Search player name or position..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.8rem' }}
            />
          </div>
        </div>
      )}

      {filteredPlayers.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 1.5rem',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: 'var(--radius-lg)',
          border: '1px dashed var(--border-medium)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <Shield size={48} style={{ color: 'var(--color-gold-primary)', margin: '0 auto 1rem', opacity: 0.8 }} />
          <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.5rem', fontWeight: 800 }}>No Roster Entries Published</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
            Official player profiles and squad lists are published here following trial evaluations. Coaches and administrators can post and manage athlete profiles manually via the Staff Access Portal.
          </p>
        </div>
      ) : (
        <div className="player-grid">
          {filteredPlayers.map((player) => (
            <div key={player._id} className="player-card">
              <div className="player-image-wrap">
                {player.photoUrl && !player.photoUrl.includes('training-1.jpg') && !player.photoUrl.includes('angels-action-1.jpg') ? (
                  <img 
                    src={getMediaUrl(player.photoUrl)} 
                    alt={player.name} 
                    className="player-photo"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.nextElementSibling) {
                        (target.nextElementSibling as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                ) : null}

                {/* Athletic Silhouette / Monogram Card when no custom photo is present */}
                <div 
                  className="player-photo-placeholder"
                  style={{
                    display: (!player.photoUrl || player.photoUrl.includes('training-1.jpg') || player.photoUrl.includes('angels-action-1.jpg')) ? 'flex' : 'none',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: player.academy === 'angels' 
                      ? 'radial-gradient(circle at 50% 35%, rgba(244, 63, 94, 0.25) 0%, rgba(15, 23, 42, 0.95) 75%)'
                      : 'radial-gradient(circle at 50% 35%, rgba(34, 197, 94, 0.25) 0%, rgba(15, 23, 42, 0.95) 75%)',
                    overflow: 'hidden'
                  }}
                >
                  {/* Watermark Jersey Number */}
                  <div style={{
                    position: 'absolute',
                    fontSize: '6.5rem',
                    fontWeight: 900,
                    color: 'rgba(255, 255, 255, 0.04)',
                    lineHeight: 1,
                    userSelect: 'none',
                    zIndex: 1
                  }}>
                    {player.jerseyNumber || '10'}
                  </div>

                  {/* Player Monogram / Silhouette Badge */}
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(255,208,0,0.2) 0%, rgba(0,0,0,0.6) 100%)',
                    border: '2px solid rgba(255, 208, 0, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                    zIndex: 2,
                    marginBottom: '0.6rem'
                  }}>
                    <span style={{
                      fontSize: '2rem',
                      fontWeight: 900,
                      color: 'var(--color-gold-primary)',
                      textTransform: 'uppercase'
                    }}>
                      {player.name ? player.name.charAt(0) : 'F'}
                    </span>
                  </div>

                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    zIndex: 2
                  }}>
                    {player.position}
                  </span>
                </div>

                <div className="player-number">#{player.jerseyNumber}</div>
                <div className="player-badge-overlay">
                  <span className={`badge ${player.academy === 'angels' ? 'badge-gold' : 'badge-green'}`}>
                    {player.academy === 'angels' ? 'Angels' : 'Next Pro'}
                  </span>
                  <span className="badge badge-navy">
                    {player.category === 'free_age' ? 'Senior' : player.category.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="player-info">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 className="player-name">{player.name}</h3>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>{player.age} yrs</span>
                </div>
                <div className="player-position">{player.position}</div>
                {player.bio && <p className="player-bio">{player.bio}</p>}

                <div className="player-stats-row">
                  <div className="stat-box">
                    <span className="stat-value">{player.stats?.appearances || 0}</span>
                    <span className="stat-label">Apps</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-value text-gradient-gold">{player.stats?.goals || 0}</span>
                    <span className="stat-label">Goals</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-value">{player.stats?.assists || 0}</span>
                    <span className="stat-label">Assists</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
