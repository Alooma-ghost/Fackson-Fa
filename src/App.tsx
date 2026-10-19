import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { LightboxModal } from './components/LightboxModal';
import { NewsTicker } from './components/NewsTicker';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

// Pages
import { Home } from './pages/Home';
import { NextProPage } from './pages/NextProPage';
import { AngelsPage } from './pages/AngelsPage';
import { SquadPage } from './pages/SquadPage';
import { GalleryPage } from './pages/GalleryPage';
import { MatchesPage } from './pages/MatchesPage';
import { VideosPage } from './pages/VideosPage';
import { JoinPage } from './pages/JoinPage';
import { NewsPage } from './pages/NewsPage';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { AboutPage } from './pages/AboutPage';

import { api, getAuthToken, removeAuthToken } from './services/api';
import { Player, GalleryItem, NewsItem, MatchItem, RegistrationItem, AdminUser, AcademyType } from './types';
import { INITIAL_GALLERY_ITEMS } from './data/initialGallery';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [activeAcademy, setActiveAcademy] = useState<AcademyType>('next_pro');
  
  // Theme state: 'dark' (obsidian black default) or 'light' (clean white background & deep black text)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('fackson_theme');
      return (saved === 'light' || saved === 'dark') ? saved : 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      document.documentElement.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
      document.documentElement.classList.remove('light-theme');
    }
    try {
      localStorage.setItem('fackson_theme', theme);
      localStorage.setItem('fackson_menu_theme', theme);
    } catch {}
  }, [theme]);

  // Data states
  const [players, setPlayers] = useState<Player[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>(INITIAL_GALLERY_ITEMS);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [registrations, setRegistrations] = useState<RegistrationItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals & Overlays
  const [regModalOpen, setRegModalOpen] = useState(false);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  // Admin Auth state
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  const loadAllData = async () => {
    try {
      const [playersData, galleryData, newsData, matchesData] = await Promise.all([
        api.getPlayers(),
        api.getGallery(),
        api.getNews(),
        api.getMatches()
      ]);
      setPlayers(playersData || []);

      // Combine user-added gallery items with initial showcase items (newest user items first)
      const mergedGallery = [...(galleryData || [])];
      INITIAL_GALLERY_ITEMS.forEach(initItem => {
        if (!mergedGallery.some(g => g._id === initItem._id || g.title === initItem.title)) {
          mergedGallery.push(initItem);
        }
      });
      setGallery(mergedGallery.length > 0 ? mergedGallery : INITIAL_GALLERY_ITEMS);

      setNews(newsData || []);
      setMatches(matchesData || []);

      // If admin token is active, also fetch registrations
      if (getAuthToken()) {
        try {
          const regData = await api.getRegistrations();
          setRegistrations(regData);
        } catch (e) {
          // non-fatal if token is expired
        }
      }
    } catch (err) {
      console.error('Error fetching academy data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
    // Check if token exists
    const token = getAuthToken();
    if (token) {
      api.verifyAuth().then(res => {
        if (res.success) {
          setAdminUser({
            username: res.user?.username || 'admin',
            role: 'Super Administrator',
            name: 'Academy Director'
          });
        }
      }).catch(() => {});
    }
  }, []);

  const handleOpenRegistration = () => {
    setRegModalOpen(true);
  };

  // If in admin mode
  if (currentTab === 'admin') {
    if (!adminUser) {
      return (
        <AdminLogin 
          onLoginSuccess={(user) => {
            setAdminUser(user);
            loadAllData();
          }}
          onCancel={() => { setCurrentTab('home'); window.scrollTo({ top: 0, behavior: 'instant' }); }}
        />
      );
    }
    return (
      <AdminDashboard 
        adminUser={adminUser}
        onLogout={() => {
          setAdminUser(null);
          removeAuthToken();
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        onReturnToSite={() => { setCurrentTab('home'); window.scrollTo({ top: 0, behavior: 'instant' }); }}
        players={players}
        gallery={gallery}
        news={news}
        matches={matches}
        registrations={registrations}
        refreshData={loadAllData}
      />
    );
  }

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-main, #050505)', color: 'var(--color-cream, #fff)' }}>
      {/* Navbar */}
      <Navbar 
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        activeAcademy={activeAcademy}
        setActiveAcademy={setActiveAcademy}
        openRegistration={handleOpenRegistration}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main View Router */}
      <main style={{ flex: 1, background: 'var(--bg-main, #050505)' }}>
        {currentTab === 'home' && (
          <Home 
            setCurrentTab={setCurrentTab}
            setActiveAcademy={setActiveAcademy}
            openRegistration={handleOpenRegistration}
            players={players}
            gallery={gallery}
            news={news}
            matches={matches}
            onOpenLightbox={(item) => setLightboxItem(item)}
          />
        )}

        {currentTab === 'next_pro' && (
          <NextProPage 
            players={players}
            openRegistration={handleOpenRegistration}
          />
        )}

        {currentTab === 'angels' && (
          <AngelsPage 
            players={players}
            openRegistration={handleOpenRegistration}
          />
        )}

        {(currentTab === 'squads' || currentTab === 'squad') && (
          <SquadPage 
            players={players}
            activeAcademy={activeAcademy}
            setActiveAcademy={setActiveAcademy}
            openRegistration={handleOpenRegistration}
          />
        )}

        {currentTab === 'gallery' && (
          <GalleryPage 
            gallery={gallery}
            onOpenLightbox={(item) => setLightboxItem(item)}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'videos' && (
          <VideosPage 
            openRegistration={handleOpenRegistration}
          />
        )}

        {currentTab === 'join' && (
          <JoinPage 
            defaultAcademy={activeAcademy}
          />
        )}

        {(currentTab === 'matches' || currentTab === 'fixtures') && (
          <MatchesPage 
            matches={matches}
            openRegistration={handleOpenRegistration}
          />
        )}

        {currentTab === 'news' && (
          <NewsPage 
            news={news}
            openRegistration={handleOpenRegistration}
            matches={matches}
            onViewMatches={() => {
              setCurrentTab('matches');
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage
            openRegistration={handleOpenRegistration}
            setCurrentTab={setCurrentTab}
          />
        )}
      </main>

      {/* Footer */}
      <Footer 
        setCurrentTab={setCurrentTab}
        openRegistration={handleOpenRegistration}
      />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp headCoachPhone="2348029745452" coachPhone="2348173496343" />

      {/* Registration Modal */}
      <RegistrationModal 
        isOpen={regModalOpen}
        onClose={() => setRegModalOpen(false)}
        defaultAcademy={activeAcademy}
      />

      {/* Lightbox Modal */}
      <LightboxModal 
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
      />

      {/* Fixed News & Announcements Ticker */}
      <NewsTicker 
        news={news}
        matches={matches}
        onOpenNews={(tab) => setCurrentTab(tab)}
        openRegistration={handleOpenRegistration}
      />
    </div>
  );
};

export default App;
