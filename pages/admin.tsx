import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Layout } from '../components/Layout'
import firebase, { db } from '../lib/firebase'
import 'firebase/auth'
import prefData from '../lib/pref'
import styles from '../styles/pages/Admin.module.scss'
import { globalStoreContext } from '../store/GlobalStore'

export type AreaData = {
  name: string
  author: string
  isRegistered: boolean
  area: number
  prefId: number
  createdAt: firebase.firestore.FieldValue
  updatedAt: firebase.firestore.FieldValue | null
}
export type docId = {
  docId: string
}
export type UnionAreaData = AreaData & docId

export const isValid = (data: any): data is AreaData => {
  if (!(data.name && typeof data.name === 'string')) {
    return false
  }
  if (!(data.author && typeof data.author === 'string')) {
    return false
  }
  if (!(typeof data.isRegistered === 'boolean')) {
    return false
  }
  if (!(data.area && typeof data.area === 'number')) {
    return false
  }
  if (!(data.prefId && typeof data.prefId === 'number')) {
    return false
  }
  if (!(data.createdAt && typeof data.createdAt === 'object')) {
    return false
  }
  if (
    !(
      typeof data.updatedAt === 'object' ||
      typeof data.updatedAt === 'undefined'
    )
  ) {
    return false
  }
  return true
}

export const areaDataConverter: firebase.firestore.FirestoreDataConverter<AreaData> =
  {
    fromFirestore(
      snapshot: firebase.firestore.QueryDocumentSnapshot,
      options: firebase.firestore.SnapshotOptions
    ) {
      const data = snapshot.data(options)
      if (!isValid(data)) {
        console.error(data)
        alert('invalid data')
        throw new Error('invalid data')
      }
      return {
        name: data.name,
        author: data.author,
        isRegistered: data.isRegistered,
        area: data.area,
        prefId: data.prefId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      }
    },
    toFirestore: (area: AreaData) => {
      return {
        name: area.name,
        author: area.author,
        isRegistered: area.isRegistered,
        area: area.area,
        prefId: area.prefId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      }
    },
  }

export const Admin: React.FC = () => {
  const { globalStore } = useContext(globalStoreContext)
  const [data, setData] = useState<UnionAreaData[]>([])
  const router = useRouter()
  // TODO: removeCookie は引数がないとNGぽいので要調査
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, removeCookie] = useCookies(['user'])
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)

  useEffect(() => {
    if (!cookies.user) {
      router.push('/login')
    } else {
      setIsVisible(true)
    }

    const data: UnionAreaData[] = []

    // hooksにまとめる
    async function getPrefData(prefId: string) {
      const querySnapshot = await db
        .collection(prefId)
        .withConverter(areaDataConverter)
        .get()
      querySnapshot.forEach((postDoc) => {
        const result = { ...postDoc.data(), docId: postDoc.id }
        return data.push(result)
      })
    }

    // hooksにまとめる
    async function getAllData() {
      setIsLoading(true)
      for (const pref of prefData) {
        await getPrefData(String(pref.id))
      }
      setData(data)
      setIsLoading(false)
      setIsDeleted(false)
    }

    getAllData()
  }, [isDeleted])

  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const data: UnionAreaData = JSON.parse(e.target.value)
      const docId = data.docId
      const prefId = data.prefId
      // 該当ドキュメントのステート変更
      try {
        const dataRef = db.collection(String(prefId)).doc(docId)
        await dataRef.update({
          isRegistered: e.target.checked,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        alert('ステートを変更しました！')
      } catch {
        alert('更新する権限を持っていません！')
        e.target.checked = !e.target.checked
      }
    },
    []
  )

  const handleDelete = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, d: UnionAreaData) => {
      const docId = d.docId
      const prefId = d.prefId

      db.collection(String(prefId))
        .doc(docId)
        .delete()
        .then(() => {
          alert('delete success!')
          setIsDeleted(true)
        })
        .catch((error) => {
          console.log(error)
          alert('delete error!')
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
            <p>管理者用ページ</p>
            {globalStore && globalStore.user && (
              <>
                <p>uid: {globalStore.user?.uid}</p>
                <p>email: {globalStore.user?.email}</p>
              </>
            )}
            <button onClick={handleLogout} className={styles.button}>
              ログアウト
            </button>
            {!isLoading ? (
              <ul>
                {data.map((d, idx) => {
                  return (
                    <li key={idx}>
                      【{prefData[d.prefId - 1].name}】{d.name}: {d.area}[m^2]
                      <label className={styles.label}>
                        <input
                          type="checkbox"
                          id="isRegistered"
                          value={JSON.stringify(d)}
                          defaultChecked={d.isRegistered}
                          className={styles.checkbox}
                          onChange={(e) => {
                            if (
                              window.confirm(
                                'isRegistered のステートを変更しますか？'
                              )
                            ) {
                              handleChange(e)
                            } else {
                              e.currentTarget.checked = !e.currentTarget.checked
                            }
                          }}
                        ></input>
                        isRegistered
                      </label>
                      <button
                        className={styles.deleteButton}
                        onClick={(e) => {
                          if (window.confirm('削除しますか？')) {
                            handleDelete(e, d)
                          }
                        }}
                      >
                        delete
                      </button>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </Layout>
      )}
    </div>
  )
}

export default Admin
