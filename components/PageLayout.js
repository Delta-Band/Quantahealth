import React from 'react';
import Head from 'next/head';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useWindowOrientation from 'use-window-orientation';
import {
  DesktopLayout,
  MobileLayout,
  MobileLandscapeLayout,
  IpadLayout
} from '../layouts';

export default function PageLayout({
  title,
  description,
  imageForSocial,
  noIndex = false,
  logo,
  logoMobile,
  favicon,
  frames = []
}) {
  const ipad = useMediaQuery(theme => theme.breakpoints.up('ipad'));
  const laptop = useMediaQuery(theme => theme.breakpoints.up('laptop'));
  const { portrait } = useWindowOrientation();

  function getResponsiveLayout() {
    switch (true) {
      case laptop:
        return <DesktopLayout logo={logo} frames={frames} />;
      case ipad:
        return <IpadLayout logo={logo} frames={frames} />;
      default:
        // defaults to smartphones
        return portrait ? (
          <MobileLayout logo={logoMobile} frames={frames} />
        ) : (
          <MobileLandscapeLayout logo={logoMobile} frames={frames} />
        );
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
      {getResponsiveLayout()}
    </div>
  );
}
