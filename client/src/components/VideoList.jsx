import styled from "styled-components";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const VideoItem = styled.div`
  display: flex;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 150px;
  height: 90px;
  margin-right: 10px;
`;

const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const VideoTitle = styled.h4`
  margin: 0;
`;

function VideoList() {
  return (
    <ListContainer>
      <VideoItem>
        <Thumbnail src="/api/videos/image/default.jpg" alt="Video Thumbnail" />
        <VideoInfo>
          <VideoTitle>helleddsd dsdsdsd sd</VideoTitle>
        </VideoInfo>
      </VideoItem>
      <VideoItem>
        <Thumbnail src="/api/videos/image/default.jpg" alt="Video Thumbnail" />
        <VideoInfo>
          <VideoTitle>helleddsd dsdsdsd sd</VideoTitle>
        </VideoInfo>
      </VideoItem>
      {/* Add more VideoItem components as needed */}
    </ListContainer>
  );
}

export default VideoList;
