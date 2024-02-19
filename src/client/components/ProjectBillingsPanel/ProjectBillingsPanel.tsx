import type { FunctionComponent } from 'react';
import React, { useCallback, useState } from 'react';
import styles from './ProjectBillingsPanel.scss';

// TODO: refactor props and component
type ProjectBillingsPanelProps = {
  question: string;
  answer: string;
};

const ProjectBillingsPanel: FunctionComponent<ProjectBillingsPanelProps>
 = ({ question, answer }) => {
   const [isOpen, setIsOpen] = useState(false);
   const openClosePanel = useCallback(() => {
     setIsOpen(!isOpen);
   }, [isOpen]);
   return (
     <div className={styles.accordianPanelContainer}>
       <div className={styles.accordianQuestion} onClick={openClosePanel}>
         <h3>{question}</h3>
         <div className={styles.panelArrow}>
           {'>'}
         </div>
       </div>
       <div className={styles.accordianDivider} />
       {isOpen && <p className={styles.accordianAnswer}>{answer}</p>}
     </div>
   );
 };

export default ProjectBillingsPanel;
