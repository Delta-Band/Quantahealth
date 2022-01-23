import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useWindowOrientation from 'use-window-orientation';
import { motion } from 'framer-motion';

const useStyles = makeStyles(theme => ({
  splashscreenWrapper: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 100,
    '@media (orientation: landscape)': {},
    [theme.breakpoints.up('ipad')]: {
      // height: 65,
      // paddingInlineEnd: theme.spacing(2),
      // justifyContent: 'flex-start'
    }
  },
  logo: {
    width: 35,
    position: 'absolute',
    left: theme.spacing(2),
    top: theme.spacing(2),
    '@media (orientation: landscape)': {},
    [theme.breakpoints.up('ipad')]: {
      // height: 65,
      // paddingInlineEnd: theme.spacing(2),
      // justifyContent: 'flex-start'
    }
  }
}));

export default function SplashScreen({ splash }) {
  const classes = useStyles();
  const [hide, setHide] = useState(false);
  const ipad = useMediaQuery(theme => theme.breakpoints.up('ipad'));
  const laptop = useMediaQuery(theme => theme.breakpoints.up('laptop'));
  const desktop = useMediaQuery(theme => theme.breakpoints.up('desktop'));
  const { portrait } = useWindowOrientation();

  useEffect(() => {
    setTimeout(() => {
      setHide(true);
    }, splash.time * 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(splash)]);

  return splash ? (
    <motion.div
      className={classes.splashscreenWrapper}
      style={{
        background: splash.bgColor
      }}
      animate={{ x: hide ? '-100%' : 0 }}
      transition={{ type: 'spring', stiffness: 50 }}
    >
      <img src={splash.topLeftLogo} alt='logo' className={classes.logo} />
      <lottie-interactive
        autoplay
        style={{
          width: portrait ? '75%' : 'unset',
          height: portrait ? 'unset' : '75%',
          top: '50%',
          left: '50%',
          position: 'absolute',
          transform: 'translate(-50%, -50%)'
        }}
        path={splash.lottie}
        loop
      />
    </motion.div>
  ) : null;
}
