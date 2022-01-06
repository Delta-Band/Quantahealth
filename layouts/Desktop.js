import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { FrameIndicator, Frame, RichText } from '../components';

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
    paddingBlock: theme.spacing(2),
    width: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
    width: '50vh',
    height: '50vh',
    flexShrink: 0,
    position: 'fixed',
    left: '50vw',
    top: '50%',
    marginTop: '-25vh',
    marginLeft: '-50vh',
    [theme.breakpoints.up('desktop')]: {
      // left: 'unset',
      // right: 'calc(50vw - 125px)'
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
    // paddingLeft: theme.spacing(10),
    flexShrink: 0,
    fontSize: 16,
    maxWidth: 400,
    lineHeight: '25px',
    '& .ql-size-huge': {
      fontSize: 24,
      lineHeight: '28px',
      fontWeight: 'bold'
    }
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

  return (
    <motion.div
      className={classes.mainWrapper}
      animate={{
        backgroundColor: visibleFrame.bgColor
      }}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={visibleFrame.id}
          src={visibleFrame.media}
          alt='mdia'
          className={classes.media}
          variants={variants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={{
            // x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.25 }
          }}
        />
      </AnimatePresence>
      {frames.map((frame, i) => (
        <Frame
          key={frame.id}
          frame={frame}
          onVisible={setVisibleFrame}
          index={i}
          className={classes.frameWrapper}
        >
          <RichText html={frame.richTxt} className={classes.richTxt} />
        </Frame>
      ))}
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
      {children}
    </motion.div>
  );
}
