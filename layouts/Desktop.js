import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowSize } from '../hooks';
import {
  FrameIndicator,
  Frame,
  RichText,
  DesktopNavigation
} from '../components';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  mainWrapper: {
    height: '100vh',
    maxHeight: '-webkit-fill-available',
    overflow: 'auto',
    paddingLeft: 200,
    [theme.breakpoints.up('desktop')]: {
      paddingLeft: 300
    }
  },
  sideBar: {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100%',
    paddingInline: theme.spacing(3),
    paddingBlock: 20,
    width: '20vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    pointerEvents: 'none',
    [theme.breakpoints.up('desktop')]: {
      width: 300,
      paddingInline: theme.spacing(6)
    }
  },
  contentWrapper: {
    background: 'red',
    width: '70vw',
    margin: '0 auto',
    maxWidth: '100vw',
    transform: 'translateX(10%)',
    [theme.breakpoints.up('desktop')]: {
      width: '60vw',
      paddingInline: theme.spacing(6)
    },
    [theme.breakpoints.up('widescreen')]: {
      width: 1300,
      transform: 'unset',
      paddingInline: theme.spacing(6)
    }
  },
  logoImg: {
    width: '100%'
  },
  media: {
    width: '80vh',
    height: '80vh',
    flexShrink: 0,
    position: 'fixed',
    left: 'calc(50vw + 32.5px)',
    top: '50%',
    // background: 'red',
    // transform: 'translate(-50%, -50%)',
    maxHeight: '30vw',
    maxWidth: '30vw',
    pointerEvents: 'none',
    '& img': {
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0
    }
  },
  frameWrapper: {
    paddingLeft: 'calc(50vw - 150px) !important',
    paddingRight: '5vw !important',
    // maxWidth: 1090,
    [theme.breakpoints.up('desktop')]: {
      paddingLeft: 'calc(50vw - 220px) !important'
    }
  },
  richTxt: {
    // paddingRight: theme.spacing(8),
    paddingLeft: 53,
    flexShrink: 0,
    fontSize: 16,
    maxWidth: '27vw',
    lineHeight: '25px',
    '& .ql-size-huge': {
      fontSize: 24,
      lineHeight: '28px',
      fontWeight: 'bold'
    }
  },
  footer: {
    padding: '0 !important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '200px !important',
    minHeight: 'unset !important',
    height: 410,
    background: '#000',
    position: 'relative',
    borderTopRightRadius: 80,
    borderTopLeftRadius: 80
  }
}));

const variants = {
  enter: {
    zIndex: 0,
    opacity: 0
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: {
    zIndex: 0,
    opacity: 0
  }
};

export default function DesktopLayout({ logo, frames, children }) {
  const classes = useStyles();
  const [visibleFrame, setVisibleFrame] = useState(frames[0]);
  const windowSize = useWindowSize();
  const mediaRef = useRef();

  useEffect(() => {
    const mediaEl = mediaRef.current;
    const mediaRect = mediaEl.getBoundingClientRect();
    mediaEl.style.marginTop = -(mediaRect.height / 2) + 'px';
    mediaEl.style.marginLeft = -mediaRect.width + 'px';
    console.log(mediaRect.width);
  }, [windowSize.width, windowSize.height]);

  return (
    <motion.div
      className={classes.mainWrapper}
      animate={{
        backgroundColor: visibleFrame.bgColor
      }}
    >
      <div className={classes.media} ref={mediaRef}>
        <AnimatePresence initial={false}>
          {visibleFrame.media && (
            <motion.img
              key={visibleFrame.id}
              src={visibleFrame.media}
              alt='mdia'
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                // x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.25 }
              }}
            />
          )}
        </AnimatePresence>
      </div>
      {frames.map((frame, i) => (
        <Frame
          key={frame.id}
          frame={frame}
          onVisible={setVisibleFrame}
          className={classes.frameWrapper}
        >
          <RichText html={frame.richTxt} className={classes.richTxt} />
        </Frame>
      ))}
      <Frame
        frame={{
          bgColor: '#FFF',
          id: 'footer-frame'
        }}
        onVisible={setVisibleFrame}
        className={classes.footer}
      >
        <footer>
          <Typography>Footer Section</Typography>
        </footer>
      </Frame>
      <div className={classes.sideBar}>
        <AnimatePresence>
          {logo && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75 }}
                className={classes.logoImg}
              >
                <img
                  className={classes.logoImg}
                  src={logo}
                  alt='Quathealth Logo'
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75 }}
              >
                <FrameIndicator frames={frames} vertical />
              </motion.div>
            </>
          )}
        </AnimatePresence>
        <div />
      </div>
      <DesktopNavigation mainNavItms={['Data', 'Contact']} />
      {children}
    </motion.div>
  );
}
