import type { FunctionComponent } from 'react';
import React from 'react';
import AccordianPanel from '../../AccordianPanel/AccordianPanel';
import styles from './FullFAQ.scss';

const FullFAQ: FunctionComponent = () => {
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
    {
      question: 'Question 5',
      answer: `You and your team can request design work through a
      shared board we will set up for you in Asana. You can request as
      many designs as you like.`,
    },
    {
      question: 'Question 6',
      answer: `You and your team can request design work through a
      shared board we will set up for you in Asana. You can request as
      many designs as you like.`,
    },
    {
      question: 'Question 7',
      answer: `You and your team can request design work through a
      shared board we will set up for you in Asana. You can request as
      many designs as you like.`,
    },
    {
      question: 'Question 8',
      answer: `You and your team can request design work through a
      shared board we will set up for you in Asana. You can request as
      many designs as you like.`,
    },
  ];

  return (
    <div className={styles.faqContainer}>
      <div className={styles.faqPanelsContainer}>
        {faqData.map(faq => (
          <AccordianPanel
            key={faq.question}
            question={faq.question} answer={faq.answer}
          />
        ))}
      </div>
    </div>
  );
};

export default FullFAQ;
