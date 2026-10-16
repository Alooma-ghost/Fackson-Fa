import React, { useState } from 'react';
import { Player, AcademyType, AgeCategory } from '../types';
import { AcademySwitch } from '../components/AcademySwitch';
import { SquadGrid } from '../components/SquadGrid';
import { CoachesSection } from '../components/CoachesSection';
import { Users, UserPlus, Shield, Sparkles } from 'lucide-react';

interface SquadPageProps {
  players: Player[];
  activeAcademy: AcademyType;
  setActiveAcademy: (academy: AcademyType) => void;
  openRegistration: () => void;
}

export const SquadPage: React.FC<SquadPageProps> = ({
  players,
  activeAcademy,
  setActiveAcademy,
  openRegistration
}) => {
  const [selectedCategory, setSelectedCategory] = useState<AgeCategory | 'all'>('all');

  return (
    <div style={{ background: '#000000', minHeight: '100vh', paddingBottom: '6rem' }}>
      {/* Header Banner */}
      <section style={{
        background: 'linear-gradient(180deg, rgba(8, 14, 9, 0.95) 0%, #000000 100%)',
        borderBottom: '1px solid rgba(255, 208, 0, 0.2)',
        padding: '3.5rem 0 2.5rem'
      }}>
        <div className="container">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 208, 0, 0.12)',
            border: '1px solid rgba(255, 208, 0, 0.35)',
            borderRadius: '50px',
            padding: '4px 14px',
            marginBottom: '1rem'
          }}>
            <Users size={13} color="var(--color-gold-primary)" />
            <span style={{
              fontSize: '0.74rem',
              fontWeight: 800,
              color: 'var(--color-gold-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>
              Official Academy Squad Rosters
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 1.15,
            marginBottom: '0.75rem'
          }}>
            SQUADS &amp; <span className="text-gradient-gold">ROSTERS</span>
          </h1>
          <p style={{
            color: '#94a3b8',
            fontSize: '0.95rem',
            maxWidth: '680px',
            lineHeight: 1.6
          }}>
            Browse official player dossiers across <strong style={{ color: '#4ade80' }}>Fackson Next Pro (Male)</strong> and <strong style={{ color: '#fb7185' }}>Fackson Angels (Female)</strong> spanning Under-10, Under-13, Under-15, Under-17, and Senior squads.
          </p>
        </div>
      </section>

      {/* Main Squads & Rosters Area */}
      <section style={{ padding: '2.5rem 0' }}>
        <div className="container">
          {/* Academy Switcher (Next Pro / Angels) */}
          <div style={{ marginBottom: '2.5rem' }}>
            <AcademySwitch 
              activeAcademy={activeAcademy} 
              setActiveAcademy={setActiveAcademy} 
            />
          </div>

          {/* Squad Player Cards Grid */}
          <SquadGrid 
            players={players}
            activeAcademy={activeAcademy}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            showFilters={true}
          />
        </div>
      </section>

      {/* Coaching Staff Dossier */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2rem' }}>
        <CoachesSection />
      </section>

      {/* Trial Application Banner */}
      <section style={{ padding: '3rem 0 1rem' }}>
        <div className="container">
          <div style={{
            padding: '2.5rem',
            background: 'linear-gradient(135deg, rgba(12, 20, 14, 0.95) 0%, rgba(5, 8, 5, 0.98) 100%)',
            border: '1px solid rgba(255, 208, 0, 0.3)',
            borderRadius: '20px',
            textAlign: 'center',
            boxShadow: '0 16px 48px rgba(0,0,0,0.8)'
          }}>
            <Sparkles size={28} color="var(--color-gold-primary)" style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.6rem', color: '#fff', fontWeight: 900, marginBottom: '0.5rem' }}>
              Want to Earn a Spot on the Roster?
            </h3>
            <p style={{ color: '#cbd5e1', maxWidth: '620px', margin: '0 auto 1.5rem', fontSize: '0.92rem', lineHeight: 1.6 }}>
              We scout and evaluate young footballers year-round at Meiran Field Estate - Ojokoro Housing Estate Field, Meiran Alagbado. Complete our academy registration to schedule your pitch assessment.
            </p>
            <button className="btn btn-gold btn-md" onClick={openRegistration}>
              <UserPlus size={18} />
              <span>Complete Registration</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Also export as SquadsPage for clarity
export const SquadsPage = SquadPage;
