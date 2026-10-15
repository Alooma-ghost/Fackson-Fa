import React, { useState } from 'react';
import { Play, Video, Eye, Clock, Award, Shield, MessageCircle, Sparkles } from 'lucide-react';

interface VideosPageProps {
  openRegistration?: () => void;
}

const videoList = [
  {
    id: 'vid-1',
    title: 'European Scout Showcase 2025/2026 — Fackson Next Pro Elite Compilation',
    category: 'scout',
    duration: '6:45',
    tag: 'Scout Highlight',
    date: 'March 2026',
    thumbnail: '/images/team-photo.jpg',
    description: 'High-tempo game sequences, ball progression drills, transition speed, and set-piece executions highlighting our top U-17 and Senior prospects.'
  },
  {
    id: 'vid-2',
    title: 'Papa Mustapha Daniel & Lawal Seun — From Meiran Field Estate to Slovenian PrvaLiga',
    category: 'spotlight',
    duration: '4:20',
    tag: 'Alumni Spotlight',
    date: 'February 2026',
    thumbnail: '/images/alumni/papa-daniel.jpg',
    description: 'Tactical analysis and match clips tracing the technical development of Papa Daniel (NK Celje) and Lawal Seun (FC Koper) under Coach Farouk Yusuf.'
  },
  {
    id: 'vid-3',
    title: 'Fackson Angels 3 - 1 Lagos Queens — State Cup Quarter-Final Highlights',
    category: 'match',
    duration: '8:15',
    tag: 'Matchday Reel',
    date: 'January 2026',
    thumbnail: '/images/angels-action-1.jpg',
    description: 'Electrifying match highlights featuring goals from Shuaib Fatimo and dominant midfield control at the Lagos State Women’s Championship.'
  },
  {
    id: 'vid-4',
    title: 'High-Intensity Tactical Pressing & 1v1 Finishing Drills at Meiran Field Estate',
    category: 'training',
    duration: '5:10',
    tag: 'Training Drills',
    date: 'January 2026',
    thumbnail: '/images/training-1.jpg',
    description: 'Behind-the-scenes pitchside footage of Coach Farouk Yusuf putting U-15 and U-17 players through European-standard tactical pressing drills.'
  },
  {
    id: 'vid-5',
    title: 'Trophy Celebration & Medal Presentation — Alagbado Invitational Cup',
    category: 'match',
    duration: '3:50',
    tag: 'Trophy Reel',
    date: 'December 2025',
    thumbnail: '/images/trophy-celebration.jpg',
    description: 'Celebrations and victory lap as Fackson Nextpro lifts another community grassroots silverware in front of our home supporters.'
  },
  {
    id: 'vid-6',
    title: 'Coach Farouk Yusuf "Ajobi" on 27+ Years of Breeding Grassroots Stars',
    category: 'interview',
    duration: '7:30',
    tag: 'Coach Interview',
    date: 'November 2025',
    thumbnail: '/images/team-photo.jpg',
    description: 'In-depth interview on academy philosophy, discipline, character development, and creating real professional pathways for young Nigerian talents.'
  }
];

