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

const NewsPage = () => <div>News Page</div>;


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-700">
        <Navbar />
        <Routes>
          <Route path="/" element={<EventsFeed />} />
          <Route path="/events" element={<EventsFeed />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/Present" element={<EventInsert />} />
          {/* <Route path="/Test" element={<UserProfileCard />} /> */}
          <Route path="/Admin" element={<UsersList />} />
          <Route path="/Test" element={<AdminEventCard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
