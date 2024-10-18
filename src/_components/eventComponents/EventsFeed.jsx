import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { getEvents, getCurrentUserInfo } from '../../services/eventsService/eventsService';

const EventsFeed = ({ searchResults }) => {
    const [events, setEvents] = useState([]);
    const [loadingEvents, setLoadingEvents] = useState(false);
    const [loadingUserInfo, setLoadingUserInfo] = useState(true);
    const [error, setError] = useState(null);
    const [currentInfo, setCurrentInfo] = useState(null);
    const [userRole, setUserRole] = useState('guest');
    const [pageNumber, setPageNumber] = useState(1);
    const [hasMoreEvents, setHasMoreEvents] = useState(true);

    // Update events whenever searchResults change
    useEffect(() => {
        if (searchResults) {
            // If search results are available, show only search results
            setEvents(searchResults);
            setHasMoreEvents(false); // Disable infinite scroll
        } else if (pageNumber === 1) {
            // Reset event list and enable pagination when clearing search
            loadInitialEvents();
        }
    }, [searchResults]);

    const loadInitialEvents = async () => {
        setLoadingEvents(true);
        try {
            const initialEvents = await getEvents(pageNumber);
            setEvents(initialEvents);
            setHasMoreEvents(initialEvents.length > 0);
        } catch (error) {
            console.error('Error loading initial events:', error);
            setError('Error loading events. Please try again later.');
        } finally {
            setLoadingEvents(false);
        }
    };

    useEffect(() => {
        if (!searchResults && hasMoreEvents && pageNumber > 1) {
            // Infinite scroll: Load additional events if no search results
            const loadMoreEvents = async () => {
                setLoadingEvents(true);
                try {
                    const moreEvents = await getEvents(pageNumber);
                    setEvents((prevEvents) => [
                        ...prevEvents,
                        ...moreEvents.filter((event) => !prevEvents.some((e) => e.id === event.id)),
                    ]);
                    setHasMoreEvents(moreEvents.length > 0);
                } catch (error) {
                    console.error('Error loading more events:', error);
                    setError('Error loading more events. Please try again later.');
                } finally {
                    setLoadingEvents(false);
                }
            };

            loadMoreEvents();
        }
    }, [pageNumber, searchResults, hasMoreEvents]);

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
                !loadingEvents &&
                !searchResults // Prevent infinite scroll when search results are available
            ) {
                setPageNumber((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadingEvents, searchResults]);

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
            {loadingEvents && !searchResults && <p>Loading more events...</p>}
            {!hasMoreEvents && !searchResults && <p>No more events to load.</p>}
        </div>
    );
};

export default EventsFeed;
