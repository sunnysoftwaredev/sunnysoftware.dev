import type { FunctionComponent } from 'react';
import React from 'react';
import Button, { ButtonSize, ButtonVariant } from '../../Button/Button';
import styles from './FullPortfolioList.scss';
import projectImage from './projectImage.png';

type ProjectCardProps = {
  projectName: string;
  projectDescription: string;
};

const ProjectCard: FunctionComponent<ProjectCardProps> = ({ projectName, projectDescription }) => (
  <div className={styles.projectContainer}>
    <div className={styles.projectText}>
      <h3>{projectName}</h3>
      <p>
        {projectDescription}
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
);

const FullPortfolioList: FunctionComponent = () => {
  const projectDescription = 'Manage, edit, and sync productinformation across all your . nc productinformation across all your .Manage, edit, and sync productinformation across all your .';

  return (
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
        <ProjectCard projectName="Project 1" projectDescription={projectDescription} />
        <ProjectCard projectName="Project 2" projectDescription={projectDescription} />
        <ProjectCard projectName="Project 3" projectDescription={projectDescription} />
        <ProjectCard projectName="Project 4" projectDescription={projectDescription} />
      </div>
    </div>
  );
};

export default FullPortfolioList;