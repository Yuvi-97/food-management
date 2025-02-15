import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./ImageSlider.css";

const ImageSlider = () => {
  const images = [
    // "https://www.india.gov.in/sites/upload_files/npi/files/pm-suryaghar_0.jpg",
    "https://www.adgully.com/img/800/201708/lg.jpg",
    // "https://powermin.gov.in/sites/default/files/styles/slider_1024x422/public/UJALA1.png?itok=YGftv199",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Auto-slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="image-slider">
      <div className="slider-wrapper">
        <div
          className="slider-container"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index}`}
              className="slider-image"
            />
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button className="prev" onClick={handlePrev} aria-label="Previous Slide">
        <FaChevronLeft size={20} />
      </button>
      <button className="next" onClick={handleNext} aria-label="Next Slide">
        <FaChevronRight size={20} />
      </button>

      {/* Indicators */}
      <div className="indicators">
        {images.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
