import React from 'react';
import type { FunctionComponent } from 'react';
import './Services.scss';

const Services: FunctionComponent = () => (
  <div className="servicesContainer">
    <div className="servicesPanel">
      <h3>Web Sites & Web Apps</h3>
      <div className="divider" />
      <div className="picPlaceholder" />
      <p>
        Custom functionality and styling, with optimization for search to get
        you the page you want
      </p>
    </div>
    <div className="servicesPanel">
      <h3>Mobile Apps</h3>
      <div className="divider" />
      <div className="picPlaceholder" />
      <p>
        With more and more market share going to smartphones, having a
        dedicated mobile app built by professionals pays off
      </p>
    </div>
    <div className="servicesPanel">
      <h3>Desktop Apps</h3>
      <div className="divider" />
      <div className="picPlaceholder" />
      <p>
        Many people switch back and forth between mobile and desktop, and we
        have all of your bases covered
      </p>
    </div>
    <div className="servicesPanel">
      <h3>Blockchain Solutions</h3>
      <div className="divider" />
      <div className="picPlaceholder" />
      <p>
        Take advantage of emerging technology to ensure the integrity and
        security of your products and data
      </p>
    </div>
  </div>
);

export default Services;
