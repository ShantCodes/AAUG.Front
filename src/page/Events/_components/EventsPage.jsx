import React from 'react';
import EventsFeed from '../../../_components/eventComponents/EventsFeed';
import EventInsert from '../../../_components/eventComponents/EventInsert';
import Location from '../../../_components/Location';
import LocationCard from '../../../_components/eventComponents/LocationCard';

const DashboardPage = () => {
  return (
    <div className="relative flex justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* EventInsert positioned below the navbar */}
        <div className="mt-12">
          <EventInsert />
        </div>

        {/* EventsFeed positioned directly under EventInsert */}
        <div>
          <EventsFeed />
        </div>
      </div>

      {/* Location component positioned to the right and hidden on mobile */}
      <div className="hidden lg:block right-0 top-0 mt-16 mr-10 fixed">
        <LocationCard />
      </div>
    </div>
  );
};

export default DashboardPage;
