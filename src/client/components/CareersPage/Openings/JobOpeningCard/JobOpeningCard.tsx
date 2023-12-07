import type { FunctionComponent } from 'react';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button, { ButtonSize } from '../../../Button/Button';
import logger from '../../../../../server/logger';
import styles from './JobOpeningCard.scss';

type JobOpeningCardProps = {
  position: string;
  type: string;
  description: string;
  url: string;

};

const JobOpeningCard: FunctionComponent<JobOpeningCardProps>
 = ({ position, type, description, url }) => {
   const navigate = useNavigate();
   const clickPlaceholder = useCallback(() => {
     try {
       navigate('./contact-us');
     } catch (err: unknown) {
       if (err instanceof Error) {
         logger.error(err.message);
       }
     }
   }, [navigate]);
   return (
     <div className={styles.container}>
       <div className={styles.text}>
         <h3>{position}</h3>
         <p>{type}</p>
         <p>{description}</p>
       </div>
       <div className={styles.buttonContainer}>
         <a href={url}>
           <Button
             size={ButtonSize.Medium}
             onClick={clickPlaceholder}
           >
             Apply
           </Button>
         </a>
       </div>
     </div>
   );
 };

export default JobOpeningCard;
