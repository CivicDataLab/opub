import React from 'react';
import type { AppProps, AppContext } from 'next/app';
import Router from 'next/router';
import NextNprogress from 'nextjs-progressbar';
import type { IncomingMessage } from 'http';
import { SSRKeycloakProvider, SSRCookies } from '@react-keycloak/ssr';
import cookie from 'cookie';
import { GlobalStyle } from 'styles/Global';

import { DEFAULT_THEME } from 'config/theme';
import Layout from 'config/layout';
import { pageview } from 'utils/ga';

const keycloakCfg = {
  url: `${process.env.KEYCLOAK_URL}`,
  realm: 'external',
  clientId: 'opub',
};

interface InitialProps {
  cookies: unknown;
}

function MyApp({ Component, pageProps, cookies }: AppProps & InitialProps) {
  React.useEffect(() => {
    const handleRouteChange = (url) => {
      if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) pageview(url);

      // change focus to top on every page change
      if (url.includes('#')) {
        let idPresent = url.split('#').pop();
        (document.querySelector(`#${idPresent}`) as HTMLElement).focus();
      } else {
        (
          document.querySelector('#top-of-site-pixel-anchor') as HTMLElement
        ).focus();
      }
    };

    Router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  });
  return (
    <SSRKeycloakProvider
      persistor={SSRCookies(cookies)}
      keycloakConfig={keycloakCfg}
    >
      <Layout>
        <NextNprogress
          // color={DEFAULT_THEME.tertiary}
          startPosition={0.3}
          stopDelayMs={100}
          height={3}
          options={{ easing: 'ease', speed: 300, showSpinner: false }}
        />
        <GlobalStyle />
        <Component {...pageProps} />
      </Layout>
    </SSRKeycloakProvider>
  );
}

function parseCookies(req?: IncomingMessage) {
  if (!req || !req.headers) {
    return {};
  }
  return cookie.parse(req.headers.cookie || '');
}

MyApp.getInitialProps = async (context: AppContext) => {
  // Extract cookies from AppContext
  return {
    cookies: parseCookies(context?.ctx?.req),
  };
};

export default MyApp;