export const VideosPage: React.FC<VideosPageProps> = ({ openRegistration }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeVideo, setActiveVideo] = useState<typeof videoList[0] | null>(null);

  const filteredVideos = selectedCategory === 'all' 
    ? videoList 
    : videoList.filter(v => v.category === selectedCategory);

  const scoutWhatsApp = `https://wa.me/2348029745452?text=${encodeURIComponent(
    'Hello Head Coach Farouk, I am an accredited scout/agent and would like to request full uncut match footage and scouting profiles for Fackson Football Academy players.'
  )}`;

  return (
    <div style={{ background: '#000000', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Page Header */}
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
            background: 'rgba(255, 208, 0, 0.1)',
            border: '1px solid rgba(255, 208, 0, 0.3)',
            borderRadius: '50px',
            padding: '4px 14px',
            marginBottom: '1rem'
          }}>
            <Video size={13} color="var(--color-gold-primary)" />
            <span style={{
              fontSize: '0.74rem',
              fontWeight: 800,
              color: 'var(--color-gold-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>
              Pitchside Media &amp; Reels
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 1.15,
            marginBottom: '0.75rem'
          }}>
            MATCH HIGHLIGHTS &amp; <span className="text-gradient-gold">SCOUT REELS</span>
          </h1>
          <p style={{
            color: '#94a3b8',
            fontSize: '0.95rem',
            maxWidth: '650px',
            lineHeight: 1.6
          }}>
            Watch matchday compilations, tactical drill breakdowns from Meiran Field Estate, player spotlight videos, and full showcase reels curated for scouts and fans.
          </p>
        </div>
      </section>

      {/* Featured Video Showcase Banner */}
      <section style={{ padding: '2.5rem 0 1.5rem' }}>
        <div className="container">
          <div style={{
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            minHeight: '400px',
            background: '#0a0d0a',
            border: '1px solid rgba(255, 208, 0, 0.3)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '2.5rem'
          }}>
            {/* Background Thumbnail */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url('${videoList[0].thumbnail}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 35%',
              filter: 'brightness(0.35)'
            }} />

            {/* Gradient Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.95) 100%)'
            }} />

            {/* Center Big Play Button */}
            <div 
              onClick={() => setActiveVideo(videoList[0])}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-gold-primary) 0%, #ca8a04 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 0 35px rgba(255, 208, 0, 0.5)',
                transition: 'transform 0.25s ease'
              }}
              className="featured-play-btn"
            >
              <Play size={32} color="#000" fill="#000" style={{ marginLeft: '4px' }} />
            </div>

            {/* Bottom Content */}
            <div style={{ position: 'relative', zIndex: 2, maxWidth: '750px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.65rem' }}>
                <span style={{
                  background: 'var(--color-gold-primary)',
                  color: '#000',
                  padding: '3px 10px',
                  borderRadius: '50px',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  textTransform: 'uppercase'
                }}>
                  FEATURED SCOUT SHOWCASE
                </span>
                <span style={{ color: '#cbd5e1', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} /> {videoList[0].duration}
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.85rem)', color: '#fff', fontWeight: 900, marginBottom: '0.5rem' }}>
                {videoList[0].title}
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                {videoList[0].description}
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setActiveVideo(videoList[0])}
                  className="btn btn-gold btn-sm"
                >
                  <Play size={14} fill="#000" />
                  <span>Play Showcase Reel</span>
                </button>
                <a
                  href={scoutWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                  style={{ borderColor: '#25D366', color: '#25D366' }}
                >
                  <MessageCircle size={14} />
                  <span>Request Full Footage (Scouts)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section style={{ padding: '1rem 0' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            {[
              { id: 'all', label: 'All Videos' },
              { id: 'scout', label: 'Scout Compilations' },
              { id: 'match', label: 'Match Highlights' },
              { id: 'spotlight', label: 'Player Spotlights' },
              { id: 'training', label: 'Tactical Drills' },
              { id: 'interview', label: 'Interviews' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                style={{
                  background: selectedCategory === tab.id ? 'var(--color-gold-primary)' : 'rgba(255,255,255,0.06)',
                  color: selectedCategory === tab.id ? '#000' : '#cbd5e1',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '6px 16px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section style={{ padding: '2rem 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}>
            {filteredVideos.map(video => (
              <div
                key={video.id}
                onClick={() => setActiveVideo(video)}
                style={{
                  background: '#080c09',
                  border: '1px solid rgba(255, 255, 255, 0.09)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                  transition: 'transform 0.25s ease, border-color 0.25s ease'
                }}
                className="video-catalog-card"
              >
                {/* Thumbnail Header */}
                <div style={{
                  position: 'relative',
                  height: '200px',
                  backgroundImage: `url('${video.thumbnail}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)'
                  }} />

                  {/* Play Icon Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.75)',
                    border: '2px solid var(--color-gold-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-gold-primary)'
                  }}>
                    <Play size={20} fill="var(--color-gold-primary)" style={{ marginLeft: '3px' }} />
                  </div>

                  {/* Duration Tag */}
                  <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '12px',
                    background: 'rgba(0,0,0,0.85)',
                    color: '#fff',
                    borderRadius: '4px',
                    padding: '2px 8px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Clock size={11} /> {video.duration}
                  </div>

                  {/* Category Pill */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(0,0,0,0.75)',
                    border: '1px solid rgba(255,208,0,0.4)',
                    color: 'var(--color-gold-primary)',
                    borderRadius: '50px',
                    padding: '3px 10px',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    textTransform: 'uppercase'
                  }}>
                    {video.tag}
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: '0.35rem' }}>
                    {video.date}
                  </div>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.35,
                    marginBottom: '0.5rem'
                  }}>
                    {video.title}
                  </h3>
                  <p style={{
                    fontSize: '0.8rem',
                    color: '#94a3b8',
                    lineHeight: 1.5,
                    margin: 0
                  }}>
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal Player */}
      {activeVideo && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.92)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }} onClick={() => setActiveVideo(null)}>
          <div style={{
            background: '#0d110e',
            border: '1px solid var(--color-gold-primary)',
            borderRadius: '16px',
            maxWidth: '720px',
            width: '100%',
            overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(0,0,0,0.9)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{
              position: 'relative',
              aspectRatio: '16/9',
              background: '#000',
              backgroundImage: `url('${activeVideo.thumbnail}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--color-gold-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  boxShadow: '0 0 30px rgba(255,208,0,0.6)'
                }}>
                  <Play size={28} color="#000" fill="#000" style={{ marginLeft: '4px' }} />
                </div>
                <div style={{ color: '#fff', fontWeight: 800, fontSize: '1rem', marginBottom: '0.35rem' }}>
                  Previewing: {activeVideo.title}
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                  Full high-definition reel available via direct academy scout request.
                </div>
              </div>
            </div>

            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{
                  background: 'rgba(255,208,0,0.15)',
                  color: 'var(--color-gold-primary)',
                  padding: '3px 10px',
                  borderRadius: '50px',
                  fontSize: '0.72rem',
                  fontWeight: 800
                }}>
                  {activeVideo.tag}
                </span>
                <span style={{ color: '#cbd5e1', fontSize: '0.78rem' }}>
                  Duration: {activeVideo.duration}
                </span>
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                {activeVideo.title}
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                {activeVideo.description}
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="btn btn-outline btn-sm"
                >
                  Close
                </button>
                <a
                  href={scoutWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold btn-sm"
                >
                  <MessageCircle size={14} />
                  <span>Contact Coach for Uncut Video</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .featured-play-btn:hover {
          transform: translate(-50%, -50%) scale(1.15);
        }
        .video-catalog-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 208, 0, 0.4) !important;
        }
      `}</style>
    </div>
  );
};
