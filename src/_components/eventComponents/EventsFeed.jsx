import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { getEvents, getCurrentUserInfo } from '../../services/eventsService/eventsService';

const EventsFeed = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentInfo, setCurrentInfo] = useState(null);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Optionally get user info if needed
                const userInfo = await getCurrentUserInfo();

                if (userInfo) {
                    setCurrentInfo(userInfo);
                    setUserRole(userInfo.role);
                }

                // Fetch events without worrying about token or like status
                const eventsData = await getEvents();
                setEvents(eventsData);
            } catch (error) {
                console.error('Error loading events:', error);
                setError('Error loading events. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleRemoveEvent = (eventId) => {
        setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
    };

    if (loading) {
        return <p>Loading events...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="w-full">
            {events.map((event) => (
                <EventCard
                    key={event.id}
                    eventId={event.id}
                    title={event.eventTitle}
                    presenter={event.presentator}
                    caption={event.eventDetails}
                    initialLikes={event.likeCount}
                    presentatorUserId={event.presentatorUserId}
                    imageUrl={`http://localhost:37523/api/Media/DownloadFile/${event.thumbNailFileId}`}
                    currentInfo={currentInfo}
                    userRole={userRole || 'guest'} // Default to 'guest' if userRole is null
                    onRemove={handleRemoveEvent}
                />
            ))}
        </div>
    );
};

export default EventsFeed;
