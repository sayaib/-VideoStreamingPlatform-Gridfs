import { useEffect, useState } from "react";
import "./Player.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VideoImage from "./VideoImage";
import { convertToIST } from "../function/videoUploadTime";

const Player = ({ videoID }) => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const getUploadedVideo = async () => {
    try {
      const res = await axios.get("/api/videos/listAllUploadedVideo");
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUploadedVideo();
  }, [videoID]);

  console.log(data);

  return (
    <div className="video-grid">
      {data.map((videoSrc, index) => (
        <div
          className="video-container"
          key={index}
          onClick={() => {
            navigate(
              `/playVideo?id=${videoSrc._id}&name=${videoSrc.filename}&time=${videoSrc.uploadDate}`
            );
          }}
        >
          <VideoImage videoId={videoSrc._id} />
          <h6>{videoSrc.filename}</h6>
          <h6>{videoSrc.length}</h6>

          <h6>{convertToIST(videoSrc.uploadDate)}</h6>
        </div>
      ))}
    </div>
  );
};

export default Player;
