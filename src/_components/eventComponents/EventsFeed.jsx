import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { getEvents } from '../../services/eventsService/eventsService';
import axios from 'axios';

const EventsFeed = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const eventsData = await getEvents();

                // Retrieve the JWT token once
                const token = localStorage.getItem('jwtToken');

                // Create an array of promises to check if the user has liked each event
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
                                isLiked: response.data.isLiked, // Assuming the API returns { isLiked: true/false }
                            };
                        } catch (likeError) {
                            console.error(`Error checking like status for event ${event.id}:`, likeError);
                            // If there's an error, assume the event is not liked
                            return { ...event, isLiked: false };
                        }
                    })
                );

                setEvents(eventsWithLikeStatus);
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
        <div className="w-full">
            {events.map((event) => (
                <EventCard
                    key={event.id}
                    eventId={event.id}
                    title={event.eventTitle}
                    presenter={event.presentator}
                    caption={event.eventDetails}
                    initialLikes={event.likeCount}
                    presenterUserId={event.presentatorUserId}
                    imageUrl={`http://localhost:37523/api/Media/DownloadFile/${event.thumbNailFileId}`}
                    isLiked={event.isLiked} // Pass the liked status as a prop
                />
            ))}
        </div>
    );
};

export default EventsFeed;
