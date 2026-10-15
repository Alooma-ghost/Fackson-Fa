import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { Camera, Tag, Calendar, Image as ImageIcon } from 'lucide-react';

interface GalleryPageProps {
  gallery: GalleryItem[];
  onOpenLightbox: (item: GalleryItem) => void;
  setCurrentTab: (tab: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ gallery, onOpenLightbox, setCurrentTab }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAcademy, setSelectedAcademy] = useState<string>('all');

  const filteredGallery = gallery.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (selectedAcademy !== 'all' && item.academy !== 'all' && item.academy !== selectedAcademy) return false;
    return true;
  });

  return (
    <div style={{ padding: '4rem 0' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Media Gallery</span>
          <h1 className="section-title">ACADEMY PHOTO ARCHIVES</h1>
          <p className="section-desc">
            Explore match days, training drills, trophy celebrations, and academy life across Fackson Next Pro and Fackson Angels squads.
          </p>
        </div>

        {/* Filter Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', marginBottom: '3rem' }}>
          {/* Academy Filter */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              className={`category-pill ${selectedAcademy === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedAcademy('all')}
            >
              All Academy Photos
            </button>
            <button
              className={`category-pill ${selectedAcademy === 'next_pro' ? 'active' : ''}`}
              onClick={() => setSelectedAcademy('next_pro')}
            >
              Fackson Next Pro (Men)
            </button>
            <button
              className={`category-pill ${selectedAcademy === 'angels' ? 'active' : ''}`}
              onClick={() => setSelectedAcademy('angels')}
            >
              Fackson Angels (Women)
            </button>
          </div>

          {/* Category Filter */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['all', 'training', 'matches', 'trophies', 'academy_life'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.4rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-subtle)',
                  background: selectedCategory === cat ? 'rgba(255, 208, 0, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  color: selectedCategory === cat ? 'var(--color-gold-primary)' : '#94a3b8',
                  borderColor: selectedCategory === cat ? 'var(--color-gold-primary)' : 'var(--border-subtle)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  textTransform: 'capitalize',
                  cursor: 'pointer'
                }}
              >
                {cat.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredGallery.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 1.5rem',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: 'var(--radius-lg)',
            border: '1px dashed var(--border-medium)'
          }}>
            <ImageIcon size={48} style={{ color: 'var(--color-gold-primary)', margin: '0 auto 1rem', opacity: 0.7 }} />
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>No Photos in this Category</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
              Upload new photos through the Admin Portal to populate this gallery category.
            </p>
          </div>
        ) : (
          <div className="gallery-grid">
            {filteredGallery.map((item) => (
              <div 
                key={item._id} 
                className="gallery-card"
                onClick={() => onOpenLightbox(item)}
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="gallery-card-img" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/training-1.jpg';
                  }}
                />
                <div className="gallery-card-overlay">
                  <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.5rem' }}>
                    <span className={`badge ${item.academy === 'angels' ? 'badge-gold' : item.academy === 'next_pro' ? 'badge-green' : 'badge-navy'}`}>
                      {item.academy === 'angels' ? 'Angels' : item.academy === 'next_pro' ? 'Next Pro' : 'Academy'}
                    </span>
                    <span className="badge badge-navy" style={{ textTransform: 'capitalize' }}>
                      {item.category.replace('_', ' ')}
                    </span>
                  </div>
                  <h4 className="gallery-card-title">{item.title}</h4>
                  {item.caption && <p className="gallery-card-caption">{item.caption}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
