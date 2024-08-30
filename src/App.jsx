import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './_components/navbar';
import LoginPage from './page/auth/LoginPage';
import EventsFeed from './_components/eventComponents/EventsFeed';
import SignupForm from './_components/loginComponents/SignupForm';
import EventInsert from './_components/eventComponents/EventInsert';
import UserProfileCard from './_components/userComponents/userProfileCard';
import UsersList from './_components/userComponents/UserList';
import AdminEventCard from './_components/eventComponents/NotApprovedEvents';
import NavMenu from './_components/NavMenu';
import MainPage from './page/Events/_components/EventsPage';
import AdminPage from './page/admin/AdminPage';
import NewsCard from './_components/newsComponents/NewsCard';
import LocationCard from './_components/eventComponents/LocationCard';

const NewsPage = () => <div>News Page</div>;

function App() {
  const location = useLocation();
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  const toggleNavMenu = () => {
    setIsNavMenuOpen(!isNavMenuOpen);
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
    <div className="min-h-screen bg-gray-100">
      <Navbar toggleNavMenu={toggleNavMenu} />

      {location.pathname !== '/login' && location.pathname !== '/signup' && (
        <div
          className={`fixed top-0 left-0 h-screen overflow-y-auto transition-transform transform ${
            isNavMenuOpen || !isMobileView ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:ml-48 w-80 z-50`}
        >
          <NavMenu />
        </div>
      )}

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/news" element={<NewsCard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/Present" element={<EventInsert />} />
        <Route path="/Admin" element={<AdminPage />} />
        <Route path="/Test" element={<LocationCard />} />
        <Route path="/Menu" element={<NavMenu />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
