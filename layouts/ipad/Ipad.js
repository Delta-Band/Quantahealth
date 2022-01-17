import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { Squash as Hamburger } from 'hamburger-react';
import { useScrollDirection } from 'react-use-scroll-direction';
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
  },
  topBar: {
    height: 65,
    width: '100%',
    paddingInlineStart: theme.spacing(4),
    paddingInlineEnd: theme.spacing(2),
    paddingBlock: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1
  },
  richTxt: {
    paddingLeft: 53,
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
  contentWrapper: {
    background: 'red',
    height: '100%',
    width: '100%',
    height: '100%',
    overflow: 'auto'
  },
  logoImg: {
    height: '100%',
    zIndex: 1
  },
  hamburger: {
    zIndex: 1
  },
  frameWrapper: {
    // minHeight: 'unset !important',
    paddingInline: theme.spacing(7),
    '&:first-child': {
      paddingTop: theme.spacing(10)
    }
  },
  media: {
    position: 'relative !important'
  },
  footer: {}
}));

export default function IpadLayout({ logo, frames, children, footer }) {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);
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
      {frames.map((frame, i) => (
        <Frame
          key={frame.id}
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
          index={i}
          className={classes.frameWrapper}
        >
          <Media
            frame={frame}
            visibleFrame={visibleFrame}
            className={classes.media}
          />
          <RichText html={frame.richTxt} className={classes.richTxt} />
          <CustomLinkButton frame={frame} />
        </Frame>
      ))}
      <Footer className={classes.footer} data={footer} />
      <div className={classes.topBar}>
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
                <FrameIndicator frames={frames} />
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
                  <Hamburger toggled={isOpen} toggle={setOpen} size={20} />
                </motion.div>
              </motion.div>
              <Menu
                open={isOpen}
                close={() => {
                  setOpen(false);
                }}
                items={['Data', 'Contact']}
              />
            </>
          )}
        </AnimatePresence>
      </div>
      <div>{children}</div>
    </motion.div>
  );
}
