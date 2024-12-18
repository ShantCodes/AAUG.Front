import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Navbar from './_components/navbar';
import LoginPage from './page/auth/LoginPage';
import SignupForm from './_components/loginComponents/SignupForm';
import EventInsert from './_components/eventComponents/EventInsert';
import NavMenu from './_components/NavMenu';
import MainPage from './page/Events/_components/EventsPage';
import AdminPage from './page/admin/AdminPage';
import NewsCard from './_components/newsComponents/NewsCard';
import ProfilePage from './page/profile/ProfilePage';
import SubscribePage from './page/profile/SubscribePage';
import ExpandProfileForAdmins from './_components/userComponents/ExpandProfileForAdmins';
import EditProfileForm from './_components/userComponents/EditProfileForm';
import SlideSelectionPage from './page/admin/SlideSelectionPage';
import SlideSelection from './_components/slideShowComponents/SlideSelection';
import NewsDetails from './_components/newsComponents/NewsDatails';
import { SearchProvider } from './untils/SearchContext';
import AddNews from './_components/newsComponents/AddNews';
import AboutUs from './page/aboutUs/AboutUs';
import ForgotPassword from './_components/loginComponents/ForgotPassword';
import MobileNavMenu from './_components/MobileNavMenu';
import { Workbox } from 'workbox-window';
import NotificationComponent from './_components/NotificationComponent';

const NewsPage = () => <div>News Page</div>;

function App() {
  const location = useLocation();
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  // useEffect(() => {
  //   if (Notification.permission === 'default') {
  //     Notification.requestPermission().then((permission) => {
  //       console.log('Notification Permission:', permission);
  //     });
  //   }
  // }, []);
  

  // const createNotification = () => {
  //   if (Notification.permission === 'granted') {
  //     new Notification('Hello, this is a test notification!');
  //   } else {
  //     alert('Notification permission not granted.');
  //   }
  // };
  

  if ('service-worker' in navigator) {
    // The service worker is in the public folder, so it's available at /service-worker.js
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  }

  const toggleNavMenu = () => {
    setIsNavMenuOpen(!isNavMenuOpen);
  };

  const PrivateRoute = ({ element: Component, ...rest }) => {
    const token = localStorage.getItem('jwtToken');
    return token ? <Component {...rest} /> : <Navigate to="/login" />;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar toggleNavMenu={toggleNavMenu} />

      {location.pathname !== '/login' && location.pathname !== '/signup' && (
        <div
          className={`fixed top-0 left-0 h-screen overflow-y-auto transition-transform transform ${isNavMenuOpen || !isMobileView ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 md:ml-48 left-6 w-80  mt-16 top-2`}
        >
          {/* <NavMenu /> */}
        </div>
      )}

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/news" element={<NewsCard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/Present" element={<EventInsert />} />
        <Route path="/Admin" element={<AdminPage />} />
        <Route path="/Subscribe" element={<PrivateRoute element={SubscribePage} />} />
        <Route path="/Menu" element={<NavMenu />} />
        <Route path="/Profile" element={<PrivateRoute element={ProfilePage} />} />
        <Route path="/ExpandProfile" element={<ExpandProfileForAdmins />} />
        <Route path="/EditProfile" element={<EditProfileForm />} />
        <Route path="/SlideSelectionPage" element={<SlideSelectionPage />} />
        <Route path="/news/:id" element={<NewsDetails />} />
        <Route path="/NewsDashboardPage" element={<NewsDetails />} />
        <Route path="/AddNews" element={<AddNews />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Mobile" element={<MobileNavMenu />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/notif" element={<NotificationComponent />} />
        {/* <Route path="/notif" element={<NotificationComponent />} /> */}

        {/* Redirect /AAUG to the main page */}
        <Route path="/AAUG" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <SearchProvider>
        <App />
      </SearchProvider>
    </Router>
  );
}

export default AppWrapper;
