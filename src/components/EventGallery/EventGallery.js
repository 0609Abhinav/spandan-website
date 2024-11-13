import React, { useState } from 'react';
import './EventGallery.css'; // Ensure the CSS file is imported
import { eventsData } from '../data/EventData';
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

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
      <h2 className="text-4xl font-bold text-center mb-10 text-gradient">Event Gallery</h2>
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
              className="w-full h-64 object-cover rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-105 hover:shadow-2xl"
              style={{ height: '250px' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-opacity-0 group-hover:bg-opacity-80 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-lg">
              <h3 className="text-white text-2xl font-semibold shadow-lg z-10">
                {event.title}
              </h3>
              <p className="text-gray-200 mt-2 text-center text-shadow-md z-10">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 p-4">
          <div className="bg-gradient-to-b from-gray-700 to-blue-400 rounded-lg p-6 max-w-3xl w-full relative shadow-2xl animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-white bg-gradient-to-r from-red-400 to-pink-600 rounded-full p-2 hover:bg-red-500 transition-all"
              onMouseOver={closeModal}
            >
              <FaTimes size={18} />
            </button>
            <h3 className="text-3xl font-bold text-center mb-4 text-white">
              {selectedEvent.title}
            </h3>
            <div className="flex justify-center items-center">
              <button
                className="text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 p-3 rounded-full mr-2 transition-all duration-300 shadow-lg"
                onClick={handlePrevImage}
              >
                <FaArrowLeft />
              </button>
              <img
                src={selectedEvent.images[currentImageIndex]}
                alt={`${selectedEvent.title} ${currentImageIndex + 1}`}
                className="w-full max-h-[80vh] object-contain rounded-lg shadow-md transition-transform duration-500 ease-in-out"
              />
              <button
                className="text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 p-3 rounded-full ml-2 transition-all duration-300 shadow-lg"
                onClick={handleNextImage}
              >
                <FaArrowRight />
              </button>
            </div>
            <p className="text-center text-white mt-2">
              Image {currentImageIndex + 1} of {selectedEvent.images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventGallery;
