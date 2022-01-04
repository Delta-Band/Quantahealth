import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { Squash as Hamburger } from 'hamburger-react';
import { Typography, Grid } from '@mui/material';
import { FrameIndicator, Menu, Frame, RichText } from '../components';
import * as consts from './consts';

const useStyles = makeStyles(theme => ({
  mainWrapper: {
    height: '100vh',
    maxHeight: '-webkit-fill-available',
    overflow: 'auto',
    paddingLeft: theme.spacing(7)
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
    justifyContent: 'space-between'
  },
  img: {
    width: '100%',
    zIndex: 1
  },
  hamburger: {
    zIndex: 1
  },
  media: {
    width: '80vh',
    height: '80vh',
    flexShrink: 0,
    position: 'fixed',
    left: 80,
    top: '50%',
    transform: 'translateY(-50%)'
  },
  richTxt: {
    flexShrink: 0,
    fontSize: 16,
    lineHeight: '25px',
    '& .ql-size-huge': {
      fontSize: 24,
      lineHeight: '28px',
      fontWeight: 'bold'
    }
  },
  frameWrapper: {
    paddingLeft: '80vh !important',
    paddingRight: '0px !important'
  },
  richTxt: {
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(8)
  }
}));

export default function MobileLandscape({ logo, frames, children }) {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);
  const [visible, setVisible] = useState(frames[0].id);
  const [bgColor, setBgColor] = useState(frames[0].bgColor);

  useEffect(() => {
    setBgColor(frames.find(frame => frame.id === visible).bgColor);
  }, [visible, frames]);

  return (
    <motion.div
      className={classes.mainWrapper}
      animate={{
        backgroundColor: bgColor
      }}
    >
      <div className={classes.sideBar}>
        <AnimatePresence>
          {logo && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75 }}
                className={classes.img}
              >
                <motion.img
                  className={classes.img}
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
                <FrameIndicator frames={frames} vertical />
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
                horizontal
              />
            </>
          )}
        </AnimatePresence>
      </div>
      {frames.map((frame, i) => (
        <Frame
          key={frame.id}
          frame={frame}
          onVisible={setVisible}
          index={i}
          className={classes.frameWrapper}
        >
          <img src={frame.media} alt='mdia' className={classes.media} />
          <RichText html={frame.richTxt} className={classes.richTxt} />
        </Frame>
      ))}
      {children}
    </motion.div>
  );
}
