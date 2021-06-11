import Head from 'next/head'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Layout } from '../components/Layout'
import { globalStoreContext } from '../store/GlobalStore'
import firebase, { db } from '../lib/firebase'
import { useRouter } from 'next/router'
import { shuffle } from 'lodash'

export const Result: React.FC = () => {
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      const querySnapshot = await db
        .collection(prefId)
        .where('isRegistered', '==', true)
        .get()
      querySnapshot.forEach((postDoc) => {
        data.push(postDoc.data())
      })
      setAreas(data)
      setSelectedArea(shuffle(data)[0])
    }

    getData(prefId)
  }, [])

  const comparedNum = useMemo(() => {
    if (!selectedArea) return

    const value = globalStore.searchNumber / selectedArea.area
    return value.toFixed(2)
  }, [selectedArea])

  return (
    <>
      <Head>
        <title>Result</title>
        <meta name="description" content="result page." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {areas && areas.length ? (
          <div>
            {selectedArea && (
              <div>
                <p>
                  {globalStore.searchNumber} km^2 は、{selectedArea.name}の約{' '}
                  {comparedNum} 個分の広さです。
                </p>
              </div>
            )}
          </div>
        ) : (
          <div>登録データがありません</div>
        )}
      </Layout>
    </>
  )
}

export default Result
