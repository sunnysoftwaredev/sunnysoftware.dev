import React from 'react';
import type { FunctionComponent } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ContactUsPage from './pages/ContactUs/ContactUsPage';
import GetStartedPage from './pages/GetStartedPage/GetStartedPage';
import ClientPortalPage from './pages/ClientPortalPage/ClientPortalPage';
import WorkPortalPage from './pages/WorkPortalPage/WorkPortalPage';
import AboutUsPage from './pages/AboutUsPage/AboutUsPage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import PortfolioPage from './pages/PortfolioPage/PortfolioPage';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import './App.scss';

const App: FunctionComponent = () => (
  <div>
    <NavBar />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="contact-us" element={<ContactUsPage />} />
      <Route path="get-started" element={<GetStartedPage />} />
      <Route path="portal" element={<ClientPortalPage />} />
      {/* Separating two types of portal pages for now  */}
      <Route path="work-portal" element={<WorkPortalPage />} />
      <Route path="about-us" element={<AboutUsPage />} />
      <Route path="services" element={<ServicesPage />} />
      <Route path="portfolio" element={<PortfolioPage />} />
      <Route path="*" element={<b>404 That page does not exist!</b>} />
    </Routes>
    <Footer />
  </div>
);

export default App;
