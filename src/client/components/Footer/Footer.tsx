import React from 'react';
import type { FunctionComponent } from 'react';
import styles from './Footer.scss';
import SvgIcon from './SvgIcon';

const Footer: FunctionComponent = () => {
    
  const iconProps = {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  };

  return (
    <footer>
      <div className={styles.topContainer}>
        <div className={styles.siteLinks}>
          <a href="/about-us">Company</a>
          <a href="/services">Pricing</a>
          <a href="/about-us">FAQ</a>
          <a href="/contact-us">Contact us</a>
        </div>
        <div className={styles.socialIcons}>
          <SvgIcon {...iconProps} name="youtubeIcon" />
          <SvgIcon {...iconProps} name="facebookIcon" />
          <SvgIcon {...iconProps} name="xIcon" />
          <SvgIcon {...iconProps} name="instagramIcon" />
          <SvgIcon {...iconProps} name="linkedInIcon" />
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.bottomContainer}>
        <div className={styles.privacy}><a href="./about-us">Privacy policy</a></div>
        <div className={styles.copyright}>
          Sunny Software, LLC @2023 All rights reserved.
        </div>
      </div>
    </footer>
  );
};
export default Footer;