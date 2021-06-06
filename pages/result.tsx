import Head from 'next/head'
import React, { useContext } from 'react'
import { Layout } from '../components/Layout'
import { globalStoreContext } from '../store/GlobalStore'
import prefData from '../lib/pref'

export const Result: React.FC = () => {
  const { globalStore } = useContext(globalStoreContext)

  return (
    <>
      <Head>
        <title>Result</title>
        <meta name="description" content="result page." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div>
          <p>{globalStore.searchNumber}</p>
          <p>{prefData[globalStore.searchPref]}</p>
        </div>
      </Layout>
    </>
  )
}

export default Result
