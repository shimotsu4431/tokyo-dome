import 'sanitize.css'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import React from 'react'
import GlobalStoreProvider from '../store/GlobalStore'
import { CookiesProvider } from 'react-cookie'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <GlobalStoreProvider>
        <Component {...pageProps} />
      </GlobalStoreProvider>
    </CookiesProvider>
  )
}
export default MyApp
