import type { FunctionComponent } from 'react';
import React from 'react';

const TabItem: FunctionComponent = ({ id, title, activeTab, setActiveTab }) => {
  const handleClick = () => {
    setActiveTab(id);
  };

  return (
    <li onClick={handleClick} className={activeTab === id ? 'active' : ''}>
      { title }
    </li>
  );
};
export default TabItem;
