import React from 'react';
import EventsFeed from '../../../_components/eventComponents/EventsFeed';
import EventInsert from '../../../_components/eventComponents/EventInsert';

const DashboardPage = () => {
  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* EventInsert positioned below the navbar */}
        <div className="mt-12">
          <EventInsert />
        </div>
        
        {/* EventsFeed positioned directly under EventInsert */}
        <div className="">
          <EventsFeed />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
