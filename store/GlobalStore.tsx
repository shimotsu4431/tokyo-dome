import React, { Dispatch, useReducer } from 'react'
import immer from 'immer'
import { useEffect } from 'react'
import firebase from '../lib/firebase'
import 'firebase/auth'

export type mappedUserData = {
  uid: string
  email: string | null
}

export type GlobalStore = {
  searchNumber: number
  searchPref: number
  user: mappedUserData | null
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
      payload: mappedUserData
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

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const { uid, email } = user
        const mappedUser = { uid, email }

        globalDispatch({
          type: 'CHANGE_USER',
          payload: mappedUser,
        })
      }
    })
  }, [])

  return (
    <globalStoreContext.Provider value={{ globalStore, globalDispatch }}>
      {children}
    </globalStoreContext.Provider>
  )
}

export default GlobalStoreProvider
