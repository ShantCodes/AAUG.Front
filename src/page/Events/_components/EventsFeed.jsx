import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';

const EventsFeed = () => {
    const [events, setEvents] = useState([
        {
            id: 1, title: 'Amazing Event', caption: 'Join us for an exciting journey into the world of advanced technologies as we explore the latest trends in artificial intelligence, machine learning, and data science. This event will bring together industry leaders, innovators, and enthusiasts to discuss the impact of these technologies on various sectors, including healthcare, finance, and education. Attendees will have the opportunity to engage in interactive sessions, panel discussions, and hands-on workshops that provide valuable insights and practical knowledge. Whether youre a seasoned professional or just starting out in the field, this event is designed to inspire and equip you with the tools and understanding needed to navigate the rapidly evolving tech landscape.Don’t miss the chance to network with peers, learn from experts, and be part of the conversation shaping the future of technology.', initialLikes: 10
        },
        { id: 2, title: 'Another Great Event', caption: 'Join us for another great event. i am literally the strongest armenian climber of all time, i mean like literally, ind by the way, did i tell you? im a programmer at an oil company, can you believe that, a climber and a programmer at the same time? oh my god bet you have never met one like me before huh?', initialLikes: 5 },
        // Add initial events here
    ]);

    const [page, setPage] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
            loadMoreEvents();
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const loadMoreEvents = () => {
        setPage(prevPage => prevPage + 1);
        // Fetch more events and append to existing events
        const newEvents = [
            { id: events.length + 1, title: `Event ${events.length + 1}`, caption: `Caption for event ${events.length + 1}`, initialLikes: 0 },
            // Add more event data
        ];
        setEvents([...events, ...newEvents]);
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gray-100 max-w-3xl mx-auto">
            <div className="mt-16">
                {events.map(event => (
                    <EventCard
                        key={event.id}
                        title={event.title}
                        caption={event.caption}
                        initialLikes={event.initialLikes}
                    />
                ))}
            </div>
        </div>
    );
};

export default EventsFeed;
