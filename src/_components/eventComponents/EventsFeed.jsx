import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { getEvents, getCurrentUserInfo } from '../../services/eventsService/eventsService';
import axios from 'axios';

const EventsFeed = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentInfo, setCurrentInfo] = useState(null);
    const [userRole, setUserRole] = useState(null); // State for user role

    useEffect(() => {
        const loadData = async () => {
            try {
                const userInfo = await getCurrentUserInfo();

                if (userInfo) {
                    setCurrentInfo(userInfo);
                    setUserRole(userInfo.role); // Set user role
                }

                const eventsData = await getEvents();

                const token = localStorage.getItem('jwtToken');

                if (token) {
                    const eventsWithLikeStatus = await Promise.all(
                        eventsData.map(async (event) => {
                            try {
                                const response = await axios.get(
                                    `http://localhost:37523/api/Events/CheckIfLiked/${event.id}`,
                                    {
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                        },
                                    }
                                );
                                return {
                                    ...event,
                                    isLiked: response.data.isLiked,
                                };
                            } catch (likeError) {
                                console.error(`Error checking like status for event ${event.id}:`, likeError);
                                return { ...event, isLiked: false };
                            }
                        })
                    );
                    setEvents(eventsWithLikeStatus);
                } else {
                    // If no token, simply set the events data without checking like status
                    setEvents(eventsData);
                }
            } catch (error) {
                setError(error.message);
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
        return <p>Error loading events: {error}</p>;
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
                    isLiked={event.isLiked} // This will be undefined if no token is present
                    currentInfo={currentInfo}
                    userRole={userRole || 'guest'} // Default to 'guest' if userRole is null
                    onRemove={handleRemoveEvent} // Pass the remove handler
                />
            ))}
        </div>
    );
};

export default EventsFeed;
