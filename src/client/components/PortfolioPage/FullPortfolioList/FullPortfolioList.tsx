import type { FunctionComponent } from 'react';
import React from 'react';
import Button, { ButtonSize, ButtonVariant } from '../../Button/Button';
import styles from './FullPortfolioList.scss';
import projectImage from './projectImage.png';

interface PortfolioCardProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

const PortfolioCard: FunctionComponent<PortfolioCardProps> = ({ title, description, image, imageAlt }) => (
  <div className={styles.projectContainer}>
    <div className={styles.projectText}>
      <h3>{title}</h3>
      <p>{description}</p>
      <Button
        size={ButtonSize.Large}
        variant={ButtonVariant.Outlined}
        to="/contact-us"
      >
        See more
      </Button>
    </div>
    <img src={image} alt={imageAlt} />
  </div>
);

const FullPortfolioList: FunctionComponent = () => {
  const projectsList = [
    {
      title: 'Project 1',
      description: 'Manage, edit, and sync product information across all your ...',
      image: projectImage,
      imageAlt: 'picture of sunny software project',
    },
    // Add more projects here
  ];

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
        {projectsList.map((project, index) => (
          <PortfolioCard
            key={index}
            title={project.title}
            description={project.description}
            image={project.image}
            imageAlt={project.imageAlt}
          />
        ))}
      </div>
    </div>
  );
};

export default FullPortfolioList;
