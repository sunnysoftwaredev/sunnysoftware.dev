import type { FunctionComponent } from 'react';
import React, { useState } from 'react';
import TabItem from './TabItem/TabItem';
import styles from './TabMenu.scss';

const TabMenu: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div className={styles.tabs}>
      <ul className={styles.nav}>
        <TabItem title="Tab 1" id="tab1" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabItem title="Tab 2" id="tab2" activeTab={activeTab} setActiveTab={setActiveTab} />
      </ul>
    </div>
  );
};

export default TabMenu;

