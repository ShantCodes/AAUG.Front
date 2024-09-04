import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { getEvents, getCurrentUserInfo } from '../../services/eventsService/eventsService';

const EventsFeed = () => {
    const [events, setEvents] = useState([]);
    const [loadingEvents, setLoadingEvents] = useState(false);
    const [loadingUserInfo, setLoadingUserInfo] = useState(true);
    const [error, setError] = useState(null);
    const [currentInfo, setCurrentInfo] = useState(null);
    const [userRole, setUserRole] = useState('guest');
    const [pageNumber, setPageNumber] = useState(1);
    const [hasMoreEvents, setHasMoreEvents] = useState(true);

    useEffect(() => {
        const loadEvents = async () => {
            if (loadingEvents || !hasMoreEvents) return;

            setLoadingEvents(true);
            try {
                const eventsData = await getEvents(pageNumber);
                
                // Avoid duplicating data in case of unexpected re-renders
                setEvents((prevEvents) => {
                    const newEvents = eventsData.filter(event => !prevEvents.some(prevEvent => prevEvent.id === event.id));
                    return [...prevEvents, ...newEvents];
                });

                // Check if more events are available
                setHasMoreEvents(eventsData.length > 0);
            } catch (error) {
                console.error('Error loading events:', error);
                setError('Error loading events. Please try again later.');
            } finally {
                setLoadingEvents(false);
            }
        };

        loadEvents();
    }, [pageNumber]);

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
            } finally {
                setLoadingUserInfo(false);
            }
        };

        loadUserInfo();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.offsetHeight &&
                !loadingEvents
            ) {
                setPageNumber((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadingEvents]);

    const handleRemoveEvent = (eventId) => {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    };

    if (loadingEvents && events.length === 0) {
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
                    userRole={userRole}
                    onRemove={handleRemoveEvent}
                />
            ))}

            {loadingEvents && <p>Loading more events...</p>}
            {!hasMoreEvents && <p>No more events to load.</p>}
        </div>
    );
};

export default EventsFeed;
