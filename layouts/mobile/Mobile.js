import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import NavBar from './NavBar';
import { Frame, RichText, Footer, Media } from '../../components';

const useStyles = makeStyles(theme => ({
  mainWrapper: {
    height: '100vh',
    maxHeight: '-webkit-fill-available',
    overflow: 'auto'
  },
  media: {
    width: '100%'
  },
  frameWrapper: {
    // minHeight: 'unset !important',
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
  const [visibleFrame, setVisibleFrame] = useState(frames ? frames[0] : null);

  return visibleFrame ? (
    <motion.div
      className={classes.mainWrapper}
      animate={{
        backgroundColor: visibleFrame.bgColor
      }}
    >
      <NavBar logo={logo} frames={frames} />
      {frames.map((frame, i) => (
        <Frame
          key={frame.id}
          frame={frame}
          onVisible={setVisibleFrame}
          index={i}
          className={classes.frameWrapper}
        >
          <Media frame={frame} visibleFrame={visibleFrame} />
          {/* <img src={frame.media} alt='mdia' className={classes.media} /> */}
          <RichText html={frame.richTxt} />
        </Frame>
      ))}
      <Footer className={classes.footer} data={footer} />
      {children}
    </motion.div>
  ) : null;
}
