import React from 'react';
import EmployeeCardStack from '../../TestimonialsCardStack/TestimonialsCardStack';
import styles from './TestimonialsCardStack.scss';

const StarIcon: React.FunctionComponent = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M14.3834 4.28C14.9807 2.844 17.018 2.844 17.6154 4.28L20.3914 10.956L27.5967 11.5333C29.1487 11.6573 29.778 13.5933 28.5954 14.6067L23.106 19.3093L24.782 26.34C25.1434 27.8547 23.4967 29.0507 22.1687 28.24L15.9994 24.472L9.83002 28.24C8.50202 29.0507 6.85535 27.8533 7.21669 26.34L8.89269 19.3093L3.40335 14.6067C2.22069 13.5933 2.85002 11.6573 4.40202 11.5333L11.6074 10.956L14.3834 4.28Z" fill="#FED323" />
  </svg>
);

const TestimonialsCardStack: React.FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <div className={styles.starContainer}>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </div>
        <h2>Based on 10,000+ reviews.</h2>
        <p>
          Develop a website by finding a product identity
          that has value and branding to become a characteristic
          of a company. We will also facilitate the business
          marketing of these products.
        </p>
      </div>
      <div className={styles.carouselContainer}>
        <EmployeeCardStack />
      </div>
    </div>
  );
};

export default TestimonialsCardStack;
