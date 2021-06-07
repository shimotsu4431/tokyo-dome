import { useContext } from 'react'
import { globalStoreContext } from '../store/GlobalStore'

export const AreaForm: React.FC = () => {
  const { globalStore, globalDispatch } = useContext(globalStoreContext)

  return (
    <div>
      <label htmlFor="area">面積：</label>
      <input
        type="number"
        name="area"
        id="area"
        value={globalStore.searchNumber}
        onChange={(e) =>
          globalDispatch({
            type: 'CHANGE_SEARCH_NUMBER',
            payload: Number(e.target.value),
          })
        }
      />
      <span>m^2</span>
    </div>
  )
}
