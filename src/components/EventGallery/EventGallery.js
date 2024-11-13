// EventGallery.js
import React, { useState } from 'react';
import './EventGallery.css'; // Add this line to import the CSS
import { eventsData } from '../data/EventData';



const EventGallery = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-10">Event Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {eventsData.map((event) => (
          <div
            key={event.id}
            className="relative cursor-pointer group"
            onClick={() => handleEventClick(event)}
          >
            <img
              src={event.images[0]}
              alt={event.title}
              className="w-full h-64 object-cover rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-lg">
              <h3 className="text-white text-2xl font-semibold">{event.title}</h3>
              <p className="text-gray-200 mt-2 text-center">{event.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full relative">
            <button
              className="absolute top-2 right-2 text-black bg-gray-300 rounded-full p-1"
              onClick={closeModal}
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold text-center mb-4">
              {selectedEvent.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedEvent.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${selectedEvent.title} ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventGallery;
