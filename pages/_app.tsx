import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MoralisProvider } from "react-moralis";
import { SessionProvider } from 'next-auth/react';
function MyApp({ Component, pageProps }: AppProps) {
  return (
  <MoralisProvider
    serverUrl="https://tc8chs8npreu.usemoralis.com:2053/server"
    appId="Ima4UtAHfuJL5TZ0NnVqMKS0YTrxT1Wxtqg1YYxX"
    initializeOnMount={true}
  >
    <SessionProvider session={pageProps.session}>
    <Component {...pageProps} />
    </SessionProvider>
  </MoralisProvider>)
}

export default MyApp
