import React from 'react';
import EventsFeed from '../../../_components/eventComponents/EventsFeed';
import EventInsert from '../../../_components/eventComponents/EventInsert';
import LocationCard from '../../../_components/eventComponents/LocationCard';
import NewsCard from '../../../_components/newsComponents/NewsCard';
import NavMenu from '../../../_components/NavMenu';
import SlideShow from '../../../_components/slideShowComponents/SlideShow';
import SlideShowCircle from '../../../_components/slideShowComponents/SlideShowCircle';
import MobileNavMenu from '../../../_components/MobileNavMenu';
import NotificationComponent from '../../../_components/NotificationComponent';

const DashboardPage = () => {
  return (
    <div className="flex justify-center lg:px-4 ">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-4 bg-stone-50 shadow-gray-200">

        {/* Left Sidebar */}
        <div className="col-span-3 relative z-10">        
          
          {/* NavMenu for large screens */}
          <div className="hidden lg:block space-y-0 pt-5 mt-14">
            <NavMenu />
            <NewsCard />
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

          {/* MobileNavMenu for mobile screens */}
          <div className="lg:hidden">
            <MobileNavMenu />
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-6 flex flex-col mt-16 p-2">
          {/* SlideShowCircle for Mobile View */}
          <div className="w-full">
            <SlideShowCircle />
          </div>

          {/* Event Insert */}
          <div className="w-full mb-2">
            <EventInsert />
            
          </div>
          

          {/* Events Feed */}
          <div className="w-full">
            <EventsFeed />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-3 hidden lg:block">
          <div className="space-y-0 pt-5 mt-14">
            <div className="mr-2">
              <SlideShow />
            </div>
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

