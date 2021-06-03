import { useContext } from 'react'
import { globalStoreContext } from '../store/GlobalStore'

export const Form: React.FC = () => {
  const { globalStore, globalDispatch } = useContext(globalStoreContext)

  return (
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
  )
}
