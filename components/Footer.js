import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import cx from 'classnames';
import { Reader, Iframe } from '@deltaband/delta-next-mui';
import Credits from './Credits';
import Social from './Social';

const useStyles = makeStyles(theme => ({
  footerWrapper: {
    // padding: '0 !important',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    minHeight: 'unset !important',
    background: '#000',
    position: 'relative',
    borderTopRightRadius: 80,
    borderTopLeftRadius: 80,
    width: '100vw',
    boxShadow: '0 -2px 13px rgba(0, 0, 0, 0.4)',
    zIndex: 1,
    paddingInline: theme.spacing(6),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5)
  },
  linkTxt: {
    textDecoration: 'underline'
  },
  copyrights: {
    marginBottom: theme.spacing(3)
  },
  info: {
    '& > *': {
      marginBottom: theme.spacing(1),
      display: 'block'
    },
    '& p': {
      fontSize: 16
    }
  },
  title: {
    marginBottom: theme.spacing(5)
  },
  copyrights: {
    marginBottom: `${theme.spacing(5)}px !important`
  },
  divider: {
    height: 1,
    width: '100%'
  },
  madeBy: {
    margin: 0,
    marginTop: theme.spacing(2)
  },
  credit: {
    '& p': {
      fontSize: 16
    }
  }
}));

export default function Footer({ className, data }) {
  const classes = useStyles();
  const [openReader, setOpenReader] = useState(false);

  return (
    <footer
      className={cx(classes.footerWrapper, className)}
      style={{
        backgroundColor: data.bgColor || '#FFF'
      }}
    >
      <div className={classes.info}>
        <Typography
          variant='h1'
          style={{
            color: data.textMainColor || '#000'
          }}
          className={classes.title}
        >
          {data.title}
        </Typography>
        <a
          href={`mailto:${data.email}?Subject=${data.emailSubject}`}
          target='_blank'
          rel='noreferrer'
        >
          <Typography
            style={{
              color: data.textMainColor || '#000'
            }}
            className={classes.linkTxt}
          >
            {data.email}
          </Typography>
        </a>
        <Typography
          style={{
            color: data.textMainColor || '#000'
          }}
        >
          {data.address1}
        </Typography>
        {data.address2 && (
          <Typography
            style={{
              color: data.textMainColor || '#000'
            }}
          >
            {data.address2}
          </Typography>
        )}
        <Social data={data} />
        <a
          onClick={() => {
            setOpenReader(data.legal);
          }}
        >
          <Typography
            style={{
              color: data.textMainColor || '#000'
            }}
            className={classes.linkTxt}
          >
            Legal Information
          </Typography>
        </a>
        <Typography
          style={{
            color: data.textMainColor || '#000'
          }}
          className={classes.copyrights}
        >
          ©{data.copyrights}
        </Typography>
        <div
          className={classes.divider}
          style={{
            backgroundColor: data.textMainColor || '#000'
          }}
        />
      </div>
      <Credits data={data} />
      <Reader
        noBleed
        open={openReader}
        onClose={() => {
          setOpenReader(null);
        }}
      >
        <Iframe src={openReader} />
      </Reader>
    </footer>
  );
}
