import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import Link from 'next/link';

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
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    width: '100%'
  }
}));

const container = {
  hidden: horizontal => ({
    y: horizontal ? 0 : '-100%',
    x: horizontal ? '-100%' : 0,
    transition: {
      when: 'afterChildren',
      type: 'spring',
      bounce: 0
    }
  }),
  show: {
    y: '0%',
    x: '0%',
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

export default function Menu({ open, close, items, horizontal = false }) {
  const classes = useStyles();

  return (
    <motion.div
      className={classes.menuWrapper}
      variants={container}
      initial='hidden'
      animate={open ? 'show' : 'hidden'}
      custom={horizontal}
      transition={{ type: 'spring', bounce: 0 }}
    >
      <motion.ul variants={list} className={classes.list} onClick={close}>
        <motion.li variants={listItem}>
          <Link href='/'>
            <a>
              <Button color='secondary' fullWidth>
                Home
              </Button>
            </a>
          </Link>
        </motion.li>
        {items.map(itm => (
          <motion.li key={itm} variants={listItem} onClick={close}>
            <Link href={`/${itm.toLowerCase()}`}>
              <a>
                <Button color='secondary' fullWidth>
                  {itm}
                </Button>
              </a>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
