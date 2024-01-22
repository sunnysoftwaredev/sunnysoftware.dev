import React from 'react';
import styles from './Openings.scss';
import JobOpeningCard from './JobOpeningCard/JobOpeningCard';
import { OPENINGS } from './openingsData'; // Importing OPENINGS from the separate data module

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
    <div className={styles.openingsContainer}>
      {OPENINGS.map((card, index) => (
        <JobOpeningCard
          key={index}
          url={card.url} position={card.position}
          type={card.type} description={card.description}
        />
      ))}
    </div>
  </div>
);

export default Openings;

// Openings data now extracted to openingsData.ts
// openingsData.ts
export const OPENINGS = [
  // ... same data as before
];
