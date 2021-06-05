import { useRouter } from 'next/router'
import { useCallback, useContext } from 'react'
import { globalStoreContext } from '../store/GlobalStore'
import prefData from '../lib/pref'

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
      </div>
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
              <option key={idx} value={idx}>
                {p}
              </option>
            )
          })}
        </select>
      </div>
    </form>
  )
}
