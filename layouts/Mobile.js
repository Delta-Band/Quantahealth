import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Squash as Hamburger } from 'hamburger-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FrameIndicator, Menu, Frame } from '../components';
import * as consts from './consts';

const useStyles = makeStyles(theme => ({
  mainWrapper: {
    // display: 'flex',
    // flexDirection: 'column',
    height: '100vh',
    maxHeight: '-webkit-fill-available',
    overflow: 'hidden'
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
    left: 0
  },
  contentWrapper: {
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
  }
}));

export default function MobileLayout({ logo, frames, children }) {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);
  const [visible, setVisible] = useState(frames[0].id);
  const [bgColor, setBgColor] = useState(frames[0].bgColor);

  useEffect(() => {
    setBgColor(frames.find(frame => frame.id === visible).bgColor);
  }, [visible, frames]);

  return (
    <div className={classes.mainWrapper}>
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
      <motion.div
        className={classes.contentWrapper}
        animate={{
          backgroundColor: bgColor
        }}
      >
        {frames.map((frame, i) => (
          <Frame
            key={frame.id}
            frame={frame}
            onVisible={setVisible}
            index={i}
          />
        ))}
        {children}
      </motion.div>
    </div>
  );
}
