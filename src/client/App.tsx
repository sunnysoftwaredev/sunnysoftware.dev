import React from 'react';
import type { FunctionComponent } from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeePrivateRoute from './components/PrivateRoutes/EmployeePrivateRoute';
import ClientPrivateRoute from './components/PrivateRoutes/ClientPrivateRoute';
import AdminPrivateRoute from './components/PrivateRoutes/AdminPrivateRoute';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ContactUsPage from './pages/ContactUs/ContactUsPage';
import GetStartedPage from './pages/GetStartedPage/GetStartedPage';
import ClientPortalPage from './pages/ClientPortalPage/ClientPortalPage';
import AdminPortalPage from './pages/AdminPortal/AdminPortalPage';
import WorkPortalPage from './pages/WorkPortalPage/WorkPortalPage';
import AboutUsPage from './pages/AboutUsPage/AboutUsPage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import PortfolioPage from './pages/PortfolioPage/PortfolioPage';
import TeamPage from './pages/TeamPage/TeamPage';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import './App.scss';
import MethodologyPage from './pages/MethodologyPage/MethodologyPage';
import FAQPage from './pages/FAQPage/FAQPage';
import TestimonialsPage from './pages/TestimonialsPage/TestimonialsPage';
import CareersPage from './pages/CareersPage/CareersPage';
import ResourcesPage from './pages/ResourcesPage/ResourcesPage';
import ShowNavBar from './components/ShowNavBar/ShowNavBar';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';

interface RouteInfo {
  path: string;
  element: JSX.Element;
  wrapper?: (children: JSX.Element) => JSX.Element;
}

const routeConfig: RouteInfo[] = [
  { path: "/", element: <LandingPage /> },
  { path: "login", element: <LoginPage /> },
  { path: "login/forgot-password", element: <ForgotPasswordPage /> },
  { path: "login/reset-password", element: <ResetPasswordPage /> },
  { path: "contact-us", element: <ContactUsPage /> },
  { path: "get-started", element: <GetStartedPage /> },
  { path: "portal", element: <ClientPortalPage />, wrapper: ClientPrivateRoute },
  { path: "admin-portal", element: <AdminPortalPage />, wrapper: AdminPrivateRoute },
  { path: "work-portal", element: <WorkPortalPage />, wrapper: EmployeePrivateRoute },
  { path: "about-us", element: <AboutUsPage /> },
  { path: "services", element: <ServicesPage /> },
  { path: "portfolio", element: <PortfolioPage /> },
  { path: "team", element: <TeamPage /> },
  { path: "methodology", element: <MethodologyPage /> },
  { path: "faq", element: <FAQPage /> },
  { path: "testimonials", element: <TestimonialsPage /> },
  { path: "careers", element: <CareersPage /> },
  { path: "resources", element: <ResourcesPage /> },
  { path: "*", element: <b>404 That page does not exist!</b> }
];

const renderRoute = (route: RouteInfo) => {
  const { path, element, wrapper } = route;
  return (
    <Route
      key={path}
      path={path}
      element={wrapper ? wrapper(element) : element}
    />
  );
};

const App: FunctionComponent = () => (
  <div>
    <ShowNavBar>
      <NavBar />
    </ShowNavBar>
    <Routes>
      {routeConfig.map(renderRoute)}
    </Routes>
    <Footer />
  </div>
);

export default App;
