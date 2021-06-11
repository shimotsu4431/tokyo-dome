import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Layout } from '../components/Layout'
import firebase, { db } from '../lib/firebase'
import 'firebase/auth'
import prefData from '../lib/pref'
import styles from '../styles/pages/Admin.module.scss'

export const Admin: React.FC = () => {
  const [data, setData] = useState<firebase.firestore.DocumentData[]>([])
  const router = useRouter()
  // TODO: removeCookie は引数がないとNGぽいので要調査
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, removeCookie] = useCookies(['user'])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!cookies.user) {
      router.push('/login')
    } else {
      setIsVisible(true)
    }

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

  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const data = JSON.parse(e.target.value)
      const docId = data.docId
      const prefId = data.prefId
      // 該当ドキュメントのステート変更
      const dataRef = db.collection(String(prefId)).doc(docId)
      await dataRef.update({
        isRegistered: e.target.checked,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    },
    []
  )

  const handleLogout = useCallback(() => {
    if (confirm('ログアウトしますか？')) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('ログアウトしました！')
          document.cookie = 'user=; max-age=0'
          router.push('/login')
        })
        .catch((error) => {
          // An error happened.
          console.log(error)
        })
    }
  }, [])

  return (
    <div>
      <Head>
        <title>Admin</title>
        <meta name="description" content="Register" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isVisible && (
        <Layout>
          <div>
            <h1>admin</h1>
            <p>管理者用のログインページ</p>
            <button onClick={handleLogout} className={styles.button}>
              ログアウト
            </button>
            <ul>
              {data.map((d) => {
                return (
                  <li key={d.name}>
                    【{prefData[d.prefId - 1].name}】{d.name}: {d.area}[m^2]
                    <label style={{ marginLeft: 15, display: 'inline-block' }}>
                      <input
                        type="checkbox"
                        id="isRegistered"
                        value={JSON.stringify(d)}
                        defaultChecked={d.isRegistered}
                        onChange={(e) => {
                          if (window.confirm('ステートを変更しますか？')) {
                            handleChange(e)
                          } else {
                            e.currentTarget.checked = !e.currentTarget.checked
                          }
                        }}
                      ></input>
                      isRegistered
                    </label>
                  </li>
                )
              })}
            </ul>
          </div>
        </Layout>
      )}
    </div>
  )
}

export default Admin
