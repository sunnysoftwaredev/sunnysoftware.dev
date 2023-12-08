import type { FunctionComponent } from 'react';
import React from 'react';
import Button, { ButtonSize } from '../../../Button/Button';
import styles from './JobOpeningCard.scss';

type JobOpeningCardProps = {
  position: string;
  type: string;
  description: string;
  url: string;
};

const JobOpeningCard: FunctionComponent<JobOpeningCardProps> = ({
  position,
  type,
  description,
  url,
}) => (
  <div className={styles.container}>
    <div className={styles.text}>
      <h3>{position}</h3>
      <p>{type}</p>
      <p>{description}</p>
    </div>
    <div className={styles.buttonContainer}>
      <a href={url}>
        <Button size={ButtonSize.Medium} to="/contact-us">
          Apply
        </Button>
      </a>
    </div>
  </div>
);

export default JobOpeningCard;
