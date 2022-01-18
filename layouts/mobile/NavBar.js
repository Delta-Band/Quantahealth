import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Squash as Hamburger } from 'hamburger-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as consts from '../consts';
import { FrameIndicator, Menu } from '../../components';

const useStyles = makeStyles(theme => ({
  navBarWrapper: {
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
    zIndex: 2
  },
  logoImg: {
    height: '100%',
    zIndex: 1
  },
  hamburger: {
    zIndex: 1
  }
}));

export default function NavBar({ logo, frames, visibleFrame }) {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={classes.navBarWrapper}>
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
              <FrameIndicator frames={frames} visibleFrame={visibleFrame} />
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
  );
}
