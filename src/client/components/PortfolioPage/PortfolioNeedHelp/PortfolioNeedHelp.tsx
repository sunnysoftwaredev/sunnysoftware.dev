import type { FunctionComponent } from 'react';
import React from 'react';
import Button, { ButtonSize, ButtonVariant } from '../../Button/Button';
import styles from './PortfolioNeedHelp.scss';

interface ContentProps {
  header: string;
  paragraph: string;
  button: string;
}

const PortfolioNeedHelp: FunctionComponent<ContentProps> = ({ header, paragraph, button }) => (
  <div className={styles.container}>
    <div className={styles.text}>
      <h2>{header}</h2>
      <p>{paragraph}</p>
    </div>
    <Button size={ButtonSize.Large} variant={ButtonVariant.Outlined} to="./contact-us">
      {button}
    </Button>
  </div>
);

export default PortfolioNeedHelp;
