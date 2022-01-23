import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import '../styles/globals.css';
import theme from '../theme';
import { PageLayout, SplashScreen } from '../components';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <PageLayout {...pageProps}>
        <Component {...pageProps} />
      </PageLayout>
      {/* <SplashScreen {...pageProps} /> */}
    </ThemeProvider>
  );
}
