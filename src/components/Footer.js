import React from 'react';
import { t } from '../i18n';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">{t('footer.copyright', { year: currentYear })}</p>
      </div>
    </footer>
  );
};

export default Footer;
