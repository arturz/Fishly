import React, { createContext, Dispatch, useContext, useReducer } from 'react'
import Action from '../types/Action'
import State from '../types/State'
import initialState from './initialState'
import reducer from './reducer'

type ReducerType = typeof reducer

export const StateContext = createContext<[State, Dispatch<Action>]>([initialState, () => void 0])

export const StateProvider = ({ reducer, initialState, children} : { reducer: ReducerType, initialState: State, children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  )
}
export const useStateValue = () => useContext(StateContext)