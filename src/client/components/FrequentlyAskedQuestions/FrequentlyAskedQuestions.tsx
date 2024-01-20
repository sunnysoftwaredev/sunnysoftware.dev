import type { FunctionComponent } from 'react';
import React from 'react';
import AccordianPanel from '../AccordianPanel/AccordianPanel';
import Button, { ButtonSize } from '../Button/Button';
import styles from './FrequentlyAskedQuestions.scss';
import { faqData } from './faqData'; // Import FAQ data from a separate constants file

const FrequentlyAskedQuestions: FunctionComponent = () => {
  return (
    <div className={styles.faqContainer}>
      <h2>FAQ</h2>
      <p className={styles.faqContainerText}>
        14 days unlimited free trial. No contract or credit card required.
      </p>
      <div className={styles.faqPanelsContainer}>
        {faqData.map(faq => (
          <AccordianPanel
            key={faq.question}
            question={faq.question} answer={faq.answer}
          />
        ))}
        <Button size={ButtonSize.Large} to="/team">
          Meet our team
        </Button>
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestions;
