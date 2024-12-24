import React, { useState } from "react";

const ImageLoader = ({ src, alt, className }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <div className="bg-gray-200 animate-pulse rounded-lg w-40 h-40">
          {/* Placeholder (e.g., spinner or skeleton loader)
          <div className="text-gray-500 text-sm">Loading...</div> */}
        </div>
      )}
      <img src={src} alt={alt} className={`${className} ${loading ? "hidden" : "block"}`} onLoad={handleImageLoad} />
    </>
  );
};

export default ImageLoader;
