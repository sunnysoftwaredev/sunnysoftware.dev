import React from 'react';
import EmployeeCardStack from '../../EmployeeCardStack/EmployeeCardStack';
import styles from './TestimonialsCardStack.scss';
import StarSvg from '../StarSvg/StarSvg';

const TestimonialsCardStack: React.FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <div className={styles.starContainer}>
          <StarSvg />
          <StarSvg />
          <StarSvg />
          <StarSvg />
          <StarSvg />
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