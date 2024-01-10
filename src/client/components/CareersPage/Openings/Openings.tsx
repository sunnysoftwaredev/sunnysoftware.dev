import React from 'react';
import styles from './Openings.scss';
import JobOpeningCard from './JobOpeningCard/JobOpeningCard';

const OPENINGS = [
  {
    id: 'senior-designer-1',
    position: 'Digital Senior Designer',
    type: 'remote',
    url: '/contact-us',
    description: 'Description of job requirements, Description of job requirementsDescription of job requirements',
  },
  {
    id: 'senior-designer-2',
    position: 'Digital Senior Designer2',
    type: 'remote',
    url: '/contact-us',
    description: 'Description of job requirements, Description of job requirementsDescription of job requirements',
  },
  // ... other job postings with their respective unique `id`s
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
      {OPENINGS.map((card) => (
        <JobOpeningCard
          key={card.id}
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
