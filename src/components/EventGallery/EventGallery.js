import React, { useState } from 'react';
import './EventGallery.css'; // Ensure the CSS file is imported
import { eventsData } from '../data/EventData';
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const videoData = [
  {
    id: 1,
    title: 'Event Highlights 2023',
    description: 'A glimpse into our amazing events!',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Example YouTube embed URL
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
    <div className="container mx-auto">
      {/* Image Gallery Section */}
      <h2 className="text-4xl font-bold text-center mb-10 text-gradient">Event Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {(showMoreImages ? eventsData : eventsData.slice(0, 8)).map((event) => (
          <div
            key={event.id}
            className="group cursor-pointer relative overflow-hidden"
            onClick={() => handleEventClick(event)}
          >
            <img
              src={event.images[0]}
              alt={event.title}
              className="rounded-lg group-hover:scale-105 transition-all duration-300 object-cover w-full h-30"
            />
            <div className="group-hover:bg-opacity-80 bg-opacity-0 transition-opacity duration-300 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 absolute inset-0 rounded-lg flex flex-col items-center justify-center">
              <h3 className="text-white text-2xl font-semibold text-shadow-md">{event.title}</h3>
              <p className="text-gray-800 mt-2 text-shadow-md">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="see-more-wrapper">
      <button
        onClick={() => setShowMoreImages((prev) => !prev)}
        className="see-more-button"
      >
        {showMoreImages ? 'See Less' : 'See More'}
      </button>
      </div>
      {/* Video Section */}
<section className="py-16 px-6">
  <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
    Event Videos
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {(showMoreVideos ? videoData : videoData.slice(0, 4)).map((video) => (
      <div
        key={video.id}
        className="group cursor-pointer transform transition duration-300 hover:scale-105"
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
        <h3 className="mt-4 text-xl font-semibold text-center text-gray-700 group-hover:text-purple-500 transition duration-300">
          {video.title}
        </h3>
        <p className="text-gray-500 text-center">{video.description}</p>
      </div>
    ))}
  </div>
  <div className="flex justify-center mt-10">
    <button
      onClick={() => setShowMoreVideos((prev) => !prev)}
      className="see-more-button px-6 py-3 rounded-full text-white bg-blue-600 hover:bg-blue-700 transform transition duration-300 shadow-lg hover:shadow-2xl"
    >
      {showMoreVideos ? 'See Less' : 'See More'}
    </button>
  </div>
</section>

      {/* Modal for Image Gallery */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 p-4">
          <div className="bg-gradient-to-b from-gray-700 to-blue-400 rounded-lg p-6 max-w-3xl w-55 relative shadow-2xl animate-fadeIn">
            <button
              className="absolute top-3 right-3 bg-red-500 rounded-full p-2 hover:bg-red-600 transition"
              onClick={closeModal}
              onMouseEnter={closeModal} // Close on hover
            >
              <FaTimes size={18} className="text-black" />
            </button>
            <h3 className="text-3xl font-bold text-white text-center mb-4">
              {selectedEvent.title}
            </h3>
            <div className="flex items-center">
              <button
                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 p-3 rounded-full transition"
                onClick={handlePrevImage}
              >
                <FaArrowLeft className="text-white" />
              </button>
              <img
                src={selectedEvent.images[currentImageIndex]}
                alt={`${selectedEvent.title} ${currentImageIndex + 1}`}
                className="min-w-20 max-h-[60vh] object-contain rounded-lg shadow-md mx-4"
              />
              <button
                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 p-3 rounded-full transition"
                onClick={handleNextImage}
              >
                <FaArrowRight className="text-black" />
              </button>
            </div>
            <p className="text-black text-center mt-2">
              Image {currentImageIndex + 1} of {selectedEvent.images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventGallery;
