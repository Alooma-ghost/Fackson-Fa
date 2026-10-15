import React from 'react';
import { MapPin, Navigation, Phone, Clock, Shield, CheckCircle, ExternalLink, MessageCircle } from 'lucide-react';

export const MapSection: React.FC = () => {
  const mapAddress = "Meiran Estate, Alagbado, Lagos, Nigeria";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapAddress)}`;
  const coachWhatsAppUrl = `https://wa.me/2348029745452?text=${encodeURIComponent("Hello Head Coach Farouk! I'm planning to visit Fackson Football Academy at Meiran Field Estate, Alagbado, Lagos. Please confirm the training schedule (Tuesday, Thursday & Saturday morning 6:45 AM - 11:00 AM) and pitch directions.")}`;

  return (
    <section className="section" style={{ background: '#030a07', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '6px 16px',
            borderRadius: '50px',
            background: 'rgba(255, 208, 0, 0.12)',
            border: '1px solid rgba(255, 208, 0, 0.3)',
            color: 'var(--color-gold-primary)',
            fontSize: '0.82rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            marginBottom: '1rem'
          }}>
            <MapPin size={16} />
            <span>Official Academy Grounds &amp; Base</span>
          </div>

          <h2 style={{ fontSize: '2.4rem', color: '#fff', marginBottom: '1rem' }}>
            Find Us at <span className="text-gradient-gold">Meiran Estate, Alagbado</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6 }}>
            The primary home ground for Fackson Next Pro (Men) and Fackson Angels (Women). Visit our sports complex for training sessions, open trials, and academy tours.
          </p>
        </div>

        {/* Grid: Map Embed + Facility Info Card */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'stretch'
        }}>
          {/* Left: Interactive Map Container */}
          <div style={{
            background: 'var(--color-surface-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: '0 12px 35px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '380px'
          }}>
            <div style={{
              padding: '1rem 1.25rem',
              background: 'rgba(6, 61, 39, 0.35)',
              borderBottom: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Navigation size={18} color="var(--color-gold-primary)" />
                <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.92rem' }}>
                  Live GPS Location
                </span>
              </div>
              <span className="badge badge-green" style={{ fontSize: '0.72rem' }}>Open Daily</span>
            </div>

            <div style={{ position: 'relative', flex: 1, minHeight: '320px' }}>
              <iframe
                title="Fackson Football Academy Location Map - Meiran Estate, Alagbado, Lagos"
                src="https://maps.google.com/maps?q=Meiran%20Estate,%20Alagbado,%20Lagos,%20Nigeria&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '320px', display: 'block' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div style={{ padding: '1rem 1.25rem', background: '#020704', borderTop: '1px solid var(--color-border)' }}>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
                style={{ width: '100%', justifyContent: 'center', gap: '0.5rem' }}
              >
                <ExternalLink size={16} />
                <span>Open in Google Maps App</span>
              </a>
            </div>
          </div>

          {/* Right: Complex Details & WhatsApp Action */}
          <div style={{
            background: 'var(--color-surface-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 12px 35px rgba(0,0,0,0.5)'
          }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Shield size={22} color="var(--color-gold-primary)" />
                <span>Academy Sports Complex</span>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', gap: '0.85rem' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(255, 208, 0, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: 'var(--color-gold-primary)'
                  }}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '0.98rem', marginBottom: '0.2rem' }}>Ground Address</h4>
                    <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: 0, lineHeight: 1.5 }}>
                      Meiran Estate, Off Lagos-Abeokuta Expressway, Alagbado Axis, Lagos State, Nigeria.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.85rem' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: '#10b981'
                  }}>
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '0.98rem', marginBottom: '0.2rem' }}>Training Timetable</h4>
                    <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: 0, lineHeight: 1.5 }}>
                      <strong style={{ color: '#4ade80' }}>Training Days:</strong> Tuesday, Thursday &amp; Saturday<br />
                      <strong>Morning Session:</strong> 6:45 AM – 11:00 AM
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.85rem' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(56, 189, 248, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: '#38bdf8'
                  }}>
                    <CheckCircle size={18} />
                  </div>
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '0.98rem', marginBottom: '0.2rem' }}>Facility Highlights</h4>
                    <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: 0, lineHeight: 1.5 }}>
                      Standard Regulation Pitch &bull; Players Conditioning Gym &bull; Medical &amp; Physio Bay &bull; Video Tactical Theatre.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Coach WhatsApp Action */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 208, 0, 0.08) 0%, rgba(6, 61, 39, 0.25) 100%)',
              border: '1px solid rgba(255, 208, 0, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              textAlign: 'center'
            }}>
              <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.4rem' }}>
                Need Directions to Meiran Field Estate?
              </p>
              <p style={{ color: '#a7f3d0', fontSize: '0.82rem', marginBottom: '1rem' }}>
                Meiran Field Estate Ground &bull; Training: Tuesday, Thursday &amp; Saturday (6:45 AM – 11:00 AM)
              </p>
              <a 
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold btn-sm"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: 700
                }}
              >
                <ExternalLink size={16} />
                <span>Open in Google Maps</span>
              </a>
              <a
                href={coachWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  color: '#fff',
                  fontWeight: 700,
                  textDecoration: 'none',
                  marginTop: '0.6rem'
                }}
              >
                <span>📞 0817 349 6343 · 0802 974 5452</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
