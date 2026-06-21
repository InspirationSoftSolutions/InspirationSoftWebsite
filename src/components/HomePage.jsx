import React, { useEffect, useState } from 'react';
import Header from './Header';
import ScrollString from './ScrollString';
import Footer from './Footer';
import ContactSection from './ContactSection';
import { landingVideo, loadSiteContent, logo, siteDefaults } from './data';
import {
  FaBootstrap,
  FaCss3,
  FaDatabase,
  FaGlobe,
  FaHtml5,
  FaIdCard,
  FaJs,
  FaLaptopCode,
  FaLightbulb,
  FaNodeJs,
  FaPalette,
  FaReact,
  FaRocket,
  FaServer,
  FaBoxesStacked,
  FaBuilding,
  FaChartLine,
  FaXmark
} from 'react-icons/fa6';

const featureIcons = [FaLaptopCode, FaPalette, FaGlobe, FaDatabase, FaServer, FaRocket];
const productIcons = [FaBoxesStacked, FaBuilding, FaIdCard];
const techItems = [
  ['⚛️', 'React'],
  ['🟢', 'Node.js'],
  [FaBootstrap, 'Bootstrap'],
  [FaHtml5, 'HTML5'],
  [FaCss3, 'CSS3'],
  ['🟨', 'JavaScript'],
  ['☁️', 'Hosting'],
  ['🐘', 'PostgreSQL'],
  ['🔷', 'ASP.NET Core'],
  ['⚡', 'Vite'],
  ['🟩', 'Supabase'],
  ['🎨', 'Figma'],
  ['🗄️', 'MSSQL'],
  ['🐍', 'Python']
];

const normalizeServices = services => {
  const customApp = services.find(([title]) => title.toLowerCase().includes('custom web application'));
  const software = services.find(([title]) => title.toLowerCase().includes('software development'));
  const mergedServices = services.filter(([title]) => {
    const lowerTitle = title.toLowerCase();
    return !lowerTitle.includes('custom web application') && !lowerTitle.includes('software development');
  });

  if (!customApp && !software) return services;

  return [
    [
      'Custom Web & Software Applications',
      [
        customApp?.[1] || 'Secure portals, dashboards, workflow engines, CRMs, ERP modules, and business tools built around your exact process.',
        software?.[1] || 'End-to-end software planning, UI, backend, integrations, testing, deployment, and long-term enhancements.'
      ].join(' ')
    ],
    ...mergedServices
  ];
};

