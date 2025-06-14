import { useState, useRef } from "react";
import PropTypes from "prop-types";

/**
 * A component that displays a stack of PNG images with mouse wheel navigation
 * @param {Object} props - Component props
 * @param {string[]} props.images - Array of image URLs to display
 * @returns {JSX.Element} The rendered component
 */
function PngStackViewer({ images ,firstSlice,lastSlice}) {
  const [currentIndex, setCurrentIndex] = useState(firstSlice);
  const imgRef = useRef(null);

  const handleWheel = (e) => {
    e.preventDefault();
    const direction = e.deltaY < 0 ? -1 : 1;
    const nextIndex = currentIndex + direction;

    // Clamp index between firstSlice and lastSlice
    const clampedIndex = Math.min(Math.max(nextIndex, firstSlice), lastSlice);
    setCurrentIndex(clampedIndex);
  };

  return (
    <div
      onWheel={handleWheel}
      className="relative pb-12 w-[400px] rounded-2xl overflow-hidden  flex items-center justify-center"
    >
      <img
        ref={imgRef}
        src={images[currentIndex-firstSlice]}
        alt={`Slice ${currentIndex + 1}`}
        className="max-w-full max-h-full"
      />
      <div className="absolute bottom-0 font-bold  text-white px-2 pt-4 text-md rounded">
        Slice {currentIndex} / {lastSlice}
      </div>
    </div>
  );
}

PngStackViewer.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PngStackViewer;
