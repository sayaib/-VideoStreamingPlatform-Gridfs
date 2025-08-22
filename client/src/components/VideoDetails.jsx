import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { convertToIST } from "../function/videoUploadTime";

const DetailsContainer = styled.div`
  margin-top: 20px;
`;

const VideoTitle = styled.h2`
  font-size: 1.4rem;
  margin: 0;
`;

const VideoDescription = styled.p`
  font-size: 1rem;
  margin-top: 10px;
`;

function VideoDetails() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const name = queryParams.get("name");
  const timeStamp = queryParams.get("time");
  console.log(name);
  return (
    <DetailsContainer>
      <VideoDescription>{convertToIST(timeStamp)}</VideoDescription>
      <VideoTitle>{name}</VideoTitle>
      <VideoDescription>
        Shreya is our Alpha & Delta student. Coming from a Tier3 college, she
        has worked hard to crack these internships & her placement journey can
        also teach us a lot.
      </VideoDescription>
    </DetailsContainer>
  );
}

export default VideoDetails;
