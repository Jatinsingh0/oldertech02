import { useState } from "react";

export default function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="image-slider">
      <button className="image-slider-btn" onClick={goToPrevious}>
        <svg
          width="9"
          height="16"
          viewBox="0 0 9 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 1L1 8.5L8 15.5" stroke="black" />
        </svg>
      </button>
      <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
      <button className="image-slider-btn" onClick={goToNext}>
        <svg
          width="9"
          height="16"
          viewBox="0 0 9 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 15.5L8 8L0.999999 1" stroke="black" />
        </svg>
      </button>
    </div>
  );
}
