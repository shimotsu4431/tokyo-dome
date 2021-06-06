import React, { Dispatch, useReducer } from 'react'
import immer from 'immer'

export type GlobalStore = {
  searchNumber: number
  searchPref: number
}

export type GlobalAction =
  | {
      type: 'CHANGE_SEARCH_NUMBER'
      payload: number
    }
  | {
      type: 'CHANGE_SEARCH_PREF'
      payload: number
    }

/** グローバルステートの初期値 */
export const initialState: GlobalStore = {
  searchNumber: 0,
  searchPref: 0,
}

/** reducer */
const reducer = immer((draft: GlobalStore, action: GlobalAction) => {
  switch (action.type) {
    case 'CHANGE_SEARCH_NUMBER': {
      draft.searchNumber = action.payload
      break
    }
    case 'CHANGE_SEARCH_PREF': {
      draft.searchPref = action.payload
      break
    }
  }
})

type StoreWithAction = {
  globalStore: GlobalStore
  globalDispatch: Dispatch<GlobalAction>
}

export const globalStoreContext = React.createContext<StoreWithAction>({
  globalStore: initialState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  globalDispatch: () => {},
})

const GlobalStoreProvider: React.FC = ({ children }) => {
  const [globalStore, globalDispatch] = useReducer(reducer, initialState)

  return (
    <globalStoreContext.Provider value={{ globalStore, globalDispatch }}>
      {children}
    </globalStoreContext.Provider>
  )
}

export default GlobalStoreProvider
