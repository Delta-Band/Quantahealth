import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { motion, AnimatePresence } from 'framer-motion';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Squash as Hamburger } from 'hamburger-react';
import { useScrollDirection } from 'react-use-scroll-direction';
import cx from 'classnames';
import { useWindowSize } from '../../hooks';
import { useRouter } from 'next/router';
import {
  FrameIndicator,
  Menu,
  Frame,
  RichText,
  Footer,
  Media,
  CustomLinkButton
} from '../../components';
import * as consts from '../consts';

const useStyles = makeStyles(theme => ({
  mainWrapper: {
    height: '100vh',
    maxHeight: '-webkit-fill-available',
    overflow: 'auto'
    // paddingLeft: theme.spacing(7)
    // paddingRight: theme.spacing(0)
  },
  sideBar: {
    height: '100%',
    width: 65,
    position: 'fixed',
    left: 0,
    top: 0,
    flexShrink: 0,
    paddingBlock: theme.spacing(1.5),
    paddingInline: theme.spacing(1.5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
    pointerEvents: 'none'
  },
  logoImg: {
    width: '100%',
    zIndex: 1,
    position: 'relative',
    pointerEvents: 'all'
  },
  hamburger: {
    zIndex: 1,
    pointerEvents: 'all'
  },
  media: {
    width: '80vh',
    height: '80vh',
    flexShrink: 0,
    position: 'fixed',
    left: 'calc(50vw + 32.5px)',
    top: '50%',
    pointerEvents: 'none',
    maxHeight: '40vw',
    maxWidth: '40vw',
    '& img': {
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0
    }
  },
  frameWrapper: {
    paddingLeft: 'calc(50vw + 65px) !important',
    paddingRight: '0px !important'
  },
  richTxt: {
    paddingRight: '10vw',
    paddingLeft: theme.spacing(3),
    flexShrink: 0,
    fontSize: 14,
    lineHeight: '22px',
    '& .ql-size-huge': {
      fontSize: 18,
      lineHeight: '25px',
      display: 'inline-block',
      fontWeight: 'bold'
    },
    '& a': {
      color: theme.palette.link.primary,
      textDecoration: 'underline'
    },
    '& p': {
      marginBlock: theme.spacing(3)
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 16,
      lineHeight: '28px',
      '& .ql-size-huge': {
        fontSize: 22,
        lineHeight: '32px'
      }
    }
  },
  footer: {
    marginLeft: 66,
    width: 'calc(100vw - 66px - 16px) !important',
    borderTopRightRadius: '10px !important',
    borderTopLeftRadius: '30px !important',
    paddingBottom: theme.spacing(1)
  },
  customLinkBtn: {
    paddingRight: '10vw',
    paddingLeft: theme.spacing(3),
    width: '100%'
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

export default function MobileLandscape({ logo, frames, children, footer }) {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);
  const [visibleFrameIndex, setVisibleFrameIndex] = useState(0);
  const [visibleFrame, setVisibleFrame] = useState(frames[visibleFrameIndex]);
  const mediaRef = useRef();
  const windowSize = useWindowSize();
  const { scrollTargetRef, scrollDirection } = useScrollDirection();
  const upIpad = useMediaQuery('(min-width:765px)');
  const router = useRouter();

  useEffect(() => {
    const mediaEl = mediaRef.current;
    const mediaRect = mediaEl.getBoundingClientRect();
    mediaEl.style.marginTop = -(mediaRect.height / 2) + 'px';
    mediaEl.style.marginLeft = -mediaRect.width + 'px';
    // console.log(mediaRect.width);
  }, [windowSize.width, windowSize.height]);

  useEffect(() => {
    setVisibleFrame(frames[visibleFrameIndex]);
  }, [visibleFrameIndex]);

  return (
    <motion.div
      className={classes.mainWrapper}
      ref={scrollTargetRef}
      id='mainWrapper'
      animate={{
        backgroundColor: visibleFrame.bgColor
      }}
    >
      <div className={classes.media} ref={mediaRef}>
        <AnimatePresence initial={false}>
          <Media
            key={visibleFrame.id}
            frame={visibleFrame}
            visibleFrame={visibleFrame}
          />
        </AnimatePresence>
      </div>
      {frames.map((frame, i) => (
        <Frame
          key={frame.id}
          frame={frame}
          onVisible={indx => {
            if (!scrollDirection) return;
            setVisibleFrameIndex(
              scrollDirection === 'UP'
                ? Math.min(indx, visibleFrameIndex)
                : Math.max(indx, visibleFrameIndex)
            );
          }}
          index={i}
          className={cx(classes.frameWrapper, 'frameWrapper')}
        >
          <RichText html={frame.richTxt} className={classes.richTxt} />
          <div className={classes.customLinkBtn}>
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
                onClick={() => {
                  router.push('/');
                  setTimeout(() => {
                    document
                      .getElementsByClassName('frameWrapper')[0]
                      .scrollIntoView({ behavior: 'smooth' });
                  });
                }}
              >
                <motion.img
                  className={classes.logoImg}
                  src={logo}
                  alt='Quathealth Logo'
                  variants={consts.INVERT_COLOR}
                  initial='normal'
                  animate={isOpen ? 'invert' : 'normal'}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75 }}
              >
                <FrameIndicator
                  frames={frames}
                  vertical
                  visibleFrame={visibleFrame}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75 }}
                className={classes.hamburger}
              >
                <motion.div
                  variants={consts.INVERT_COLOR}
                  initial='normal'
                  animate={isOpen ? 'invert' : 'normal'}
                >
                  <Hamburger
                    toggled={isOpen}
                    toggle={setOpen}
                    size={upIpad ? 24 : 20}
                  />
                </motion.div>
              </motion.div>
              <Menu
                open={isOpen}
                close={() => {
                  setOpen(false);
                }}
                items={[]}
                horizontal
              />
            </>
          )}
        </AnimatePresence>
      </div>
      {children}
    </motion.div>
  );
}
