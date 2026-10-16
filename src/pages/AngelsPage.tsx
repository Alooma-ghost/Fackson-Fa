import React, { useState } from 'react';
import { Player, AgeCategory } from '../types';
import { SquadGrid } from '../components/SquadGrid';
import { CoachesSection } from '../components/CoachesSection';
import { AlumniSection } from '../components/AlumniSection';
import { MapSection } from '../components/MapSection';
import { Trophy, Shield, Star, Heart, UserPlus, Sparkles, MessageCircle } from 'lucide-react';

interface AngelsPageProps {
  players: Player[];
  openRegistration: () => void;
}

export const AngelsPage: React.FC<AngelsPageProps> = ({ players, openRegistration }) => {
  const [selectedCategory, setSelectedCategory] = useState<AgeCategory | 'all'>('all');
  const angelsPlayers = players.filter(p => p.academy === 'angels');
  const coachWhatsAppUrl = `https://wa.me/2348029745452?text=${encodeURIComponent("Hello CEO Farouk, I would like to inquire about Fackson Angels (Female) trials, scholarship slots, and training schedule (U10-U15: Mon-Fri 4:00 PM – 6:00 PM, Sat-Sun 11:00 AM – 2:00 PM; Free-age: Mon-Fri 6:45 AM – 11:00 AM) at Meiran Field Estate - Ojokoro Housing Estate Field, Meiran Alagbado.")}`;

  return (
    <div>
      {/* Header Banner */}
      <section style={{
        padding: '5rem 0 3.5rem',
        background: `linear-gradient(to bottom, rgba(30, 10, 25, 0.88) 0%, rgba(6, 14, 8, 0.98) 100%), url('/images/angels-action-1.jpg') center/cover no-repeat`,
        borderBottom: '1px solid rgba(251, 113, 133, 0.3)'
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <img 
              src="/logos/fackson-angels.jpg" 
              alt="Fackson Angels" 
              style={{
                width: '130px',
                height: '130px',
                borderRadius: '50%',
                border: '4px solid #fb7185',
                boxShadow: '0 0 30px rgba(251, 113, 133, 0.4)'
              }}
            />
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                <span className="badge badge-gold" style={{ background: 'rgba(251, 113, 133, 0.2)', color: '#fecdd3', borderColor: '#fb7185' }}>
                  Female Academy Division
                </span>
                <span className="badge badge-green">Regional Champions</span>
                <span className="badge badge-navy">Meiran Field Estate - Ojokoro Housing Estate Field, Meiran Alagbado</span>
              </div>
              <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: '#ffffff', marginBottom: '0.75rem' }}>
                FACKSON <span style={{ color: '#fb7185' }}>ANGELS</span>
              </h1>
              <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '700px', lineHeight: 1.6 }}>
                Championing female football empowerment and elite player development. Developing technical brilliance, football intelligence, and championship character across Under 10, Under 13, Under 15, Under 17, and Free Age (Senior) rosters.
              </p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button 
                className="btn" 
                onClick={openRegistration}
                style={{
                  background: 'linear-gradient(135deg, #fb7185 0%, #e11d48 100%)',
                  color: '#fff',
                  fontWeight: 700,
                  boxShadow: '0 4px 20px rgba(225, 29, 72, 0.4)'
                }}
              >
                <UserPlus size={18} />
                <span>Join Angels Trials</span>
              </button>
              <a
                href={coachWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm"
                style={{
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  color: '#fff',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700
                }}
              >
                <MessageCircle size={16} />
                <span>WhatsApp CEO</span>
              </a>


            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section style={{ padding: '3.5rem 0', background: 'var(--bg-surface-1)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.75rem'
          }}>
            <div className="glass-card">
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(251, 113, 133, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fb7185', marginBottom: '1rem' }}>
                <Star size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Equal Standards</h3>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
                Fackson Angels receive identical elite access to full-pitch training, tactical software, GPS tracking, and UEFA certified coaches.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(255, 208, 0, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold-primary)', marginBottom: '1rem' }}>
                <Heart size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Holistic Welfare</h3>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
                Specialized female athlete nutrition, menstrual health tracking, academic support, and leadership development.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(251, 113, 133, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fb7185', marginBottom: '1rem' }}>
                <Trophy size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Pro Pathway to Europe</h3>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
                Proven route to European clubs (Sweden Damallsvenskan, France Première Ligue) and national youth squad invitations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Squad Rosters */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag" style={{ color: '#fb7185', borderColor: '#fb7185' }}>Roster &amp; Squads</span>
            <h2 className="section-title">FACKSON ANGELS SQUAD TIERS</h2>
            <p className="section-desc">
              Browse the official player lists across Under 10, Under 13, Under 15, Under 17, and Senior Free Age squads.
            </p>
          </div>

          <SquadGrid 
            players={angelsPlayers}
            activeAcademy="angels"
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            showFilters={true}
          />
        </div>
      </section>

      {/* Coaches Section for Angels */}
      <CoachesSection />

      {/* Alumni Section */}
      <AlumniSection />

      {/* Map Section */}
      <MapSection />
    </div>
  );
};
