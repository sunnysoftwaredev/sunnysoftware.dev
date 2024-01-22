import type { FunctionComponent } from 'react';
import React from 'react';
import AccordianPanel from '../../AccordianPanel/AccordianPanel';
import styles from './FullFAQ.scss';
import { faqData } from './faqData';

const FullFAQ: FunctionComponent = () => {
  return (
    <div className={styles.faqContainer}>
      <div className={styles.faqPanelsContainer}>
        {faqData.map(faq => (
          <AccordianPanel
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </div>
  );
};

export default FullFAQ;
