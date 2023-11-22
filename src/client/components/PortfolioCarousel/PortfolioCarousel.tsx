import type { FunctionComponent } from 'react';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button, { ButtonIcon, ButtonSize, ButtonVariant } from '../Button/Button';
import logger from '../../../server/logger';
import styles from './PortfolioCarousel.scss';
import projectImage from './projectImage.png';

const PortfolioCarousel: FunctionComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();
  const numProjects = 2;

  const handleClick = useCallback((): void => {
    try {
      navigate('/portfolio');
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [navigate]);

  // button functions
  const next = useCallback(() => {
    if (currentIndex < numProjects - 1) {
      setCurrentIndex(prevState => prevState + 1);
    }
  }, [currentIndex]);

  const prev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
  }, [currentIndex]);

  return (
    <div className={styles.portfolioCarouselContainer}>
      <div className={styles.portfolioCarouselTop}>
        <div className={styles.portfolioCarouselText}>
          <h2>Portfolio</h2>
          <p>
            Our mission is to become an extension of your team so we can help
            your business grow -- all while costing you less than a single full-
            time designer.
          </p>
        </div>
        <div className={styles.porfolioCarouselButtons}>
          <Button
            size={ButtonSize.Small} iconType={ButtonIcon.LeftArrow}
            onClick={prev}
          />
          <Button
            size={ButtonSize.Small} iconType={ButtonIcon.RightArrow}
            onClick={next}
          />
        </div>
      </div>
      <div
        className={styles.portfolioScrollContainer}
      >
        <div
          className={styles.portfolioProjectCard}
          style={{ transform: `translateX(-${currentIndex * 95}%)` }}
        >
          <div className={styles.portfolioCard1}>
            <h3>Project 1</h3>
            <p>Manage, edit, and sync product information across all your</p>
            <Button
              size={ButtonSize.Large} variant={ButtonVariant.Outlined}
              onClick={handleClick}
            >
              See more
            </Button>
          </div>
          <img src={projectImage} alt="picture of sunny software project" />

        </div>
        <div
          className={styles.portfolioProjectCard}
          style={{ transform: `translateX(-${currentIndex * 95}%)` }}
        >
          <div className={styles.portfolioCard2}>
            <h3>Project 2</h3>
            <p>Manage, edit, and sync product information across all your</p>
            <Button
              size={ButtonSize.Large} variant={ButtonVariant.Outlined}
              onClick={handleClick}
            >
              See more
            </Button>
          </div>
          <img src={projectImage} alt="picture of sunny software project" />
        </div>
      </div>
    </div>
  );
};

export default PortfolioCarousel;
