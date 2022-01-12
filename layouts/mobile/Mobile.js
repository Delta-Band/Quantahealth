import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Squash as Hamburger } from 'hamburger-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FrameIndicator,
  Menu,
  Frame,
  RichText,
  Footer
} from '../../components';
import * as consts from '../consts';

const useStyles = makeStyles(theme => ({
  mainWrapper: {
    height: '100vh',
    maxHeight: '-webkit-fill-available',
    overflow: 'auto'
  },
  topBar: {
    height: 50,
    width: '100%',
    paddingInlineStart: theme.spacing(2),
    paddingBlock: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1
  },
  logoImg: {
    height: '100%',
    zIndex: 1
  },
  hamburger: {
    zIndex: 1
  },
  media: {
    width: '100%'
  },
  frameWrapper: {
    minHeight: 'unset !important',
    '&:first-child': {
      paddingTop: theme.spacing(8)
    }
  },
  footer: {
    borderTopRightRadius: '40px !important',
    borderTopLeftRadius: '40px !important'
  }
}));

export default function MobileLayout({ logo, frames, children, footer }) {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);
  const [visibleFrame, setVisibleFrame] = useState(frames ? frames[0] : null);

  return visibleFrame ? (
    <motion.div
      className={classes.mainWrapper}
      animate={{
        backgroundColor: visibleFrame.bgColor
      }}
    >
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
      {children}
    </motion.div>
  ) : null;
}
