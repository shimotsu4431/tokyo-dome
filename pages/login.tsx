import Head from 'next/head'
import React, { useContext, useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import 'firebase/auth'
import { useForm } from 'react-hook-form'
import styles from '../styles/pages/Login.module.scss'
import firebase from '../lib/firebase'
import { globalStoreContext } from '../store/GlobalStore'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

type FormType = {
  email: string
  password: string
}

const maxAge = 2147483647

export const Login: React.FC = () => {
  const { globalDispatch } = useContext(globalStoreContext)
  const router = useRouter()
  const [cookies, setCookie] = useCookies(['user'])
  const [isVisible, setIsVisible] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // Cookie にユーザ情報があれば自動で /admin に遷移
  useEffect(() => {
    if (cookies.user && cookies.user.uid) {
      router.push('/admin')
    } else {
      setIsVisible(true)
    }
  }, [])

  const onSubmit = (data: FormType) => {
    const { email, password } = data

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        if (userCredential.user) {
          const { uid, email } = userCredential.user
          const mappedUser = { uid, email }

          globalDispatch({
            type: 'CHANGE_USER',
            payload: mappedUser,
          })

          const options = {
            maxAge,
          }
          setCookie('user', mappedUser, options)

          alert('ログインしました！')
          router.push('/admin')
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((error) => {
        alert('ログインに失敗しました。')
      })
  }

  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name="description" content="Register" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isVisible && (
        <Layout>
          <div>
            <h1>Login</h1>
            <p>管理人ログイン用ページ</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <label htmlFor="email">メールアドレス</label>
            <input
              id="email"
              type="eail"
              className={styles.input}
              {...register('email', { required: true })}
            />
            {errors.email && <p>email is required</p>}
            <label htmlFor="password">パスワード</label>
            <input
              id="password"
              type="password"
              className={styles.input}
              {...register('password', { required: true })}
            />
            {errors.password && <p>password is required</p>}
            <button className={styles.button} type="submit">
              送信
            </button>
          </form>
        </Layout>
      )}
    </div>
  )
}

export default Login
