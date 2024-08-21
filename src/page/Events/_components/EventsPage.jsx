// File: src/page/Events/_components/EventsPage.jsx

import React from 'react';
import EventCard from './EventCard';

const EventsPage = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="overflow-y-scroll h-3/4 w-full max-w-md p-4 bg-gray-100 rounded-lg">
                <EventCard
                    title="Amazing Event"
                    caption="This is an amazing event that you should not miss!"
                    initialLikes={10}
                />
                <EventCard
                    title="Another Great Event"
                    caption="Join us for another great event happening soon!"
                    initialLikes={5}
                />
                {/* Add more EventCard components as needed */}
            </div>
        </div>
    );
};

export default EventsPage;
