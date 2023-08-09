import React from "react";
import type { FunctionComponent } from "react";
import { Helmet } from "react-helmet";

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
    <p>Here you will find email, phone, and contact form</p>
  </div>
);

export default ContactUsPage;
