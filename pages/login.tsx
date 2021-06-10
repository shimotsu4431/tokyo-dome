import Head from 'next/head'
import React from 'react'
import { Layout } from '../components/Layout'
import 'firebase/auth'
import { useForm } from 'react-hook-form'
import styles from '../styles/pages/Login.module.scss'

type FormType = {
  email: string
  password: string
}

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: FormType) => {
    console.log(data)
    alert('ログインしました！')
  }

  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name="description" content="Register" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div>
          <h1>Login</h1>
          <p>管理人ログイン用ページ</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
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
    </div>
  )
}

export default Login
