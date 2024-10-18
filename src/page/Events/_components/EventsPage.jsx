import React from 'react';
import EventsFeed from '../../../_components/eventComponents/EventsFeed';
import EventInsert from '../../../_components/eventComponents/EventInsert';
import LocationCard from '../../../_components/eventComponents/LocationCard';
import NewsCard from '../../../_components/newsComponents/NewsCard';
import NavMenu from '../../../_components/NavMenu';
import SlideShow from '../../../_components/slideShowComponents/SlideShow'; // Import the SlideShow component

const DashboardPage = () => {
  return (
    <div className="flex justify-center lg:px-4">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-4 bg-stone-50 shadow-md shadow-gray-200">

        {/* Left Sidebar (News) */}
        <div className="col-span-3 hidden lg:block">
          <div className="fixed pt-5 mt-14 mb-10  ">
            <NavMenu />
          </div>
          <div className="fixed top-96 pt-5 mt-20">
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

        {/* Right Sidebar (SlideShow and Location) */}
        <div className="col-span-3 hidden lg:block">
          <div className="sticky top-20 space-y-6"> {/* Add space between SlideShow and LocationCard */}
            {/* SlideShow Component */}
            <div className="mr-2">
              <SlideShow />
            </div>
            {/* LocationCard Component */}
            <div className="mr-2">
              <LocationCard />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
