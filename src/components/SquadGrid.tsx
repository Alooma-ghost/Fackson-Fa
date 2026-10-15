import React, { useState } from 'react';
import { Player, AgeCategory, AcademyType } from '../types';
import { Search, Shield, Zap, Target } from 'lucide-react';

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
                <img 
                  src={player.photoUrl || (player.academy === 'angels' ? '/images/angels-action-1.jpg' : '/images/training-1.jpg')} 
                  alt={player.name} 
                  className="player-photo"
                  onError={(e) => {
                    // Fallback to academy image if custom url fails
                    (e.target as HTMLImageElement).src = player.academy === 'angels' ? '/images/angels-action-1.jpg' : '/images/training-1.jpg';
                  }}
                />
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
