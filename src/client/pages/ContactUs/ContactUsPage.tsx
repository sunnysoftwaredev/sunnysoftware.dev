import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import ContactForm from '../../components/ContactForm/ContactForm';
import styles from './ContactUsPage.scss';

const ContactUsPage: FunctionComponent = () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Contact Us-Sunny Software</title>
      <link rel="canonical" href="https://sunnysoftware.dev/contact-us" />
      <meta
        name="description"
        content="Contact information page for Sunny Software LLC"
      />
    </Helmet>
    <h1>Contact Us </h1>
    <div className={styles.contactInfoContainer}>
      <h3>Trevin Hoffman - CEO and Lead Engineer</h3>
      <p>trevinhofmann@gmail.com</p>
      <p>
        (715) 350-9696
      </p>
    </div>
    <ContactForm />
  </div>
);

export default ContactUsPage;
