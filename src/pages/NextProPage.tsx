import React, { useState } from 'react';
import { Player, AgeCategory } from '../types';
import { SquadGrid } from '../components/SquadGrid';
import { CoachesSection } from '../components/CoachesSection';
import { AlumniSection } from '../components/AlumniSection';
import { MapSection } from '../components/MapSection';
import { Trophy, Shield, Target, UserPlus, MessageCircle } from 'lucide-react';

interface NextProPageProps {
  players: Player[];
  openRegistration: () => void;
}

export const NextProPage: React.FC<NextProPageProps> = ({ players, openRegistration }) => {
  const [selectedCategory, setSelectedCategory] = useState<AgeCategory | 'all'>('all');
  const nextProPlayers = players.filter(p => p.academy === 'next_pro');
  const coachWhatsAppUrl = `https://wa.me/2348173496343?text=${encodeURIComponent("Hello Coach, I would like to inquire about Fackson Next Pro (Men) trials, enrollment, and training (Tue, Thu, Sat morning 6:45 AM – 11:00 AM) at Meiran Field Estate, Alagbado.")}`;

  return (
    <div>
      {/* Header Banner */}
      <section style={{
        padding: '5rem 0 3.5rem',
        background: `linear-gradient(to bottom, rgba(7, 38, 17, 0.85) 0%, rgba(6, 14, 8, 0.98) 100%), url('/images/training-1.jpg') center/cover no-repeat`,
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <img 
              src="/logos/fackson-next-pro.jpg" 
              alt="Fackson Next Pro" 
              style={{
                width: '130px',
                height: '130px',
                borderRadius: '50%',
                border: '4px solid var(--color-green-light)',
                boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)'
              }}
            />
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                <span className="badge badge-green">Men's Academy Division</span>
                <span className="badge badge-gold">Elite Pathway</span>
                <span className="badge badge-navy">Meiran Estate, Alagbado</span>
              </div>
              <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: '#ffffff', marginBottom: '0.75rem' }}>
                FACKSON NEXT PRO
              </h1>
              <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '700px', lineHeight: 1.6 }}>
                The premier men's football training development program, cultivating discipline, athletic endurance, tactical IQ, and technical mastery across Under 10, Under 13, Under 15, Under 17, and Free Age (Senior) rosters.
              </p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button className="btn btn-gold" onClick={openRegistration}>
                <UserPlus size={18} />
                <span>Join Next Pro Trials</span>
              </button>
              
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Pillars */}
      <section style={{ padding: '3.5rem 0', background: 'var(--bg-surface-1)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.75rem'
          }}>
            <div className="glass-card">
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80', marginBottom: '1rem' }}>
                <Shield size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Tactical Periodization</h3>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
                UEFA methodology instilling positional awareness, pressing triggers, cognitive reaction, and transitions.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(255, 208, 0, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold-primary)', marginBottom: '1rem' }}>
                <Target size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Athletic Conditioning</h3>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
                Age-specific agility, sprint mechanics, aerobic resistance, and injury mitigation supervised by dedicated physios.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80', marginBottom: '1rem' }}>
                <Trophy size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>European Scouting Network</h3>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
                Direct showcasing tournaments attended by domestic club scouts and international European football intermediaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Squad Rosters */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Roster &amp; Squads</span>
            <h2 className="section-title">FACKSON NEXT PRO SQUAD TIERS</h2>
            <p className="section-desc">
              Browse the official player lists across Under 10, Under 13, Under 15, Under 17, and Senior Free Age squads.
            </p>
          </div>

          <SquadGrid 
            players={nextProPlayers}
            activeAcademy="next_pro"
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            showFilters={true}
          />
        </div>
      </section>

      {/* Coaches Section */}
      <CoachesSection />

      {/* Alumni in Europe */}
      <AlumniSection />

      {/* Map to Academy */}
      <MapSection />
    </div>
  );
};
