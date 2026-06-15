import React, { useState } from 'react';
import { logo, ADMIN_ID, ADMIN_PASSWORD } from './data';

export default function AdminLogin({ go }) {
  const [form, setForm] = useState({ id: '', password: '' });
  const [error, setError] = useState('');

  const login = event => {
    event.preventDefault();
    if (form.id === ADMIN_ID && form.password === ADMIN_PASSWORD) {
      sessionStorage.setItem('inspiration_admin', 'true');
      go('admin-contacts');
    } else {
      setError('Invalid ID or password.');
    }
  };

  return (
    <main className="admin-shell">
      <div className="admin-panel login-panel">
        <img src={logo} alt="Inspiration Soft Solutions" />
        <h1>Admin Login</h1>
        <form onSubmit={login}>
          <input className="form-control" name="id" value={form.id} onChange={e => setForm({ ...form, id: e.target.value })} placeholder="Admin ID" />
          <input className="form-control" type="password" name="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" />
          <button className="btn primary-action w-100" type="submit">Login</button>
          <button className="btn secondary-action w-100" type="button" onClick={() => go('home')}>Back to Website</button>
          {error && <p className="admin-error">{error}</p>}
        </form>
      </div>
    </main>
  );
}
