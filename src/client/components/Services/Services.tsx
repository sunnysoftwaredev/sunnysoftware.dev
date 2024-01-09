import React from 'react';
import Button, { ButtonSize, ButtonVariant } from '../Button/Button';
import styles from './Services.scss';

const ServiceImage = ({ src, className, alt }) => (
  <img src={src} className={className} alt={alt} />
);

const ServiceCard = ({ title, description, images, imageClassNames }) => (
  <div className={styles.serviceCard}>
    <h2>{title}</h2>
    <p>{description}</p>
    <Button
      size={ButtonSize.Large}
      variant={ButtonVariant.Outlined}
      to="/contact-us"
    >
      Explore more
    </Button>
    {images.map((img, index) => (
      <ServiceImage key={img} src={img} className={imageClassNames[index]} alt="card image" />
    ))}
  </div>
);

const Services = () => {
  const webImages = [require('./webDevelopmentCardImage1.jpg'), require('./webDevelopmentCardImage2.jpg')];
  const mobileImages = [
    require('./mobileStickupImage.jpg'),
    require('./mobileWelcomeBackEmptyImage.jpg'),
    require('./mobileEmptySignupImage.jpg'),
    require('./mobileSignupFilledImage.jpg'),
    require('./mobileExpenseGraphImage.jpg'),
    require('./mobileQrCodeImage.jpg')
  ];
  const cryptoImages = [require('./cyrptoImage1.jpg'), require('./cyrptoImage2.jpg')];
  const imageClassNames = [styles.webImg1, styles.webImg2]; // Names could be adjusted based on the specific styles for each card type
  const webCardDescription = `
    Lorem ipsum dolor sit amet consectetur
    adipisicing elit. Adipisci deserunt est
    ullam ipsa voluptates mollitia? Lorem,
    ipsum dolor sit amet consectetur adipisicing elit. Corrupti, aut?
  `;
  const mobileCardDescription = webCardDescription; // Replace with actual description if different
  const cryptoCardDescription = webCardDescription; // Replace with actual description if different

  return (
    <div className={styles.servicesContainer}>
      <ServiceCard
        title="Web Development"
        description={webCardDescription}
        images={webImages}
        imageClassNames={imageClassNames}
      />
      <ServiceCard
        title="Mobile development"
        description={mobileCardDescription}
        images={mobileImages}
        imageClassNames={imageClassNames}
      />
      <ServiceCard
        title="Crypto Contracts"
        description={cryptoCardDescription}
        images={cryptoImages}
        imageClassNames={imageClassNames}
      />
    </div>
  );
};

export default Services;
