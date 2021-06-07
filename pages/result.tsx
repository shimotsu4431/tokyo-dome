import Head from 'next/head'
import React, { useContext, useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import { globalStoreContext } from '../store/GlobalStore'
import prefData from '../lib/pref'
import firebase, { db } from '../lib/firebase'

export const Result: React.FC = () => {
  const [areas, setAreas] = useState<any>(null)
  const { globalStore } = useContext(globalStoreContext)
  const prefId = String(globalStore.searchPref)

  useEffect(() => {
    const data: firebase.firestore.DocumentData[] = []
    async function getData(prefId: string) {
      const querySnapshot = await db.collection(prefId).get()
      querySnapshot.forEach((postDoc) => {
        data.push(postDoc.data())
      })
      console.log(data)
      setAreas(data)
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
        </div>
      </Layout>
    </>
  )
}

export default Result
