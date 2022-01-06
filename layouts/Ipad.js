import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { Squash as Hamburger } from 'hamburger-react';
import { FrameIndicator, Menu, Frame, RichText } from '../components';
import * as consts from './consts';

const useStyles = makeStyles(theme => ({
  mainWrapper: {
    height: '100vh',
    maxHeight: '-webkit-fill-available',
    overflow: 'auto'
  },
  topBar: {
    height: 65,
    width: '100%',
    paddingInlineStart: theme.spacing(2),
    paddingBlock: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    top: 0,
    left: 0
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
    minHeight: 'unset !important',
    paddingInline: theme.spacing(5),
    '&:first-child': {
      paddingTop: theme.spacing(10)
    }
  },
  media: {
    width: '100%'
  }
}));

export default function IpadLayout({ logo, frames, children }) {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);
  const [visibleFrame, setVisibleFrame] = useState(frames[0]);

  return (
    <motion.div className={classes.mainWrapper}>
      {frames.map((frame, i) => (
        <Frame
          key={frame.id}
          frame={frame}
          onVisible={setVisibleFrame}
          index={i}
          className={classes.frameWrapper}
        >
          <img src={frame.media} alt='mdia' className={classes.media} />
          <RichText html={frame.richTxt} />
        </Frame>
      ))}
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
