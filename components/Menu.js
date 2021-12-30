import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';

const useStyles = makeStyles(theme => ({
  menuWrapper: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    background: 'black',
    display: 'flex',
    alignItems: 'center',
    paddingInline: theme.spacing(3)
    // justifyContent: 'center'
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    width: '100%'
  }
}));

const container = {
  hidden: {
    y: '-100%',
    transition: {
      when: 'afterChildren',
      type: 'spring',
      bounce: 0
    }
  },
  show: {
    y: '0%',
    transition: {
      when: 'beforeChildren',
      type: 'spring',
      bounce: 0
    }
  }
};

const list = {
  hidden: {
    transition: {
      staggerChildren: 0.15,
      type: 'spring',
      bounce: 0,
      staggerDirection: -1
    }
  },
  show: {
    transition: {
      staggerChildren: 0.15,
      type: 'spring',
      bounce: 0
    }
  }
};

const listItem = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
};

export default function Menu({ open, items }) {
  const classes = useStyles();

  return (
    <motion.div
      className={classes.menuWrapper}
      variants={container}
      initial='hidden'
      animate={open ? 'show' : 'hidden'}
      transition={{ type: 'spring', bounce: 0 }}
    >
      <motion.ul variants={list} className={classes.list}>
        {items.map(itm => (
          <motion.li key={itm} variants={listItem}>
            <Button color='secondary' fullWidth>
              {itm}
            </Button>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
