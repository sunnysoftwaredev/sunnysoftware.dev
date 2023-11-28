import type { FunctionComponent } from 'react';
import React, { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';
import Button, { ButtonIcon, ButtonSize, ButtonVariant } from '../Button/Button';
import useIsMobileWidth from '../../hooks/useIsMobileWidth';
import styles from './EmployeeCardStack.scss';
import headshot from './EmployeeCardHeadshot.png';

const EmployeeCardStack: FunctionComponent = () => {
  const [index, setIndex] = useState(0);
  const isMobileWidth = useIsMobileWidth();
  const widthDivider = isMobileWidth ? 2 : 1;

  const backgroundSvg = (
    <svg width="733" height="688" viewBox="0 0 733 688" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.58" filter="url(#filter0_f_10_289)">
        <path fillRule="evenodd" clipRule="evenodd" d="M357.312 84.1564C427.073 82.0527 496.16 101.069 548.637 147.065C604.725 196.225 641.23 264.001 647.297 338.322C653.903 419.255 643.1 509.34 582.635 563.564C523.826 616.304 436.075 604.574 357.312 598.376C286.838 592.831 216.064 579.426 164.871 530.693C112.502 480.84 81.7396 410.573 84.1298 338.322C86.4518 268.131 125.765 206.113 177.192 158.266C226.599 112.298 289.847 86.1909 357.312 84.1564Z" fill="url(#paint0_linear_10_289)" />
      </g>
      <defs>
        <filter id="filter0_f_10_289" x="0" y="0" width="733" height="688" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="42" result="effect1_foregroundBlur_10_289" />
        </filter>
        <linearGradient id="paint0_linear_10_289" x1="84" y1="84" x2="603.384" y2="648.331" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F3AA1F" />
          <stop offset="1" stopColor="#FED323" />
        </linearGradient>
      </defs>
    </svg>
  );
  const cards = useMemo(() => [
    { picture: { headshot }, name: 'Hannah Schmitt-1', title: 'Lead designer', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio neque incidunt error omnis facilis, quia delectus velit, ea iste reprehenderit ratione voluptate minima, id impedit. Labore quo sed ipsum soluta repellat non perspiciatis impedit recusandae numquam minima, suscipit reiciendis eligendi, quis, et cumque voluptate eum dicta. Et officiis praesentium animi!' },
    { picture: { headshot }, name: 'Hannah Schmitt-2', title: 'Lead designer', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio neque incidunt error omnis facilis, quia delectus velit, ea iste reprehenderit ratione voluptate minima, id impedit. Labore quo sed ipsum soluta repellat non perspiciatis impedit recusandae numquam minima, suscipit reiciendis eligendi, quis, et cumque voluptate eum dicta. Et officiis praesentium animi!' },
    { picture: { headshot }, name: 'Hannah Schmitt-3', title: 'Lead designer', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio neque incidunt error omnis facilis, quia delectus velit, ea iste reprehenderit ratione voluptate minima, id impedit. Labore quo sed ipsum soluta repellat non perspiciatis impedit recusandae numquam minima, suscipit reiciendis eligendi, quis, et cumque voluptate eum dicta. Et officiis praesentium animi!' },
  ], []);
  const handleLeftClick = useCallback(() => {
    setIndex((index - 1) % cards.length);
  }, [cards, index]);
  const handleRightClick = useCallback(() => {
    setIndex((index + 1) % cards.length);
  }, [cards, index]);

  return (
    <div className={styles.employeeCardStackContainer}>
      <div className={styles.backgroundSvg}>
        {backgroundSvg}
      </div>
      <div className={styles.employeeCardStack}>
        <div className={styles.buttonIndex}>
          <Button
            size={ButtonSize.Large} variant={ButtonVariant.Outlined}
            iconType={ButtonIcon.LeftArrow} onClick={handleLeftClick}
          />
        </div>
        {cards.map((card, i) => (
          <div
            style={{ width: `${(600 + (i * 30)) / widthDivider}px `, zIndex: 0 - i }}
            className={classNames(styles.employeeCard, {
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
        <div className={styles.buttonIndex}>
          <Button
            size={ButtonSize.Large} variant={ButtonVariant.Outlined}
            iconType={ButtonIcon.RightArrow} onClick={handleRightClick}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeCardStack;
