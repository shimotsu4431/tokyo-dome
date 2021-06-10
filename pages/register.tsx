import Head from 'next/head'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Layout } from '../components/Layout'
import styles from '../styles/pages/Register.module.scss'
import prefData from '../lib/pref'
import { db } from '../lib/firebase'
import firebase from '../lib/firebase'
import 'firebase/auth'

type FormType = {
  name: string
  area: number
  prefId: string
}

export const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: FormType) => {
    const { name, area, prefId } = data

    db.collection(prefId)
      .doc()
      .set({
        name: name,
        area: Number(area),
        isRegistered: false,
        prefId: Number(prefId),
      })
      .then(() => {
        alert('データを送信しました！')
        reset()
      })
      .catch((error: any) => {
        console.error('Error writing document: ', error)
        alert('送信エラー！')
      })
  }

  useEffect(() => {
    // 匿名ログイン実行
    async function initFirebase() {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (!user) {
          await firebase.auth().signInAnonymously()
        } else {
          console.log(user)
        }
      })
    }

    initFirebase()
  }, [])

  return (
    <div>
      <Head>
        <title>Register</title>
        <meta name="description" content="Register" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div>
          <h1>登録ページ</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="pref">都道府県：</label>
            <select
              className={styles.select}
              id="pref"
              {...register('prefId', { required: true })}
            >
              {prefData.map((p, idx) => {
                return (
                  <option key={idx} value={p.id}>
                    {p.name}
                  </option>
                )
              })}
            </select>
            <label htmlFor="name">名称</label>
            <input
              id="name"
              className={styles.input}
              {...register('name', { required: true })}
            />
            {errors.name && <p>name is required</p>}
            <label htmlFor="area">広さ</label>
            <input
              type="number"
              id="area"
              className={styles.input}
              {...register('area', {
                required: true,
                pattern: /[0-9.,０-９．，]+/u, // 半角 or 全角数字
                min: 1,
              })}
            />
            {errors.area && <p>area is required</p>}
            <button className={styles.button} type="submit">
              送信
            </button>
          </form>
        </div>
      </Layout>
    </div>
  )
}

export default Register
