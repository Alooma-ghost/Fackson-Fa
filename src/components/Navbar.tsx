import React, { useState } from 'react';
import { Menu, X, Lock, UserPlus, MessageCircle, ChevronDown } from 'lucide-react';
import { AcademyType } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  activeAcademy: AcademyType;
  setActiveAcademy: (academy: AcademyType) => void;
  openRegistration: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  activeAcademy,
  setActiveAcademy,
  openRegistration
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (tab: string) => {
    setCurrentTab(tab);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSwitchAcademy = (academy: AcademyType) => {
    setActiveAcademy(academy);
    setCurrentTab(academy);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const isAngels = activeAcademy === 'angels' || currentTab === 'angels';

  const coachWhatsAppUrl = `https://wa.me/2348029745452?text=${encodeURIComponent(
    `Hello Head Coach Farouk, I would like to inquire about Fackson Football Academy (${isAngels ? 'Fackson Angels Women' : 'Fackson Next Pro Men'}) trials, enrollment and training (Tue, Thu, Sat morning 6:45 AM – 11:00 AM) at Meiran Field Estate, Alagbado.`
  )}`;

  const navLinks = [
    { label: 'Home', tab: 'home' },
    { label: 'About', tab: 'about' },
    { label: 'Matches & Fixtures', tab: 'matches' },
    { label: 'Squads & Rosters', tab: 'squads' },
    { label: 'Gallery', tab: 'gallery' },
    { label: 'Videos', tab: 'videos' },
  ];

  return (
    <nav
      className="navbar"
      style={{
        borderBottom: isAngels
          ? '2px solid rgba(244, 63, 94, 0.4)'
          : '2px solid rgba(255, 208, 0, 0.35)'
      }}
    >
      <div className="container nav-container">
        {/* Brand — Both Logos Side by Side */}
        <div
          className="nav-brand"
          onClick={() => handleNavClick('home')}
          style={{ cursor: 'pointer', gap: '0.65rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <img
              src="/logos/fackson-next-pro.jpg"
              alt="Fackson Next Pro"
              style={{
                width: '34px', height: '34px', borderRadius: '50%',
                border: '2px solid var(--color-gold-primary)',
                boxShadow: '0 0 10px rgba(255,208,0,0.45)'
              }}
            />
            <img
              src="/logos/fackson-angels.jpg"
              alt="Fackson Angels"
              style={{
                width: '34px', height: '34px', borderRadius: '50%',
                border: '2px solid #fb7185',
                boxShadow: '0 0 10px rgba(251,113,133,0.45)'
              }}
            />
          </div>
          <div className="nav-title-group">
            <span className="nav-title" style={{ fontSize: '0.9rem', fontWeight: 900, letterSpacing: '-0.01em', lineHeight: 1.1 }}>
              FACKSON <span className="text-gradient-gold">FOOTBALL</span>
            </span>
            <span className="nav-subtitle" style={{ fontSize: '0.6rem', letterSpacing: '0.04em', color: '#94a3b8', marginTop: '2px' }}>
              <span style={{ color: 'var(--color-gold-primary)', fontWeight: 700 }}>Next Pro</span>{' '}
              &amp; <span style={{ color: '#fb7185', fontWeight: 700 }}>Angels</span> • Lagos
            </span>
          </div>
        </div>

        {/* Team Switcher Pill — desktop only */}
        <div
          className="desktop-only-switcher"
          style={{
            display: 'flex',
            background: 'rgba(255,255,255,0.05)',
            padding: '2px',
            borderRadius: '50px',
            border: '1px solid rgba(255,255,255,0.1)',
            margin: '0 0.35rem'
          }}
        >
          <button
            onClick={() => handleSwitchAcademy('next_pro')}
            style={{
              border: 'none',
              background: !isAngels ? 'var(--color-gold-primary)' : 'transparent',
              color: !isAngels ? '#000' : '#cbd5e1',
              padding: '4px 10px', borderRadius: '50px',
              fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Next Pro (Men)
          </button>
          <button
            onClick={() => handleSwitchAcademy('angels')}
            style={{
              border: 'none',
              background: isAngels ? '#fb7185' : 'transparent',
              color: isAngels ? '#000' : '#cbd5e1',
              padding: '4px 10px', borderRadius: '50px',
              fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Angels (Women)
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <ul className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
          {navLinks.map(link => (
            <li
              key={link.tab}
              className={`nav-link ${currentTab === link.tab ? 'active' : ''}`}
              onClick={() => handleNavClick(link.tab)}
            >
              {link.label}
            </li>
          ))}

          {/* Mobile-Only: Team Switcher */}
          {mobileOpen && (
            <li style={{ padding: '0.75rem 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                Switch Team
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleSwitchAcademy('next_pro')}
                  style={{
                    border: `1px solid ${!isAngels ? 'var(--color-gold-primary)' : 'rgba(255,255,255,0.15)'}`,
                    background: !isAngels ? 'rgba(255,208,0,0.15)' : 'transparent',
                    color: !isAngels ? 'var(--color-gold-primary)' : '#94a3b8',
                    padding: '6px 12px', borderRadius: '8px',
                    fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer'
                  }}
                >
                  ⚽ Next Pro
                </button>
                <button
                  onClick={() => handleSwitchAcademy('angels')}
                  style={{
                    border: `1px solid ${isAngels ? '#fb7185' : 'rgba(255,255,255,0.15)'}`,
                    background: isAngels ? 'rgba(251,113,133,0.15)' : 'transparent',
                    color: isAngels ? '#fb7185' : '#94a3b8',
                    padding: '6px 12px', borderRadius: '8px',
                    fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer'
                  }}
                >
                  👩 Angels
                </button>
              </div>
            </li>
          )}


          {/* Mobile-Only: Coach & Staff Portal */}
          {mobileOpen && (
            <li
              className="nav-link"
              onClick={() => handleNavClick('admin')}
              style={{
                color: 'var(--color-gold-primary)',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                paddingTop: '0.75rem',
                marginTop: '0.25rem'
              }}
            >
              <Lock size={16} style={{ display: 'inline', marginRight: '8px' }} />
              Coach &amp; Staff Portal
            </li>
          )}
        </ul>

        {/* Desktop Action Area — ONLY Hamburger (no WhatsApp / Join buttons on desktop) */}
        <div className="nav-actions">
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 769px) {
          .nav-actions .mobile-menu-btn { display: none !important; }
          .nav-links { display: flex !important; }
        }
        @media (max-width: 768px) {
          .desktop-only-switcher { display: none !important; }
          .nav-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(4, 8, 4, 0.98);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding: 1rem 1.5rem 1.5rem;
            flex-direction: column;
            gap: 0.15rem;
            z-index: 999;
          }
          .nav-links.mobile-open {
            display: flex !important;
          }
          .nav-actions .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
};
