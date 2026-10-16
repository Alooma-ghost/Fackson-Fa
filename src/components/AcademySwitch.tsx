import React from 'react';
import { AcademyType } from '../types';

interface AcademySwitchProps {
  activeAcademy: AcademyType;
  setActiveAcademy: (academy: AcademyType) => void;
}

export const AcademySwitch: React.FC<AcademySwitchProps> = ({ activeAcademy, setActiveAcademy }) => {
  return (
    <div className="academy-switcher-container">
      <div className="academy-switcher" role="tablist" aria-label="Academy Selector">
        <button
          className={`switcher-btn ${activeAcademy === 'next_pro' ? 'active next-pro' : ''}`}
          onClick={() => setActiveAcademy('next_pro')}
          role="tab"
          aria-selected={activeAcademy === 'next_pro'}
          id="tab-next-pro"
        >
          <img 
            src="/logos/fackson-next-pro.jpg" 
            alt="Fackson Next Pro" 
            className="switcher-badge" 
          />
          <span>Fackson Next Pro (Male)</span>
        </button>

        <button
          className={`switcher-btn ${activeAcademy === 'angels' ? 'active angels' : ''}`}
          onClick={() => setActiveAcademy('angels')}
          role="tab"
          aria-selected={activeAcademy === 'angels'}
          id="tab-angels"
        >
          <img 
            src="/logos/fackson-angels.jpg" 
            alt="Fackson Angels" 
            className="switcher-badge" 
          />
          <span>Fackson Angels (Female)</span>
        </button>
      </div>
    </div>
  );
};
