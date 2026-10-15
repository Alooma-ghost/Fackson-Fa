import React, { useState } from 'react';
import { Lock, Shield, ArrowRight, ArrowLeft, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { api, setAuthToken } from '../services/api';
import { AdminUser } from '../types';

interface AdminLoginProps {
  onLoginSuccess: (user: AdminUser) => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await api.login(username, password);
      setAuthToken(data.token);
      onLoginSuccess(data.admin);
    } catch (err: any) {
      setError(err.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-screen">
      <div className="admin-login-card">
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <img 
            src="/logos/fackson-next-pro.jpg" 
            alt="Fackson Next Pro" 
            style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid var(--color-green-light)' }} 
          />
          <img 
            src="/logos/fackson-angels.jpg" 
            alt="Fackson Angels" 
            style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid var(--color-gold-primary)' }} 
          />
        </div>

        <h2 style={{ fontSize: 'clamp(1.15rem, 3.5vw, 1.4rem)', color: '#fff', marginBottom: '0.2rem', fontWeight: 900 }}>
          Fackson Academy
        </h2>
        <p style={{ color: 'var(--color-gold-primary)', fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1.25rem' }}>
          Coach &amp; Staff Portal
        </p>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem',
            color: '#fca5a5',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.25rem',
            textAlign: 'left'
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              required
              placeholder="Enter username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              id="admin-username-input"
            />
          </div>

          <div className="form-group" style={{ position: 'relative', marginBottom: '1.75rem' }}>
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                required
                placeholder="Enter password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                style={{ paddingRight: '2.5rem' }}
                id="admin-password-input"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer'
                }}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-gold" 
            style={{ width: '100%', padding: '0.65rem 1rem', fontSize: '0.86rem', fontWeight: 800 }}
            disabled={loading}
            id="admin-submit-btn"
          >
            {loading ? 'Authenticating...' : 'Sign In to Portal'}
            <ArrowRight size={16} />
          </button>

          <button
            type="button"
            className="btn btn-outline"
            style={{ width: '100%', marginTop: '0.6rem', padding: '0.55rem 1rem', fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            onClick={onCancel}
          >
            <ArrowLeft size={14} />
            <span>Back to Public Website</span>
          </button>
        </form>
      </div>
    </div>
  );
};
