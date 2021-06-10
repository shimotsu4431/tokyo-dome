import Head from 'next/head'
import React, { useCallback, useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import firebase, { db } from '../lib/firebase'
import prefData from '../lib/pref'

export const Admin: React.FC = () => {
  const [data, setData] = useState<firebase.firestore.DocumentData[]>([])

  useEffect(() => {
    const data: firebase.firestore.DocumentData[] = []

    // hooksにまとめる
    async function getPrefData(prefId: string) {
      const querySnapshot = await db.collection(prefId).get()
      querySnapshot.forEach((postDoc) => {
        data.push({ ...postDoc.data(), docId: postDoc.id })
      })
    }

    // hooksにまとめる
    async function getAllData() {
      for (const pref of prefData) {
        await getPrefData(String(pref.id))
      }
      setData(data)
    }

    getAllData()
  }, [])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    console.log(e.target.checked)
  }, [])

  return (
    <div>
      <Head>
        <title>Admin</title>
        <meta name="description" content="Register" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div>
          <h1>admin</h1>
          <p>管理者用のログインページ</p>
          <ul>
            {data.map((d) => {
              console.log(d)
              return (
                <li key={d.name}>
                  【{prefData[d.prefId - 1].name}】{d.name}: {d.area}[m^2]
                  <label style={{ marginLeft: 15, display: 'inline-block' }}>
                    <input
                      type="checkbox"
                      name="isRegistered"
                      id="isRegistered"
                      value={d.docId}
                      defaultChecked={d.isRegistered}
                      onChange={(e) => handleChange(e)}
                    ></input>
                    isRegistered
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
      </Layout>
    </div>
  )
}

export default Admin
