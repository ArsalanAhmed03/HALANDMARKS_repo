import React from 'react';
import '../styles/footer-Styles.css'
import City10 from '../../images/City10.png';

export default function Footer()  {
  return (
    <footer>
      <p>Copyright 2024 UAELANDMARKS.com All rights reserved</p>
      <div className="footer-options">
        <a href="/">Terms & Conditions |</a>
        <a href="/"> Privacy Policy |</a>
        <a href="/"> Disclaimer</a>
      </div>
      <img src={City10} alt='UAELANDMARKS' width="20%" height={"50%"}/>
    </footer>
  );
};
