import React from 'react';
import styles from './Openings.scss';

// const OPENINGS = [
//   {
//     position: 'Digital Senior Designer',
//     type: 'remote',
//     url: './job-link',
//     description: 'Description of job requirements',
//   },
// ];

const Openings: React.FunctionComponent = () => (
  <div className={styles.container}>
    <div className={styles.text}>
      <h2>Our team of professionals</h2>
      <p>
        Our mission is to become an extension of
        your team so we can help your business grow
        — all while costing you less than a single
        full-time designer.
      </p>
    </div>
  </div>
);

export default Openings;
