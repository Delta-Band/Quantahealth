import React from 'react';
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  desktopnavigationWrapper: {
    paddingInline: theme.spacing(3),
    background: 'black',
    width: '80vh',
    maxWidth: '30vw',
    height: '12vh',
    maxHeight: 112,
    position: 'fixed',
    top: 0,
    left: 'calc(50vw + 32.5px)',
    borderBottomLeftRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    border: '2px solid white',
    borderTop: 'none',
    boxShadow: '0 2px 13px rgba(0, 0, 0, 0.4)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainNavItms: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%'
  }
}));

export default function Desktopnavigation({ mainNavItms = [] }) {
  const classes = useStyles();

  return (
    <motion.div
      className={classes.desktopnavigationWrapper}
      initial={{
        x: '-100%',
        y: '-100%'
      }}
      animate={{
        y: '0%'
      }}
      transition={{
        y: { type: 'spring', stiffness: 300, damping: 30, delay: 1 }
      }}
    >
      <div className={classes.mainNavItms}>
        <Link href='/'>
          <a>
            <Button color='secondary' fullWidth>
              Home
            </Button>
          </a>
        </Link>
        {mainNavItms.map(navItm => (
          <Link href={`/${navItm.toLowerCase()}`} key={navItm}>
            <a>
              <Button color='secondary'>{navItm}</Button>
            </a>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
