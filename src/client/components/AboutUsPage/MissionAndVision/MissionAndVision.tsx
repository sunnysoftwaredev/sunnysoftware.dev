import type { FunctionComponent } from 'react';
import React from 'react';
import styles from './MissionAndVision.scss';
import image from './chalkboardImage.png';
import { ReactComponent as ImageSvg } from './imageSvg.svg';
import { ReactComponent as CheckmarkSvg } from './checkmarkSvg.svg';

const TextBoxColored: FunctionComponent<{ title: string; }> = ({ title, children }) => (
  <div className={styles.textBoxColored}>
    <div className={styles.graphicAndTitle}>
      <CheckmarkSvg />
      <h3>{title}</h3>
    </div>
    <p>{children}</p>
  </div>
);

const MissionAndVision: FunctionComponent = () => {
  const missionPassage = "Our mission is to become an extension of your team so we can help your business grow — all while costing you less than a single full-time designer. Our mission is to become an extension of your team so we can help your business grow — all while costing you less than a single full-time designer.";

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={image} alt="people standing in front of chalkboard" />
        <ImageSvg />
      </div>
      <div className={styles.simpleTextBox}>
        <h2>We provide technology solutions that help you succeed</h2>
        <p>{missionPassage}</p>
      </div>
      <TextBoxColored title="Our mission">{missionPassage}</TextBoxColored>
      <TextBoxColored title="Our vision">{missionPassage}</TextBoxColored>
    </div>
  );
};

export default MissionAndVision;