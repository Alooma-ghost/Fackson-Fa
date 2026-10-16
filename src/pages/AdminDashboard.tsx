import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, Users, Newspaper, Calendar, UserPlus, LogOut, Upload, Trash2, 
  Plus, Check, AlertCircle, ArrowLeft, Image as ImageIcon, Eye, Shield, Trophy, CreditCard,
  MapPin, Clock, Flag, RefreshCw
} from 'lucide-react';
import { api, removeAuthToken, getMediaUrl, fileToBase64 } from '../services/api';
import { Player, GalleryItem, NewsItem, MatchItem, RegistrationItem, AdminUser, AcademyType, AgeCategory, PaymentItem } from '../types';

interface AdminDashboardProps {
  adminUser: AdminUser;
  onLogout: () => void;
  onReturnToSite: () => void;
  players: Player[];
  gallery: GalleryItem[];
  news: NewsItem[];
  matches: MatchItem[];
  registrations: RegistrationItem[];
  refreshData: () => Promise<void>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  adminUser,
  onLogout,
  onReturnToSite,
  players,
  gallery,
  news,
  matches,
  registrations,
  refreshData
}) => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'players' | 'news' | 'matches' | 'registrations'>('gallery');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // ================= PICTURE / GALLERY POSTING FORM STATE =================
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    caption: '',
    category: 'training',
    academy: 'all',
    tags: '',
    imageUrl: ''
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const url = await api.uploadImage(file);
      setGalleryForm(prev => ({ ...prev, imageUrl: url }));
      showNotification('success', 'Image uploaded successfully!');
    } catch (err: any) {
      showNotification('error', err.message || 'Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handlePostGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.title || !galleryForm.imageUrl) {
      showNotification('error', 'Please provide a Title and an Image.');
      return;
    }
    setLoading(true);
    try {
      await api.createGalleryItem({
        title: galleryForm.title,
        caption: galleryForm.caption,
        category: galleryForm.category as any,
        academy: galleryForm.academy as any,
        imageUrl: galleryForm.imageUrl,
        tags: galleryForm.tags ? galleryForm.tags.split(',').map(t => t.trim()) : []
      });
      showNotification('success', 'New picture posted to gallery successfully!');
      setGalleryForm({
        title: '',
        caption: '',
        category: 'training',
        academy: 'all',
        tags: '',
        imageUrl: ''
      });
      await refreshData();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to post picture');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm('Are you sure you want to delete this picture from gallery?')) return;
    try {
      await api.deleteGalleryItem(id);
      showNotification('success', 'Picture removed from gallery');
      await refreshData();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to delete picture');
    }
  };

  // ================= PLAYER SQUAD FORM STATE =================
  const playerFileInputRef = useRef<HTMLInputElement>(null);
  const [playerForm, setPlayerForm] = useState({
    name: '',
    academy: 'next_pro' as AcademyType,
    category: 'u17' as AgeCategory,
    position: 'Forward' as any,
    jerseyNumber: 10,
    age: 16,
    photoUrl: '',
    bio: '',
    appearances: 0,
    goals: 0,
    assists: 0,
    cleanSheets: 0,
    featured: true
  });

  const handlePlayerPhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await api.uploadImage(file);
      setPlayerForm(prev => ({ ...prev, photoUrl: url }));
      showNotification('success', 'Player photo uploaded!');
    } catch (err: any) {
      showNotification('error', err.message || 'Photo upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCreatePlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerForm.name || !playerForm.jerseyNumber) {
      showNotification('error', 'Please fill in player name and jersey number.');
      return;
    }
    setLoading(true);
    try {
      await api.createPlayer({
        name: playerForm.name,
        academy: playerForm.academy,
        category: playerForm.category,
        position: playerForm.position,
        jerseyNumber: Number(playerForm.jerseyNumber),
        age: Number(playerForm.age),
        photoUrl: playerForm.photoUrl,
        bio: playerForm.bio,
        stats: {
          appearances: Number(playerForm.appearances),
          goals: Number(playerForm.goals),
          assists: Number(playerForm.assists),
          cleanSheets: Number(playerForm.cleanSheets)
        },
        featured: playerForm.featured
      });
      showNotification('success', `Player ${playerForm.name} added to roster!`);
      setPlayerForm({
        name: '',
        academy: 'next_pro',
        category: 'u17',
        position: 'Forward',
        jerseyNumber: 11,
        age: 16,
        photoUrl: '',
        bio: '',
        appearances: 0,
        goals: 0,
        assists: 0,
        cleanSheets: 0,
        featured: true
      });
      await refreshData();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to add player');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlayer = async (id: string) => {
    if (!confirm('Are you sure you want to remove this player from the roster?')) return;
    try {
      await api.deletePlayer(id);
      showNotification('success', 'Player removed from squad');
      await refreshData();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to delete player');
    }
  };

  // ================= NEWS FORM STATE =================
  const newsFileInputRef = useRef<HTMLInputElement>(null);
  const [newsForm, setNewsForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'match',
    coverImage: '',
    academy: 'all' as any,
    author: 'Fackson Academy Media'
  });

  const handleNewsImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await api.uploadImage(file);
      setNewsForm(prev => ({ ...prev, coverImage: url }));
      showNotification('success', 'Article cover uploaded!');
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCreateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title || !newsForm.content) {
      showNotification('error', 'Please provide a title and article body.');
      return;
    }
    setLoading(true);
    try {
      await api.createNews({
        title: newsForm.title,
        excerpt: newsForm.excerpt,
        content: newsForm.content,
        category: newsForm.category,
        coverImage: newsForm.coverImage,
        academy: newsForm.academy,
        author: newsForm.author
      });
      showNotification('success', 'Article published to website!');
      setNewsForm({
        title: '',
        excerpt: '',
        content: '',
        category: 'match',
        coverImage: '',
        academy: 'all',
        author: 'Fackson Academy Media'
      });
      await refreshData();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to publish news');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNews = async (id: string) => {
    if (!confirm('Delete this article?')) return;
    try {
      await api.deleteNews(id);
      showNotification('success', 'Article removed');
      await refreshData();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to delete');
    }
  };

  // ================= MATCH FIXTURE STATE =================
  const ourLogoFileInputRef = useRef<HTMLInputElement>(null);
  const opponentLogoFileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingOurLogo, setUploadingOurLogo] = useState(false);
  const [uploadingOpponentLogo, setUploadingOpponentLogo] = useState(false);

  const [matchForm, setMatchForm] = useState({
    title: '',
    homeTeam: 'Fackson Next Pro U17',
    awayTeam: '',
    homeLogo: '/logos/fackson-next-pro.jpg',
    awayLogo: '',
    academy: 'next_pro' as AcademyType,
    category: 'u17' as AgeCategory,
    gameType: '11 v 11',
    date: new Date().toISOString().split('T')[0],
    time: '15:00',
    venue: 'Meiran Field Estate - Ojokoro Housing Estate Field, Meiran Alagbado',
    competition: 'Lagos State Elite Grassroots League',
    status: 'upcoming' as 'upcoming' | 'completed' | 'live',
    homeScore: 0,
    awayScore: 0,
    scorers: ''
  });

  const handleOurLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingOurLogo(true);
    try {
      const url = await api.uploadImage(file);
      setMatchForm(prev => ({ ...prev, homeLogo: url }));
      showNotification('success', 'Our team logo uploaded!');
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to upload our logo');
    } finally {
      setUploadingOurLogo(false);
    }
  };

  const handleOpponentLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingOpponentLogo(true);
    try {
      const url = await api.uploadImage(file);
      setMatchForm(prev => ({ ...prev, awayLogo: url }));
      showNotification('success', 'Opponent logo uploaded!');
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to upload opponent logo');
    } finally {
      setUploadingOpponentLogo(false);
    }
  };

  const handleCreateMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchForm.homeTeam || !matchForm.awayTeam) {
      showNotification('error', 'Please provide both home and away teams.');
      return;
    }
    setLoading(true);
    try {
      await api.createMatch({
        ...matchForm,
        scorers: matchForm.scorers ? matchForm.scorers.split(',').map(s => s.trim()).filter(Boolean) : []
      });
      showNotification('success', 'Match fixture created and published!');
      setMatchForm({
        title: '',
        homeTeam: matchForm.academy === 'angels' ? 'Fackson Angels U17' : 'Fackson Next Pro U17',
        awayTeam: '',
        homeLogo: matchForm.academy === 'angels' ? '/logos/fackson-angels.jpg' : '/logos/fackson-next-pro.jpg',
        awayLogo: '',
        academy: matchForm.academy,
        category: matchForm.category,
        gameType: matchForm.gameType || '11 v 11',
        date: new Date().toISOString().split('T')[0],
        time: '15:00',
        venue: 'Meiran Field Estate - Ojokoro Housing Estate Field, Meiran Alagbado',
        competition: 'Lagos State Elite Grassroots League',
        status: 'upcoming',
        homeScore: 0,
        awayScore: 0,
        scorers: ''
      });
      await refreshData();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to create match');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMatch = async (id: string) => {
    if (!confirm('Delete this match?')) return;
    try {
      await api.deleteMatch(id);
      showNotification('success', 'Match deleted');
      await refreshData();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to delete');
    }
  };

  // ================= REGISTRATIONS STATUS UPDATE =================
  const handleUpdateRegStatus = async (id: string, status: string) => {
    try {
      await api.updateRegistrationStatus(id, status);
      showNotification('success', `Status updated to ${status}`);
      await refreshData();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to update status');
    }
  };

  return (
    <div className="admin-wrapper">
      {/* Top Header */}
      <header className="admin-header">
        <div className="admin-header-title">
          <div className="admin-header-logos">
            <img src="/logos/fackson-next-pro.jpg" alt="" className="admin-logo-small" />
            <img src="/logos/fackson-angels.jpg" alt="" className="admin-logo-small" />
          </div>
          <div>
            <h2 className="admin-title-heading">COACH &amp; STAFF PORTAL</h2>
            <p className="admin-title-sub">
              Logged in as: <strong>{adminUser.name}</strong> ({adminUser.role})
            </p>
          </div>
        </div>

        <div className="admin-header-actions">
          <button className="btn btn-outline admin-header-btn" onClick={onReturnToSite}>
            <ArrowLeft size={14} />
            <span>Back to Website</span>
          </button>
          <button 
            className="btn admin-header-btn admin-logout-btn" 
            onClick={() => {
              removeAuthToken();
              onLogout();
            }}
          >
            <LogOut size={14} />
            <span>Log Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
        {/* Floating Notification */}
        {notification && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            background: notification.type === 'success' ? '#0f5132' : '#842029',
            color: '#fff',
            boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.95rem',
            fontWeight: 600
          }}>
            {notification.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
            <span>{notification.message}</span>
          </div>
        )}

        {/* Top Stats Overview */}
        <div className="admin-stats-bar">
          <div className="admin-stat-card">
            <div className="stat-icon-wrap">
              <Camera size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: '#fff' }}>
                {gallery.length}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>
                Gallery Pictures
              </div>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon-wrap" style={{ color: '#4ade80', background: 'rgba(34, 197, 94, 0.15)' }}>
              <Users size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: '#fff' }}>
                {players.length}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>
                Total Squad Players
              </div>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon-wrap" style={{ color: '#60a5fa', background: 'rgba(96, 165, 250, 0.15)' }}>
              <Calendar size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: '#fff' }}>
                {matches.length}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>
                Match Schedules
              </div>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon-wrap" style={{ color: 'var(--color-gold-primary)', background: 'rgba(255, 208, 0, 0.15)' }}>
              <UserPlus size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: '#fff' }}>
                {registrations.length}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>
                Trial Registrations
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="admin-tabs">
          <button 
            className={`admin-tab ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
            id="tab-admin-gallery"
          >
            <Camera size={18} />
            <span className="admin-tab-label">Pictures ({gallery.length})</span>
          </button>

          <button 
            className={`admin-tab ${activeTab === 'players' ? 'active' : ''}`}
            onClick={() => setActiveTab('players')}
            id="tab-admin-players"
          >
            <Users size={18} />
            <span className="admin-tab-label">Squad ({players.length})</span>
          </button>

          <button 
            className={`admin-tab ${activeTab === 'news' ? 'active' : ''}`}
            onClick={() => setActiveTab('news')}
            id="tab-admin-news"
          >
            <Newspaper size={18} />
            <span className="admin-tab-label">News ({news.length})</span>
          </button>

          <button 
            className={`admin-tab ${activeTab === 'matches' ? 'active' : ''}`}
            onClick={() => setActiveTab('matches')}
            id="tab-admin-matches"
          >
            <Trophy size={18} />
            <span className="admin-tab-label">Fixtures ({matches.length})</span>
          </button>

          <button 
            className={`admin-tab ${activeTab === 'registrations' ? 'active' : ''}`}
            onClick={() => setActiveTab('registrations')}
            id="tab-admin-registrations"
          >
            <UserPlus size={18} />
            <span className="admin-tab-label">Trials ({registrations.length})</span>
          </button>
        </div>

        {/* TAB 1: POST PICTURES / GALLERY MANAGEMENT */}
        {activeTab === 'gallery' && (
          <div>
            <div className="glass-card" style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Upload size={22} color="var(--color-gold-primary)" />
                <span>Upload & Post New Photo to Academy Gallery</span>
              </h3>

              <form onSubmit={handlePostGallery}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  {/* File Upload Dropzone */}
                  <div>
                    <label className="form-label">Select Image File (JPG, PNG, WEBP)</label>
                    <div 
                      className="upload-dropzone" 
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleImageFileChange} 
                        accept="image/*" 
                        style={{ display: 'none' }} 
                        id="admin-image-file-input"
                      />
                      <Upload size={32} color="var(--color-gold-primary)" />
                      <div>
                        <strong style={{ color: '#fff', fontSize: '0.95rem' }}>
                          {uploadingImage ? 'Uploading image...' : 'Click to Browse Image File'}
                        </strong>
                        <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '4px' }}>
                          Supports JPEG, PNG, WebP up to 10MB
                        </p>
                      </div>
                    </div>

                    {galleryForm.imageUrl && (
                      <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.8rem', color: '#4ade80' }}>✓ Image ready</span>
                        <img 
                          src={getMediaUrl(galleryForm.imageUrl, '/images/training-1.jpg')} 
                          alt="Preview" 
                          className="upload-preview-img"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/training-1.jpg';
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Metadata Fields */}
                  <div>
                    <div className="form-group">
                      <label className="form-label">Photo Title *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Next Pro U17 Tactical Training Session"
                        value={galleryForm.title}
                        onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                        className="form-input"
                        id="gallery-title-input"
                      />
                    </div>

                    {/* Age / Squad Category */}
                    <div className="form-group">
                      <label className="form-label">📂 Age Tier / Squad Category *</label>
                      <select 
                        className="form-select"
                        value={galleryForm.category}
                        onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                        id="gallery-category-select"
                      >
                        <optgroup label="— Age Squads (Next Pro Male) —">
                          <option value="u10_boys">🔵 Under 10 – Boys (Next Pro U10)</option>
                          <option value="u13_boys">🔵 Under 13 – Boys (Next Pro U13)</option>
                          <option value="u15_boys">🔵 Under 15 – Boys (Next Pro U15)</option>
                          <option value="u17_boys">🔵 Under 17 – Boys (Next Pro U17)</option>
                          <option value="senior_boys">🔵 Free Age / Senior – Boys</option>
                        </optgroup>
                        <optgroup label="— Age Squads (Angels Female) —">
                          <option value="u10_girls">🟡 Under 10 – Girls (Angels U10)</option>
                          <option value="u13_girls">🟡 Under 13 – Girls (Angels U13)</option>
                          <option value="u15_girls">🟡 Under 15 – Girls (Angels U15)</option>
                          <option value="u17_girls">🟡 Under 17 – Girls (Angels U17)</option>
                          <option value="senior_girls">🟡 Free Age / Senior – Girls</option>
                        </optgroup>
                        <optgroup label="— Special Categories —">
                          <option value="coaches">👨‍🏫 Coaches & Technical Staff</option>
                          <option value="alumni">🌍 Alumni (European Graduates)</option>
                          <option value="training">⚽ Training Drills & Sessions</option>
                          <option value="matches">🏟️ Match Action & Highlights</option>
                          <option value="trophies">🏆 Trophy & Award Celebrations</option>
                          <option value="facilities">🏗️ Academy Facilities & Grounds</option>
                          <option value="events">📸 Academy Events & Ceremonies</option>
                        </optgroup>
                      </select>
                      <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>Select the squad or theme that best describes this photo</p>
                    </div>

                    <div className="form-group">
                      <label className="form-label">🏟️ Academy Team</label>
                      <select 
                        className="form-select"
                        value={galleryForm.academy}
                        onChange={(e) => setGalleryForm({ ...galleryForm, academy: e.target.value })}
                      >
                        <option value="all">Both Academies (General)</option>
                        <option value="next_pro">Fackson Next Pro (Male)</option>
                        <option value="angels">Fackson Angels (Female)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Caption / Description</label>
                      <input 
                        type="text" 
                        placeholder="Short summary of this photo..."
                        value={galleryForm.caption}
                        onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Tags (comma separated)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. U17, Championship, Coach, Goal"
                        value={galleryForm.tags}
                        onChange={(e) => setGalleryForm({ ...galleryForm, tags: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-gold" 
                      style={{ width: '100%', marginTop: '0.5rem' }}
                      disabled={loading || uploadingImage || !galleryForm.imageUrl}
                      id="btn-post-photo"
                    >
                      <Plus size={18} />
                      <span>{loading ? 'Posting...' : 'Publish Photo to Website Gallery'}</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Gallery Items Table */}
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#fff' }}>
              Existing Gallery Media ({gallery.length})
            </h3>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Title & Caption</th>
                    <th>Category</th>
                    <th>Academy</th>
                    <th>Tags</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {gallery.map(item => (
                    <tr key={item._id}>
                      <td>
                        <img 
                          src={getMediaUrl(item.imageUrl, '/images/training-1.jpg')} 
                          alt="" 
                          className="table-thumb" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/training-1.jpg';
                          }}
                        />
                      </td>
                      <td>
                        <strong>{item.title}</strong>
                        {item.caption && <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{item.caption}</p>}
                      </td>
                      <td>
                        {(() => {
                          const catMap: Record<string, { label: string; color: string }> = {
                            u10_boys: { label: '🔵 U10 Boys', color: '#1d4ed8' },
                            u13_boys: { label: '🔵 U13 Boys', color: '#1d4ed8' },
                            u15_boys: { label: '🔵 U15 Boys', color: '#1d4ed8' },
                            u17_boys: { label: '🔵 U17 Boys', color: '#1d4ed8' },
                            senior_boys: { label: '🔵 Senior Boys', color: '#1d4ed8' },
                            u10_girls: { label: '🟡 U10 Girls', color: '#92400e' },
                            u13_girls: { label: '🟡 U13 Girls', color: '#92400e' },
                            u15_girls: { label: '🟡 U15 Girls', color: '#92400e' },
                            u17_girls: { label: '🟡 U17 Girls', color: '#92400e' },
                            senior_girls: { label: '🟡 Senior Girls', color: '#92400e' },
                            coaches: { label: '👨‍🏫 Coaches', color: '#065f46' },
                            alumni: { label: '🌍 Alumni', color: '#4c1d95' },
                            training: { label: '⚽ Training', color: '#374151' },
                            matches: { label: '🏟️ Matches', color: '#374151' },
                            trophies: { label: '🏆 Trophies', color: '#78350f' },
                            facilities: { label: '🏗️ Facilities', color: '#374151' },
                            events: { label: '📸 Events', color: '#374151' },
                          };
                          const cat = catMap[item.category] || { label: item.category, color: '#374151' };
                          return (
                            <span style={{
                              display: 'inline-block',
                              padding: '3px 10px',
                              borderRadius: '20px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              background: cat.color + '33',
                              color: '#e2e8f0',
                              border: `1px solid ${cat.color}66`,
                              whiteSpace: 'nowrap'
                            }}>
                              {cat.label}
                            </span>
                          );
                        })()}
                      </td>
                      <td>
                        <span className={`badge ${item.academy === 'angels' ? 'badge-gold' : item.academy === 'next_pro' ? 'badge-green' : 'badge-navy'}`}>
                          {item.academy === 'angels' ? 'Angels' : item.academy === 'next_pro' ? 'Next Pro' : 'All'}
                        </span>
                      </td>
                      <td>
                        {item.tags?.join(', ') || '-'}
                      </td>
                      <td>
                        <button 
                          className="btn-icon-danger"
                          title="Delete Picture"
                          onClick={() => handleDeleteGallery(item._id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: MANAGE PLAYERS / SQUADS */}
        {activeTab === 'players' && (
          <div>
            <div className="glass-card" style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Plus size={22} color="var(--color-gold-primary)" />
                <span>Add New Player to Academy Roster</span>
              </h3>

              <form onSubmit={handleCreatePlayer}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Player Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Emmanuel Fackson"
                      value={playerForm.name}
                      onChange={(e) => setPlayerForm({ ...playerForm, name: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Academy Team *</label>
                    <select 
                      className="form-select"
                      value={playerForm.academy}
                      onChange={(e) => setPlayerForm({ ...playerForm, academy: e.target.value as AcademyType })}
                    >
                      <option value="next_pro">Fackson Next Pro (Male)</option>
                      <option value="angels">Fackson Angels (Female)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Age Tier / Category *</label>
                    <select 
                      className="form-select"
                      value={playerForm.category}
                      onChange={(e) => setPlayerForm({ ...playerForm, category: e.target.value as AgeCategory })}
                    >
                      <option value="u10">Under 10 (U-10)</option>
                      <option value="u13">Under 13 (U-13)</option>
                      <option value="u17">Under 17 (U-17)</option>
                      <option value="free_age">Free Age (Senior)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Playing Position *</label>
                    <select 
                      className="form-select"
                      value={playerForm.position}
                      onChange={(e) => setPlayerForm({ ...playerForm, position: e.target.value as any })}
                    >
                      <option value="Forward">Forward / Winger / Striker</option>
                      <option value="Midfielder">Midfielder</option>
                      <option value="Defender">Defender</option>
                      <option value="Goalkeeper">Goalkeeper</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Jersey Number *</label>
                    <input 
                      type="number" 
                      required 
                      min={1} 
                      max={99}
                      value={playerForm.jerseyNumber}
                      onChange={(e) => setPlayerForm({ ...playerForm, jerseyNumber: Number(e.target.value) })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Age</label>
                    <input 
                      type="number" 
                      required 
                      min={7} 
                      max={35}
                      value={playerForm.age}
                      onChange={(e) => setPlayerForm({ ...playerForm, age: Number(e.target.value) })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row" style={{ marginTop: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Player Photo</label>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <input 
                        type="file" 
                        ref={playerFileInputRef} 
                        onChange={handlePlayerPhotoChange} 
                        accept="image/*" 
                        style={{ display: 'none' }} 
                      />
                      <button 
                        type="button" 
                        className="btn btn-outline btn-sm"
                        onClick={() => playerFileInputRef.current?.click()}
                      >
                        <Upload size={16} />
                        <span>Upload Photo</span>
                      </button>
                      <span style={{ fontSize: '0.82rem', color: '#94a3b8', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {playerForm.photoUrl}
                      </span>
                    </div>
                    {playerForm.photoUrl ? (
                      <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img 
                          src={getMediaUrl(playerForm.photoUrl)} 
                          alt="Player preview" 
                          style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-gold-primary)' }}
                          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                        />
                        <span style={{ fontSize: '0.8rem', color: '#4ade80' }}>✓ Photo attached</span>
                      </div>
                    ) : (
                      <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                        ℹ️ No photo attached yet. A sleek academy athlete monogram will be generated automatically.
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Player Bio / Highlights</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Captain and top goalscorer in the regional cup."
                      value={playerForm.bio}
                      onChange={(e) => setPlayerForm({ ...playerForm, bio: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row" style={{ marginTop: '0.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Appearances</label>
                    <input 
                      type="number" 
                      value={playerForm.appearances}
                      onChange={(e) => setPlayerForm({ ...playerForm, appearances: Number(e.target.value) })}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Goals</label>
                    <input 
                      type="number" 
                      value={playerForm.goals}
                      onChange={(e) => setPlayerForm({ ...playerForm, goals: Number(e.target.value) })}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Assists</label>
                    <input 
                      type="number" 
                      value={playerForm.assists}
                      onChange={(e) => setPlayerForm({ ...playerForm, assists: Number(e.target.value) })}
                      className="form-input"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-green" 
                  style={{ width: '100%', marginTop: '1.25rem' }}
                  disabled={loading}
                >
                  <Plus size={18} />
                  <span>Save Player to Roster</span>
                </button>
              </form>
            </div>

            {/* Players Table */}
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#fff' }}>
              Current Squad Rosters ({players.length})
            </h3>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Player</th>
                    <th>Academy</th>
                    <th>Tier</th>
                    <th>Position</th>
                    <th>#</th>
                    <th>Age</th>
                    <th>Stats</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map(p => (
                    <tr key={p._id}>
                      <td>
                        <div className="table-player-cell">
                          {p.photoUrl && !p.photoUrl.includes('training-1.jpg') && !p.photoUrl.includes('angels-action-1.jpg') ? (
                            <img 
                              src={getMediaUrl(p.photoUrl)} 
                              alt="" 
                              className="table-thumb" 
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="table-thumb" style={{
                              background: p.academy === 'angels' ? 'linear-gradient(135deg, #be185d, #1e1b4b)' : 'linear-gradient(135deg, #15803d, #0f172a)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--color-gold-primary)',
                              fontWeight: 800,
                              fontSize: '0.85rem'
                            }}>
                              {p.name ? p.name.charAt(0).toUpperCase() : 'P'}
                            </div>
                          )}
                          <strong>{p.name}</strong>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${p.academy === 'angels' ? 'badge-gold' : 'badge-green'}`}>
                          {p.academy === 'angels' ? 'Angels' : 'Next Pro'}
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-navy">
                          {p.category === 'free_age' ? 'Senior' : p.category.toUpperCase()}
                        </span>
                      </td>
                      <td>{p.position}</td>
                      <td><strong style={{ color: 'var(--color-gold-primary)' }}>#{p.jerseyNumber}</strong></td>
                      <td>{p.age}</td>
                      <td style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                        {p.stats.appearances} apps / {p.stats.goals} goals
                      </td>
                      <td>
                        <button 
                          className="btn-icon-danger"
                          title="Delete Player"
                          onClick={() => handleDeletePlayer(p._id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: POST NEWS & ARTICLES */}
        {activeTab === 'news' && (
          <div>
            <div className="glass-card" style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Newspaper size={22} color="var(--color-gold-primary)" />
                <span>Publish News or Scouting Article</span>
              </h3>

              <form onSubmit={handleCreateNews}>
                <div className="form-group">
                  <label className="form-label">Article Headline *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Next Pro U17 Sign 3 Youth Prodigies Ahead of Cup"
                    value={newsForm.title}
                    onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">📌 News Category *</label>
                    <select 
                      className="form-select"
                      value={newsForm.category}
                      onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                      id="news-category-select"
                    >
                      <option value="match">🏟️ Match Report &amp; Fixtures</option>
                      <option value="training">⚽ Training &amp; Pitch Drills</option>
                      <option value="alumni">🌍 Alumni &amp; European Transfers</option>
                      <option value="trials">📝 Trials &amp; Roster Registration</option>
                      <option value="announcement">📢 Academy Announcement</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Academy Association *</label>
                    <select 
                      className="form-select"
                      value={newsForm.academy}
                      onChange={(e) => setNewsForm({ ...newsForm, academy: e.target.value as any })}
                    >
                      <option value="all">Both Academies</option>
                      <option value="next_pro">Fackson Next Pro (Male)</option>
                      <option value="angels">Fackson Angels (Female)</option>
                    </select>
                  </div>
                </div>

                  <div className="form-group">
                    <label className="form-label">Cover Image</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input 
                        type="file" 
                        ref={newsFileInputRef} 
                        onChange={handleNewsImageChange} 
                        accept="image/*" 
                        style={{ display: 'none' }} 
                      />
                      <button 
                        type="button" 
                        className="btn btn-outline btn-sm"
                        onClick={() => newsFileInputRef.current?.click()}
                      >
                        <Upload size={16} />
                        <span>Upload Cover</span>
                      </button>
                      <input 
                        type="text" 
                        value={newsForm.coverImage}
                        onChange={(e) => setNewsForm({ ...newsForm, coverImage: e.target.value })}
                        className="form-input" 
                        style={{ flex: 1 }}
                      />
                    </div>
                    {newsForm.coverImage ? (
                      <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img 
                          src={getMediaUrl(newsForm.coverImage)} 
                          alt="Cover preview" 
                          style={{ width: '60px', height: '40px', borderRadius: '4px', objectFit: 'cover', border: '1px solid var(--color-gold-primary)' }}
                          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                        />
                        <span style={{ fontSize: '0.8rem', color: '#4ade80' }}>✓ Cover image ready</span>
                      </div>
                    ) : (
                      <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                        ℹ️ No cover photo uploaded yet. An editorial theme badge will be used.
                      </div>
                    )}
                  </div>

                <div className="form-group">
                  <label className="form-label">Short Excerpt (Summary)</label>
                  <input 
                    type="text" 
                    placeholder="Brief 1-2 sentence preview..."
                    value={newsForm.excerpt}
                    onChange={(e) => setNewsForm({ ...newsForm, excerpt: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Full Article Content *</label>
                  <textarea 
                    required 
                    rows={6}
                    placeholder="Write the full report or announcement here..."
                    value={newsForm.content}
                    onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-gold" 
                  style={{ width: '100%' }}
                  disabled={loading}
                >
                  <Plus size={18} />
                  <span>Publish Article</span>
                </button>
              </form>
            </div>

            {/* Existing News List */}
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#fff' }}>
              Published Articles ({news.length})
            </h3>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Cover</th>
                    <th>Headline</th>
                    <th>Category</th>
                    <th>Academy</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {news.map(n => (
                    <tr key={n._id}>
                      <td>
                        {n.coverImage && !n.coverImage.includes('training-1.jpg') ? (
                          <img 
                            src={getMediaUrl(n.coverImage)} 
                            alt="" 
                            className="table-thumb" 
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="table-thumb" style={{
                            background: 'linear-gradient(135deg, rgba(255,208,0,0.2) 0%, rgba(15,23,42,0.9) 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--color-gold-primary)',
                            fontSize: '0.9rem'
                          }}>
                            📰
                          </div>
                        )}
                      </td>
                      <td>
                        <strong>{n.title}</strong>
                        <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{n.excerpt}</p>
                      </td>
                      <td>
                        <span className="badge badge-navy" style={{ textTransform: 'capitalize' }}>
                          {n.category || 'match'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${n.academy === 'angels' ? 'badge-gold' : n.academy === 'next_pro' ? 'badge-green' : 'badge-navy'}`}>
                          {n.academy}
                        </span>
                      </td>
                      <td>{n.date}</td>
                      <td>
                        <button 
                          className="btn-icon-danger"
                          title="Delete News"
                          onClick={() => handleDeleteNews(n._id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: MANAGE MATCHES */}
        {activeTab === 'matches' && (
          <div>
            {/* Hidden file inputs for logos */}
            <input 
              type="file" 
              ref={ourLogoFileInputRef} 
              onChange={handleOurLogoChange} 
              accept="image/*" 
              style={{ display: 'none' }} 
            />
            <input 
              type="file" 
              ref={opponentLogoFileInputRef} 
              onChange={handleOpponentLogoChange} 
              accept="image/*" 
              style={{ display: 'none' }} 
            />

            <div className="glass-card" style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem', margin: 0 }}>
                    <Trophy size={24} color="var(--color-gold-primary)" />
                    <span>Match Fixture & Results Studio</span>
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: '0.35rem 0 0 0' }}>
                    Configure match venue, competition format (11v11, 8-aside, etc.), upload opponent crests, and publish upcoming fixtures or final scores.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setMatchForm(prev => ({
                        ...prev,
                        academy: 'next_pro',
                        homeTeam: 'Fackson Next Pro U17',
                        homeLogo: '/logos/fackson-next-pro.jpg'
                      }));
                    }}
                    className={`btn btn-sm ${matchForm.academy === 'next_pro' ? 'btn-green' : 'btn-outline'}`}
                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                  >
                    Next Pro Match
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMatchForm(prev => ({
                        ...prev,
                        academy: 'angels',
                        homeTeam: 'Fackson Angels U17',
                        homeLogo: '/logos/fackson-angels.jpg'
                      }));
                    }}
                    className={`btn btn-sm ${matchForm.academy === 'angels' ? 'btn-gold' : 'btn-outline'}`}
                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                  >
                    Angels Match
                  </button>
                </div>
              </div>

              <form onSubmit={handleCreateMatch}>
                {/* LOGO SELECTION / UPLOAD PALETTES */}
                <div style={{ 
                  background: 'rgba(255, 255, 255, 0.03)', 
                  border: '1px solid rgba(255, 255, 255, 0.08)', 
                  borderRadius: '12px', 
                  padding: '1.25rem', 
                  marginBottom: '1.75rem' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Flag size={18} color="var(--color-gold-primary)" />
                    <span style={{ color: '#f8fafc', fontWeight: 600, fontSize: '1rem' }}>Team Crest & Logo Palette</span>
                    <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>(Upload direct club crests or enter image links)</span>
                  </div>

                  <div className="logo-palette-grid">
                    {/* OUR TEAM LOGO */}
                    <div style={{ 
                      background: 'rgba(11, 27, 22, 0.6)', 
                      border: '1px solid rgba(16, 185, 129, 0.25)', 
                      borderRadius: '10px', 
                      padding: '1rem' 
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-gold-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Our Academy Crest (Home)
                        </span>
                        <div style={{ display: 'flex', gap: '0.35rem' }}>
                          <button
                            type="button"
                            onClick={() => setMatchForm(prev => ({ ...prev, homeLogo: '/logos/fackson-next-pro.jpg' }))}
                            style={{ 
                              background: matchForm.homeLogo.includes('next-pro') ? 'rgba(16, 185, 129, 0.25)' : 'transparent',
                              border: '1px solid rgba(255,255,255,0.1)',
                              color: '#fff',
                              borderRadius: '4px',
                              padding: '0.2rem 0.5rem',
                              fontSize: '0.72rem',
                              cursor: 'pointer'
                            }}
                          >
                            Next Pro
                          </button>
                          <button
                            type="button"
                            onClick={() => setMatchForm(prev => ({ ...prev, homeLogo: '/logos/fackson-angels.jpg' }))}
                            style={{ 
                              background: matchForm.homeLogo.includes('angels') ? 'rgba(217, 119, 6, 0.25)' : 'transparent',
                              border: '1px solid rgba(255,255,255,0.1)',
                              color: '#fff',
                              borderRadius: '4px',
                              padding: '0.2rem 0.5rem',
                              fontSize: '0.72rem',
                              cursor: 'pointer'
                            }}
                          >
                            Angels
                          </button>
                        </div>
                      </div>

                      <div className="logo-palette-inner">
                        <div style={{ 
                          width: '64px', 
                          height: '64px', 
                          borderRadius: '50%', 
                          background: '#04120c', 
                          border: '2px solid rgba(16, 185, 129, 0.5)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          overflow: 'hidden', 
                          flexShrink: 0,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                        }}>
                          {matchForm.homeLogo ? (
                            <img 
                              src={getMediaUrl(matchForm.homeLogo)} 
                              alt="Our Crest" 
                              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/logos/fackson-next-pro.jpg';
                              }}
                            />
                          ) : (
                            <Shield size={28} color="var(--color-gold-primary)" />
                          )}
                        </div>

                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          <button
                            type="button"
                            onClick={() => ourLogoFileInputRef.current?.click()}
                            disabled={uploadingOurLogo}
                            className="btn btn-outline btn-sm"
                            style={{ fontSize: '0.78rem', padding: '0.4rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}
                          >
                            {uploadingOurLogo ? (
                              <RefreshCw size={14} className="animate-spin" />
                            ) : (
                              <Upload size={14} />
                            )}
                            <span>{uploadingOurLogo ? 'Uploading Crest...' : 'Upload Crest File'}</span>
                          </button>

                          <input
                            type="text"
                            placeholder="Or paste Logo Image URL"
                            value={matchForm.homeLogo}
                            onChange={(e) => setMatchForm({ ...matchForm, homeLogo: e.target.value })}
                            className="form-input"
                            style={{ fontSize: '0.78rem', padding: '0.35rem 0.6rem' }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* OPPONENT TEAM LOGO */}
                    <div style={{ 
                      background: 'rgba(24, 15, 34, 0.6)', 
                      border: '1px solid rgba(217, 119, 6, 0.3)', 
                      borderRadius: '10px', 
                      padding: '1rem' 
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Opponent Team Crest (Away)
                        </span>
                        {matchForm.awayLogo && (
                          <button
                            type="button"
                            onClick={() => setMatchForm(prev => ({ ...prev, awayLogo: '' }))}
                            style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '0.72rem', cursor: 'pointer' }}
                          >
                            Reset
                          </button>
                        )}
                      </div>

                      <div className="logo-palette-inner">
                        <div style={{ 
                          width: '64px', 
                          height: '64px', 
                          borderRadius: '50%', 
                          background: '#130c1f', 
                          border: '2px solid rgba(217, 119, 6, 0.5)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          overflow: 'hidden', 
                          flexShrink: 0,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                        }}>
                          {matchForm.awayLogo ? (
                            <img 
                              src={getMediaUrl(matchForm.awayLogo)} 
                              alt="Opponent Crest" 
                              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/logos/fackson-next-pro.jpg';
                              }}
                            />
                          ) : (
                            <Shield size={28} color="#94a3b8" />
                          )}
                        </div>

                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          <button
                            type="button"
                            onClick={() => opponentLogoFileInputRef.current?.click()}
                            disabled={uploadingOpponentLogo}
                            className="btn btn-outline btn-sm"
                            style={{ fontSize: '0.78rem', padding: '0.4rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}
                          >
                            {uploadingOpponentLogo ? (
                              <RefreshCw size={14} className="animate-spin" />
                            ) : (
                              <Upload size={14} />
                            )}
                            <span>{uploadingOpponentLogo ? 'Uploading Crest...' : 'Upload Opponent Crest'}</span>
                          </button>

                          <input
                            type="text"
                            placeholder="Or paste Opponent Crest URL"
                            value={matchForm.awayLogo}
                            onChange={(e) => setMatchForm({ ...matchForm, awayLogo: e.target.value })}
                            className="form-input"
                            style={{ fontSize: '0.78rem', padding: '0.35rem 0.6rem' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* TEAM NAMES */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Home Team Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={matchForm.homeTeam}
                      onChange={(e) => setMatchForm({ ...matchForm, homeTeam: e.target.value })}
                      placeholder="e.g. Fackson Next Pro U17"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Away / Opponent Team Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Apex Stars Football Academy"
                      value={matchForm.awayTeam}
                      onChange={(e) => setMatchForm({ ...matchForm, awayTeam: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* ACADEMY, AGE TIER, & GAME FORMAT */}
                <div className="form-row form-row-3">
                  <div className="form-group">
                    <label className="form-label">Academy Association *</label>
                    <select 
                      className="form-select"
                      value={matchForm.academy}
                      onChange={(e) => {
                        const val = e.target.value as any;
                        setMatchForm(prev => ({
                          ...prev,
                          academy: val,
                          homeTeam: val === 'angels' ? 'Fackson Angels U17' : 'Fackson Next Pro U17',
                          homeLogo: val === 'angels' ? '/logos/fackson-angels.jpg' : '/logos/fackson-next-pro.jpg'
                        }));
                      }}
                    >
                      <option value="next_pro">Fackson Next Pro (Male)</option>
                      <option value="angels">Fackson Angels (Female)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Age Tier *</label>
                    <select 
                      className="form-select"
                      value={matchForm.category}
                      onChange={(e) => setMatchForm({ ...matchForm, category: e.target.value as any })}
                    >
                      <option value="u10">Under 10 (U-10)</option>
                      <option value="u13">Under 13 (U-13)</option>
                      <option value="u17">Under 17 (U-17)</option>
                      <option value="free_age">Free Age (Senior / First Team)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Competition / Game Type *</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--color-gold-light)' }}>Format</span>
                    </label>
                    <select 
                      className="form-select"
                      value={matchForm.gameType}
                      onChange={(e) => setMatchForm({ ...matchForm, gameType: e.target.value })}
                      style={{ fontWeight: 600, color: 'var(--color-gold-light)' }}
                    >
                      <option value="11 v 11">11 v 11 (Full Standard Match)</option>
                      <option value="8 aside">8 aside (Youth / Small Sided Match)</option>
                      <option value="7 aside">7 aside (Grassroots Tournament)</option>
                      <option value="6 aside">6 aside (Fast-Paced Mini Pitch)</option>
                      <option value="5 aside / Futsal">5 aside / Futsal (Indoor / Court)</option>
                    </select>
                  </div>
                </div>

                {/* GAME TYPE QUICK CHIPS */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '-0.5rem', marginBottom: '1.25rem' }}>
                  {['11 v 11', '8 aside', '7 aside', '6 aside', '5 aside / Futsal'].map(gt => (
                    <button
                      key={gt}
                      type="button"
                      onClick={() => setMatchForm(prev => ({ ...prev, gameType: gt }))}
                      style={{
                        background: matchForm.gameType === gt ? 'rgba(217, 119, 6, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                        border: matchForm.gameType === gt ? '1px solid var(--color-gold-primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                        color: matchForm.gameType === gt ? 'var(--color-gold-light)' : '#cbd5e1',
                        borderRadius: '20px',
                        padding: '0.2rem 0.65rem',
                        fontSize: '0.75rem',
                        fontWeight: matchForm.gameType === gt ? 600 : 400,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {gt}
                    </button>
                  ))}
                </div>

                {/* COMPETITION & VENUE */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Competition / Tournament Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={matchForm.competition}
                      onChange={(e) => setMatchForm({ ...matchForm, competition: e.target.value })}
                      placeholder="e.g. Lagos State Elite Grassroots League"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <label className="form-label" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <MapPin size={15} color="var(--color-gold-primary)" />
                        <span>Match Venue (Location) *</span>
                      </label>
                      <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Quick Presets below</span>
                    </div>
                    <input 
                      type="text" 
                      required 
                      value={matchForm.venue}
                      onChange={(e) => setMatchForm({ ...matchForm, venue: e.target.value })}
                      placeholder="e.g. Meiran Field Estate - Ojokoro Housing Estate Field, Meiran Alagbado"
                      className="form-input"
                    />
                  </div>
                </div>

                {/* VENUE PRESET CHIPS */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '-0.5rem', marginBottom: '1.25rem' }}>
                  {[
                    { label: 'Meiran Field Estate (Home)', full: 'Meiran Field Estate - Ojokoro Housing Estate Field, Meiran Alagbado' },
                    { label: 'Agege Township Stadium', full: 'Agege Township Stadium, Agege, Lagos' },
                    { label: 'Mobolaji Johnson Arena', full: 'Mobolaji Johnson Arena, Onikan, Lagos Island' },
                    { label: 'Legacy Pitch Surulere', full: 'Legacy Pitch, National Stadium, Surulere, Lagos' }
                  ].map(v => (
                    <button
                      key={v.label}
                      type="button"
                      onClick={() => setMatchForm(prev => ({ ...prev, venue: v.full }))}
                      style={{
                        background: matchForm.venue === v.full ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                        border: matchForm.venue === v.full ? '1px solid var(--color-green-primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                        color: matchForm.venue === v.full ? '#fff' : '#94a3b8',
                        borderRadius: '6px',
                        padding: '0.2rem 0.6rem',
                        fontSize: '0.72rem',
                        cursor: 'pointer'
                      }}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>

                {/* DATE, TIME & STATUS */}
                <div className="form-row form-row-3">
                  <div className="form-group">
                    <label className="form-label">Match Date *</label>
                    <input 
                      type="date" 
                      required 
                      value={matchForm.date}
                      onChange={(e) => setMatchForm({ ...matchForm, date: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Kickoff Time (WAT) *</label>
                    <input 
                      type="time" 
                      required 
                      value={matchForm.time}
                      onChange={(e) => setMatchForm({ ...matchForm, time: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Match Status *</label>
                    <select 
                      className="form-select"
                      value={matchForm.status}
                      onChange={(e) => setMatchForm({ ...matchForm, status: e.target.value as any })}
                    >
                      <option value="upcoming">Upcoming Match</option>
                      <option value="live">Live Now (In Progress)</option>
                      <option value="completed">Completed (Final Score)</option>
                    </select>
                  </div>
                </div>

                {/* SCORES & SCORERS IF COMPLETED OR LIVE */}
                {(matchForm.status === 'completed' || matchForm.status === 'live') && (
                  <div style={{ 
                    background: 'rgba(217, 119, 6, 0.08)', 
                    border: '1px solid rgba(217, 119, 6, 0.25)', 
                    borderRadius: '10px', 
                    padding: '1.25rem', 
                    marginBottom: '1.5rem' 
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--color-gold-light)', fontWeight: 600 }}>
                      <Trophy size={18} />
                      <span>Match Scores & Goalscorers</span>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Home Goals ({matchForm.homeTeam || 'Home'})</label>
                        <input 
                          type="number" 
                          min={0}
                          value={matchForm.homeScore}
                          onChange={(e) => setMatchForm({ ...matchForm, homeScore: Number(e.target.value) })}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Away Goals ({matchForm.awayTeam || 'Away'})</label>
                        <input 
                          type="number" 
                          min={0}
                          value={matchForm.awayScore}
                          onChange={(e) => setMatchForm({ ...matchForm, awayScore: Number(e.target.value) })}
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Goalscorers (Comma separated, e.g. "David 34', Emmanuel 78'")</label>
                      <input 
                        type="text"
                        placeholder="e.g. David 34', Chinedu 62' (pen)"
                        value={matchForm.scorers}
                        onChange={(e) => setMatchForm({ ...matchForm, scorers: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>
                )}

                {/* LIVE FIXTURE CARD PREVIEW */}
                <div style={{ 
                  margin: '1.75rem 0', 
                  padding: '1.25rem', 
                  borderRadius: '14px', 
                  background: 'rgba(4, 18, 12, 0.85)', 
                  border: '1px dashed rgba(217, 119, 6, 0.4)' 
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Eye size={16} color="var(--color-gold-primary)" />
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Live Card Preview (How it appears on website)
                      </span>
                    </div>
                    <span className="game-type-chip" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
                      {matchForm.gameType || '11 v 11'}
                    </span>
                  </div>

                  <div className="match-card-large">
                    <div className="match-card-large-strip">
                      <div className="match-meta-left">
                        <span className={`badge ${matchForm.academy === 'angels' ? 'badge-gold' : 'badge-green'}`}>
                          {matchForm.academy === 'angels' ? 'Fackson Angels' : 'Next Pro'}
                        </span>
                        <span className="competition-name" style={{ color: '#cbd5e1' }}>
                          {matchForm.competition || 'Grassroots League'}
                        </span>
                        <span className="game-type-chip">
                          {matchForm.gameType || '11 v 11'}
                        </span>
                      </div>

                      <div className="match-meta-right">
                        {matchForm.status === 'live' ? (
                          <span className="live-status-pill">
                            <span className="pulse-dot"></span> LIVE
                          </span>
                        ) : matchForm.status === 'completed' ? (
                          <span className="badge badge-gold">FT RESULT</span>
                        ) : (
                          <span className="badge badge-navy">
                            <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                            UPCOMING
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="match-teams-showcase">
                      <div className="team-col team-col-home">
                        <div className="team-crest-wrapper">
                          <img 
                            src={getMediaUrl(matchForm.homeLogo)} 
                            alt={matchForm.homeTeam} 
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/logos/fackson-next-pro.jpg';
                            }}
                          />
                        </div>
                        <h4 className="team-name">{matchForm.homeTeam || 'Fackson Next Pro'}</h4>
                        <span className="team-subtext">HOME CREST</span>
                      </div>

                      <div className="score-center-col">
                        {matchForm.status === 'completed' || matchForm.status === 'live' ? (
                          <div className="score-badge-large">
                            <span>{matchForm.homeScore}</span>
                            <span className="score-divider">-</span>
                            <span>{matchForm.awayScore}</span>
                          </div>
                        ) : (
                          <div className="vs-badge-large">
                            <span>VS</span>
                          </div>
                        )}
                        <div className="kickoff-time-pill">
                          <Clock size={12} />
                          <span>{matchForm.date} @ {matchForm.time}</span>
                        </div>
                      </div>

                      <div className="team-col team-col-away">
                        <div className="team-crest-wrapper">
                          {matchForm.awayLogo ? (
                            <img 
                              src={getMediaUrl(matchForm.awayLogo)} 
                              alt={matchForm.awayTeam || 'Opponent'} 
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/logos/fackson-next-pro.jpg';
                              }}
                            />
                          ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1e293b' }}>
                              <Shield size={36} color="#94a3b8" />
                            </div>
                          )}
                        </div>
                        <h4 className="team-name">{matchForm.awayTeam || 'Opponent Club'}</h4>
                        <span className="team-subtext">AWAY CREST</span>
                      </div>
                    </div>

                    <div className="match-venue-card">
                      <div className="venue-detail">
                        <MapPin size={16} />
                        <span><strong>Match Venue:</strong> {matchForm.venue || 'Meiran Field Estate'}</span>
                      </div>
                      <div className="format-detail">
                        <Flag size={14} />
                        <span>Format: <strong>{matchForm.gameType || '11 v 11'}</strong></span>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-green btn-lg" 
                  style={{ width: '100%', marginTop: '0.5rem', fontWeight: 700 }}
                  disabled={loading}
                >
                  <Plus size={20} />
                  <span>{loading ? 'Saving Fixture...' : 'Publish Match Fixture to Website'}</span>
                </button>
              </form>
            </div>

            {/* MATCHES LIST TABLE */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Trophy size={18} color="var(--color-gold-primary)" />
                <span>Scheduled Fixtures & Results ({matches.length})</span>
              </h3>
              <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                All matches automatically display on the website's Matches/Fixtures page
              </span>
            </div>

            <div className="admin-matches-table-wrapper">
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Match Teams & Logos</th>
                      <th>Format</th>
                      <th>Academy & Tier</th>
                      <th>Date & Time</th>
                      <th>Match Venue</th>
                      <th>Status / Score</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matches.map(m => (
                      <tr key={m._id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <div style={{ width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden', background: '#0b1b16', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img 
                                  src={getMediaUrl(m.homeLogo || (m.academy === 'angels' ? '/logos/fackson-angels.jpg' : '/logos/fackson-next-pro.jpg'))} 
                                  alt={m.homeTeam} 
                                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                  onError={(e) => { (e.target as HTMLImageElement).src = '/logos/fackson-next-pro.jpg'; }}
                                />
                              </div>
                              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>vs</span>
                              <div style={{ width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden', background: '#180f22', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {m.awayLogo ? (
                                  <img 
                                    src={getMediaUrl(m.awayLogo)} 
                                    alt={m.awayTeam} 
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    onError={(e) => { (e.target as HTMLImageElement).src = '/logos/fackson-next-pro.jpg'; }}
                                  />
                                ) : (
                                  <Shield size={14} color="#94a3b8" />
                                )}
                              </div>
                            </div>
                            <div>
                              <strong style={{ color: '#fff', fontSize: '0.92rem' }}>{m.homeTeam} vs {m.awayTeam}</strong>
                              <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>{m.competition}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="game-type-chip" style={{ fontSize: '0.75rem', padding: '0.2rem 0.55rem' }}>
                            {m.gameType || '11 v 11'}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                            <span className={`badge ${m.academy === 'angels' ? 'badge-gold' : 'badge-green'}`} style={{ width: 'fit-content' }}>
                              {m.academy === 'angels' ? 'Angels' : 'Next Pro'}
                            </span>
                            <span style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>{m.category.toUpperCase()}</span>
                          </div>
                        </td>
                        <td>
                          <div style={{ fontSize: '0.85rem', color: '#f8fafc' }}>
                            <strong>{m.date}</strong>
                            <div style={{ fontSize: '0.78rem', color: 'var(--color-gold-light)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <Clock size={11} /> {m.time}
                            </div>
                          </div>
                        </td>
                        <td style={{ maxWidth: '240px' }}>
                          <div style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'flex', alignItems: 'flex-start', gap: '0.35rem' }}>
                            <MapPin size={13} color="var(--color-gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span style={{ lineHeight: 1.3 }}>{m.venue || 'Meiran Field Estate'}</span>
                          </div>
                        </td>
                        <td>
                          {m.status === 'completed' ? (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <strong style={{ color: 'var(--color-gold-primary)', fontSize: '0.95rem' }}>
                                {m.homeScore} - {m.awayScore}
                              </strong>
                              <span className="badge badge-gold" style={{ fontSize: '0.68rem', width: 'fit-content' }}>FINAL</span>
                            </div>
                          ) : m.status === 'live' ? (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <strong style={{ color: '#10b981', fontSize: '0.95rem' }}>
                                {m.homeScore} - {m.awayScore}
                              </strong>
                              <span className="live-status-pill" style={{ fontSize: '0.68rem', width: 'fit-content', padding: '0.15rem 0.45rem' }}>
                                <span className="pulse-dot"></span> LIVE
                              </span>
                            </div>
                          ) : (
                            <span className="badge badge-navy">UPCOMING</span>
                          )}
                        </td>
                        <td>
                          <button 
                            className="btn-icon-danger"
                            title="Delete Match"
                            onClick={() => handleDeleteMatch(m._id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards View for Small Screens */}
            <div className="admin-matches-cards">
              {matches.map(m => (
                <div key={m._id} className="admin-match-card-mobile">
                  <div className="admin-match-card-mobile-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span className={`badge ${m.academy === 'angels' ? 'badge-gold' : 'badge-green'}`} style={{ fontSize: '0.68rem' }}>
                        {m.academy === 'angels' ? 'Angels' : 'Next Pro'}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{m.category.toUpperCase()}</span>
                    </div>
                    <span className="game-type-chip" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
                      {m.gameType || '11 v 11'}
                    </span>
                  </div>

                  <div className="admin-match-card-mobile-teams">
                    <div className="admin-match-card-mobile-team">
                      <img 
                        src={getMediaUrl(m.homeLogo || (m.academy === 'angels' ? '/logos/fackson-angels.jpg' : '/logos/fackson-next-pro.jpg'))} 
                        alt={m.homeTeam} 
                        className="admin-match-card-mobile-crest"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/logos/fackson-next-pro.jpg'; }}
                      />
                      <span className="admin-match-card-mobile-teamname">{m.homeTeam}</span>
                    </div>

                    <div className="admin-match-card-mobile-vs">
                      {m.status === 'completed' || m.status === 'live' ? (
                        <div className="admin-match-card-mobile-score">
                          {m.homeScore ?? 0} - {m.awayScore ?? 0}
                        </div>
                      ) : (
                        <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>VS</span>
                      )}
                      {m.status === 'live' ? (
                        <span className="live-status-pill" style={{ fontSize: '0.62rem', padding: '0.1rem 0.35rem' }}>
                          <span className="pulse-dot"></span> LIVE
                        </span>
                      ) : m.status === 'completed' ? (
                        <span className="badge badge-gold" style={{ fontSize: '0.62rem' }}>FINAL</span>
                      ) : (
                        <span className="badge badge-navy" style={{ fontSize: '0.62rem' }}>UPCOMING</span>
                      )}
                    </div>

                    <div className="admin-match-card-mobile-team">
                      {m.awayLogo ? (
                        <img 
                          src={getMediaUrl(m.awayLogo)} 
                          alt={m.awayTeam} 
                          className="admin-match-card-mobile-crest"
                          onError={(e) => { (e.target as HTMLImageElement).src = '/logos/fackson-next-pro.jpg'; }}
                        />
                      ) : (
                        <div className="admin-match-card-mobile-crest" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Shield size={20} color="#94a3b8" />
                        </div>
                      )}
                      <span className="admin-match-card-mobile-teamname">{m.awayTeam}</span>
                    </div>
                  </div>

                  <div className="admin-match-card-mobile-footer">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-gold-light)', fontSize: '0.74rem' }}>
                        <Clock size={11} /> {m.date} • {m.time}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#cbd5e1', fontSize: '0.72rem' }}>
                        <MapPin size={11} color="var(--color-gold-primary)" /> {m.venue || 'Meiran Field Estate'}
                      </div>
                    </div>
                    <button 
                      className="btn-icon-danger"
                      title="Delete Match"
                      onClick={() => handleDeleteMatch(m._id)}
                      style={{ padding: '0.35rem' }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: TRIAL REGISTRATIONS */}
        {activeTab === 'registrations' && (
          <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: '#fff' }}>
              Incoming Trial Registrations ({registrations.length})
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Applications submitted by parents and prospective athletes through the website trial form.
            </p>

            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Athlete Name</th>
                    <th>DOB & Gender</th>
                    <th>Academy Preference</th>
                    <th>Tier</th>
                    <th>Position</th>
                    <th>Contact Info</th>
                    <th>Trial Fee</th>
                    <th>Status</th>
                    <th>Change Status</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.length === 0 ? (
                    <tr>
                      <td colSpan={9} style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                        No registrations received yet.
                      </td>
                    </tr>
                  ) : (
                    registrations.map(r => (
                      <tr key={r._id}>
                        <td>
                          <strong>{r.playerName}</strong>
                          {r.parentName && <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Parent: {r.parentName}</p>}
                        </td>
                        <td>
                          {r.dateOfBirth}<br />
                          <span style={{ fontSize: '0.78rem', textTransform: 'capitalize', color: '#94a3b8' }}>{r.gender}</span>
                        </td>
                        <td>
                          <span className={`badge ${r.academyPreference === 'angels' ? 'badge-gold' : 'badge-green'}`}>
                            {r.academyPreference === 'angels' ? 'Angels' : 'Next Pro'}
                          </span>
                        </td>
                        <td>
                          <span className="badge badge-navy">
                            {r.category === 'free_age' ? 'Senior' : r.category.toUpperCase()}
                          </span>
                        </td>
                        <td>{r.position}</td>
                        <td>
                          <div>{r.phone}</div>
                          <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{r.email}</div>
                        </td>
                        <td>
                          {r.paymentStatus === 'paid' ? (
                            <div>
                              <span className="badge badge-green">PAID ₦25,000</span>
                              {r.paymentTxRef && (
                                <p style={{ fontSize: '0.7rem', color: '#38bdf8', fontFamily: 'monospace', margin: '4px 0 0' }}>
                                  {r.paymentTxRef}
                                </p>
                              )}
                            </div>
                          ) : (
                            <span className="badge badge-navy" style={{ color: '#94a3b8' }}>
                              UNPAID
                            </span>
                          )}
                        </td>
                        <td>
                          <span className={`badge ${r.status === 'invited' ? 'badge-green' : r.status === 'reviewed' ? 'badge-gold' : 'badge-navy'}`}>
                            {r.status.toUpperCase()}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.35rem' }}>
                            <button 
                              className="btn btn-outline btn-sm"
                              style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                              onClick={() => handleUpdateRegStatus(r._id, 'reviewed')}
                            >
                              Review
                            </button>
                            <button 
                              className="btn btn-gold btn-sm"
                              style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                              onClick={() => handleUpdateRegStatus(r._id, 'invited')}
                            >
                              Invite
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
