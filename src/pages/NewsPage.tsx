import React, { useState } from 'react';
import { NewsItem, AcademyType } from '../types';
import { Calendar, User, ArrowRight, BookOpen, X } from 'lucide-react';

interface NewsPageProps {
  news: NewsItem[];
  openRegistration: () => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ news, openRegistration }) => {
  const [selectedAcademy, setSelectedAcademy] = useState<'all' | AcademyType>('all');
  const [activeArticle, setActiveArticle] = useState<NewsItem | null>(null);

  const filteredNews = news.filter(n => {
    if (selectedAcademy !== 'all' && n.academy !== 'all' && n.academy !== selectedAcademy) return false;
    return true;
  });

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

        {/* Filter */}
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '3rem' }}>
          <button
            className={`category-pill ${selectedAcademy === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedAcademy('all')}
          >
            All Updates
          </button>
          <button
            className={`category-pill ${selectedAcademy === 'next_pro' ? 'active' : ''}`}
            onClick={() => setSelectedAcademy('next_pro')}
          >
            Fackson Next Pro (Male)
          </button>
          <button
            className={`category-pill ${selectedAcademy === 'angels' ? 'active' : ''}`}
            onClick={() => setSelectedAcademy('angels')}
          >
            Fackson Angels (Female)
          </button>
        </div>

        {/* News Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '2rem'
        }}>
          {filteredNews.map(item => (
            <div key={item._id} className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                height: '220px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                marginBottom: '1.25rem',
                position: 'relative'
              }}>
                <img 
                  src={item.coverImage} 
                  alt={item.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/training-1.jpg';
                  }}
                />
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
                      {item.category === 'match' ? '⚽ Match' :
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
                onClick={() => setActiveArticle(item)}
                style={{ alignSelf: 'flex-start' }}
              >
                <span>Read Full Story</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
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

              <div style={{ maxHeight: '350px', overflow: 'hidden', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                <img 
                  src={activeArticle.coverImage} 
                  alt={activeArticle.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className={`badge ${activeArticle.academy === 'angels' ? 'badge-gold' : activeArticle.academy === 'next_pro' ? 'badge-green' : 'badge-navy'}`}>
                  {activeArticle.academy === 'angels' ? 'Fackson Angels' : activeArticle.academy === 'next_pro' ? 'Fackson Next Pro' : 'All Academy'}
                </span>
                <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{activeArticle.date}</span>
                <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>By {activeArticle.author}</span>
              </div>

              <h2 style={{ fontSize: '1.8rem', marginBottom: '1.25rem', color: '#fff' }}>{activeArticle.title}</h2>
              <div style={{ color: '#cbd5e1', fontSize: '1.02rem', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                {activeArticle.content}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
