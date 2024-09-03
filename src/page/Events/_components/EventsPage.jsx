import React from 'react';
import EventsFeed from '../../../_components/eventComponents/EventsFeed';
import EventInsert from '../../../_components/eventComponents/EventInsert';
import LocationCard from '../../../_components/eventComponents/LocationCard';
import NewsCard from '../../../_components/newsComponents/NewsCard';
import NavMenu from '../../../_components/NavMenu';

const DashboardPage = () => {
  return (
    <div className="flex justify-center lg:px-4">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* Left Sidebar (News) */}
        <div className="col-span-3 hidden lg:block">
          <div className="fixed  pt-5 mt-14 z-50">
            <NavMenu />
          </div>
          <div className="fixed top-96 pt-5 mt-5 z-50">
            <NewsCard />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="col-span-6">
          <div className="flex flex-col items-center space-y-4 mt-16">
            {/* Event Insert */}
            <EventInsert />

            {/* Events Feed */}
            <EventsFeed />
          </div>
        </div>

        {/* Right Sidebar (Location) */}
        <div className="col-span-3 hidden lg:block">
          <div className="sticky top-20">
            <LocationCard />
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
