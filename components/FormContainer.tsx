import { useRouter } from 'next/router'
import React, { useCallback, useContext } from 'react'
import { globalStoreContext } from '../store/GlobalStore'
import { AreaForm } from './AreaForm'
import { PrefForm } from './PrefForm'

export const FormContainer: React.FC = () => {
  const router = useRouter()
  const { globalStore } = useContext(globalStoreContext)

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

      router.push({
        pathname: 'result',
      })
    },
    [router, globalStore.searchNumber]
  )

  return (
    <form onSubmit={onSubmit}>
      <AreaForm />
      <PrefForm />
      <button>確定</button>
    </form>
  )
}
