import React from 'react';
import EventsFeed from '../../../_components/eventComponents/EventsFeed';
import EventInsert from '../../../_components/eventComponents/EventInsert';
import LocationCard from '../../../_components/eventComponents/LocationCard';
import NewsCard from '../../../_components/newsComponents/NewsCard';
import NavMenu from '../../../_components/NavMenu';
import SlideShow from '../../../_components/slideShowComponents/SlideShow';

const DashboardPage = () => {
  return (
    <div className="flex justify-center lg:px-4">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-4 bg-stone-50 shadow-md shadow-gray-200">

        {/* Left Sidebar (NavMenu, News, and Footer) */}
        <div className="col-span-3 hidden lg:block">
          <div className="space-y-0 pt-5 mt-14 fixed">
            <NavMenu />
            <NewsCard />
            {/* Footer Section */}
            <div className="mt-4 text-center text-gray-500 text-sm">
              <p>Developed by Shant</p>
              <p>
                Source:
                <a
                  href="https://github.com/ShantCodes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  https://github.com/ShantCodes
                </a>
              </p>
            </div>
          </div>
        </div>


        {/* Main Content Area */}
        <div className="col-span-6 flex flex-col items-center space-y-4 mt-16">
          {/* Event Insert */}
          <div className="w-full">
            <EventInsert />
          </div>

          {/* Events Feed */}
          <div className="w-full">
            <EventsFeed />
          </div>
        </div>

        {/* Right Sidebar (SlideShow and Location) */}
        <div className="col-span-3 hidden lg:block">
          <div className="sticky top-20 space-y-6">
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
