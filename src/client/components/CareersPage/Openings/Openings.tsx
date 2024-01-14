import React from 'react';
import styles from './Openings.scss';
import JobOpeningCard from './JobOpeningCard/JobOpeningCard';

const jobDescriptions = {
  seniorDesigner: 'Description of job requirements , Description of job requirementsDescription of job requirements',
};

const OPENINGS = [
  {
    position: 'Digital Senior Designer',
    type: 'remote',
    url: '/contact-us',
    descriptionKey: 'seniorDesigner',
  },
  {
    position: 'Digital Senior Designer2',
    type: 'remote',
    url: '/contact-us',
    descriptionKey: 'seniorDesigner',
  },
  {
    position: 'Digital Senior Designer',
    type: 'remote',
    url: '/contact-us',
    descriptionKey: 'seniorDesigner',
  },
  // ...rest of the entries with appropriate 'descriptionKey' values
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
      {OPENINGS.map(card => (
        <JobOpeningCard
          key={card.descriptionKey}
          url={card.url}
          position={card.position}
          type={card.type}
          description={jobDescriptions[card.descriptionKey]}
        />
      ))}
    </div>
  </div>
);

export default Openings;
