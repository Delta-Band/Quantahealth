import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FrameIndicator, Menu } from '../components';
import { Squash as Hamburger } from 'hamburger-react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function MobileLayout({ logo, frames, children }) {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);

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
                className={classes.img}
              >
                <motion.img
                  className={classes.img}
                  src={logo}
                  alt='Quathealth Logo'
                  variants={invertColor}
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
                  variants={invertColor}
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
      <div className={classes.contentWrapper}>{children}</div>
    </div>
  );
}
