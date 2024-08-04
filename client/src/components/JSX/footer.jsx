import React from 'react';
import '../styles/footer-Styles.css'
import City10 from '../../images/City10.png';

export default function Footer() {
  return (
    <footer>
      <p>@ Copyright 2024 UAELANDMARKS. All rights reserved</p>
      <div className="footer-options">
        <a href="/">Terms & Conditions  | </a>
        <a href="/"> Privacy Policy</a>
      </div>
    </footer>
  );
};
