import type { FunctionComponent } from 'react';
import React from 'react';
import AccordianPanel from '../AccordianPanel/AccordianPanel';
import Button, { ButtonSize } from '../Button/Button';
import styles from './FrequentlyAskedQuestions.scss';

const FrequentlyAskedQuestions: FunctionComponent = () => {
  const faqData = [
    {
      question: 'Question 1',
      answer: `You and your team can request design work through a
      shared board we will set up for you in Asana. You can request as
      many designs as you like.`,
    },
    {
      question: 'Question 2',
      answer: `You and your team can request design work through a
      shared board we will set up for you in Asana. You can request as
      many designs as you like.`,
    },
    {
      question: 'Question 3',
      answer: `You and your team can request design work through a
      shared board we will set up for you in Asana. You can request as
      many designs as you like.`,
    },
    {
      question: 'Question 4',
      answer: `You and your team can request design work through a
      shared board we will set up for you in Asana. You can request as
      many designs as you like.`,
    },
  ];
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
