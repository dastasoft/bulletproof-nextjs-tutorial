import React, { useState } from "react";

export default function Youtube(props) {
  const { videoId, width = "100%", height = 350 } = props;
  const [showVideo, setShowVideo] = useState(Boolean(props.autoPlay));
  const overlay = `https://i.imgur.com/IhVEPVL.png`;

  const renderVideo = () => {
    const src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    return (
      <>
        <iframe
          width={width}
          height={height}
          src={src}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen="1"
        />
        <style jsx>
          {`
            iframe {
              margin: 20px 0;
            }
          `}
        </style>
      </>
    );
  };

  const handleShowVideo = () => {
    setShowVideo(true);
  };

  if (showVideo) {
    return renderVideo({ autoplay: true });
  }

  return (
    <div className="youtube">
      <div className="click-to-play" onClick={() => handleShowVideo()}>
        Play Now
      </div>
      <img src={overlay} onClick={() => handleShowVideo()} />
    </div>
  );
}
