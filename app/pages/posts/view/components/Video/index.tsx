import React, { useEffect, useState } from 'react';
import BilibiliPlayer from './BilibiliPlayer';
import YouTubePlayer from './YouTubePlayer';

interface VideoComponentProps {
  bilibiliUrl?: string;
  youtubeUrl?: string;
}

const VideoComponent: React.FC<VideoComponentProps> = ({
  bilibiliUrl,
  youtubeUrl,
}) => {
  console.log(bilibiliUrl, youtubeUrl);

  const [isFromChina, setIsFromChina] = useState<boolean>(true);
  const [videoToLoad, setVideoToLoad] = useState<'bilibili' | 'youtube' | null>(
    null
  );

  useEffect(() => {
    if (!bilibiliUrl && !youtubeUrl) return;

    if (bilibiliUrl && !youtubeUrl) {
      setVideoToLoad('bilibili');
      return;
    }

    if (!bilibiliUrl && youtubeUrl) {
      setVideoToLoad('youtube');
      return;
    }

    fetch('https://ipapi.co/json/')
      .then((response) => response.json())
      .then((data) => {
        if (data.country === 'CN') {
          setIsFromChina(true);
          setVideoToLoad('bilibili');
        } else {
          setIsFromChina(false);
          setVideoToLoad('youtube');
        }
      })
      .catch((error) => {
        console.error('Failed to determine user location:', error);
        setVideoToLoad('youtube');
      });
  }, [bilibiliUrl, youtubeUrl]);

  if (videoToLoad === 'bilibili' && bilibiliUrl && isFromChina) {
    return <BilibiliPlayer videoUrl={bilibiliUrl} />;
  }

  if (videoToLoad === 'youtube' && youtubeUrl) {
    return <YouTubePlayer videoUrl={youtubeUrl} />;
  }

  return null;
};

export default VideoComponent;
