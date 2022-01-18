import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import cx from 'classnames';
import { Reader, Iframe } from '@deltaband/delta-next-mui';

const useStyles = makeStyles(theme => ({
  footerWrapper: {
    // padding: '0 !important',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: 'unset !important',
    background: '#000',
    position: 'relative',
    borderTopRightRadius: 80,
    borderTopLeftRadius: 80,
    width: '100vw',
    boxShadow: '0 -2px 13px rgba(0, 0, 0, 0.4)',
    zIndex: 1,
    maxHeight: 'calc(100% - 70px)',
    paddingInline: theme.spacing(6),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5)
  },
  linkTxt: {
    textDecoration: 'underline'
  },
  copyrights: {
    alignSelf: 'flex-end'
  },
  info: {
    '& > *': {
      marginBottom: theme.spacing(1),
      display: 'block'
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
            Legal
          </Typography>
        </a>
      </div>
      <Typography
        style={{
          color: data.textMainColor || '#000'
        }}
        className={classes.copyrights}
      >
        ©{data.copyrights}
      </Typography>
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
