import React from 'react';
import { headertransparentlogo,headerlogo } from './data';
import {
  FaChevronDown,
  FaMinus,
  FaMoon,
  FaPlus,
  FaRotateRight,
  FaSliders,
  FaSun,
  FaVolumeHigh,
  FaVolumeXmark
} from 'react-icons/fa6';

export default function Header({ go, onToggleTheme, onChangeFont, onResetFont, onToggleVoice, activeTheme, voiceOn }) {
  const nav = ['services', 'solutions', 'process', 'technologies', 'contact'];
  return (
    <nav className="navbar navbar-expand-lg fixed-top glass-nav" aria-label="Primary navigation">
      <div className="container">
        <button className="navbar-brand brand-button" onClick={() => go('home')}>
          <img className="header-logo-full" src={headertransparentlogo} alt="Inspiration Soft Solutions" />
        </button>
        <div className="utility-dropdown dropdown">
          <button
            className="utility-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            aria-label="Open display and accessibility controls"
          >
            <FaSliders aria-hidden="true" />
            <FaChevronDown className="utility-caret" aria-hidden="true" />
          </button>
          <div className="dropdown-menu dropdown-menu-end utility-menu">
            <button className="utility-item" type="button" onClick={onToggleTheme}>
              {activeTheme === 'light' ? <FaMoon aria-hidden="true" /> : <FaSun aria-hidden="true" />}
              <span>{activeTheme === 'light' ? 'Dark theme' : 'Light theme'}</span>
            </button>
            <button className="utility-item" type="button" onClick={() => onChangeFont('increase')}>
              <FaPlus aria-hidden="true" />
              <span>Increase text</span>
            </button>
            <button className="utility-item" type="button" onClick={() => onChangeFont('decrease')}>
              <FaMinus aria-hidden="true" />
              <span>Decrease text</span>
            </button>
            <button className="utility-item" type="button" onClick={onResetFont}>
              <FaRotateRight aria-hidden="true" />
              <span>Reset text</span>
            </button>
            <button className="utility-item" type="button" onClick={onToggleVoice}>
              {voiceOn ? <FaVolumeXmark aria-hidden="true" /> : <FaVolumeHigh aria-hidden="true" />}
              <span>{voiceOn ? 'Stop voice' : 'Start voice'}</span>
            </button>
          </div>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            {nav.map(item => <a key={item} className="nav-link" href={`#${item}`}>{item}</a>)}
          </div>
        </div>
      </div>
    </nav>
  );
}
