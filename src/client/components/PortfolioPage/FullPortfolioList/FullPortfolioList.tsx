import type { FunctionComponent } from 'react';
import React from 'react';
import Button, { ButtonSize, ButtonVariant } from '../../Button/Button';
import styles from './FullPortfolioList.scss';
import projectImage from './projectImage.png';

const FullPortfolioList: FunctionComponent = () => (
  <div className={styles.container}>
    <div className={styles.text}>
      <h2>What we provide you?</h2>
      <p>
        Our mission is to become an extension
        of your team so we can help your business
        grow — all while costing you less than a
        single full-time designer.
      </p>
    </div>
    <div className={styles.portfolioCardsContainer}>
      <div className={styles.projectContainer1}>
        <div className={styles.projectOneText}>
          <h3>Project 1</h3>
          <p>
            Manage, edit, and sync productinformation across
            all your . nc productinformation across all your .
            Manage, edit, and sync productinformation across
            all your Manage, edit, and sync productinformation
            across all your . nc productinformation across all
            your .Manage, edit, and sync productinformation across all your .
          </p>
          <Button
            size={ButtonSize.Large}
            variant={ButtonVariant.Outlined}
            to="/contact-us"
          >
            See more
          </Button>
        </div>
        <img src={projectImage} alt="picture of sunny software project" />
      </div>
      <div className={styles.projectContainer2}>
        <div className={styles.projectTwoText}>
          <h3>Project 1</h3>
          <p>
            Manage, edit, and sync productinformation across all your
            . nc productinformation across all your .Manage, edit, an
            d sync productinformation across all your Manage, edit,
            and sync productinformation across all your . nc product
            information across all your .Manage, edit, and sync
            productinformation across all your .
          </p>
          <Button
            size={ButtonSize.Large}
            variant={ButtonVariant.Outlined}
            to="/contact-us"
          >
            See more
          </Button>
        </div>
        <img src={projectImage} alt="picture of sunny software project" />
      </div>
      <div className={styles.projectContainer1}>
        <div className={styles.projectOneText}>
          <h3>Project 1</h3>
          <p>
            Manage, edit, and sync productinformation across all your
            . nc productinformation across all your .Manage, edit,
            and sync productinformation across all your Manage, edit,
            and sync productinformation across all your . nc product
            information across all your .Manage, edit, and sync prod
            uctinformation across all your .
          </p>
          <Button
            size={ButtonSize.Large}
            variant={ButtonVariant.Outlined}
            to="/contact-us"
          >
            See more
          </Button>
        </div>
        <img src={projectImage} alt="picture of sunny software project" />
      </div>
      <div className={styles.projectContainer2}>
        <div className={styles.projectTwoText}>
          <h3>Project 1</h3>
          <p>
            Manage, edit, and sync productinformation across all your
            . nc productinformation across all your .Manage, edit,
            and sync productinformation across all your Manage, edit,
            and sync productinformation across all your . nc
            productinformation across all your .Manage, edit,
            and sync productinformation across all your .
          </p>
          <Button
            size={ButtonSize.Large}
            variant={ButtonVariant.Outlined}
            to="/contact-us"
          >
            See more
          </Button>
        </div>
        <img src={projectImage} alt="picture of sunny software project" />
      </div>

    </div>
  </div>
);

export default FullPortfolioList;
