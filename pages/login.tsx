import Head from 'next/head'
import React from 'react'
import { Layout } from '../components/Layout'
import 'firebase/auth'

export const Login: React.FC = () => {
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
          <p>データ管理用ページ</p>
        </div>
      </Layout>
    </div>
  )
}

export default Login
