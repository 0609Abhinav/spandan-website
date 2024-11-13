import React, { useState } from 'react';
import './EventGallery.css'; // Ensure the CSS file is imported
import { eventsData } from '../data/EventData';

const EventGallery = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleEventClick = (event, index = 0) => {
    setSelectedEvent(event);
    setCurrentImageIndex(index);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setCurrentImageIndex(0);
  };

  const handleNextImage = () => {
    if (selectedEvent) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === selectedEvent.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (selectedEvent) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedEvent.images.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">Event Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {eventsData.map((event) => (
          <div
            key={event.id}
            className="relative cursor-pointer group transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={() => handleEventClick(event)}
          >
            <img
              src={event.images[0]}
              alt={event.title}
              className="w-full h-64 object-cover rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-lg">
              <h3 className="text-white text-2xl font-semibold shadow-lg">{event.title}</h3>
              <p className="text-gray-200 mt-2 text-center text-shadow-md">{event.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full relative shadow-2xl">
            <button
              className="absolute top-2 right-2 text-black bg-gray-300 rounded-full p-2 hover:bg-gray-400 transition-all"
              onClick={closeModal}
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">
              {selectedEvent.title}
            </h3>
            <div className="flex justify-center items-center">
              <button
                className="text-white bg-gray-700 hover:bg-gray-600 p-3 rounded-full mr-2 transition-all duration-300"
                onClick={handlePrevImage}
              >
                ◀
              </button>
              <img
                src={selectedEvent.images[currentImageIndex]}
                alt={`${selectedEvent.title} ${currentImageIndex + 1}`}
                className="w-full max-h-[80vh] object-contain rounded-lg shadow-md transition-transform duration-500 ease-in-out"
              />
              <button
                className="text-white bg-gray-700 hover:bg-gray-600 p-3 rounded-full ml-2 transition-all duration-300"
                onClick={handleNextImage}
              >
                ▶
              </button>
            </div>
            <p className="text-center text-gray-700 mt-2">
              Image {currentImageIndex + 1} of {selectedEvent.images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventGallery;
