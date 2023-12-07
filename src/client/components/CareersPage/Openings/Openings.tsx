import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import logger from '../../../../server/logger';
import styles from './Openings.scss';

const Openings: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const getAQuoteClick = useCallback(() => {
    try {
      navigate('./contact-us');
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [navigate]);

  const openings = [
    { position: 'Digital Senior Designer',
      type: 'remote',
      url: './job-link',
      description: 'Description of job requirements , Description of job requirementsDescription of job requirements' },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h2>Our team of professionals</h2>
        <p>
          Our mission is to become an extension of
          your team so we can help your business grow
          — all while costing you less than a single
          full-time designer.
          {' '}
        </p>
      </div>
    </div>
  );
};

export default Openings;
