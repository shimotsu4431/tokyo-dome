import { useContext } from 'react'
import { globalStoreContext } from '../store/GlobalStore'
import prefData from '../lib/pref'

export const PrefForm: React.FC = () => {
  const { globalStore, globalDispatch } = useContext(globalStoreContext)

  return (
    <div>
      <label htmlFor="pref">都道府県：</label>
      <select
        name="pref"
        id="pref"
        value={globalStore.searchPref}
        onChange={(e) => {
          globalDispatch({
            type: 'CHANGE_SEARCH_PREF',
            payload: Number(e.target.value),
          })
        }}
      >
        {prefData.map((p, idx) => {
          return (
            <option key={idx} value={p.id}>
              {p.name}
            </option>
          )
        })}
      </select>
    </div>
  )
}
