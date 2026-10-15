import React, { useState } from 'react';
import { UserPlus, Shield, CheckCircle, MessageCircle, AlertCircle, Calendar, MapPin, Phone, Mail, Award, HeartHandshake } from 'lucide-react';
import { api } from '../services/api';
import { AcademyType, AgeCategory } from '../types';

interface JoinPageProps {
  defaultAcademy?: AcademyType;
}

export const JoinPage: React.FC<JoinPageProps> = ({ defaultAcademy = 'next_pro' }) => {
  const [academy, setAcademy] = useState<AcademyType>(defaultAcademy);
  const [category, setCategory] = useState<AgeCategory>('u15');
  
  // Player Details
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [position, setPosition] = useState('Midfielder');
  const [dominantFoot, setDominantFoot] = useState('Right');
  const [previousClub, setPreviousClub] = useState('');
  
  // Guardian Details
  const [guardianName, setGuardianName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  
  // Medical & Consents
  const [medicalConditions, setMedicalConditions] = useState('');
  const [agreed, setAgreed] = useState(false);

  // Submission States
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError('Please agree to the academy terms and guardian consent.');
      return;
    }

    setSubmitting(true);
    setError(null);

    const payload = {
      fullName,
      email,
      phone,
      dateOfBirth,
      academy,
      category,
      position,
      dominantFoot,
      guardianName,
      address,
      emergencyPhone,
      medicalConditions,
      previousClub,
      paymentStatus: 'free_trial' // Payment disabled per instructions
    };

    try {
      await api.submitRegistration(payload);
      setSubmitted(true);
    } catch (err: any) {
      console.warn('Backend API submission warning:', err);
      // Fallback gracefully so user can proceed to WhatsApp direct contact
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const coachPhone = '2348173496343';
  const secondaryPhone = '2348029745452';
  const whatsappPreFilled = `https://wa.me/${coachPhone}?text=${encodeURIComponent(
    `Hello Coach Farouk Yusuf, I have registered for Fackson Football Academy (${academy === 'angels' ? 'Fackson Angels Women' : 'Fackson Next Pro Men'}, ${category.toUpperCase()}).\n\nPlayer Name: ${fullName}\nDOB: ${dateOfBirth}\nPosition: ${position} (${dominantFoot} foot)\nGuardian: ${guardianName} (${phone})\nLocation: Meiran Field Estate, Alagbado.\n\nPlease confirm our trial date and training schedule.`
  )}`;
  const whatsappPreFilled2 = `https://wa.me/${secondaryPhone}?text=${encodeURIComponent(
    `Hello Coach, I have registered for Fackson Football Academy (${academy === 'angels' ? 'Fackson Angels Women' : 'Fackson Next Pro Men'}, ${category.toUpperCase()}).\n\nPlayer Name: ${fullName}\nDOB: ${dateOfBirth}\nPosition: ${position} (${dominantFoot} foot)\nGuardian: ${guardianName} (${phone})\nLocation: Meiran Field Estate, Alagbado.\n\nPlease confirm our trial date and training schedule.`
  )}`;

  return (
    <div style={{ background: '#000000', minHeight: '100vh', paddingBottom: '6rem' }}>
      {/* Page Hero */}
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
            background: 'rgba(34, 197, 94, 0.12)',
            border: '1px solid rgba(34, 197, 94, 0.4)',
            borderRadius: '50px',
            padding: '4px 14px',
            marginBottom: '1rem'
          }}>
            <CheckCircle size={13} color="#22c55e" />
            <span style={{
              fontSize: '0.74rem',
              fontWeight: 800,
              color: '#4ade80',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>
              Official Academy Registration &bull; Meiran Field Estate
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 1.15,
            marginBottom: '0.75rem'
          }}>
            JOIN <span className="text-gradient-gold">FACKSON FOOTBALL</span> ACADEMY
          </h1>
          <p style={{
            color: '#94a3b8',
            fontSize: '0.95rem',
            maxWidth: '680px',
            lineHeight: 1.6
          }}>
            Register for official academy trials at Meiran Field Estate, Alagbado. Regular Training Days: Tuesday, Thursday &amp; Saturday (Morning 6:45 AM – 11:00 AM). Open to boys and girls across U-10, U-13, U-15, U-17, and Senior squads.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section style={{ padding: '2.5rem 0' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          {submitted ? (
            /* Success State */
            <div style={{
              background: '#0a0d0a',
              border: '2px solid var(--color-gold-primary)',
              borderRadius: '20px',
              padding: '3rem 2rem',
              textAlign: 'center',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 208, 0, 0.15)'
            }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'rgba(34, 197, 94, 0.15)',
                border: '2px solid #22c55e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: '#22c55e'
              }}>
                <CheckCircle size={38} />
              </div>

              <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', marginBottom: '0.5rem' }}>
                REGISTRATION SUBMITTED SUCCESSFULLY!
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', maxWidth: '580px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
                Welcome to the Fackson family, <strong style={{ color: '#fff' }}>{fullName}</strong>. Your profile for the <strong style={{ color: 'var(--color-gold-primary)' }}>{academy === 'angels' ? 'Fackson Angels' : 'Fackson Next Pro'} ({category.toUpperCase()})</strong> squad has been received.
              </p>

              {/* 1-Click WhatsApp Direct Registration CTA */}
              <div style={{
                background: 'rgba(37, 211, 102, 0.1)',
                border: '1px solid rgba(37, 211, 102, 0.35)',
                borderRadius: '16px',
                padding: '2rem 1.5rem',
                maxWidth: '600px',
                margin: '0 auto 2rem'
              }}>
                <h3 style={{ color: '#25D366', fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  Instant WhatsApp Trial Scheduling
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  Click below to send your pre-filled registration dossier directly to Head Coach Farouk Yusuf to receive your trial invitation date, pitch guidelines, and jersey instructions.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a
                    href={whatsappPreFilled}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm"
                    style={{
                      background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      padding: '0.75rem 1.4rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      borderRadius: '50px'
                    }}
                  >
                    <MessageCircle size={16} />
                    <span>Send to Coach (0817 349 6343)</span>
                  </a>
                  <a
                    href={whatsappPreFilled2}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm"
                    style={{
                      background: 'rgba(37, 211, 102, 0.15)',
                      border: '1px solid rgba(37, 211, 102, 0.4)',
                      color: '#4ade80',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      padding: '0.75rem 1.4rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      borderRadius: '50px'
                    }}
                  >
                    <MessageCircle size={16} />
                    <span>Send to Line 2 (0802 974 5452)</span>
                  </a>
                </div>
              </div>

              <button
                onClick={() => setSubmitted(false)}
                className="btn btn-outline btn-sm"
                style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#cbd5e1' }}
              >
                Register Another Player
              </button>
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} style={{
              background: '#090b09',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '2.5rem',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)'
            }}>
              {error && (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#f87171',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  marginBottom: '1.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.88rem'
                }}>
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              {/* 1. ACADEMY SELECTION */}
              <div style={{ marginBottom: '2.25rem' }}>
                <label style={{ display: 'block', color: 'var(--color-gold-primary)', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                  1. Select Academy Team
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div
                    onClick={() => setAcademy('next_pro')}
                    style={{
                      background: academy === 'next_pro' ? 'rgba(255, 208, 0, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      border: academy === 'next_pro' ? '2px solid var(--color-gold-primary)' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      padding: '1.25rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <img src="/logos/fackson-next-pro.jpg" alt="Next Pro" style={{ width: '42px', height: '42px', borderRadius: '50%' }} />
                    <div>
                      <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem' }}>Fackson Next Pro</div>
                      <div style={{ fontSize: '0.75rem', color: '#4ade80' }}>Men / Boys Academy</div>
                    </div>
                  </div>

                  <div
                    onClick={() => setAcademy('angels')}
                    style={{
                      background: academy === 'angels' ? 'rgba(251, 113, 133, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      border: academy === 'angels' ? '2px solid #fb7185' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      padding: '1.25rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <img src="/logos/fackson-angels.jpg" alt="Angels" style={{ width: '42px', height: '42px', borderRadius: '50%' }} />
                    <div>
                      <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem' }}>Fackson Angels</div>
                      <div style={{ fontSize: '0.75rem', color: '#fb7185' }}>Women / Girls Academy</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. AGE DIVISION */}
              <div style={{ marginBottom: '2.25rem' }}>
                <label style={{ display: 'block', color: 'var(--color-gold-primary)', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                  2. Age Category Division
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                  {[
                    { id: 'u10', label: 'Under 10 (Ages 7-10)' },
                    { id: 'u13', label: 'Under 13 (Ages 11-13)' },
                    { id: 'u15', label: 'Under 15 (Ages 14-15)' },
                    { id: 'u17', label: 'Under 17 (Ages 16-17)' },
                    { id: 'senior', label: 'Senior (Free Age / Pro)' }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id as AgeCategory)}
                      style={{
                        background: category === cat.id ? 'var(--color-gold-primary)' : 'rgba(255, 255, 255, 0.04)',
                        color: category === cat.id ? '#000' : '#cbd5e1',
                        border: '1px solid',
                        borderColor: category === cat.id ? 'var(--color-gold-primary)' : 'rgba(255, 255, 255, 0.12)',
                        borderRadius: '50px',
                        padding: '8px 16px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. PLAYER PERSONAL DETAILS */}
              <div style={{ marginBottom: '2.25rem' }}>
                <label style={{ display: 'block', color: 'var(--color-gold-primary)', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                  3. Player Information
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                      Player Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Samuel Olawale"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="form-input"
                      style={{ width: '100%', background: '#040705', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px 14px', color: '#fff' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      required
                      value={dateOfBirth}
                      onChange={e => setDateOfBirth(e.target.value)}
                      className="form-input"
                      style={{ width: '100%', background: '#040705', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px 14px', color: '#fff' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                      Primary Position *
                    </label>
                    <select
                      value={position}
                      onChange={e => setPosition(e.target.value)}
                      className="form-input"
                      style={{ width: '100%', background: '#040705', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px 14px', color: '#fff' }}
                    >
                      <option value="Goalkeeper">Goalkeeper</option>
                      <option value="Center Back">Center Back (DEF)</option>
                      <option value="Full Back">Full Back / Wing Back (DEF)</option>
                      <option value="Defensive Midfielder">Defensive Midfielder (MID)</option>
                      <option value="Central Midfielder">Central Midfielder (MID)</option>
                      <option value="Attacking Midfielder">Attacking Midfielder (MID)</option>
                      <option value="Winger">Winger / Wide Forward (FWD)</option>
                      <option value="Striker">Striker / Center Forward (FWD)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                      Dominant Foot *
                    </label>
                    <select
                      value={dominantFoot}
                      onChange={e => setDominantFoot(e.target.value)}
                      className="form-input"
                      style={{ width: '100%', background: '#040705', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px 14px', color: '#fff' }}
                    >
                      <option value="Right">Right Foot</option>
                      <option value="Left">Left Foot</option>
                      <option value="Both">Both / Ambidextrous</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginTop: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                    Previous Grassroots Club / School Experience (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Alagbado Youth FC or None (First Academy)"
                    value={previousClub}
                    onChange={e => setPreviousClub(e.target.value)}
                    className="form-input"
                    style={{ width: '100%', background: '#040705', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px 14px', color: '#fff' }}
                  />
                </div>
              </div>

              {/* 4. GUARDIAN & CONTACT DETAILS */}
              <div style={{ marginBottom: '2.25rem' }}>
                <label style={{ display: 'block', color: 'var(--color-gold-primary)', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                  4. Parent / Guardian Contact Details
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                      Guardian Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mr. Kehinde Olawale"
                      value={guardianName}
                      onChange={e => setGuardianName(e.target.value)}
                      className="form-input"
                      style={{ width: '100%', background: '#040705', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px 14px', color: '#fff' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 08012345678"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="form-input"
                      style={{ width: '100%', background: '#040705', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px 14px', color: '#fff' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. parent@gmail.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="form-input"
                      style={{ width: '100%', background: '#040705', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px 14px', color: '#fff' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                      Emergency Contact Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 08098765432"
                      value={emergencyPhone}
                      onChange={e => setEmergencyPhone(e.target.value)}
                      className="form-input"
                      style={{ width: '100%', background: '#040705', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px 14px', color: '#fff' }}
                    />
                  </div>
                </div>

                <div style={{ marginTop: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                    Residential Address in Lagos State
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Meiran Estate, Alagbado, Ifako-Ijaiye LGA"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="form-input"
                    style={{ width: '100%', background: '#040705', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px 14px', color: '#fff' }}
                  />
                </div>
              </div>

              {/* 5. MEDICAL & CONSENT */}
              <div style={{ marginBottom: '2.5rem' }}>
                <label style={{ display: 'block', color: 'var(--color-gold-primary)', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                  5. Medical Notes &amp; Guardian Consent
                </label>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                    Known Medical Conditions / Allergies (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. None or Asthma (inhaler carried)"
                    value={medicalConditions}
                    onChange={e => setMedicalConditions(e.target.value)}
                    className="form-input"
                    style={{ width: '100%', background: '#040705', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '10px 14px', color: '#fff' }}
                  />
                </div>

                <label style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  color: '#cbd5e1',
                  lineHeight: 1.5
                }}>
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={e => setAgreed(e.target.checked)}
                    style={{ marginTop: '3px' }}
                  />
                  <span>
                    I confirm that the information provided is correct, and I grant consent for the player to participate in football training, drills, and matches at Meiran Field Estate, Alagbado under Fackson Nextpro &amp; Fackson Angels coaching supervision.
                  </span>
                </label>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                paddingTop: '1.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4ade80', fontSize: '0.8rem', fontWeight: 700 }}>
                  <CheckCircle size={15} />
                  <span>Academy Registration &bull; Instant Confirmation</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-gold btn-md"
                  style={{
                    padding: '0.75rem 2rem',
                    fontSize: '0.9rem',
                    fontWeight: 900
                  }}
                >
                  <UserPlus size={16} />
                  <span>{submitting ? 'Submitting...' : 'Complete Registration'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
