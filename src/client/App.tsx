import React from 'react';
import type { FunctionComponent } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import EmployeePrivateRoute from './components/PrivateRoutes/EmployeePrivateRoute';
import ClientPrivateRoute from './components/PrivateRoutes/ClientPrivateRoute';
import AdminPrivateRoute from './components/PrivateRoutes/AdminPrivateRoute';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ContactUsPage from './pages/ContactUs/ContactUsPage';
import GetStartedPage from './pages/GetStartedPage/GetStartedPage';
import ClientPortalPage from './pages/ClientPortalPage/ClientPortalPage';
import AdminPortalEmployeesPage from './pages/AdminPortalPages/AdminPortalEmployeesPage';
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
import ShowNavBar from './components/ShowNavs/ShowNavBar';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';
import store from './redux/store';
import AdminPortalProjectsPage from './pages/AdminPortalPages/AdminPortalProjectsPage';
import AdminProjectDetailsPage from './pages/AdminPortalPages/AdminProjectDetailsPage';

const App: FunctionComponent = () => (
  <Provider store={store}>
    <ShowNavBar>
      <NavBar />
    </ShowNavBar>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="login/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="login/reset-password" element={<ResetPasswordPage />} />
      <Route path="contact-us" element={<ContactUsPage />} />
      <Route path="get-started" element={<GetStartedPage />} />
      <Route
        path="portal" element={(
          <ClientPrivateRoute>
            <ClientPortalPage />
          </ClientPrivateRoute>
        )}
      />
      <Route
        path="admin-portal-employees" element={(
          <AdminPrivateRoute>
            <AdminPortalEmployeesPage />
          </AdminPrivateRoute>
        )}
      />
      <Route
        path="admin-portal-projects" element={(
          <AdminPrivateRoute>
            <AdminPortalProjectsPage />
          </AdminPrivateRoute>
        )}
      />
      <Route
        path="/admin-portal/project/:projectId" element={(
          <AdminPrivateRoute>
            <AdminProjectDetailsPage />
          </AdminPrivateRoute>
        )}
      />
      <Route
        path="employee-portal" element={(
          <EmployeePrivateRoute>
            <WorkPortalPage />
          </EmployeePrivateRoute>
        )}
      />
      <Route path="about-us" element={<AboutUsPage />} />
      <Route path="services" element={<ServicesPage />} />
      <Route path="portfolio" element={<PortfolioPage />} />
      <Route path="team" element={<TeamPage />} />
      <Route path="methodology" element={<MethodologyPage />} />
      <Route path="faq" element={<FAQPage />} />
      <Route path="testimonials" element={<TestimonialsPage />} />
      <Route path="careers" element={<CareersPage />} />
      <Route path="resources" element={<ResourcesPage />} />
      <Route path="*" element={<b>404 That page does not exist!</b>} />
    </Routes>
    <Footer />
  </Provider>
);

export default App;
