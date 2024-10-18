import React from 'react';
import YouTube from 'react-youtube';

interface YouTubePlayerProps {
  videoUrl: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoUrl }) => {
  // 提取 YouTube 视频 ID
  const getYoutubeId = (url: string) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = getYoutubeId(videoUrl);

  if (!videoId) return null;

  // 设置视频选项
  const opts = {
    width: '100%',
    height: '600px',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div
      style={{
        position: 'relative',
        paddingBottom: '100%',
        height: 0,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <YouTube videoId={videoId} opts={opts} />
      </div>
    </div>
  );
};

export default YouTubePlayer;
