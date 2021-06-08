import Head from 'next/head'
import React, { useContext, useEffect } from 'react'
import { FormContainer } from '../components/FormContainer'
import { Layout } from '../components/Layout'
import { globalStoreContext } from '../store/GlobalStore'
import styles from '../styles/Pages/Home.module.scss'

export const Home: React.FC = () => {
  const { globalDispatch } = useContext(globalStoreContext)

  useEffect(() => {
    globalDispatch({
      type: 'RESET',
    })
  }, [])

  return (
    <div>
      <Head>
        <title>Tokyo Dome</title>
        <meta name="description" content="Tokyo Dome" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className={styles.container}>
          <FormContainer />
        </div>
      </Layout>
    </div>
  )
}

export default Home
