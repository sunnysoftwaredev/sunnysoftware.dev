import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import ContactForm from '../../components/ContactForm/ContactForm';
import styles from './ContactUsPage.scss';

const PageMetaData: FunctionComponent = () => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>Contact Us-Sunny Software</title>
    <link rel="canonical" href="https://sunnysoftware.dev/contact-us" />
    <meta name="description" content="Contact information page for Sunny Software LLC" />
  </Helmet>
);

const ContactInfoContent: FunctionComponent = () => (
  <div className={styles.textContainer}>
    <h2>Contact us</h2>
    <div className={styles.contactInfoSection}>
      <h3>Email:</h3>
      <p>trevinhofmann@gmail.com</p>
    </div>
    <div className={styles.contactInfoSection}>
      <h3>Phone:</h3>
      <p>(715) 350-9696</p>
    </div>
    <div className={styles.contactInfoSection}>
      <h3>Office address</h3>
      <p>Chicago HQ Estica Cop. Macomb, MI 48042</p>
    </div>
  </div>
);

const ContactUsPage: FunctionComponent = () => (
  <div className={styles.container}>
    <PageMetaData />
    <ContactInfoContent />
    <ContactForm />
  </div>
);

export default ContactUsPage;
