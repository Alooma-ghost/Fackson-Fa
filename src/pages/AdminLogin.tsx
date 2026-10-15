import React, { useState } from 'react';
import { Lock, Shield, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
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
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <img 
            src="/logos/fackson-next-pro.jpg" 
            alt="Fackson Next Pro" 
            style={{ width: '56px', height: '56px', borderRadius: '50%', border: '2px solid var(--color-green-light)' }} 
          />
          <img 
            src="/logos/fackson-angels.jpg" 
            alt="Fackson Angels" 
            style={{ width: '56px', height: '56px', borderRadius: '50%', border: '2px solid var(--color-gold-primary)' }} 
          />
        </div>

        <h2 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '0.25rem' }}>Fackson Academy</h2>
        <p style={{ color: 'var(--color-gold-primary)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.75rem' }}>
          Coach & Staff Portal
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
            style={{ width: '100%', padding: '0.85rem' }}
            disabled={loading}
            id="admin-submit-btn"
          >
            {loading ? 'Authenticating...' : 'Sign In to Admin Portal'}
            <ArrowRight size={18} />
          </button>

          <button
            type="button"
            className="btn btn-outline"
            style={{ width: '100%', marginTop: '0.75rem', padding: '0.75rem' }}
            onClick={onCancel}
          >
            Return to Public Website
          </button>
        </form>
      </div>
    </div>
  );
};
