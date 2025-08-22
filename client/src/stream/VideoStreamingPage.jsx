import styled from "styled-components";
import { useLocation } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import VideoDetails from "../components/VideoDetails";
import VideoList from "../components/VideoList";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const MainContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
`;

const VideoSection = styled.div`
  flex: 3;
  padding-right: 20px;
`;

const ListSection = styled.div`
  flex: 1;
`;

function VideoStreamingPage() {
  return (
    <AppContainer>
      <MainContent>
        <VideoSection>
          <VideoPlayer />
          <VideoDetails />
        </VideoSection>
        <ListSection>
          <VideoList />
        </ListSection>
      </MainContent>
    </AppContainer>
  );
}

export default VideoStreamingPage;
