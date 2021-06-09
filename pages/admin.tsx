import Head from 'next/head'
import React from 'react'
import { Layout } from '../components/Layout'

export const Admin: React.FC = () => {
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
        </div>
      </Layout>
    </div>
  )
}

export default Admin
