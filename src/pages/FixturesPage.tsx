import React, { useState } from 'react';
import { MatchItem, AcademyType, AgeCategory } from '../types';
import { Calendar, Trophy, Shield, MapPin, Clock } from 'lucide-react';

interface FixturesPageProps {
  matches: MatchItem[];
  openRegistration: () => void;
}

export const FixturesPage: React.FC<FixturesPageProps> = ({ matches, openRegistration }) => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [academyFilter, setAcademyFilter] = useState<'all' | AcademyType>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | AgeCategory>('all');

  const filteredMatches = matches.filter(m => {
    if (statusFilter !== 'all' && m.status !== statusFilter) return false;
    if (academyFilter !== 'all' && m.academy !== academyFilter) return false;
    if (categoryFilter !== 'all' && m.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div style={{ padding: '4rem 0' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Match Center</span>
          <h1 className="section-title">FIXTURES & RESULTS</h1>
          <p className="section-desc">
            Track schedules, live scores, and tournament results across Fackson Next Pro and Fackson Angels squads.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', marginBottom: '3rem' }}>
          {/* Status Filter */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              className={`category-pill ${statusFilter === 'all' ? 'active' : ''}`}
              onClick={() => setStatusFilter('all')}
            >
              All Matches
            </button>
            <button
              className={`category-pill ${statusFilter === 'upcoming' ? 'active' : ''}`}
              onClick={() => setStatusFilter('upcoming')}
            >
              Upcoming Fixtures
            </button>
            <button
              className={`category-pill ${statusFilter === 'completed' ? 'active' : ''}`}
              onClick={() => setStatusFilter('completed')}
            >
              Recent Results
            </button>
          </div>

          {/* Academy & Category Row */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <select
              className="form-select"
              value={academyFilter}
              onChange={(e) => setAcademyFilter(e.target.value as any)}
              style={{ width: 'auto', padding: '0.4rem 1rem', fontSize: '0.85rem' }}
            >
              <option value="all">All Academies</option>
              <option value="next_pro">Fackson Next Pro (Men)</option>
              <option value="angels">Fackson Angels (Women)</option>
            </select>

            <select
              className="form-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
              style={{ width: 'auto', padding: '0.4rem 1rem', fontSize: '0.85rem' }}
            >
              <option value="all">All Age Tiers</option>
              <option value="u10">Under 10 (U-10)</option>
              <option value="u13">Under 13 (U-13)</option>
              <option value="u17">Under 17 (U-17)</option>
              <option value="free_age">Free Age (Senior)</option>
            </select>
          </div>
        </div>

        {/* Matches Grid */}
        {filteredMatches.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 1.5rem',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: 'var(--radius-lg)',
            border: '1px dashed var(--border-medium)'
          }}>
            <Calendar size={48} style={{ color: 'var(--color-gold-primary)', margin: '0 auto 1rem', opacity: 0.7 }} />
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>No Matches Found</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
              No matches found for the chosen filters. Select another age tier or check back soon.
            </p>
          </div>
        ) : (
          <div className="match-grid">
            {filteredMatches.map(m => (
              <div key={m._id} className="match-card">
                <div className="match-header">
                  <span className="match-competition">{m.competition}</span>
                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    <span className={`badge ${m.academy === 'angels' ? 'badge-gold' : 'badge-green'}`}>
                      {m.academy === 'angels' ? 'Angels' : 'Next Pro'}
                    </span>
                    <span className="badge badge-navy">
                      {m.category === 'free_age' ? 'Senior' : m.category.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="match-teams-row">
                  <div className="team-col">
                    <img 
                      src={m.homeLogo || (m.academy === 'angels' ? '/logos/fackson-angels.jpg' : '/logos/fackson-next-pro.jpg')} 
                      alt={m.homeTeam} 
                      className="team-logo-circle"
                    />
                    <span className="team-name">{m.homeTeam}</span>
                  </div>

                  <div className="match-score-col">
                    {m.status === 'completed' ? (
                      <span className="match-score">{m.homeScore} - {m.awayScore}</span>
                    ) : (
                      <>
                        <span className="match-vs">VS</span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--color-gold-primary)', fontWeight: 700 }}>
                          {m.time}
                        </span>
                      </>
                    )}
                  </div>

                  <div className="team-col">
                    <div className="team-logo-circle" style={{ background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Shield size={24} color="#94a3b8" />
                    </div>
                    <span className="team-name">{m.awayTeam}</span>
                  </div>
                </div>

                <div className="match-footer">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MapPin size={14} color="var(--color-gold-primary)" />
                    {m.venue}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700 }}>
                    <Calendar size={14} />
                    {m.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
