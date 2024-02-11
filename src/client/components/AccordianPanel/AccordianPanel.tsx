import type { FunctionComponent } from 'react';
import React, { useCallback, useState } from 'react';
import styles from './AccordianPanel.scss';

type AccordianPanelProps = {
  question: string;
  answer: string;
};

const AccordianPanel: FunctionComponent<AccordianPanelProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Using the functional update form to negate the previous state
  // removes the necessity of dependency array for useCallback
  const togglePanel = useCallback(() => {
    setIsOpen(open => !open);
  }, []);

  return (
    <div className={styles.accordianPanelContainer}>
      <div className={styles.accordianQuestion} onClick={togglePanel}>
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

export default AccordianPanel;
