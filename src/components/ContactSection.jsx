import React, { useEffect, useMemo, useState } from 'react';
import { siteDefaults, supabase } from './data';
import { FaCheck } from 'react-icons/fa6';

export default function ContactSection({
  services = siteDefaults.services,
  products = siteDefaults.products,
  contactPoints = siteDefaults.contactPoints
}) {
  const serviceOptions = useMemo(
    () => [...services.map(([title]) => title), ...products.map(([title]) => title)],
    [services, products]
  );
  const defaultService = serviceOptions[0] || 'Custom Web Application';
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service: defaultService, message: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    setForm(current => (
      serviceOptions.includes(current.service) ? current : { ...current, service: defaultService }
    ));
  }, [defaultService, serviceOptions]);

  const update = event => setForm(current => ({ ...current, [event.target.name]: event.target.value }));

  const submit = async event => {
    event.preventDefault();
    setStatus('Sending...');
    const payload = { ...form, created_at: new Date().toISOString() };
    try {
      if (supabase) {
        const { error } = await supabase.from('contact_messages').insert(payload);
        if (error) throw error;
      } else {
        const local = JSON.parse(localStorage.getItem('contact_messages') || '[]');
        local.unshift({ id: crypto.randomUUID(), ...payload });
        localStorage.setItem('contact_messages', JSON.stringify(local));
      }
      setForm({ name: '', email: '', phone: '', company: '', service: defaultService, message: '' });
      setStatus(supabase ? 'Thank you. Your enquiry has been submitted.' : 'Saved locally for demo. Add Supabase keys to store online.');
    } catch (error) {
      setStatus(error.message || 'Unable to submit right now.');
    }
  };

  return (
    <section className="section-pad tech-section" id="contact">
      <div className="container">
        <div className="particles" aria-hidden="true">
            {Array.from({ length: 24 }, (_, index) => (
              <span
                key={index}
                style={{
                  '--x': `${(index * 4.1) % 100}%`,
                  '--duration': `${7 + index * 0.22}s`,
                  '--delay': `${index * -0.36}s`
                }}
              />
            ))}
          </div>
        <div className="row g-5 align-items-start">
          <div className="col-lg-5">
            <p className="eyebrow">Contact</p>
            <h2>Tell us what you want to build.</h2>
            <p className="muted-copy">Share your requirement and our team will map the right design, software, database, hosting, and maintenance path.</p>
            <div className="contact-points">
              {contactPoints.map(point => (
                <span key={point}>
                  <FaCheck aria-hidden="true" />
                  {point}
                </span>
              ))}
            </div>
          </div>
          <div className="col-lg-7">
            <form className="contact-form" onSubmit={submit}>
              <div className="row g-3">
                <div className="col-md-6"><input className="form-control" required name="name" value={form.name} onChange={update} placeholder="Full name" /></div>
                <div className="col-md-6"><input className="form-control" required type="email" name="email" value={form.email} onChange={update} placeholder="Email address" /></div>
                <div className="col-md-6"><input className="form-control" name="phone" value={form.phone} onChange={update} placeholder="Phone number" /></div>
                <div className="col-md-6"><input className="form-control" name="company" value={form.company} onChange={update} placeholder="Company" /></div>
                <div className="col-12">
                  <select className="form-select" name="service" value={form.service} onChange={update}>
                    {serviceOptions.map(item => <option key={item}>{item}</option>)}
                  </select>
                </div>
                <div className="col-12"><textarea className="form-control" required rows="5" name="message" value={form.message} onChange={update} placeholder="Project details" /></div>
                <div className="col-12 d-flex flex-wrap gap-3 align-items-center">
                  <button className="btn primary-action" type="submit">Submit Enquiry</button>
                  <span className="form-status">{status}</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
