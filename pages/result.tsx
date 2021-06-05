import Head from 'next/head'
import React, { useContext } from 'react'
import { globalStoreContext } from '../store/GlobalStore'

export const Result: React.FC = () => {
  const { globalStore } = useContext(globalStoreContext)

  return (
    <>
      <Head>
        <title>Result</title>
        <meta name="description" content="result page." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <p>{globalStore.searchNumber}</p>
      </div>
    </>
  )
}

export default Result
