import Head from 'next/head'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Layout } from '../components/Layout'
import styles from '../styles/pages/Register.module.scss'

type FormType = {
  name: string
  area: number
}

export const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: FormType) => {
    const { name, area } = data
    console.log('area: ', area)
    console.log('name: ', name)
  }

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
            <label>名称</label>
            <input
              className={styles.input}
              {...register('name', { required: true })}
              defaultValue="○○公園"
            />
            {errors.name && <p>name is required</p>}
            <label>広さ</label>
            <input
              type="number"
              className={styles.input}
              {...register('area', {
                required: true,
                pattern: /[0-9.,０-９．，]+/u, // 半角 or 全角数字
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
