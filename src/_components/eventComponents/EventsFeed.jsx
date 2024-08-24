// src/components/EventsFeed/EventsFeed.jsx

import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { getEvents } from '../../services/eventsService/eventsService';

const EventsFeed = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const eventsData = await getEvents();
                setEvents(eventsData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
    }, []);

    if (loading) {
        return <p>Loading events...</p>;
    }

    if (error) {
        return <p>Error loading events: {error}</p>;
    }

    return (
        <div className="flex flex-col items-center p-4 bg-gray-100 max-w-3xl mx-auto">
            <div className="mt-16">
                {events.map((event, index) => (
                    <EventCard
                        key={event.id}
                        eventId={event.id}
                        title={event.eventTitle}
                        presenter={event.presentator}
                        caption={event.eventDetails}
                        initialLikes={event.likeCount}
                        imageUrl={`http://localhost:37523/api/Media/DownloadFile/${event.thumbNailFileId}`}
                        className={index === 0 ? 'mt-30' : ''}
                    />
                ))}
            </div>
        </div>
    );
};

export default EventsFeed;
