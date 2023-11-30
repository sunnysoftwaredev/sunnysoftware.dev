import type { FunctionComponent } from 'react';
import React from 'react';
import styles from './LocationBanner.scss';
import buildingImage from './buildingImage.png';

const LocationBanner: FunctionComponent = () => {
  const x = 1;
  return (
    <div className={styles.container}>
      <img className={styles.buildingImage} src={buildingImage} alt="Office building" />
      <div className={styles.text}>
        <h2>Where we are based</h2>
        <h3>Sunnyvale, CA</h3>
        <p>+93830903903</p>
      </div>
    </div>
  );
};

export default LocationBanner;
