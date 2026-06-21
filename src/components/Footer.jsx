import React from "react";
import {
  FaEnvelope,
  FaInstagram,
  FaLinkedinIn,
  FaLocationPin,
  FaXTwitter
} from "react-icons/fa6";

const LOGO = "/assets/InspirationWhitelogo.png";

export default function Footer() {
  return (
    <footer className="premium-footer demo-footer">
      <div className="container">        
        <div className="footer-grid demo-footer-grid">
          <div>
            <img src={LOGO} alt="Inspiration Soft Solutions" className="footer-logo" />
            <p className="footer-desc">
              Tech company delivering web, software, product, database,
              hosting, and digital solutions for growing businesses.
            </p>
          </div>

          <div>
            <h5 className="footer-heading">Services</h5>
            <a href="#services" className="footer-link">Web & Software Applications</a>
            <a href="#services" className="footer-link">Website Design</a>
            <a href="#services" className="footer-link">Website Development</a>
            <a href="#services" className="footer-link">Database Development</a>
            <a href="#services" className="footer-link">Hosting & Maintenance</a>
          </div>

          <div>
            <h5 className="footer-heading">Solutions</h5>
            <a href="#solutions" className="footer-link">Inventory Management</a>
            <a href="#solutions" className="footer-link">Construction Management</a>
            <a href="#solutions" className="footer-link">eKYC / Account Opening</a>
           
          </div>

          <div>
            <h5 className="footer-heading">Contact</h5>
            <div className="footer-contact-line">
              <FaLocationPin aria-hidden="true" />
              <span>Silvassa, Dadra and Nagar Haveli 396230, India.</span>
            </div>
            <a href="mailto:inspirationsoftsolutions@gmail.com" className="footer-contact-line footer-mail">
              <FaEnvelope aria-hidden="true" />
              <span>inspirationsoftsolutions@gmail.com</span>
            </a>
            <div className="social-links">
              <a href="https://www.linkedin.com/company/inspirationsoftsolutions/" target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="https://twitter.com/inspirationsoftsol" target="_blank" rel="noreferrer" className="social-link" aria-label="X">
                <FaXTwitter />
              </a>
              <a href="https://www.instagram.com/inspirationsoft" target="_blank" rel="noreferrer" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom demo-footer-bottom">
          <p>© 2026 Inspiration Soft Solutions. All Rights Reserved.</p>
          <p>Innovate · Develop · Succeed</p>
        </div>
      </div>
    </footer>
  );
}
