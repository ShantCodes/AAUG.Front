import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './_components/navbar';
import LoginForm from './page/login/_components/LoginForm';
import EventsFeed from './page/Events/_components/EventsFeed';
import SignupForm from './page/login/_components/SignupForm';

const NewsPage = () => <div>News Page</div>;
const LoginPage = () => (
  <div>
    <LoginForm />
  </div>
);


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<EventsFeed />} />
          <Route path="/events" element={<EventsFeed />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
