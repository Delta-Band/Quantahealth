import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FrameIndicator, Menu } from '../components';
import { Squash as Hamburger } from 'hamburger-react';
import { motion } from 'framer-motion';

const useStyles = makeStyles(theme => ({
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    maxHeight: '-webkit-fill-available',
    overflow: 'hidden'
  },
  topBar: {
    height: 50,
    width: '100%',
    background: 'grey',
    flexShrink: 0,
    paddingInlineStart: theme.spacing(2),
    paddingBlock: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  contentWrapper: {
    background: 'red',
    height: '100%',
    width: '100%',
    height: '100%',
    overflow: 'auto'
  },
  img: {
    height: '100%',
    zIndex: 1
  },
  hamburger: {
    zIndex: 1
  }
}));

const invertColor = {
  normal: {
    filter: 'invert(0)',
    transition: {
      delay: 1,
      type: 'spring',
      bounce: 0
    }
  },
  invert: {
    filter: 'invert(1)',
    transition: {
      type: 'spring',
      bounce: 0
    }
  }
};

export default function MobileLayout({ logo, frames }) {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={classes.mainWrapper}>
      <div className={classes.topBar}>
        <motion.img
          className={classes.img}
          src={logo}
          alt='Quathealth Logo'
          variants={invertColor}
          initial='normal'
          animate={isOpen ? 'invert' : 'normal'}
        />
        <FrameIndicator frames={frames} />
        <motion.div
          className={classes.hamburger}
          variants={invertColor}
          initial='normal'
          animate={isOpen ? 'invert' : 'normal'}
        >
          <Hamburger toggled={isOpen} toggle={setOpen} size={20} />
        </motion.div>
        <Menu open={isOpen} items={['Data', 'Contact']} />
      </div>
      <div className={classes.contentWrapper}>
        <div>Page Layout</div>
      </div>
    </div>
  );
}
