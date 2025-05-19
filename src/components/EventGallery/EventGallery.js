import React, { useState } from 'react';
import './EventGallery.css'; // Ensure the CSS file is imported
import { eventsData } from '../data/EventData';
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const videoData = [
  {
    id: 1,
    title: 'Event Highlights 2024',
    description: 'A glimpse into our amazing events!',
    videoUrl: 'https://www.youtube.com/embed/TSODobJ0V7M', // Example YouTube embed URL
  },
  {
    id: 2,
    title: 'Behind the Scenes',
    description: 'How we made it all happen!',
    videoUrl: 'https://www.youtube.com/embed/tgbNymZ7vqY', // Example YouTube embed URL
  },
];

const EventGallery = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMoreImages, setShowMoreImages] = useState(false);
  const [showMoreVideos, setShowMoreVideos] = useState(false);

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
    <div className="container mx-auto px-4">
      {/* Image Gallery Section */}
      <h2 className="text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">
        Event Gallery
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {(showMoreImages ? eventsData : eventsData.slice(0, 8)).map((event) => (
          <div
            key={event.id}
            className="group cursor-pointer relative overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            onClick={() => handleEventClick(event)}
          >
            <img
              src={event.images[0]}
              alt={event.title}
              className="rounded-lg group-hover:scale-105 transition-all duration-300 object-cover w-full h-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col items-center justify-center">
              <h3 className="text-white text-2xl font-semibold">{event.title}</h3>
              <p className="text-gray-200 mt-2">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setShowMoreImages((prev) => !prev)}
          className="px-6 py-3 rounded-full text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
        >
          {showMoreImages ? 'See Less' : 'See More'}
        </button>
      </div>

      {/* Video Section */}
      <section className="py-16">
        <h2 className="text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          Event Videos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(showMoreVideos ? videoData : videoData.slice(0, 4)).map((video) => (
            <div
              key={video.id}
              className="group cursor-pointer transform transition-transform duration-300 hover:scale-105"
            >
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src={video.videoUrl}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-64 md:h-80 lg:h-96 object-cover"
                ></iframe>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-center text-gray-700 group-hover:text-blue-500 transition">
                {video.title}
              </h3>
              <p className="text-gray-500 text-center">{video.description}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowMoreVideos((prev) => !prev)}
            className="px-6 py-3 rounded-full text-white bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg transition-all"
          >
            {showMoreVideos ? 'See Less' : 'See More'}
          </button>
        </div>
      </section>

      {/* Modal for Image Gallery */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 p-4">
          <div className="bg-gradient-to-b from-gray-700 to-blue-400 rounded-lg p-6 max-w-xl w-full max-h-fit relative shadow-2xl">
            <button
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition transform hover:scale-110 z-10"
              onClick={closeModal}
            >
              <FaTimes size={20} />
            </button>
            <h3 className="text-3xl font-bold text-white text-center mb-4">
              {selectedEvent.title}
            </h3>
            <div className="flex items-center justify-center">
              <button
                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 p-3 rounded-full transition"
                onClick={handlePrevImage}
              >
                <FaArrowLeft className="text-white" />
              </button>
              <img
                src={selectedEvent.images[currentImageIndex]}
                alt={`${selectedEvent.title} ${currentImageIndex + 1}`}
                className="max-w-full max-h-[40vh] object-contain rounded-lg shadow-md mx-4"
              />
              <button
                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 p-3 rounded-full transition"
                onClick={handleNextImage}
              >
                <FaArrowRight className="text-white" />
              </button>
            </div>
            <p className="text-white text-center mt-4">
              Image {currentImageIndex + 1} of {selectedEvent.images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventGallery;
