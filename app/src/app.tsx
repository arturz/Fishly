import React from 'react'
import { render } from 'react-dom'
import { CssBaseline } from '@material-ui/core'
import { StateProvider } from './state'
import initialState from './initialState'
import Router from './router'

//@ts-ignore
__webpack_public_path__ = `${window.STATIC_URL}/app/assets/bundle/`

const App = () => {
  const reducer = (state, action) => {
    switch(action.type){
      case 'logOut':
        return {
          ...state,
          user: null
        }

      case 'logIn':
        return {
          ...state,
          user: action.payload.user
        }

      default:
        return state
    }
  }

  return (
    <>
      <CssBaseline />
      <StateProvider initialState={initialState} reducer={reducer}>
        <Router />
      </StateProvider>
    </>
  )
}

render(<App/>, document.getElementById('app'))