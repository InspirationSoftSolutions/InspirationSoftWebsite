import React, { useEffect, useState } from 'react';
import { supabase } from './data';

export default function AdminContacts({ go }) {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('Loading contact enquiries...');

  useEffect(() => {
    if (sessionStorage.getItem('inspiration_admin') !== 'true') {
      go('admin-login');
      return;
    }
    const load = async () => {
      try {
        if (supabase) {
          const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
          if (error) throw error;
          setMessages(data || []);
          setStatus(data?.length ? '' : 'No enquiries found yet.');
        } else {
          const local = JSON.parse(localStorage.getItem('contact_messages') || '[]');
          setMessages(local);
          setStatus(local.length ? 'Demo mode: showing locally saved enquiries.' : 'No local enquiries found. Add Supabase keys for live data.');
        }
      } catch (error) {
        setStatus(error.message || 'Unable to load enquiries.');
      }
    };
    load();
  }, [go]);

  return (
    <main className="admin-shell contacts-shell">
      <div className="admin-panel contacts-panel">
        <div className="admin-topbar">
          <div><h1>Contact Enquiries</h1><p>{status}</p></div>
          <div className="d-flex gap-2"><button className="btn secondary-action" onClick={() => go('home')}>Website</button><button className="btn primary-action" onClick={() => { sessionStorage.removeItem('inspiration_admin'); go('admin-login'); }}>Logout</button></div>
        </div>
        <div className="table-responsive">
          <table className="table align-middle admin-table">
            <thead><tr><th>Date</th><th>Name</th><th>Contact</th><th>Service</th><th>Message</th></tr></thead>
            <tbody>
              {messages.map(item => (
                <tr key={item.id || `${item.email}-${item.created_at}`}>
                  <td>{item.created_at ? new Date(item.created_at).toLocaleString() : '-'}</td>
                  <td><strong>{item.name}</strong><br /><small>{item.company}</small></td>
                  <td>{item.email}<br /><small>{item.phone}</small></td>
                  <td>{item.service}</td>
                  <td>{item.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
