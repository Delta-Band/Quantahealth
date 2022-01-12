import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  media: {
    width: '100%'
  }
}));

export default function Media({ frame, visibleFrame }) {
  const classes = useStyles();
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef.current) {
      if (visibleFrame.id === frame.id) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [visibleFrame, videoRef.current]);

  return (
    <>
      {frame.mediaType === 'image' && (
        <img src={frame.media} alt='mdia' className={classes.media} />
      )}
      {frame.mediaType === 'mp4' && (
        <video ref={videoRef} playsInline muted className={classes.media}>
          <source src={frame.media} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      )}
    </>
  );
}
