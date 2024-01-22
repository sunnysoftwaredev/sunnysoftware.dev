import React from 'react';
import styles from './Openings.scss';
import JobOpeningCard from './JobOpeningCard/JobOpeningCard';

const OPENINGS = [
  {
    position: 'Digital Senior Designer',
    type: 'remote',
    url: '/contact-us',
    description: 'Looking for a creative and experienced designer to lead our digital campaigns.',
  },
  {
    position: 'Frontend Developer',
    type: 'on-site',
    url: '/apply',
    description: 'Frontend Developer with a passion for building user-focused web applications.',
  },
  // More job openings...
];

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
          key={`${card.position}-${index}`}
          url={card.url}
          position={card.position}
          type={card.type}
          description={card.description}
        />
      ))}
    </div>
  </div>
);

export default Openings;
