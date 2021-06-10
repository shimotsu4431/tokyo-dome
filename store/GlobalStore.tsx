import React, { Dispatch, useReducer } from 'react'
import firebase from '../lib/firebase'
import immer from 'immer'

export type GlobalStore = {
  searchNumber: number
  searchPref: number
  user: firebase.User | null
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
  | {
      type: 'RESET'
    }
  | {
      type: 'CHANGE_USER'
      payload: firebase.User
    }

/** グローバルステートの初期値 */
export const initialState: GlobalStore = {
  searchNumber: 100,
  searchPref: 1,
  user: null,
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
    case 'CHANGE_USER': {
      draft.user = action.payload
      break
    }
    case 'RESET': {
      draft.searchPref = 1
      draft.searchNumber = 100
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
