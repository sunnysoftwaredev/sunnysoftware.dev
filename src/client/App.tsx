import React from 'react';
import { Routes, Route } from "react-router-dom";
import "./App.scss";

//Import Pages
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ContactUsPage from "./pages/ContactUs/ContactUsPage";
import GetStartedPage from "./pages/GetStartedPage/GetStartedPage";
import ClientPortalPage from "./pages/ClientPortalPage/ClientPortalPage";
import WorkPortalPage from "./pages/WorkPortalPage/WorkPortalPage";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import ServicesPage from "./pages/ServicesPage/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage/PortfolioPage";

//Components
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="contact-us" element={<ContactUsPage />} />
        <Route path="get-started" element={<GetStartedPage />} />
        <Route path="portal" element={<ClientPortalPage />} />
        {/* Separating two types of portal pages for now  */}
        <Route path="work-portal" element={<WorkPortalPage />} />
        <Route path="about-us" element={<AboutUsPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
