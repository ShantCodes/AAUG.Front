import React from 'react';
import NavMenu from '../../../_components/NavMenu'; // Adjust the import path if necessary
import EventsFeed from '../../../_components/eventComponents/EventsFeed';
import EventInsert from '../../../_components/eventComponents/EventInsert';

const DashboardPage = () => {
  return (
    <div className="flex">
      {/* Nav Menu */}
      <div className="w-64 fixed h-screen overflow-y-auto ml-40">
        <NavMenu />
      </div>
      {/* Main Content */}
      <div className="flex-1 ml-64 p-4 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <div className="relative">
            {/* EventInsert positioned below the navbar */}
            <div className="mt-16"> {/* Adjust margin-top to account for navbar height */}
              <EventInsert />
            </div>
            <div className="mt-8"> {/* Margin to separate EventInsert and EventsFeed */}
              <EventsFeed />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
