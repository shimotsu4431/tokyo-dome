import { useRouter } from 'next/router'
import { useCallback, useContext } from 'react'
import { globalStoreContext } from '../store/GlobalStore'

export const Form: React.FC = () => {
  const router = useRouter()
  const { globalStore, globalDispatch } = useContext(globalStoreContext)

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
      <input
        type="number"
        value={globalStore.searchNumber}
        onChange={(e) =>
          globalDispatch({
            type: 'CHANGE_SEARCH_NUMBER',
            payload: Number(e.target.value),
          })
        }
      />
    </form>
  )
}
