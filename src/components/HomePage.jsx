import React, { useEffect, useState } from 'react';
import Header from './Header';
import ScrollString from './ScrollString';
import Footer from './Footer';
import ContactSection from './ContactSection';
import { landingVideo, loadSiteContent, logo, siteDefaults } from './data';

export default function HomePage({ go }) {
  const [content, setContent] = useState(siteDefaults);

  useEffect(() => {
    let alive = true;

    loadSiteContent()
      .then(nextContent => {
        if (alive) setContent(nextContent);
      })
      .catch(error => {
        console.error('Unable to load Supabase site content:', error);
      });

    return () => {
      alive = false;
    };
  }, []);

  const { stats, services, products, processSteps } = content;

  return (
    <>
      <Header go={go} />
      <main>
        <ScrollString />
        <section className="hero-section" id="home">
          <video className="landing-video" src={landingVideo} autoPlay muted loop playsInline />
          <div className="container hero-content">
            <div className="row align-items-center min-vh-100 pt-5">
              <div className="col-lg-7">
                <p className="eyebrow">Innovate . Develop . Succeed</p>
                <h1>Technology solutions that move growing businesses forward.</h1>
                <p className="hero-copy">Inspiration Soft Solutions designs, develops, hosts, and maintains modern digital products, from polished business websites to custom applications and finance-ready eKYC modules.</p>
                <div className="hero-actions">
                  <a className="btn primary-action" href="#contact">Start a Project</a>
                  <a className="btn secondary-action" href="#services">Explore Services</a>
                </div>
              </div>
              <div className="col-lg-5 mt-5 mt-lg-0">
                <div className="logo-stage">
                  <img src={logo} alt="Inspiration Soft Solutions logo" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-band">
          <div className="container">
            <div className="row g-3">
              {stats.map(([value, label]) => (
                <div className="col-6 col-lg-3" key={value}>
                  <div className="stat-tile"><strong>{value}</strong><span>{label}</span></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad" id="services">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Services</p>
              <h2>Complete digital capability under one roof.</h2>
            </div>
            <div className="row g-4">
              {services.map(([title, text], index) => (
                <div className="col-md-6 col-xl-4" key={title}>
                  <article className="service-card" style={{ '--delay': `${index * 80}ms` }}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad solutions-section" id="solutions">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-5">
                <p className="eyebrow">Product Solutions</p>
                <h2>Ready business modules, customized for your operations.</h2>
                <p className="muted-copy">Choose a proven product foundation and adapt it to your workflow, approval chain, reporting needs, and compliance requirements.</p>
              </div>
              <div className="col-lg-7">
                <div className="solution-stack">
                  {products.map(([title, text]) => (
                    <button className="solution-row" key={title}>
                      <span>{title}</span>
                      <small>{text}</small>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad process-section" id="process">
          <div className="container">
            <div className="section-head centered">
              <p className="eyebrow">Delivery Process</p>
              <h2>Clear execution from idea to stable launch.</h2>
            </div>
            <div className="process-line">
              {processSteps.map((step, index) => (
                <div className="process-dot" key={step}><span>{index + 1}</span><strong>{step}</strong></div>
              ))}
            </div>
          </div>
        </section>

        <ContactSection services={services} products={products} contactPoints={content.contactPoints} />
      </main>
      <Footer />
    </>
  );
}
