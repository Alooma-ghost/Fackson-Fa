import React, { useState } from 'react';
import { X, CheckCircle, UserPlus, AlertCircle, CreditCard, ShieldCheck, RefreshCw, ArrowRight } from 'lucide-react';
import { api } from '../services/api';
import { AcademyType, AgeCategory, RegistrationItem } from '../types';

declare global {
  interface Window {
    FlutterwaveCheckout: (options: any) => void;
  }
}

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAcademy?: AcademyType;
}

type PaymentStatusState = 'form' | 'submitting_form' | 'verifying' | 'success' | 'failed' | 'cancelled';

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  defaultAcademy = 'next_pro'
}) => {
  const [formData, setFormData] = useState({
    playerName: '',
    dateOfBirth: '',
    gender: defaultAcademy === 'angels' ? 'female' : 'male',
    academyPreference: defaultAcademy,
    category: 'u17' as AgeCategory,
    parentName: '',
    phone: '',
    email: '',
    address: '',
    position: 'Midfielder',
    experience: ''
  });

  const [paymentState, setPaymentState] = useState<PaymentStatusState>('form');
  const [createdRegistration, setCreatedRegistration] = useState<RegistrationItem | null>(null);
  const [verifiedPaymentData, setVerifiedPaymentData] = useState<any>(null);
  const [currentTxRef, setCurrentTxRef] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const REGISTRATION_FEE = Number(import.meta.env.VITE_ACADEMY_REGISTRATION_FEE) || 25000;
  const CURRENCY = import.meta.env.VITE_ACADEMY_CURRENCY || 'NGN';
  const FLW_PUBLIC_KEY = import.meta.env.VITE_FLW_PUBLIC_KEY || 'FLWPUBK_TEST-cc73af38a7874fae7110bb5d0ad094f7-X';

  if (!isOpen) return null;

  // Generate unique tx_ref for each payment attempt
  const generateTxRef = () => {
    return `FFA-REG-${Date.now()}-${Math.floor(100000 + Math.random() * 900000)}`;
  };

  /**
   * Launch Flutterwave v3 standard inline checkout
   */
  const launchFlutterwavePayment = (regId?: string) => {
    if (typeof window.FlutterwaveCheckout !== 'function') {
      setErrorMessage('Flutterwave checkout SDK could not be loaded. Please check your internet connection.');
      setPaymentState('failed');
      return;
    }

    const tx_ref = generateTxRef();
    setCurrentTxRef(tx_ref);
    let paymentVerified = false;

    window.FlutterwaveCheckout({
      public_key: FLW_PUBLIC_KEY,
      tx_ref: tx_ref,
      amount: REGISTRATION_FEE,
      currency: CURRENCY,
      payment_options: 'card, banktransfer, ussd, qr, credit',
      customer: {
        email: formData.email,
        phone_number: formData.phone,
        name: formData.playerName
      },
      customizations: {
        title: 'Fackson Football Academy',
        description: `Academy Trial & Registration Fee (${formData.academyPreference === 'angels' ? 'Fackson Angels' : 'Fackson Next Pro'})`,
        logo: window.location.origin + '/logos/fackson-next-pro.jpg'
      },
      callback: async (response: any) => {
        console.log('Flutterwave callback response received:', response);

        // Security check: NEVER treat popup closed or unconfirmed status as success
        if (response.status === 'successful' || response.status === 'completed') {
          paymentVerified = true;
          setPaymentState('verifying');

          try {
            // Critical Backend Verification Call
            const verificationResult = await api.verifyPayment({
              transaction_id: response.transaction_id || response.id,
              tx_ref: response.tx_ref || tx_ref,
              registrationId: regId || createdRegistration?._id
            });

            console.log('✅ Server payment verification passed:', verificationResult);
            setVerifiedPaymentData({
              ...verificationResult.data?.payment,
              transaction_id: response.transaction_id || response.id,
              tx_ref: response.tx_ref || tx_ref,
              amount: REGISTRATION_FEE,
              currency: CURRENCY,
              date: new Date().toISOString()
            });

            // Save to localStorage persistence
            try {
              const existingLocal = JSON.parse(localStorage.getItem('ffa_payments') || '[]');
              existingLocal.unshift({
                tx_ref: response.tx_ref || tx_ref,
                transaction_id: response.transaction_id || response.id,
                amount: REGISTRATION_FEE,
                currency: CURRENCY,
                status: 'successful',
                date: new Date().toISOString(),
                playerName: formData.playerName,
                academyPreference: formData.academyPreference
              });
              localStorage.setItem('ffa_payments', JSON.stringify(existingLocal));
            } catch (storageErr) {
              console.warn('localStorage save error:', storageErr);
            }

            setPaymentState('success');
          } catch (verifyErr: any) {
            console.error('❌ Server payment verification error:', verifyErr);
            setErrorMessage(verifyErr.message || 'Payment verification could not be validated with the server.');
            setPaymentState('failed');
          }
        } else {
          setErrorMessage('Transaction was not marked successful by Flutterwave.');
          setPaymentState('failed');
        }
      },
      onclose: () => {
        // Never treat popup closed as success!
        if (!paymentVerified) {
          console.log('ℹ️ Flutterwave popup was closed by customer without verification.');
          setPaymentState('cancelled');
        }
      }
    });
  };

  /**
   * Handle initial form submission (Flutterwave payment disabled per instruction)
   */
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentState('submitting_form');
    setErrorMessage('');

    try {
      // 1. Submit Registration record to backend database as free trial
      const savedReg = await api.submitRegistration({
        ...formData,
        paymentStatus: 'free_trial'
      });
      setCreatedRegistration(savedReg);

      // FLUTTERWAVE DISABLED: Direct success confirmation without charging payment
      // To re-enable later, simply uncomment: launchFlutterwavePayment(savedReg._id);
      setPaymentState('success');
    } catch (err: any) {
      console.warn('Backend API registration note:', err);
      // Fallback to local success if network issue so user still gets WhatsApp confirmation
      setCreatedRegistration({
        _id: 'reg-local-' + Date.now(),
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString()
      } as any);
      setPaymentState('success');
    }
  };

  const handleResetAndClose = () => {
    setPaymentState('form');
    setCreatedRegistration(null);
    setVerifiedPaymentData(null);
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto' }}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* 1. SUCCESS STATE */}
        {paymentState === 'success' && (
          <div style={{ padding: '1.5rem 0.5rem', textAlign: 'center' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '2px solid #10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: '#10b981'
            }}>
              <CheckCircle size={44} />
            </div>

            <span className="badge badge-gold" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
              Academy Registration Confirmed
            </span>

            <h3 style={{ fontSize: '1.75rem', color: '#fff', marginBottom: '0.75rem' }}>
              Welcome to Fackson Academy!
            </h3>

            <div style={{
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.35)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              color: '#a7f3d0',
              fontSize: '0.9rem',
              lineHeight: 1.5,
              marginBottom: '1.25rem',
              textAlign: 'left'
            }}>
              <strong>Trial registration registered.</strong> No online fee required. Please connect with Head Coach Farouk Yusuf to receive your assessment date at Meiran Field Estate, Alagbado.
            </div>

            {/* Registration Summary Card */}
            <div style={{
              background: 'var(--color-surface-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              textAlign: 'left',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.65rem', marginBottom: '0.65rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Athlete</span>
                <strong style={{ color: '#fff' }}>{formData.playerName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.65rem', marginBottom: '0.65rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Academy &amp; Tier</span>
                <strong style={{ color: 'var(--color-gold-primary)' }}>
                  {formData.academyPreference === 'angels' ? 'Fackson Angels (Women)' : 'Fackson Next Pro (Men)'} &bull; {formData.category.toUpperCase()}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.65rem', marginBottom: '0.65rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Training Ground</span>
                <span style={{ color: '#4ade80', fontSize: '0.88rem', fontWeight: 600 }}>Meiran Field Estate, Alagbado</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.65rem', marginBottom: '0.65rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Training Days</span>
                <span style={{ color: '#e2e8f0', fontSize: '0.88rem', fontWeight: 600 }}>Tue, Thu, Sat (6:45 AM – 11:00 AM)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Registration Status</span>
                <span style={{ color: '#4ade80', fontSize: '0.95rem', fontWeight: 800 }}>
                  REGISTRATION SUBMITTED (PENDING INVITATION)
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/2348029745452?text=${encodeURIComponent(
                  `Hello Head Coach Farouk Yusuf, I have registered ${formData.playerName} for Fackson Football Academy (${formData.academyPreference === 'angels' ? 'Angels' : 'Next Pro'}, ${formData.category.toUpperCase()}) trials at Meiran Field Estate, Alagbado. Please confirm trial time.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm"
                style={{
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  color: '#fff',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderRadius: '50px',
                  padding: '0.6rem 1.4rem'
                }}
              >
                <span>0802 974 5452 (Head Coach)</span>
              </a>

              <a
                href={`https://wa.me/2348173496343?text=${encodeURIComponent(
                  `Hello Coach, I have registered ${formData.playerName} for Fackson Football Academy (${formData.academyPreference === 'angels' ? 'Angels' : 'Next Pro'}, ${formData.category.toUpperCase()}) trials at Meiran Field Estate, Alagbado. Please confirm trial time.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm"
                style={{
                  background: 'rgba(37, 211, 102, 0.15)',
                  border: '1px solid rgba(37, 211, 102, 0.4)',
                  color: '#4ade80',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderRadius: '50px',
                  padding: '0.6rem 1.4rem'
                }}
              >
                <span>0817 349 6343 (Coach)</span>
              </a>

              <button className="btn btn-outline btn-sm" onClick={handleResetAndClose}>
                Done &amp; Close
              </button>
            </div>
          </div>
        )}

        {/* 2. VERIFYING STATE */}
        {paymentState === 'verifying' && (
          <div style={{ padding: '3rem 1rem', textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              border: '3px solid rgba(255, 208, 0, 0.2)',
              borderTopColor: 'var(--color-gold-primary)',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1.5rem'
            }} />
            <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '0.75rem' }}>
              Verifying Transaction...
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '440px', margin: '0 auto' }}>
              Communicating with Flutterwave and securing your registration in the academy database. Please do not close this window.
            </p>
          </div>
        )}

        {/* 3. CANCELLED STATE (POPUP CLOSED) */}
        {paymentState === 'cancelled' && (
          <div style={{ padding: '2rem 1rem', textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(234, 179, 8, 0.15)',
              border: '2px solid #eab308',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              color: '#eab308'
            }}>
              <AlertCircle size={36} />
            </div>

            <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '0.5rem' }}>
              Payment Cancelled
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 1.5rem' }}>
              The checkout modal was closed before payment completion. Your trial registration profile is saved, but registration fees must be settled to confirm your trial slot.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button className="btn btn-outline" onClick={handleResetAndClose}>
                Cancel
              </button>
              <button 
                className="btn btn-gold" 
                onClick={() => launchFlutterwavePayment(createdRegistration?._id)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <RefreshCw size={16} />
                Pay Now (₦{REGISTRATION_FEE.toLocaleString()} {CURRENCY})
              </button>
            </div>
          </div>
        )}

        {/* 4. FAILED STATE */}
        {paymentState === 'failed' && (
          <div style={{ padding: '2rem 1rem', textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '2px solid #ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              color: '#ef4444'
            }}>
              <AlertCircle size={36} />
            </div>

            <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '0.5rem' }}>
              Payment Verification Failed
            </h3>
            <p style={{ color: '#fca5a5', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 1.5rem' }}>
              {errorMessage || 'Unable to confirm transaction with Flutterwave. If you were debited, please contact administration with your reference.'}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button className="btn btn-outline" onClick={handleResetAndClose}>
                Dismiss
              </button>
              <button 
                className="btn btn-gold" 
                onClick={() => launchFlutterwavePayment(createdRegistration?._id)}
              >
                Retry Payment
              </button>
            </div>
          </div>
        )}

        {/* 5. FORM STATE */}
        {(paymentState === 'form' || paymentState === 'submitting_form') && (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(255, 208, 0, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-gold-primary)'
                }}>
                  <UserPlus size={20} />
                </div>
                <h3 style={{ fontSize: '1.6rem', color: '#fff' }}>Academy Trial Registration</h3>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                Register for open trials across Fackson Next Pro (Men) and Fackson Angels (Women) squads.
              </p>
            </div>

            {errorMessage && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                color: '#fca5a5',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.25rem'
              }}>
                <AlertCircle size={18} />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Athlete Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Adeleke"
                    value={formData.playerName}
                    onChange={(e) => setFormData({ ...formData, playerName: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Date of Birth *</label>
                  <input
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Academy Preference *</label>
                  <select
                    className="form-select"
                    value={formData.academyPreference}
                    onChange={(e) => {
                      const pref = e.target.value as AcademyType;
                      setFormData({
                        ...formData,
                        academyPreference: pref,
                        gender: pref === 'angels' ? 'female' : 'male'
                      });
                    }}
                  >
                    <option value="next_pro">Fackson Next Pro (Men Academy)</option>
                    <option value="angels">Fackson Angels (Women Academy)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Age Tier / Category *</label>
                  <select
                    className="form-select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as AgeCategory })}
                  >
                    <option value="u10">Under 10 (U-10)</option>
                    <option value="u13">Under 13 (U-13)</option>
                    <option value="u15">Under 15 (U-15)</option>
                    <option value="u17">Under 17 (U-17)</option>
                    <option value="free_age">Free Age (Senior Team)</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Preferred Position *</label>
                  <select
                    className="form-select"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  >
                    <option value="Forward">Forward / Striker / Winger</option>
                    <option value="Midfielder">Attacking / Defensive Midfielder</option>
                    <option value="Defender">Center Back / Full Back</option>
                    <option value="Goalkeeper">Goalkeeper</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Gender *</label>
                  <select
                    className="form-select"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 800 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="contact@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Parent / Guardian Name (if under 18)</label>
                <input
                  type="text"
                  placeholder="e.g. Chief Adeleke"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Previous Club / Grassroots Experience</label>
                <textarea
                  placeholder="List previous youth teams, school tournaments, notable awards or experience..."
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="form-textarea"
                  rows={2}
                />
              </div>

              {/* REGISTRATION CALLOUT BANNER */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(6, 61, 39, 0.4) 0%, rgba(255, 208, 0, 0.08) 100%)',
                border: '1px solid rgba(255, 208, 0, 0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                margin: '1.25rem 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>
                    <ShieldCheck size={18} color="#4ade80" />
                    <span>Official Academy Registration &bull; Meiran Field Estate, Alagbado</span>
                  </div>
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                    Direct Coach Scheduling &bull; Official Pitch Assessment
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: '#4ade80' }}>
                    OPEN ROSTER
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-outline" onClick={onClose}>
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-gold" 
                  disabled={paymentState === 'submitting_form'}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800 }}
                >
                  <UserPlus size={18} />
                  <span>
                    {paymentState === 'submitting_form' ? 'Registering...' : 'Complete Registration'}
                  </span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
