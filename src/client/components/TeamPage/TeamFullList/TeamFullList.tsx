import React from 'react';
import styles from './TeamFullList.scss';
import headshot1 from './Headshot1.jpg';
import headshot2 from './Headshot2.png';
import headshot3 from './Headshot3.png';

const SocialMediaIcons = () => {
  const icons = [
    {
      id: 'x',
      svg: (
        // Previous xIcon SVG contents go here
      ),
    },
    // ... Other icons
  ];

  return (
    <div className={styles.socialIcons}>
      {icons.map((icon) => (
        <a key={icon.id} href="TOBEFILLEDIN">
          {icon.svg}
        </a>
      ))}
    </div>
  );
};

const TeamFullList: React.FunctionComponent = () => {
  const employeeInfo = [
    {
      headshot: headshot1,
      name: "Scott Beer",
      role: "Project Manager",
      description: "There are many variations of passages of lorem ipsum available"
      // Other employee details if necessary
    },
    // Repeat for each employee
  ];

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
        {employeeInfo.map((employee, index) => (
          <div key={index} className={styles.employeeCard}>
            <img src={employee.headshot} alt="Employee headshot" />
            <div className={styles.cardText}>
              <h3>{employee.name}</h3>
              <p>{employee.role}</p>
              <p>{employee.description}</p>
            </div>
            <SocialMediaIcons />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamFullList;
