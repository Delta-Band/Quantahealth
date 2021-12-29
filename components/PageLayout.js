import React from 'react';
import Head from 'next/head';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { DesktopLayout, MobileLayout } from '../layouts';

const useStyles = makeStyles(theme => ({
  sideBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    background: 'grey',
    width: 400,
    paddingInline: theme.spacing(6)
  },
  contentWrapper: {
    background: 'red',
    width: 1067,
    margin: '0 auto'
  },
  img: {
    width: '100%'
  }
}));

export default function PageLayout({
  title,
  description,
  imageForSocial,
  noIndex = false,
  logo,
  logoMobile,
  favicon
}) {
  // const theme = useTheme();
  const ipad = useMediaQuery(theme => theme.breakpoints.up('ipad'));
  // const mobile = useMediaQuery(theme.breakpoints.down('ipad'));

  console.log(`ipad: ${ipad}`);

  function getResponsiveLayout() {
    switch (true) {
      case ipad:
        return <DesktopLayout logo={logo} />;
      default:
        return <MobileLayout logo={logoMobile} />;
    }
  }

  return (
    <div>
      <Head>
        <meta charSet='utf-8' />
        <link rel='icon' href={`${favicon}?v=${new Date().getTime()}`} />
        <title>{title}</title>
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={imageForSocial} />
        <meta name='description' content={description} />
        {noIndex && <meta name='robots' content='noindex' />}
        <meta
          name='google-site-verification'
          content='lqnq_1HVklw95GPM5jTBEa1kxzNewPQCOLjgiwrPXDI'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
        />
        <meta httpEquiv='ScreenOrientation' content='autoRotate:disabled' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
      </Head>
      {/* {ipad ? (
      ) : (
      )} */}
      {getResponsiveLayout()}
      {/* <div className={classes.sideBar}>
        <img className={classes.img} src={logo} alt='Quathealth Logo' />
      </div>
      <div className={classes.contentWrapper}>Page Layout</div> */}
    </div>
  );
}
