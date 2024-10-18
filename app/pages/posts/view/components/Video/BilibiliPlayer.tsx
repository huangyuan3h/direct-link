import React from 'react';

interface BilibiliPlayerProps {
  videoUrl: string;
}

const BilibiliPlayer: React.FC<BilibiliPlayerProps> = ({ videoUrl }) => {
  return (
    <iframe
      src={videoUrl}
      allowFullScreen
      width="540"
      height="600"
      title="Bilibili Video Player"
    />
  );
};

export default BilibiliPlayer;
