import React, { useState } from 'react';
import { Menu, X, Lock, UserPlus, MessageCircle, ChevronDown, Sun, Moon, ArrowRight } from 'lucide-react';
import { AcademyType } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  activeAcademy: AcademyType;
  setActiveAcademy: (academy: AcademyType) => void;
  openRegistration: () => void;
  theme?: 'dark' | 'light';
  setTheme?: (theme: 'dark' | 'light') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  activeAcademy,
  setActiveAcademy,
  openRegistration,
  theme,
  setTheme
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [localTheme, setLocalTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('fackson_theme') || localStorage.getItem('fackson_menu_theme');
      return (saved === 'light' || saved === 'dark') ? saved : 'dark';
    } catch {
      return 'dark';
    }
  });

  const activeTheme = theme || localTheme;
  const isLight = activeTheme === 'light';

  const handleToggleTheme = (newTheme: 'dark' | 'light') => {
    if (setTheme) {
      setTheme(newTheme);
    } else {
      setLocalTheme(newTheme);
    }
    try {
      localStorage.setItem('fackson_theme', newTheme);
      localStorage.setItem('fackson_menu_theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      if (newTheme === 'light') {
        document.body.classList.add('light-theme');
        document.documentElement.classList.add('light-theme');
      } else {
        document.body.classList.remove('light-theme');
        document.documentElement.classList.remove('light-theme');
      }
    } catch {}
  };

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
    `Hello CEO Farouk, I would like to inquire about Fackson Football Academy (${isAngels ? 'Fackson Angels Female' : 'Fackson Next Pro Male'}) trials, enrollment and training schedule (U10-U15: Mon-Fri 4:00 PM – 6:00 PM, Sat-Sun 11:00 AM – 2:00 PM; Free-age: Mon-Fri 6:45 AM – 11:00 AM) at Meiran Field Estate - Ojokoro Housing Estate Field, Meiran Alagbado.`
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
            Next Pro (Male)
          </button>
          <button
            onClick={() => handleSwitchAcademy('angels')}
            style={{
              border: 'none',
              background: isAngels ? '#fb7185' : 'transparent',
              color: isAngels ? '#000' : (isLight ? '#475569' : '#cbd5e1'),
              padding: '4px 10px', borderRadius: '50px',
              fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Angels (Female)
          </button>
        </div>

        {/* Navigation Links / Mobile Menu Drawer */}
        <ul className={`nav-links ${mobileOpen ? 'mobile-open' : ''} ${isLight ? 'light-mode' : ''}`}>
          {/* Mobile-Only: Theme Mode Switcher Strip */}
          {mobileOpen && (
            <li
              className="mobile-theme-bar"
              style={{
                padding: '0.65rem 0.85rem',
                marginBottom: '0.65rem',
                background: isLight ? '#f1f5f9' : 'rgba(255, 255, 255, 0.04)',
                borderRadius: '12px',
                border: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.25s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {isLight ? (
                  <Sun size={15} color="#b45309" />
                ) : (
                  <Moon size={15} color="var(--color-gold-primary)" />
                )}
                <span style={{
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: isLight ? '#334155' : '#cbd5e1',
                  letterSpacing: '0.02em'
                }}>
                  Theme: <span style={{ color: isLight ? '#b45309' : 'var(--color-gold-primary)' }}>{isLight ? 'Light Mode' : 'Dark Mode'}</span>
                </span>
              </div>

              <div style={{
                display: 'inline-flex',
                background: isLight ? '#ffffff' : 'rgba(0, 0, 0, 0.4)',
                padding: '2px',
                borderRadius: '50px',
                border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <button
                  onClick={() => handleToggleTheme('dark')}
                  style={{
                    border: 'none',
                    background: !isLight ? 'rgba(255, 208, 0, 0.25)' : 'transparent',
                    color: !isLight ? 'var(--color-gold-primary)' : '#64748b',
                    padding: '3px 9px',
                    borderRadius: '50px',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'all 0.2s ease'
                  }}
                  aria-label="Switch to Dark Mode"
                >
                  <Moon size={11} />
                  <span>Dark</span>
                </button>
                <button
                  onClick={() => handleToggleTheme('light')}
                  style={{
                    border: 'none',
                    background: isLight ? '#b45309' : 'transparent',
                    color: isLight ? '#ffffff' : '#64748b',
                    padding: '3px 9px',
                    borderRadius: '50px',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'all 0.2s ease',
                    boxShadow: isLight ? '0 1px 4px rgba(180, 83, 9, 0.3)' : 'none'
                  }}
                  aria-label="Switch to Light Mode"
                >
                  <Sun size={11} />
                  <span>Light</span>
                </button>
              </div>
            </li>
          )}

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
            <li style={{
              padding: '0.75rem 0',
              borderTop: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.08)'
            }}>
              <div style={{
                fontSize: '0.7rem',
                color: isLight ? '#64748b' : '#94a3b8',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.5rem'
              }}>
                Academy Division
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleSwitchAcademy('next_pro')}
                  style={{
                    border: !isAngels
                      ? (isLight ? '1.5px solid #16a34a' : '1px solid var(--color-gold-primary)')
                      : (isLight ? '1px solid #cbd5e1' : 'rgba(255,255,255,0.15)'),
                    background: !isAngels
                      ? (isLight ? '#dcfce7' : 'rgba(255,208,0,0.15)')
                      : (isLight ? '#f1f5f9' : 'transparent'),
                    color: !isAngels
                      ? (isLight ? '#15803d' : 'var(--color-gold-primary)')
                      : (isLight ? '#475569' : '#94a3b8'),
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  ⚽ Next Pro (Male)
                </button>
                <button
                  onClick={() => handleSwitchAcademy('angels')}
                  style={{
                    border: isAngels
                      ? (isLight ? '1.5px solid #f43f5e' : '1px solid #fb7185')
                      : (isLight ? '1px solid #cbd5e1' : 'rgba(255,255,255,0.15)'),
                    background: isAngels
                      ? (isLight ? '#ffe4e6' : 'rgba(251,113,133,0.15)')
                      : (isLight ? '#f1f5f9' : 'transparent'),
                    color: isAngels
                      ? (isLight ? '#be123c' : '#fb7185')
                      : (isLight ? '#475569' : '#94a3b8'),
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  👩 Angels (Female)
                </button>
              </div>
            </li>
          )}

          {/* Mobile-Only: Direct CTAs */}
          {mobileOpen && (
            <li style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              paddingTop: '0.75rem',
              borderTop: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.08)'
            }}>
              <button
                className="btn btn-gold btn-sm"
                onClick={() => {
                  setMobileOpen(false);
                  openRegistration();
                }}
                style={{
                  width: '100%',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '0.65rem'
                }}
              >
                <span>Register for Trials</span>
                <ArrowRight size={15} />
              </button>

              <a
                href={coachWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm"
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '0.6rem',
                  borderRadius: '6px'
                }}
              >
                <MessageCircle size={15} />
                <span>WhatsApp Staff</span>
              </a>
            </li>
          )}

          {/* Mobile-Only: Coach & Staff Portal */}
          {mobileOpen && (
            <li
              className="nav-link"
              onClick={() => handleNavClick('admin')}
              style={{
                color: isLight ? '#b45309' : 'var(--color-gold-primary)',
                borderTop: isLight ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.1)',
                paddingTop: '0.75rem',
                marginTop: '0.25rem',
                fontWeight: 700
              }}
            >
              <Lock size={15} style={{ display: 'inline', marginRight: '8px' }} />
              Coach &amp; Staff Portal
            </li>
          )}
        </ul>

        {/* Action Area: Theme Toggle Icon & Mobile Hamburger Button */}
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Single Universal Theme Toggle Icon Button */}
          <button
            className="nav-theme-toggle-btn"
            onClick={() => handleToggleTheme(isLight ? 'dark' : 'light')}
            aria-label={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            style={{
              background: isLight ? '#f1f5f9' : 'rgba(255, 255, 255, 0.08)',
              border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.15)',
              color: isLight ? '#b45309' : 'var(--color-gold-primary)',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              padding: 0,
              boxShadow: isLight ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'
            }}
          >
            {isLight ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              color: isLight && mobileOpen ? '#0f172a' : 'inherit'
            }}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <style>{`
        .nav-theme-toggle-btn:hover {
          transform: scale(1.08);
          border-color: ${isAngels ? '#fb7185' : 'var(--color-gold-primary)'} !important;
          background: ${isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.14)'} !important;
        }
        @media (min-width: 961px) {
          .nav-actions .mobile-menu-btn { display: none !important; }
          .nav-actions .nav-theme-toggle-btn { display: inline-flex !important; }
          .nav-links { display: flex !important; }
        }
        @media (max-width: 960px) {
          .desktop-only-switcher { display: none !important; }
          .nav-actions .nav-theme-toggle-btn {
            display: inline-flex !important;
          }
          .nav-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(4, 8, 4, 0.98);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border-bottom: 2px solid ${isAngels ? 'rgba(244, 63, 94, 0.5)' : 'rgba(255,208,0,0.4)'};
            padding: 1rem 1.25rem 1.5rem;
            flex-direction: column;
            gap: 0.25rem;
            box-shadow: 0 16px 48px rgba(0,0,0,0.9);
            z-index: 999;
          }
          .nav-links.mobile-open {
            display: flex !important;
          }
          .nav-actions .mobile-menu-btn { display: flex !important; }

          /* Professional Light Mode for Hamburger Menu */
          .nav-links.mobile-open.light-mode {
            background: #ffffff !important;
            backdrop-filter: blur(28px) !important;
            -webkit-backdrop-filter: blur(28px) !important;
            border-bottom: 3px solid ${isAngels ? '#fb7185' : 'var(--color-gold-primary)'} !important;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18), 0 4px 12px rgba(0, 0, 0, 0.08) !important;
          }
          .nav-links.mobile-open.light-mode .nav-link {
            color: #0f172a !important;
            border-bottom: 1px solid #f1f5f9 !important;
            font-weight: 700 !important;
            padding: 0.65rem 0.5rem !important;
            border-radius: 8px !important;
            transition: all 0.2s ease !important;
          }
          .nav-links.mobile-open.light-mode .nav-link:hover {
            color: ${isAngels ? '#be123c' : '#b45309'} !important;
            background: #f8fafc !important;
          }
          .nav-links.mobile-open.light-mode .nav-link.active {
            color: ${isAngels ? '#be123c' : '#92400e'} !important;
            background: ${isAngels ? 'rgba(251, 113, 133, 0.15)' : 'rgba(255, 208, 0, 0.18)'} !important;
            font-weight: 800 !important;
            border-left: 3px solid ${isAngels ? '#fb7185' : 'var(--color-gold-primary)'} !important;
            padding-left: 10px !important;
          }
        }
      `}</style>
    </nav>
  );
};
