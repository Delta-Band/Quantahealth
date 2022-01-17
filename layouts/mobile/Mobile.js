import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import { useScrollDirection } from 'react-use-scroll-direction';
import NavBar from './NavBar';
import { Frame, RichText, Footer, Media } from '../../components';

const useStyles = makeStyles(theme => ({
  mainWrapper: {
    height: '100vh',
    maxHeight: '-webkit-fill-available',
    overflow: 'auto'
  },
  media: {
    position: 'relative !important'
  },
  frameWrapper: {
    // minHeight: 'unset !important',
    '&:first-child': {
      paddingTop: theme.spacing(8)
    }
  },
  richTxt: {
    flexShrink: 0,
    fontSize: 16,
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
    borderTopRightRadius: '40px !important',
    borderTopLeftRadius: '40px !important'
  }
}));

export default function MobileLayout({ logo, frames, children, footer }) {
  const classes = useStyles();
  const [visibleFrameIndex, setVisibleFrameIndex] = useState(0);
  const [visibleFrame, setVisibleFrame] = useState(frames[visibleFrameIndex]);
  const { scrollTargetRef, scrollDirection } = useScrollDirection();

  useEffect(() => {
    setVisibleFrame(frames[visibleFrameIndex]);
  }, [visibleFrameIndex]);

  return visibleFrame ? (
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
        </Frame>
      ))}
      <NavBar logo={logo} frames={frames} />
      <Footer className={classes.footer} data={footer} />
      {children}
    </motion.div>
  ) : null;
}
