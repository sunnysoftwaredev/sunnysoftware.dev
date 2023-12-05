import React from 'react';
import styles from './MethodologyBenefits.scss';

const MethodologyBenefits: React.FunctionComponent = () => {
  const checkmarkSvg = (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M16 5C13.0826 5 10.2847 6.15893 8.22183 8.22183C6.15893 10.2847 5 13.0826 5 16C5 17.4445 5.28452 18.8749 5.83732 20.2095C6.39013 21.5441 7.20038 22.7567 8.22183 23.7782C9.24327 24.7996 10.4559 25.6099 11.7905 26.1627C13.1251 26.7155 14.5555 27 16 27C17.4445 27 18.8749 26.7155 20.2095 26.1627C21.5441 25.6099 22.7567 24.7996 23.7782 23.7782C24.7996 22.7567 25.6099 21.5441 26.1627 20.2095C26.7155 18.8749 27 17.4445 27 16C27 13.0826 25.8411 10.2847 23.7782 8.22183C21.7153 6.15893 18.9174 5 16 5ZM6.80761 6.80761C9.24558 4.36964 12.5522 3 16 3C19.4478 3 22.7544 4.36964 25.1924 6.80761C27.6304 9.24558 29 12.5522 29 16C29 17.7072 28.6637 19.3977 28.0104 20.9749C27.3571 22.5521 26.3996 23.9852 25.1924 25.1924C23.9852 26.3996 22.5521 27.3571 20.9749 28.0104C19.3977 28.6637 17.7072 29 16 29C14.2928 29 12.6023 28.6637 11.0251 28.0104C9.44788 27.3571 8.01477 26.3996 6.80761 25.1924C5.60045 23.9852 4.64288 22.5521 3.98957 20.9749C3.33625 19.3977 3 17.7072 3 16C3 12.5522 4.36964 9.24558 6.80761 6.80761ZM20.5812 12.1863C21.0307 12.5073 21.1347 13.1318 20.8137 13.5812L15.8137 20.5812C15.6429 20.8204 15.3754 20.9723 15.0825 20.9966C14.7895 21.0208 14.5007 20.915 14.2929 20.7071L11.2929 17.7071C10.9024 17.3166 10.9024 16.6834 11.2929 16.2929C11.6834 15.9024 12.3166 15.9024 12.7071 16.2929L14.8724 18.4582L19.1863 12.4188C19.5073 11.9693 20.1318 11.8653 20.5812 12.1863Z" fill="#F39B1F" />
    </svg>
  );
  const graphSvg = (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.7 16.5571H1.32861V1.18567" stroke="#22CC29" strokeWidth="1.53714" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.32861 13.1946L9.01433 5.98929L11.8965 8.87143L16.2197 4.54822" stroke="#22CC29" strokeWidth="1.53714" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.textHeader}>
          <h2>Why you need it</h2>
          <p>
            Our mission is to become an extension of your
            team so we can help your business grow — all while
            costing you less than a single full-time designer.
            {' '}
          </p>
        </div>
        <div className={styles.benefitsContainer}>
          <div className={styles.benefit}>
            {checkmarkSvg}
            <div className={styles.benefitText}>
              <h3>Benefit1</h3>
              <p>
                Our mission is to become an extension
                of your team so we can help your business grow
                — all while costing you less than a single

              </p>
            </div>
          </div>
          <div className={styles.benefit}>
            {checkmarkSvg}
            <div className={styles.benefitText}>
              <h3>Benefit2</h3>
              <p>
                Our mission is to become an extension of your
                team so we can help your business grow — all
                while costing you less than a single

              </p>
            </div>
          </div>
          <div className={styles.benefit}>
            {checkmarkSvg}
            <div className={styles.benefitText}>
              <h3>Benefit3</h3>
              <p>
                Our mission is to become an extension of your
                team so we can help your business grow — all
                while costing you less than a single

              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.statsContainer}>
        <div className={styles.statsBox}>
          <p>New Users</p>
          <h3>3.21k</h3>
          <div className={styles.statsBoxBottom}>
            <div className={styles.graphAndPercentage}>
              {graphSvg}
              <p>108%</p>
            </div>
            <p>vs Prev Week</p>
          </div>
        </div>
        <div className={styles.statsBox}>
          <p>New Posts</p>
          <h3>1.11k</h3>
          <div className={styles.statsBoxBottom}>
            <div className={styles.graphAndPercentage}>
              {graphSvg}
              <p>23%</p>
            </div>
            <p>vs Prev Week</p>
          </div>
        </div>
        <div className={styles.statsBox}>
          <p>Total Views</p>
          <h3>53.26k</h3>
          <div className={styles.statsBoxBottom}>
            <div className={styles.graphAndPercentage}>
              {graphSvg}
              <p>23%</p>
            </div>
            <p>vs Prev Mon</p>
          </div>
        </div>
        <div className={styles.statsBox}>
          <p>Total Sales</p>
          <h3>0.9k</h3>
          <div className={styles.statsBoxBottom}>
            <div className={styles.graphAndPercentage}>
              {graphSvg}
              <p>23%</p>
            </div>
            <p>vs Prev Week</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MethodologyBenefits;
