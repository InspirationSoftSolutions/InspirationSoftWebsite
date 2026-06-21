import React, { useEffect, useMemo, useState } from 'react';
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLogin';
import AdminContacts from './components/AdminContacts';

export default function App() {
  const [route, setRoute] = useState(() => location.hash.replace('#/', '') || 'home');
  const [theme, setTheme] = useState(() => localStorage.getItem('site-theme') || 'light');
  const [fontSize, setFontSize] = useState(16);
  const [voiceOn, setVoiceOn] = useState(false);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('site-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    if (!voiceOn) return;

    const message = new SpeechSynthesisUtterance(
      'Welcome to Inspiration Soft Solutions. We build websites, custom web applications, software products, database systems, hosting support, and finance ready e K Y C modules. Use the navigation links to explore services, solutions, process, technologies, and contact options.'
    );
    message.rate = 0.92;
    message.pitch = 1;
    message.volume = 1;
    window.speechSynthesis.speak(message);

    return () => window.speechSynthesis.cancel();
  }, [voiceOn]);

  const go = useMemo(() => page => { location.hash = `/${page}`; setRoute(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);
  const toggleTheme = () => setTheme(current => current === 'light' ? 'dark' : 'light');
  const changeFont = direction => setFontSize(current => Math.min(22, Math.max(14, current + (direction === 'increase' ? 2 : -2))));
  const resetFont = () => setFontSize(16);
  const toggleVoice = () => setVoiceOn(current => !current);

  useEffect(() => {
    const handleHash = () => setRoute(location.hash.replace('#/', '') || 'home');
    addEventListener('hashchange', handleHash);
    return () => removeEventListener('hashchange', handleHash);
  }, []);

  if (route === 'admin-login') return <AdminLogin go={go} />;
  if (route === 'admin-contacts') return <AdminContacts go={go} />;
  return (
    <HomePage
      route={route}
      go={go}
      menuActions={{
        toggleTheme,
        changeFont,
        resetFont,
        toggleVoice,
        activeTheme: theme,
        voiceOn
      }}
    />
  );
}
