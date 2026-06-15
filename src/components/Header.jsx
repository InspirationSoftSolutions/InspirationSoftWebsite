import React from 'react';
import { logoIcon } from './data';

export default function Header({ go }) {
  const nav = ['services', 'solutions', 'process', 'contact'];
  return (
    <nav className="navbar navbar-expand-lg fixed-top glass-nav">
      <div className="container">
        <button className="navbar-brand brand-button" onClick={() => go('home')}>
          <img src={logoIcon} alt="Inspiration Soft Solutions icon" />
          <span>INSPIRATION <small>SOFT SOLUTIONS</small></span>
        </button>
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
