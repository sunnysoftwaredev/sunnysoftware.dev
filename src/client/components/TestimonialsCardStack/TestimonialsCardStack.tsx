import type { FunctionComponent } from 'react';
import React, { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';
import Button, { ButtonIcon, ButtonSize, ButtonVariant } from '../Button/Button';
import useIsMobileWidth from '../../hooks/useIsMobileWidth';
import styles from './TestimonialsCardStack.scss';
import headshot from './TestimonialsCardHeadshot.png';

const TestimonialsCardStack: FunctionComponent = () => {
  const [index, setIndex] = useState(0);
  const isMobileWidth = useIsMobileWidth();
  const widthDivider = isMobileWidth ? 2 : 1;

  const backgroundSvg = (
    <svg width="733" height="688" viewBox="0 0 733 688" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* SVG content omitted for brevity */}
    </svg>
  );
  const cards = useMemo(() => [
    {/* cards data omitted for brevity */}
  ], []);
  const handleLeftClick = useCallback(() => {
    setIndex((index - 1 + cards.length) % cards.length);
  }, [cards.length, index]);
  const handleRightClick = useCallback(() => {
    setIndex((index + 1) % cards.length);
  }, [cards.length, index]);

  return (
    <div className={styles.testimonialsCardStackContainer}>
      <div className={styles.backgroundSvg}>
        {backgroundSvg}
      </div>
      <div className={styles.testimonialsCardStack}>
        {cards.map((card, i) => (
          <div
            style={{ width: `${(600 + (i * 30)) / widthDivider}px `, zIndex: 0 - i }}
            className={classNames(styles.testimonialCard, {
              [styles.topCard]: i === Math.abs(index),
            })} key={`${card.name}`}
          >
            <img src={card.picture.headshot} alt="employee picture" />
            <h2>{card.name}</h2>
            <h6>{card.title}</h6>
            <p>
              {card.text}
            </p>
          </div>
        ))}
        <div className={styles.buttonContainer}>
          <Button
            size={ButtonSize.Large} variant={ButtonVariant.Outlined}
            iconType={ButtonIcon.LeftArrow} onClick={handleLeftClick}
          />
          <Button
            size={ButtonSize.Large} variant={ButtonVariant.Outlined}
            iconType={ButtonIcon.RightArrow} onClick={handleRightClick}
          />
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCardStack;
