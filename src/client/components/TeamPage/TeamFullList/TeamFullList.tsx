import React from 'react';
import styles from './TeamFullList.scss';
import headshot1 from './Headshot1.jpg';
import headshot2 from './Headshot2.png';
import headshot3 from './Headshot3.png';

const TeamFullList: React.FunctionComponent = () => {
  const xIcon = (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.2507 7.93598L10.2263 7.96368L10.2475 7.99387L15.6598 15.7031H11.7542L8.08728 10.4809L8.05305 10.4321L8.01371 10.4768L3.41969 15.7031H2.35363L7.55603 9.7864L7.58038 9.75869L7.55918 9.7285L2.3402 2.29688H6.24582L9.71659 7.23983L9.75081 7.28857L9.79014 7.24386L14.1424 2.29688H15.2085L10.2507 7.93598ZM8.08123 9.10075L8.08124 9.10076L8.61608 9.84857L8.6161 9.8486L12.253 14.9416L12.267 14.9612H12.2912H14.1206H14.2117L14.1588 14.8871L9.7007 8.64872L9.70065 8.64866L9.16809 7.90088L9.16805 7.90082L5.73796 3.10123L5.72393 3.08161H5.69982H3.87036H3.77924L3.83222 3.15574L8.08123 9.10075Z" fill="white" stroke="white" strokeWidth="0.09375" />
    </svg>
  );
  const linkedInIcon = (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.38275 10.4333V15.3235H7.1751C7.17613 15.0939 7.17744 14.7947 7.17886 14.445C7.18226 13.6108 7.18634 12.489 7.18906 11.3388C7.19335 9.52308 7.1944 7.61664 7.18338 6.67175H9.38275V7.38836L8.92749 8.07125H9.86175H9.88275H10.3827V7.69114V7.69112C10.5693 7.41954 10.8048 7.1356 11.1341 6.90731C11.5052 6.65005 12.0219 6.44525 12.7747 6.44525C13.7189 6.44525 14.4986 6.75091 15.0461 7.34468C15.5973 7.94244 15.9692 8.89338 15.9692 10.2893V15.3235H13.7607V10.6598C13.7607 9.96554 13.639 9.30294 13.2967 8.80045C12.9327 8.26608 12.3634 7.97725 11.6355 7.97725C10.479 7.97725 9.80589 8.76783 9.52604 9.46276C9.4014 9.76735 9.38275 10.141 9.38275 10.4333ZM2 3.18675C2 2.84422 2.12753 2.56129 2.33925 2.36186C2.55197 2.16147 2.87816 2.0195 3.31575 2.0195H3.3165C3.75356 2.0195 4.06675 2.1605 4.27024 2.35731C4.47362 2.55402 4.60129 2.83897 4.60974 3.19185C4.60849 3.52436 4.48494 3.80672 4.2759 4.00739C4.06616 4.20873 3.74154 4.35475 3.29475 4.35475H3.27375C2.46169 4.35475 2 3.82505 2 3.18675ZM4.399 6.67175V15.3235H2.1905V6.67175H4.399Z" fill="white" stroke="white" />
    </svg>
  );
  const facebookIcon = (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.78455 6.95975H7.28455V6.45975V4.39875C7.28455 4.39225 7.28453 4.38529 7.28452 4.37788C7.2841 4.1656 7.28294 3.58774 7.58682 3.05643C7.8734 2.55536 8.48875 2 9.9623 2H11.7603V3.6235H10.5698C10.2374 3.6235 9.95281 3.78865 9.76565 3.96483C9.58837 4.1317 9.3978 4.40521 9.3978 4.72725V6.45075V6.95075H9.8978H11.7131C11.6717 7.39928 11.6228 7.81481 11.5798 8.14692C11.5637 8.27085 11.5485 8.38292 11.5348 8.4805H9.88505H9.38505V8.9805V15.9692H7.28455V8.97975V8.47975H6.78455H5.77405V6.95975H6.78455Z" fill="white" stroke="white" />
    </svg>
  );
  const emailIcon = (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M1.43472 4.2013C1.57894 3.72853 2.01857 3.38461 2.53853 3.38461H15.4615C15.9815 3.38461 16.4211 3.72853 16.5654 4.2013L9.00004 9.24484L1.43472 4.2013ZM0.000104559 4.52577C-2.37238e-05 4.53316 -3.38579e-05 4.54054 7.35679e-05 4.54792V13.7692C7.35679e-05 15.1711 1.13658 16.3076 2.53853 16.3076H15.4615C16.8635 16.3076 18 15.1711 18 13.7692V4.54791M16.6154 5.83203V13.7692C16.6154 14.4064 16.0988 14.923 15.4615 14.923H2.53853C1.90128 14.923 1.38468 14.4064 1.38468 13.7692V5.83203L8.61602 10.6529C8.84856 10.808 9.15151 10.808 9.38406 10.6529L16.6154 5.83203ZM18 4.52578C17.9931 3.12966 16.8593 2 15.4615 2H2.53853C1.14081 2 0.00693151 3.12966 0.000104559 4.52577" fill="white" />
    </svg>
  );

  return (
    <div className={styles.container}>
      <div className={styles.topText}>
        <h2>Our team of professionals</h2>
        <p>
          Our mission is to become an extension of your
          team so we can help your business grow — all
          while costing you less than a single full-time
          designer.
          {' '}
        </p>
      </div>
      <div className={styles.cardsContainer}>
        <div className={styles.employeeCard}>
          <img src={headshot1} alt="Employee headshot" />
          <div className={styles.cardText}>
            <h3>Scott Beer</h3>
            <p>Project Manager</p>
            <p>
              There are many variations of passages
              of lorem ipsum available
            </p>
          </div>
          <div className={styles.socialIcons}>
            <a href="TOBEFILLEDIN">
              {xIcon}
            </a>
            {' '}
            <a href="TOBEFILLEDIN">
              {linkedInIcon}
            </a>
            {' '}
            <a href="TOBEFILLEDIN">
              {facebookIcon}
            </a>
            {' '}
            <a href="TOBEFILLEDIN">
              {emailIcon}
            </a>
            {' '}
          </div>
        </div>
        <div className={styles.employeeCard}>
          <img src={headshot2} alt="Employee headshot" />
          <div className={styles.cardText}>
            <h3>Scott Beer</h3>
            <p>Project Manager</p>
            <p>
              There are many variations of passages
              of lorem ipsum available
            </p>
          </div>
          <div className={styles.socialIcons}>
            <a href="TOBEFILLEDIN">
              {xIcon}
            </a>
            {' '}
            <a href="TOBEFILLEDIN">
              {linkedInIcon}
            </a>
            {' '}
            <a href="TOBEFILLEDIN">
              {facebookIcon}
            </a>
            {' '}
            <a href="TOBEFILLEDIN">
              {emailIcon}
            </a>
            {' '}
          </div>
        </div>
        <div className={styles.employeeCard}>
          <img src={headshot3} alt="Employee headshot" />
          <div className={styles.cardText}>
            <h3>Scott Beer</h3>
            <p>Project Manager</p>
            <p>
              There are many variations of passages
              of lorem ipsum available
            </p>
          </div>
          <div className={styles.socialIcons}>
            <a href="TOBEFILLEDIN">
              {xIcon}
            </a>
            {' '}
            <a href="TOBEFILLEDIN">
              {linkedInIcon}
            </a>
            {' '}
            <a href="TOBEFILLEDIN">
              {facebookIcon}
            </a>
            {' '}
            <a href="TOBEFILLEDIN">
              {emailIcon}
            </a>
            {' '}
          </div>
        </div>
        <div className={styles.employeeCard}>
          <img src={headshot1} alt="Employee headshot" />
          <div className={styles.cardText}>
            <h3>Scott Beer</h3>
            <p>Project Manager</p>
            <p>
              There are many variations of passages
              of lorem ipsum available
            </p>
          </div>
          <div className={styles.socialIcons}>
            <a href="TOBEFILLEDIN">
              {xIcon}
            </a>
            {' '}
            <a href="TOBEFILLEDIN">
              {linkedInIcon}
            </a>
            {' '}
            <a href="TOBEFILLEDIN">
              {facebookIcon}
            </a>
            {' '}
            <a href="TOBEFILLEDIN">
              {emailIcon}
            </a>
            {' '}
          </div>
        </div>
        <div className={styles.employeeCard}>
          <img src={headshot2} alt="Employee headshot" />
          <div className={styles.cardText}>
            <h3>Scott Beer</h3>
            <p>Project Manager</p>
            <p>
              There are many variations of passages
              of lorem ipsum available
            </p>
          </div>
          <div className={styles.socialIcons}>
            <a href="TOBEFILLEDIN">
              {xIcon}
            </a>
            {' '}
            <a href="TOBEFILLEDIN">
              {linkedInIcon}
            </a>
            {' '}
            <a href="TOBEFILLEDIN">
              {facebookIcon}
            </a>
            {' '}
            <a href="TOBEFILLEDIN">
              {emailIcon}
            </a>
            {' '}
          </div>
        </div>
        <div className={styles.employeeCard}>
          <img src={headshot3} alt="Employee headshot" />
          <div className={styles.cardText}>
            <h3>Scott Beer</h3>
            <p>Project Manager</p>
            <p>
              There are many variations of passages
              of lorem ipsum available
            </p>
          </div>
          <div className={styles.socialIcons}>
            <a href="TOBEFILLEDIN">
              {xIcon}
            </a>
            {' '}
            <a href="TOBEFILLEDIN">
              {linkedInIcon}
            </a>
            {' '}
            <a href="TOBEFILLEDIN">
              {facebookIcon}
            </a>
            {' '}
            <a href="TOBEFILLEDIN">
              {emailIcon}
            </a>
            {' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamFullList;
