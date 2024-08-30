import React, { useEffect, useState } from 'react';
import NotApprovedEvents from './NotApprovedEvents';
import { getNotApprovedEvents } from '../../services/eventsService/eventsService';

const NotApprovedEventsFeed = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const eventsData = await getNotApprovedEvents();
                console.log('Fetched events data:', eventsData); // Log fetched data
                setEvents(eventsData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
    }, []);

    const removeEvent = (eventId) => {
        setEvents(events.filter(event => event.id !== eventId));
    };

    if (loading) {
        return <p>Loading events...</p>;
    }

    if (error) {
        return <p>Error loading events: {error}</p>;
    }

    return (
        <div className="w-full max-w-2xl mx-auto mt-16 overflow-hidden"> {/* Adjusted width and margins */}
            {events.length > 0 ? (
                events.map((event) => (
                    <NotApprovedEvents
                        key={event.id}
                        eventId={event.id}
                        title={event.eventTitle}
                        presenter={event.presentator}
                        caption={event.eventDetails}
                        initialLikes={event.likeCount}
                        presenterUserId={event.presentatorUserId}
                        imageUrl={`http://localhost:37523/api/Media/DownloadFile/${event.thumbNailFileId}`}
                        isLiked={false}
                        onRemove={removeEvent} // Pass the removeEvent function
                    />
                ))
            ) : (
                <p>No events available.</p>
            )}
        </div>
    );
};

export default NotApprovedEventsFeed;
