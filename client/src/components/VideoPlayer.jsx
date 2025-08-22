import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Player from "../video/Player";
const VideoContainer = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  position: relative;
`;

const VideoIframe = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

function VideoPlayer() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  console.log(id);
  return (
    <VideoContainer>
      <VideoIframe
        controls
        autoplay="true"
        src={`/api/videos/stream/${id}`}
      ></VideoIframe>
    </VideoContainer>
  );
}

export default VideoPlayer;