export default function HomePage({ go, menuActions }) {
  const [content, setContent] = useState(siteDefaults);
  const [activeService, setActiveService] = useState(null);
  const [activeProductIndex, setActiveProductIndex] = useState(0);

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

  const { services, products, processSteps } = content;
  const displayServices = normalizeServices(services);
  const ActiveProductIcon = productIcons[activeProductIndex % productIcons.length];
  const activeProduct = products[activeProductIndex] || products[0];
  const { toggleTheme, changeFont, resetFont, toggleVoice, activeTheme, voiceOn } = menuActions;
  const ActiveServiceIcon = activeService?.Icon;
  const serviceSummary = text => {
    const [firstSentence] = text.split('.');
    return `${firstSentence.slice(0, 96)}${firstSentence.length > 96 ? '...' : '.'}`;
  };

  return (
    <>
      <Header
        go={go}
        onToggleTheme={toggleTheme}
        onChangeFont={changeFont}
        onResetFont={resetFont}
        onToggleVoice={toggleVoice}
        activeTheme={activeTheme}
        voiceOn={voiceOn}
      />
      <main>
        <ScrollString />
        <section className="hero-section" id="home">
          <video className="landing-video" src={landingVideo} autoPlay muted loop playsInline />
          
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
          <div className="container hero-content">
            <div className="row align-items-center min-vh-100 pt-5">
              <div className="col-lg-7">
                <p className="eyebrow">Innovate . Develop . Succeed</p>
                <h2>Technology solutions that move growing businesses forward.</h2>
                <p className="hero-copy">Inspiration Soft Solutions designs, develops, hosts, and maintains modern digital products, from polished business websites to custom applications and finance-ready eKYC modules.</p>
                <div className="hero-actions">
                  <a className="btn primary-action" href="#contact">Contact Us</a>
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

        <section className="section-pad services-section" id="services">
          <div className="container">
            <div className="section-head centered">
              <p className="eyebrow">Services</p>
              <h2>Complete digital capability under one roof</h2>
              <span className="section-divider centered-divider" aria-hidden="true" />
            </div>
            <div className="row g-4">
              {displayServices.map(([title, text], index) => {
                const Icon = featureIcons[index % featureIcons.length];
                return (
                  <div className="col-md-6 col-xl-4" key={title}>
                    <button
                      className="service-card"
                      type="button"
                      style={{ '--delay': `${index * 80}ms` }}
                      onClick={() => setActiveService({ title, text, Icon })}
                    >
                      <div className="service-head-row">
                        <div className="service-icon" aria-hidden="true"><Icon /></div>
                        <h3>{title}</h3>
                      </div>
                      <p>{serviceSummary(text)}</p>
                      <span className="service-more">View details</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-pad solutions-section" id="solutions">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-5">
                <p className="eyebrow">Product Solutions</p>
                <h2>Ready business modules, customized for your operations</h2>
                <span className="section-divider" aria-hidden="true" />
                <p className="muted-copy">Choose a proven product foundation and adapt it to your workflow, approval chain, reporting needs, and compliance requirements.</p>
                {activeProduct && (
                  <div className="product-visual-bars" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </div>                  
                )}
              </div>
              <div className="col-lg-7">
                <div className="solution-stack">
                  
                  
                  {products.map(([title, text], index) => {
                    const ProductIcon = productIcons[index % productIcons.length];
                    return (
                      <button
                        className={`solution-row ${activeProductIndex === index ? 'is-active' : ''}`}
                        key={title}
                        onMouseEnter={() => setActiveProductIndex(index)}
                        onFocus={() => setActiveProductIndex(index)}
                      >
                        <div className="row">
                          <div className="col-md-2">
                            <div className="product-visual-icon" aria-hidden="true">
                              <ProductIcon />
                            </div>
                          </div>
                          <div className="col-md-10">
                            <span>{title}</span>
                            <small>{text}</small>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad process-section" id="process">
          <div className="container">
            <div className="section-head centered">
              <p className="eyebrow">Delivery Process</p>
              <h2>Clear execution from idea to stable launch</h2>
              <span className="section-divider centered-divider" aria-hidden="true" />
            </div>
            <div className="process-timeline">
              {processSteps.map((step, index) => {
                const stepDescriptions = {
                  'Discovery': 'Understand goals, requirements, and scope',
                  'Design': 'Wireframes, UI mockups, and architecture',
                  'Development': 'Frontend, backend, and integrations',
                  'Testing': 'QA, bug fixes, and performance checks',
                  'Launch': 'Deploy, configure, and go live',
                  'Support': 'Monitor, maintain, and enhance'
                };
                const desc = stepDescriptions[step] || `Complete the ${step.toLowerCase()} stage`;
                return (
                  <div className="process-step" key={step} style={{ '--step-delay': `${index * 0.12}s` }}>
                    <div className="process-step-marker">
                      <span>{index + 1}</span>
                      {index < processSteps.length - 1 && <div className="process-step-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>}
                    </div>
                    <strong className="process-step-title">{step}</strong>
                    <p className="process-step-desc">{desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-pad contact-section" id="technologies">
          <div className="container">
            <div className="section-head centered">
              <p className="eyebrow">Technologies</p>
              <h2>Tools and frameworks we use to build modern business systems</h2>
              <span className="section-divider centered-divider" aria-hidden="true" />
            </div>
            <div className="tech-grid">
              {techItems.map(([Icon, label]) => (
                <div className="tech-pill" key={label}>
                  <span><Icon aria-hidden="true" />{Icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContactSection services={displayServices} products={products} contactPoints={content.contactPoints} />
        {activeService && (
          <div className="service-modal-backdrop" role="presentation" onClick={() => setActiveService(null)}>
            <div
              className="service-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-modal-title"
              onClick={event => event.stopPropagation()}
            >
              <button className="service-modal-close" type="button" onClick={() => setActiveService(null)} aria-label="Close service details">
                <FaXmark aria-hidden="true" />
              </button>
              <div className="service-modal-icon" aria-hidden="true">{ActiveServiceIcon && <ActiveServiceIcon />}</div>
              <p className="eyebrow">Service detail</p>
              <h2 id="service-modal-title">{activeService.title}</h2>
              <p>{activeService.text}</p>
              
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
