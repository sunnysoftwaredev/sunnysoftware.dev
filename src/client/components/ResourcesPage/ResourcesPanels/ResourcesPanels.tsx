import type { FunctionComponent } from 'react';
import React from 'react';
import Button, { ButtonSize } from '../../Button/Button';
import styles from './ResourcesPanels.scss';

type PanelProps = {
  title: string;
  children: React.ReactNode;
};

const Panel: FunctionComponent<PanelProps> = ({ title, children }) => (
  <div className={styles.panel}>
    <div className={styles.panelText}>
      <h2>{title}</h2>
      <p>
        {children}
        {' '}
      </p>
    </div>
    <div className={styles.buttonContainer}>
      <Button to="/" size={ButtonSize.Large}>See Docs</Button>
    </div>
  </div>
);

const ResourcesPanels: FunctionComponent = () => (
  <div className={styles.container}>
    <Panel title="PDFs">
      Our mission is to become an extension of your team so we can help your business
      grow — all while costing you less than a single full-time designer. Our mission is
      to become an extension of your team so we can help your business grow — all while
      costing you less than a single full-time designer.
    </Panel>
    <Panel title="Blog articles">
      Our mission is to become an extension of your team so we can help your business
      grow — all while costing you less than a single full-time designer. Our mission is
      to become an extension of your team so we can help your business grow — all while
      costing you less than a single full-time designer.
    </Panel>
    <Panel title="Educational docs">
      Our mission is to become an extension of your team so we can help your business
      grow — all while costing you less than a single full-time designer. Our mission is
      to become an extension of your team so we can help your business grow — all while
      costing you less than a single full-time designer.
    </Panel>
  </div>
);

export default ResourcesPanels;
