import type { FunctionComponent } from 'react';
import React from 'react';
import Button, { ButtonSize } from '../../../Button/Button';
import useIsMobileWidth from '../../../../hooks/useIsMobileWidth';
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
}) => {
  const isMobileWidth = useIsMobileWidth();
  const buttonSize = isMobileWidth ? ButtonSize.Small : ButtonSize.Medium;
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h3>{position}</h3>
        <p>{type}</p>
        <p>{description}</p>
      </div>
      <div className={styles.buttonContainer}>
        <Button size={buttonSize} to={url}>
          Apply
        </Button>
      </div>
    </div>
  );
};

export default JobOpeningCard;
