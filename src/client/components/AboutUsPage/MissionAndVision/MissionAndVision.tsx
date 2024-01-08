import type { FunctionComponent } from 'react';
import React from 'react';
import styles from './MissionAndVision.scss';
import image from './chalkboardImage.png';

const ImageSvg: FunctionComponent = () => (
  <svg width="103" height="96" viewBox="0 0 103 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* paths have been removed for brevity */}
  </svg>
);

const CheckmarkSvg: FunctionComponent = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* path has been removed for brevity */}
  </svg>
);

const MissionAndVision: FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={image} alt="people standing in front of chalkboard" />
        <ImageSvg />
      </div>
      <div className={styles.simpleTextBox}>
        <h2>We provide technology solutions that help you succeed</h2>
        <p>
          Our mission is to become an extension of your team so we
          can help your business grow — all while costing you less than
          a single full-time designer. Our mission is to become an
          extension of your team so we can help your business grow —
          all while costing you less than a single full-time designer.
        </p>
      </div>
      <div className={styles.textBoxColored}>
        <div className={styles.graphicAndTitle}>
          <CheckmarkSvg />
          <h3>Our mission</h3>
        </div>
        <p>
          Our mission is to become an extension of your team so we
          can help your business grow — all while costing you less than
          a single full-time designer. Our mission is to become an
          extension of your team so we can help your business grow —
          all while costing you less than a single full-time designer.
        </p>
      </div>
      <div className={styles.textBoxColored}>
        <div className={styles.graphicAndTitle}>
          <CheckmarkSvg />
          <h3>Our vision</h3>
        </div>
        <p>
          Our mission is to become an extension of your team so we
          can help your business grow — all while costing you less than
          a single full-time designer. Our mission is to become an
          extension of your team so we can help your business grow —
          all while costing you less than a single full-time designer.
        </p>
      </div>
    </div>
  );
};

export default MissionAndVision;
