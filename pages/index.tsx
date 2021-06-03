import Head from 'next/head'
import styles from '../styles/Pages/Home.module.scss'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Tokyo Dome</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <main>main</main>
      </div>
    </div>
  )
}
