import type { FunctionComponent } from 'react';
import React from 'react';
import AccordianPanel from '../../AccordianPanel/AccordianPanel';
import { faqData } from './constants/faqData'; // Import faqData from constants
import styles from './FullFAQ.scss';

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
// Assuming that './constants/faqData.ts' is present in the filesystem, with
// the exported constant faqData containing the previously hardcoded questions and answers.
