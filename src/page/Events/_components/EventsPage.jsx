import React from 'react';
import EventsFeed from '../../../_components/eventComponents/EventsFeed';
import EventInsert from '../../../_components/eventComponents/EventInsert';
import LocationCard from '../../../_components/eventComponents/LocationCard';
import NewsCard from '../../../_components/newsComponents/NewsCard';

const DashboardPage = () => {
  return (
    <div className="relative flex justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Centering the content inside the max-width container */}
        <div className="flex flex-col items-center">
          {/* EventInsert positioned below the navbar */}
          <div className="mt-12 w-full">
            <EventInsert />
          </div>

          {/* Flex container for EventsFeed and NewsCard */}
          <div className="mt-2 w-full flex justify-start relative">
            {/* NewsCard positioned fixed and hidden on mobile */}
            <div className="hidden lg:block fixed top-100 left-56 mt-32 mr-4">
              <NewsCard />
            </div>

            {/* EventsFeed positioned to the right of NewsCard */}
            <div className="w-full">
              <EventsFeed />
            </div>
          </div>
        </div>
      </div>

      {/* Location component positioned to the right and hidden on mobile */}
      <div className="hidden lg:block right-24 top-0 mt-16 fixed">
        <LocationCard />
      </div>
    </div>
  );
};

export default DashboardPage;
