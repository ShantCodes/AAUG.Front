import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './_components/navbar';
import LoginPage from './page/auth/LoginPage';
import EventsFeed from './_components/eventComponents/EventsFeed'
import SignupForm from './_components/loginComponents/SignupForm';
import EventInsert from './_components/eventComponents/EventInsert';
import UserProfileCard from './_components/userComponents/userProfileCard';
import UsersList from './_components/userComponents/UserList';
import AdminEventCard from './_components/eventComponents/NotApprovedEvents';
import NavMenu from './_components/NavMenu';
import MainPage from './page/Events/_components/EventsPage';

const NewsPage = () => <div>News Page</div>;


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="w-64 fixed h-screen overflow-y-auto ml-40">
          <NavMenu />
        </div>

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/Present" element={<EventInsert />} />
          {/* <Route path="/Test" element={<UserProfileCard />} /> */}
          <Route path="/Admin" element={<UsersList />} />
          <Route path="/Test" element={<AdminEventCard />} />
          <Route path="/Menu" element={<NavMenu />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
