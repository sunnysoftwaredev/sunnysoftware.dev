import type { FunctionComponent } from 'react';
import React from 'react';
import styles from './ProjectBillings.scss';

const ProjectBillings: FunctionComponent = () => {
  const x = 1;
  return (
    <div className={styles.container}>
      <div className={styles.headings}>
        <p>Date</p>
        <p> </p>
        <p>Total hours</p>
        <p>Total ammount</p>
      </div>
      <p>COMPONENT HERE</p>
    </div>
  );
};

export default ProjectBillings;
