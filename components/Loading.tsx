import clsx from 'clsx'
import React from 'react'

import styles from '../styles/components/Loading.module.scss'

type props = {
  isLoading: boolean
}

export const Loading: React.FC<props> = ({ isLoading }) => {
  return (
    <div
      className={clsx({
        [styles.wrapper]: true,
        [styles.isShow]: isLoading,
      })}
    >
      <div className={styles.content}>
        <p>計算中...</p>
      </div>
    </div>
  )
}
