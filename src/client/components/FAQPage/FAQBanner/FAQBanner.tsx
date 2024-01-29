import React from 'react';
import styles from './FAQBanner.scss';

interface FAQBannerProps {
  title?: string;
  description?: string;
}

const defaultTitle = 'FAQ';
const defaultDescription = 'Step into the future with our cutting-edge technology solutions tailored for your business needs.';

const FAQBanner: React.FunctionComponent<FAQBannerProps> = ({ title = defaultTitle, description = defaultDescription }) => (
  <div className={styles.container}>
    <div className={styles.text}>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  </div>
);

export default FAQBanner;
