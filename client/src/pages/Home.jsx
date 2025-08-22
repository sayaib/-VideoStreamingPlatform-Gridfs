import { useState } from "react";
import Player from "../video/Player";

const Home = () => {
  const [file, setFile] = useState(null);
  const [videoId, setVideoId] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/videos/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log(data);
    setVideoId(data.file.id);
  };
  return (
    <>
      <div>
        <h1>{videoId}</h1>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        {/* {videoId && ( */}

        <Player videoID={videoId} />
      </div>
    </>
  );
};

export default Home;
