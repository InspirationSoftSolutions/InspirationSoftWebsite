import React from "react";
import {
FaLinkedinIn,
FaInstagram,
FaXTwitter,
FaEnvelope
} from "react-icons/fa6";

const LOGO = "/assets/InspirationWhitelogo.png";

export default function Footer() {
return ( <footer className="premium-footer">

  <div className="container">

    <div className="footer-main">

      {/* LEFT LOGO */}
      <div className="footer-logo-side">
        <img
          src={LOGO}
          alt="Inspiration Soft Solutions"
          className="footer-large-logo"
        />
      </div>

      {/* CENTER DESCRIPTION */}
      <div className="footer-content">

        <h4>INSPIRATION SOFT SOLUTIONS</h4>

        <p>
          Modern web applications, enterprise software,
          mobile solutions and digital transformation
          services built for secure business growth.
        </p>

      </div>

      {/* RIGHT CONTACT */}
      <div className="footer-contact-side">

        <div className="footer-address">
          SHOP NO.111, FIRST FLOOR,
          Horizon Park, Opposite Collector Bungalows/Osit, Naroli Main Road,
          Silvassa, Dadra and Nagar Haveli 396230.
        </div>

        <a
          href="mailto:inspirationsoftsolutions@gmail.com"
          className="footer-email"
        >
          <FaEnvelope />
          inspirationsoftsolutions@gmail.com
        </a>

        <div className="footer-social">

          <a
            href="https://www.linkedin.com/company/inspirationsoftsolutions/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn />
          </a>

          <a
            href="https://www.instagram.com/inspirationsoft"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram />
          </a>

          <a
            href="https://twitter.com/inspirationsoftsol"
            target="_blank"
            rel="noreferrer"
          >
            <FaXTwitter />
          </a>

        </div>

      </div>

    </div>

    <div className="footer-bottom">
      © 2026 Inspiration Soft Solutions. All Rights Reserved.
    </div>

  </div>

</footer>

);
}
