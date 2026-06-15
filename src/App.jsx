import React, { useEffect, useMemo, useState } from 'react';
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLogin';
import AdminContacts from './components/AdminContacts';

export default function App() {
  const [route, setRoute] = useState(() => location.hash.replace('#/', '') || 'home');
  const go = useMemo(() => page => { location.hash = `/${page}`; setRoute(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);

  useEffect(() => {
    const sync = () => setRoute(location.hash.replace('#/', '') || 'home');
    addEventListener('hashchange', sync);
    return () => removeEventListener('hashchange', sync);
  }, []);

  if (route === 'admin-login') return <AdminLogin go={go} />;
  if (route === 'admin-contacts') return <AdminContacts go={go} />;
  return <HomePage route={route} go={go} />;
}
