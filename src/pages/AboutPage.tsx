import React, { useState } from 'react';
import { Trophy, Users, Star, Target, MapPin, Calendar, Flag, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

interface AboutPageProps {
  openRegistration: () => void;
  setCurrentTab: (tab: string) => void;
}

const achievements = [
  {
    player: 'Papa Mustapha Daniel',
    position: 'Midfielder / Forward',
    club: 'NK Celje (Slovenia PrvaLiga)',
    flag: '🇸🇮',
    photoUrl: '/images/alumni/papa-daniel.jpg',
    items: [
      'Nigerian Home-Based Eagles — 2025',
      'Super Eagles Senior International Debut — 2025',
      'NK Celje (Slovenia) First Team Pro'
    ]
  },
  {
    player: 'Lawal Oluwaseun',
    position: 'Midfielder / Left Winger',
    club: 'FC Koper (Slovenia PrvaLiga)',
    flag: '🇸🇮',
    photoUrl: '/images/alumni/lawal-seun.jpg',
    items: [
      'FC Koper (Slovenia) First Team Pro',
      'Nigerian U-20 National Team Call-Up — 2024',
      'European League Competitor'
    ]
  },
  {
    player: 'Shuaib Fatimo',
    position: 'Forward / Defender (#22)',
    club: 'Nigeria Youth National Team / NWFL',
    flag: '🇳🇬',
    photoUrl: '/images/alumni/shuaib-fatimo.jpg',
    items: [
      'Nigerian U-17 National Team (Flamingos) — 2025',
      'FIFA U-17 World Cup Morocco — 2025',
      'Fackson Angels Pioneer Women Star'
    ]
  },
  {
    player: 'Segun Oduduwa',
    position: 'Central Defender (#6)',
    club: 'Olympic Medalist & Europe Pro',
    flag: '🇳🇬',
    photoUrl: '/images/alumni/segun-oduduwa.jpg',
    items: [
      'Olympic Games Bronze Medalist — Rio 2016',
      'Africa U-23 Cup of Nations Champion — 2015',
      'Senior Professional Career in Europe & Asia'
    ]
  }
];

const sections = [
  {
    title: '1. Introduction',
    content: `Fackson Nextpro Football Academy is a grassroots football club established in 1998 at Alagbado, Ifako-Ijaiye LGA, Lagos State, Nigeria. The club was founded with the vision of discovering, nurturing, and developing young football talents while providing them with opportunities to grow into professional footballers.

The establishment of the club was inspired by the passion for football and the desire to create a platform where talented young players could receive proper football education, discipline, mentorship, and exposure to competitive football.

Since its establishment, the club has remained committed to grassroots football development, using the game as a tool for youth empowerment, character building, and community development.`
  },
  {
    title: '2. Establishment & Early Development',
    content: `The journey of Fackson Nextpro Football Academy began in 1998 under the leadership of Coach Farouk Yusuf Oluwadamilare (aka Ajobi), who recognised the need for a structured football development programme within the community.

In its early years, the club operated with limited resources, relying on the commitment of its founder, coaches, parents, supporters, and other football enthusiasts. Training sessions were organised to identify promising players, improve their technical abilities, develop tactical understanding, and instil discipline.

Despite the challenges associated with grassroots football in Lagos State and Nigeria at large, the club continued to grow through dedication, perseverance, and a strong belief in the potential of young Nigerian footballers.`
  },
  {
    title: '4. Football Development & Participation',
    content: `Over the years, Fackson Nextpro Football Academy has continued to develop its players through regular training sessions, friendly matches, scouting activities, tournaments, and other competitive football programmes.

The club places emphasis on technical development, tactical awareness, physical conditioning, psychological preparation, and the overall welfare of its players.

Through participation in grassroots competitions and organised football events, the club seeks to expose its players to competitive environments where they can demonstrate their abilities, gain valuable experience, and prepare for higher levels of the game.`
  },
  {
    title: '6. Challenges & Resilience',
    content: `Like many grassroots football clubs in Nigeria, Fackson Nextpro Football Academy has faced challenges relating to inadequate funding, limited training facilities, football equipment, player welfare, transportation, and access to competitive opportunities.

Nevertheless, the club has continued to pursue its objectives through determination, resourcefulness, and the support of individuals who believe in the importance of grassroots football development.

These experiences have strengthened the club's commitment to building a sustainable football structure capable of supporting young talents and contributing positively to the development of Nigerian football.`
  },
  {
    title: '7. Contributions to Grassroots Football',
    content: `Fackson Nextpro Football Academy recognises that grassroots football is an important foundation for the future of Nigerian football.

By providing young players with opportunities to learn, train, compete, and develop, the club contributes to talent discovery, youth engagement, community participation, and the promotion of positive sporting values.

The club also seeks to encourage young people to combine their football ambitions with education, discipline, responsibility, and personal development.`
  },
  {
    title: '8. Future Aspirations',
    content: `Looking ahead, Fackson Nextpro Football Academy aims to strengthen its administrative and technical structures, improve training facilities, attract sponsorship, expand its scouting network, and establish stronger relationships with professional clubs and football stakeholders.

The club also aspires to participate in more organised competitions, create pathways for players to secure professional contracts, and build a sustainable football development programme that can benefit future generations.

Through strategic partnerships and continued investment in young talents, the club hopes to contribute meaningfully to the growth of Nigerian football and the development of players capable of competing at national and international levels.`
  }
];

export const AboutPage: React.FC<AboutPageProps> = ({ openRegistration, setCurrentTab }) => {
  const [expandedSection, setExpandedSection] = useState<number | null>(0);

  return (
    <div>
      {/* Page Hero */}
      <section style={{
        position: 'relative',
        minHeight: '55vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        borderBottom: '2px solid rgba(255,208,0,0.25)'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('/images/team-photo.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          filter: 'brightness(0.3) saturate(0.9)'
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(3,10,5,0.4) 0%, rgba(3,10,5,0.9) 100%)'
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <img src="/logos/fackson-next-pro.jpg" alt="Next Pro" style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid #4ade80', boxShadow: '0 0 16px rgba(74,222,128,0.5)' }} />
            <img src="/logos/fackson-angels.jpg" alt="Angels" style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid #fb7185', boxShadow: '0 0 16px rgba(251,113,133,0.5)' }} />
            <span style={{ background: 'rgba(255,208,0,0.12)', border: '1px solid rgba(255,208,0,0.4)', borderRadius: '50px', padding: '5px 16px', fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-gold-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Est. 1998 · Alagbado, Lagos</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1rem' }}>
            THE HISTORY OF<br />
            <span className="text-gradient-gold">FACKSON NEXTPRO</span><br />
            FOOTBALL ACADEMY
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '600px', lineHeight: 1.65 }}>
            A story of passion, commitment, perseverance, and belief in the power of football to transform lives — from humble beginnings in Alagbado (Corn City) to Europe.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section" style={{ background: 'var(--bg-surface-1)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Foundation</span>
            <h2 className="section-title">VISION & MISSION</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Vision */}
            <div className="glass-card" style={{ padding: '2.5rem', borderColor: 'rgba(255,208,0,0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,208,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Star size={22} color="var(--color-gold-primary)" />
                </div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--color-gold-primary)' }}>Vision</h3>
              </div>
              <p style={{ color: '#cbd5e1', lineHeight: 1.75, fontSize: '0.95rem' }}>
                To become a recognised grassroots football institution known for discovering, developing, and producing <strong style={{ color: '#fff' }}>talented, disciplined, and professionally prepared footballers</strong> for local and international opportunities.
              </p>
            </div>

            {/* Mission */}
            <div className="glass-card" style={{ padding: '2.5rem', borderColor: 'rgba(74,222,128,0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(74,222,128,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Target size={22} color="#4ade80" />
                </div>
                <h3 style={{ fontSize: '1.3rem', color: '#4ade80' }}>Mission</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {[
                  'Identify and nurture young football talents',
                  'Provide quality coaching and structured player development',
                  'Promote discipline, teamwork, respect, and sportsmanship',
                  'Create pathways to professional clubs and national teams',
                  'Use football as a tool for youth and community empowerment'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    <span style={{ color: '#4ade80', fontWeight: 900, marginTop: '1px', flexShrink: 0 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Notable Achievements — Real Players */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">5. Achievements & Milestones</span>
            <h2 className="section-title">PLAYERS WHO MADE IT</h2>
            <p className="section-desc">
              The club's achievement is not limited to trophies — it is measured by the careers our players have built. Here are some who have represented Nigeria and gone on to play professionally.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {achievements.map((a, i) => (
              <div key={i} className="glass-card" style={{ padding: '1.75rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                  background: i % 2 === 0 ? 'linear-gradient(90deg, #4ade80, #ffd000)' : 'linear-gradient(90deg, #ffd000, #fb7185)'
                }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.15rem' }}>
                  <img
                    src={a.photoUrl}
                    alt={a.player}
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--color-gold-primary)',
                      boxShadow: '0 0 12px rgba(255, 208, 0, 0.4)',
                      flexShrink: 0
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontWeight: 900, color: '#fff', fontSize: '1.05rem', lineHeight: 1.2 }}>{a.player}</span>
                      <span>{a.flag}</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-gold-primary)', fontWeight: 700, marginTop: '2px' }}>{a.position}</div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '1px' }}>{a.club}</div>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {a.items.map((item, j) => (
                    <li key={j} style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', lineHeight: 1.4 }}>
                      <span style={{ color: '#4ade80', flexShrink: 0, marginTop: '1px' }}>⚽</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Additional milestones text */}
          <div className="glass-card" style={{ padding: '2rem', borderColor: 'rgba(255,208,0,0.25)' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <Trophy size={28} color="var(--color-gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ color: 'var(--color-gold-primary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Grassroots Trophies & Competitions</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                  Beyond individual player achievements, Fackson Nextpro Football Academy has won <strong style={{ color: '#fff' }}>uncounted lots of grassroots trophies</strong> and has participated in the <strong style={{ color: '#fff' }}>Federation (FA) Cup</strong> and <strong style={{ color: '#fff' }}>State League</strong>, cementing its reputation as one of the most competitive community academies in Lagos State.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion History Sections */}
      <section className="section" style={{ background: 'rgba(0,0,0,0.25)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Full History</span>
            <h2 className="section-title">THE FACKSON STORY</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '860px', margin: '0 auto' }}>
            {sections.map((sec, i) => (
              <div key={i} className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                <button
                  onClick={() => setExpandedSection(expandedSection === i ? null : i)}
                  style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '1.25rem 1.75rem', background: 'none', border: 'none', cursor: 'pointer',
                    color: '#fff', textAlign: 'left', gap: '1rem'
                  }}
                >
                  <span style={{ fontWeight: 800, fontSize: '1rem', color: expandedSection === i ? 'var(--color-gold-primary)' : '#e2e8f0' }}>
                    {sec.title}
                  </span>
                  {expandedSection === i ? <ChevronUp size={20} color="var(--color-gold-primary)" /> : <ChevronDown size={20} color="#64748b" />}
                </button>
                {expandedSection === i && (
                  <div style={{ padding: '0 1.75rem 1.75rem', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    {sec.content.split('\n\n').map((para, j) => (
                      <p key={j} style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '0.93rem', margin: j === 0 ? '1.25rem 0 0.75rem' : '0 0 0.75rem' }}>
                        {para}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conclusion Banner */}
      <section className="section">
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, rgba(24,134,60,0.25) 0%, rgba(255,208,0,0.12) 50%, rgba(251,113,133,0.1) 100%)',
            border: '1px solid rgba(255,208,0,0.35)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.25rem, 4vw, 3rem)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Watermark logos */}
            <div style={{ position: 'absolute', left: '-20px', top: '-20px', opacity: 0.06 }}>
              <img src="/logos/fackson-next-pro.jpg" alt="" style={{ width: '160px', height: '160px', borderRadius: '50%' }} />
            </div>
            <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.06 }}>
              <img src="/logos/fackson-angels.jpg" alt="" style={{ width: '160px', height: '160px', borderRadius: '50%' }} />
            </div>

            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚽️</div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '1rem', lineHeight: 1.15 }}>
                We Are <span className="text-gradient-gold">FACKSON!!</span>
              </h2>
              <p style={{ maxWidth: '680px', margin: '0 auto 1.5rem', color: '#e2e8f0', fontSize: '1rem', lineHeight: 1.7 }}>
                The story of Fackson Nextpro Football Academy is one of passion, commitment, perseverance, and belief in the power of football to transform lives. From its humble beginnings in Alagbado (Corn City), the club continues to pursue its mission.
              </p>
              <div style={{ background: 'rgba(255,208,0,0.1)', border: '1px solid rgba(255,208,0,0.3)', borderRadius: 'var(--radius-md)', padding: '1rem 1.5rem', display: 'inline-block', marginBottom: '2rem' }}>
                <p style={{ color: 'var(--color-gold-primary)', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>
                  FACKSON NEXTPRO FOOTBALL ACADEMY<br />
                  <span style={{ fontSize: '0.8rem', letterSpacing: '0.04em' }}>Developing Talents · Building Character · Creating Opportunities</span>
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                <button className="btn btn-gold" onClick={openRegistration} style={{ padding: '0.9rem 2rem' }}>
                  <span>Join the Academy</span>
                  <ArrowRight size={18} />
                </button>
                <button className="btn btn-outline" onClick={() => setCurrentTab('next_pro')} style={{ padding: '0.9rem 1.8rem' }}>
                  <span>Explore Next Pro Squad</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
