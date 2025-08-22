import { useState } from "react";

const VideoImage = ({ videoId }) => {
  const [imageSrc, setImageSrc] = useState(`/api/videos/image/${videoId}.png`);
  const fallbackImageSrc = "/api/videos/image/default.jpg";

  const handleError = () => {
    setImageSrc(fallbackImageSrc);
  };

  return <img src={imageSrc} alt="Video Image" onError={handleError} />;
};

export default VideoImage;
