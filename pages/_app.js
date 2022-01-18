import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import '../styles/globals.css';
import theme from '../theme';
import { PageLayout } from '../components';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </ThemeProvider>
  );
}
