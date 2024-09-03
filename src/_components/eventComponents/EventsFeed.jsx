import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { getEvents, getCurrentUserInfo } from '../../services/eventsService/eventsService';

const EventsFeed = () => {
    const [events, setEvents] = useState([]);
    const [loadingEvents, setLoadingEvents] = useState(true);
    const [loadingUserInfo, setLoadingUserInfo] = useState(true);
    const [error, setError] = useState(null);
    const [currentInfo, setCurrentInfo] = useState(null);
    const [userRole, setUserRole] = useState('guest'); // Default to 'guest' initially

    // Load events without worrying about user info
    useEffect(() => {
        const loadEvents = async () => {
            try {
                const eventsData = await getEvents();
                setEvents(eventsData);
            } catch (error) {
                console.error('Error loading events:', error);
                setError('Error loading events. Please try again later.');
            } finally {
                setLoadingEvents(false);
            }
        };

        loadEvents();
    }, []);

    // Load user info if needed
    useEffect(() => {
        const loadUserInfo = async () => {
            try {
                const userInfo = await getCurrentUserInfo();
                if (userInfo) {
                    setCurrentInfo(userInfo);
                    setUserRole(userInfo.role);
                }
            } catch (error) {
                console.error('Error loading user info:', error);
                // We can optionally set an error for user info specifically
            } finally {
                setLoadingUserInfo(false);
            }
        };

        loadUserInfo();
    }, []);

    // Define the handleRemoveEvent function
    const handleRemoveEvent = (eventId) => {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    };

    if (loadingEvents) {
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
                    userRole={userRole} // No need to default to 'guest' here as it's already set initially
                    onRemove={handleRemoveEvent} // Pass the handler to the EventCard
                />
            ))}
        </div>
    );
};

export default EventsFeed;
