import React, { useEffect } from 'react';
import { X, Calendar, Tag, Shield } from 'lucide-react';
import { GalleryItem } from '../types';
import { getMediaUrl } from '../services/api';

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '850px', padding: '1.75rem' }}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div style={{
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          marginBottom: '1.25rem',
          maxHeight: '520px',
          background: '#040805',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img 
            src={getMediaUrl(item.imageUrl)} 
            alt={item.title} 
            style={{ width: '100%', maxHeight: '520px', objectFit: 'contain' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          <span className={`badge ${item.academy === 'angels' ? 'badge-gold' : item.academy === 'next_pro' ? 'badge-green' : 'badge-navy'}`}>
            {item.academy === 'angels' ? 'Fackson Angels' : item.academy === 'next_pro' ? 'Fackson Next Pro' : 'All Academy'}
          </span>
          <span className="badge badge-navy" style={{ textTransform: 'capitalize' }}>
            {item.category.replace('_', ' ')}
          </span>
          {item.createdAt && (
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Calendar size={14} />
              {new Date(item.createdAt).toLocaleDateString()}
            </span>
          )}
        </div>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#ffffff' }}>{item.title}</h3>
        {item.caption && (
          <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.5, marginBottom: '1rem' }}>
            {item.caption}
          </p>
        )}

        {item.tags && item.tags.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
            <Tag size={14} color="var(--color-gold-primary)" />
            {item.tags.map((tag, i) => (
              <span key={i} style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.06)', padding: '0.2rem 0.6rem', borderRadius: '4px', color: '#e2e8f0' }}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
