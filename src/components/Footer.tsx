import React from 'react';
import { MapPin, Phone, Mail, Award, Shield, ArrowUpRight, MessageCircle, Lock, Clock } from 'lucide-react';
import { AcademyType } from '../types';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  openRegistration: () => void;
  activeAcademy?: AcademyType;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab, openRegistration, activeAcademy = 'next_pro' }) => {
  const isAngels = activeAcademy === 'angels';
  const coachWhatsAppUrl = `https://wa.me/2348029745452?text=${encodeURIComponent(`Hello CEO Farouk Yusuf, I would like to inquire about Fackson Football Academy (${isAngels ? 'Fackson Angels' : 'Fackson Next Pro'}) at Meiran Field Estate - Ojokoro Housing Estate Field, Meiran Alagbado.`)}`;

  const navTo = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <footer style={{
      background: '#040805',
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: '4rem',
      paddingBottom: '3.5rem',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '3rem',
          marginBottom: '3.5rem'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.15rem', marginBottom: '1.35rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <img 
                  src="/logos/fackson-next-pro.jpg" 
                  alt="Fackson Next Pro Logo" 
                  style={{ 
                    width: '38px', 
                    height: '38px', 
                    borderRadius: '50%', 
                    border: '2px solid var(--color-gold-primary)',
                    boxShadow: '0 0 12px rgba(255, 208, 0, 0.4)',
                    objectFit: 'cover',
                    display: 'block'
                  }} 
                />
                <img 
                  src="/logos/fackson-angels.jpg" 
                  alt="Fackson Angels Logo" 
                  style={{ 
                    width: '38px', 
                    height: '38px', 
                    borderRadius: '50%', 
                    border: '2px solid #fb7185',
                    boxShadow: '0 0 12px rgba(251, 113, 133, 0.4)',
                    objectFit: 'cover',
                    display: 'block'
                  }} 
                />
              </div>
              <div style={{ minWidth: 0 }}>
                <h4 style={{ fontSize: '1.05rem', color: '#fff', fontWeight: 900, letterSpacing: '0.03em', margin: 0, lineHeight: 1.2 }}>
                  FACKSON FOOTBALL
                </h4>
                <p style={{ fontSize: '0.72rem', color: 'var(--color-gold-primary)', fontWeight: 700, margin: '4px 0 0', lineHeight: 1.35 }}>
                  Next Pro (Male) &bull; Angels (Female) &bull; Meiran Field Estate, Lagos
                </p>
              </div>
            </div>
            <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Elite grassroots football academy based at Meiran Field Estate, Alagbado, Lagos. Founded in 1998 by Coach Farouk Yusuf (Ajobi), nurturing disciplined talents across U-10 to Senior squads with direct pathways to European leagues.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge badge-green">Est. 1998</span>
              <span className="badge badge-gold">European Showcase</span>
              <span className="badge badge-navy">Meiran Field Estate Ground</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '1.25rem', color: '#fff' }}>Quick Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0 }}>
              <li>
                <button 
                  onClick={() => navTo('home')}
                  style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}
                >
                  <ArrowUpRight size={14} color="var(--color-gold-primary)" />
                  <span>Home Page</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navTo('about')}
                  style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}
                >
                  <ArrowUpRight size={14} color="var(--color-gold-primary)" />
                  <span>About &amp; History (1998–Present)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navTo('matches')}
                  style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}
                >
                  <ArrowUpRight size={14} color="var(--color-gold-primary)" />
                  <span>Matches &amp; Fixtures</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navTo('squads')}
                  style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}
                >
                  <ArrowUpRight size={14} color="var(--color-gold-primary)" />
                  <span>Squads &amp; Rosters (U10-Senior)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navTo('gallery')}
                  style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}
                >
                  <ArrowUpRight size={14} color="var(--color-gold-primary)" />
                  <span>Academy Photo Gallery</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navTo('videos')}
                  style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}
                >
                  <ArrowUpRight size={14} color="var(--color-gold-primary)" />
                  <span>Videos &amp; Scout Reels</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navTo('join')}
                  style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}
                >
                  <ArrowUpRight size={14} color="#4ade80" />
                  <span>Join Academy (Complete Registration)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Age Categories Breakdown */}
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '1.25rem', color: '#fff' }}>Squad Age Tiers</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem', color: '#94a3b8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.4rem' }}>
                <span>Under 10 (U-10)</span>
                <strong style={{ color: '#fff' }}>Grassroots Foundation</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.4rem' }}>
                <span>Under 13 (U-13)</span>
                <strong style={{ color: '#fff' }}>Tactical Development</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.4rem' }}>
                <span style={{ color: 'var(--color-gold-primary)', fontWeight: 600 }}>Under 15 (U-15)</span>
                <strong style={{ color: '#fff' }}>Youth Elite Competition</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.4rem' }}>
                <span>Under 17 (U-17)</span>
                <strong style={{ color: '#fff' }}>Pre-Professional Pathway</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.4rem' }}>
                <span>Free Age (Senior)</span>
                <strong style={{ color: '#fff' }}>First Team &amp; European Pro</strong>
              </div>
            </div>
          </div>

          {/* Contact & Location at Meiran Estate Alagbado */}
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '1.25rem', color: '#fff' }}>Complex Base</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.88rem', color: '#cbd5e1' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <MapPin size={18} color="var(--color-gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Meiran Field Estate - Ojokoro Housing Estate Field, Meiran Alagbado, Lagos State, Nigeria</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Phone size={18} color="var(--color-gold-primary)" style={{ flexShrink: 0 }} />
                <div>
                  <a href="https://wa.me/2348029745452" target="_blank" rel="noopener noreferrer" style={{ color: '#cbd5e1', textDecoration: 'none', display: 'block' }}>+234 802 974 5452 (CEO)</a>
                  <a href="https://wa.me/2348173496343" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', display: 'block', fontSize: '0.82rem', marginTop: '2px' }}>+234 817 349 6343 (Coach)</a>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Mail size={18} color="var(--color-gold-primary)" style={{ flexShrink: 0 }} />
                <a
                  href="mailto:Facksonacademy@gmail.com"
                  style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#cbd5e1')}
                >
                  Facksonacademy@gmail.com
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.6rem', marginTop: '0.2rem' }}>
                <Clock size={18} color="#4ade80" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.84rem' }}>
                    U10–U15 (Male &amp; Female): Mon–Fri 4:00–6:00 PM &bull; Sat–Sun 11 AM–2 PM
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.78rem', marginTop: '1px' }}>
                    Free Age (Male &amp; Female): Mon–Fri 6:45 AM–11:00 AM
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1.25rem' }}>
              <a
                href={coachWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm"
                style={{
                  width: '100%',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  color: '#fff',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <MessageCircle size={16} />
                CEO: +234 802 974 5452
              </a>

              <button 
                className="btn btn-gold btn-sm"
                onClick={openRegistration}
                style={{ width: '100%', fontWeight: 800 }}
              >
                Complete Registration
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.82rem',
          color: '#64748b'
        }}>
          <div>
            © {new Date().getFullYear()} Fackson Football Academy (Fackson Next Pro Male &amp; Fackson Angels Female). Based at Meiran Field Estate - Ojokoro Housing Estate Field, Meiran Alagbado, Lagos.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span 
              style={{ cursor: 'pointer', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }} 
              onClick={() => navTo('admin')}
              title="Staff Access Portal"
            >
              <Lock size={12} />
              <span>Coach &amp; Staff Access</span>
            </span>
            <span>Privacy Policy</span>
            <span>Training Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
