import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { FrameIndicator } from '../components';

const useStyles = makeStyles(theme => ({
  sideBar: {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100%',
    background: 'grey',
    paddingInline: theme.spacing(3),
    paddingBlock: theme.spacing(2),
    width: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  img: {
    width: '100%'
  }
}));

export default function DesktopLayout({ logo, frames, children }) {
  const classes = useStyles();

  return (
    <>
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
                <img className={classes.img} src={logo} alt='Quathealth Logo' />
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
      <div className={classes.contentWrapper}>
        {frames.map(frame => (
          <>
            <img src={frame.media} alt='mdia' className='media' />
            <Typography
              className='content'
              component='div'
              dangerouslySetInnerHTML={{
                __html: frame.richTxt
              }}
            ></Typography>
          </>
        ))}
        {children}
      </div>
    </>
  );
}
