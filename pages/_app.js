import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import '../styles/globals.css';
// import Image from 'next/image';
import theme from '../theme';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
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
  );
}
