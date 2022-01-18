import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useScrollDirection } from 'react-use-scroll-direction';
import { motion, AnimatePresence } from 'framer-motion';
import DesktopNavigation from './DesktopNavigation';
import {
  FrameIndicator,
  Frame,
  RichText,
  Footer,
  CustomLinkButton
} from '../../components';
import DesktopMedia from './DesktopMedia';

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
  frameWrapper: {
    paddingLeft: 'calc(50vw - 150px) !important',
    paddingRight: '5vw !important',
    // maxWidth: 1090,
    [theme.breakpoints.up('desktop')]: {
      paddingLeft: 'calc(50vw - 167px) !important'
    }
  },
  richTxt: {
    // paddingLeft: 53,
    flexShrink: 0,
    fontSize: 16,
    maxWidth: '27vw',
    lineHeight: '25px',
    '& .ql-size-huge': {
      fontSize: 24,
      lineHeight: '28px',
      fontWeight: 'bold'
    },
    '& a': {
      color: theme.palette.link.primary,
      textDecoration: 'underline'
    }
  },
  footer: {
    marginLeft: -174,
    width: 'calc(100vw - 170px) !important'
  }
}));

export default function DesktopLayout({ logo, frames, children, footer }) {
  const classes = useStyles();
  const [visibleFrameIndex, setVisibleFrameIndex] = useState(0);
  const [visibleFrame, setVisibleFrame] = useState(frames[visibleFrameIndex]);
  const { scrollTargetRef, scrollDirection } = useScrollDirection();

  useEffect(() => {
    setVisibleFrame(frames[visibleFrameIndex]);
  }, [visibleFrameIndex]);

  return (
    <motion.div
      className={classes.mainWrapper}
      ref={scrollTargetRef}
      animate={{
        backgroundColor: visibleFrame.bgColor
      }}
    >
      <DesktopMedia visibleFrame={visibleFrame} />
      {frames.map((frame, i) => (
        <Frame
          key={frame.id}
          index={i}
          frame={frame}
          rootMargin='-50% 0px -50% 0px'
          onVisible={indx => {
            if (!scrollDirection) return;
            setVisibleFrameIndex(
              scrollDirection === 'UP'
                ? Math.min(indx, visibleFrameIndex)
                : Math.max(indx, visibleFrameIndex)
            );
          }}
          className={classes.frameWrapper}
        >
          <div className={classes.richTxt}>
            <RichText html={frame.richTxt} />
            <CustomLinkButton frame={frame} />
          </div>
        </Frame>
      ))}
      <Footer className={classes.footer} data={footer} />
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
