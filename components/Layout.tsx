import React from 'react'
import Link from 'next/link'

import styles from '../styles/components/Layout.module.scss'

export const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>
          <Link href="/">
            <a>Home</a>
          </Link>
        </h1>
      </header>
      <main className={styles.mainContainer}>{children}</main>
    </div>
  )
}
