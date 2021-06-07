import Head from 'next/head'
import React, { useContext, useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import { globalStoreContext } from '../store/GlobalStore'
import prefData from '../lib/pref'
import firebase, { db } from '../lib/firebase'
import { useRouter } from 'next/router'
import { shuffle } from 'lodash'

export const Result: React.FC = () => {
  const router = useRouter()
  const [areas, setAreas] =
    useState<firebase.firestore.DocumentData[] | null>(null)
  const [selectedArea, setSelectedArea] =
    useState<firebase.firestore.DocumentData | null>(null)
  const { globalStore } = useContext(globalStoreContext)
  const prefId = String(globalStore.searchPref)

  useEffect(() => {
    if (globalStore.searchNumber === 0) {
      alert('数値が入力されていません')
      router.push('/')
    }

    const data: firebase.firestore.DocumentData[] = []
    async function getData(prefId: string) {
      const querySnapshot = await db.collection(prefId).get()
      querySnapshot.forEach((postDoc) => {
        data.push(postDoc.data())
      })
      console.log(data)
      setAreas(data)
      setSelectedArea(shuffle(data)[0])
    }

    getData(prefId)
  }, [])

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
          {areas && (
            <div>
              <pre>{JSON.stringify(areas)}</pre>
            </div>
          )}
          {selectedArea && (
            <div>
              <pre>{JSON.stringify(selectedArea)}</pre>
            </div>
          )}
        </div>
      </Layout>
    </>
  )
}

export default Result
