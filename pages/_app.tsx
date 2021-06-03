import 'sanitize.css'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import React from 'react'
import GlobalStoreProvider from '../store/GlobalStore'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalStoreProvider>
      <Component {...pageProps} />
    </GlobalStoreProvider>
  )
}
export default MyApp
