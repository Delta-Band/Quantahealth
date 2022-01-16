import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FrameIndicator,
  Frame,
  RichText,
  DesktopNavigation,
  Footer
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
    marginLeft: -300
  }
}));

export default function DesktopLayout({ logo, frames, children, footer }) {
  const classes = useStyles();
  const [visibleFrame, setVisibleFrame] = useState(frames[0]);

  return (
    <motion.div
      className={classes.mainWrapper}
      animate={{
        backgroundColor: visibleFrame.bgColor
      }}
    >
      <DesktopMedia visibleFrame={visibleFrame} />
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