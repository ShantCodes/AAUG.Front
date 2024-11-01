import React, { useEffect, useState, useContext } from 'react';
import EventCard from './EventCard';
import { getEvents } from '../../services/eventsService/eventsService';
import { getUserProfile } from '../../services/userService/userSerice';
import { SearchContext } from '../../untils/SearchContext';
import { downloadFile } from '../../services/downloadFileService/downloadFileService';

const EventsFeed = () => {
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);
  const [error, setError] = useState(null);
  const [currentInfo, setCurrentInfo] = useState(null);
  const [userRole, setUserRole] = useState('guest');
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMoreEvents, setHasMoreEvents] = useState(true);

  // Extract searchResults from context
  const { searchResults } = useContext(SearchContext);

  // Load initial events or show search results
  useEffect(() => {
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

    if (searchResults && searchResults.length > 0) {
      setEvents(searchResults);
      setHasMoreEvents(false); // Disable infinite scroll when showing search results
    } else if (searchResults === null) {
      // If searchResults is null, load initial events
      loadInitialEvents();
    } else {
      loadInitialEvents();
    }
  }, [searchResults]);

  // Fetch additional events for infinite scrolling
  useEffect(() => {
    if (hasMoreEvents && pageNumber > 1 && !searchResults) {
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

  // Load current user information
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const userInfo = await getUserProfile();
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

  // Set up infinite scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.offsetHeight &&
        !loadingEvents &&
        (!searchResults || searchResults.length === 0)
      ) {
        setPageNumber((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadingEvents, searchResults]);

  // Handle event removal
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
          imageUrl={downloadFile(event.thumbNailFileId)}
          currentInfo={currentInfo}
          userRole={userRole}
          onRemove={handleRemoveEvent}
        />
      ))}
      {loadingEvents && <p>Loading more events...</p>}
      {!hasMoreEvents && !searchResults && <p>No more events to load.</p>}
    </div>
  );
};

export default EventsFeed;
