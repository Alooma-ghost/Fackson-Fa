import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { Image as ImageIcon, ZoomIn } from 'lucide-react';
import { getMediaUrl } from '../services/api';

interface GalleryPageProps {
  gallery: GalleryItem[];
  onOpenLightbox: (item: GalleryItem) => void;
  setCurrentTab: (tab: string) => void;
}

const ACADEMY_LABEL: Record<string, { label: string; color: string; bg: string }> = {
  next_pro: { label: 'Next Pro', color: '#4ade80', bg: 'rgba(74,222,128,0.12)' },
  angels:   { label: 'Angels',   color: '#fb7185', bg: 'rgba(251,113,133,0.12)' },
  all:      { label: 'Academy',  color: '#ffd000', bg: 'rgba(255,208,0,0.12)' },
};

const CATEGORY_LABEL: Record<string, string> = {
  matches:      'Match',
  training:     'Training',
  trophies:     'Trophy',
  academy_life: 'Academy Life',
  all:          'All',
};

export const GalleryPage: React.FC<GalleryPageProps> = ({ gallery, onOpenLightbox }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAcademy, setSelectedAcademy] = useState<string>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredGallery = gallery.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (selectedAcademy !== 'all' && item.academy !== 'all' && item.academy !== selectedAcademy) return false;
    return true;
  });

  return (
    <div className="page-wrapper" style={{ padding: '4rem 0', minHeight: '80vh', background: 'var(--bg-main, #030603)' }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 3rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,208,0,0.1)', border: '1px solid rgba(255,208,0,0.3)',
            padding: '5px 16px', borderRadius: '50px', marginBottom: '1rem'
          }}>
            <ImageIcon size={14} color="var(--color-gold-primary)" />
            <span style={{ fontSize: '0.76rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-gold-primary)' }}>
              Media Gallery
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#fff', marginBottom: '0.85rem', letterSpacing: '-0.02em' }}>
            ACADEMY PHOTO ARCHIVES
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.65 }}>
            Match days, training drills, European milestones, and national team moments — captured through the Fackson FA journey.
          </p>
        </div>

        {/* Filter Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', marginBottom: '3rem' }}>
          {/* Academy Filter */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { key: 'all',      label: 'All Photos' },
              { key: 'next_pro', label: 'Next Pro (Male)' },
              { key: 'angels',   label: 'Angels (Female)' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSelectedAcademy(key)}
                style={{
                  padding: '0.45rem 1.1rem',
                  borderRadius: '50px',
                  border: selectedAcademy === key ? '1.5px solid var(--color-gold-primary)' : '1px solid rgba(255,255,255,0.12)',
                  background: selectedAcademy === key ? 'rgba(255,208,0,0.14)' : 'rgba(255,255,255,0.03)',
                  color: selectedAcademy === key ? 'var(--color-gold-primary)' : '#94a3b8',
                  fontSize: '0.83rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s ease'
                }}
              >{label}</button>
            ))}
          </div>

          {/* Category Filter */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['all', 'training', 'matches', 'trophies', 'academy_life'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.38rem 1rem',
                  borderRadius: '50px',
                  border: selectedCategory === cat ? '1.5px solid #4ade80' : '1px solid rgba(255,255,255,0.1)',
                  background: selectedCategory === cat ? 'rgba(74,222,128,0.12)' : 'rgba(255,255,255,0.02)',
                  color: selectedCategory === cat ? '#4ade80' : '#64748b',
                  fontSize: '0.78rem', fontWeight: 700, textTransform: 'capitalize',
                  cursor: 'pointer', transition: 'all 0.2s ease'
                }}
              >{CATEGORY_LABEL[cat] ?? cat.replace('_', ' ')}</button>
            ))}
          </div>
        </div>

        {/* Count badge */}
        {filteredGallery.length > 0 && (
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <span style={{
              fontSize: '0.75rem', fontWeight: 700, color: '#64748b',
              textTransform: 'uppercase', letterSpacing: '0.06em'
            }}>
              Showing {filteredGallery.length} photo{filteredGallery.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}

        {/* Gallery Grid */}
        {filteredGallery.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '5rem 1.5rem',
            background: 'rgba(255,255,255,0.02)', borderRadius: '20px',
            border: '1px dashed rgba(255,255,255,0.1)'
          }}>
            <ImageIcon size={52} style={{ color: 'var(--color-gold-primary)', margin: '0 auto 1rem', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.35rem', color: '#fff', marginBottom: '0.5rem' }}>No Photos in this Category</h3>
            <p style={{ color: '#64748b', fontSize: '0.92rem' }}>
              Try selecting a different filter above.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
            gap: '1.75rem',
          }}>
            {filteredGallery.map((item) => {
              const acad = ACADEMY_LABEL[item.academy] ?? ACADEMY_LABEL['all'];
              const isHovered = hoveredId === item._id;
              return (
                <div
                  key={item._id}
                  onClick={() => onOpenLightbox(item)}
                  onMouseEnter={() => setHoveredId(item._id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    position: 'relative',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    height: '420px',
                    cursor: 'pointer',
                    background: '#070b07',
                    border: isHovered ? '2px solid rgba(255,208,0,0.5)' : '1px solid rgba(255,255,255,0.07)',
                    boxShadow: isHovered
                      ? '0 20px 60px rgba(0,0,0,0.7), 0 0 30px rgba(255,208,0,0.12)'
                      : '0 8px 30px rgba(0,0,0,0.4)',
                    transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                    transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                  }}
                >
                  {/* Photo */}
                  <img
                    src={getMediaUrl(item.imageUrl)}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      transform: isHovered ? 'scale(1.07)' : 'scale(1)',
                      transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
                      display: 'block',
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const fallback = item.academy === 'angels' ? '/logos/fackson-angels.jpg' : '/logos/fackson-next-pro.jpg';
                      if (!target.src.includes(fallback)) {
                        target.src = fallback;
                      }
                    }}
                  />

                  {/* Gradient overlay - always visible at bottom */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(2,6,2,0.97) 0%, rgba(2,6,2,0.45) 45%, transparent 100%)',
                    transition: 'opacity 0.3s ease',
                  }} />

                  {/* Top badge row */}
                  <div style={{
                    position: 'absolute',
                    top: 14,
                    left: 14,
                    right: 14,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}>
                    <span style={{
                      fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase',
                      letterSpacing: '0.06em', color: acad.color,
                      background: acad.bg, border: `1px solid ${acad.color}44`,
                      backdropFilter: 'blur(8px)',
                      padding: '4px 10px', borderRadius: '50px',
                    }}>
                      {acad.label}
                    </span>

                    {/* Zoom hint on hover */}
                    <div style={{
                      width: 34, height: 34, borderRadius: '50%',
                      background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? 'scale(1)' : 'scale(0.7)',
                      transition: 'all 0.25s ease',
                    }}>
                      <ZoomIn size={15} color="#fff" />
                    </div>
                  </div>

                  {/* Bottom info */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0, left: 0, right: 0,
                    padding: '1.4rem 1.2rem 1.2rem',
                  }}>
                    <div style={{
                      fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
                      letterSpacing: '0.06em', color: '#4ade80', marginBottom: '6px'
                    }}>
                      {CATEGORY_LABEL[item.category] ?? item.category}
                    </div>
                    <h4 style={{
                      fontSize: '1.05rem', fontWeight: 800, color: '#fff',
                      margin: '0 0 6px', lineHeight: 1.3,
                    }}>
                      {item.title}
                    </h4>
                    {item.caption && (
                      <p style={{
                        fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)',
                        lineHeight: 1.45, margin: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical' as const,
                        overflow: 'hidden',
                      }}>
                        {item.caption}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
