import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import '../styles/globals.css';
import theme from '../theme';
import { PageLayout } from '../components';
import store from '../redux/store';

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
        {/* <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer> */}
      </ThemeProvider>
    </Provider>
  );
}
