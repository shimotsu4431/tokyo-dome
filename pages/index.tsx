import Head from 'next/head'
import React, { useEffect } from 'react'
import { FormContainer } from '../components/FormContainer'
import { Layout } from '../components/Layout'
import firebase, { db } from '../lib/firebase'
import styles from '../styles/Pages/Home.module.scss'

export default function Home() {
  useEffect(() => {
    async function getData(prefId: string) {
      const querySnapshot = await db.collection(prefId).get()
      const data: firebase.firestore.DocumentData[] = []
      querySnapshot.forEach((postDoc) => {
        data.push(postDoc.data())
      })
      console.log(data)
    }

    getData('1')
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
