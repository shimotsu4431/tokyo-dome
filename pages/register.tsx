import Head from 'next/head'
import React from 'react'
import { Layout } from '../components/Layout'

export const Register: React.FC = () => {
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
      </Layout>
    </div>
  )
}

export default Register
