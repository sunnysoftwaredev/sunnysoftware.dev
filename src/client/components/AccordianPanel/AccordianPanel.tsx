import type { FunctionComponent } from 'react';
import React, { useCallback, useState } from 'react';
import styles from './AccordionPanel.scss';

type AccordionPanelProps = {
  question: string;
  answer: string;
};

const AccordionPanel: FunctionComponent<AccordionPanelProps>
 = ({ question, answer }) => {
   const [isOpen, setIsOpen] = useState(false);
   const openClosePanel = useCallback(() => {
     setIsOpen(!isOpen);
   }, [isOpen]);
   return (
     <div className={styles.accordionPanelContainer}>
       <div className={styles.accordionQuestion} onClick={openClosePanel}>
         <h3>{question}</h3>
         <div className={styles.panelArrow}>
           {'>'}
         </div>
       </div>
       <div className={styles.accordionDivider} />
       {isOpen && <p className={styles.accordionAnswer}>{answer}</p>}
     </div>
   );
 };

export default AccordionPanel;
