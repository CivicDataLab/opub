import NextNprogress from 'nextjs-progressbar';
import { GlobalStyle } from 'styles/Global';

import { DEFAULT_THEME } from 'config/theme';
import Layout from 'config/layout';

import type { IncomingMessage } from 'http';
import cookie from 'cookie';
import { SSRKeycloakProvider, SSRCookies } from "@react-keycloak/ssr";

import type { AppProps, AppContext } from 'next/app';

const keycloakCfg = {
    url: `${process.env.KEYCLOAK_URL}`,
    realm: 'external',
    clientId: 'opub'
}

interface InitialProps {
    cookies: unknown
}

function MyApp({ Component, pageProps, cookies }: AppProps & InitialProps) {
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
      return {}
    }
    return cookie.parse(req.headers.cookie || '')
}

MyApp.getInitialProps = async (context: AppContext) => {
    // Extract cookies from AppContext
    return {
        cookies: parseCookies(context?.ctx?.req)
    }
}

export default MyApp;