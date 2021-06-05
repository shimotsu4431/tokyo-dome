import Head from 'next/head'
import React from 'react'
import { FormContainer } from '../components/FormContainer'
import { Layout } from '../components/Layout'
import styles from '../styles/Pages/Home.module.scss'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Tokyo Dome</title>
        <meta name="description" content="Generated by create next app" />
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
